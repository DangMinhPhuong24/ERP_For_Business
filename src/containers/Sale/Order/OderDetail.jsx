import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import colors from '../../../constants/colors'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import '../../../resource/style/OderDetailStyle.css'
import {
  adjustmentVoucherDetailState,
  adjustmentVoucherListState,
  adjustmentVoucherTotalPagesState,
  createAdjustmentVoucherSuccessFlagState,
  deleteAdjustmentVoucherSuccessMessageState,
  errorsMessageCreateAdjustmentVoucherState,
  errorsMessageUpdateAdjustmentVoucherState,
  listAllBranchByCustomerIdState,
  oderDetailState,
  updateAdjustmentVoucherSuccessFlagState,
} from '../../../redux/oder/oder.selectors'
import {
  createAdjustmentVoucherByOrderAction,
  deleteDataAdjustmentVoucherByOrderAction,
  getDetailAdjustmentVoucherByOrderAction,
  getListAdjustmentVoucherByOrderAction,
  getListCompensationVoucherByOrderAction,
  getOderDetailAction,
  removeMessageErrorAction,
  updateDataAdjustmentVoucherByOrderAction,
} from '../../../redux/oder/oder.actions'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { checkAttributeValue, formatCurrency } from '../../../common/common'
import statusMapping from '../../../constants/statusOder'
import TabDetail from '../../../components/Tab/Sale/Oder/index'
import {
  getListDistrictByProvinceIdAction,
  getListWardByDistrictIdAction,
  setGetListDistrictFlagAction,
  setGetListWardFlagAction
} from '../../../redux/app/app.actions'
import {
  appDistrictListTempState,
  appProvinceListState,
  appWardListTempState,
  listAllDeliveryShiftState,
  listAllFinishedProductFormState,
  listAllPaymentState,
  listAllTagState
} from '../../../redux/app/app.selectors'
import ClaimModal from '../../../components/Modal/Customer/Claim'
import {
  createClaimAction,
  getAllClaimProblemAction,
  updateOderAction,
  updateOderPreviewAction
} from '../../../redux/customer/customer.actions'
import {
  createClaimSuccessFlagState,
  listAllClaimProblemState,
  listAllCustomerState,
  listAllProductFormState,
  updateOderErrorMessageState,
  updateOderPreviewErrorMessageState,
  updateOderPreviewSuccessFlagState,
  updateOderSuccessFlagState
} from '../../../redux/customer/customer.selectors'
import { TbEdit } from 'react-icons/tb'
import { AiOutlineFileExclamation } from 'react-icons/ai'
import GrowthIcon from '../../../asset/icon/Growth.svg'
import TimeIcon from '../../../asset/icon/Time.svg'
import CarDeliveryIcon from '../../../asset/icon/CarDelivery.svg'
import StatusIcon from '../../../asset/icon/Status.svg'
import HeaderPage from 'components/HeaderPage'
import CreateOrder from "../../../components/Modal/Order/Create/CreateOrder";
import { useRoleCheck } from "../../../utils";
import { productListState } from "../../../redux/config/config.selectors";
import { permissionActions } from "../../../constants/titlePermissions";

function CustomerDetail() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const oderDetail = useSelector(oderDetailState)
  const adjustmentVoucher = useSelector(adjustmentVoucherListState)
  const location = useLocation()
  const districtDataTemp = useSelector(appDistrictListTempState)
  const provinceData = useSelector(appProvinceListState)
  const wardDataTemp = useSelector(appWardListTempState)
  const oderId = new URLSearchParams(location.search).get('id')
  const adjustmentVoucherTotalPages = useSelector(adjustmentVoucherTotalPagesState)
  const createAdjustmentVoucherSuccessFlag = useSelector(createAdjustmentVoucherSuccessFlagState)
  const errorsMessageCreateAdjustmentVoucher = useSelector(errorsMessageCreateAdjustmentVoucherState)
  const [ isOpenModalAdjustmentVoucherCreate, setIsOpenModalCreateAdjustmentVoucher ] = useState(false)
  const successMessageAdjustmentVoucher = useSelector(deleteAdjustmentVoucherSuccessMessageState)
  const adjustmentVoucherDetail = useSelector(adjustmentVoucherDetailState)
  const [ isOpenModalAdjustmentVoucherView, setIsOpenModalViewAdjustmentVoucher ] = useState(false)
  const [ isOpenModalAdjustmentVoucherUpdate, setIsOpenModalUpdateAdjustmentVoucher ] = useState(false)
  const updateAdjustmentVoucherSuccessFlag = useSelector(updateAdjustmentVoucherSuccessFlagState)
  const errorsMessageUpdateAdjustmentVoucher = useSelector(errorsMessageUpdateAdjustmentVoucherState)
  const listAllCustomer = useSelector(listAllCustomerState)
  const createClaimSuccessFlag = useSelector(createClaimSuccessFlagState)
  const [ loadingAdjustTable, setLoadingAdjustTable ] = useState(false)
  const [ isOpenEnterCreateClaimModal, setIsOpenEnterCreateClaimModal ] = useState(false)
  const [ currentPageAdjustmentVoucher, setCurrentPageAdjustmentVoucher ] = useState(1)
  const listAllClaimProblem = useSelector(listAllClaimProblemState)
  const customerListAll = useSelector(listAllCustomerState)
  const [ isOpenModalOderUpdate, setIsOpenModalOderUpdate ] = useState(false)
  const orderDetail = useSelector(oderDetailState)
  const [ previewData, setPreviewData ] = useState({})
  const [ isPreviewModalOpen, setPreviewModalOpen ] = useState(false)
  const updateOderSuccessFlag = useSelector(updateOderSuccessFlagState)
  const updateOderErrorMessage = useSelector(updateOderErrorMessageState)
  const [ orderCreateData, setOrderCreateData ] = useState({})
  const paymentData = useSelector(listAllPaymentState)
  const deliveryShiftData = useSelector(listAllDeliveryShiftState)
  const finishedProductFormData = useSelector(listAllFinishedProductFormState)
  const tagData = useSelector(listAllTagState)
  const productData = useSelector(productListState)
  const productFormData = useSelector(listAllProductFormState)
  const updateOderPreviewSuccessFlag = useSelector(updateOderPreviewSuccessFlagState)
  const updateOderPreviewErrorMessage = useSelector(updateOderPreviewErrorMessageState)
  const { isSuperAdmin, userInfo } = useRoleCheck()
  const listAllBranchByCustomerId = useSelector(listAllBranchByCustomerIdState)
  const permissionsData = useMemo(
    () => ( Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : [] ),
    [ userInfo ]
  )

  useEffect(() => {
    if (createClaimSuccessFlag) {
      setIsOpenEnterCreateClaimModal(false)
    }
    if (updateOderSuccessFlag) {
      setPreviewModalOpen(false)
      dispatch(getOderDetailAction(oderId))
    }
  }, [ createClaimSuccessFlag, updateOderSuccessFlag ])

  useEffect(() => {
    dispatch(getAllClaimProblemAction())
  }, [])

  useEffect(() => {
    dispatch(getOderDetailAction(oderId))
    dispatch(getListAdjustmentVoucherByOrderAction({ order_id: oderId }))
    dispatch(getListCompensationVoucherByOrderAction({ order_id: oderId }))
  }, [ oderId ])

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

  const handleOrderDataChange = (data) => {
    dispatch(updateOderPreviewAction({ ...data, id: orderDetail.id }))
    setOrderCreateData({ ...data, id: orderDetail.id })
  }

  const handleChangeProvinceFormCreateUser = useCallback((value) => {
    dispatch(setGetListDistrictFlagAction(true))
    dispatch(getListDistrictByProvinceIdAction(value))
  }, [])

  const handleChangeDistrictFormCreateUser = useCallback((value) => {
    dispatch(setGetListWardFlagAction(true))
    dispatch(getListWardByDistrictIdAction(value))
  }, [])

  const handleClosePreviewModal = () => {
    setPreviewModalOpen(false)
    setIsOpenModalOderUpdate(true)
  }

  const handleCreateOderAction = (params) => {
    dispatch(updateOderAction({ ...params, id: orderDetail.id }))
  }

  const handleOpenUpdateOrderModal = (oderId) => {
    removeMessageError()
    dispatch(getOderDetailAction(oderId))
    setIsOpenModalOderUpdate(true)
  }

  const handlePageAdjustmentVoucherChange = (event, page) => {
    setLoadingAdjustTable(true)
    setCurrentPageAdjustmentVoucher(page)
    dispatch(getListAdjustmentVoucherByOrderAction({ page: page, order_id: oderId })).then(() => {
      setLoadingAdjustTable(false)
    })
  }

  const handleCreateAdjustmentVoucher = useCallback(
    (value) => {
      dispatch(createAdjustmentVoucherByOrderAction(value))
    },
    [ dispatch ]
  )

  const handlerDeleteAdjustmentVoucher = useCallback((params) => {
    dispatch(deleteDataAdjustmentVoucherByOrderAction(params))
  }, [])

  useEffect(() => {
    if (createAdjustmentVoucherSuccessFlag || updateAdjustmentVoucherSuccessFlag || successMessageAdjustmentVoucher) {
      setCurrentPageAdjustmentVoucher(1)
      setIsOpenModalCreateAdjustmentVoucher(false)
      setIsOpenModalUpdateAdjustmentVoucher(false)
      dispatch(getListAdjustmentVoucherByOrderAction({ order_id: oderId }))
    }
  }, [ createAdjustmentVoucherSuccessFlag, updateAdjustmentVoucherSuccessFlag, successMessageAdjustmentVoucher ])

  const removeMessageError = useCallback(() => {
    dispatch(removeMessageErrorAction())
  }, [])

  const handleGetDetailAdjustmentVoucher = useCallback((params) => {
    setIsOpenModalViewAdjustmentVoucher(true)
    dispatch(getDetailAdjustmentVoucherByOrderAction(params))
  }, [])

  const handleUpdateDetailAdjustmentVoucher = useCallback((params) => {
    setIsOpenModalUpdateAdjustmentVoucher(true)
    dispatch(getDetailAdjustmentVoucherByOrderAction(params))
  }, [])

  const handleUpdateAdjustmentVoucher = useCallback(
    (value) => {
      dispatch(updateDataAdjustmentVoucherByOrderAction(value))
    },
    [ dispatch ]
  )

  const openCreateClaim = () => {
    setIsOpenEnterCreateClaimModal(true)
  }

  const handleCloseClaimModal = () => {
    setIsOpenEnterCreateClaimModal(false)
  }

  const createClaim = useCallback((params) => {
    dispatch(createClaimAction(params))
  }, [])

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column' } }>
      <HeaderPage
        title={ t('orderDetails') }
        actionButton={
          <Button
            className={ `addButton ${ oderDetail.disable ||
            ( !isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.UPDATE_ORDER) ) ? 'disabled-cursor' : '' }
            ` }
            disabled={ oderDetail.disable ||
              ( !isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.UPDATE_ORDER) ) }
            sx={ { gap: '8px' } }
            onClick={ () => handleOpenUpdateOrderModal(oderId) }
          >
            <TbEdit/>
            { t('editAction') }
          </Button>
        }
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
      <Box p={ 2 }>
        <Box sx={ { display: 'flex', alignItems: 'center', justifyContent: 'space-between' } }>
          <Box>
            <Typography className="text-field-input" sx={ { color: colors.charcoalgrayColor } }>
              { t('order') }
            </Typography>
            <Typography sx={ { fontSize: 22, fontWeight: 600 } }>{ oderDetail.code }</Typography>
          </Box>
          <Box>
            <Box className="button-container">
              <Button className="modalButtonClick" onClick={ openCreateClaim }>
                <AiOutlineFileExclamation/>
                { t('addCustomerClaim') }
              </Button>
            </Box>
            <ClaimModal
              handleCloseModal={ handleCloseClaimModal }
              open={ isOpenEnterCreateClaimModal }
              dataCustomer={ listAllCustomer }
              dataCustomerDetail={ oderDetail?.customer }
              dataClaimProblem={ listAllClaimProblem }
              nameTitle={ t('enterClaim') }
              handleSubmitAction={ createClaim }
              customerId={ oderDetail?.customer?.id }
              successFlag={ createClaimSuccessFlag }
              isCreateById={ true }
            />
          </Box>
        </Box>
        <Box component="form">
          <Box sx={ { display: 'flex', gap: '20px', mt: 2 } }>
            <Box className="box">
              <GrowthIcon/>
              <Box>
                <Typography className="title">{ t('totalValue') }</Typography>
                <Typography className="text">{ formatCurrency(oderDetail.total_cost) }</Typography>
              </Box>
            </Box>
            <Box className="box">
              <TimeIcon/>
              <Box>
                <Typography className="title">{ t('creationTime') }</Typography>
                <Typography className="text">{ oderDetail.created_at }</Typography>
              </Box>
            </Box>
            <Box className="box">
              <CarDeliveryIcon/>
              <Box>
                <Typography className="title">{ t('deliveryTime') }</Typography>
                <Typography className="text">{ oderDetail.delivery_date }</Typography>
              </Box>
            </Box>
            <Box className="box">
              <StatusIcon/>
              <Box>
                <Typography className="title">{ t('status') }</Typography>
                <Typography
                  className="text"
                  style={ {
                    color:
                      oderDetail && oderDetail.order_status ? statusMapping[oderDetail.order_status.id].textColor : null
                  } }
                >
                  { oderDetail && oderDetail.order_status ? t(statusMapping[oderDetail.order_status.id].text) : null }
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          component="form"
          sx={ {
            bgcolor: colors.lilywhiteColor,
            p: 2,
            mt: 1,
            borderRadius: '6px',
            position: 'relative',
            flexGrow: 1
          } }
        >
          <Box sx={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' } }>
            <Typography gutterBottom className="customer-detail-title">
              { t('orderData') }
            </Typography>
          </Box>
          <TabDetail
            dataOderDetail={ oderDetail }
            dataAdjustmentVoucher={ adjustmentVoucher }
            adjustmentVoucherTotalPages={ adjustmentVoucherTotalPages }
            handlePageAdjustmentVoucherChange={ handlePageAdjustmentVoucherChange }
            handleCreateAdjustmentVoucher={ handleCreateAdjustmentVoucher }
            errorsMessageCreateAdjustmentVoucher={ errorsMessageCreateAdjustmentVoucher }
            isCreateAdjustmentVoucherModalOpen={ isOpenModalAdjustmentVoucherCreate }
            setIsCreateAdjustmentVoucherModalOpen={ setIsOpenModalCreateAdjustmentVoucher }
            handlerDeleteAdjustmentVoucher={ handlerDeleteAdjustmentVoucher }
            successMessageAdjustmentVoucher={ successMessageAdjustmentVoucher }
            removeMessageError={ removeMessageError }
            handleGetDetailAdjustmentVoucher={ handleGetDetailAdjustmentVoucher }
            adjustmentVoucherDetail={ adjustmentVoucherDetail }
            isOpenModalAdjustmentVoucherView={ isOpenModalAdjustmentVoucherView }
            setIsOpenModalViewAdjustmentVoucher={ setIsOpenModalViewAdjustmentVoucher }
            handleUpdateDetailAdjustmentVoucher={ handleUpdateDetailAdjustmentVoucher }
            isOpenModalAdjustmentVoucherUpdate={ isOpenModalAdjustmentVoucherUpdate }
            setIsOpenModalUpdateAdjustmentVoucher={ setIsOpenModalUpdateAdjustmentVoucher }
            errorsMessageUpdateAdjustmentVoucher={ errorsMessageUpdateAdjustmentVoucher }
            handleUpdateAdjustmentVoucher={ handleUpdateAdjustmentVoucher }
            loadingAdjustTable={ loadingAdjustTable }
            currentPageAdjustmentVoucher={ currentPageAdjustmentVoucher }
          />
        </Box>
      </Box>
    </Box>
  )
}

export default CustomerDetail
