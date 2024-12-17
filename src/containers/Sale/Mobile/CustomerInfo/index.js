import colors from '../../../../constants/colors'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import Typography from '@mui/material/Typography'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Toolbar from '@mui/material/Toolbar'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RiUserAddLine } from 'react-icons/ri'
import SearchFormCustomerMobile from '../../../../components/SearchForm/CustomerMobile'
import { TextField } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import commons from '../../../../constants/common'
import ListCustomerTable from '../../../../components/Table/CustomerTable/ListCustomer/ListCustomer'
import { getCustomerListAction, removeMessageErrorAction } from '../../../../redux/customer/customer.actions'
import { clearDataDistrictAndWardAction } from '../../../../redux/app/app.actions'
import { useDispatch, useSelector } from 'react-redux'
import {
  createCustomerSuccessMessageState,
  customerListState,
  customertotalPagesState,
  deleteCustomerSuccessFlagState,
  updateCustomerSuccessFlagState
} from '../../../../redux/customer/customer.selectors'
import { checkAttributeValue } from '../../../../common/common'
import { permissionActions } from '../../../../constants/titlePermissions'
import {isCanShowAllCustomers, useRoleCheck} from '../../../../utils'

const CustomerInfo = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedListAllCustomerOption, setSelectedListAllCustomerOption] = useState(null)
  const [searchParams, setSearchParams] = useState(null)
  const [loading, setLoading] = useState(false)
  const createCustomerSuccessMessage = useSelector(createCustomerSuccessMessageState)
  const deleteCustomerSuccessFlag = useSelector(deleteCustomerSuccessFlagState)
  const updateCustomerSuccessFlag = useSelector(updateCustomerSuccessFlagState)
  const listCustomer = useSelector(customerListState)
  const totalPages = useSelector(customertotalPagesState)
  const { isSuperAdmin, userInfo } = useRoleCheck()
  const permissionsData = useMemo(
    () => (Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : []),
    [userInfo]
  )
  const userRole = useMemo(() => userInfo.role?.type?.name ?? '', [userInfo])

  useEffect(() => {
    setSelectedListAllCustomerOption(
        isSuperAdmin ? commons.TYPE_DISPLAY_ALL_CUSTOMER :
            isCanShowAllCustomers(userRole) ? commons.TYPE_DISPLAY_ALL_CUSTOMER : 'sale'
    );
  }, [isSuperAdmin, userRole]);
  const [currentPagePagination, setCurrentPagePagination] = useState(1)

  useEffect(() => {
    if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
      dispatch(
        getCustomerListAction({
          type: commons.TYPE_DISPLAY_ALL_CUSTOMER
        })
      )
    } else {
      dispatch(getCustomerListAction())
    }
  }, [selectedListAllCustomerOption])

  useEffect(() => {
    if (createCustomerSuccessMessage) {
      removeMessageError()
      setCurrentPagePagination(1)
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
  }, [createCustomerSuccessMessage])

  useEffect(() => {
    if (updateCustomerSuccessFlag) {
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
  }, [updateCustomerSuccessFlag])

  const handleSearch = (params) => {
    if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
      params.type = commons.TYPE_DISPLAY_ALL_CUSTOMER
    }
    setLoading(true)
    setSearchParams(params)
    localStorage.setItem('customerSearch', JSON.stringify(params))
    dispatch(getCustomerListAction(params)).then(() => {
      setLoading(false)
    })
  }

  const handleChangeViewOption = (event) => {
    setSelectedListAllCustomerOption(event.target.value)
    if (event.target.value == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
      dispatch(getCustomerListAction({ ...searchParams, type: commons.TYPE_DISPLAY_ALL_CUSTOMER }))
    } else {
      dispatch(getCustomerListAction({ ...searchParams, type: '' }))
    }
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
    dispatch(getCustomerListAction(params)).then(() => setLoading(false))
  }

  const onClear = useCallback(() => {
    setCurrentPagePagination(1)
    setLoading(true)
    dispatch(clearDataDistrictAndWardAction())
    setSearchParams(null)
    if (selectedListAllCustomerOption == commons.TYPE_DISPLAY_ALL_CUSTOMER) {
      dispatch(getCustomerListAction({ type: commons.TYPE_DISPLAY_ALL_CUSTOMER })).then(() => setLoading(false))
    } else {
      dispatch(getCustomerListAction()).then(() => setLoading(false))
    }
  }, [selectedListAllCustomerOption])

  const removeMessageError = useCallback(() => {
    dispatch(removeMessageErrorAction())
  }, [])

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
              {t('customerManagement')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              className={`addButton ${!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.ADD_CUSTOMER) ? 'disabled-cursor' : ''}`}
              disabled={!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.ADD_CUSTOMER)}
              sx={{ gap: '8px' }}
              onClick={() => navigate('/sale/information/create-customer')}
            >
              <RiUserAddLine style={{ fontSize: '16px', marginBottom: '2px' }} />
              {t('addCustomerMobile')}
            </Button>
          </Box>
        </Toolbar>
        <Box sx={{ p: '8px 4px' }}>
          <SearchFormCustomerMobile onSubmit={handleSearch} onClear={onClear} />
          <Box
            component="form"
            sx={{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', p: 1, position: 'relative', mt: 1 }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography className="frontpager">
                {t('listOfCustomers')}
                <Box sx={{ flexGrow: 1 }} />
                <TextField
                  size="small"
                  select
                  value={selectedListAllCustomerOption}
                  onChange={handleChangeViewOption}
                  variant="outlined"
                  style={{ width: '204px', backgroundColor: colors.lilywhiteColor }}
                >
                  <MenuItem value={commons.TYPE_DISPLAY_ALL_CUSTOMER}>{t('allCustomer')}</MenuItem>
                  {
                      !(isSuperAdmin || isCanShowAllCustomers(userRole)) && (
                          <MenuItem value="sale">{t('customerInCharge')}</MenuItem>
                      )
                  }
                </TextField>
              </Typography>
            </Box>
            <Box>
              <ListCustomerTable
                successMessage={deleteCustomerSuccessFlag}
                data={listCustomer}
                isShowMobile={true}
                permissionsData={permissionsData}
                isSuperAdmin={isSuperAdmin}
                currentPagePagination={currentPagePagination}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
                loading={loading}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default CustomerInfo
