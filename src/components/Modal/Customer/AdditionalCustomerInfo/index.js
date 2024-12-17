// @ts-nocheck
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import DateRangeIcon from '@mui/icons-material/DateRange'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, Button, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Backdrop from '@mui/material/Backdrop'
import Checkbox from '@mui/material/Checkbox'
import Modal from '@mui/material/Modal'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '../../../../asset/icon/AddIcon.svg'
import PolygonIcon from '../../../../asset/icon/Polygon.svg'
import {
  isFirstCharacterZero,
  isValidDimension,
  urlRegex,
  generateUniqueFileName,
  renderUploadMessage
} from '../../../../common/common'
import colors from '../../../../constants/colors'
import commons from '../../../../constants/common'
import titleTableListConsultingHistories from '../../../../constants/titleTableListConsultingHistories'
import titleTableListDevice from '../../../../constants/titleTableListDevice'
import {
  getListDistrictByProvinceIdAction,
  getListWardByDistrictIdAction,
  setGetListDistrictFlagAction,
  setGetListWardFlagAction
} from '../../../../redux/app/app.actions'
import {
  appDistrictListTempState,
  appProvinceListState,
  appWardListTempState
} from '../../../../redux/app/app.selectors'
import {
  getAllDeviceMachineManufacturerAction,
  getAllDeviceMachineTypeAction
} from '../../../../redux/customer/customer.actions'
import {
  listAllDeviceMachineManufacturerState,
  listAllDeviceMachineTypeState
} from '../../../../redux/customer/customer.selectors'
import { s3 } from '../../../../utils'
import CustomDateRangePicker from '../../../DateTime/DateRangePicker'
import ConsultingHistoryTable from '../../../Table/CustomerTable/ConsultingHistoryTable'
import DeviceTable from '../../../Table/CustomerTable/DeviceTable'
import MultimediaList from '../../../MultimediaList'
import { toast } from 'react-toastify'

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minHeight: '555px',
  maxHeight: '94vh',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  overflow: 'auto'
}

export default function AdditionalCustomerInfoModal({
  open,
  nameTitle,
  handleCloseModal,
  listAllPersonnelScale,
  listAllFactoryScale,
  listAllCompanyType,
  listAllIndustryGroup,
  listAllProductSubstitutability,
  listAllOrderPlan,
  listAllQuanlityRequire,
  listAllProductApplication,
  listAllFrequencyCompanyVisit,
  listAllIncentivePolicy,
  listAllConsultationHistoryProblem,
  handleCreateCustomer,
  createCustomers,
  createCustomerSuccessMessage
}) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const dataProvince = useSelector(appProvinceListState)
  const dataDistrict = useSelector(appDistrictListTempState)
  const dataWard = useSelector(appWardListTempState)
  const [valueTabIndex, setValueTabIndex] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)
  const [contacts, setContacts] = useState([{ name: '', phone_number: '' }])
  const [isMaxContactReached, setIsMaxContactReached] = useState(false)
  const [website, setWebsite] = useState('')
  const [fanpage, setFanpage] = useState('')
  const [officeAddress, setOfficeAddress] = useState('')
  const [staffingScale, setStaffingScale] = useState('')
  const [factoryScale, setFactoryScale] = useState('')
  const [typeOfCompany, setTypeOfCompany] = useState('')
  const [companyVisitsFrequency, setCompanyVisitsFrequency] = useState('')
  const [businessOwnerBirthday, setBusinessOwnerBirthday] = useState(null)
  const [incentivePolicy, setIncentivePolicy] = useState('')
  const [discountPolicyBasedOnOutput, setDiscountPolicyBasedOnOutput] = useState('')
  const [characterOrInterests, setCharacterOrInterests] = useState('')
  const [specialNotes, setSpecialNotes] = useState('')
  const [industryGroup, setIndustryGroup] = useState([])
  const [area, setArea] = useState('')
  const [productSubstitutionPossibilities, setProductSubstitutionPossibilities] = useState('')
  const [orderingPlan, setOrderingPlan] = useState('')
  const [qualityRequirements, setQualityRequirements] = useState('')
  const [productApplication, setProductApplication] = useState([])
  const [errorMessageWebsite, setErrorMessageWebsite] = useState('')
  const [errorMessageFanpage, setErrorMessageFanpage] = useState('')
  const [errorMessagePhoneNumber, setErrorMessagePhoneNumber] = useState(
    Array.from({ length: contacts.length }, () => '')
  )
  const [errorMessageName, setErrorMessageName] = useState(Array.from({ length: contacts.length }, () => ''))
  const isLastTab = () => valueTabIndex === tabLabels.length - 1
  const [consultingHistories, setConsultingHistories] = useState([
    {
      consultation_date: dayjs().format('YYYY-MM-DD'),
      consultation_history_problem_id: null,
      information_provider: '',
      description: '',
      consultant: '',
      solution: '',
      result: ''
    }
  ])
  const [selectedImage, setSelectedImage] = useState([])
  const fileInputRef = useRef(null)
  const [machineData, setMachineData] = useState([
    {
      device_machine_type_id: '',
      device_machine_manufacturer_id: '',
      device_machine_type_name: '',
      device_machine_manufacturer_name: '',
      manufacturer: '',
      machine_code: '',
      quantity: ''
    }
  ])
  const [disabledRows, setDisabledRows] = useState(new Array(consultingHistories.length).fill(false))
  const [disabledRowsMachineData, setDisabledRowsMachineData] = useState(new Array(machineData.length).fill(false))
  const [rowNewConsultingHistories, setRowNewConsultingHistories] = useState(false)
  const [rowNewDeviceMachines, setRowNewDeviceMachines] = useState(false)
  const [successDeleteMachineDataMessage, setSuccessDeleteMachineDataMessage] = useState(false)
  const [successDeleteConsultingHistoryMessage, setSuccessDeleteConsultingHistoryMessage] = useState(false)

  const [indexDistrictDelivery, setIndexDistrictDelivery] = useState('')
  const [indexWardDelivery, setIndexWardDelivery] = useState('')
  const [listDistrictDelivery, setListDistrictDelivery] = useState([{ id: 0, data: [] }])
  const [listWardDelivery, setListWardDelivery] = useState([{ id: 0, data: [] }])
  const [deliveryAddresses, setDeliveryAddresses] = useState([{ province_id: '', district_id: '', ward_id: '' }])
  const listAllDeviceMachineType = useSelector(listAllDeviceMachineTypeState)
  const listAllDeviceMachineManufacturer = useSelector(listAllDeviceMachineManufacturerState)
  const [uploadProgress, setUploadProgress] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    dispatch(getAllDeviceMachineTypeAction())
    dispatch(getAllDeviceMachineManufacturerAction())
  }, [])

  const handleChangeProvinceFormCreateUser = useCallback((value) => {
    dispatch(setGetListDistrictFlagAction(true))
    dispatch(getListDistrictByProvinceIdAction(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeDistrictFormCreateUser = useCallback((value) => {
    dispatch(setGetListWardFlagAction(true))
    dispatch(getListWardByDistrictIdAction(value))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (createCustomerSuccessMessage) {
      setValueTabIndex(0)
    }
  }, [createCustomerSuccessMessage])

  const handleFileUpload = async (files) => {
    const fileArray = Array.from(files)
    const errorMessages = []
    const errors = { image: [], other: [] }
    const validFiles = []
    let largestFileSize = 0

    fileArray.forEach((file) => {
      const fileExtension = file.name.split('.').pop().toLowerCase()
      const isImage = commons.FORMAT_IMAGE_FILE.includes(fileExtension)

      if (isImage) {
        if (file.size > commons.MAX_SIZE_IMAGE) {
          errors.image.push(file.name)
        } else {
          validFiles.push(file)
          largestFileSize = Math.max(largestFileSize, file.size)
        }
      } else {
        errors.other.push(file.name)
      }
    })

    if (errors.image.length > 0) {
      const overSizedFilesMessage = renderUploadMessage(errors.image, t('capacityImageLimit'))
      toast.error(overSizedFilesMessage)
    }
    if (errors.other.length > 0) {
      const invalidFilesMessage = renderUploadMessage(errors.other, t('formatImage'))
      toast.error(invalidFilesMessage)
    }

    setUploadProgress(0)
    setIsUploading(true)

    const handleUpload = async (file) => {
      const params = {
        Bucket: process.env.REACT_APP_BUCKET,
        Key: generateUniqueFileName(file),
        Body: file,
        ContentType: file.type
      }

      return new Promise((resolve, reject) => {
        const upload = s3.upload(params)
        upload.on('httpUploadProgress', (event) => {
          if (file.size === largestFileSize) {
            const percentComplete = Math.round((event.loaded / file.size) * 100)
            setUploadProgress(percentComplete)
          }
        })

        upload
          .promise()
          .then((data) => resolve(data))
          .catch((error) => {
            console.error('Upload error:', error)
            reject(error)
          })
      })
    }

    try {
      const uploadResults = await Promise.all(validFiles.map(handleUpload))
      setSelectedImage((prev) => {
        const updatedFiles = [...prev]
        uploadResults.forEach((result) => {
          updatedFiles.push({ path: result.Location })
        })
        return updatedFiles
      })
      setUploadProgress(100)
      if (uploadResults.length > 0) {
        const successMessage = renderUploadMessage(validFiles, t('fileUploadSuccess'), 'name')
        toast.success(successMessage)
      }
    } catch (error) {
      toast.error(t('uploadFailed'))
    } finally {
      setIsUploading(false)
    }
  }

  const handleAddIconClick = () => {
    fileInputRef.current.click()
  }

  const handleDelete = (index) => {
    const updatedItems = [...selectedImage]
    updatedItems.splice(index, 1)
    setSelectedImage(updatedItems)
  }

  const handleAddConsultingHistory = () => {
    const newRow = {
      consultation_date: dayjs().format('YYYY-MM-DD'),
      consultation_history_problem_id: '',
      information_provider: '',
      description: '',
      user_id: '',
      solution: '',
      result: ''
    }
    setConsultingHistories((prevState) => [newRow, ...prevState])
    setDisabledRows([false, ...disabledRows.map(() => true)])
    setSuccessDeleteConsultingHistoryMessage(false)
    setRowNewConsultingHistories(true)
  }

  useEffect(() => {
    if (successDeleteMachineDataMessage) {
      setSuccessDeleteMachineDataMessage(false)
    }
    if (successDeleteConsultingHistoryMessage) {
      setSuccessDeleteConsultingHistoryMessage(false)
    }
  }, [successDeleteMachineDataMessage, successDeleteConsultingHistoryMessage])

  const handleAddMachineData = () => {
    const newRow = {
      device_machine_type_id: '',
      device_machine_manufacturer_id: '',
      device_machine_type_name: '',
      device_machine_manufacturer_name: '',
      manufacturer: '',
      machine_code: '',
      quantity: ''
    }

    setMachineData((prevState) => [newRow, ...prevState])
    setDisabledRowsMachineData([false, ...disabledRowsMachineData.map(() => true)])
    setSuccessDeleteMachineDataMessage(false)
    setRowNewDeviceMachines(true)
  }

  const handleUpdateConsultingHistory = (index, field, value) => {
    const updatedConsultingHistories = [...consultingHistories]
    updatedConsultingHistories[index][field] = value
    setConsultingHistories(updatedConsultingHistories)
  }

  const handleUpdateMachineData = (index, field, value) => {
    const machineDataInput = [...machineData]
    machineDataInput[index][field] = value
    setMachineData(machineDataInput)
  }

  const handlePhoneNumberChange = (index, value) => {
    const updatedContacts = [...contacts]
    updatedContacts[index].phone_number = value
    setContacts(updatedContacts)
  }

  const handleNameRoleChange = (index, value) => {
    const updatedContacts = [...contacts]
    updatedContacts[index].name = value
    setContacts(updatedContacts)
  }

  const handleDeleteConsulting = (index) => {
    disabledRows.splice(index, 1)
    const deleteConsulting = [...consultingHistories]
    deleteConsulting.splice(index, 1)
    setConsultingHistories(deleteConsulting)
    setSuccessDeleteConsultingHistoryMessage(Math.random())
    setRowNewConsultingHistories(false)
  }

  const handleDeleteMachineData = (index) => {
    disabledRowsMachineData.splice(index, 1)
    const updatedData = [...machineData]
    updatedData.splice(index, 1)
    setMachineData(updatedData)
    setSuccessDeleteMachineDataMessage(Math.random())
    setRowNewDeviceMachines(false)
  }

  const tabLabels = useMemo(
    () => [t('generalInfo'), t('customerPortrait'), t('customerCareMechanism'), t('consultingHistory'), t('devices')],
    [t]
  )

  const selectedIndustryGroups = useMemo(() => {
    return listAllIndustryGroup.filter((option) => industryGroup.includes(option.id))
  }, [industryGroup, listAllIndustryGroup])

  const productApplications = useMemo(() => {
    return listAllProductApplication.filter((option) => productApplication.includes(option.id))
  }, [listAllProductApplication, productApplication])

  const handleIndustryGroupChange = (event, value) => {
    const selectedIds = value.map((option) => option.id)
    setIndustryGroup(selectedIds)
  }

  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
    setSelectedDate(formattedDate)
  }

  const validateDataTab1 = (customer) => {
    let flag = true
    setErrorMessagePhoneNumber(Array.from({ length: contacts.length }, () => ''))
    setErrorMessageWebsite('')
    setErrorMessageFanpage('')

    if (customer.website_address && urlRegex(customer.website_address) !== true) {
      setErrorMessageWebsite(t('pleaseEnterTheCorrectWebAddressFormat'))
      flag = false
    }
    if (customer.fanpage_address && urlRegex(customer.fanpage_address) !== true) {
      setErrorMessageFanpage(t('pleaseEnterTheCorrectWebAddressFormat'))
      flag = false
    }
    if (customer.customer_contacts && customer.customer_contacts.length > 0) {
      customer.customer_contacts.forEach((contact, index) => {
        let contactPhoneError = ''
        let contactNameError = ''
        if (!contact.name || contact.name.trim() === '') {
          contactNameError = t('nameIsRequired')
          flag = false
        }
        if (contact.phone_number !== null && contact.phone_number !== '') {
          if (!isValidDimension(contact.phone_number)) {
            contactPhoneError = t('onlyNumber')
            flag = false
          } else {
            if (!isFirstCharacterZero(contact.phone_number) || contact.phone_number.length !== 10) {
              contactPhoneError = t('phoneNumberWrongTyper')
              flag = false
            }
          }
        } else {
          contactPhoneError = t('phoneNumberIsRequired')
          flag = false
        }
        setErrorMessagePhoneNumber((prevErrors) => [
          ...prevErrors.slice(0, index),
          contactPhoneError,
          ...prevErrors.slice(index + 1)
        ])
        setErrorMessageName((prevErrors) => [
          ...prevErrors.slice(0, index),
          contactNameError,
          ...prevErrors.slice(index + 1)
        ])
      })
    }

    return flag
  }

  const customer = useMemo(
    () => ({
      company_name: createCustomers?.company_name,
      customer_name: createCustomers?.customer_name,
      debtAge: createCustomers?.debtAge,
      debt_limit: createCustomers?.debt_limit,
      phone_number: createCustomers?.phone_number,
      user_ids: createCustomers?.user_ids,
      zalo_number: createCustomers?.zalo_number,
      website_address: website,
      fanpage_address: fanpage,
      office_address: officeAddress,
      enterprise_establishment_date: selectedDate,
      personnel_scale_id: staffingScale,
      factory_scale_id: factoryScale,
      company_type_id: typeOfCompany,
      customer_contacts: contacts,
      image_handbooks: selectedImage,
      industry_group_ids: industryGroup,
      region: area,
      product_substitutability_id: productSubstitutionPossibilities,
      order_plan_handbook_id: orderingPlan,
      quality_require_id: qualityRequirements,
      product_application_ids: productApplication,
      frequency_company_visit_id: companyVisitsFrequency,
      enterprise_birthday: businessOwnerBirthday,
      discount_policy: discountPolicyBasedOnOutput,
      personality: characterOrInterests,
      special_note: specialNotes,
      consultation_histories: consultingHistories,
      device_machines: machineData,
      address_deliveries: deliveryAddresses,
      address_offices: createCustomers?.address_offices,
      address_branches: createCustomers?.address_branches,
      address_factories: createCustomers?.address_factories
    }),
    [
      area,
      businessOwnerBirthday,
      characterOrInterests,
      companyVisitsFrequency,
      consultingHistories,
      contacts,
      createCustomers,
      deliveryAddresses,
      discountPolicyBasedOnOutput,
      factoryScale,
      fanpage,
      industryGroup,
      machineData,
      officeAddress,
      orderingPlan,
      productApplication,
      productSubstitutionPossibilities,
      qualityRequirements,
      selectedDate,
      selectedImage,
      specialNotes,
      staffingScale,
      typeOfCompany,
      website
    ]
  )

  const handleNextTab = () => {
    if (isLastTab()) return
    if (valueTabIndex === 0) {
      let validate = validateDataTab1(customer)
      if (validate) {
        setValueTabIndex((prevIndex) => prevIndex + 1)
      }
    } else {
      setValueTabIndex((prevIndex) => prevIndex + 1)
    }
  }

  const handlePreviousTab = () => {
    setValueTabIndex((prevIndex) => {
      const newIndex = prevIndex - 1
      if (newIndex === -1) {
        setConsultingHistories([])
        setMachineData([])
        setValueTabIndex(0)
        setSelectedDate(null)
        setContacts([{ name: '', phone_number: '' }])
        setIsMaxContactReached(false)
        setWebsite('')
        setFanpage('')
        setSelectedImage([])
        setOfficeAddress('')
        setStaffingScale('')
        setFactoryScale('')
        setTypeOfCompany('')
        setCompanyVisitsFrequency('')
        setBusinessOwnerBirthday(null)
        setIncentivePolicy('')
        setDiscountPolicyBasedOnOutput('')
        setCharacterOrInterests('')
        setSpecialNotes('')
        setIndustryGroup([])
        setArea('')
        setProductSubstitutionPossibilities('')
        setOrderingPlan('')
        setQualityRequirements('')
        setProductApplication([])
        setErrorMessageWebsite('')
        setErrorMessageFanpage('')
        setErrorMessagePhoneNumber(Array.from({ length: contacts.length }, () => ''))
        setDeliveryAddresses([{ province_id: '', district_id: '', ward_id: '' }])
        setRowNewConsultingHistories(false)
        setRowNewDeviceMachines(false)
        handleCloseModal()
        return prevIndex
      }
      return newIndex
    })
  }

  const handleSubmit = () => {
    handleCreateCustomer(customer)
  }

  const handleAddListContact = () => {
    if (contacts.length < commons.MAX_ADDRESS_COUNT) {
      const numAddresses = contacts.length + 1
      setContacts([...contacts, { name: '', phone_number: '' }])
      if (numAddresses === commons.MAX_ADDRESS_COUNT) {
        setIsMaxContactReached(true)
      }
    }
  }
  const handleRemoveListContact = (index) => {
    const updatedAddresses = [...contacts]
    updatedAddresses.splice(index, 1)
    setContacts(updatedAddresses)
    const numAddresses = updatedAddresses.length
    if (numAddresses < commons.MAX_ADDRESS_COUNT) {
      setIsMaxContactReached(false)
    }
  }
  const handleBusinessOwnerBirthdayChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
    setBusinessOwnerBirthday(formattedDate)
  }

  useEffect(() => {
    if (dataDistrict.length > 0) {
      const updateDataDistrictIfSameId = listDistrictDelivery.map((district) => {
        if (district?.id === indexDistrictDelivery) {
          return { id: district?.id, data: dataDistrict }
        } else {
          return { id: district?.id, data: district?.data }
        }
      })
      setListDistrictDelivery(updateDataDistrictIfSameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexDistrictDelivery, dataDistrict])

  useEffect(() => {
    if (dataWard.length > 0) {
      const updateDataWardIfSameId = listWardDelivery.map((ward) => {
        if (ward?.id === indexWardDelivery) {
          return { id: ward?.id, data: dataWard }
        } else {
          return { id: ward?.id, data: ward?.data }
        }
      })
      setListWardDelivery(updateDataWardIfSameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexWardDelivery, dataWard])

  const handleAddFactoryAddress = (index) => {
    if (deliveryAddresses.length < commons.MAX_BRANCH_COUNT) {
      setDeliveryAddresses([...deliveryAddresses, { province_id: '', district_id: '', ward_id: '' }])
      setListDistrictDelivery([...listDistrictDelivery, { id: index + 1, data: [] }])
      setListWardDelivery([...listWardDelivery, { id: index + 1, data: [] }])
    }
  }

  const handleRemoveFactoryAddress = (index) => {
    const updatedFactoryAddresses = [...deliveryAddresses]
    updatedFactoryAddresses.splice(index, 1)

    const updateListDistrictFactory = [...listDistrictDelivery]
    const updateListWardFactory = [...listWardDelivery]

    if (index >= 0 && index < updateListDistrictFactory.length) {
      updateListDistrictFactory.splice(index, 1)
      updateListDistrictFactory.forEach((item, index) => (item.id = index))
    }

    if (index >= 0 && index < updateListWardFactory.length) {
      updateListWardFactory.splice(index, 1)
      updateListWardFactory.forEach((item, index) => (item.id = index))
    }

    setListDistrictDelivery(updateListDistrictFactory)
    setListWardDelivery(updateListWardFactory)

    setDeliveryAddresses(updatedFactoryAddresses)
  }

  const handleUpdateFactoryAddress = (index, field, value) => {
    let updatedFactoryAddresses = [...deliveryAddresses]
    if (value) {
      updatedFactoryAddresses[index][field] = value
      setDeliveryAddresses(updatedFactoryAddresses)
    } else {
      updatedFactoryAddresses[index][field] = ''
      setDeliveryAddresses(updatedFactoryAddresses)
    }
  }

  const handleFactoryAddressChange = (index, field, value) => {
    let updatedFactoryAddresses = [...deliveryAddresses]
    if (value) {
      updatedFactoryAddresses[index][field] = value
      setDeliveryAddresses(updatedFactoryAddresses)
      handleChangeProvinceFormCreateUser(value)
      updatedFactoryAddresses[index]['district_id'] = ''
      updatedFactoryAddresses[index]['ward_id'] = ''
      setIndexDistrictDelivery(index)
    } else {
      updatedFactoryAddresses[index][field] = ''
      updatedFactoryAddresses[index]['district_id'] = ''
      updatedFactoryAddresses[index]['ward_id'] = ''
      setDeliveryAddresses(updatedFactoryAddresses)
      setIndexDistrictDelivery(index)
      setIndexWardDelivery(index)
    }
  }

  const handleFactoryAddressChangeDistrict = (index, field, value) => {
    let updatedFactoryAddresses = [...deliveryAddresses]
    if (value) {
      updatedFactoryAddresses[index][field] = value
      setDeliveryAddresses(updatedFactoryAddresses)
      handleChangeDistrictFormCreateUser(value)
      updatedFactoryAddresses[index]['ward_id'] = ''
      setIndexWardDelivery(index)
    } else {
      updatedFactoryAddresses[index][field] = ''
      updatedFactoryAddresses[index]['ward_id'] = ''
      setDeliveryAddresses(updatedFactoryAddresses)
      setIndexWardDelivery(index)
    }
  }

  const handleProductApplicationChange = (event, value) => {
    const selectedIds = value.map((option) => option.id)
    setProductApplication(selectedIds)
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Box sx={{ ...style }} className="order-container">
          <Box p="17px">
            <Typography variant="h6" component="p" className="order-title">
              {nameTitle}
            </Typography>
            <TabContext value={valueTabIndex}>
              <Box className="tab-wrapper">
                <TabList className="tab-list">
                  {tabLabels.map((label, index) => (
                    <Tab
                      key={index}
                      className={`button-tab ${valueTabIndex === index ? 'button-tab-selected' : 'button-tab-unselected'}`}
                      label={label}
                      disabled
                    />
                  ))}
                </TabList>
              </Box>
              {/*--------------------------------------TabPanel-0----------------------------------------*/}
              <TabPanel sx={{ padding: '0', mt: '17px' }} value={0}>
                <Box sx={{ display: 'flex', gap: '0 62px' }}>
                  <Box sx={{ display: 'flex', gap: '0 19px' }}>
                    <Box flex={1}>
                      <InputLabel className="inputLabel-handbook">{t('addressWebsite')}</InputLabel>
                      <TextField
                        size="small"
                        value={website}
                        onChange={(event) => setWebsite(event.target.value)}
                        sx={{ width: '271px' }}
                        placeholder={t('enterAddressWebsite')}
                        InputProps={{
                          classes: {
                            root: 'custom-input-search'
                          }
                        }}
                        error={errorMessageWebsite ? true : false}
                        helperText={errorMessageWebsite ? errorMessageWebsite : ''}
                      />
                    </Box>
                    <Box flex={1}>
                      <InputLabel className="inputLabel-handbook">{t('addressFanpage')}</InputLabel>
                      <TextField
                        size="small"
                        value={fanpage}
                        onChange={(event) => setFanpage(event.target.value)}
                        sx={{ width: '271px' }}
                        placeholder={t('enterAddressFanpage')}
                        InputProps={{
                          classes: {
                            root: 'custom-input-search'
                          }
                        }}
                        error={errorMessageFanpage ? true : false}
                        helperText={errorMessageFanpage ? errorMessageFanpage : ''}
                      />
                    </Box>
                  </Box>
                  <Box flex={1}>
                    {deliveryAddresses.map((factoryAddress, index) => (
                      <Box key={`${index}-delivery`} sx={{ marginBottom: '10px' }}>
                        <InputLabel className="inputLabel-handbook">{`${t('deliveryAddress')} ${index + 1}`}</InputLabel>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0 6px'
                          }}
                        >
                          <Box sx={{ width: '100%' }}>
                            <Box
                              sx={{
                                display: 'flex',
                                gap: '8px',
                                alignItems: 'center'
                              }}
                            >
                              <Box flex={1}>
                                <Autocomplete
                                  popupIcon={<PolygonIcon />}
                                  options={dataProvince}
                                  getOptionLabel={(option) => option.province_name}
                                  value={
                                    factoryAddress.province_id
                                      ? dataProvince.find((province) => province.id === factoryAddress.province_id)
                                      : null
                                  }
                                  onChange={(e, newValue) => {
                                    handleFactoryAddressChange(index, 'province_id', newValue?.id ?? '')
                                  }}
                                  size="small"
                                  fullWidth
                                  renderInput={(params) => (
                                    <TextField {...params} variant="outlined" placeholder={t('city')} />
                                  )}
                                  ListboxProps={{
                                    sx: {
                                      maxHeight: 220,
                                      fontSize: '12px'
                                    }
                                  }}
                                  classes={{ inputRoot: 'custom-input-search' }}
                                />
                              </Box>
                              <Box flex={1}>
                                <Autocomplete
                                  popupIcon={<PolygonIcon />}
                                  options={(() => {
                                    let state = []
                                    if (factoryAddress.province_id) {
                                      state = listDistrictDelivery[index].data
                                    }
                                    return state
                                  })()}
                                  getOptionLabel={(option) => option.district_name}
                                  value={
                                    factoryAddress.district_id
                                      ? listDistrictDelivery[index].data.find(
                                          (district) => district.id === factoryAddress.district_id
                                        ) || null
                                      : null
                                  }
                                  noOptionsText={
                                    !factoryAddress[index]?.province_id && (
                                      <span
                                        style={{
                                          color: colors.grayColor
                                        }}
                                      >
                                        {t('pleaseSelectCityProvinceFirst')}
                                      </span>
                                    )
                                  }
                                  onChange={(e, newValue) => {
                                    handleFactoryAddressChangeDistrict(index, 'district_id', newValue?.id ?? '')
                                  }}
                                  size="small"
                                  fullWidth
                                  renderInput={(params) => (
                                    <TextField {...params} variant="outlined" placeholder={t('district')} />
                                  )}
                                  ListboxProps={{
                                    sx: {
                                      maxHeight: 220,
                                      fontSize: '12px'
                                    }
                                  }}
                                  classes={{
                                    inputRoot: 'custom-input-search'
                                  }}
                                />
                              </Box>
                              <Box flex={0.7}>
                                <Autocomplete
                                  popupIcon={<PolygonIcon />}
                                  options={(() => {
                                    let state = []
                                    if (factoryAddress.district_id) {
                                      state = listWardDelivery[index].data
                                    }
                                    return state
                                  })()}
                                  getOptionLabel={(option) => option.ward_name}
                                  value={
                                    factoryAddress.ward_id
                                      ? listWardDelivery[index].data.find(
                                          (ward) => ward.id === factoryAddress.ward_id
                                        ) || null
                                      : null
                                  }
                                  noOptionsText={
                                    !factoryAddress[index]?.district_id && (
                                      <span
                                        style={{
                                          color: colors.grayColor
                                        }}
                                      >
                                        {t('pleaseSelectDistrictFirst')}
                                      </span>
                                    )
                                  }
                                  onChange={(e, newValue) => {
                                    handleUpdateFactoryAddress(index, 'ward_id', newValue?.id ?? '')
                                  }}
                                  size="small"
                                  fullWidth
                                  renderInput={(params) => (
                                    <TextField {...params} variant="outlined" placeholder={t('ward')} />
                                  )}
                                  ListboxProps={{
                                    sx: {
                                      maxHeight: 220,
                                      fontSize: '12px'
                                    }
                                  }}
                                  classes={{
                                    inputRoot: 'custom-input-search'
                                  }}
                                />
                              </Box>
                            </Box>
                            <Box mt={0.5}>
                              <TextField
                                size="small"
                                onChange={(e) => handleUpdateFactoryAddress(index, 'detail', e.target.value)}
                                fullWidth
                                value={factoryAddress.detail || ''}
                                placeholder={t('specificDeliveryAddress')}
                                InputProps={{
                                  classes: {
                                    root: 'custom-input-search'
                                  }
                                }}
                              />
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column'
                            }}
                          >
                            {index === deliveryAddresses.length - 1 && (
                              <AddCircleIcon
                                fontSize="medium"
                                onClick={() => handleAddFactoryAddress(index)}
                                className="addIcon"
                              />
                            )}
                            {deliveryAddresses.length > 1 && (
                              <RemoveCircleIcon
                                fontSize="medium"
                                onClick={() => handleRemoveFactoryAddress(index)}
                                className="removeIcon"
                              />
                            )}
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '0 62px' }}>
                  <Box mt={2.5} sx={{ display: 'flex', gap: '0 19px' }}>
                    <Box flex={1}>
                      <InputLabel className="inputLabel-handbook">{t('staffingScale')}</InputLabel>
                      <Autocomplete
                        popupIcon={<PolygonIcon />}
                        noOptionsText={t('noResult')}
                        options={listAllPersonnelScale}
                        value={listAllPersonnelScale.find((item) => item.id === staffingScale) || null}
                        getOptionLabel={(option) => option.personnel_scale_name}
                        onChange={(event, newValue) => setStaffingScale(newValue ? newValue.id : '')}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            placeholder={t('select')}
                            InputProps={{
                              ...params.InputProps,
                              classes: {
                                root: 'custom-input-search'
                              }
                            }}
                            sx={{ width: '271px' }}
                          />
                        )}
                      />
                    </Box>
                    <Box flex={1}>
                      <InputLabel className="inputLabel-handbook">{t('factoryScale')}</InputLabel>
                      <Autocomplete
                        popupIcon={<PolygonIcon />}
                        noOptionsText={t('noResult')}
                        options={listAllFactoryScale}
                        value={listAllFactoryScale.find((item) => item.id === factoryScale) || null}
                        getOptionLabel={(option) => option.factory_scale_name}
                        onChange={(event, newValue) => setFactoryScale(newValue ? newValue.id : '')}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            placeholder={t('select')}
                            InputProps={{
                              ...params.InputProps,
                              classes: {
                                root: 'custom-input-search'
                              }
                            }}
                            sx={{ width: '271px' }}
                          />
                        )}
                      />
                    </Box>
                  </Box>
                  <Box mt={2.5} sx={{ display: 'flex', gap: '0 19px' }}>
                    <Box flex={1}>
                      <InputLabel className="inputLabel-handbook">{t('typeOfBusiness')}</InputLabel>
                      <Autocomplete
                        popupIcon={<PolygonIcon />}
                        noOptionsText={t('noResult')}
                        options={listAllCompanyType}
                        value={listAllCompanyType.find((item) => item.id === typeOfCompany) || null}
                        getOptionLabel={(option) => option.company_type_name}
                        onChange={(event, newValue) => setTypeOfCompany(newValue ? newValue.id : '')}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            placeholder={t('select')}
                            InputProps={{
                              ...params.InputProps,
                              classes: {
                                root: 'custom-input-search'
                              }
                            }}
                            sx={{ width: '271px' }}
                          />
                        )}
                      />
                    </Box>
                    <Box flex={1}>
                      <InputLabel className="inputLabel-handbook">{t('dateOfEstablishmentOfTheEnterprise')}</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                          placeholder={t('selectDate')}
                          value={selectedDate ? dayjs(selectedDate) : null}
                          format="DD-MM-YYYY"
                          onChange={handleDateChange}
                          slotProps={{
                            textField: {
                              size: 'small',
                              InputProps: {
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton edge="end">
                                      <DateRangeIcon sx={{ color: colors.whiteColor }} />
                                    </IconButton>
                                  </InputAdornment>
                                )
                              }
                            }
                          }}
                        />
                      </LocalizationProvider>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '0 32px' }}>
                  <Box flex={1} sx={{ marginRight: contacts.length > 1 ? '0' : '30px' }}>
                    <Box mt={2.5} sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <InputLabel
                        required
                        sx={{ mb: '0 !important' }}
                        className="requiredTextField inputLabel-handbook"
                      >
                        {t('listContact')}
                      </InputLabel>
                      <AddCircleIcon fontSize="medium" className="addIcon" onClick={handleAddListContact} />
                    </Box>
                    {contacts.map((contact, index) => (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '19px',
                          marginBottom: '10px'
                        }}
                        key={index}
                      >
                        <TextField
                          size="small"
                          value={contact.name}
                          onChange={(e) => handleNameRoleChange(index, e.target.value)}
                          sx={{ width: '271px' }}
                          placeholder={t('enterNameOrRole')}
                          error={errorMessageName[index] ? true : false}
                          helperText={errorMessageName[index] ? errorMessageName[index] : ''}
                          InputProps={{
                            classes: {
                              root: 'custom-input-search'
                            }
                          }}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <TextField
                            size="small"
                            value={contact.phone_number}
                            onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
                            sx={{ width: '271px' }}
                            placeholder={t('enterPhoneNumber')}
                            InputProps={{
                              classes: {
                                root: 'custom-input-search'
                              }
                            }}
                            error={errorMessagePhoneNumber[index] ? true : false}
                            helperText={errorMessagePhoneNumber[index] ? errorMessagePhoneNumber[index] : ''}
                          />
                          {contacts.length > 1 && (
                            <RemoveCircleIcon
                              fontSize="medium"
                              onClick={() => handleRemoveListContact(index)}
                              className="removeIcon"
                            />
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                  <Box flex={1}>
                    <Box mt={2.5} mb="10px" sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                      <InputLabel sx={{ mb: '0 !important' }} className="inputLabel-handbook">
                        {t('image')}
                      </InputLabel>
                      <AddCircleIcon fontSize="medium" className="addIcon" onClick={handleAddIconClick} />
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                    </Box>
                    <MultimediaList
                      handleDelete={handleDelete}
                      imagesData={selectedImage}
                      isVisible={true}
                      fieldPath="path"
                      uploadProgress={uploadProgress}
                      isUploading={isUploading}
                      imageOnly={true}
                    />
                  </Box>
                </Box>
              </TabPanel>
              {/*--------------------------------------TabPanel-1----------------------------------------*/}
              <TabPanel sx={{ padding: '0', mt: '17px' }} value={1}>
                <Box mt={2.5} sx={{ display: 'flex', gap: '0 19px' }}>
                  <Box flex={1}>
                    <InputLabel className="inputLabel-handbook">{t('industryGroup')}</InputLabel>
                    <Autocomplete
                      value={selectedIndustryGroups}
                      onChange={handleIndustryGroupChange}
                      popupIcon={<PolygonIcon />}
                      noOptionsText={t('noResult')}
                      multiple
                      limitTags={1}
                      size="small"
                      options={listAllIndustryGroup || []}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option.industry_group_name}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8, fontSize: '12px' }}
                            checked={selected}
                          />
                          {option.industry_group_name}
                        </li>
                      )}
                      style={{ width: 271, borderRadius: '10px' }}
                      ChipProps={{
                        style: { height: 'auto' }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={t('chooseFromTheList')}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: '10px'
                            }
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Box flex={1}>
                    <InputLabel className="inputLabel-handbook">{t('area')}</InputLabel>
                    <TextField
                      size="small"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      sx={{ width: '271px' }}
                      placeholder={t('enterArea')}
                      InputProps={{
                        classes: {
                          root: 'custom-input-search'
                        }
                      }}
                    />
                  </Box>
                </Box>
                <Box mt={2.5} sx={{ display: 'flex', gap: '0 19px' }}>
                  <Box flex={1.02}>
                    <InputLabel className="inputLabel-handbook">{t('productSubstitutionPossibilities')}</InputLabel>
                    <Autocomplete
                      popupIcon={<PolygonIcon />}
                      noOptionsText={t('noResult')}
                      onChange={(event, value) => setProductSubstitutionPossibilities(value ? value.id : '')}
                      options={listAllProductSubstitutability}
                      value={
                        listAllProductSubstitutability.find((item) => item.id === productSubstitutionPossibilities) ||
                        null
                      }
                      getOptionLabel={(option) => option.product_substitutability_name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder={t('yesOrNo')}
                          InputProps={{
                            ...params.InputProps,
                            classes: {
                              root: 'custom-input-search'
                            }
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Box flex={1}>
                    <InputLabel className="inputLabel-handbook">{t('orderingPlan')}</InputLabel>
                    <Autocomplete
                      popupIcon={<PolygonIcon />}
                      noOptionsText={t('noResult')}
                      onChange={(event, value) => setOrderingPlan(value ? value.id : '')}
                      options={listAllOrderPlan}
                      value={listAllOrderPlan.find((item) => item.id === orderingPlan) || null}
                      getOptionLabel={(option) => option.order_plan_handbook_name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder={t('yesOrNo')}
                          InputProps={{
                            ...params.InputProps,
                            classes: {
                              root: 'custom-input-search'
                            }
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>
                <Box mt={2.5} sx={{ display: 'flex', gap: '0 19px' }}>
                  <Box flex={1.02}>
                    <InputLabel className="inputLabel-handbook">{t('qualityRequirements')}</InputLabel>
                    <Autocomplete
                      popupIcon={<PolygonIcon />}
                      noOptionsText={t('noResult')}
                      options={listAllQuanlityRequire}
                      value={listAllQuanlityRequire.find((item) => item.id === qualityRequirements) || null}
                      getOptionLabel={(option) => option.quality_require_name}
                      onChange={(event, newValue) => setQualityRequirements(newValue ? newValue.id : '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder={t('chooseQualityRequirements')}
                          InputProps={{
                            ...params.InputProps,
                            classes: {
                              root: 'custom-input-search'
                            }
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Box flex={1}>
                    <InputLabel className="inputLabel-handbook">{t('productApplication')}</InputLabel>
                    <Autocomplete
                      multiple
                      size="small"
                      popupIcon={<PolygonIcon />}
                      noOptionsText={t('noResult')}
                      options={listAllProductApplication}
                      value={productApplications}
                      disableCloseOnSelect
                      getOptionLabel={(option) => option?.product_application_name ?? ''}
                      onChange={handleProductApplicationChange}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{
                              marginRight: 8,
                              fontSize: '12px'
                            }}
                            checked={selected}
                          />
                          {option.product_application_name}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder={t('chooseProductApplication')}
                          InputProps={{
                            ...params.InputProps,
                            classes: {
                              root: 'custom-input-search'
                            }
                          }}
                        />
                      )}
                    />
                  </Box>
                </Box>
              </TabPanel>
              {/*--------------------------------------TabPanel-2----------------------------------------*/}
              <TabPanel sx={{ padding: '0', mt: '17px' }} value={2}>
                <Box sx={{ display: 'flex', gap: '0 19px' }}>
                  <Box flex={1}>
                    <InputLabel className="inputLabel-handbook">{t('frequencyOfCompanyVisits')}</InputLabel>
                    <Autocomplete
                      popupIcon={<PolygonIcon />}
                      noOptionsText={t('noResult')}
                      options={listAllFrequencyCompanyVisit}
                      value={listAllFrequencyCompanyVisit.find((item) => item.id === companyVisitsFrequency) || null}
                      getOptionLabel={(option) => option.frequency_company_visit_name}
                      onChange={(event, newValue) => setCompanyVisitsFrequency(newValue ? newValue.id : '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder={t('select')}
                          InputProps={{
                            ...params.InputProps,
                            classes: {
                              root: 'custom-input-search'
                            }
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Box flex={1}>
                    <InputLabel className="inputLabel-handbook">{t('businessOwnerBirthday')}</InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        placeholder={t('selectDate')}
                        value={businessOwnerBirthday ? dayjs(businessOwnerBirthday) : null}
                        format="DD-MM-YYYY"
                        onChange={handleBusinessOwnerBirthdayChange}
                        slotProps={{
                          textField: {
                            size: 'small',
                            InputProps: {
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton edge="end">
                                    <DateRangeIcon sx={{ color: colors.whiteColor }} />
                                  </IconButton>
                                </InputAdornment>
                              )
                            }
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box flex={2}></Box>
                </Box>
                <Box mt={2.5} sx={{ display: 'flex', gap: '0 19px' }}>
                  <Box flex={1}>
                    <InputLabel className="inputLabel-handbook">{t('incentivePolicy')}</InputLabel>
                    <Autocomplete
                      popupIcon={<PolygonIcon />}
                      noOptionsText={t('noResult')}
                      options={listAllIncentivePolicy}
                      value={listAllIncentivePolicy.find((item) => item.id === incentivePolicy) || null}
                      getOptionLabel={(option) => option.incentive_policy_name}
                      onChange={(event, newValue) => setIncentivePolicy(newValue ? newValue.id : '')}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder={t('selectPreferentialPolicyAttached')}
                          InputProps={{
                            ...params.InputProps,
                            classes: {
                              root: 'custom-input-search'
                            }
                          }}
                        />
                      )}
                    />
                  </Box>
                  <Box flex={1}>
                    <InputLabel className="inputLabel-handbook">{t('discountPolicyBasedOnOutput')}</InputLabel>
                    <TextField
                      size="small"
                      value={discountPolicyBasedOnOutput}
                      onChange={(e) => setDiscountPolicyBasedOnOutput(e.target.value)}
                      sx={{ width: '271px' }}
                      placeholder={t('enterDiscountPolicyBasedOnOutput')}
                      InputProps={{
                        classes: {
                          root: 'custom-input-search'
                        }
                      }}
                    />
                  </Box>
                  <Box flex={1} />
                  <Box flex={1} />
                </Box>
                <Box mt={2.5}>
                  <InputLabel className="inputLabel-handbook">{t('characterOrInterests')}</InputLabel>
                  <TextField
                    size="small"
                    value={characterOrInterests}
                    onChange={(e) => setCharacterOrInterests(e.target.value)}
                    fullWidth
                    placeholder={t('enterCharacterOrInterests')}
                    InputProps={{
                      classes: {
                        root: 'custom-input-search'
                      }
                    }}
                  />
                </Box>
                <Box mt={2.5}>
                  <InputLabel className="inputLabel-handbook">{t('specialNotes')}</InputLabel>
                  <TextField
                    size="small"
                    fullWidth
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder={t('enterNotes')}
                    InputProps={{
                      classes: {
                        root: 'custom-input-search'
                      }
                    }}
                  />
                </Box>
              </TabPanel>
              {/*--------------------------------------TabPanel-3----------------------------------------*/}
              <TabPanel sx={{ padding: '0', mt: '17px' }} value={3}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <Button className="addButton" onClick={handleAddConsultingHistory}>
                    <AddIcon />
                    {t('addHistory')}
                  </Button>
                </Box>
                <Box mt={1}>
                  <ConsultingHistoryTable
                    isEdit={true}
                    listAllConsultationHistoryProblem={listAllConsultationHistoryProblem}
                    titleTable={titleTableListConsultingHistories}
                    data={consultingHistories}
                    handleDelete={handleDeleteConsulting}
                    handleUpdateConsultingHistory={handleUpdateConsultingHistory}
                    successFlag={successDeleteConsultingHistoryMessage}
                    disabledRows={disabledRows}
                    setDisabledRows={setDisabledRows}
                    rowNewConsultingHistories={rowNewConsultingHistories}
                  />
                </Box>
              </TabPanel>
              {/*--------------------------------------TabPanel-4----------------------------------------*/}
              <TabPanel sx={{ padding: '0', mt: '17px' }} value={4}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <Button className="addButton" onClick={handleAddMachineData}>
                    <AddIcon />
                    {t('addMachineData')}
                  </Button>
                </Box>
                <Box mt={1}>
                  <DeviceTable
                    isEdit={true}
                    titleTable={titleTableListDevice}
                    deviceMachines={machineData}
                    handleDelete={handleDeleteMachineData}
                    handleUpdateDeviceMachineData={handleUpdateMachineData}
                    successFlag={successDeleteMachineDataMessage}
                    disabledRows={disabledRowsMachineData}
                    setDisabledRows={setDisabledRowsMachineData}
                    listAllDeviceMachineType={listAllDeviceMachineType}
                    listAllDeviceMachineManufacturer={listAllDeviceMachineManufacturer}
                    rowNewDeviceMachines={rowNewDeviceMachines}
                  />
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginTop: '20px',
              p: '8px 16px',
              bgcolor: colors.paleblueColor
            }}
          >
            <Button variant="outlined" onClick={handlePreviousTab} className="backButton">
              {t('back')}
            </Button>
            {valueTabIndex === tabLabels.length - 1 ? (
              <Button variant="outlined" onClick={handleSubmit} className="confirmButton">
                {t('create')}
                <ArrowForwardIcon />
              </Button>
            ) : (
              <Button variant="outlined" onClick={handleNextTab} className="confirmButton">
                {t('continue')}
                <ArrowForwardIcon />
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  )
}
