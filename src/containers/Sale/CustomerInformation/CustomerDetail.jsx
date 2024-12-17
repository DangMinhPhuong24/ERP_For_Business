// @ts-nocheck
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import InputAdornment from '@mui/material/InputAdornment'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import HeaderPage from 'components/HeaderPage'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AiOutlineFileExclamation } from 'react-icons/ai'
import { HiOutlineMail } from 'react-icons/hi'
import { HiChevronDown, HiChevronUp } from 'react-icons/hi2'
import { LuScrollText } from 'react-icons/lu'
import { PiPhoneCall } from 'react-icons/pi'
import { TbBook, TbEdit, TbMathEqualGreater, TbMathEqualLower, TbMessage } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import ClaimIcon from '../../../asset/icon/Claim.svg'
import DebtIcon from '../../../asset/icon/Debt.svg'
import GrowthIcon from '../../../asset/icon/Growth.svg'
import PolygonIcon from '../../../asset/icon/Polygon.svg'
import RevenueIcon from '../../../asset/icon/Revenue.svg'
import { checkAttributeValue, formatCurrency, removeDots } from '../../../common/common'
import RevenueChart from '../../../components/Chart/Sale/RevenueChart'
import {
  default as CustomDateRangePicker,
  default as DateRangePickerComponent
} from '../../../components/DateTime/DateRangePicker'
import ClaimModal from '../../../components/Modal/Customer/Claim'
import CustomerHandbook from '../../../components/Modal/Customer/CustomerHandbook'
import ProposedDebtAgeModal from '../../../components/Modal/Customer/ProposedDebtAge'
import QuotationModal from '../../../components/Modal/Customer/Quotation'
import PDFPreviewModal from '../../../components/Modal/Customer/Quotation/PDFPreview'
import QuotationDetailModal from '../../../components/Modal/Customer/QuotationDetail'
import UpdateCustomerModal from '../../../components/Modal/Customer/Update'
import ZaloModal from '../../../components/Modal/Customer/Zalo'
import ClaimHistoriesTable from '../../../components/Table/CustomerTable/ClaimHistoriesTable'
import CustomerListTransactionTable from '../../../components/Table/CustomerTable/ListTransactionTable/index'
import ProposalDebtAgeTable from '../../../components/Table/CustomerTable/ProposalDebtAgeTable'
import QuotationHistoriesTable from '../../../components/Table/CustomerTable/QuotationHistoriesTable/index'
import colors from '../../../constants/colors'
import commons from '../../../constants/common'
import { permissionActions } from '../../../constants/titlePermissions'
import titleTableDetailCustomer from '../../../constants/titleTableDetailCustomer'
import {
  getListDistrictByProvinceIdAction,
  getListWardByDistrictIdAction,
  setGetListDistrictFactoryFlagAction,
  setGetListDistrictFlagAction,
  setGetListDistrictOfficeFlagAction,
  setGetListWardFactoryFlagAction,
  setGetListWardFlagAction,
  setGetListWardOfficeFlagAction
} from '../../../redux/app/app.actions'
import {
  appDistrictFactoryListTempState,
  appDistrictListTempState,
  appDistrictOfficeListTempState,
  appProvinceListState,
  appWardFactoryListTempState,
  appWardListTempState,
  appWardOfficeListTempState,
  debtAgeListState,
  listAllDeliveryShiftState,
  listAllFinishedProductFormState,
  listAllPaymentState,
  listAllTagState
} from '../../../redux/app/app.selectors'
import { getProfileState } from '../../../redux/auth/auth.selectors'
import {
  createClaimAction,
  createQuotationPreviewAction,
  deleteClaimAction,
  deleteProposalDebtAgeAction,
  deleteQuotationHistoryAction,
  getAllClaimProblemAction,
  getAllClaimStatusAction,
  getAllCompanyTypeAction,
  getAllConsultationHistoryProblemAction,
  getAllFactoryScaleAction,
  getAllFrequencyCompanyVisitAction,
  getAllIncentivePolicyAction,
  getAllIndustryGroupAction,
  getAllOrderPlanAction,
  getAllPersonnelScaleAction,
  getAllProductApplicationAction,
  getAllProductSubstitutabilityAction,
  getAllQuanlityRequireAction,
  getClaimInformationAction,
  getCustomerInformationAction,
  getCustomerListAction,
  getDetailCustomerHandbookAllAction,
  getDetailQuotationHistoryAction,
  getListAllStatusOrderByCustomerAction,
  getListClaimHistoriesByCustomerIdAction,
  getListOrderByCustomerAction,
  getListProposalDebtAgeByCustomerIdAction,
  getListSalesInChargeAction,
  getQuotationHistoriesByCustomerIdAction,
  getQuotationListAction,
  removeMessageErrorAction,
  updateClaimAction,
  updateCustomerAction,
  updateCustomerHandbookAllAction,
  updateOderPreviewAction,
  updateProposalDebtAgeAction,
  updateQuotationPreviewAction
} from '../../../redux/customer/customer.actions'
import {
  claimHistoriesListTotalPagesState,
  createClaimSuccessFlagState,
  createQuotationPreviewSuccessFlagState,
  createQuotationSuccessFlagState,
  customerFactoryAddressState,
  customerOfficeAddressState,
  deleteClaimSuccessMessageState,
  deleteProposalDebtAgeSuccessMessageState,
  deleteQuotationHistorySuccessMessageState,
  detailQuotationHistoryState,
  errorCreateQuotationPreviewMessageState,
  errorsMessageUpdateCustomerState,
  errorUpdateQuotationPreviewMessageState,
  getClaimDetailsState,
  getCustomerDetailsState,
  getListAllStatusOrderByCustomerState,
  listAllClaimProblemState,
  listAllClaimStatusState,
  listAllCompanyTypeState,
  listAllConsultationHistoryProblemState,
  listAllCustomerState,
  listAllFactoryScaleState,
  listAllFrequencyCompanyVisitState,
  listAllIncentivePolicyState,
  listAllIndustryGroupState,
  listAllOrderPlanState,
  listAllPersonnelScaleState,
  listAllProductApplicationState,
  listAllProductFormState,
  listAllProductSubstitutabilityState,
  listAllQuanlityRequireState,
  listClaimHistoriesState,
  listDetailCustomerHandbookState,
  listOrderByCustomerState,
  listOrderByCustomerTotalPagesState,
  listProposalDebtAgeByCustomerIdState,
  listQuotationHistoriesState,
  proposalDebtAgeTotalPagesState,
  quotationHistoriesListTotalPagesState,
  quotationListState,
  SalesInChargeListState,
  updateClaimSuccessFlagState,
  updateCustomerHandbookErrorMessageState,
  updateCustomerHandbookFlagState,
  updateCustomerSuccessFlagState,
  updateOderErrorMessageState,
  updateOderPreviewErrorMessageState,
  updateOderPreviewSuccessFlagState,
  updateOderSuccessFlagState,
  updateProposalDebtAgeSuccessMessageState,
  updateQuotationHistorySuccessMessageState,
  updateQuotationPreviewSuccessFlagState
} from '../../../redux/customer/customer.selectors'
import {
  createProposalDebtAgeAction,
  getAllProposalStatusAction,
  getDetailProposalDebtAgeAction,
  getStatisticProposalAction
} from '../../../redux/proposal/proposal.actions'
import {
  createProposalDebtAgeSuccessState,
  listAllProposalStatusState,
  listDetailProposalDebtAgeState
} from '../../../redux/proposal/proposal.selectors'
import '../../../resource/style/ComboBoxStyle.css'
import '../../../resource/style/CustomerDetailStyle.css'
import { useRoleCheck } from '../../../utils'
import { deleteDataOderAction, getOderDetailAction } from '../../../redux/oder/oder.actions'
import {
  deleteOderSuccessMessageState,
  listAllBranchByCustomerIdState,
  oderDetailState
} from '../../../redux/oder/oder.selectors'
import CreateOrder from '../../../components/Modal/Order/Create/CreateOrder'
import { productListState } from '../../../redux/config/config.selectors'
import SearchBar from '../../../components/Buttons/Search'

const StyledTableCell = styled(TableCell)(({ theme }) => ( {
  [`&.${ tableCellClasses.body }`]: {
    fontSize: '14px',
    lineHeight: '16.41px',
    textAlign: 'left',
    letterSpacing: '0em',
    border: 'none',
    padding: '0',
    verticalAlign: 'top'
  }
} ))

function CustomerDetail() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const customerDetail = useSelector(getCustomerDetailsState)
  const quotationData = useSelector(quotationListState)
  const createQuotationSuccessFlag = useSelector(createQuotationSuccessFlagState)
  const listQuotationHistories = useSelector(listQuotationHistoriesState)
  const listClaimHistories = useSelector(listClaimHistoriesState)
  const getClaimDetails = useSelector(getClaimDetailsState)
  const quotationHistoriesListTotalPages = useSelector(quotationHistoriesListTotalPagesState)
  const listOrderByCustomer = useSelector(listOrderByCustomerState)
  const listProposalDebtAgeByCustomerId = useSelector(listProposalDebtAgeByCustomerIdState)
  const getListAllStatusOrderByCustomer = useSelector(getListAllStatusOrderByCustomerState)
  const listOrderByCustomerTotalPages = useSelector(listOrderByCustomerTotalPagesState)
  const listAllClaimStatus = useSelector(listAllClaimStatusState)
  const updateClaimSuccessFlag = useSelector(updateClaimSuccessFlagState)
  const listAllCustomer = useSelector(listAllCustomerState)
  const location = useLocation()
  const customerId = new URLSearchParams(location.search).get('id')
  const quotationHistoryId = new URLSearchParams(location.search).get(commons.QUOTATION_HISTORY_ID)
  const debtAgeId = new URLSearchParams(location.search).get(commons.DEBT_AGE_ID)
  const claimId = new URLSearchParams(location.search).get(commons.CLAIM_ID)
  let validAddressOfficeCount = 0
  let validAddressFactoryCount = 0
  let validAddressBranchCount = 0
  const [ valueTabs, setValueTabs ] = useState('1')
  const [ isOpenQuotesModal, setIsOpenQuotesModal ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ statusOrderId, setStatusOrderId ] = useState('')
  const [ loadingListOrderByCustomer, setLoadingListOrderByCustomer ] = useState(false)
  const [ claimStatusId, setClaimStatusId ] = useState('')
  const deleteClaimSuccessMessage = useSelector(deleteClaimSuccessMessageState)
  const listSalesInCharge = useSelector(SalesInChargeListState)
  const [ isOpenClaimModal, setIsOpenClaimModal ] = useState(false)
  const [ isOpenClaimViewModal, setIsOpenClaimViewModal ] = useState(false)
  const claimHistoriesListTotalPages = useSelector(claimHistoriesListTotalPagesState)
  const [ selectedDateRangeHistoryClaim, setSelectedDateRangeHistoryClaim ] = useState([])
  const [ selectedRange, setSelectedRange ] = useState([])
  const [ amount, setAmount ] = useState('')
  const [ comparison, setComparison ] = useState('>')
  const customerOfficeAddressDetail = useSelector(customerOfficeAddressState)
  const customerFactoryAddressDetail = useSelector(customerFactoryAddressState)
  const provinceData = useSelector(appProvinceListState)
  const districtDataTemp = useSelector(appDistrictListTempState)
  const wardDataTemp = useSelector(appWardListTempState)
  const listDebtAge = useSelector(debtAgeListState)
  const errorsMessageUpdateCustomer = useSelector(errorsMessageUpdateCustomerState)
  const [ isOpenModalUpdate, setIsOpenModalUpdate ] = useState(false)
  const updateCustomerSuccessFlag = useSelector(updateCustomerSuccessFlagState)
  const [ isSortedAZCode, setIsSortedAZCode ] = useState(false)
  const [ isSortedZACode, setIsSortedZACode ] = useState(false)
  const [ isSortedAZTotalCost, setIsSortedAZTotalCost ] = useState(false)
  const [ isSortedZATotalCost, setIsSortedZATotalCost ] = useState(false)
  const [ isSortedAZCreateAt, setIsSortedAZCreateAt ] = useState(false)
  const [ isSortedZACreateAt, setIsSortedZACreateAt ] = useState(false)
  const [ isOpenCustomerHandbook, setIsOpenCustomerHandbook ] = useState(false)
  const listDetailCustomerHandbook = useSelector(listDetailCustomerHandbookState)
  const updateCustomerHandbookFlag = useSelector(updateCustomerHandbookFlagState)
  const updateCustomerHandbookErrorMessage = useSelector(updateCustomerHandbookErrorMessageState)
  const listAllProductSubstitutability = useSelector(listAllProductSubstitutabilityState)
  const listAllIndustryGroup = useSelector(listAllIndustryGroupState)
  const [ isOpenProposedDebtAgeModal, setIsOpenProposedDebtAgeModal ] = useState(false)
  const [ isOpenDetailProposedDebtAgeModal, setIsOpenDetailProposedDebtAgeModal ] = useState(false)
  const [ isOpenUpdateProposedDebtAgeModal, setIsOpenUpdateProposedDebtAgeModal ] = useState(false)
  const createProposalDebtAgeSuccess = useSelector(createProposalDebtAgeSuccessState)
  const getProfile = useSelector(getProfileState)
  const [ selectedDateRangeCustomerDetail, setSelectedDateRangeCustomerDetail ] = useState([])
  const [ selectedNoneDateRangeCustomerDetail, setNoneSelectedDateRangeCustomerDetail ] = useState(false)
  const listAllProposalStatus = useSelector(listAllProposalStatusState)
  const [ statusId, setStatusId ] = useState(null)
  const [ selectedDateRangeProposalDebtAge, setSelectedDateRangeProposalDebtAge ] = useState([])
  const proposalDebtAgeTotalPages = useSelector(proposalDebtAgeTotalPagesState)
  const [ selectedDateRangeQuotationHistory, setSelectedDateRangeQuotationHistory ] = useState([])
  const listAllClaimProblem = useSelector(listAllClaimProblemState)
  const listDetailProposalDebtAge = useSelector(listDetailProposalDebtAgeState)
  const [ isOpenDetailQuotation, setIsOpenDetailQuotation ] = useState(false)
  const detailQuotationHistory = useSelector(detailQuotationHistoryState)
  const deleteProposalDebtAgeSuccessMessage = useSelector(deleteProposalDebtAgeSuccessMessageState)
  const updateProposalDebtAgeSuccessMessage = useSelector(updateProposalDebtAgeSuccessMessageState)
  const createQuotationPreviewSuccessFlag = useSelector(createQuotationPreviewSuccessFlagState)
  const errorCreateQuotationPreviewMessage = useSelector(errorCreateQuotationPreviewMessageState)
  const [ isOpenModalQuotationPreview, setIsOpenModalQuotationPreview ] = useState(false)
  const [ editedDataPDF, setEditedDataPDF ] = useState([])
  const [ editedDataUpdatePDF, setEditedDataUpdatePDF ] = useState([])
  const deleteQuotationHistorySuccessMessage = useSelector(deleteQuotationHistorySuccessMessageState)
  const [ isOpenUpdateQuotesModal, setIsOpenUpdateQuotesModal ] = useState(false)
  const [ isOpenUpdateModalQuotationPreview, setIsOpenUpdateModalQuotationPreview ] = useState(false)
  const updateQuotationPreviewSuccessFlag = useSelector(updateQuotationPreviewSuccessFlagState)
  const errorUpdateQuotationPreviewMessage = useSelector(errorUpdateQuotationPreviewMessageState)
  const updateQuotationHistorySuccessMessage = useSelector(updateQuotationHistorySuccessMessageState)
  const formattedToday = new Date().toISOString().split('T')[0]
  const listAllPersonnelScale = useSelector(listAllPersonnelScaleState)
  const listAllFactoryScale = useSelector(listAllFactoryScaleState)
  const listAllCompanyType = useSelector(listAllCompanyTypeState)
  const listAllOrderPlan = useSelector(listAllOrderPlanState)
  const listAllQuanlityRequire = useSelector(listAllQuanlityRequireState)
  const listAllProductApplication = useSelector(listAllProductApplicationState)
  const listAllFrequencyCompanyVisit = useSelector(listAllFrequencyCompanyVisitState)
  const listAllIncentivePolicy = useSelector(listAllIncentivePolicyState)
  const listAllConsultationHistoryProblem = useSelector(listAllConsultationHistoryProblemState)
  const [ isShowBranchAddress, setIsShowBranchAddress ] = useState(false)
  const [ isShowOfficeAddress, setIsShowOfficeAddress ] = useState(false)
  const [ isShowFactoryAddress, setIsShowFactoryAddress ] = useState(false)
  const dataDistrictOffice = useSelector(appDistrictOfficeListTempState)
  const dataWardOffice = useSelector(appWardOfficeListTempState)
  const dataDistrictFactory = useSelector(appDistrictFactoryListTempState)
  const dataWardFactory = useSelector(appWardFactoryListTempState)
  const [ isOpenZaloModal, setIsOpenZaloModal ] = useState(false)
  const { isSuperAdmin, userInfo } = useRoleCheck()
  const permissionsData = useMemo(
    () => ( Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : [] ),
    [ userInfo ]
  )
  const checkPermissionUpdate =
    ( !isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.UPDATE_CUSTOMER) ) ||
    customerDetail.disable_update
  const checkPermissionViewOrder =
    !isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.DETAIL_ORDER)
  const checkPermissionDeleteOrder =
    !isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.DELETE_ORDER)
  const checkPermissionUpdateOrder =
    !isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.UPDATE_ORDER)
  const [ isOpenModalOderUpdate, setIsOpenModalOderUpdate ] = useState(false)
  const deleteSuccessMessage = useSelector(deleteOderSuccessMessageState)
  const customerListAll = useSelector(listAllCustomerState)
  const listAllBranchByCustomerId = useSelector(listAllBranchByCustomerIdState)
  const [ isPreviewModalOpen, setPreviewModalOpen ] = useState(false)
  const [ previewData, setPreviewData ] = useState({})
  const productData = useSelector(productListState)
  const [ orderCreateData, setOrderCreateData ] = useState({})
  const orderDetail = useSelector(oderDetailState)
  const deliveryShiftData = useSelector(listAllDeliveryShiftState)
  const finishedProductFormData = useSelector(listAllFinishedProductFormState)
  const tagData = useSelector(listAllTagState)
  const paymentData = useSelector(listAllPaymentState)
  const productFormData = useSelector(listAllProductFormState)
  const updateOderPreviewSuccessFlag = useSelector(updateOderPreviewSuccessFlagState)
  const updateOderPreviewErrorMessage = useSelector(updateOderPreviewErrorMessageState)
  const updateOderSuccessFlag = useSelector(updateOderSuccessFlagState)
  const updateOderErrorMessage = useSelector(updateOderErrorMessageState)
  const [ currentPageCustomerListTransaction, setCurrentPageCustomerListTransaction ] = useState(1)
  const [ currentPageQuotationHistories, setCurrentPageQuotationHistories ] = useState(1)
  const [ currentPageClaimHistories, setCurrentPageClaimHistories ] = useState(1)
  const [ currentPageProposalDebtAge, setCurrentPageProposalDebtAge ] = useState(1)

  const handleClickToggle = (type) => {
    if (type == commons.OFFICE_ADDRESS) {
      setIsShowOfficeAddress(!isShowOfficeAddress)
    } else if (type == commons.FACTORY_ADDRESS) {
      setIsShowFactoryAddress(!isShowFactoryAddress)
    } else if (type == commons.BRANCH_ADDRESS) {
      setIsShowBranchAddress(!isShowBranchAddress)
    }
  }

  useEffect(() => {
    if (updateCustomerHandbookFlag) {
      setIsOpenCustomerHandbook(false)
    }
    if (createProposalDebtAgeSuccess) {
      dispatch(getListProposalDebtAgeByCustomerIdAction({ customerId: customerId }))
    }
  }, [ updateCustomerHandbookFlag, createProposalDebtAgeSuccess ])

  const handleDateRangeChange = (range) => {
    setSelectedRange(range)
    setCurrentPageCustomerListTransaction(1)
  }

  const removeMessageError = useCallback(() => {
    dispatch(removeMessageErrorAction())
  }, [])

  const handleClear = () => {
    setAmount('')
    setLoadingListOrderByCustomer(true)
    dispatch(getListOrderByCustomerAction({ customer_id: customerId })).then(() => {
      setLoadingListOrderByCustomer(false)
    })
  }

  const createClaimSuccessFlag = useSelector(createClaimSuccessFlagState)
  const [ isOpenEnterCreateClaimModal, setIsOpenEnterCreateClaimModal ] = useState(false)

  const handleOrderDataChange = (data) => {
    dispatch(updateOderPreviewAction({ ...data, id: orderDetail.id }))
    setOrderCreateData({ ...data, id: orderDetail.id })
  }

  const onChangeStatus = (value) => {
    setClaimStatusId(value)
  }
  useEffect(() => {
    if (deleteClaimSuccessMessage) {
      setCurrentPageClaimHistories(1)
      dispatch(getListClaimHistoriesByCustomerIdAction({ customerId: customerId }))
    }
    if (deleteProposalDebtAgeSuccessMessage || updateProposalDebtAgeSuccessMessage) {
      setCurrentPageProposalDebtAge(1)
      dispatch(getListProposalDebtAgeByCustomerIdAction({ customerId: customerId }))
      setIsOpenUpdateProposedDebtAgeModal(false)
    }
  }, [ deleteClaimSuccessMessage, deleteProposalDebtAgeSuccessMessage, updateProposalDebtAgeSuccessMessage ])

  useEffect(() => {
    dispatch(getListSalesInChargeAction())
    dispatch(getQuotationListAction({ customer_id: customerId }))
    dispatch(getListAllStatusOrderByCustomerAction())
    dispatch(getAllClaimStatusAction())
    dispatch(getCustomerListAction())
    dispatch(getAllProposalStatusAction())
    dispatch(getStatisticProposalAction())
    dispatch(getAllClaimProblemAction())
    if (quotationHistoryId) {
      setValueTabs('2')
      dispatch(getDetailQuotationHistoryAction({ id: quotationHistoryId }))
      setIsOpenDetailQuotation(true)
    } else if (debtAgeId) {
      setValueTabs('4')
      dispatch(getDetailProposalDebtAgeAction({ id: debtAgeId }))
      setIsOpenDetailProposedDebtAgeModal(true)
    } else if (claimId) {
      setValueTabs('3')
      dispatch(getClaimInformationAction(claimId))
      setIsOpenClaimViewModal(true)
    }
  }, [ customerId, quotationHistoryId, debtAgeId, dispatch, claimId ])

  useEffect(() => {
    if (updateCustomerSuccessFlag) {
      dispatch(getCustomerInformationAction({ id: customerId, from_date: '', to_date: '' }))
      setIsOpenModalUpdate(false)
    }
  }, [ updateCustomerSuccessFlag ])

  useEffect(() => {
    if (selectedDateRangeCustomerDetail) {
      dispatch(
        getCustomerInformationAction({
          id: customerId,
          from_date: selectedDateRangeCustomerDetail ? selectedDateRangeCustomerDetail[0] : '',
          to_date: selectedDateRangeCustomerDetail ? selectedDateRangeCustomerDetail[1] : ''
        })
      )
    }
  }, [ selectedDateRangeCustomerDetail ])

  useEffect(() => {
    if (createQuotationPreviewSuccessFlag) {
      setIsOpenQuotesModal(false)
      setIsOpenModalQuotationPreview(true)
    }
  }, [ createQuotationPreviewSuccessFlag ])

  useEffect(() => {
    if (updateQuotationPreviewSuccessFlag) {
      setIsOpenUpdateQuotesModal(false)
      setIsOpenUpdateModalQuotationPreview(true)
    }
  }, [ updateQuotationPreviewSuccessFlag ])

  useEffect(() => {
    if (createQuotationSuccessFlag || deleteQuotationHistorySuccessMessage || updateQuotationHistorySuccessMessage) {
      setIsOpenQuotesModal(false)
      setIsOpenModalQuotationPreview(false)
      setIsOpenUpdateQuotesModal(false)
      setIsOpenUpdateModalQuotationPreview(false)
      setEditedDataPDF([])
      setEditedDataUpdatePDF([])
      setCurrentPageQuotationHistories(1)
      dispatch(getQuotationHistoriesByCustomerIdAction({ customerId: customerId }))
      removeMessageError()
    }
  }, [ createQuotationSuccessFlag, deleteQuotationHistorySuccessMessage, updateQuotationHistorySuccessMessage ])

  useEffect(() => {
    if (updateClaimSuccessFlag) {
      setIsOpenClaimModal(false)
      dispatch(
        getCustomerInformationAction({
          id: customerId,
          from_date: selectedDateRangeCustomerDetail[0],
          to_date: selectedDateRangeCustomerDetail[1]
        })
      )
      dispatch(getListClaimHistoriesByCustomerIdAction({ customerId: customerId }))
    }
    if (createClaimSuccessFlag) {
      setIsOpenEnterCreateClaimModal(false)
      dispatch(
        getCustomerInformationAction({
          id: customerId,
          from_date: selectedDateRangeCustomerDetail[0],
          to_date: selectedDateRangeCustomerDetail[1]
        })
      )
      dispatch(getListClaimHistoriesByCustomerIdAction({ customerId: customerId }))
    }
  }, [ updateClaimSuccessFlag, createClaimSuccessFlag ])

  const handleOpenUpdateOrderModal = (orderId) => {
    removeMessageError()
    dispatch(getOderDetailAction(orderId))
    setIsOpenModalOderUpdate(true)
  }

  const handleDateRangeChangeHistoryClaim = (range) => {
    setSelectedDateRangeHistoryClaim(range)
  }
  const handleDateRangeChangeQuotation = (range) => {
    setSelectedDateRangeQuotationHistory(range)
  }
  const handleDateRangeChangeListProposalDebtAge = (range) => {
    setSelectedDateRangeProposalDebtAge(range)
  }

  useEffect(() => {
    if (valueTabs === '4' && ( statusId || selectedDateRangeProposalDebtAge )) {
      autoSearchDebtAge()
    } else if (valueTabs === '3' && ( claimStatusId || selectedDateRangeHistoryClaim )) {
      handleSearch()
    } else if (valueTabs === '1' && ( statusOrderId || selectedRange )) {
      handleFindClick()
    } else if (valueTabs === '2' && selectedDateRangeQuotationHistory) {
      autoSearchDateQuotation()
    }
  }, [
    valueTabs,
    statusId,
    selectedDateRangeProposalDebtAge,
    claimStatusId,
    selectedDateRangeHistoryClaim,
    statusOrderId,
    selectedRange,
    selectedDateRangeQuotationHistory
  ])

  const autoSearchDebtAge = () => {
    let params = {
      customerId: customerId,
      proposal_status_id: statusId,
      from_date: selectedDateRangeProposalDebtAge[0],
      to_date: selectedDateRangeProposalDebtAge[1]
    }
    setCurrentPageProposalDebtAge(1)
    setLoading(true)
    dispatch(getListProposalDebtAgeByCustomerIdAction(params)).then(() => {
      setLoading(false)
    })
  }

  const autoSearchDateQuotation = () => {
    let params = {
      customerId: customerId,
      from_date: selectedDateRangeQuotationHistory[0],
      to_date: selectedDateRangeQuotationHistory[1]
    }
    setCurrentPageQuotationHistories(1)
    setLoading(true)
    dispatch(getQuotationHistoriesByCustomerIdAction(params)).then(() => {
      setLoading(false)
    })
  }
  const handleDateRangeChangeCustomerDetail = (range) => {
    setNoneSelectedDateRangeCustomerDetail(true)
    setSelectedDateRangeCustomerDetail(range)
  }

  const createQuotationPreviewCustomer = useCallback((value) => {
    setEditedDataPDF(value)
    dispatch(createQuotationPreviewAction(value))
  }, [])

  const updateQuotationPreviewCustomer = useCallback((value) => {
    setEditedDataUpdatePDF(value)
    dispatch(updateQuotationPreviewAction(value))
  }, [])

  const handleChangeTabs = (event, newValueTabs) => {
    setCurrentPageCustomerListTransaction(1)
    setValueTabs(newValueTabs)
  }

  const openCustomerHandbook = () => {
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
    dispatch(
      getDetailCustomerHandbookAllAction({
        customer_id: customerId,
        from_date: customerDetail.created_at,
        to_date: formattedToday
      })
    )
    setIsOpenCustomerHandbook(true)
  }

  const handleCloseCustomerHandbookModal = () => {
    setIsOpenCustomerHandbook(false)
  }

  const openQuoteModal = () => {
    setIsOpenQuotesModal(true)
  }

  const openZaloModal = () => {
    if (customerDetail.uid) {
      const url = `${ process.env.REACT_APP_ZALO_CHAT_URL }uid=${ customerDetail.uid }&oaid=${ process.env.REACT_APP_ZALO_OAID }`
      window.open(url, '_blank')
    } else {
      setIsOpenZaloModal(true)
    }
  }

  const closeZaloModal = () => {
    setIsOpenZaloModal(false)
  }

  const handleCloseClaimModal = () => {
    setIsOpenClaimModal(false)
    setIsOpenClaimViewModal(false)
    setIsOpenEnterCreateClaimModal(false)
  }
  const handleGetDataClaim = useCallback((params) => {
    dispatch(getClaimInformationAction(params))
    setIsOpenClaimModal(true)
  }, [])

  const openCreateClaim = () => {
    setIsOpenEnterCreateClaimModal(true)
  }

  const createClaim = useCallback((params) => {
    dispatch(createClaimAction(params))
  }, [])

  const updateCustomerHandbook = useCallback((params) => {
    dispatch(updateCustomerHandbookAllAction(params))
  }, [])

  const handleViewDetailClaim = useCallback((params) => {
    dispatch(getClaimInformationAction(params))
    setIsOpenClaimViewModal(true)
  }, [])

  const updateClaim = useCallback((params) => {
    dispatch(updateClaimAction(params))
  }, [])
  const handleDeleteClaim = useCallback((params) => {
    dispatch(deleteClaimAction(params))
  }, [])

  const handleDeleteQuotationHistory = useCallback((params) => {
    dispatch(deleteQuotationHistoryAction(params))
  }, [])

  const handleCloseQuoteModal = useCallback(() => {
    setIsOpenQuotesModal(false)
    setEditedDataPDF([])
    setEditedDataUpdatePDF([])
  }, [])

  const handleCloseUpdateQuoteModal = useCallback(() => {
    setIsOpenUpdateQuotesModal(false)
    setEditedDataPDF([])
    setEditedDataUpdatePDF([])
  }, [])

  const handleSearch = () => {
    let params = {
      customerId: customerId,
      claimStatusId: claimStatusId,
      from_date: selectedDateRangeHistoryClaim[0],
      to_date: selectedDateRangeHistoryClaim[1]
    }
    setCurrentPageClaimHistories(1)
    setLoading(true)
    dispatch(getListClaimHistoriesByCustomerIdAction(params)).then(() => {
      setLoading(false)
    })
  }

  const handlePageChangeListQuotationHistories = (event, page) => {
    setLoading(true)
    setCurrentPageQuotationHistories(page)
    dispatch(
      getQuotationHistoriesByCustomerIdAction({
        page: page,
        customerId: customerId,
        from_date: selectedDateRangeQuotationHistory[0],
        to_date: selectedDateRangeQuotationHistory[1]
      })
    ).then(() => {
      setLoading(false)
    })
  }

  const handlePageChangeListProposalDebtAge = (event, page) => {
    setLoading(true)
    setCurrentPageProposalDebtAge(page)
    dispatch(
      getListProposalDebtAgeByCustomerIdAction({
        page: page,
        customerId: customerId,
        proposal_status_id: statusId,
        from_date: selectedDateRangeProposalDebtAge[0],
        to_date: selectedDateRangeProposalDebtAge[1]
      })
    ).then(() => {
      setLoading(false)
    })
  }

  const handlePageChangeListOrderByCustomer = (event, page) => {
    setLoadingListOrderByCustomer(true)
    setCurrentPageCustomerListTransaction(page)

    let params = {
      customer_id: customerId,
      order_status_id: statusOrderId,
      from_date: selectedRange ? selectedRange[0] : '',
      to_date: selectedRange ? selectedRange[1] : '',
      page
    }

    if (comparison === '>') {
      params.total_cost_greater_than_equal = removeDots(amount)
    } else {
      params.total_cost_less_than_equal = removeDots(amount)
    }

    if (isSortedAZCode) {
      params.sort_by = 'code_az'
    } else if (isSortedZACode) {
      params.sort_by = 'code_za'
    } else if (isSortedAZTotalCost) {
      params.sort_by = 'total_cost_az'
    } else if (isSortedZATotalCost) {
      params.sort_by = 'total_cost_za'
    } else if (isSortedAZCreateAt) {
      params.sort_by = 'created_at_az'
    } else if (isSortedZACreateAt) {
      params.sort_by = 'created_at_za'
    }

    dispatch(getListOrderByCustomerAction(params)).then(() => {
      setLoadingListOrderByCustomer(false)
    })
  }

  useEffect(() => {
    if (deleteSuccessMessage !== '' || updateOderSuccessFlag) {
      setPreviewModalOpen(false)
      setLoadingListOrderByCustomer(true)
      setCurrentPageCustomerListTransaction(1)
      dispatch(
        getListOrderByCustomerAction({
          customer_id: customerId,
          total_cost_greater_than_equal: removeDots(amount),
          order_status_id: statusOrderId,
          from_date: selectedRange ? selectedRange[0] : '',
          to_date: selectedRange ? selectedRange[1] : ''
        })
      ).then(() => {
        setLoadingListOrderByCustomer(false)
      })
    }
  }, [ deleteSuccessMessage, updateOderSuccessFlag ])

  const handlePageChangeHistoryClaim = (event, page) => {
    setLoading(true)
    setCurrentPageClaimHistories(page)
    dispatch(
      getListClaimHistoriesByCustomerIdAction({
        page: page,
        from_date: selectedDateRangeHistoryClaim ? selectedDateRangeHistoryClaim[0] : '',
        to_date: selectedDateRangeHistoryClaim ? selectedDateRangeHistoryClaim[1] : '',
        customerId: customerId,
        claimStatusId: claimStatusId
      })
    ).then(() => {
      setLoading(false)
    })
  }

  const handleFindClick = () => {
    setLoadingListOrderByCustomer(true)
    setCurrentPageCustomerListTransaction(1)
    if (comparison === '>') {
      dispatch(
        getListOrderByCustomerAction({
          customer_id: customerId,
          total_cost_greater_than_equal: removeDots(amount),
          order_status_id: statusOrderId,
          from_date: selectedRange ? selectedRange[0] : '',
          to_date: selectedRange ? selectedRange[1] : ''
        })
      ).then(() => {
        setLoadingListOrderByCustomer(false)
      })
    } else {
      dispatch(
        getListOrderByCustomerAction({
          customer_id: customerId,
          total_cost_less_than_equal: removeDots(amount),
          order_status_id: statusOrderId,
          from_date: selectedRange ? selectedRange[0] : '',
          to_date: selectedRange ? selectedRange[1] : ''
        })
      ).then(() => {
        setLoadingListOrderByCustomer(false)
      })
    }
  }

  const handleChange = (e) => {
    setComparison(e.target.value)
  }

  const handleOpenEdit = () => {
    setIsOpenModalUpdate(true)
  }

  const handleChangeProvinceFormCreateUser = useCallback((value) => {
    dispatch(setGetListDistrictFlagAction(true))
    dispatch(getListDistrictByProvinceIdAction(value))
  }, [])

  const handleChangeDistrictFormCreateUser = useCallback((value) => {
    dispatch(setGetListWardFlagAction(true))
    dispatch(getListWardByDistrictIdAction(value))
  }, [])

  const updateCustomer = useCallback((params) => {
    dispatch(updateCustomerAction(params))
  }, [])

  const handleCloseUpdateModal = useCallback(() => {
    setIsOpenModalUpdate(false)
  }, [])

  const getSortingParams = (sortBy) => {
    return {
      customer_id: customerId,
      order_status_id: statusOrderId,
      from_date: selectedRange ? selectedRange[0] : '',
      to_date: selectedRange ? selectedRange[1] : '',
      sort_by: sortBy,
      ...( comparison === '>'
        ? { total_cost_greater_than_equal: removeDots(amount) }
        : { total_cost_less_than_equal: removeDots(amount) } )
    }
  }

  const handleSorting = (sortBy, setSortedState) => {
    const params = getSortingParams(sortBy)
    dispatch(getListOrderByCustomerAction(params))
    setSortedState(true)
  }

  const sortDataAzCode = useCallback(() => {
    handleSorting('code_az', setIsSortedAZCode)
  }, [ amount, statusOrderId, selectedRange, comparison ])

  const sortDataZaCode = useCallback(() => {
    handleSorting('code_za', setIsSortedZACode)
  }, [ amount, statusOrderId, selectedRange, comparison ])

  const sortDataAzTotalCost = useCallback(() => {
    handleSorting('total_cost_az', setIsSortedAZTotalCost)
  }, [ amount, statusOrderId, selectedRange, comparison ])

  const sortDataZaTotalCost = useCallback(() => {
    handleSorting('total_cost_za', setIsSortedZATotalCost)
  }, [ amount, statusOrderId, selectedRange, comparison ])

  const sortDataAzCreateAt = useCallback(() => {
    handleSorting('created_at_az', setIsSortedAZCreateAt)
  }, [ amount, statusOrderId, selectedRange, comparison ])

  const sortDataZaCreateAt = useCallback(() => {
    handleSorting('created_at_za', setIsSortedZACreateAt)
  }, [ amount, statusOrderId, selectedRange, comparison ])

  const getListOrderByCustomer = useCallback(() => {
    setIsSortedAZCode(false)
    setIsSortedZACode(false)
    setIsSortedAZTotalCost(false)
    setIsSortedZATotalCost(false)
    setIsSortedAZCreateAt(false)
    setIsSortedZACreateAt(false)

    const params = getSortingParams()
    dispatch(getListOrderByCustomerAction(params))
  }, [ amount, statusOrderId, selectedRange, comparison ])

  const handleOpenProposedDebtAgeModal = () => {
    setIsOpenProposedDebtAgeModal(true)
  }

  const handleUpdateProposedDebtAge = (Id) => {
    dispatch(getDetailProposalDebtAgeAction({ id: Id }))
    setIsOpenUpdateProposedDebtAgeModal(true)
  }

  const handleCloseProposedDebtAgeModal = () => {
    setIsOpenProposedDebtAgeModal(false)
    setIsOpenDetailProposedDebtAgeModal(false)
    setIsOpenUpdateProposedDebtAgeModal(false)
  }

  const handleDetailProposedDebtAgeModal = (Id) => {
    dispatch(getDetailProposalDebtAgeAction({ id: Id }))
    setIsOpenDetailProposedDebtAgeModal(true)
  }

  const handleDetailQuotationModal = (quotationId) => {
    dispatch(getDetailQuotationHistoryAction({ id: quotationId }))
    setIsOpenDetailQuotation(true)
  }
  const handleUpdateQuotationModal = (quotationId) => {
    dispatch(getDetailQuotationHistoryAction({ id: quotationId }))
    setIsOpenUpdateQuotesModal(true)
  }

  const handleCloseDetailQuotationModal = () => {
    setIsOpenDetailQuotation(false)
  }

  const createProposedDebtAge = useCallback((params) => {
    dispatch(createProposalDebtAgeAction(params))
    setIsOpenProposedDebtAgeModal(false)
  }, [])

  const deleteProposalDebtAge = useCallback((params) => {
    dispatch(deleteProposalDebtAgeAction(params))
  }, [])

  const updateProposalDebtAge = useCallback((params) => {
    dispatch(updateProposalDebtAgeAction(params))
  }, [])

  const handleCloseQuotationPreviewModal = useCallback(() => {
    setIsOpenModalQuotationPreview(false)
    setIsOpenQuotesModal(true)
  }, [])

  const handleCloseUpdateQuotationPreviewModal = useCallback(() => {
    setIsOpenUpdateModalQuotationPreview(false)
    setIsOpenUpdateQuotesModal(true)
  }, [])

  const onChangeProvinceOffice = useCallback((value) => {
    dispatch(setGetListDistrictOfficeFlagAction(true))
    dispatch(getListDistrictByProvinceIdAction(value))
  }, [])

  const onChangeDistrictOffice = useCallback((value) => {
    dispatch(setGetListWardOfficeFlagAction(true))
    dispatch(getListWardByDistrictIdAction(value))
  }, [])

  const onChangeProvinceFactory = useCallback((value) => {
    dispatch(setGetListDistrictFactoryFlagAction(true))
    dispatch(getListDistrictByProvinceIdAction(value))
  }, [])

  const onChangeDistrictFactory = useCallback((value) => {
    dispatch(setGetListWardFactoryFlagAction(true))
    dispatch(getListWardByDistrictIdAction(value))
  }, [])

  const deleteOder = useCallback((params) => {
    dispatch(deleteDataOderAction(params))
  }, [])

  const handleCloseUpdateOrderModal = () => {
    setIsOpenModalOderUpdate(false)
    removeMessageError()
  }

  const handleOpenPreviewModal = () => {
    setIsOpenModalOderUpdate(false)
    setPreviewModalOpen(true)
  }

  const handlePreviewDataChange = (data) => {
    setPreviewData(data)
  }

  return (
    <>
      <HeaderPage
        title={ t('customerInformation') }
        actionButton={
          <Button
            className={ `modalButtonClick ${ checkPermissionUpdate ? 'disabled-cursor' : '' }` }
            disabled={ checkPermissionUpdate }
            sx={ { gap: '8px' } }
            onClick={ () => handleOpenEdit() }
          >
            <TbEdit style={ { fontSize: '16px', marginBottom: '2px' } }/>
            { t('editAction') }
          </Button>
        }
      />
      <Box sx={ { display: 'flex', justifyContent: 'flex-end' } }>
        <UpdateCustomerModal
          nameTitle={ t('editCustomer') }
          data={ customerDetail }
          onChangeProvinceOffice={ onChangeProvinceOffice }
          onChangeDistrictOffice={ onChangeDistrictOffice }
          onChangeProvinceFactory={ onChangeProvinceFactory }
          onChangeDistrictFactory={ onChangeDistrictFactory }
          dataDistrictOffice={ dataDistrictOffice }
          dataWardOffice={ dataWardOffice }
          dataDistrictFactory={ dataDistrictFactory }
          dataWardFactory={ dataWardFactory }
          customerOfficeAddressDetailData={ customerOfficeAddressDetail }
          customerFactoryAddressDetailData={ customerFactoryAddressDetail }
          dataProvince={ provinceData }
          dataDistrict={ districtDataTemp }
          onChangeProvince={ handleChangeProvinceFormCreateUser }
          onChangeDistrict={ handleChangeDistrictFormCreateUser }
          dataWard={ wardDataTemp }
          dataDebtAge={ listDebtAge }
          dataSalesInCharge={ listSalesInCharge }
          handleUpdate={ updateCustomer }
          errorsMessage={ errorsMessageUpdateCustomer }
          open={ isOpenModalUpdate }
          handleClose={ handleCloseUpdateModal }
          removeMessageError={ removeMessageError }
        />
      </Box>
      <Box p={ 2 }>
        <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }>
          <Box>
            <Typography sx={ { color: colors.charcoalgrayColor } }>{ t('customer') }</Typography>
            <Typography sx={ { fontSize: 22, fontWeight: 600 } }>{ customerDetail.customer_name }</Typography>
          </Box>
          <Box>
            <Box className="button-container">
              <Button className="buttons-customer">
                <HiOutlineMail style={ { fontSize: '16px', marginBottom: '2px' } }/>
                { t('sendEmail') }
              </Button>
              <Button className="buttons-customer">
                <PiPhoneCall style={ { fontSize: '16px', marginBottom: '2px' } }/>
                { t('call') }
              </Button>
              <Tooltip title={ !customerDetail.zalo_number ? t('noticeCustomerNotZaloNumber') : '' }>
                <Button
                  disabled={ !customerDetail.zalo_number }
                  className={ `buttons-customer ${ !customerDetail.zalo_number ? 'disabled-cursor' : '' }` }
                  onClick={ openZaloModal }
                >
                  <TbMessage style={ { fontSize: '16px', marginBottom: '2px' } }/>
                  { t('texting') }
                </Button>
              </Tooltip>
              <ZaloModal
                open={ isOpenZaloModal }
                handleCloseModal={ closeZaloModal }
                customerName={ customerDetail.customer_name }
              />
              <Button
                className={ `buttons-customer ${ checkPermissionUpdate ? 'disabled-cursor' : '' }` }
                disabled={ checkPermissionUpdate }
                onClick={ openQuoteModal }
              >
                <LuScrollText
                  style={ {
                    transform: 'scaleX(-1)',
                    fontSize: '16px',
                    marginBottom: '2px'
                  } }
                />
                { t('quotes') }
              </Button>
              <Button
                disabled={ customerDetail.disable_update }
                className={ `buttons-customer ${ customerDetail.disable_update ? 'disabled-cursor' : '' }` }
                onClick={ openCreateClaim }
              >
                <AiOutlineFileExclamation style={ { fontSize: '16px', marginBottom: '2px' } }/>
                { t('claim') }
              </Button>
              <Button
                className={ `buttons-customer ${ checkPermissionUpdate ? 'disabled-cursor' : '' }` }
                disabled={ checkPermissionUpdate }
                onClick={ openCustomerHandbook }
              >
                <TbBook style={ { fontSize: '16px', marginBottom: '2px' } }/>
                { t('customerHandbook') }
              </Button>
            </Box>
            <QuotationModal
              open={ isOpenQuotesModal }
              nameTitle={ t('createQuote') }
              quotationData={ quotationData }
              handleCreatePreviewQuote={ createQuotationPreviewCustomer }
              errorsMessage={ errorCreateQuotationPreviewMessage }
              dataCustomer={ customerDetail }
              handleClose={ handleCloseQuoteModal }
              createQuotationSuccessFlag={ createQuotationSuccessFlag }
              removeMessageError={ removeMessageError }
              getProfile={ getProfile }
              databack={ editedDataPDF }
            />
            <PDFPreviewModal
              open={ isOpenModalQuotationPreview }
              data={ customerDetail }
              dataProduct={ editedDataPDF }
              getProfile={ getProfile }
              handleClose={ handleCloseQuotationPreviewModal }
              createQuotationPreviewSuccessFlag={ createQuotationPreviewSuccessFlag }
            />
            <ClaimModal
              handleCloseModal={ handleCloseClaimModal }
              open={ isOpenEnterCreateClaimModal }
              dataCustomer={ listAllCustomer }
              dataCustomerDetail={ customerDetail }
              dataClaimProblem={ listAllClaimProblem }
              nameTitle={ t('enterClaim') }
              handleSubmitAction={ createClaim }
              customerId={ customerId }
              successFlag={ createClaimSuccessFlag }
              isCreateById={ true }
            />
            <CustomerHandbook
              open={ isOpenCustomerHandbook }
              nameTitle={ t('customerHandbookTitle') }
              handleCloseModal={ handleCloseCustomerHandbookModal }
              data={ listDetailCustomerHandbook }
              handleSubmitAction={ updateCustomerHandbook }
              removeMessageError={ removeMessageError }
              errorsMessage={ updateCustomerHandbookErrorMessage }
              updateCustomerHandbookFlag={ updateCustomerHandbookFlag }
              listAllProductSubstitutability={ listAllProductSubstitutability }
              listAllIndustryGroup={ listAllIndustryGroup }
              listAllPersonnelScale={ listAllPersonnelScale }
              listAllFactoryScale={ listAllFactoryScale }
              listAllCompanyType={ listAllCompanyType }
              listAllOrderPlan={ listAllOrderPlan }
              listAllQuanlityRequire={ listAllQuanlityRequire }
              listAllProductApplication={ listAllProductApplication }
              listAllFrequencyCompanyVisit={ listAllFrequencyCompanyVisit }
              listAllIncentivePolicy={ listAllIncentivePolicy }
              listAllConsultationHistoryProblem={ listAllConsultationHistoryProblem }
              customerDetail={ customerDetail }
              dataProvince={ provinceData }
              dataDistrict={ districtDataTemp }
              dataWard={ wardDataTemp }
              onChangeProvince={ handleChangeProvinceFormCreateUser }
              onChangeDistrict={ handleChangeDistrictFormCreateUser }
            />
          </Box>
        </Box>
        <Box
          sx={ {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            mt: 1
          } }
        >
          <CustomDateRangePicker
            className="date-range-picker"
            dataCustomerDetail={ customerDetail }
            none={ selectedNoneDateRangeCustomerDetail }
            onChange={ handleDateRangeChangeCustomerDetail }
            noDisplayLabel={ true }
          />
        </Box>
        <Box sx={ { display: 'flex', gap: '20px', mt: 2 } }>
          <Box className="box">
            <GrowthIcon/>
            <Box>
              <Typography className="title">{ t('revenue') }</Typography>
              <Typography className="text">{ formatCurrency(customerDetail.total_revenue || 0) }</Typography>
            </Box>
          </Box>
          <Box className="box">
            <RevenueIcon/>
            <Box>
              <Typography className="title">{ t('profitParameter') }</Typography>
              <Typography className="text">{ formatCurrency(129000000) }</Typography>
            </Box>
          </Box>
          <Box className="box">
            <DebtIcon/>
            <Box>
              <Typography className="title">{ t('accountsPayable') }</Typography>
              <Typography className="text">{ formatCurrency(-200000000) }</Typography>
            </Box>
          </Box>
          <Box className="box">
            <ClaimIcon/>
            <Box>
              <Typography className="title">{ t('claimParameter') }</Typography>
              <Typography className="text">{ customerDetail.claims || 0 }</Typography>
            </Box>
          </Box>
        </Box>

        <Box
          component="form"
          sx={ {
            bgcolor: colors.lilywhiteColor,
            p: 2,
            mt: 2,
            borderRadius: '8px',
            position: 'relative',
            flexGrow: 1
          } }
        >
          <Box sx={ { display: 'flex', gap: '20px' } }>
            <Box flex={ 1 }>
              <Box sx={ { display: 'flex', alignItems: 'center' } }>
                <Typography variant="h6" className="frontpager">
                  { t('basicInformation') }
                </Typography>
              </Box>
              <TableContainer>
                <Table sx={ { border: 'none' } }>
                  <TableBody>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={ {
                          whiteSpace: 'nowrap',
                          pr: '16px !important',
                          width: '140px'
                        } }
                      >
                        <Typography className="label-info">{ t('customerCode') }:</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">{ customerDetail.code }</Typography>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={ {
                          whiteSpace: 'nowrap',
                          pr: '16px !important',
                          width: '140px'
                        } }
                      >
                        <Typography className="label-info">{ t('firstAndLastName') }:</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">{ customerDetail.customer_name }</Typography>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={ {
                          whiteSpace: 'nowrap',
                          pr: '16px !important',
                          width: '140px'
                        } }
                      >
                        <Typography className="label-info">{ t('companyName') }:</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">{ customerDetail.company_name }</Typography>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={ {
                          whiteSpace: 'nowrap',
                          pr: '16px !important',
                          width: '140px'
                        } }
                      >
                        <Typography className="label-info">{ t('phoneNumber') }:</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">{ customerDetail.phone_number }</Typography>
                      </StyledTableCell>
                    </TableRow>
                    { customerDetail.zalo_number && (
                      <TableRow>
                        <StyledTableCell
                          component="th"
                          sx={ {
                            whiteSpace: 'nowrap',
                            pr: '16px !important',
                            width: '140px'
                          } }
                        >
                          <Typography className="label-info">{ t('zaloNumber') }:</Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography className="result-letters">
                            { customerDetail.zalo_number ? customerDetail.zalo_number : '\u00A0' }
                          </Typography>
                        </StyledTableCell>
                      </TableRow>
                    ) }
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={ {
                          whiteSpace: 'nowrap',
                          pr: '16px !important',
                          width: '140px'
                        } }
                      >
                        <Typography className="label-info">{ t('debtLimit') }:</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">
                          { formatCurrency(customerDetail.debt_limit ? customerDetail.debt_limit : '\u00A0') }
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={ {
                          whiteSpace: 'nowrap',
                          pr: '16px !important',
                          width: '140px'
                        } }
                      >
                        <Typography className="label-info">{ t('debtAge') }:</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">
                          { customerDetail.debt_age?.debt_age_name ? (
                            customerDetail.debt_age.debt_age_name
                          ) : (
                            <>
                              { t('notDebtAgeYet') }
                              <Button
                                className={ `proposedButton ${ checkPermissionUpdate ? 'disabled-cursor' : '' }` }
                                disabled={ checkPermissionUpdate }
                                onClick={ handleOpenProposedDebtAgeModal }
                              >
                                { t('proposal') } <ArrowForwardIcon/>
                              </Button>
                            </>
                          ) }
                        </Typography>
                        <ProposedDebtAgeModal
                          handleSubmitAction={ createProposedDebtAge }
                          customerId={ customerId }
                          dataCustomerDetail={ customerDetail }
                          open={ isOpenProposedDebtAgeModal }
                          handleCloseModal={ handleCloseProposedDebtAgeModal }
                          nameTitle={ t('proposeDebtAge') }
                          dataDebtAge={ listDebtAge }
                        />
                      </StyledTableCell>
                    </TableRow>
                    <TableRow>
                      <StyledTableCell
                        component="th"
                        sx={ {
                          whiteSpace: 'nowrap',
                          pr: '16px !important',
                          width: '140px'
                        } }
                      >
                        <Typography className="label-info">{ t('salesInCharge') }:</Typography>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Typography className="result-letters">
                          { customerDetail.users && customerDetail.users.length > 0
                            ? customerDetail.users.map((user) => user.name).join(', ')
                            : '\u00A0' }
                        </Typography>
                      </StyledTableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              {/*----------------------Address Branch----------------------*/ }
              { customerDetail.address_branches && customerDetail.address_branches.length > 0 ? (
                <>
                  <Box sx={ { display: 'flex', alignItems: 'center' } }>
                    <Typography className="label-info" sx={ { color: colors.indigoColor } }>
                      { t('branch') }
                    </Typography>
                    { !isShowBranchAddress ? (
                      <HiChevronDown
                        onClick={ () => handleClickToggle(commons.BRANCH_ADDRESS) }
                        style={ {
                          cursor: 'pointer',
                          fontSize: '24px',
                          color: colors.lightGreyColor
                        } }
                      />
                    ) : (
                      <HiChevronUp
                        onClick={ () => handleClickToggle(commons.BRANCH_ADDRESS) }
                        style={ {
                          cursor: 'pointer',
                          fontSize: '24px',
                          color: colors.lightGreyColor
                        } }
                      />
                    ) }
                  </Box>
                  { isShowBranchAddress && (
                    <>
                      { customerDetail.address_branches.map((branch, index) => {
                        if (branch.address_branch_name) {
                          validAddressBranchCount++
                          return (
                            <TableContainer key={ index }>
                              <Table sx={ { border: 'none' } }>
                                <TableRow sx={ { verticalAlign: 'baseline' } }>
                                  <StyledTableCell
                                    component="th"
                                    sx={ {
                                      whiteSpace: 'nowrap',
                                      width: '170px',
                                      borderBottom: 'none',
                                      p: '0 16px'
                                    } }
                                  >
                                    <Typography className="label-info">
                                      { t('branch') } { validAddressBranchCount }:
                                    </Typography>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={ {
                                      whiteSpace: 'pre-line',
                                      borderBottom: 'none',
                                      p: 0
                                    } }
                                  >
                                    <Typography sx={ { lineHeight: '20px !important' } } className="result-letters">
                                      { branch.address_branch_name && `${ branch.address_branch_name }` }
                                    </Typography>
                                  </StyledTableCell>
                                </TableRow>
                              </Table>
                            </TableContainer>
                          )
                        } else {
                          return null
                        }
                      }) }
                    </>
                  ) }
                </>
              ) : null }
              {/*----------------------Office Address----------------------*/ }
              { customerDetail.address_offices && customerDetail.address_offices.length > 0 ? (
                <>
                  <Box sx={ { display: 'flex', alignItems: 'center' } }>
                    <Typography className="label-info" sx={ { color: colors.indigoColor } }>
                      { t('officeAddress') }
                    </Typography>
                    { !isShowOfficeAddress ? (
                      <HiChevronDown
                        onClick={ () => handleClickToggle(commons.OFFICE_ADDRESS) }
                        style={ {
                          cursor: 'pointer',
                          fontSize: '24px',
                          color: colors.lightGreyColor
                        } }
                      />
                    ) : (
                      <HiChevronUp
                        onClick={ () => handleClickToggle(commons.OFFICE_ADDRESS) }
                        style={ {
                          cursor: 'pointer',
                          fontSize: '24px',
                          color: colors.lightGreyColor
                        } }
                      />
                    ) }
                  </Box>
                  { isShowOfficeAddress && (
                    <>
                      { customerDetail.address_offices.map((address, index) => {
                        if (
                          address.address.detail ||
                          address.address.ward ||
                          address.address.district ||
                          address.address.province
                        ) {
                          validAddressOfficeCount++
                          return (
                            <TableContainer key={ index }>
                              <Table sx={ { border: 'none' } }>
                                <TableRow sx={ { verticalAlign: 'baseline' } }>
                                  <StyledTableCell
                                    component="th"
                                    sx={ {
                                      whiteSpace: 'nowrap',
                                      width: '170px',
                                      borderBottom: 'none',
                                      p: '0 16px'
                                    } }
                                  >
                                    <Typography className="label-info">
                                      { t('officeAddress') } { validAddressOfficeCount }:
                                    </Typography>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    sx={ {
                                      whiteSpace: 'pre-line',
                                      borderBottom: 'none',
                                      p: 0
                                    } }
                                  >
                                    <Typography sx={ { lineHeight: '20px !important' } } className="result-letters">
                                      { address.address.detail && `${ address.address.detail }, ` }
                                      { address.address.ward &&
                                        address.address.ward.ward_name &&
                                        `${ address.address.ward.ward_name }, ` }
                                      { address.address.district &&
                                        address.address.district.district_name &&
                                        `${ address.address.district.district_name }, ` }
                                      { address.address.province &&
                                        address.address.province.province_name &&
                                        `${ address.address.province.province_name }.` }
                                    </Typography>
                                  </StyledTableCell>
                                </TableRow>
                              </Table>
                            </TableContainer>
                          )
                        } else {
                          return null
                        }
                      }) }
                    </>
                  ) }
                </>
              ) : null }
              {/*----------------------Factory Address----------------------*/ }
              { customerDetail.address_factories && customerDetail.address_factories.length > 0 ? (
                <>
                  <Box sx={ { display: 'flex', alignItems: 'center' } }>
                    <Typography className="label-info" sx={ { color: colors.indigoColor } }>
                      { t('factoryAddress') }
                    </Typography>
                    { !isShowFactoryAddress ? (
                      <HiChevronDown
                        onClick={ () => handleClickToggle(commons.FACTORY_ADDRESS) }
                        style={ {
                          cursor: 'pointer',
                          fontSize: '24px',
                          color: colors.lightGreyColor
                        } }
                      />
                    ) : (
                      <HiChevronUp
                        onClick={ () => handleClickToggle(commons.FACTORY_ADDRESS) }
                        style={ {
                          cursor: 'pointer',
                          fontSize: '24px',
                          color: colors.lightGreyColor
                        } }
                      />
                    ) }
                  </Box>
                  { isShowFactoryAddress &&
                    customerDetail.address_factories.map((address, index) => {
                      if (
                        address.address.detail ||
                        address.address.ward ||
                        address.address.district ||
                        address.address.province
                      ) {
                        validAddressFactoryCount++
                        return (
                          <TableContainer>
                            <Table sx={ { border: 'none' } }>
                              <TableRow sx={ { verticalAlign: 'baseline' } }>
                                <StyledTableCell
                                  component="th"
                                  sx={ {
                                    whiteSpace: 'nowrap',
                                    width: '170px',
                                    borderBottom: 'none',
                                    p: '0 16px'
                                  } }
                                >
                                  <Typography className="label-info" key={ index }>
                                    { t('factoryAddress') } { validAddressFactoryCount }:
                                  </Typography>
                                </StyledTableCell>
                                <StyledTableCell
                                  sx={ {
                                    whiteSpace: 'pre-line',
                                    borderBottom: 'none',
                                    p: 0
                                  } }
                                >
                                  <Typography sx={ { lineHeight: '20px !important' } } className="result-letters">
                                    { address.address.detail && `${ address.address.detail }, ` }
                                    { address.address.ward &&
                                      address.address.ward.ward_name &&
                                      `${ address.address.ward.ward_name }, ` }
                                    { address.address.district &&
                                      address.address.district.district_name &&
                                      `${ address.address.district.district_name }, ` }
                                    { address.address.province &&
                                      address.address.province.province_name &&
                                      `${ address.address.province.province_name }.` }
                                  </Typography>
                                </StyledTableCell>
                              </TableRow>
                            </Table>
                          </TableContainer>
                        )
                      } else {
                        return null
                      }
                    }) }
                </>
              ) : null }
            </Box>
            <Box flex={ 1 }>
              <Typography variant="h6" className="frontpager">
                { t('revenue') }
              </Typography>
              { customerDetail.total_revenue != 0 ? (
                <RevenueChart dataRevenue={ customerDetail.customer_revenue }/>
              ) : (
                <span>{ t('customerHasNoRevenueYet') }</span>
              ) }
            </Box>
          </Box>
        </Box>
        <Box
          component="form"
          sx={ {
            bgcolor: colors.lilywhiteColor,
            p: 2,
            mt: 2,
            borderRadius: '6px',
            position: 'relative',
            flexGrow: 1
          } }
        >
          <Box sx={ { display: 'flex', alignItems: 'center', mb: '12px' } }>
            <Typography variant="h6" className="frontpager">
              { t('history') }
            </Typography>
          </Box>
          <TabContext value={ valueTabs }>
            <Box
              sx={ {
                width: '100%',
                borderBottom: 1,
                borderColor: 'divider'
              } }
            >
              <TabList
                onChange={ handleChangeTabs }
                sx={ {
                  display: 'flex',
                  justifyContent: 'center',
                  minHeight: '30px !important'
                } }
              >
                <Tab className="button-tabs" label={ t('transaction') } value="1"/>
                <Tab className="button-tabs" label={ t('priceAdjustment') } value="2"/>
                <Tab className="button-tabs" label={ t('claim') } value="3"/>
                <Tab className="button-tabs" label={ t('proposeDebtAge') } value="4"/>
              </TabList>
            </Box>
            {/*-------------------------------------TAB-PANEL-1--------------------------------------*/ }
            <TabPanel sx={ { padding: '0' } } value="1">
              <Box
                sx={ {
                  mt: '26px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                } }
              >
                <Box sx={ { display: 'flex', alignItems: 'center' } }>
                  <Typography
                    variant="overline"
                    sx={ {
                      ml: '10px',
                      fontWeight: 400,
                      marginRight: '10px',
                      textTransform: 'none'
                    } }
                  >
                    { t('amountMoney') }
                  </Typography>
                  <SearchBar
                    searchValue={ amount }
                    handleOnChangeValue={ (e) => setAmount(e.target.value) }
                    handleSearch={ handleFindClick }
                    handleClearSearch={ handleClear }
                    placeholderText="import"
                    buttonText="find"
                    textFieldProps={ {
                      startAdornment: (
                        <InputAdornment position="start">
                          <Select
                            value={ comparison }
                            displayEmpty
                            inputProps={ { 'aria-label': 'Without label' } }
                            sx={ {
                              height: '30px',
                              width: '60px',
                              display: 'flex',
                              alignItems: 'baseline',
                              justifyContent: 'center',
                              '& .MuiSelect-select': {
                                padding: 0,
                                paddingLeft: '8px'
                              },
                              '& .MuiOutlinedInput-notchedOutline': {
                                borderTop: 'none',
                                borderLeft: 'none',
                                borderBottom: 'none',
                                borderRight: '1px solid rgba(0, 0, 0, 0.23)'
                              },
                              '&.MuiOutlinedInput-root': {
                                borderRadius: 0
                              }
                            } }
                            onChange={ handleChange }
                          >
                            <MenuItem value={ '>' }>
                              <TbMathEqualGreater/>
                            </MenuItem>
                            <MenuItem value={ '<' }>
                              <TbMathEqualLower/>
                            </MenuItem>
                          </Select>
                        </InputAdornment>
                      )
                    } }
                  />
                </Box>
                <Box sx={ { display: 'flex' } }>
                  <Autocomplete
                    popupIcon={ <PolygonIcon/> }
                    size="small"
                    className="autocomplete-container"
                    options={ getListAllStatusOrderByCustomer }
                    value={ getListAllStatusOrderByCustomer.find((option) => option.id === statusOrderId) || null }
                    onChange={ (event, value) => setStatusOrderId(value ? value.id : '') }
                    getOptionLabel={ (option) => option.order_status_name }
                    renderInput={ (params) => <TextField { ...params } placeholder={ t('status') }
                                                         variant="outlined"/> }
                    ListboxProps={ { sx: { maxHeight: 220, fontSize: '12px' } } }
                    classes={ { inputRoot: 'custom-input-search' } }
                  />
                  <CustomDateRangePicker
                    dataCustomerDetail={ customerDetail }
                    onChange={ handleDateRangeChange }
                    noDisplayLabel={ true }
                  />
                </Box>
              </Box>
              <Box component="form" sx={ { mt: 2 } }>
                <CustomerListTransactionTable
                  titleTable={ titleTableDetailCustomer }
                  data={ listOrderByCustomer }
                  loading={ loadingListOrderByCustomer }
                  sortDataAzCode={ sortDataAzCode }
                  sortDataZaCode={ sortDataZaCode }
                  sortDataAzTotalCost={ sortDataAzTotalCost }
                  sortDataZaTotalCost={ sortDataZaTotalCost }
                  sortDataAzCreateAt={ sortDataAzCreateAt }
                  sortDataZaCreateAt={ sortDataZaCreateAt }
                  getListOrderByCustomer={ getListOrderByCustomer }
                  checkPermissionUpdateOrder={ checkPermissionUpdateOrder }
                  checkPermissionViewOrder={ checkPermissionViewOrder }
                  checkPermissionDeleteOrder={ checkPermissionDeleteOrder }
                  handleOpenUpdateOrderModal={ handleOpenUpdateOrderModal }
                  handlerDelete={ deleteOder }
                  successMessage={ deleteSuccessMessage }
                  totalPages={ listOrderByCustomerTotalPages }
                  handlePageChange={ handlePageChangeListOrderByCustomer }
                  currentPagePagination={ currentPageCustomerListTransaction }
                />
                <CreateOrder
                  data={ customerListAll }
                  branchData={ listAllBranchByCustomerId }
                  dataProvince={ provinceData }
                  dataDistrict={ districtDataTemp }
                  dataWard={ wardDataTemp }
                  nameTitle={ t('editOrder') }
                  open={ isOpenModalOderUpdate }
                  handleClose={ handleCloseUpdateOrderModal }
                  handleOpenPreview={ handleOpenPreviewModal }
                  onPreviewDataChange={ handlePreviewDataChange }
                  onOrderDataChange={ handleOrderDataChange }
                  productData={ productData }
                  deliveryShiftData={ deliveryShiftData }
                  paymentData={ paymentData }
                  finishedProductFormData={ finishedProductFormData }
                  tagData={ tagData }
                  productFormData={ productFormData }
                  onChangeProvince={ handleChangeProvinceFormCreateUser }
                  onChangeDistrict={ handleChangeDistrictFormCreateUser }
                  errorCreateOderPreviewErrorMessage={ updateOderPreviewErrorMessage }
                  removeMessageError={ removeMessageError }
                  updateOderSuccessFlag={ updateOderSuccessFlag }
                  updateOderPreviewSuccessFlag={ updateOderPreviewSuccessFlag }
                  orderDetail={ orderDetail }
                  isEdit={ true }
                />
              </Box>
            </TabPanel>
            {/*-------------------------------------TAB-PANEL-2--------------------------------------*/ }
            <TabPanel sx={ { padding: '0' } } value="2">
              <Box
                sx={ {
                  mt: 4,
                  height: '30px',
                  display: 'flex',
                  justifyContent: 'flex-end'
                } }
              >
                <DateRangePickerComponent
                  dataCustomerDetail={ customerDetail }
                  onChange={ handleDateRangeChangeQuotation }
                  className="date-range-picker"
                  noDisplayLabel={ true }
                />
              </Box>
              <Box
                component="form"
                sx={ {
                  bgcolor: colors.lilywhiteColor,
                  borderRadius: '10px',
                  position: 'relative',
                  mt: 2
                } }
              >
                <QuotationHistoriesTable
                  successFlag={ deleteQuotationHistorySuccessMessage }
                  data={ listQuotationHistories }
                  loading={ loading }
                  handleDetailQuotationModal={ handleDetailQuotationModal }
                  handelEditQuotation={ handleUpdateQuotationModal }
                  handleDelete={ handleDeleteQuotationHistory }
                  checkPermissionUpdate={ checkPermissionUpdate }
                  currentPagePagination={ currentPageQuotationHistories }
                  handlePageChange={ handlePageChangeListQuotationHistories }
                  totalPages={ quotationHistoriesListTotalPages }
                />
                <QuotationModal
                  open={ isOpenUpdateQuotesModal }
                  nameTitle={ t('editQuote') }
                  quotationData={ quotationData }
                  handleCreatePreviewQuote={ updateQuotationPreviewCustomer }
                  errorsMessage={ errorUpdateQuotationPreviewMessage }
                  dataCustomer={ customerDetail }
                  handleClose={ handleCloseUpdateQuoteModal }
                  createQuotationSuccessFlag={ createQuotationSuccessFlag }
                  removeMessageError={ removeMessageError }
                  getProfile={ getProfile }
                  dataDetail={ detailQuotationHistory }
                  isEdit={ true }
                  databack={ editedDataUpdatePDF }
                />
                <PDFPreviewModal
                  open={ isOpenUpdateModalQuotationPreview }
                  data={ customerDetail }
                  dataProduct={ editedDataUpdatePDF }
                  getProfile={ getProfile }
                  handleClose={ handleCloseUpdateQuotationPreviewModal }
                  createQuotationPreviewSuccessFlag={ updateQuotationPreviewSuccessFlag }
                  isEdit={ true }
                />
                <QuotationDetailModal
                  open={ isOpenDetailQuotation }
                  data={ detailQuotationHistory }
                  nameTitle={ t('detailProposalQuotation') }
                  handleCloseModal={ handleCloseDetailQuotationModal }
                  isEdit={ true }
                />
              </Box>
            </TabPanel>
            {/*-------------------------------------TAB-PANEL-3--------------------------------------*/ }
            <TabPanel sx={ { padding: '0' } } value="3">
              <Box
                sx={ {
                  mt: 4,
                  height: '30px',
                  display: 'flex',
                  justifyContent: 'flex-end'
                } }
              >
                <Autocomplete
                  popupIcon={ <PolygonIcon/> }
                  size="small"
                  className="autocomplete-container"
                  options={ listAllClaimStatus }
                  value={ listAllClaimStatus.find((option) => option.id === claimStatusId) || null }
                  onChange={ (event, value) => onChangeStatus(value ? value.id : '') }
                  getOptionLabel={ (option) => option.claim_status_name }
                  renderInput={ (params) => (
                    <TextField { ...params } placeholder={ t('status') } className="text-field-input"
                               variant="outlined"/>
                  ) }
                  classes={ { inputRoot: 'custom-input-search' } }
                  ListboxProps={ {
                    sx: {
                      fontSize: '12px'
                    }
                  } }
                />
                <CustomDateRangePicker
                  className="date-range-picker"
                  dataCustomerDetail={ customerDetail }
                  onChange={ handleDateRangeChangeHistoryClaim }
                  noDisplayLabel={ true }
                />
              </Box>
              <Box
                component="form"
                sx={ {
                  bgcolor: colors.lilywhiteColor,
                  borderRadius: '10px',
                  position: 'relative',
                  mt: 2
                } }
              >
                <ClaimHistoriesTable
                  successFlag={ deleteClaimSuccessMessage }
                  data={ listClaimHistories }
                  loading={ loading }
                  handleGetDataClaim={ handleGetDataClaim }
                  handleDelete={ handleDeleteClaim }
                  handleViewDetailClaim={ handleViewDetailClaim }
                  checkPermissionUpdate={ checkPermissionUpdate }
                  currentPagePagination={ currentPageClaimHistories }
                  handlePageChange={ handlePageChangeHistoryClaim }
                  totalPages={ claimHistoriesListTotalPages }
                />
                <ClaimModal
                  isEdit={ true }
                  dataClaim={ getClaimDetails }
                  dataClaimProblem={ listAllClaimProblem }
                  nameTitle={ t('editClaim') }
                  successFlag={ updateClaimSuccessFlag }
                  open={ isOpenClaimModal }
                  handleSubmitAction={ updateClaim }
                  dataCustomer={ listAllCustomer }
                  customerId={ customerId }
                  handleCloseModal={ handleCloseClaimModal }
                />
                <ClaimModal
                  isView={ true }
                  dataClaim={ getClaimDetails }
                  dataClaimProblem={ listAllClaimProblem }
                  nameTitle={ t('viewDetailClaim') }
                  open={ isOpenClaimViewModal }
                  customerId={ customerId }
                  handleCloseModal={ handleCloseClaimModal }
                />
              </Box>
            </TabPanel>
            {/*-------------------------------------TAB-PANEL-4--------------------------------------*/ }
            <TabPanel sx={ { padding: '0' } } value="4">
              <Box sx={ { display: 'flex', mt: '26px', justifyContent: 'flex-end' } }>
                <Autocomplete
                  popupIcon={ <PolygonIcon/> }
                  size="small"
                  sx={ { marginLeft: 0 } }
                  className="autocomplete-container"
                  options={ listAllProposalStatus }
                  value={ listAllProposalStatus.find((option) => option.id === statusId) || null }
                  onChange={ (event, value) => setStatusId(value ? value.id : '') }
                  getOptionLabel={ (option) => option.proposal_status_name }
                  renderInput={ (params) => <TextField { ...params } placeholder={ t('status') } variant="outlined"/> }
                  ListboxProps={ { sx: { maxHeight: 220, fontSize: '12px' } } }
                  classes={ { inputRoot: 'custom-input-search' } }
                />
                <CustomDateRangePicker
                  dataCustomerDetail={ customerDetail }
                  onChange={ handleDateRangeChangeListProposalDebtAge }
                  noDisplayLabel={ true }
                />
              </Box>
              <Box
                component="form"
                sx={ {
                  bgcolor: colors.lilywhiteColor,
                  borderRadius: '10px',
                  position: 'relative',
                  mt: 2
                } }
              >
                <ProposalDebtAgeTable
                  data={ listProposalDebtAgeByCustomerId }
                  successFlag={ deleteProposalDebtAgeSuccessMessage }
                  handleDetailProposalDebtAge={ handleDetailProposedDebtAgeModal }
                  handleDeleteProposalDebtAge={ deleteProposalDebtAge }
                  handleUpdateProposedDebtAge={ handleUpdateProposedDebtAge }
                  loading={ loading }
                  checkPermissionUpdate={ checkPermissionUpdate }
                  currentPagePagination={ currentPageProposalDebtAge }
                  handlePageChange={ handlePageChangeListProposalDebtAge }
                  totalPages={ proposalDebtAgeTotalPages }
                />
                <ProposedDebtAgeModal
                  isEdit={ true }
                  handleSubmitAction={ updateProposalDebtAge }
                  customerId={ customerId }
                  dataCustomerDetail={ customerDetail }
                  dataDetailProposalDebtAge={ listDetailProposalDebtAge }
                  open={ isOpenUpdateProposedDebtAgeModal }
                  handleCloseModal={ handleCloseProposedDebtAgeModal }
                  nameTitle={ t('updateProposalDebtAge') }
                  dataDebtAge={ listDebtAge }
                />
                <ProposedDebtAgeModal
                  isView={ true }
                  customerId={ customerId }
                  dataCustomerDetail={ customerDetail }
                  dataDetailProposalDebtAge={ listDetailProposalDebtAge }
                  open={ isOpenDetailProposedDebtAgeModal }
                  handleCloseModal={ handleCloseProposedDebtAgeModal }
                  nameTitle={ t('detailDebtAge') }
                  dataDebtAge={ listDebtAge }
                />
              </Box>
            </TabPanel>
          </TabContext>
        </Box>
      </Box>
    </>
  )
}

export default CustomerDetail
