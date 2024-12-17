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
import MultimediaList from '../../../MultimediaList'
import { s3 } from '../../../../utils'
import { generateUniqueFileName, renderUploadMessage } from '../../../../common/common'
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Autocomplete,
  Backdrop,
  Button,
  Checkbox,
  Chip,
  Modal,
  Tab,
  Typography
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import AWS from 'aws-sdk'
import dayjs from 'dayjs'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import AddIcon from '../../../../asset/icon/AddIcon.svg'
import PolygonIcon from '../../../../asset/icon/Polygon.svg'
import { isFirstCharacterZero, isValidDimension, urlRegex } from '../../../../common/common'
import CustomDateRangePicker from '../../../../components/DateTime/DateRangePicker'
import colors from '../../../../constants/colors'
import colorsCustomerRank from '../../../../constants/colorsCustomerRank'
import commons from '../../../../constants/common'
import titleTableListConsultingHistories from '../../../../constants/titleTableListConsultingHistories'
import titleTableListDevice from '../../../../constants/titleTableListDevice'
import {
  getAllDeviceMachineManufacturerAction,
  getAllDeviceMachineTypeAction
} from '../../../../redux/customer/customer.actions'
import {
  listAllDeviceMachineManufacturerState,
  listAllDeviceMachineTypeState
} from '../../../../redux/customer/customer.selectors'
import '../../../../resource/style/CustomerDetailStyle.css'
import ConsultingHistoryTable from '../../../Table/CustomerTable/ConsultingHistoryTable'
import DeviceTable from '../../../Table/CustomerTable/DeviceTable'
import './style.css'
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

export default function CustomerHandbook(props) {
  const {
    open,
    nameTitle,
    handleCloseModal,
    data,
    handleSubmitAction,
    removeMessageError,
    errorsMessage,
    updateCustomerHandbookFlag,
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
    customerDetail,
    dataProvince,
    dataDistrict,
    dataWard,
    onChangeProvince,
    onChangeDistrict
  } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [valueTabs, setValueTabs] = useState('1')
  const [selectedDate, setSelectedDate] = useState(null)
  const [contacts, setContacts] = useState([{ name: '', phone_number: '' }])
  const [isMaxContactReached, setIsMaxContactReached] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [website, setWebsite] = useState('')
  const [fanpage, setFanpage] = useState('')
  const [officeAddress, setOfficeAddress] = useState('')
  const [companyVisitsFrequency, setCompanyVisitsFrequency] = useState('')
  const [businessOwnerBirthday, setBusinessOwnerBirthday] = useState(null)
  const [discountPolicyBasedOnOutput, setDiscountPolicyBasedOnOutput] = useState('')
  const [characterOrInterests, setCharacterOrInterests] = useState('')
  const [specialNotes, setSpecialNotes] = useState('')
  const [mainProductGroup, setMainProductGroup] = useState([])
  const [purchaseFrequencyOverMonth, setPurchaseFrequencyOverMonth] = useState('')
  const [industryGroup, setIndustryGroup] = useState([])
  const [area, setArea] = useState('')
  const [debtAgeGroup, setDebtAgeGroup] = useState('')
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
  const [staffingScale, setStaffingScale] = useState('')
  const [factoryScale, setFactoryScale] = useState('')
  const [typeOfCompany, setTypeOfCompany] = useState('')
  const fileInputRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState([])
  const [incentivePolicy, setIncentivePolicy] = useState('')
  const [isLastRowComplete, setIsLastRowComplete] = useState(false)
  const [successDeleteConsultingHistoryMessage, setSuccessDeleteConsultingHistoryMessage] = useState(false)
  const [isLastRowCompleteMachineData, setIsLastRowCompleteMachineData] = useState(false)
  const [indexDistrictDelivery, setIndexDistrictDelivery] = useState('')
  const [indexWardDelivery, setIndexWardDelivery] = useState('')
  const [listDistrictDelivery, setListDistrictDelivery] = useState([{ id: 0, data: [] }])
  const [listWardDelivery, setListWardDelivery] = useState([{ id: 0, data: [] }])
  const [addresses, setAddresses] = useState([{ province_id: '', district_id: '', ward_id: '', detail: '' }])
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
  const [dateRangeConsultingHistories, setDateRangeConsultingHistories] = useState([])
  const [deviceMachines, setDeviceMachines] = useState([
    {
      device_machine_type_id: '',
      device_machine_manufacturer_id: '',
      device_machine_type_name: '',
      device_machine_manufacturer_name: '',
      machine_code: '',
      quantity: ''
    }
  ])
  const [disabledRows, setDisabledRows] = useState(new Array(consultingHistories.length).fill(true))
  const [disabledRowsMachineData, setDisabledRowsMachineData] = useState(deviceMachines.map(() => true))
  const [successDeleteMachineDataMessage, setSuccessDeleteMachineDataMessage] = useState(false)
  const listAllDeviceMachineType = useSelector(listAllDeviceMachineTypeState)
  const listAllDeviceMachineManufacturer = useSelector(listAllDeviceMachineManufacturerState)
  const [consultingHistoriesLength, setConsultingHistoriesLength] = useState([])
  const [deviceMachinesLength, setDeviceMachinesLength] = useState([])
  const [rowNewConsultingHistories, setRowNewConsultingHistories] = useState(false)
  const [rowNewDeviceMachines, setRowNewDeviceMachines] = useState(false)
  const [uploadProgress, setUploadProgress] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (updateCustomerHandbookFlag) {
      setIsEdit(false)
    }
  }, [updateCustomerHandbookFlag])

  useEffect(() => {
    const lastItem = deviceMachines[0]
    if (
      deviceMachines.length === 0 ||
      (lastItem &&
        (lastItem.device_machine_type_id || lastItem.device_machine_type_name) &&
        (lastItem.device_machine_manufacturer_id || lastItem.device_machine_manufacturer_name) &&
        lastItem.machine_code &&
        lastItem.quantity)
    ) {
      setIsLastRowCompleteMachineData(false)
    } else {
      setIsLastRowCompleteMachineData(false)
    }
  }, [deviceMachines])

  const handleUpdateDeviceMachineData = (index, field, value) => {
    const machineDataInput = [...deviceMachines]
    machineDataInput[index][field] = value
    setDeviceMachines(machineDataInput)
  }

  useEffect(() => {
    dispatch(getAllDeviceMachineTypeAction())
    dispatch(getAllDeviceMachineManufacturerAction())
  }, [])

  useEffect(() => {
    const lastItem = consultingHistories[0]
    if (consultingHistories.length === 0) {
      setIsLastRowComplete(false)
    } else if (
      lastItem &&
      lastItem.consultation_history_problem_id &&
      lastItem.information_provider &&
      lastItem.description &&
      lastItem.consultant &&
      lastItem.solution &&
      lastItem.result
    ) {
      setIsLastRowComplete(false)
    } else {
      setIsLastRowComplete(false)
    }
  }, [consultingHistories])

  useEffect(() => {
    if (consultingHistoriesLength) {
      setDisabledRows(consultingHistoriesLength.map(() => true))
    } else {
      setDisabledRows([])
    }
  }, [consultingHistoriesLength])

  useEffect(() => {
    if (deviceMachinesLength) {
      setDisabledRowsMachineData(deviceMachinesLength.map(() => true))
    } else {
      setDisabledRowsMachineData([])
    }
  }, [deviceMachinesLength])

  const handleDelete = (index) => {
    const updatedItems = [...selectedImage]
    updatedItems.splice(index, 1)
    setSelectedImage(updatedItems)
  }

  const handleDateRangeConsultingHistoriesChange = (date) => {
    setDateRangeConsultingHistories(date)
  }

  useEffect(() => {
    if (data) {
      setCustomerName(data.customer?.customer_name)
      setWebsite(data?.website_address)
      setFanpage(data?.fanpage_address)
      setOfficeAddress(data?.office_address)
      setStaffingScale(data?.personnel_scale?.id)
      setFactoryScale(data?.factory_scale?.id)
      setTypeOfCompany(data?.company_type?.id)
      setQualityRequirements(data?.quality_require?.id)
      if (data.image_handbooks) {
        setSelectedImage(data.image_handbooks)
      }
      const formattedDate = data?.enterprise_establishment_date
        ? dayjs(data.enterprise_establishment_date, 'DD/MM/YYYY').format('YYYY-MM-DD')
        : null
      setSelectedDate(formattedDate)
      if (Array.isArray(data.customer_contacts)) {
        const initialContacts = data.customer_contacts.map((contact) => ({
          name: contact?.name || '',
          phone_number: contact?.phone_number || ''
        }))
        setContacts(initialContacts)
      }
      setCompanyVisitsFrequency(data?.frequency_company_visit?.id)
      const formattedDateBirthday = data?.enterprise_birthday
        ? dayjs(data.enterprise_birthday, 'DD/MM/YYYY').format('YYYY-MM-DD')
        : null
      setBusinessOwnerBirthday(formattedDateBirthday)
      setDiscountPolicyBasedOnOutput(data?.discount_policy)
      setCharacterOrInterests(data?.personality)
      setSpecialNotes(data?.special_note)
      setPurchaseFrequencyOverMonth(data?.frequency_purchase_monthly)
      const industryGroupIds = data.industry_groups ? data.industry_groups.map((group) => group.id) : []
      setIndustryGroup(industryGroupIds)
      setArea(data?.region)
      setDebtAgeGroup(data.debt_age?.debt_age_name)
      setProductSubstitutionPossibilities(data.product_substitutability?.id)
      setOrderingPlan(data?.order_plan_handbook?.id)
      if (data.product_applications) {
        const productApplications = data.product_applications ? data.product_applications.map((group) => group.id) : []
        setProductApplication(productApplications)
      }
      setMainProductGroup(data?.product_groups)
      setIncentivePolicy(data?.incentive_policy?.id)

      if (data.consultation_histories?.length > 0) {
        const formattedHistories = data?.consultation_histories.map((history) => ({
          consultation_date: dayjs(history.consultation_date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
          consultation_history_problem_id: history.consultation_history_problem?.id,
          information_provider: history.information_provider || '',
          description: history.description || '',
          consultant: history.consultant || '',
          solution: history.solution || '',
          result: history.result || ''
        }))
        setConsultingHistories(formattedHistories)
      }
      setConsultingHistoriesLength(data.consultation_histories)
      if (data.device_machines) {
        const deviceMachinesFormatted = data.device_machines.map((device) => ({
          device_machine_type_id: device?.device_machine_type?.id || '',
          device_machine_manufacturer_id: device?.device_machine_manufacturer?.id || '',
          device_machine_type_name: device?.device_machine_type?.device_machine_type_name || '',
          device_machine_manufacturer_name: device?.device_machine_manufacturer?.device_machine_manufacturer_name || '',
          machine_code: device?.machine_code || '',
          quantity: device?.quantity || ''
        }))
        setDeviceMachines(deviceMachinesFormatted)
      }
      setDeviceMachinesLength(data.device_machines)
      if (data.address_deliveries && data.address_deliveries.length > 0) {
        const addressFormatted = data.address_deliveries.map((item) => ({
          province_id: item?.address?.province?.id || '',
          district_id: item?.address?.district?.id || '',
          ward_id: item?.address?.ward?.id || '',
          detail: item?.address?.detail || ''
        }))
        setAddresses(addressFormatted)

        const districtData = data.address_deliveries.map((district, index) => ({
          id: index,
          data: district?.district_list
        }))
        const wardData = data.address_deliveries.map((ward, index) => ({
          id: index,
          data: ward?.ward_list
        }))

        setListDistrictDelivery(districtData)
        setListWardDelivery(wardData)
      } else {
        setAddresses([{ province_id: '', district_id: '', ward_id: '', detail: '' }])
      }
    }
  }, [data])

  const handleDeleteMachineData = (index) => {
    disabledRowsMachineData.splice(index, 1)
    const updatedData = [...deviceMachines]
    updatedData.splice(index, 1)
    setDeviceMachines(updatedData)
    setSuccessDeleteMachineDataMessage(Math.random())
    setRowNewDeviceMachines(false)
  }

  const handleSubmit = () => {
    const customer = {
      customer_id: data.customer?.id,
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
      incentive_policy_id: incentivePolicy,
      discount_policy: discountPolicyBasedOnOutput,
      personality: characterOrInterests,
      special_note: specialNotes,
      frequency_purchase_monthly: purchaseFrequencyOverMonth,
      consultation_histories: consultingHistories,
      device_machines: deviceMachines,
      address_deliveries: addresses
    }

    let validate = validateData(customer)
    if (validate) {
      handleSubmitAction(customer)
    }
    handleCancel()
  }

  const validateData = (customer) => {
    let flag = true
    setErrorMessagePhoneNumber(Array.from({ length: contacts.length }, () => ''))
    setErrorMessageName(Array.from({ length: contacts.length }, () => ''))
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

  const handleChangeTabs = (event, newValueTabs) => {
    setValueTabs(newValueTabs)
  }

  const handleIndustryGroupChange = (event, value) => {
    const selectedIds = value.map((option) => option.id)
    setIndustryGroup(selectedIds)
  }

  const handleProductApplicationChange = (event, value) => {
    const selectedIds = value.map((option) => option.id)
    setProductApplication(selectedIds)
  }

  const handleAreaChange = (event) => {
    setArea(event.target.value)
  }

  const handleChangeWebsite = (event) => {
    setWebsite(event.target.value)
  }

  const handleChangeFanpage = (event) => {
    setFanpage(event.target.value)
  }

  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
    setSelectedDate(formattedDate)
  }

  const handleNameRoleChange = (index, value) => {
    const updatedContacts = [...contacts]
    updatedContacts[index].name = value
    setContacts(updatedContacts)
  }

  const handlePhoneNumberChange = (index, value) => {
    const updatedContacts = [...contacts]
    updatedContacts[index].phone_number = value
    setContacts(updatedContacts)
  }

  const handleDiscountPolicyBasedOnOutputChange = (event) => {
    setDiscountPolicyBasedOnOutput(event.target.value)
  }

  const handleCharacterOrInterestsChange = (event) => {
    setCharacterOrInterests(event.target.value)
  }

  const handleSpecialNotesChange = (event) => {
    setSpecialNotes(event.target.value)
  }

  const handleBusinessOwnerBirthdayChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
    setBusinessOwnerBirthday(formattedDate)
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

  const handleAddIconClick = () => {
    fileInputRef.current.click()
  }

  const handleEdit = () => {
    setIsEdit(true)
  }

  const handleCancel = () => {
    setIsEdit(false)
    setIsLastRowComplete(false)
    setIsLastRowCompleteMachineData(false)
    setValueTabs('1')
    setCustomerName('')
    setWebsite('')
    setFanpage('')
    setDateRangeConsultingHistories([])
    setOfficeAddress('')
    setSelectedDate(null)
    setContacts([{ name: '', phone_number: '' }])
    setCompanyVisitsFrequency('')
    setBusinessOwnerBirthday(null)
    setDiscountPolicyBasedOnOutput('')
    setCharacterOrInterests('')
    setSpecialNotes('')
    setPurchaseFrequencyOverMonth('')
    setIndustryGroup([])
    setArea('')
    setDebtAgeGroup('')
    setProductSubstitutionPossibilities('')
    setOrderingPlan('')
    setQualityRequirements('')
    setProductApplication('')
    setMainProductGroup('')
    setErrorMessagePhoneNumber([])
    setErrorMessageWebsite('')
    setErrorMessageFanpage('')
    removeMessageError()
    setConsultingHistories([])
    setDeviceMachines([
      {
        device_machine_type_id: '',
        device_machine_manufacturer_id: '',
        device_machine_type_name: '',
        device_machine_manufacturer_name: '',
        machine_code: '',
        quantity: ''
      }
    ])
    setIsMaxContactReached(false)
    setSelectedImage([])
    setStaffingScale('')
    setFactoryScale('')
    setTypeOfCompany('')
    setIncentivePolicy('')
    setAddresses([{ province_id: '', district_id: '', ward_id: '', detail: '' }])
    setErrorMessagePhoneNumber(Array.from({ length: contacts.length }, () => ''))
    setErrorMessageName(Array.from({ length: contacts.length }, () => ''))
    handleCloseModalHandBook()
    setRowNewConsultingHistories(false)
    setRowNewDeviceMachines(false)
  }

  const handleCloseModalHandBook = () => {
    handleCloseModal()
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

  const selectedIndustryGroups = listAllIndustryGroup.filter((option) => industryGroup.includes(option.id))

  const productApplications = listAllProductApplication.filter((option) => productApplication.includes(option.id))

  const handleAddMachineData = () => {
    const newRow = {
      device_machine_type_id: '',
      device_machine_manufacturer_id: '',
      machine_code: '',
      quantity: ''
    }
    setDeviceMachines((prevState) => [newRow, ...prevState])
    setDisabledRowsMachineData([false, ...disabledRowsMachineData.map(() => true)])
    setSuccessDeleteMachineDataMessage(false)
    setRowNewDeviceMachines(true)
  }

  const handleAddConsultingHistory = () => {
    const newRow = {
      consultation_date: dayjs().format('YYYY-MM-DD'),
      consultation_history_problem_id: '',
      information_provider: '',
      description: '',
      consultant: '',
      solution: '',
      result: ''
    }
    setConsultingHistories((prevState) => [newRow, ...prevState])
    setDisabledRows([false, ...disabledRows.map(() => true)])
    setSuccessDeleteConsultingHistoryMessage(false)
    setRowNewConsultingHistories(true)
  }

  const handleFileUpload = async (files) => {
    const fileArray = Array.from(files)
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
  const tabs = [
    { label: t('generalInfo'), value: '1' },
    { label: t('customerPortrait'), value: '2' },
    { label: t('customerCareMechanism'), value: '3' },
    { label: t('consultingHistory'), value: '4' },
    { label: t('devices'), value: '5' }
  ]

  const getClassName = (value) => `button-tab ${valueTabs === value ? 'button-tab-selected' : 'button-tab-unselected'}`

  const handleDeleteConsulting = (index) => {
    disabledRows.splice(index, 1)
    const deleteConsulting = [...consultingHistories]
    deleteConsulting.splice(index, 1)
    setConsultingHistories(deleteConsulting)
    setSuccessDeleteConsultingHistoryMessage(Math.random())
    setRowNewConsultingHistories(false)
  }

  const handleUpdateConsultingHistory = (index, field, value) => {
    const updatedConsultingHistories = [...consultingHistories]
    updatedConsultingHistories[index][field] = value
    setConsultingHistories(updatedConsultingHistories)
  }

  const filterConsultingHistories = (histories, dateRange) => {
    if (!dateRange || dateRange.length !== 2 || !dateRange[0] || !dateRange[1]) return histories
    const [startDate, endDate] = dateRange.map((date) => new Date(date).getTime())
    return histories.filter((history) => {
      const consultationDate = new Date(history.consultation_date).getTime()
      return consultationDate >= startDate && consultationDate <= endDate
    })
  }

  useEffect(() => {
    if (dataDistrict.length > 0 && open) {
      const updateDataDistrictIfSameId = listDistrictDelivery.map((district) => {
        if (district?.id === indexDistrictDelivery) {
          return { id: district?.id, data: dataDistrict }
        } else {
          return { id: district?.id, data: district?.data }
        }
      })
      setListDistrictDelivery(updateDataDistrictIfSameId)
    }
  }, [dataDistrict, indexDistrictDelivery, listDistrictDelivery])

  useEffect(() => {
    if (dataWard.length > 0 && open) {
      const updateDataWardIfSameId = listWardDelivery.map((ward) => {
        if (ward?.id === indexWardDelivery) {
          return { id: ward?.id, data: dataWard }
        } else {
          return { id: ward?.id, data: ward?.data }
        }
      })
      setListWardDelivery(updateDataWardIfSameId)
    }
  }, [dataWard, indexWardDelivery, listWardDelivery])

  const handleAddAddress = (index) => {
    setAddresses([...addresses, { province_id: '', district_id: '', ward_id: '', detail: '' }])

    setListDistrictDelivery([...listDistrictDelivery, { id: index + 1, data: [] }])
    setListWardDelivery([...listWardDelivery, { id: index + 1, data: [] }])
  }

  const handleUpdateDeliveryAddress = (index, field, value) => {
    let updatedDeliveryAddresses = [...addresses]
    if (value) {
      updatedDeliveryAddresses[index][field] = value
      setAddresses(updatedDeliveryAddresses)
    } else {
      updatedDeliveryAddresses[index][field] = ''
      setAddresses(updatedDeliveryAddresses)
    }
  }

  const handleAddressChange = (index, field, value) => {
    let updatedAddresses = [...addresses]
    if (value) {
      updatedAddresses[index][field] = value
      setAddresses(updatedAddresses)
      onChangeProvince(value)
      updatedAddresses[index]['district_id'] = ''
      updatedAddresses[index]['ward_id'] = ''
      setIndexDistrictDelivery(index)
    } else {
      updatedAddresses[index][field] = ''
      updatedAddresses[index]['district_id'] = ''
      updatedAddresses[index]['ward_id'] = ''
      setAddresses(updatedAddresses)
      setIndexDistrictDelivery(index)
      setIndexWardDelivery(index)
    }
  }

  const handleDeliveryAddressChangeDistrict = (index, field, value) => {
    let updatedFactoryAddresses = [...addresses]
    if (value) {
      updatedFactoryAddresses[index][field] = value
      setAddresses(updatedFactoryAddresses)
      onChangeDistrict(value)
      updatedFactoryAddresses[index]['ward_id'] = ''
      setIndexWardDelivery(index)
    } else {
      updatedFactoryAddresses[index][field] = ''
      updatedFactoryAddresses[index]['ward_id'] = ''
      setAddresses(updatedFactoryAddresses)
      setIndexWardDelivery(index)
    }
  }

  const handleRemoveAddress = (index) => {
    const updatedAddresses = [...addresses]
    updatedAddresses.splice(index, 1)

    const updateListDistrictDelivery = [...listDistrictDelivery]
    const updateListWardDelivery = [...listWardDelivery]

    if (index >= 0 && index < updateListDistrictDelivery.length) {
      updateListDistrictDelivery.splice(index, 1)
      updateListDistrictDelivery.forEach((item, index) => (item.id = index))
    }

    if (index >= 0 && index < updateListWardDelivery.length) {
      updateListWardDelivery.splice(index, 1)
      updateListWardDelivery.forEach((item, index) => (item.id = index))
    }

    setListDistrictDelivery(updateListDistrictDelivery)
    setListWardDelivery(updateListWardDelivery)

    setAddresses(updatedAddresses)
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCancel}
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
            <TabContext value={valueTabs}>
              <Box className="tab-wrapper">
                <TabList onChange={handleChangeTabs} className="tab-list">
                  {tabs.map((tab, index) => (
                    <Tab key={index} className={getClassName(tab.value)} label={tab.label} value={tab.value} />
                  ))}
                </TabList>
              </Box>
              {/*-------------------------------------------TabPanel 1-----------------------------------------------*/}
              <TabPanel className="customer-handbook-tabpanel" value="1">
                <Box mt={2} sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Grid mt={2} item xs={12} container>
                        <Grid item xs={6}>
                          <Box sx={{ width: '271px' }}>
                            <InputLabel className="inputLabel-handbook">{t('customerName')}</InputLabel>
                            <InputLabel className="inputLabel-handbook-view">{customerName || t('noData')}</InputLabel>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ width: '271px' }}>
                            <InputLabel className="inputLabel-handbook">{t('customerRank')}</InputLabel>
                            <Box sx={{ display: 'flex' }}>
                              {data?.customer?.customer_rank?.customer_rank_name ? (
                                <InputLabel
                                  className="text-customer-rank"
                                  sx={{
                                    backgroundColor:
                                      colorsCustomerRank[data?.customer.customer_rank?.customer_rank_name]
                                  }}
                                >
                                  {data?.customer.customer_rank.customer_rank_name}
                                </InputLabel>
                              ) : (
                                <Typography className="inputLabel-handbook-view">{t('noData')}</Typography>
                              )}
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid mt={2} item xs={12} container>
                        <Grid item xs={6}>
                          <Box flex={1}>
                            <InputLabel className="inputLabel-handbook">{t('addressWebsite')}</InputLabel>
                            {isEdit ? (
                              <TextField
                                size="small"
                                disabled={!isEdit}
                                value={website}
                                onChange={handleChangeWebsite}
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
                            ) : (
                              <InputLabel className="inputLabel-handbook-view">{website || t('noData')}</InputLabel>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box flex={1}>
                            <InputLabel className="inputLabel-handbook">{t('addressFanpage')}</InputLabel>
                            {isEdit ? (
                              <TextField
                                size="small"
                                disabled={!isEdit}
                                value={fanpage}
                                onChange={handleChangeFanpage}
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
                            ) : (
                              <InputLabel className="inputLabel-handbook-view">{fanpage || t('noData')}</InputLabel>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid mt={2} item xs={12} container>
                        <Grid item xs={6}>
                          <Box flex={1}>
                            <InputLabel className="inputLabel-handbook">{t('staffingScale')}</InputLabel>
                            {isEdit ? (
                              <Autocomplete
                                disabled={!isEdit}
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
                            ) : (
                              <Typography className="inputLabel-handbook-view">
                                {listAllPersonnelScale.find((item) => item.id === staffingScale)
                                  ?.personnel_scale_name || t('noData')}
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box flex={1}>
                            <InputLabel className="inputLabel-handbook">{t('factoryScale')}</InputLabel>
                            {isEdit ? (
                              <Autocomplete
                                disabled={!isEdit}
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
                            ) : (
                              <Typography className="inputLabel-handbook-view">
                                {listAllFactoryScale.find((item) => item.id === factoryScale)?.factory_scale_name ||
                                  t('noData')}
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid mt={2} item xs={12}>
                        <Box>
                          <Box>
                            <InputLabel className="inputLabel-handbook customer-handbook-block">
                              {t('listContact')}
                            </InputLabel>
                            {isEdit && !isMaxContactReached && (
                              <AddCircleIcon fontSize="medium" className="addIcon" onClick={handleAddListContact} />
                            )}
                          </Box>
                          {contacts.map((contact, index) => (
                            <div key={index}>
                              {isEdit ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0 10px', mt: '10px' }}>
                                  <TextField
                                    size="small"
                                    disabled={!isEdit}
                                    value={contact.name}
                                    onChange={(e) => handleNameRoleChange(index, e.target.value)}
                                    sx={{ width: '271px' }}
                                    placeholder={t('enterNameOrRole')}
                                    InputProps={{
                                      classes: {
                                        root: 'custom-input-search'
                                      }
                                    }}
                                    error={errorMessageName[index] ? true : false}
                                    helperText={errorMessageName[index] ? errorMessageName[index] : ''}
                                  />
                                  <TextField
                                    size="small"
                                    disabled={!isEdit}
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
                                  {isEdit && contacts.length > 1 && (
                                    <RemoveCircleIcon
                                      fontSize="medium"
                                      onClick={() => handleRemoveListContact(index)}
                                      className="removeIcon"
                                    />
                                  )}
                                </Box>
                              ) : (
                                <Grid container spacing={0.5}>
                                  {contact.name && contact.phone_number ? (
                                    <>
                                      <Grid item xs={6}>
                                        <InputLabel className="inputLabel-handbook-view">{contact.name}</InputLabel>
                                      </Grid>
                                      <Grid item xs={6}>
                                        <InputLabel className="inputLabel-handbook-view">
                                          {contact.phone_number}
                                        </InputLabel>
                                      </Grid>
                                    </>
                                  ) : (
                                    <Grid item xs={12}>
                                      <InputLabel className="inputLabel-handbook-view">{t('noData')}</InputLabel>
                                    </Grid>
                                  )}
                                </Grid>
                              )}
                            </div>
                          ))}
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid mt={2} item xs={12} container>
                        <Box flex={1}>
                          {addresses.length === 0 ? (
                            <Typography sx={{ textAlign: 'center', color: colors.grayColor }}>{t('noData')}</Typography>
                          ) : (
                            addresses.map((address, index) => (
                              <React.Fragment key={index}>
                                <InputLabel className="inputLabel-handbook">
                                  {t('deliveryAddress')} {index + 1}
                                </InputLabel>
                                {isEdit ? (
                                  <Box
                                    className="customer-handbook-address-block"
                                    sx={{ display: 'flex', alignItems: 'center', gap: '0 6px', marginBottom: '16px' }}
                                  >
                                    <Box sx={{ width: '100%' }}>
                                      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                        <Box flex={1}>
                                          <Autocomplete
                                            disabled={!isEdit}
                                            popupIcon={<PolygonIcon />}
                                            options={dataProvince}
                                            getOptionLabel={(option) => option.province_name}
                                            value={
                                              address?.province_id
                                                ? dataProvince.find((province) => province.id === address?.province_id)
                                                : null
                                            }
                                            onChange={(e, newValue) => {
                                              handleAddressChange(index, 'province_id', newValue?.id ?? '')
                                            }}
                                            size="small"
                                            fullWidth
                                            renderInput={(params) => (
                                              <TextField {...params} variant="outlined" placeholder={t('city')} />
                                            )}
                                            ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                                            classes={{ inputRoot: 'custom-input-search' }}
                                          />
                                        </Box>
                                        <Box flex={1}>
                                          <Autocomplete
                                            disabled={!isEdit}
                                            popupIcon={<PolygonIcon />}
                                            options={(() => {
                                              let state = []
                                              if (address?.province_id) {
                                                state = listDistrictDelivery[index].data
                                              }
                                              return state
                                            })()}
                                            getOptionLabel={(option) => option.district_name}
                                            value={
                                              address?.district_id
                                                ? listDistrictDelivery[index].data.find(
                                                    (district) => district.id === address?.district_id
                                                  ) || null
                                                : null
                                            }
                                            noOptionsText={
                                              !address?.province_id && (
                                                <span style={{ color: colors.grayColor }}>
                                                  {t('pleaseSelectCityProvinceFirst')}
                                                </span>
                                              )
                                            }
                                            onChange={(e, newValue) => {
                                              handleDeliveryAddressChangeDistrict(
                                                index,
                                                'district_id',
                                                newValue?.id ?? ''
                                              )
                                            }}
                                            size="small"
                                            fullWidth
                                            renderInput={(params) => (
                                              <TextField {...params} variant="outlined" placeholder={t('district')} />
                                            )}
                                            ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                                            classes={{ inputRoot: 'custom-input-search' }}
                                          />
                                        </Box>
                                        <Box flex={0.7}>
                                          <Autocomplete
                                            disabled={!isEdit}
                                            popupIcon={<PolygonIcon />}
                                            options={(() => {
                                              let state = []
                                              if (address?.district_id) {
                                                state = listWardDelivery[index].data
                                              }
                                              return state
                                            })()}
                                            getOptionLabel={(option) => option.ward_name}
                                            value={
                                              address?.ward_id
                                                ? listWardDelivery[index].data.find(
                                                    (ward) => ward.id === address?.ward_id
                                                  ) || null
                                                : null
                                            }
                                            noOptionsText={
                                              !address?.district_id && (
                                                <span style={{ color: colors.grayColor }}>
                                                  {t('pleaseSelectDistrictFirst')}
                                                </span>
                                              )
                                            }
                                            onChange={(e, newValue) => {
                                              handleUpdateDeliveryAddress(index, 'ward_id', newValue?.id ?? '')
                                            }}
                                            size="small"
                                            fullWidth
                                            renderInput={(params) => (
                                              <TextField {...params} variant="outlined" placeholder={t('ward')} />
                                            )}
                                            ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                                            classes={{ inputRoot: 'custom-input-search' }}
                                          />
                                        </Box>
                                      </Box>
                                      <Box mt={0.5}>
                                        <TextField
                                          disabled={!isEdit}
                                          size="small"
                                          onChange={(e) => handleUpdateDeliveryAddress(index, 'detail', e.target.value)}
                                          fullWidth
                                          value={address.detail || ''}
                                          placeholder={t('specificDeliveryAddress')}
                                          InputProps={{
                                            classes: {
                                              root: 'custom-input-search'
                                            }
                                          }}
                                        />
                                      </Box>
                                    </Box>
                                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                      {index === addresses.length - 1 && isEdit && (
                                        <AddCircleIcon
                                          fontSize="medium"
                                          onClick={() => handleAddAddress(index)}
                                          className="addIcon"
                                        />
                                      )}
                                      {addresses.length > 1 && isEdit && (
                                        <RemoveCircleIcon
                                          fontSize="medium"
                                          onClick={() => handleRemoveAddress(index)}
                                          className="removeIcon"
                                        />
                                      )}
                                    </Box>
                                  </Box>
                                ) : address?.province_id !== '' ? (
                                  <Typography
                                    key={index}
                                    className="inputLabel-handbook-adress"
                                    sx={{ maxWidth: '100%', lineHeight: '12.41px' }}
                                  >
                                    {address.detail ? `${address.detail}, ` : ''}
                                    {address.ward_id
                                      ? `${listWardDelivery[index].data.find((ward) => ward.id === address.ward_id)?.ward_name}, `
                                      : ''}
                                    {address.district_id
                                      ? `${listDistrictDelivery[index].data.find((district) => district.id === address.district_id)?.district_name}, `
                                      : ''}
                                    {address.province_id
                                      ? `${dataProvince.find((province) => province.id === address.province_id)?.province_name}`
                                      : ''}
                                  </Typography>
                                ) : (
                                  <Typography className="inputLabel-handbook-view">{t('noData')}</Typography>
                                )}
                              </React.Fragment>
                            ))
                          )}
                        </Box>
                      </Grid>
                      <Grid sx={{ marginTop: '35px' }} mt={2} item xs={12} container>
                        <Grid item xs={6}>
                          <Box flex={1}>
                            <InputLabel className="inputLabel-handbook">{t('typeOfBusiness')}</InputLabel>
                            {isEdit ? (
                              <Autocomplete
                                disabled={!isEdit}
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
                            ) : (
                              <Typography className="inputLabel-handbook-view">
                                {listAllCompanyType.find((item) => item.id === typeOfCompany)?.company_type_name ||
                                  t('noData')}
                              </Typography>
                            )}
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box flex={1}>
                            <InputLabel className="inputLabel-handbook">
                              {t('dateOfEstablishmentOfTheEnterprise')}
                            </InputLabel>
                            {isEdit ? (
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                  disabled={!isEdit}
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
                            ) : (
                              <InputLabel className="inputLabel-handbook-view">
                                {selectedDate ? dayjs(selectedDate).format('DD-MM-YYYY') : t('noData')}
                              </InputLabel>
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                      <Grid mt={2} item xs={12} container>
                        <Box flex={1}>
                          <Box mt={2} mb="10px" sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <InputLabel sx={{ mb: '0 !important' }} className="inputLabel-handbook">
                              {t('image')}
                            </InputLabel>
                            {isEdit && (
                              <AddCircleIcon fontSize="medium" className="addIcon" onClick={handleAddIconClick} />
                            )}
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
                            isVisible={isEdit}
                            fieldPath="path"
                            uploadProgress={uploadProgress}
                            isUploading={isUploading}
                            imageOnly={true}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>
              {/*-------------------------------------------TabPanel 2-----------------------------------------------*/}
              <TabPanel className="customer-handbook-tabpanel" value="2">
                <Grid mt={2} container spacing={2}>
                  <Grid item xs={6}>
                    <Box flex={1}>
                      <InputLabel className="inputLabel-handbook">{t('typesOfProductsCommonlyTaken')}</InputLabel>
                      <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                        {data && data.top_products && data.top_products.length > 0 ? (
                          data.top_products.map((product) => (
                            <InputLabel key={product.id} className="text-customer-top-rank">
                              {product.code} - {product.product_name}
                            </InputLabel>
                          ))
                        ) : (
                          <Typography className="text-customer-top-rank">{t('noDataYet')}</Typography>
                        )}
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box flex={1}>
                      <InputLabel className="inputLabel-handbook">{t('mainProductGroup')}</InputLabel>
                      {isEdit ? (
                        <Box className="customer-handbook-group-product">
                          {(mainProductGroup ?? []).length > 0 ? (
                            mainProductGroup.map((option) => (
                              <Chip
                                key={option.id}
                                label={option.product_group_name}
                                className="customer-handbook-group-product-item"
                              />
                            ))
                          ) : (
                            <span>{t('noSuitableResultsFound')}</span>
                          )}
                        </Box>
                      ) : (
                        <Typography className="inputLabel-handbook-view">
                          {(mainProductGroup ?? []).length > 0
                            ? mainProductGroup.map((item) => item.product_group_name).join(', ')
                            : t('noData')}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid mt={2} container spacing={2}>
                  <Grid item xs={3}>
                    <Box>
                      <InputLabel className="inputLabel-handbook">{t('purchaseFrequencyOverMonth')}</InputLabel>
                      {isEdit ? (
                        <TextField
                          disabled={true}
                          size="small"
                          value={purchaseFrequencyOverMonth}
                          sx={{ width: '271px' }}
                          InputProps={{
                            classes: {
                              root: 'custom-input-search'
                            }
                          }}
                        />
                      ) : (
                        <Typography className="inputLabel-handbook-view">
                          {purchaseFrequencyOverMonth || t('noData')}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box>
                      <InputLabel className="inputLabel-handbook">{t('industryGroup')}</InputLabel>
                      {isEdit ? (
                        <Autocomplete
                          value={selectedIndustryGroups}
                          onChange={handleIndustryGroupChange}
                          multiple
                          limitTags={3}
                          size="small"
                          disabled={!isEdit}
                          options={listAllIndustryGroup}
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
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: '10px'
                                }
                              }}
                              placeholder={!selectedIndustryGroups.length ? t('enterIndustryGroup') : ''}
                            />
                          )}
                        />
                      ) : (
                        <Typography className="inputLabel-handbook-view">
                          {selectedIndustryGroups.length > 0
                            ? selectedIndustryGroups.map((industry) => industry.industry_group_name).join(', ')
                            : t('noData')}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box>
                      <InputLabel className="inputLabel-handbook">{t('area')}</InputLabel>
                      {isEdit ? (
                        <TextField
                          size="small"
                          disabled={!isEdit}
                          value={area}
                          onChange={handleAreaChange}
                          sx={{ width: '271px' }}
                          placeholder={t('enterArea')}
                          InputProps={{
                            classes: {
                              root: 'custom-input-search'
                            }
                          }}
                        />
                      ) : (
                        <Typography className="inputLabel-handbook-view">{area || t('noData')}</Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box>
                      <InputLabel className="inputLabel-handbook">{t('debtAgeGroup')}</InputLabel>
                      {isEdit ? (
                        <TextField
                          size="small"
                          fullWidth
                          disabled
                          value={debtAgeGroup || t('noData')}
                          InputProps={{
                            classes: {
                              root: 'custom-input-search'
                            }
                          }}
                        />
                      ) : (
                        <Typography className="inputLabel-handbook-view">{debtAgeGroup || t('noData')}</Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid mt={2} container spacing={2}>
                  <Grid item xs={3}>
                    <Box>
                      <InputLabel className="inputLabel-handbook">{t('productSubstitutionPossibilities')}</InputLabel>
                      {isEdit ? (
                        <Autocomplete
                          disabled={!isEdit}
                          popupIcon={<PolygonIcon />}
                          noOptionsText={t('noResult')}
                          onChange={(event, value) => setProductSubstitutionPossibilities(value ? value.id : '')}
                          options={listAllProductSubstitutability}
                          value={
                            listAllProductSubstitutability.find(
                              (areaData) => areaData.id === productSubstitutionPossibilities
                            ) || null
                          }
                          getOptionLabel={(option) => option.product_substitutability_name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              size="small"
                              placeholder={t('enterProductSubstitutionPossibilities')}
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
                      ) : (
                        <Typography className="inputLabel-handbook-view">
                          {listAllProductSubstitutability.find(
                            (areaData) => areaData.id === productSubstitutionPossibilities
                          )?.product_substitutability_name || t('noData')}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={6}>
                    <Box>
                      <InputLabel className="inputLabel-handbook">{t('orderingPlan')}</InputLabel>
                      {isEdit ? (
                        <Autocomplete
                          disabled={!isEdit}
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
                      ) : (
                        <Typography className="inputLabel-handbook-view">
                          {listAllOrderPlan.find((item) => item.id === orderingPlan)?.order_plan_handbook_name ||
                            t('noData')}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid mt={2} container spacing={2}>
                  <Grid item xs={6}>
                    <Box>
                      <InputLabel className="inputLabel-handbook">{t('qualityRequirements')}</InputLabel>
                      {isEdit ? (
                        <Autocomplete
                          disabled={!isEdit}
                          popupIcon={<PolygonIcon />}
                          noOptionsText={t('noResult')}
                          options={listAllQuanlityRequire}
                          value={listAllQuanlityRequire.find((item) => item.id === qualityRequirements) || null}
                          getOptionLabel={(option) => option.quality_require_name}
                          onChange={(event, newValue) => setQualityRequirements(newValue ? newValue.id : '')}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
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
                      ) : (
                        <Typography className="inputLabel-handbook-view">
                          {listAllQuanlityRequire.find((item) => item.id === qualityRequirements)
                            ?.quality_require_name || t('noData')}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box>
                      <InputLabel className="inputLabel-handbook">{t('productApplication')}</InputLabel>
                      {isEdit ? (
                        <Autocomplete
                          value={productApplications}
                          onChange={handleProductApplicationChange}
                          multiple
                          limitTags={5}
                          size="small"
                          disabled={!isEdit}
                          options={listAllProductApplication}
                          disableCloseOnSelect
                          getOptionLabel={(option) => (option ? option.product_application_name : '')}
                          renderOption={(props, option, { selected }) => (
                            <li {...props}>
                              <Checkbox
                                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                                checkedIcon={<CheckBoxIcon fontSize="small" />}
                                style={{ marginRight: 8, fontSize: '12px' }}
                                checked={selected}
                              />
                              {option.product_application_name}
                            </li>
                          )}
                          style={{ borderRadius: '10px' }}
                          ChipProps={{
                            style: { height: 'auto' }
                          }}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              {...params}
                              sx={{
                                '& .MuiOutlinedInput-root': {
                                  borderRadius: '10px'
                                }
                              }}
                              placeholder={!productApplication.length ? t('chooseProductApplication') : ''}
                            />
                          )}
                        />
                      ) : (
                        <Typography className="inputLabel-handbook-view">
                          {productApplications.length > 0
                            ? productApplications.map((product) => product.product_application_name).join(', ')
                            : t('noData')}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
              {/*-------------------------------------------TabPanel 3-----------------------------------------------*/}
              <TabPanel className="customer-handbook-tabpanel" value="3">
                <Grid mt={2} container spacing={2}>
                  <Grid item xs={3}>
                    <Box>
                      <InputLabel className="inputLabel-handbook">{t('frequencyOfCompanyVisits')}</InputLabel>
                      {isEdit ? (
                        <Autocomplete
                          disabled={!isEdit}
                          sx={{ width: '271px' }}
                          popupIcon={<PolygonIcon />}
                          noOptionsText={t('noResult')}
                          options={listAllFrequencyCompanyVisit}
                          value={
                            listAllFrequencyCompanyVisit.find((item) => item.id === companyVisitsFrequency) || null
                          }
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
                      ) : (
                        <Typography className="inputLabel-handbook-view">
                          {listAllFrequencyCompanyVisit.find((item) => item.id === companyVisitsFrequency)
                            ?.frequency_company_visit_name || t('noData')}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box>
                      <InputLabel className="inputLabel-handbook">{t('businessOwnerBirthday')}</InputLabel>
                      {isEdit ? (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <MobileDatePicker
                            className="customer-handbook-date-picker"
                            placeholder={t('selectDate')}
                            disabled={!isEdit}
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
                      ) : (
                        <InputLabel className="inputLabel-handbook-view">
                          {businessOwnerBirthday ? dayjs(businessOwnerBirthday).format('DD-MM-YYYY') : t('noData')}
                        </InputLabel>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid mt={2} container spacing={2}>
                  <Grid item xs={3}>
                    <Box sx={{ width: '271px' }}>
                      <InputLabel className="inputLabel-handbook">{t('incentivePolicy')}</InputLabel>
                      {isEdit ? (
                        <Autocomplete
                          disabled={!isEdit}
                          sx={{ width: '271px' }}
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
                      ) : (
                        <Typography className="inputLabel-handbook-view">
                          {listAllIncentivePolicy.find((item) => item.id === incentivePolicy)?.incentive_policy_name ||
                            t('noData')}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box>
                      <InputLabel className="inputLabel-handbook">{t('discountPolicyBasedOnOutput')}</InputLabel>
                      {isEdit ? (
                        <TextField
                          size="small"
                          disabled={!isEdit}
                          value={discountPolicyBasedOnOutput}
                          onChange={handleDiscountPolicyBasedOnOutputChange}
                          sx={{ width: '271px' }}
                          placeholder={t('enterDiscountPolicyBasedOnOutput')}
                          InputProps={{
                            classes: {
                              root: 'custom-input-search'
                            }
                          }}
                        />
                      ) : (
                        <InputLabel className="inputLabel-handbook-view">
                          {discountPolicyBasedOnOutput || t('noData')}
                        </InputLabel>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid mt={2} container spacing={2}>
                  <Grid item xs={12}>
                    <Box>
                      <InputLabel className="inputLabel-handbook">{t('characterOrInterests')}</InputLabel>
                      {isEdit ? (
                        <TextField
                          size="small"
                          disabled={!isEdit}
                          value={characterOrInterests}
                          onChange={handleCharacterOrInterestsChange}
                          fullWidth
                          placeholder={t('enterCharacterOrInterests')}
                          InputProps={{
                            classes: {
                              root: 'custom-input-search'
                            }
                          }}
                        />
                      ) : (
                        <InputLabel className="inputLabel-handbook-view">
                          {characterOrInterests || t('noData')}
                        </InputLabel>
                      )}
                    </Box>
                  </Grid>
                </Grid>
                <Grid mt={2} container spacing={2}>
                  <Grid item xs={12}>
                    <Box>
                      <InputLabel className="inputLabel-handbook">{t('specialNotes')}</InputLabel>
                      {isEdit ? (
                        <TextField
                          size="small"
                          fullWidth
                          value={specialNotes}
                          onChange={handleSpecialNotesChange}
                          disabled={!isEdit}
                          placeholder={t('enterNotes')}
                          InputProps={{
                            classes: {
                              root: 'custom-input-search'
                            }
                          }}
                        />
                      ) : (
                        <InputLabel className="inputLabel-handbook-view">{specialNotes || t('noData')}</InputLabel>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </TabPanel>
              {/*-------------------------------------------TabPanel 4-----------------------------------------------*/}
              <TabPanel className="customer-handbook-tabpanel" value="4">
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <CustomDateRangePicker
                    className="date-range-picker"
                    onChange={handleDateRangeConsultingHistoriesChange}
                    onSelect={true}
                  />
                  <Button
                    disabled={!isEdit}
                    className={`addButton ${isLastRowComplete === true || !isEdit ? 'disabled-cursor' : ''}`}
                    onClick={isLastRowComplete === false ? handleAddConsultingHistory : null}
                  >
                    <AddIcon />
                    {t('addHistory')}
                  </Button>
                </Box>
                <Box mt={1}>
                  <ConsultingHistoryTable
                    isEdit={isEdit}
                    listAllConsultationHistoryProblem={listAllConsultationHistoryProblem}
                    titleTable={titleTableListConsultingHistories}
                    data={filterConsultingHistories(consultingHistories, dateRangeConsultingHistories)}
                    handleDelete={handleDeleteConsulting}
                    handleUpdateConsultingHistory={handleUpdateConsultingHistory}
                    successFlag={successDeleteConsultingHistoryMessage}
                    disabledRows={disabledRows}
                    setDisabledRows={setDisabledRows}
                    rowNewConsultingHistories={rowNewConsultingHistories}
                  />
                </Box>
              </TabPanel>
              {/*-------------------------------------------TabPanel 5-----------------------------------------------*/}
              <TabPanel className="customer-handbook-tabpanel" value="5">
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <Button
                    disabled={!isEdit}
                    className={`addButton ${isLastRowCompleteMachineData === true || !isEdit ? 'disabled-cursor' : ''}`}
                    onClick={isLastRowCompleteMachineData === false ? handleAddMachineData : null}
                  >
                    <AddIcon />
                    {t('addMachineData')}
                  </Button>
                </Box>
                <Box mt={1}>
                  <DeviceTable
                    isEdit={isEdit}
                    titleTable={titleTableListDevice}
                    deviceMachines={deviceMachines}
                    listAllDeviceMachineType={listAllDeviceMachineType}
                    listAllDeviceMachineManufacturer={listAllDeviceMachineManufacturer}
                    handleDelete={handleDeleteMachineData}
                    handleUpdateDeviceMachineData={handleUpdateDeviceMachineData}
                    successFlag={successDeleteMachineDataMessage}
                    disabledRows={disabledRowsMachineData}
                    setDisabledRows={setDisabledRowsMachineData}
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
            <Typography sx={{ marginRight: '15px' }} variant="body1" color="error" className="error-message">
              {errorsMessage}
            </Typography>
            <Button variant="outlined" onClick={handleCancel} className="cancelButton">
              {t('cancel')}
            </Button>
            {isEdit ? (
              <Button variant="contained" className="confirmButton" onClick={handleSubmit}>
                {t('confirm')}
                <ArrowForwardIcon />
              </Button>
            ) : (
              <Button variant="contained" className="confirmButton" onClick={handleEdit}>
                {t('editAction')}
                <ArrowForwardIcon />
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  )
}
