// @ts-nocheck
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import HeaderPage from 'components/HeaderPage'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbEdit } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { checkAttributeValue } from '../../../common/common'
import ProductionTransitCapacityChart from '../../../components/Chart/Sale/ProductionTransitChart'
import OrderTable from '../../../components/Table/OrderTable'
import colors from '../../../constants/colors'
import { permissionActions } from '../../../constants/titlePermissions'
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
  listAllPaymentState,
  listAllTagState
} from '../../../redux/app/app.selectors'
import { removeMessageErrorAction } from '../../../redux/customer/customer.actions'
import { listAllCustomerState } from '../../../redux/customer/customer.selectors'
import { deleteDataOderAction, getOderDetailAction, getOderListAction } from '../../../redux/oder/oder.actions'
import {
  deleteOderErrorMessageState,
  deleteOderSuccessMessageState,
  oderDetailState,
  oderListState,
  oderTotalPagesState
} from '../../../redux/oder/oder.selectors'
import { useRoleCheck } from '../../../utils'
import OrderModal from "../../../components/Modal/Order/Create/CreateOrder";

function OderPage() {
  const { t } = useTranslation()
  const oderData = useSelector(oderListState)
  const orderDetail = useSelector(oderDetailState)
  const totalPages = useSelector(oderTotalPagesState)
  const deleteSuccessMessage = useSelector(deleteOderSuccessMessageState)
  const deleteOderErrorMessage = useSelector(deleteOderErrorMessageState)
  const wardDataTemp = useSelector(appWardListTempState)
  const districtDataTemp = useSelector(appDistrictListTempState)
  const provinceData = useSelector(appProvinceListState)
  const [ isOpenModalOderCreate, setIsOpenModalCreateOder ] = useState(false)
  const [ isOpenModalOderUpdate, setIsOpenModalOderUpdate ] = useState(false)
  const paymentData = useSelector(listAllPaymentState)
  const deliveryShiftData = useSelector(listAllDeliveryShiftState)
  const tagData = useSelector(listAllTagState)
  const customerListAll = useSelector(listAllCustomerState)
  const dispatch = useDispatch()
  const [ loading, setLoading ] = useState(false)
  const { isSuperAdmin, userInfo } = useRoleCheck()
  const permissionsData = useMemo(
    () => ( Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : [] ),
    [ userInfo ]
  )
  const [ isEdit, setIsEdit ] = useState(false)
  const [ currentPageOrder, setCurrentPageOrder ] = useState(1)
  const [ formValues, setFormValues ] = useState(null);

  useEffect(() => {
    dispatch(getOderListAction())
  }, [])

  useEffect(() => {
    const savedFormData = localStorage.getItem('formState');
    if (savedFormData) {
      setFormValues(JSON.parse(savedFormData));
      setIsOpenModalCreateOder(true)
    }
  }, []);

  useEffect(() => {
    if (deleteSuccessMessage || deleteOderErrorMessage) {
      if (deleteSuccessMessage !== '') {
        refreshData()
      }
    }
  }, [ deleteSuccessMessage, deleteOderErrorMessage ])

  const deleteOder = useCallback((params) => {
    dispatch(deleteDataOderAction(params))
  }, [])

  const refreshData = useCallback((params) => {
    setCurrentPageOrder(1)
    dispatch(getOderListAction(params))
  }, [])

  const handlePageChange = (event, page) => {
    setLoading(true)
    setCurrentPageOrder(page)
    dispatch(getOderListAction({ page })).then(() => {
      setLoading(false)
    })
  }
  const handleOpenCreateOrderModal = () => {
    removeMessageError()
    setIsOpenModalCreateOder(true)
  }

  const handleCloseCreateOrderModal = () => {
    setFormValues(null)
    setIsOpenModalCreateOder(false)
    removeMessageError()
  }

  const handleOpenUpdateOrderModal = (orderId) => {
    removeMessageError()
    dispatch(getOderDetailAction(orderId))
    setIsEdit(true)
    setIsOpenModalOderUpdate(true)
  }

  const handleCloseUpdateOrderModal = () => {
    setIsOpenModalOderUpdate(false)
    setIsEdit(false)
    removeMessageError()
  }

  const removeMessageError = useCallback(() => {
    dispatch(removeMessageErrorAction())
  }, [])

  const handleChangeDistrictFormCreateUser = useCallback((value) => {
    dispatch(setGetListWardFlagAction(true))
    dispatch(getListWardByDistrictIdAction(value))
  }, [])

  const handleChangeProvinceFormCreateUser = useCallback((value) => {
    dispatch(setGetListDistrictFlagAction(true))
    dispatch(getListDistrictByProvinceIdAction(value))
  }, [])

  return (
    <Box sx={ { display: 'flex', flexDirection: 'column' } }>
      <HeaderPage
        title={ t('salesManager') }
        actionButton={
          <Box sx={ { display: 'flex', justifyContent: 'flex-end' } }>
            <Button
              className={ `addButton ${ !isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.ADD_ORDER) ? 'disabled-cursor' : '' }` }
              disabled={ !isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.ADD_ORDER) }
              startIcon={ <TbEdit style={ { fontSize: '16px', marginBottom: '2px' } }/> }
              onClick={ handleOpenCreateOrderModal }
            >
              { t('createAnOrder') }
            </Button>
          </Box>
        }
      />
      <OrderModal
        formValues={ formValues }
        data={ customerListAll }
        dataProvince={ provinceData }
        dataDistrict={ districtDataTemp }
        dataWard={ wardDataTemp }
        nameTitle={ t('createAnOrder') }
        open={ isOpenModalOderCreate }
        handleClose={ handleCloseCreateOrderModal }
        deliveryShiftData={ deliveryShiftData }
        paymentData={ paymentData }
        tagData={ tagData }
        removeMessageError={ removeMessageError }
        onChangeProvince={ handleChangeProvinceFormCreateUser }
        onChangeDistrict={ handleChangeDistrictFormCreateUser }
      />
      <ProductionTransitCapacityChart/>
      { ( isSuperAdmin || checkAttributeValue(permissionsData, 'name', permissionActions.LIST_ORDER) ) && (
        <Box p={ 2 }>
          <Box
            component="form"
            sx={ {
              bgcolor: colors.lilywhiteColor,
              borderRadius: '10px',
              padding: '20px',
              position: 'relative'
            } }
          >
            <Box sx={ { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' } }>
              <Typography sx={ { fontWeight: '500', fontSize: '20px', color: colors.indigoColor } }>
                { t('orderList') }
              </Typography>
            </Box>
            <OrderTable
              data={ oderData }
              successMessage={ deleteSuccessMessage }
              errorMessage={ deleteOderErrorMessage }
              handlerDelete={ deleteOder }
              loading={ loading }
              permissionsData={ permissionsData }
              isSuperAdmin={ isSuperAdmin }
              handleOpenUpdateOrderModal={ handleOpenUpdateOrderModal }
              handlePageChange={ handlePageChange }
              currentPagePagination={ currentPageOrder }
              totalPages={ totalPages }
            />
          </Box>
        </Box>
      ) }
    </Box>
  )
}

export default OderPage
