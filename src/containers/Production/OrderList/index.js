import { Grid, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BoardMove from '../../../components/Kanban/Production/ListOrders/move/board/board'
import BoardStandStill from '../../../components/Kanban/Production/ListOrders/StandStill/board/board'
import ProductionMethods from '../../../components/Modal/Production/OrderList/ProductionMethods'
import PaginationComponent from '../../../components/Paginate'
import SearchFormOrder from '../../../components/SearchForm/Order'
import OrderListTable from '../../../components/Table/Production/OrderListTable'
import colors from '../../../constants/colors'
import titleTableOrderListProduction from '../../../constants/titleTableOrderListProduction'
import { listAllCustomerState } from '../../../redux/customer/customer.selectors'
import { getOderDetailAction } from '../../../redux/oder/oder.actions'
import { oderDetailState } from '../../../redux/oder/oder.selectors'
import {
  getKanbanOderForProductionManagementAction,
  getListOderForProductionManagementAction,
  getListOrderStatusAction,
  getStatisticOderForProductionManagementAction,
  updateOrderWaitingCreatedToOrderWaitingManufactureAction,
  updateOrderWaitingManufactureToOrderWaitingCreatedAction
} from '../../../redux/production/production.actions'
import {
  listAllOrderStatusState,
  listKanbanOrderStatusState,
  listOderForProductionManagementotalPagesState,
  listOderForProductionManagementState,
  statisticOderForProductionManagementState
} from '../../../redux/production/production.selectors'
import { setCurrentPageListOderForProductionManagement } from '../../../redux/production/production.slice'
import '../../../resource/style/ProductionStyle.css'

export default function OrderListPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState('kanban')
  const [displayType, setDisplayType] = useState('kanban')
  const listOderForProductionManagement = useSelector(listOderForProductionManagementState)
  const listOderForProductionManagementotalPages = useSelector(listOderForProductionManagementotalPagesState)
  const statisticOderForProductionManagement = useSelector(statisticOderForProductionManagementState)
  const listAllCustomer = useSelector(listAllCustomerState)
  const listAllOrderStatus = useSelector(listAllOrderStatusState)
  const [searchParams, setSearchParams] = useState(null)
  const kanbanOderForProductionManagement = useSelector(listKanbanOrderStatusState)
  const [isProductionMethodModalOpen, setProductionMethodModalOpen] = useState(false)
  const oderDetail = useSelector(oderDetailState)
  const [isSortedAZTotalCost, setIsSortedAZTotalCost] = useState(false)
  const [isSortedZATotalCost, setIsSortedZATotalCost] = useState(false)
  const [isSortedAZCustomerName, setIsSortedAZCustomerName] = useState(false)
  const [isSortedZACustomerName, setIsSortedZACustomerName] = useState(false)
  const [isSortedAZCreateAt, setIsSortedAZCreateAt] = useState(false)
  const [isSortedZACreateAt, setIsSortedZACreateAt] = useState(false)
  const [isSortedAZDeliveryDate, setIsSortedAZDeliveryDate] = useState(false)
  const [isSortedZADeliveryDate, setIsSortedZADeliveryDate] = useState(false)
  const [isSortedAZStatus, setIsSortedAZStatus] = useState(false)
  const [isSortedZAStatus, setIsSortedZAStatus] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(getListOderForProductionManagementAction())
    dispatch(getStatisticOderForProductionManagementAction())
    dispatch(getListOrderStatusAction())
    dispatch(getKanbanOderForProductionManagementAction())
  }, [dispatch])

  const handleChange = (event) => {
    setSelectedOption(event.target.value)
    setDisplayType(event.target.value)
  }

  const sortedAZTotalCost = useCallback(() => {
    dispatch(getListOderForProductionManagementAction({ sort_by: 'total_cost_az' }))
    setIsSortedAZTotalCost(true)
  }, [])
  const sortedZATotalCost = useCallback(() => {
    dispatch(getListOderForProductionManagementAction({ sort_by: 'total_cost_za' }))
    setIsSortedZATotalCost(true)
  }, [])
  const sortedAZCustomerName = useCallback(() => {
    dispatch(getListOderForProductionManagementAction({ sort_by: 'customer_name_az' }))
    setIsSortedAZCustomerName(true)
  }, [])
  const sortedZACustomerName = useCallback(() => {
    dispatch(getListOderForProductionManagementAction({ sort_by: 'customer_name_za' }))
    setIsSortedZACustomerName(true)
  }, [])
  const sortedAZCreateAt = useCallback(() => {
    dispatch(getListOderForProductionManagementAction({ sort_by: 'created_at_az' }))
    setIsSortedAZCreateAt(true)
  }, [])
  const sortedZACreateAt = useCallback(() => {
    dispatch(getListOderForProductionManagementAction({ sort_by: 'created_at_za' }))
    setIsSortedZACreateAt(true)
  }, [])
  const sortedAZDeliveryDate = useCallback(() => {
    dispatch(getListOderForProductionManagementAction({ sort_by: 'delivery_date_az' }))
    setIsSortedAZDeliveryDate(true)
  }, [])
  const sortedZADeliveryDate = useCallback(() => {
    dispatch(getListOderForProductionManagementAction({ sort_by: 'delivery_date_za' }))
    setIsSortedZADeliveryDate(true)
  }, [])
  const sortedAZStatus = useCallback(() => {
    dispatch(getListOderForProductionManagementAction({ sort_by: 'status_az' }))
    setIsSortedAZStatus(true)
  }, [])
  const sortedZAStatus = useCallback(() => {
    dispatch(getListOderForProductionManagementAction({ sort_by: 'status_za' }))
    setIsSortedZAStatus(true)
  }, [])
  const getListOderForProductionManagement = useCallback(() => {
    setIsSortedZATotalCost(false)
    setIsSortedAZTotalCost(false)
    setIsSortedAZCustomerName(false)
    setIsSortedZACustomerName(false)
    setIsSortedAZCreateAt(false)
    setIsSortedZACreateAt(false)
    setIsSortedAZDeliveryDate(false)
    setIsSortedZADeliveryDate(false)
    setIsSortedAZStatus(false)
    setIsSortedZAStatus(false)
    dispatch(getListOderForProductionManagementAction())
  }, [])

  const handlePageChange = (event, page) => {
    setLoading(true)
    if (isSortedAZTotalCost) {
      dispatch(setCurrentPageListOderForProductionManagement(page))
      if (searchParams) {
        dispatch(
          getListOderForProductionManagementAction({ ...searchParams, page: page, sort_by: 'total_cost_az' })
        ).then(() => {
          setLoading(false)
        })
      } else {
        dispatch(getListOderForProductionManagementAction({ page, sort_by: 'total_cost_az' })).then(() => {
          setLoading(false)
        })
      }
    } else if (isSortedZATotalCost) {
      dispatch(setCurrentPageListOderForProductionManagement(page))
      if (searchParams) {
        dispatch(
          getListOderForProductionManagementAction({ ...searchParams, page: page, sort_by: 'total_cost_za' })
        ).then(() => {
          setLoading(false)
        })
      } else {
        dispatch(getListOderForProductionManagementAction({ page, sort_by: 'total_cost_za' })).then(() => {
          setLoading(false)
        })
      }
    } else if (isSortedAZCustomerName) {
      dispatch(setCurrentPageListOderForProductionManagement(page))
      if (searchParams) {
        dispatch(
          getListOderForProductionManagementAction({ ...searchParams, page: page, sort_by: 'customer_name_az' })
        ).then(() => {
          setLoading(false)
        })
      } else {
        dispatch(getListOderForProductionManagementAction({ page, sort_by: 'customer_name_az' })).then(() => {
          setLoading(false)
        })
      }
    } else if (isSortedZACustomerName) {
      dispatch(setCurrentPageListOderForProductionManagement(page))
      if (searchParams) {
        dispatch(
          getListOderForProductionManagementAction({ ...searchParams, page: page, sort_by: 'customer_name_za' })
        ).then(() => {
          setLoading(false)
        })
      } else {
        dispatch(getListOderForProductionManagementAction({ page, sort_by: 'customer_name_za' })).then(() => {
          setLoading(false)
        })
      }
    } else if (isSortedAZCreateAt) {
      dispatch(setCurrentPageListOderForProductionManagement(page))
      if (searchParams) {
        dispatch(
          getListOderForProductionManagementAction({ ...searchParams, page: page, sort_by: 'created_at_az' })
        ).then(() => {
          setLoading(false)
        })
      } else {
        dispatch(getListOderForProductionManagementAction({ page, sort_by: 'created_at_az' })).then(() => {
          setLoading(false)
        })
      }
    } else if (isSortedZACreateAt) {
      dispatch(setCurrentPageListOderForProductionManagement(page))
      if (searchParams) {
        dispatch(
          getListOderForProductionManagementAction({ ...searchParams, page: page, sort_by: 'created_at_za' })
        ).then(() => {
          setLoading(false)
        })
      } else {
        dispatch(getListOderForProductionManagementAction({ page, sort_by: 'created_at_za' })).then(() => {
          setLoading(false)
        })
      }
    } else if (isSortedAZDeliveryDate) {
      dispatch(setCurrentPageListOderForProductionManagement(page))
      if (searchParams) {
        dispatch(
          getListOderForProductionManagementAction({ ...searchParams, page: page, sort_by: 'delivery_date_az' })
        ).then(() => {
          setLoading(false)
        })
      } else {
        dispatch(getListOderForProductionManagementAction({ page, sort_by: 'delivery_date_az' })).then(() => {
          setLoading(false)
        })
      }
    } else if (isSortedZADeliveryDate) {
      dispatch(setCurrentPageListOderForProductionManagement(page))
      if (searchParams) {
        dispatch(
          getListOderForProductionManagementAction({ ...searchParams, page: page, sort_by: 'delivery_date_za' })
        ).then(() => {
          setLoading(false)
        })
      } else {
        dispatch(getListOderForProductionManagementAction({ page, sort_by: 'delivery_date_za' })).then(() => {
          setLoading(false)
        })
      }
    } else if (isSortedAZStatus) {
      dispatch(setCurrentPageListOderForProductionManagement(page))
      if (searchParams) {
        dispatch(getListOderForProductionManagementAction({ ...searchParams, page: page, sort_by: 'status_az' })).then(
          () => {
            setLoading(false)
          }
        )
      } else {
        dispatch(getListOderForProductionManagementAction({ page, sort_by: 'status_az' })).then(() => {
          setLoading(false)
        })
      }
    } else if (isSortedZAStatus) {
      dispatch(setCurrentPageListOderForProductionManagement(page))
      if (searchParams) {
        dispatch(getListOderForProductionManagementAction({ ...searchParams, page: page, sort_by: 'status_za' })).then(
          () => {
            setLoading(false)
          }
        )
      } else {
        dispatch(getListOderForProductionManagementAction({ page, sort_by: 'status_za' })).then(() => {
          setLoading(false)
        })
      }
    } else {
      dispatch(setCurrentPageListOderForProductionManagement(page))
      if (searchParams) {
        dispatch(getListOderForProductionManagementAction({ ...searchParams, page: page })).then(() => {
          setLoading(false)
        })
      } else {
        dispatch(getListOderForProductionManagementAction({ page })).then(() => {
          setLoading(false)
        })
      }
    }
  }

  const handleSearch = (params) => {
    setLoading(true)
    setSearchParams(params)
    dispatch(getListOderForProductionManagementAction(params)).then(() => {
      setLoading(false)
    })
    dispatch(getStatisticOderForProductionManagementAction(params))
    dispatch(getKanbanOderForProductionManagementAction(params))
  }

  const onClear = useCallback(() => {
    setSearchParams(null)
    dispatch(getListOderForProductionManagementAction())
    dispatch(getStatisticOderForProductionManagementAction())
    dispatch(getKanbanOderForProductionManagementAction())
  }, [])

  const handleUpdateOrderWaitingManufactureToOrderWaitingCreated = useCallback((param) => {
    dispatch(updateOrderWaitingManufactureToOrderWaitingCreatedAction({ id: param }))
  }, [])

  const handleUpdateOrderWaitingCreatedToOrderWaitingManufacture = useCallback((param) => {
    dispatch(updateOrderWaitingCreatedToOrderWaitingManufactureAction({ id: param }))
  }, [])

  const handleDetailOrder = useCallback((param) => {
    dispatch(getOderDetailAction(param))
    setProductionMethodModalOpen(true)
  }, [])

  const handleCloseProductionMethodModal = () => {
    setProductionMethodModalOpen(false)
  }
  useEffect(() => {
    setDisplayType('kanban')
  }, [])

  return (
    <>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            sx={{ bgcolor: colors.whiteColor, color: colors.blackColor, marginRight: 2, p: '8px 20px' }}
            onClick={() => navigate(-1)}
          >
            {t('back')}
          </Button>
          <Typography variant="h6" fontWeight="bold">
            {t('orderList')}
          </Typography>
        </Box>
        <SearchFormOrder
          listAllCustomer={listAllCustomer}
          listAllOrderStatus={listAllOrderStatus}
          onSubmit={handleSearch}
          onClear={onClear}
        />
        <Box className="root-order">
          <Grid container columnSpacing={1} justifyContent="center">
            <Grid item>
              <Grid className="box-order-manage-production">
                <Grid>
                  <Typography className="title-statistical-production">{t('totalOrder')}</Typography>
                </Grid>
                <Grid>
                  <Typography className="text-order-list">
                    {statisticOderForProductionManagement.total_order}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid className="box-order-manage-production">
                <Grid>
                  <Typography className="title-statistical-production">{t('numberOfOrdersWaitingCreated')}</Typography>
                </Grid>
                <Grid>
                  <Typography className="text-order-list">
                    {statisticOderForProductionManagement.quantity_order_waiting_created}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid className="box-order-manage-production">
                <Grid>
                  <Typography className="title-statistical-production">{t('productionOrderNumber')}</Typography>
                </Grid>
                <Grid>
                  <Typography className="text-order-list">
                    {statisticOderForProductionManagement.quantity_order_in_manufacture}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid className="box-order-manage-production">
                <Grid>
                  <Typography className="title-statistical-production">{t('numberOfOrdersBehindSchedule')}</Typography>
                </Grid>
                <Grid>
                  <Typography className="text-order-list">
                    {statisticOderForProductionManagement.quantity_order_delayed}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid className="box-order-manage-production">
                <Grid>
                  <Typography className="title-statistical-production">{t('numberOfErrorOrdersReturned')}</Typography>
                </Grid>
                <Grid>
                  <Typography className="text-order-list">
                    {statisticOderForProductionManagement.quantity_order_cancelled}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container columnSpacing={2}>
            <Grid item>
              <Typography className="title" variant="h6">
                {t('watchAlong')}
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                size="small"
                select
                value={selectedOption}
                onChange={handleChange}
                variant="outlined"
                style={{ width: '104px', backgroundColor: colors.lilywhiteColor }}
              >
                <MenuItem value="kanban">Kanban</MenuItem>
                <MenuItem value="list">List</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <ProductionMethods
            open={isProductionMethodModalOpen}
            handleClose={handleCloseProductionMethodModal}
            nameTitle={t('chooseProductionMethod')}
            data={oderDetail}
          />
          {displayType === 'kanban' &&
            kanbanOderForProductionManagement &&
            kanbanOderForProductionManagement.kanban_two && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ display: 'flex', overflowX: 'auto' }}>
                  <Box sx={{ flex: '0 0 auto', marginRight: '10px' }}>
                    <BoardMove
                      initial={kanbanOderForProductionManagement.kanban_one}
                      withScrollableColumns
                      handleDetailOrder={handleDetailOrder}
                      handleUpdateOrderWaitingManufactureToOrderWaitingCreated={
                        handleUpdateOrderWaitingManufactureToOrderWaitingCreated
                      }
                      handleUpdateOrderWaitingCreatedToOrderWaitingManufacture={
                        handleUpdateOrderWaitingCreatedToOrderWaitingManufacture
                      }
                    />
                  </Box>
                  <Box sx={{ flex: '0 0 auto' }}>
                    <BoardStandStill initial={kanbanOderForProductionManagement.kanban_two} withScrollableColumns />
                  </Box>
                </Box>
              </Box>
            )}
          {displayType === 'list' && (
            <Box
              component="form"
              sx={{
                bgcolor: colors.lilywhiteColor,
                borderRadius: '10px',
                padding: '30px',
                position: 'relative',
                mt: 2
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '8px',
                  background: colors.redColor,
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px'
                }}
              />
              <Typography variant="h6" gutterBottom>
                {t('orderList')}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '6px' }}>
                <PaginationComponent
                  totalPages={listOderForProductionManagementotalPages}
                  handlePageChange={handlePageChange}
                />
              </Box>
              <OrderListTable
                titleTable={titleTableOrderListProduction}
                data={listOderForProductionManagement}
                handleDetailOrder={handleDetailOrder}
                sortedAZTotalCost={sortedAZTotalCost}
                sortedZATotalCost={sortedZATotalCost}
                sortedAZCustomerName={sortedAZCustomerName}
                sortedZACustomerName={sortedZACustomerName}
                sortedAZCreateAt={sortedAZCreateAt}
                sortedZACreateAt={sortedZACreateAt}
                sortedAZDeliveryDate={sortedAZDeliveryDate}
                sortedZADeliveryDate={sortedZADeliveryDate}
                sortedAZStatus={sortedAZStatus}
                sortedZAStatus={sortedZAStatus}
                getListOderForProductionManagement={getListOderForProductionManagement}
                loading={loading}
              />
            </Box>
          )}
        </Box>
      </Box>
    </>
  )
}
