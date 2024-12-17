import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import SearchFormCustomer from '../../../components/SearchForm/Customer'
import ListCustomerTable from '../../../components/Table/CustomerTable/ListCustomer/ListCustomer'
import colors from '../../../constants/colors'
import headerCsvFileExportCustomer from '../../../constants/headerCsvFileExportCustomer'
import status from '../../../constants/status'
import titleTableCustomer from '../../../constants/titleTableCustomer'
import {
  clearDataDistrictAndWardAction,
  getListDistrictByProvinceIdAction,
  getListDistrictFactoryByProvinceIdAction,
  getListWardByDistrictIdAction,
  getListWardFactoryByDistrictIdAction,
  setGetListDistrictFactoryFlagAction,
  setGetListDistrictFlagAction,
  setGetListDistrictOfficeFlagAction,
  setGetListWardFactoryFlagAction,
  setGetListWardFlagAction,
  setGetListWardOfficeFlagAction
} from '../../../redux/app/app.actions'
import {
  createClaimAction,
  createCustomerAction,
  createCustomerPreviewAction,
  deleteDataCustomerAction,
  exportExcelDataCustomer,
  getAllClaimProblemAction,
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
  getCustomerInformationAction,
  getCustomerListAction,
  getListAllCustomerAction,
  removeMessageErrorAction,
  updateCustomerAction,
  updateStatusDataExportFlagAction
} from '../../../redux/customer/customer.actions'
import {
  createClaimSuccessFlagState,
  createCustomerSuccessFlagState,
  createCustomerSuccessMessageState,
  currentPageState,
  customerFactoryAddressState,
  customerListState,
  customerOfficeAddressState,
  customertotalPagesState,
  deleteCustomerSuccessFlagState,
  errorCreateCustomerMessageState,
  errorsMessageUpdateCustomerState,
  getCustomerDetailsState,
  getDataCustomerExportState,
  getDataExportFlagState,
  listAllClaimProblemState,
  listAllCompanyTypeState,
  listAllConsultationHistoryProblemState,
  listAllCustomerRankState,
  listAllCustomerState,
  listAllFactoryScaleState,
  listAllFrequencyCompanyVisitState,
  listAllIncentivePolicyState,
  listAllIndustryGroupState,
  listAllOrderPlanState,
  listAllPersonnelScaleState,
  listAllProductApplicationState,
  listAllProductSubstitutabilityState,
  listAllQuanlityRequireState,
  SalesInChargeListState,
  updateCustomerSuccessFlagState
} from '../../../redux/customer/customer.selectors'

import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import { AiOutlineFileExclamation } from 'react-icons/ai'
import { RiUserAddLine } from 'react-icons/ri'
import DownloadExcel from '../../../components/Buttons/DownloadExcel'
import AdditionalCustomerInfoModal from '../../../components/Modal/Customer/AdditionalCustomerInfo'
import ClaimModal from '../../../components/Modal/Customer/Claim/index'
import CustomerModal from '../../../components/Modal/Customer/index'
import UpdateCustomerModal from '../../../components/Modal/Customer/Update'
import commons from '../../../constants/common'
import {
  appDistrictFactoryListTempState,
  appDistrictListFactoryTempState,
  appDistrictListState,
  appDistrictListTempState,
  appDistrictOfficeListTempState,
  appProvinceListState,
  appWardFactoryListTempState,
  appWardListFactoryTempState,
  appWardListState,
  appWardListTempState,
  appWardOfficeListTempState,
  debtAgeListState,
  debtGroupListState,
  listAllDeliveryShiftState,
  listAllPaymentState,
  listAllTagState
} from '../../../redux/app/app.selectors'
import { setCurrentPage } from '../../../redux/customer/customer.slice'
import { isCanShowAllCustomers, useRoleCheck } from '../../../utils'
import HeaderPage from 'components/HeaderPage'
import { checkAttributeValue } from '../../../common/common'
import { permissionActions } from '../../../constants/titlePermissions'
import OrderModal from "../../../components/Modal/Order/Create/CreateOrder";

function CustomerInformationPage() {
  const { t } = useTranslation()
  const { isSuperAdmin, userInfo } = useRoleCheck()
  const permissionsData = useMemo(
    () => ( Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : [] ),
    [ userInfo ]
  )
  const userRole = useMemo(() => userInfo.role?.type?.name ?? '', [ userInfo ])
  const provinceData = useSelector(appProvinceListState)
  const districtData = useSelector(appDistrictListState)
  const wardData = useSelector(appWardListState)
  const listCustomer = useSelector(customerListState)
  const createCustomerSuccessFlag = useSelector(createCustomerSuccessFlagState)
  const errorsMessageUpdateCustomer = useSelector(errorsMessageUpdateCustomerState)
  const updateCustomerSuccessFlag = useSelector(updateCustomerSuccessFlagState)
  const listDebtGroup = useSelector(debtGroupListState)
  const listSalesInCharge = useSelector(SalesInChargeListState)
  const listDebtAge = useSelector(debtAgeListState)
  const districtDataTemp = useSelector(appDistrictListTempState)
  const wardDataTemp = useSelector(appWardListTempState)
  const totalPages = useSelector(customertotalPagesState)
  const [ searchParams, setSearchParams ] = useState(null)
  const deleteCustomerSuccessFlag = useSelector(deleteCustomerSuccessFlagState)
  const dataCustomerExport = useSelector(getDataCustomerExportState)
  const getDataExportFlag = useSelector(getDataExportFlagState)
  const customerDetail = useSelector(getCustomerDetailsState)
  const customerOfficeAddressDetail = useSelector(customerOfficeAddressState)
  const customerFactoryAddressDetail = useSelector(customerFactoryAddressState)
  const listAllCustomer = useSelector(listAllCustomerState)
  const createClaimSuccessFlag = useSelector(createClaimSuccessFlagState)
  const currentPage = useSelector(currentPageState)
  const paymentData = useSelector(listAllPaymentState)
  const deliveryShiftData = useSelector(listAllDeliveryShiftState)
  const tagData = useSelector(listAllTagState)
  const [ isOpenModalUpdate, setIsOpenModalUpdate ] = useState(false)
  const [ isOpenModalOderCreate, setIsOpenModalCreateOder ] = useState(false)
  const [ isSortedAZTotalRevenue, setIsSortedAZTotalRevenue ] = useState(false)
  const [ isSortedZATotalRevenue, setIsSortedZATotalRevenue ] = useState(false)
  const [ isSortedAZMonthRevenue, setIsSortedAZMonthRevenue ] = useState(false)
  const [ isSortedZAMonthRevenue, setIsSortedZAMonthRevenue ] = useState(false)
  const [ isOpenClaimModal, setIsOpenClaimModal ] = useState(false)
  const [ fileName, setFileName ] = useState('')
  const [ customerIdCreate, setCustomerIdCreate ] = useState('')
  const errorCreateCustomerMessage = useSelector(errorCreateCustomerMessageState)
  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState(false)
  const [ currentPagePagination, setCurrentPagePagination ] = useState(1)
  const listAllClaimProblem = useSelector(listAllClaimProblemState)
  const [ isOpenAdditionalCustomerInfoModal, setIsOpenAdditionalCustomerInfoModal ] = useState(false)
  const [ createCustomers, setCreateCustomers ] = useState('')
  const [ isOpenCreateCustomerModal, setIsOpenCreateCustomerModal ] = useState(false)
  const listAllPersonnelScale = useSelector(listAllPersonnelScaleState)
  const listAllFactoryScale = useSelector(listAllFactoryScaleState)
  const listAllCompanyType = useSelector(listAllCompanyTypeState)
  const listAllIndustryGroup = useSelector(listAllIndustryGroupState)
  const listAllCustomerRank = useSelector(listAllCustomerRankState)
  const listAllProductSubstitutability = useSelector(listAllProductSubstitutabilityState)
  const listAllOrderPlan = useSelector(listAllOrderPlanState)
  const listAllQuanlityRequire = useSelector(listAllQuanlityRequireState)
  const listAllProductApplication = useSelector(listAllProductApplicationState)
  const listAllFrequencyCompanyVisit = useSelector(listAllFrequencyCompanyVisitState)
  const listAllIncentivePolicy = useSelector(listAllIncentivePolicyState)
  const listAllConsultationHistoryProblem = useSelector(listAllConsultationHistoryProblemState)
  const createCustomerSuccessMessage = useSelector(createCustomerSuccessMessageState)
  const [ selectedListAllCustomerOption, setSelectedListAllCustomerOption ] = useState(null)
  const districtDataFactoryTemp = useSelector(appDistrictListFactoryTempState)
  const wardDataFactoryTemp = useSelector(appWardListFactoryTempState)
  const dataDistrictOffice = useSelector(appDistrictOfficeListTempState)
  const dataWardOffice = useSelector(appWardOfficeListTempState)
  const dataDistrictFactory = useSelector(appDistrictFactoryListTempState)
  const dataWardFactory = useSelector(appWardFactoryListTempState)
  const [ formValues, setFormValues ] = useState(null);

  useEffect(() => {
    setSelectedListAllCustomerOption(
      isSuperAdmin
        ? commons.TYPE_DISPLAY_ALL_CUSTOMER
        : isCanShowAllCustomers(userRole)
          ? commons.TYPE_DISPLAY_ALL_CUSTOMER
          : 'sale'
    )
  }, [ isSuperAdmin, userRole ])

  useEffect(() => {
    if (createCustomerSuccessMessage) {
      removeMessageError()
      if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
        dispatch(
          getCustomerListAction({
            type: commons.TYPE_DISPLAY_ALL_CUSTOMER
          })
        )
      } else {
        dispatch(getCustomerListAction())
      }
      setCreateCustomers('')
      setIsOpenCreateCustomerModal(false)
      setIsOpenAdditionalCustomerInfoModal(false)
    }
    dispatch(getListAllCustomerAction())
    dispatch(getAllIndustryGroupAction())
    dispatch(getAllCustomerRankAction())
    dispatch(getAllCompanyTypeAction())
    dispatch(getAllProductApplicationAction())
  }, [ createCustomerSuccessMessage ])

  useEffect(() => {
    if (updateCustomerSuccessFlag) {
      removeMessageError()
      onClear()
      if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
        dispatch(
          getCustomerListAction({
            type: commons.TYPE_DISPLAY_ALL_CUSTOMER
          })
        )
      } else {
        dispatch(getCustomerListAction())
      }
    }
  }, [ updateCustomerSuccessFlag ])

  useEffect(() => {
    if (createCustomerSuccessFlag) {
      removeMessageError()
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
      setIsOpenCreateCustomerModal(false)
      setIsOpenAdditionalCustomerInfoModal(true)
    }
  }, [ createCustomerSuccessFlag ])

  const removeMessageError = useCallback(() => {
    dispatch(removeMessageErrorAction())
  }, [])

  useEffect(() => {
    if (updateCustomerSuccessFlag) {
      dispatch(getListAllCustomerAction())
      setIsOpenModalUpdate(false)
    }
  }, [ updateCustomerSuccessFlag ])

  useEffect(() => {
    if (createClaimSuccessFlag) {
      setIsOpenClaimModal(false)
    }
  }, [ createClaimSuccessFlag ])

  useEffect(() => {
    if (deleteCustomerSuccessFlag) {
      let page = currentPage
      if (currentPage >= totalPages) {
        page = totalPages
        setCurrentPage(page)
      }
      if (searchParams) {
        if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
          dispatch(getCustomerListAction({ ...searchParams, page: page, type: commons.TYPE_DISPLAY_ALL_CUSTOMER }))
        } else {
          dispatch(getCustomerListAction({ ...searchParams, page: page }))
        }
      } else {
        if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
          dispatch(getCustomerListAction({ page: page, type: commons.TYPE_DISPLAY_ALL_CUSTOMER }))
        } else {
          dispatch(getCustomerListAction({ page: page }))
        }
      }
      dispatch(getListAllCustomerAction())
    }
  }, [ deleteCustomerSuccessFlag ])

  const getListCustomer = () => {
    setIsSortedAZTotalRevenue(false)
    setIsSortedZATotalRevenue(false)
    setIsSortedAZMonthRevenue(false)
    setIsSortedZAMonthRevenue(false)
    if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
      dispatch(getCustomerListAction({ ...searchParams, type: commons.TYPE_DISPLAY_ALL_CUSTOMER }))
    } else {
      dispatch(getCustomerListAction({ ...searchParams }))
    }
    setCurrentPagePagination(1)
  }

  const handleOpenClaimModal = () => {
    setIsOpenClaimModal(true)
    dispatch(getAllClaimProblemAction())
  }

  const handleOpenCreateCustomerModal = () => {
    setIsOpenCreateCustomerModal(true)
  }

  const handleCloseCreateCustomerModal = () => {
    setIsOpenCreateCustomerModal(false)
    setIsOpenAdditionalCustomerInfoModal(false)
    setCreateCustomers()
  }

  const handleCloseClaimModal = () => {
    setIsOpenClaimModal(false)
  }

  const sortDataAzTotalRevenue = () => {
    if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
      dispatch(
        getCustomerListAction({ ...searchParams, sort_by: 'total_revenue_az', type: commons.TYPE_DISPLAY_ALL_CUSTOMER })
      )
    } else {
      dispatch(getCustomerListAction({ ...searchParams, sort_by: 'total_revenue_az' }))
    }
    setCurrentPagePagination(1)
    setIsSortedAZTotalRevenue(true)
    setIsSortedZATotalRevenue(false)
    setIsSortedAZMonthRevenue(false)
    setIsSortedZAMonthRevenue(false)
  }

  const sortDataZaTotalRevenue = () => {
    if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
      dispatch(
        getCustomerListAction({ ...searchParams, sort_by: 'total_revenue_za', type: commons.TYPE_DISPLAY_ALL_CUSTOMER })
      )
    } else {
      dispatch(getCustomerListAction({ ...searchParams, sort_by: 'total_revenue_za' }))
    }
    setCurrentPagePagination(1)
    setIsSortedZATotalRevenue(true)
    setIsSortedAZTotalRevenue(false)
    setIsSortedAZMonthRevenue(false)
    setIsSortedZAMonthRevenue(false)
  }

  const sortDataAzMonthRevenue = () => {
    if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
      dispatch(
        getCustomerListAction({ ...searchParams, sort_by: 'month_revenue_az', type: commons.TYPE_DISPLAY_ALL_CUSTOMER })
      )
      setCurrentPagePagination(1)
    } else {
      dispatch(getCustomerListAction({ ...searchParams, sort_by: 'month_revenue_az' }))
      setCurrentPagePagination(1)
    }
    setIsSortedAZMonthRevenue(true)
    setIsSortedAZTotalRevenue(false)
    setIsSortedZATotalRevenue(false)
    setIsSortedZAMonthRevenue(false)
  }

  const sortDataZaMonthRevenue = () => {
    if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
      dispatch(
        getCustomerListAction({ ...searchParams, sort_by: 'month_revenue_za', type: commons.TYPE_DISPLAY_ALL_CUSTOMER })
      )
    } else {
      dispatch(getCustomerListAction({ ...searchParams, sort_by: 'month_revenue_za' }))
    }
    setCurrentPagePagination(1)
    setIsSortedZAMonthRevenue(true)
    setIsSortedAZTotalRevenue(false)
    setIsSortedZATotalRevenue(false)
    setIsSortedAZMonthRevenue(false)
  }

  const handlePageChange = (event, page) => {
    setLoading(true)
    setCurrentPagePagination(page)
    const params = {
      ...searchParams,
      page,
      type:
        selectedListAllCustomerOption === commons.TYPE_DISPLAY_ALL_CUSTOMER
          ? commons.TYPE_DISPLAY_ALL_CUSTOMER
          : undefined
    }

    if (isSortedAZTotalRevenue) {
      params.sort_by = 'total_revenue_az'
    } else if (isSortedZATotalRevenue) {
      params.sort_by = 'total_revenue_za'
    } else if (isSortedZAMonthRevenue) {
      params.sort_by = 'month_revenue_za'
    } else if (isSortedAZMonthRevenue) {
      params.sort_by = 'month_revenue_az'
    }

    dispatch(getCustomerListAction(params)).then(() => setLoading(false))
  }

  const handleSearch = (params) => {
    if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
      params.type = commons.TYPE_DISPLAY_ALL_CUSTOMER
    }
    setLoading(true)
    setCurrentPagePagination(1)
    setSearchParams(params)
    localStorage.setItem('customerSearch', JSON.stringify(params))
    dispatch(getCustomerListAction(params)).then(() => {
      setLoading(false)
    })
  }

  const handleChangeProvince = useCallback((value) => {
    dispatch(getListDistrictByProvinceIdAction(value))
  }, [])

  const handleChangeDistrict = useCallback((value) => {
    dispatch(getListWardByDistrictIdAction(value))
  }, [])

  const onClear = useCallback(() => {
    dispatch(clearDataDistrictAndWardAction())
    setSearchParams(null)
    setLoading(true)
    if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
      dispatch(getCustomerListAction({ type: commons.TYPE_DISPLAY_ALL_CUSTOMER })).then(() => setLoading(false))
    } else {
      dispatch(getCustomerListAction()).then(() => setLoading(false))
    }
  }, [ selectedListAllCustomerOption ])

  const handleChangeProvinceFactoryFormCreateUser = useCallback((value) => {
    dispatch(setGetListDistrictFlagAction(true))
    dispatch(getListDistrictFactoryByProvinceIdAction(value))
  }, [])

  const handleChangeDistrictFactoryFormCreateUser = useCallback((value) => {
    dispatch(setGetListWardFlagAction(true))
    dispatch(getListWardFactoryByDistrictIdAction(value))
  }, [])

  const handleChangeProvinceFormCreateUser = useCallback((value) => {
    dispatch(setGetListDistrictFlagAction(true))
    dispatch(getListDistrictByProvinceIdAction(value))
  }, [])

  const handleChangeDistrictFormCreateUser = useCallback((value) => {
    dispatch(setGetListWardFlagAction(true))
    dispatch(getListWardByDistrictIdAction(value))
  }, [])

  const handleGetDetail = useCallback((customerId) => {
    dispatch(getCustomerInformationAction({ id: customerId, from_date: '', to_date: '' }))
    setIsOpenModalUpdate(true)
  }, [])

  const handleCreateOder = useCallback((params) => {
    setCustomerIdCreate(params)
    setIsOpenModalCreateOder(true)
  }, [])

  const createCustomer = useCallback((value) => {
    dispatch(createCustomerPreviewAction(value))
    setCreateCustomers(value)
  }, [])

  const handleCreateCustomer = useCallback((value) => {
    dispatch(createCustomerAction(value))
  }, [])

  const updateCustomer = useCallback((params) => {
    dispatch(updateCustomerAction(params))
  }, [])

  const deleteCustomer = useCallback((params) => {
    dispatch(deleteDataCustomerAction(params))
  }, [])

  const handleCloseUpdateModal = useCallback(() => {
    setIsOpenModalUpdate(false)
  }, [])

  const handleCloseCreateOderModal = useCallback(() => {
    setFormValues(null)
    setIsOpenModalCreateOder(false)
  }, [])

  const handleCreateClaim = useCallback((params) => {
    dispatch(createClaimAction(params))
  }, [])

  const handleExportExcel = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = ( '0' + ( currentDate.getMonth() + 1 ) ).slice(-2)
    const currentDay = ( '0' + currentDate.getDate() ).slice(-2)
    const currentHour = ( '0' + currentDate.getHours() ).slice(-2)
    const currentMinute = ( '0' + currentDate.getMinutes() ).slice(-2)
    const dateString = `${ currentYear }${ currentMonth }${ currentDay }${ currentHour }${ currentMinute }_`
    const fileName = `${ dateString }${ t('customerData') }`
    const fileNameWithExtension = `${ fileName }.xlsx`
    setFileName(fileNameWithExtension)
    if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
      dispatch(exportExcelDataCustomer({ ...searchParams, type: commons.TYPE_DISPLAY_ALL_CUSTOMER }))
    } else {
      dispatch(exportExcelDataCustomer({ ...searchParams }))
    }
  }

  const updateFlagCallBack = () => {
    dispatch(updateStatusDataExportFlagAction(searchParams))
  }

  useEffect(() => {
    const storedSearchParams = localStorage.getItem('customerSearch')
    if (storedSearchParams) {
      const parsedSearchParams = JSON.parse(storedSearchParams)
      setSearchParams(parsedSearchParams)
      setLoading(true)
      if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
        dispatch(getCustomerListAction({ parsedSearchParams, type: commons.TYPE_DISPLAY_ALL_CUSTOMER })).then(() => {
          setLoading(false)
        })
      } else {
        dispatch(getCustomerListAction(parsedSearchParams)).then(() => {
          setLoading(false)
        })
      }
    } else {
      if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
        dispatch(
          getCustomerListAction({
            type: commons.TYPE_DISPLAY_ALL_CUSTOMER
          })
        )
      } else {
        dispatch(getCustomerListAction())
      }
    }
  }, [])

  const handleCloseAdditionalCustomerInfoModal = () => {
    setIsOpenCreateCustomerModal(true)
    setIsOpenAdditionalCustomerInfoModal(false)
  }

  const handleChangeViewOption = (event) => {
    setSelectedListAllCustomerOption(event.target.value)
    if (event.target.value == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
      dispatch(getCustomerListAction({ ...searchParams, type: commons.TYPE_DISPLAY_ALL_CUSTOMER }))
    } else {
      dispatch(getCustomerListAction({ ...searchParams, type: '' }))
    }
  }

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

  useEffect(() => {
    const savedFormData = localStorage.getItem('formState');
    if (savedFormData) {
      setFormValues(JSON.parse(savedFormData));
      setIsOpenModalCreateOder(true)
    }
  }, []);

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column' } }>
      <HeaderPage
        title={ t('customerManagement') }
        actionButton={
          <>
            <Button sx={ { mr: 1, gap: '8px' } } onClick={ handleOpenClaimModal } className="modalButtonClick">
              <AiOutlineFileExclamation style={ { fontSize: '16px', marginBottom: '2px' } }/>
              { t('enterClaim') }
            </Button>
            <Button
              sx={ { gap: '8px' } }
              onClick={ handleOpenCreateCustomerModal }
              className={ `addButton ${ !isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.ADD_CUSTOMER) ? 'disabled-cursor' : '' }` }
              disabled={ !isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.ADD_CUSTOMER) }
            >
              <RiUserAddLine style={ { fontSize: '16px', marginBottom: '2px' } }/>
              { t('addCustomer') }
            </Button>
          </>
        }
      />
      <Box>
        <ClaimModal
          handleCloseModal={ handleCloseClaimModal }
          open={ isOpenClaimModal }
          dataCustomer={ listAllCustomer }
          dataClaimProblem={ listAllClaimProblem }
          nameTitle={ t('enterClaim') }
          statusList={ status.claim }
          handleSubmitAction={ handleCreateClaim }
          successFlag={ createClaimSuccessFlag }
          isCreate={ true }
        />
        { isOpenCreateCustomerModal && (
          <CustomerModal
            dataBack={ createCustomers }
            open={ isOpenCreateCustomerModal }
            nameTitle={ t('addCustomer') }
            dataProvince={ provinceData }
            dataDistrict={ districtDataTemp }
            dataDistrictFactory={ districtDataFactoryTemp }
            onChangeProvinceFactory={ handleChangeProvinceFactoryFormCreateUser }
            dataWardFactory={ wardDataFactoryTemp }
            onChangeDistrictFactory={ handleChangeDistrictFactoryFormCreateUser }
            dataWard={ wardDataTemp }
            dataDebtAge={ listDebtAge }
            dataSalesInCharge={ listSalesInCharge }
            onChangeProvince={ handleChangeProvinceFormCreateUser }
            onChangeDistrict={ handleChangeDistrictFormCreateUser }
            handleCreateCustomer={ createCustomer }
            createSuccessFlag={ createCustomerSuccessMessage }
            errorCreateCustomerMessage={ errorCreateCustomerMessage }
            removeMessageError={ removeMessageError }
            handleCloseModal={ handleCloseCreateCustomerModal }
          />
        ) }
        { isOpenAdditionalCustomerInfoModal && (
          <AdditionalCustomerInfoModal
            nameTitle={ t('customerDetails') }
            open={ isOpenAdditionalCustomerInfoModal }
            handleCloseModal={ handleCloseAdditionalCustomerInfoModal }
            listAllPersonnelScale={ listAllPersonnelScale }
            listAllFactoryScale={ listAllFactoryScale }
            listAllCompanyType={ listAllCompanyType }
            listAllIndustryGroup={ listAllIndustryGroup }
            listAllProductSubstitutability={ listAllProductSubstitutability }
            listAllOrderPlan={ listAllOrderPlan }
            listAllQuanlityRequire={ listAllQuanlityRequire }
            listAllProductApplication={ listAllProductApplication }
            listAllFrequencyCompanyVisit={ listAllFrequencyCompanyVisit }
            listAllIncentivePolicy={ listAllIncentivePolicy }
            listAllConsultationHistoryProblem={ listAllConsultationHistoryProblem }
            handleCreateCustomer={ handleCreateCustomer }
            createCustomers={ createCustomers }
            createCustomerSuccessMessage={ createCustomerSuccessMessage }
          />
        ) }
      </Box>
      { ( isSuperAdmin || checkAttributeValue(permissionsData, 'name', permissionActions.LIST_CUSTOMER) ) && (
        <Box p={ 2 }>
          <SearchFormCustomer
            dataProvince={ provinceData }
            dataDistrict={ districtData }
            dataWard={ wardData }
            dataDebtGroup={ listDebtGroup }
            dataDebtAge={ listDebtAge }
            onChangeProvince={ handleChangeProvince }
            onChangeDistrict={ handleChangeDistrict }
            onSubmit={ handleSearch }
            onClear={ onClear }
            flagResetForm={ createCustomerSuccessMessage }
            listAllIndustryGroup={ listAllIndustryGroup }
            listAllCustomerRank={ listAllCustomerRank }
            listAllCompanyType={ listAllCompanyType }
            listAllProductApplication={ listAllProductApplication }
          />
          <Box
            component="form"
            sx={ { bgcolor: colors.lilywhiteColor, borderRadius: '10px', p: 2, position: 'relative', mt: 2 } }
          >
            <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 } }>
              <Typography className="frontpager">
                { t('listOfCustomers') }
                <Box sx={ { flexGrow: 1 } }/>
                <TextField
                  size="small"
                  select
                  value={ selectedListAllCustomerOption }
                  onChange={ handleChangeViewOption }
                  variant="outlined"
                  style={ { width: '204px', backgroundColor: colors.lilywhiteColor } }
                >
                  <MenuItem value={ commons.TYPE_DISPLAY_ALL_CUSTOMER }>{ t('allCustomer') }</MenuItem>
                  { !( isSuperAdmin || isCanShowAllCustomers(userRole) ) && (
                    <MenuItem value="sale">{ t('customerInCharge') }</MenuItem>
                  ) }
                </TextField>
              </Typography>
              <DownloadExcel
                csvHeader={ headerCsvFileExportCustomer }
                data={ dataCustomerExport }
                actionGetData={ handleExportExcel }
                flagGetDetail={ getDataExportFlag }
                updateFlagCallBack={ updateFlagCallBack }
                filename={ fileName }
              />
            </Box>
            <Box>
              <ListCustomerTable
                successMessage={ deleteCustomerSuccessFlag }
                data={ listCustomer }
                sortDataAzTotalRevenue={ sortDataAzTotalRevenue }
                sortDataZaTotalRevenue={ sortDataZaTotalRevenue }
                sortDataAzMonthRevenue={ sortDataAzMonthRevenue }
                sortDataZaMonthRevenue={ sortDataZaMonthRevenue }
                titleTable={ titleTableCustomer }
                handleGetDetail={ handleGetDetail }
                handlerDelete={ deleteCustomer }
                handleCreateOder={ handleCreateOder }
                getListCustomer={ getListCustomer }
                permissionsData={ permissionsData }
                isSuperAdmin={ isSuperAdmin }
                totalPages={ totalPages }
                handlePageChange={ handlePageChange }
                currentPagePagination={ currentPagePagination }
                loading={ loading }
              />
            </Box>
            <OrderModal
              formValues={ formValues }
              idCustomer={ customerIdCreate }
              data={ listAllCustomer }
              dataProvince={ provinceData }
              dataDistrict={ districtDataTemp }
              dataWard={ wardDataTemp }
              nameTitle={ t('createAnOrder') }
              open={ isOpenModalOderCreate }
              handleClose={ handleCloseCreateOderModal }
              deliveryShiftData={ deliveryShiftData }
              paymentData={ paymentData }
              tagData={ tagData }
              removeMessageError={ removeMessageError }
              onChangeProvince={ handleChangeProvinceFormCreateUser }
              onChangeDistrict={ handleChangeDistrictFormCreateUser }
              isListCustomer={true}
            />

            { isOpenModalUpdate && (
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
            ) }
          </Box>
        </Box>
      ) }
    </Box>
  )
}

export default CustomerInformationPage
