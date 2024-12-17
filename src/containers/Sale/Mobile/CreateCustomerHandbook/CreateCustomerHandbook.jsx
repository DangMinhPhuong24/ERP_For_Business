// @ts-nocheck
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import DateRangeIcon from '@mui/icons-material/DateRange'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { Box, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Tab from '@mui/material/Tab'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import dayjs from 'dayjs'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PolygonIcon from '../../../../asset/icon/Polygon.svg'
import titleTableListConsultingHistoriesMobile from '../../../../constants/titleTableListConsultingHistoriesMobile'
import {
  appDistrictListTempState,
  appProvinceListState,
  appWardListTempState
} from '../../../../redux/app/app.selectors'
import {
  createCustomerAction,
  getAllCompanyTypeAction,
  getAllConsultationHistoryProblemAction,
  getAllCustomerRankAction,
  getAllFactoryScaleAction,
  getAllFrequencyCompanyVisitAction,
  getAllIncentivePolicyAction,
  getAllIndustryGroupAction,
  getAllOrderPlanAction,
  getAllPersonnelScaleAction,
  getAllProductApplicationAction,
  getAllProductSubstitutabilityAction,
  getAllQuanlityRequireAction,
  getAllDeviceMachineManufacturerAction,
  getAllDeviceMachineTypeAction
} from '../../../../redux/customer/customer.actions'
import {
  listAllCompanyTypeState,
  listAllConsultationHistoryProblemState,
  listAllDeviceMachineManufacturerState,
  listAllDeviceMachineTypeState,
  listAllFactoryScaleState,
  listAllFrequencyCompanyVisitState,
  listAllIncentivePolicyState,
  listAllIndustryGroupState,
  listAllOrderPlanState,
  listAllPersonnelScaleState,
  listAllProductApplicationState,
  listAllProductSubstitutabilityState,
  listAllQuanlityRequireState
} from '../../../../redux/customer/customer.selectors'
import '../../../../resource/style/CustomerDetailStyle.css'

import DeviceMobileTable from 'components/Table/CustomerTable/DeviceTable/Mobile'
import { isEmpty } from 'lodash'
import AddIcon from '../../../../asset/icon/AddIcon.svg'
import StandardImageList from '../../../../components/StandardImageList'
import ConsultingHistoryMobileTable from '../../../../components/Table/CustomerTable/ConsultingHistoryTable/Mobile'
import colors from '../../../../constants/colors'
import commons from '../../../../constants/common'
import { renderUploadMessage } from '../../../../common/common'
import {
  getListDistrictByProvinceIdAction,
  getListWardByDistrictIdAction,
  setGetListDistrictFlagAction,
  setGetListWardFlagAction
} from '../../../../redux/app/app.actions'
import { getErrorMessageByName, s3, validateCustomerHandbook } from '../../../../utils'
import DeviceMobilePage from '../CustomerInfo/DeviceMobile'
import HistoryOfMobileConsultingPage from '../CustomerInfo/HistoryOfMobileConsulting'
import titleTableListDeviceMobile from 'constants/titleTableListDeviceMobile'
import { toast } from 'react-toastify'

export default function CreateCustomerHandbook(props) {
  const { onSwitchToCustomer, createCustomers } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [valueTabs, setValueTabs] = useState('1')
  const [selectedDate, setSelectedDate] = useState(null)
  const [contacts, setContacts] = useState([{ name: '', phone_number: '' }])
  const [isMaxContactReached, setIsMaxContactReached] = useState(false)
  const [website, setWebsite] = useState('')
  const [fanpage, setFanpage] = useState('')
  const [companyVisitsFrequency, setCompanyVisitsFrequency] = useState('')
  const [businessOwnerBirthday, setBusinessOwnerBirthday] = useState(null)
  const [discountPolicyBasedOnOutput, setDiscountPolicyBasedOnOutput] = useState('')
  const [characterOrInterests, setCharacterOrInterests] = useState('')
  const [specialNotes, setSpecialNotes] = useState('')
  const [industryGroup, setIndustryGroup] = useState([])
  const [area, setArea] = useState('')
  const [productSubstitutionPossibilities, setProductSubstitutionPossibilities] = useState('')
  const [orderingPlan, setOrderingPlan] = useState('')
  const [qualityRequirements, setQualityRequirements] = useState('')
  const [productApplication, setProductApplication] = useState([])
  const [staffingScale, setStaffingScale] = useState('')
  const [factoryScale, setFactoryScale] = useState('')
  const [typeOfCompany, setTypeOfCompany] = useState('')
  const fileInputRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState([])
  const [incentivePolicy, setIncentivePolicy] = useState('')
  const [isLastRowComplete, setIsLastRowComplete] = useState(false)
  const [successDeleteConsultingHistoryMessage, setSuccessDeleteConsultingHistoryMessage] = useState(false)
  const [isLastRowCompleteMachineData, setIsLastRowCompleteMachineData] = useState(false)

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
  const [isEditConsultingHistory, setIsEditConsultingHistory] = useState(false)
  const [isEditDeviceMachineManufacturer, setIsEditDeviceMachineManufacturer] = useState(false)

  const [deviceMachines, setDeviceMachines] = useState([
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
  const [errorMessages, setErrorMessages] = useState({})

  const [indexDistrictDelivery, setIndexDistrictDelivery] = useState('')
  const [indexWardDelivery, setIndexWardDelivery] = useState('')
  const [listDistrictDelivery, setListDistrictDelivery] = useState([{ id: 0, data: [] }])
  const [listWardDelivery, setListWardDelivery] = useState([{ id: 0, data: [] }])
  const [addresses, setAddresses] = useState([{ province_id: '', district_id: '', ward_id: '' }])
  const [disabledRows, setDisabledRows] = useState(new Array(consultingHistories.length).fill(true))
  const [disabledRowsMachineData, setDisabledRowsMachineData] = useState(deviceMachines.map(() => true))
  const [successDeleteMachineDataMessage, setSuccessDeleteMachineDataMessage] = useState(false)
  const listAllPersonnelScale = useSelector(listAllPersonnelScaleState)
  const listAllFactoryScale = useSelector(listAllFactoryScaleState)
  const listAllCompanyType = useSelector(listAllCompanyTypeState)
  const listAllOrderPlan = useSelector(listAllOrderPlanState)
  const listAllQuanlityRequire = useSelector(listAllQuanlityRequireState)
  const listAllProductApplication = useSelector(listAllProductApplicationState)
  const listAllFrequencyCompanyVisit = useSelector(listAllFrequencyCompanyVisitState)
  const listAllIncentivePolicy = useSelector(listAllIncentivePolicyState)
  const listAllConsultationHistoryProblem = useSelector(listAllConsultationHistoryProblemState)
  const listAllProductSubstitutability = useSelector(listAllProductSubstitutabilityState)
  const listAllIndustryGroup = useSelector(listAllIndustryGroupState)
  const districtDataTemp = useSelector(appDistrictListTempState)
  const provinceData = useSelector(appProvinceListState)
  const wardDataTemp = useSelector(appWardListTempState)
  const listAllDeviceMachineType = useSelector(listAllDeviceMachineTypeState)
  const listAllDeviceMachineManufacturer = useSelector(listAllDeviceMachineManufacturerState)
  const [selectedItemConsultingHistory, setSelectedItemConsultingHistory] = useState(null)
  const [modeEditConsultingHistory, setModeEditConsultingHistory] = useState(null)
  const [isViewingConsultingHistory, setIsViewingConsultingHistory] = useState(false)
  const [selectedItemDevice, setSelectedItemDevice] = useState(null)
  const [modeEditDevice, setModeEditDevice] = useState(null)
  const [isViewingDevice, setIsViewingDevice] = useState(false)

  useEffect(() => {
    dispatch(getAllCustomerRankAction())
    dispatch(getAllPersonnelScaleAction())
    dispatch(getAllFactoryScaleAction())
    dispatch(getAllCompanyTypeAction())
    dispatch(getAllIndustryGroupAction())
    dispatch(getAllProductSubstitutabilityAction())
    dispatch(getAllOrderPlanAction())
    dispatch(getAllQuanlityRequireAction())
    dispatch(getAllProductApplicationAction())
    dispatch(getAllFrequencyCompanyVisitAction())
    dispatch(getAllIncentivePolicyAction())
    dispatch(getAllConsultationHistoryProblemAction())
    dispatch(getAllDeviceMachineManufacturerAction())
    dispatch(getAllDeviceMachineTypeAction())
  }, [])

  useEffect(() => {
    const lastItem = deviceMachines[0]
    if (
      deviceMachines.length === 0 ||
      (lastItem &&
        lastItem.device_machine_type_id &&
        lastItem.device_machine_manufacturer_id &&
        lastItem.machine_code &&
        lastItem.quantity)
    ) {
      setIsLastRowCompleteMachineData(false)
    } else {
      setIsLastRowCompleteMachineData(true)
    }
  }, [deviceMachines])

  const handleUpdateDeviceMachineData = (index, field, value) => {
    const machineDataInput = [...deviceMachines]
    machineDataInput[index][field] = value
    setDeviceMachines(machineDataInput)
  }

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
      setIsLastRowComplete(true)
    }
  }, [consultingHistories])

  const handleDelete = (index) => {
    const updatedItems = [...selectedImage]
    updatedItems.splice(index, 1)
    setSelectedImage(updatedItems)
  }

  const customer = useMemo(
    () => ({
      company_name: createCustomers.company_name,
      customer_name: createCustomers.customer_name,
      debtAge: createCustomers.debtAge,
      debt_limit: createCustomers.debt_limit,
      phone_number: createCustomers.phone_number,
      user_ids: createCustomers.user_ids,
      zalo_number: createCustomers.zalo_number,
      website_address: website,
      fanpage_address: fanpage,
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
      device_machines: deviceMachines,
      address_deliveries: addresses,
      address_offices: createCustomers.address_offices,
      address_branches: createCustomers.address_branches,
      address_factories: createCustomers.address_factories
    }),
    [
      addresses,
      area,
      businessOwnerBirthday,
      characterOrInterests,
      companyVisitsFrequency,
      consultingHistories,
      contacts,
      createCustomers.address_branches,
      createCustomers.address_factories,
      createCustomers.address_offices,
      createCustomers.company_name,
      createCustomers.customer_name,
      createCustomers.debtAge,
      createCustomers.debt_limit,
      createCustomers.phone_number,
      createCustomers.user_id,
      createCustomers.zalo_number,
      deviceMachines,
      discountPolicyBasedOnOutput,
      factoryScale,
      fanpage,
      industryGroup,
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

  const handleDeleteMachineData = (index) => {
    disabledRowsMachineData.splice(index, 1)
    const updatedData = [...deviceMachines]
    updatedData.splice(index, 1)
    setDeviceMachines(updatedData)
    setSuccessDeleteMachineDataMessage(Math.random())
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

  const handleRemoveListContact = (index) => {
    const updatedAddresses = [...contacts]
    updatedAddresses.splice(index, 1)
    setContacts(updatedAddresses)
    const numAddresses = updatedAddresses.length
    if (numAddresses < commons.MAX_ADDRESS_COUNT) {
      setIsMaxContactReached(false)
    }
  }

  const selectedIndustryGroups = useMemo(
    () => listAllIndustryGroup.filter((option) => industryGroup.includes(option.id)),
    [industryGroup, listAllIndustryGroup]
  )

  const productApplications = useMemo(
    () => listAllProductApplication.filter((option) => productApplication.includes(option.id)),
    [listAllProductApplication, productApplication]
  )

  const handleAddMachineData = (field, value) => {
    const machineDataInput = [...deviceMachines]
    machineDataInput[0][field] = value
    setSelectedItemDevice({ item: machineDataInput[0] })
    setDeviceMachines(machineDataInput)
  }

  const handleAddConsultingHistory = (field, value) => {
    const updatedConsultingHistories = [...consultingHistories]
    updatedConsultingHistories[0][field] = value
    setSelectedItemConsultingHistory({ item: updatedConsultingHistories[0] })
    setConsultingHistories(updatedConsultingHistories)
  }

  const handleFileUpload = async (files) => {
    let validFiles = []
    let invalidFileTypes = []
    let oversizedFiles = []
    let uploadedImages = [...selectedImage]
    const validImageTypes = ['image/png', 'image/jpeg']

    Array.from(files).forEach((file) => {
      if (!validImageTypes.includes(file.type)) {
        invalidFileTypes.push(file.name)
      } else if (file.size > commons.MAX_SIZE_IMAGE) {
        oversizedFiles.push(file.name)
      } else {
        validFiles.push(file)
      }
    })

    if (invalidFileTypes.length > 0) {
      const invalidFilesMessage = renderUploadMessage(invalidFileTypes, t('inValidImageType'))

      toast.error(invalidFilesMessage)
    }

    if (oversizedFiles.length > 0) {
      const oversizedFilesMessage = renderUploadMessage(oversizedFiles, t('sizeImageLimit'))

      toast.error(oversizedFilesMessage)
    }

    if (validFiles.length > 0) {
      const uploadPromises = validFiles.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = async function (upload) {
            const base64Data = upload.target.result.split(',')[1]
            const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then((res) => res.blob())

            const params = {
              Bucket: process.env.REACT_APP_BUCKET,
              Key: file.name,
              Body: blob,
              ContentType: file.type
            }

            s3.upload(params, (error, data) => {
              if (error) {
                console.error('Upload error:', error)
                reject(error)
              } else {
                uploadedImages.push({ path: data.Location })
                resolve()
              }
            })
          }
          reader.readAsDataURL(file)
        })
      })

      try {
        await Promise.all(uploadPromises)
        setSelectedImage([...uploadedImages])
        toast.success(t('imageUploadSuccess'))
      } catch (error) {
        console.error('Some uploads failed:', error)
      }
    }
  }

  const tabs = useMemo(
    () => [
      { label: t('generalInfo'), value: '1' },
      { label: t('customerPortrait'), value: '2' },
      { label: t('customerCareMechanism'), value: '3' },
      { label: t('consultingHistory'), value: '4' },
      { label: t('devices'), value: '5' }
    ],
    [t]
  )
  const getClassName = useCallback(
    (value) => `button-tab ${valueTabs === value ? 'button-tab-selected' : 'button-tab-unselected'}`,
    [valueTabs]
  )

  const handleDeleteConsulting = (index) => {
    disabledRows.splice(index, 1)
    const deleteConsulting = [...consultingHistories]
    deleteConsulting.splice(index, 1)
    setConsultingHistories(deleteConsulting)
    setSuccessDeleteConsultingHistoryMessage(Math.random())
  }

  const handleViewConsultingHistory = (item) => {
    setModeEditConsultingHistory(false)
    setIsViewingConsultingHistory(true)
    setSelectedItemConsultingHistory({ item })
  }

  const handleEditConsultingHistory = (item, index) => {
    setIsEditConsultingHistory(true)
    setModeEditConsultingHistory(true)
    setIsViewingConsultingHistory(true)
    setSelectedItemConsultingHistory({ item, index })
  }

  const handleUpdateConsultingHistory = (index, field, value) => {
    const updatedConsultingHistories = [...consultingHistories]
    updatedConsultingHistories[index][field] = value
    setConsultingHistories(updatedConsultingHistories)
  }

  useEffect(() => {
    if (districtDataTemp.length > 0) {
      const updateDataDistrictIfSameId = listDistrictDelivery.map((district) => {
        if (district?.id === indexDistrictDelivery) {
          return { id: district?.id, data: districtDataTemp }
        } else {
          return { id: district?.id, data: district?.data }
        }
      })
      setListDistrictDelivery(updateDataDistrictIfSameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtDataTemp, indexDistrictDelivery])

  useEffect(() => {
    if (wardDataTemp.length > 0) {
      const updateDataWardIfSameId = listWardDelivery.map((ward) => {
        if (ward?.id === indexWardDelivery) {
          return { id: ward?.id, data: wardDataTemp }
        } else {
          return { id: ward?.id, data: ward?.data }
        }
      })
      setListWardDelivery(updateDataWardIfSameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wardDataTemp, indexWardDelivery])

  const handleAddAddress = (index) => {
    setAddresses([...addresses, { province_id: '', district_id: '', ward_id: '' }])

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

  const handleChangeProvinceFormCreateUser = useCallback((value) => {
    dispatch(setGetListDistrictFlagAction(true))
    dispatch(getListDistrictByProvinceIdAction(value))
  }, [])

  const handleAddressChange = (index, field, value) => {
    let updatedAddresses = [...addresses]
    if (value) {
      updatedAddresses[index][field] = value
      setAddresses(updatedAddresses)
      handleChangeProvinceFormCreateUser(value)
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

  const handleChangeDistrictFormCreateUser = useCallback((value) => {
    dispatch(setGetListWardFlagAction(true))
    dispatch(getListWardByDistrictIdAction(value))
  }, [])

  const handleDeliveryAddressChangeDistrict = (index, field, value) => {
    let updatedFactoryAddresses = [...addresses]
    if (value) {
      updatedFactoryAddresses[index][field] = value
      setAddresses(updatedFactoryAddresses)
      handleChangeDistrictFormCreateUser(value)
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

  const handleSubmit = () => {
    dispatch(createCustomerAction(customer))
    navigate(`/sale/information`)
  }

  const handleNextTab = () => {
    if (valueTabs === '5') return
    if (valueTabs === '1') {
      let validate = validateCustomerHandbook(customer, t)
      setErrorMessages(validate)
      if (isEmpty(validate)) {
        setValueTabs((prevIndex) => {
          return (parseInt(prevIndex) + 1).toString()
        })
      } else {
        toast.error(t('pleaseCheckTheInformationAgain'), {
          autoClose: 3000
        })
      }
    } else {
      setValueTabs((prevIndex) => (parseInt(prevIndex) + 1).toString())
    }
  }

  const handlePreviousTab = () => {
    if (valueTabs === '1') {
      setValueTabs((prevIndex) => (parseInt(prevIndex) - 1).toString())
    } else {
      setValueTabs((prevIndex) => (parseInt(prevIndex) - 1).toString())
    }
  }

  const handleOpenAddMachineData = () => {
    const newRow = {
      device_machine_type_id: '',
      device_machine_manufacturer_id: '',
      device_machine_type_name: '',
      device_machine_manufacturer_name: '',
      manufacturer: '',
      machine_code: '',
      quantity: ''
    }
    setDeviceMachines((prevState) => [newRow, ...prevState])
    setSuccessDeleteMachineDataMessage(false)
    setModeEditDevice(true)
    setIsViewingDevice(true)
    setIsEditDeviceMachineManufacturer(false)
    setSelectedItemDevice({})
  }

  const handleOpenAddConsultingHistory = () => {
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
    setModeEditConsultingHistory(true)
    setIsViewingConsultingHistory(true)
    setIsEditConsultingHistory(false)
    setSelectedItemConsultingHistory({})
  }

  const handleViewDevice = (item) => {
    setModeEditDevice(false)
    setIsViewingDevice(true)
    setSelectedItemDevice({ item })
  }

  const handleEditDevice = (item, index) => {
    setIsEditDeviceMachineManufacturer(true)
    setModeEditDevice(true)
    setIsViewingDevice(true)
    setSelectedItemDevice({ item, index })
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '0 !important',
          border: '1px solid #EFF0F6 !important'
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            p: '8px !important',
            bgcolor: colors.lightlavendergrayColor,
            minHeight: '48px !important',
            border: '1px solid #EFF0F6 !important'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              sx={{
                bgcolor: colors.whiteColor,
                color: colors.lightroyalblueColor,
                mr: 1,
                minWidth: '30px',
                borderRadius: '8px'
              }}
              onClick={valueTabs != '1' ? handlePreviousTab : onSwitchToCustomer}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
            </Button>
            <Typography sx={{ fontWeight: 400, fontSize: 16, color: colors.lightroyalblueColor }}>
              {t('customerHandbookTitle')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {valueTabs != '5' ? (
              <Button variant="contained" className="modalButtonClick" onClick={handleNextTab}>
                {t('continue')}
                <ArrowForwardIcon />
              </Button>
            ) : (
              <Button variant="contained" className="modalButtonClick" onClick={handleSubmit}>
                {t('complete')}
                <ArrowForwardIcon />
              </Button>
            )}
          </Box>
        </Toolbar>
      </Box>
      <Box sx={{ padding: '5px', backgroundColor: colors.lilywhiteColor, width: '100vw', height: '100%' }}>
        <TabContext value={valueTabs}>
          <Box className="tab-wrapper-mobile">
            <TabList className="tab-list-mobile" variant="scrollable">
              {tabs.map((tab, index) => (
                <Tab key={index} className={getClassName(tab.value)} label={tab.label} disabled />
              ))}
            </TabList>
          </Box>
          {/*-------------------------------------------TabPanel 1-----------------------------------------------*/}
          <TabPanel className="custom-tab-panel-mobile" sx={{ padding: '0', mt: '17px' }} value="1">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Box>
                {addresses.map((address, index) => (
                  <React.Fragment key={index}>
                    <InputLabel className="inputLabel-handbook">{`${t('deliveryAddress')} ${index + 1}`}</InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
                        <Autocomplete
                          popupIcon={<PolygonIcon />}
                          options={provinceData}
                          getOptionLabel={(option) => option.province_name}
                          value={
                            address?.province_id
                              ? provinceData.find((province) => province.id === address?.province_id)
                              : null
                          }
                          onChange={(e, newValue) => {
                            handleAddressChange(index, 'province_id', newValue?.id ?? '')
                          }}
                          size="small"
                          fullWidth
                          renderInput={(params) => <TextField {...params} variant="outlined" placeholder={t('city')} />}
                          ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                          classes={{ inputRoot: 'custom-input-search' }}
                        />
                        <Autocomplete
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
                            !address[index]?.province_id && (
                              <span style={{ color: colors.grayColor }}>{t('pleaseSelectCityProvinceFirst')}</span>
                            )
                          }
                          onChange={(e, newValue) => {
                            handleDeliveryAddressChangeDistrict(index, 'district_id', newValue?.id ?? '')
                          }}
                          size="small"
                          fullWidth
                          renderInput={(params) => (
                            <TextField {...params} variant="outlined" placeholder={t('district')} />
                          )}
                          ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                          classes={{ inputRoot: 'custom-input-search' }}
                        />
                        <Autocomplete
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
                              ? listWardDelivery[index].data.find((ward) => ward.id === address?.ward_id) || null
                              : null
                          }
                          noOptionsText={
                            !address[index]?.district_id && (
                              <span style={{ color: colors.grayColor }}>{t('pleaseSelectDistrictFirst')}</span>
                            )
                          }
                          onChange={(e, newValue) => {
                            handleUpdateDeliveryAddress(index, 'ward_id', newValue?.id ?? '')
                          }}
                          size="small"
                          fullWidth
                          renderInput={(params) => <TextField {...params} variant="outlined" placeholder={t('ward')} />}
                          ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                          classes={{ inputRoot: 'custom-input-search' }}
                        />
                        <TextField
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
                      <Box ml={1} sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {index === addresses.length - 1 && (
                          <AddCircleIcon
                            fontSize="medium"
                            onClick={() => handleAddAddress(index)}
                            className="addIcon"
                          />
                        )}
                        {addresses.length > 1 && (
                          <RemoveCircleIcon
                            fontSize="medium"
                            onClick={() => handleRemoveAddress(index)}
                            className="removeIcon"
                          />
                        )}
                      </Box>
                    </Box>
                  </React.Fragment>
                ))}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('addressWebsite')}</InputLabel>
                <TextField
                  size="small"
                  value={website}
                  onChange={handleChangeWebsite}
                  fullWidth
                  placeholder={t('enterAddressWebsite')}
                  InputProps={{
                    classes: {
                      root: 'custom-input-search'
                    }
                  }}
                  error={Boolean(getErrorMessageByName(errorMessages, 'website_address'))}
                  helperText={getErrorMessageByName(errorMessages, 'website_address') ?? ''}
                />
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('addressFanpage')}</InputLabel>
                <TextField
                  size="small"
                  value={fanpage}
                  onChange={handleChangeFanpage}
                  fullWidth
                  placeholder={t('enterAddressFanpage')}
                  InputProps={{
                    classes: {
                      root: 'custom-input-search'
                    }
                  }}
                  error={Boolean(getErrorMessageByName(errorMessages, 'fanpage_address'))}
                  helperText={getErrorMessageByName(errorMessages, 'fanpage_address') ?? ''}
                />
              </Box>
              <Box>
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
                      fullWidth
                    />
                  )}
                />
              </Box>
              <Box>
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
                      fullWidth
                    />
                  )}
                />
              </Box>
              <Box>
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
                      fullWidth
                    />
                  )}
                />
              </Box>
              <Box>
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
              <Box>
                <Box mt={2.5} sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <InputLabel
                    required
                    sx={{ margin: '0 !important' }}
                    className="requiredTextField inputLabel-handbook"
                  >
                    {t('listContact')}
                  </InputLabel>
                  {!isMaxContactReached && (
                    <AddCircleIcon fontSize="medium" className="addIcon" onClick={handleAddListContact} />
                  )}
                </Box>
                {contacts.map((contact, index) => (
                  <div key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '19px', mt: '10px' }}>
                      <TextField
                        size="small"
                        value={contact.name}
                        onChange={(e) => handleNameRoleChange(index, e.target.value)}
                        error={Boolean(getErrorMessageByName(errorMessages, 'contacts_info')[index]?.contact_name)}
                        helperText={getErrorMessageByName(errorMessages, 'contacts_info')[index]?.contact_name ?? ''}
                        sx={{ width: '271px' }}
                        placeholder={t('enterNameOrRole')}
                        InputProps={{
                          classes: {
                            root: 'custom-input-search'
                          }
                        }}
                      />
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
                        error={Boolean(getErrorMessageByName(errorMessages, 'contacts_info')[index]?.phone_number)}
                        helperText={getErrorMessageByName(errorMessages, 'contacts_info')[index]?.phone_number ?? ''}
                      />
                      {contacts.length > 1 && (
                        <RemoveCircleIcon
                          fontSize="medium"
                          onClick={() => handleRemoveListContact(index)}
                          className="removeIcon"
                        />
                      )}
                    </Box>
                  </div>
                ))}
              </Box>
              <Box>
                <Box mt={2.5} sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <InputLabel sx={{ mb: '0 !important' }} className="inputLabel-handbook">
                    {t('image')}
                  </InputLabel>
                  {<AddCircleIcon fontSize="medium" className="addIcon" onClick={handleAddIconClick} />}
                </Box>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
                <StandardImageList handleDelete={handleDelete} imagesData={selectedImage} isEdit={true} />
              </Box>
            </Box>
          </TabPanel>
          {/*-------------------------------------------TabPanel 2-----------------------------------------------*/}
          <TabPanel sx={{ padding: '0', mt: '17px' }} value="2">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('industryGroup')}</InputLabel>
                <Autocomplete
                  value={selectedIndustryGroups}
                  onChange={handleIndustryGroupChange}
                  multiple
                  size="small"
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
                  style={{ width: '100%', borderRadius: '10px' }}
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
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('area')}</InputLabel>
                <TextField
                  size="small"
                  value={area}
                  onChange={handleAreaChange}
                  sx={{ width: '100%' }}
                  placeholder={t('enterArea')}
                  InputProps={{
                    classes: {
                      root: 'custom-input-search'
                    }
                  }}
                />
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('productSubstitutionPossibilities')}</InputLabel>
                <Autocomplete
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
                      sx={{ width: '100%' }}
                    />
                  )}
                />
              </Box>
              <Box>
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
                      sx={{ width: '100%' }}
                    />
                  )}
                />
              </Box>
              <Box>
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
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('productApplication')}</InputLabel>
                <Autocomplete
                  value={productApplications}
                  onChange={handleProductApplicationChange}
                  multiple
                  size="small"
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
              </Box>
            </Box>
          </TabPanel>
          {/*-------------------------------------------TabPanel 3-----------------------------------------------*/}
          <TabPanel sx={{ padding: '0', mt: '17px' }} value="3">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('frequencyOfCompanyVisits')}</InputLabel>
                <Autocomplete
                  sx={{ width: '100%' }}
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
              <Box>
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
              <Box>
                <InputLabel className="inputLabel-handbook">{t('incentivePolicy')}</InputLabel>
                <Autocomplete
                  sx={{ width: '100%' }}
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
              <Box>
                <InputLabel className="inputLabel-handbook">{t('discountPolicyBasedOnOutput')}</InputLabel>
                <TextField
                  size="small"
                  value={discountPolicyBasedOnOutput}
                  onChange={handleDiscountPolicyBasedOnOutputChange}
                  sx={{ width: '100%' }}
                  placeholder={t('enterDiscountPolicyBasedOnOutput')}
                  InputProps={{
                    classes: {
                      root: 'custom-input-search'
                    }
                  }}
                />
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('characterOrInterests')}</InputLabel>
                <TextField
                  size="small"
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
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('specialNotes')}</InputLabel>
                <TextField
                  size="small"
                  fullWidth
                  value={specialNotes}
                  onChange={handleSpecialNotesChange}
                  placeholder={t('enterNotes')}
                  InputProps={{
                    classes: {
                      root: 'custom-input-search'
                    }
                  }}
                />
              </Box>
            </Box>
          </TabPanel>

          {/*-------------------------------------------TabPanel 4-----------------------------------------------*/}
          <TabPanel sx={{ padding: '0', mt: '17px' }} value="4">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Typography sx={{ flexGrow: 1 }}>
                {isViewingConsultingHistory
                  ? modeEditConsultingHistory
                    ? Object.keys(selectedItemConsultingHistory).length === 0
                      ? t('addConsultation')
                      : t('consultingEdit')
                    : selectedItemConsultingHistory === null
                      ? t('listOfConsultant')
                      : t('consultationDetail')
                  : t('listOfConsultant')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {!isViewingConsultingHistory && (
                  <Button className={`addButton`} onClick={handleOpenAddConsultingHistory}>
                    <AddIcon />
                    {t('addHistory')}
                  </Button>
                )}
                {isViewingConsultingHistory && (
                  <Button className="back-Button" onClick={() => setIsViewingConsultingHistory(false)}>
                    {'< '}
                    {t('comeBack')}
                  </Button>
                )}
              </Box>
            </Box>
            <Box mt={1}>
              {!isViewingConsultingHistory && (
                <ConsultingHistoryMobileTable
                  listAllConsultationHistoryProblem={listAllConsultationHistoryProblem}
                  titleTable={titleTableListConsultingHistoriesMobile}
                  data={consultingHistories}
                  handleDelete={handleDeleteConsulting}
                  successFlag={successDeleteConsultingHistoryMessage}
                  handleView={handleViewConsultingHistory}
                  handleEdit={handleEditConsultingHistory}
                  isEdit={true}
                />
              )}
              {isViewingConsultingHistory && (
                <HistoryOfMobileConsultingPage
                  listAllConsultationHistoryProblem={listAllConsultationHistoryProblem}
                  data={selectedItemConsultingHistory}
                  mode={modeEditConsultingHistory}
                  handleUpdateConsultingHistory={handleUpdateConsultingHistory}
                  handleCreateConsultingHistory={handleAddConsultingHistory}
                  isEdit={isEditConsultingHistory}
                />
              )}
            </Box>
          </TabPanel>
          {/*-------------------------------------------TabPanel 5-----------------------------------------------*/}
          <TabPanel sx={{ padding: '0', mt: '17px' }} value="5">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
              <Typography sx={{ flexGrow: 1 }}>
                {isViewingDevice
                  ? modeEditDevice
                    ? Object.keys(selectedItemDevice).length === 0
                      ? t('deviceCreate')
                      : t('deviceEdit')
                    : selectedItemDevice === null
                      ? t('deviceList')
                      : t('deviceView')
                  : t('deviceList')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {!isViewingDevice && (
                  <Button className={`addButton`} onClick={handleOpenAddMachineData}>
                    <AddIcon />
                    {t('addMachineData')}
                  </Button>
                )}
                {isViewingDevice && (
                  <Button className="back-Button" onClick={() => setIsViewingDevice(false)}>
                    {'< '}
                    {t('comeBack')}
                  </Button>
                )}
              </Box>
            </Box>
            <Box mt={1}>
              {!isViewingDevice && (
                <DeviceMobileTable
                  titleTable={titleTableListDeviceMobile}
                  deviceMachines={deviceMachines}
                  handleDelete={handleDeleteMachineData}
                  successFlag={successDeleteMachineDataMessage}
                  isEdit={true}
                  listAllDeviceMachineType={listAllDeviceMachineType}
                  listAllDeviceMachineManufacturer={listAllDeviceMachineManufacturer}
                  handleView={handleViewDevice}
                  handleEdit={handleEditDevice}
                />
              )}
              {isViewingDevice && (
                <DeviceMobilePage
                  listAllDeviceMachineType={listAllDeviceMachineType}
                  listAllDeviceMachineManufacturer={listAllDeviceMachineManufacturer}
                  mode={modeEditDevice}
                  data={selectedItemDevice}
                  handleUpdateDeviceMachineData={handleUpdateDeviceMachineData}
                  handleCreateDeviceMachineData={handleAddMachineData}
                  isEdit={isEditDeviceMachineManufacturer}
                />
              )}
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
