// @ts-nocheck
import { useTranslation } from 'react-i18next'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import Typography from '@mui/material/Typography'
import { Box, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material'
import TabList from '@mui/lab/TabList'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import '../../../../../resource/style/CustomerDetailStyle.css'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import dayjs from 'dayjs'
import DateRangeIcon from '@mui/icons-material/DateRange'
import colors from '../../../../../constants/colors'
import { LocalizationProvider } from '@mui/x-date-pickers'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import commons from '../../../../../constants/common'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import Autocomplete from '@mui/material/Autocomplete'
import colorsCustomerRank from '../../../../../constants/colorsCustomerRank'
import Chip from '@mui/material/Chip'
import {
  isFirstCharacterZero,
  isValidDimension,
  urlRegex,
  generateUniqueFileName,
  renderUploadMessage
} from '../../../../../common/common'
import PolygonIcon from '../../../../../asset/icon/Polygon.svg'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import Checkbox from '@mui/material/Checkbox'
import StandardImageList from '../../../../StandardImageList'
import { s3 } from '../../../../../utils/settingS3'
import AddIcon from '../../../../../asset/icon/AddIcon.svg'
import ConsultingHistoryMobileTable from '../../../../Table/CustomerTable/ConsultingHistoryTable/Mobile/index'
import titleTableListConsultingHistoriesMobile from '../../../../../constants/titleTableListConsultingHistoriesMobile'
import titleTableListDeviceMobile from '../../../../../constants/titleTableListDeviceMobile'
import DeviceMobileTable from '../../../../Table/CustomerTable/DeviceTable/Mobile/index'
import '../../../../../resource/style/CustomerDetailStyle.css'
import {
  getAllCompanyTypeAction,
  getAllConsultationHistoryProblemAction,
  getAllDeviceMachineManufacturerAction,
  getAllDeviceMachineTypeAction,
  getAllFactoryScaleAction,
  getAllFrequencyCompanyVisitAction,
  getAllIncentivePolicyAction,
  getAllIndustryGroupAction,
  getAllOrderPlanAction,
  getAllPersonnelScaleAction,
  getAllProductApplicationAction,
  getAllProductSubstitutabilityAction,
  getAllQuanlityRequireAction,
  getDetailCustomerHandbookAllAction,
  removeMessageErrorAction,
  updateCustomerHandbookAllAction
} from '../../../../../redux/customer/customer.actions'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
  listAllQuanlityRequireState,
  listDetailCustomerHandbookState,
  updateCustomerHandbookErrorMessageState,
  updateCustomerHandbookFlagState
} from '../../../../../redux/customer/customer.selectors'
import Toolbar from '@mui/material/Toolbar'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import {
  appDistrictListTempState,
  appProvinceListState,
  appWardListTempState
} from '../../../../../redux/app/app.selectors'
import {
  getListDistrictByProvinceIdAction,
  getListWardByDistrictIdAction,
  setGetListDistrictFlagAction,
  setGetListWardFlagAction
} from '../../../../../redux/app/app.actions'
import HistoryOfMobileConsultingPage from '../../../../../containers/Sale/Mobile/CustomerInfo/HistoryOfMobileConsulting'
import DeviceMobilePage from '../../../../../containers/Sale/Mobile/CustomerInfo/DeviceMobile'
import { toast } from 'react-toastify'

export default function CustomerHandbookMobile() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const location = useLocation()
  const customerId = new URLSearchParams(location.search).get('id')
  const navigate = useNavigate()
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
  const [staffingScale, setStaffingScale] = useState('')
  const [factoryScale, setFactoryScale] = useState('')
  const [typeOfCompany, setTypeOfCompany] = useState('')
  const fileInputRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState([])
  const [incentivePolicy, setIncentivePolicy] = useState('')
  const [successDeleteConsultingHistoryMessage, setSuccessDeleteConsultingHistoryMessage] = useState(false)
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
  const listDetailCustomerHandbook = useSelector(listDetailCustomerHandbookState)
  const districtDataTemp = useSelector(appDistrictListTempState)
  const provinceData = useSelector(appProvinceListState)
  const wardDataTemp = useSelector(appWardListTempState)
  const listAllDeviceMachineType = useSelector(listAllDeviceMachineTypeState)
  const listAllDeviceMachineManufacturer = useSelector(listAllDeviceMachineManufacturerState)
  const updateSuccessCustomerHandbookFlag = useSelector(updateCustomerHandbookFlagState)
  const updateCustomerHandbookErrorMessage = useSelector(updateCustomerHandbookErrorMessageState)
  const [selectedItemConsultingHistory, setSelectedItemConsultingHistory] = useState(null)
  const [modeEditConsultingHistory, setModeEditConsultingHistory] = useState(null)
  const [isViewingConsultingHistory, setIsViewingConsultingHistory] = useState(false)
  const [selectedItemDevice, setSelectedItemDevice] = useState(null)
  const [modeEditDevice, setModeEditDevice] = useState(null)
  const [isViewingDevice, setIsViewingDevice] = useState(false)
  useEffect(() => {
    if (updateSuccessCustomerHandbookFlag) {
      removeMessageError()
      navigate(`/sale/information/customer-detail?id=${customerId}`)
    }
  }, [updateSuccessCustomerHandbookFlag])

  const removeMessageError = useCallback(() => {
    dispatch(removeMessageErrorAction())
  }, [])

  useEffect(() => {
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
    dispatch(getDetailCustomerHandbookAllAction({ customer_id: customerId }))
    dispatch(getAllDeviceMachineTypeAction())
    dispatch(getAllDeviceMachineManufacturerAction())
  }, [customerId])

  const handleUpdateDeviceMachineData = (index, field, value) => {
    const machineDataInput = [...deviceMachines]
    machineDataInput[index][field] = value
    setDeviceMachines(machineDataInput)
  }

  const handleDelete = (index) => {
    const updatedItems = [...selectedImage]
    updatedItems.splice(index, 1)
    setSelectedImage(updatedItems)
  }

  useEffect(() => {
    if (listDetailCustomerHandbook) {
      setCustomerName(listDetailCustomerHandbook.customer?.customer_name)
      setWebsite(listDetailCustomerHandbook?.website_address)
      setFanpage(listDetailCustomerHandbook?.fanpage_address)
      setOfficeAddress(listDetailCustomerHandbook?.office_address)
      setStaffingScale(listDetailCustomerHandbook?.personnel_scale?.id)
      setFactoryScale(listDetailCustomerHandbook?.factory_scale?.id)
      setTypeOfCompany(listDetailCustomerHandbook?.company_type?.id)
      if (listDetailCustomerHandbook.image_handbooks) {
        setSelectedImage(listDetailCustomerHandbook.image_handbooks)
      }
      const formattedDate = listDetailCustomerHandbook?.enterprise_establishment_date
        ? dayjs(listDetailCustomerHandbook.enterprise_establishment_date, 'DD/MM/YYYY').format('YYYY-MM-DD')
        : null
      setSelectedDate(formattedDate)
      if (listDetailCustomerHandbook.customer_contacts) {
        const initialContacts = listDetailCustomerHandbook.customer_contacts.map((contact) => ({
          name: contact?.name || '',
          phone_number: contact?.phone_number || ''
        }))
        setContacts(initialContacts)
      }
      setCompanyVisitsFrequency(listDetailCustomerHandbook?.frequency_company_visit?.id)
      const formattedDateBirthday = listDetailCustomerHandbook?.enterprise_birthday
        ? dayjs(listDetailCustomerHandbook.enterprise_birthday, 'DD/MM/YYYY').format('YYYY-MM-DD')
        : null
      setBusinessOwnerBirthday(formattedDateBirthday)
      setDiscountPolicyBasedOnOutput(listDetailCustomerHandbook?.discount_policy)
      setCharacterOrInterests(listDetailCustomerHandbook?.personality)
      setSpecialNotes(listDetailCustomerHandbook?.special_note)
      setPurchaseFrequencyOverMonth(listDetailCustomerHandbook?.frequency_purchase_monthly)
      const industryGroupIds = listDetailCustomerHandbook.industry_groups
        ? listDetailCustomerHandbook.industry_groups.map((group) => group.id)
        : []
      setIndustryGroup(industryGroupIds)
      setArea(listDetailCustomerHandbook?.region)
      setDebtAgeGroup(listDetailCustomerHandbook.debt_age?.debt_age_name)
      setProductSubstitutionPossibilities(listDetailCustomerHandbook.product_substitutability?.id)
      setOrderingPlan(listDetailCustomerHandbook?.order_plan_handbook?.id)
      if (listDetailCustomerHandbook.product_applications) {
        const productApplications = listDetailCustomerHandbook.product_applications
          ? listDetailCustomerHandbook.product_applications.map((group) => group.id)
          : []
        setProductApplication(productApplications)
      }
      setMainProductGroup(listDetailCustomerHandbook?.product_groups)
      setIncentivePolicy(listDetailCustomerHandbook?.incentive_policy?.id)

      if (listDetailCustomerHandbook.consultation_histories?.length > 0) {
        const formattedHistories = listDetailCustomerHandbook?.consultation_histories.map((history) => ({
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
      if (listDetailCustomerHandbook.device_machines) {
        const deviceMachinesFormatted = listDetailCustomerHandbook.device_machines.map((device) => ({
          device_machine_type_id: device?.device_machine_type?.id || '',
          device_machine_manufacturer_id: device?.device_machine_manufacturer?.id || '',
          device_machine_type_name: device?.device_machine_type?.device_machine_type_name || '',
          device_machine_manufacturer_name: device?.device_machine_type?.device_machine_manufacturer_name || '',
          machine_code: device?.machine_code || '',
          quantity: device?.quantity || ''
        }))
        setDeviceMachines(deviceMachinesFormatted)
      }
      if (listDetailCustomerHandbook?.address_deliveries && listDetailCustomerHandbook.address_deliveries.length > 0) {
        const addressFormatted = listDetailCustomerHandbook.address_deliveries.map((item) => ({
          province_id: item?.address?.province?.id || '',
          district_id: item?.address?.district?.id || '',
          ward_id: item?.address?.ward?.id || '',
          detail: item?.address?.detail || ''
        }))
        setAddresses(addressFormatted)

        const districtData = listDetailCustomerHandbook.address_deliveries.map((district, index) => ({
          id: index,
          data: district?.district_list || []
        }))
        const wardData = listDetailCustomerHandbook.address_deliveries.map((ward, index) => ({
          id: index,
          data: ward?.ward_list || []
        }))

        setListDistrictDelivery(districtData)
        setListWardDelivery(wardData)
      } else {
        setAddresses([{ province_id: '', district_id: '', ward_id: '', detail: '' }])
      }
    }
  }, [listDetailCustomerHandbook])

  const handleDeleteMachineData = (index) => {
    const updatedData = [...deviceMachines]
    updatedData.splice(index, 1)
    setDeviceMachines(updatedData)
    setSuccessDeleteMachineDataMessage(Math.random())
  }

  const handleSubmit = () => {
    const customer = {
      customer_id: customerId,
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
      dispatch(updateCustomerHandbookAllAction(customer))
    }
  }

  const validateData = (customer) => {
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
        let contactError = ''
        if (contact.phone_number !== null && contact.phone_number !== '') {
          if (!isValidDimension(contact.phone_number)) {
            contactError = t('onlyNumber')
            flag = false
          } else {
            if (!isFirstCharacterZero(contact.phone_number) || contact.phone_number.length !== 10) {
              contactError = t('phoneNumberWrongTyper')
              flag = false
            }
          }
        }
        setErrorMessagePhoneNumber((prevErrors) => [
          ...prevErrors.slice(0, index),
          contactError,
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

  const handleOpenAddMachineData = () => {
    const newRow = {
      device_machine_type_id: '',
      device_machine_manufacturer_id: '',
      device_machine_type_name: '',
      device_machine_manufacturer_name: '',
      machine_code: '',
      quantity: ''
    }
    setDeviceMachines((prevState) => [newRow, ...prevState])
    setSuccessDeleteMachineDataMessage(false)
    setModeEditDevice(true)
    setIsViewingDevice(true)
    setSelectedItemDevice({})
  }

  const handleAddMachineData = (field, value) => {
    const machineDataInput = [...deviceMachines]
    machineDataInput[0][field] = value
    setDeviceMachines(machineDataInput)
  }

  const handleAddConsultingHistory = (field, value) => {
    const updatedConsultingHistories = [...consultingHistories]
    updatedConsultingHistories[0][field] = value
    setSelectedItemConsultingHistory({ item: updatedConsultingHistories[0] })
    setConsultingHistories(updatedConsultingHistories)
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
    setSelectedItemConsultingHistory({})
  }

  const handleFileUpload = async (files) => {
    let uploadedImages = [...selectedImage]
    const invalidFileTypes = []
    const oversizedFiles = []
    const validFiles = []
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
      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i]
        const reader = new FileReader()
        const uniqueFileName = generateUniqueFileName(file)

        reader.onload = async function (upload) {
          const base64Data = upload.target.result.split(',')[1]
          const blob = await fetch(`data:image/jpeg;base64,${base64Data}`).then((res) => res.blob())

          const params = {
            Bucket: process.env.REACT_APP_BUCKET,
            Key: uniqueFileName,
            Body: blob,
            ContentType: file.type
          }

          try {
            const data = await s3.upload(params).promise()
            uploadedImages.push({
              path: data.Location
            })
            setSelectedImage([...uploadedImages])
          } catch (error) {
            console.error('Upload error:', error)
          }
        }

        reader.readAsDataURL(file)
      }

      toast.success(t('imageUploadSuccess'))
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
    const deleteConsulting = [...consultingHistories]
    deleteConsulting.splice(index, 1)
    setConsultingHistories(deleteConsulting)
    setSuccessDeleteConsultingHistoryMessage(Math.random())
  }

  const handleUpdateConsultingHistory = (index, field, value) => {
    const updatedConsultingHistories = [...consultingHistories]
    updatedConsultingHistories[index][field] = value
    setConsultingHistories(updatedConsultingHistories)
  }
  const [indexDistrictDelivery, setIndexDistrictDelivery] = useState('')
  const [indexWardDelivery, setIndexWardDelivery] = useState('')
  const [listDistrictDelivery, setListDistrictDelivery] = useState([{ id: 0, data: [] }])
  const [listWardDelivery, setListWardDelivery] = useState([{ id: 0, data: [] }])
  const [addresses, setAddresses] = useState([{ province_id: '', district_id: '', ward_id: '' }])

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
  }, [districtDataTemp, indexDistrictDelivery, listDistrictDelivery])

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
  }, [wardDataTemp, indexWardDelivery, listWardDelivery])

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

  const handleViewConsultingHistory = (item) => {
    setModeEditConsultingHistory(false)
    setIsViewingConsultingHistory(true)
    setSelectedItemConsultingHistory({ item })
  }

  const handleEditConsultingHistory = (item, index) => {
    setModeEditConsultingHistory(true)
    setIsViewingConsultingHistory(true)
    setSelectedItemConsultingHistory({ item, index })
  }

  const handleViewDevice = (item) => {
    setModeEditDevice(false)
    setIsViewingDevice(true)
    setSelectedItemDevice({ item })
  }

  const handleEditDevice = (item, index) => {
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
              onClick={() => navigate(-1)}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
            </Button>
            <Typography sx={{ fontWeight: 400, fontSize: 16, color: colors.lightroyalblueColor }}>
              {t('customerHandbookTitle')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            {isEdit ? (
              <Button variant="contained" className="modalButtonClick" onClick={handleSubmit}>
                {t('confirm')}
                <ArrowForwardIcon />
              </Button>
            ) : (
              <Button variant="contained" className="modalButtonClick" onClick={handleEdit}>
                {t('editAction')}
                <ArrowForwardIcon />
              </Button>
            )}
          </Box>
        </Toolbar>
      </Box>
      <Box sx={{ padding: '5px', backgroundColor: colors.lilywhiteColor, width: '100vw' }}>
        <TabContext value={valueTabs}>
          <Box className="tab-wrapper-mobile">
            <TabList onChange={handleChangeTabs} className="tab-list-mobile" variant="scrollable">
              {tabs.map((tab, index) => (
                <Tab key={index} className={getClassName(tab.value)} label={tab.label} value={tab.value} />
              ))}
            </TabList>
          </Box>
          {/*-------------------------------------------TabPanel 1-----------------------------------------------*/}
          <TabPanel className="custom-tab-panel" sx={{ padding: '0', mt: '17px' }} value="1">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('customerName')}</InputLabel>
                <InputLabel className="inputLabel-handbook-view">{customerName || t('noData')}</InputLabel>
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('customerRank')}</InputLabel>
                <Box sx={{ display: 'flex', marginLeft: '10px' }}>
                  {listDetailCustomerHandbook.customer?.customer_rank?.customer_rank_name ? (
                    <InputLabel
                      className="text-customer-rank"
                      sx={{
                        backgroundColor:
                          colorsCustomerRank[listDetailCustomerHandbook.customer.customer_rank.customer_rank_name]
                      }}
                    >
                      {listDetailCustomerHandbook.customer.customer_rank.customer_rank_name}
                    </InputLabel>
                  ) : (
                    <Typography className="inputLabel-handbook-view">{t('noData')}</Typography>
                  )}
                </Box>
              </Box>
              <Box>
                {addresses.map((address, index) => (
                  <React.Fragment key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                      <Typography className="inputLabel-modal" sx={{ mt: 1 }}>
                        {`${t('deliveryAddress')} ${index + 1}`}
                      </Typography>
                      {isEdit && addresses.length !== commons.MAX_ADDRESS_COUNT && index === addresses.length - 1 && (
                        <AddCircleIcon fontSize="medium" onClick={() => handleAddAddress(index)} className="addIcon" />
                      )}
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      {isEdit ? (
                        <Box sx={{ width: '100%' }}>
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
                            sx={{ mb: 1 }}
                            size="small"
                            fullWidth
                            renderInput={(params) => (
                              <TextField {...params} variant="outlined" placeholder={t('city')} />
                            )}
                            ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                            classes={{ inputRoot: 'custom-input-search' }}
                          />
                          <Autocomplete
                            popupIcon={<PolygonIcon />}
                            sx={{ mb: 1 }}
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
                            sx={{ mb: 1 }}
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
                            renderInput={(params) => (
                              <TextField {...params} variant="outlined" placeholder={t('ward')} />
                            )}
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
                            ? `${provinceData.find((province) => province.id === address.province_id)?.province_name}`
                            : ''}
                        </Typography>
                      ) : (
                        <Typography className="inputLabel-handbook-view">{t('noData')}</Typography>
                      )}
                      {isEdit && (
                        <Box>
                          {addresses.length > 1 && (
                            <RemoveCircleIcon
                              fontSize="medium"
                              onClick={() => handleRemoveAddress(index)}
                              className="removeIcon"
                            />
                          )}
                        </Box>
                      )}
                    </Box>
                  </React.Fragment>
                ))}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('addressWebsite')}</InputLabel>
                {isEdit ? (
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
                    error={errorMessageWebsite ? true : false}
                    helperText={errorMessageWebsite ? errorMessageWebsite : ''}
                  />
                ) : (
                  <InputLabel className="inputLabel-handbook-view">{website || t('noData')}</InputLabel>
                )}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('addressFanpage')}</InputLabel>
                {isEdit ? (
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
                    error={errorMessageFanpage ? true : false}
                    helperText={errorMessageFanpage ? errorMessageFanpage : ''}
                  />
                ) : (
                  <InputLabel className="inputLabel-handbook-view">{fanpage || t('noData')}</InputLabel>
                )}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('staffingScale')}</InputLabel>
                {isEdit ? (
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
                ) : (
                  <Typography className="inputLabel-handbook-view">
                    {listAllPersonnelScale.find((item) => item.id === staffingScale)?.personnel_scale_name ||
                      t('noData')}
                  </Typography>
                )}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('factoryScale')}</InputLabel>
                {isEdit ? (
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
                ) : (
                  <Typography className="inputLabel-handbook-view">
                    {listAllFactoryScale.find((item) => item.id === factoryScale)?.factory_scale_name || t('noData')}
                  </Typography>
                )}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('typeOfBusiness')}</InputLabel>
                {isEdit ? (
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
                ) : (
                  <Typography className="inputLabel-handbook-view">
                    {listAllCompanyType.find((item) => item.id === typeOfCompany)?.company_type_name || t('noData')}
                  </Typography>
                )}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('dateOfEstablishmentOfTheEnterprise')}</InputLabel>
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
              <Box>
                <Box mt={2.5} sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <InputLabel className="inputLabel-handbook">{t('listContact')}</InputLabel>
                  {isEdit && !isMaxContactReached && (
                    <AddCircleIcon fontSize="medium" className="addIcon" onClick={handleAddListContact} />
                  )}
                </Box>
                {contacts.map((contact, index) => (
                  <div key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '19px', mt: '10px' }}>
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
                  </div>
                ))}
              </Box>
              <Box>
                <Box mt={2.5} sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <InputLabel sx={{ mb: '0 !important' }} className="inputLabel-handbook">
                    {t('image')}
                  </InputLabel>
                  {isEdit && <AddCircleIcon fontSize="medium" className="addIcon" onClick={handleAddIconClick} />}
                </Box>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
                <StandardImageList handleDelete={handleDelete} imagesData={selectedImage} isVisible={isEdit} />
              </Box>
            </Box>
          </TabPanel>
          {/*-------------------------------------------TabPanel 2-----------------------------------------------*/}
          <TabPanel sx={{ padding: '0', mt: '17px' }} value="2">
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('typesOfProductsCommonlyTaken')}</InputLabel>
                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                  {listDetailCustomerHandbook &&
                  listDetailCustomerHandbook.top_products &&
                  listDetailCustomerHandbook.top_products.length > 0 ? (
                    listDetailCustomerHandbook.top_products.map((product) => (
                      <InputLabel key={product.id} className="text-customer-top-rank">
                        {product.code} - {product.product_name}
                      </InputLabel>
                    ))
                  ) : (
                    <Typography className="text-customer-top-rank">{t('noDataYet')}</Typography>
                  )}
                </Box>
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('mainProductGroup')}</InputLabel>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    overflowX: 'auto',
                    padding: '0 8px',
                    maxWidth: '100%'
                  }}
                >
                  {(mainProductGroup ?? []).length > 0 ? (
                    mainProductGroup.map((option) => (
                      <Chip
                        key={option.id}
                        label={option.product_group_name}
                        sx={{ whiteSpace: 'nowrap', fontStyle: 'italic', height: '21px' }}
                      />
                    ))
                  ) : (
                    <span>{t('noSuitableResultsFound')}</span>
                  )}
                </Box>
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('purchaseFrequencyOverMonth')}</InputLabel>
                <InputLabel className="inputLabel-handbook-view">
                  {purchaseFrequencyOverMonth || t('noData')}
                </InputLabel>
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('industryGroup')}</InputLabel>
                <Autocomplete
                  value={selectedIndustryGroups}
                  onChange={handleIndustryGroupChange}
                  multiple
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
                {isEdit ? (
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
                ) : (
                  <InputLabel className="inputLabel-handbook-view">{area || t('noData')}</InputLabel>
                )}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('debtAgeGroup')}</InputLabel>
                <InputLabel className="inputLabel-handbook-view">{debtAgeGroup || t('noData')}</InputLabel>
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('productSubstitutionPossibilities')}</InputLabel>
                {isEdit ? (
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
                ) : (
                  <InputLabel className="inputLabel-handbook-view">
                    {listAllProductSubstitutability.find((areaData) => areaData.id === productSubstitutionPossibilities)
                      ?.product_substitutability_name || t('noData')}
                  </InputLabel>
                )}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('orderingPlan')}</InputLabel>
                {isEdit ? (
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
                ) : (
                  <InputLabel className="inputLabel-handbook-view">
                    {listAllOrderPlan.find((areaData) => areaData.id === orderingPlan)?.order_plan_handbook_name ||
                      t('noData')}
                  </InputLabel>
                )}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('qualityRequirements')}</InputLabel>
                {isEdit ? (
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
                ) : (
                  <InputLabel className="inputLabel-handbook-view">
                    {listAllQuanlityRequire.find((areaData) => areaData.id === qualityRequirements)
                      ?.quality_require_name || t('noData')}
                  </InputLabel>
                )}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('productApplication')}</InputLabel>
                <Autocomplete
                  value={productApplications}
                  onChange={handleProductApplicationChange}
                  multiple
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
              </Box>
            </Box>
          </TabPanel>
          {/*-------------------------------------------TabPanel 3-----------------------------------------------*/}
          <TabPanel sx={{ padding: '0', mt: '17px' }} value="3">
            <Box sx={{ flexDirection: 'column', gap: '1rem' }}>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('frequencyOfCompanyVisits')}</InputLabel>
                {isEdit ? (
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
                ) : (
                  <InputLabel className="inputLabel-handbook-view">
                    {listAllFrequencyCompanyVisit.find((areaData) => areaData.id === companyVisitsFrequency)
                      ?.frequency_company_visit_name || t('noData')}
                  </InputLabel>
                )}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('businessOwnerBirthday')}</InputLabel>
                {isEdit ? (
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
                ) : (
                  <InputLabel className="inputLabel-handbook-view">
                    {businessOwnerBirthday ? dayjs(businessOwnerBirthday).format('DD-MM-YYYY') : t('noData')}
                  </InputLabel>
                )}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('incentivePolicy')}</InputLabel>
                {isEdit ? (
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
                ) : (
                  <InputLabel className="inputLabel-handbook-view">
                    {listAllIncentivePolicy.find((areaData) => areaData.id === incentivePolicy)
                      ?.incentive_policy_name || t('noData')}
                  </InputLabel>
                )}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('discountPolicyBasedOnOutput')}</InputLabel>
                {isEdit ? (
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
                ) : (
                  <InputLabel className="inputLabel-handbook-view">
                    {discountPolicyBasedOnOutput || t('noData')}
                  </InputLabel>
                )}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('characterOrInterests')}</InputLabel>
                {isEdit ? (
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
                ) : (
                  <InputLabel className="inputLabel-handbook-view">{characterOrInterests || t('noData')}</InputLabel>
                )}
              </Box>
              <Box>
                <InputLabel className="inputLabel-handbook">{t('specialNotes')}</InputLabel>
                {isEdit ? (
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
                ) : (
                  <InputLabel className="inputLabel-handbook-view">{specialNotes || t('noData')}</InputLabel>
                )}
              </Box>
            </Box>
          </TabPanel>

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
                {!isViewingConsultingHistory && isEdit && (
                  <Button className={`addButton`} onClick={handleOpenAddConsultingHistory}>
                    <AddIcon />
                    {t('addHistory')}
                  </Button>
                )}
                {isViewingConsultingHistory && (
                  <Button
                    className="back-Button"
                    onClick={() => {
                      setIsViewingConsultingHistory(false)
                      setSelectedItemConsultingHistory()
                    }}
                  >
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
                  isEdit={isEdit}
                />
              )}
              {isViewingConsultingHistory && (
                <HistoryOfMobileConsultingPage
                  listAllConsultationHistoryProblem={listAllConsultationHistoryProblem}
                  data={selectedItemConsultingHistory}
                  mode={modeEditConsultingHistory}
                  handleUpdateConsultingHistory={handleUpdateConsultingHistory}
                  handleCreateConsultingHistory={handleAddConsultingHistory}
                />
              )}
            </Box>
          </TabPanel>
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
                {!isViewingDevice && isEdit && (
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
                  isEdit={isEdit}
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
                />
              )}
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
