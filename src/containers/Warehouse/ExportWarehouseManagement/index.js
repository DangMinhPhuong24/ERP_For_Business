import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import HeaderPage from 'components/HeaderPage'
import { useTranslation } from 'react-i18next'
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5'
import { TbEdit } from 'react-icons/tb'
import ArticleFillIcon from '../../../asset/icon/ArticleFill.svg'
import AssignmentLateIcon from '../../../asset/icon/AssignmentLate.svg'
import PercentFillIcon from '../../../asset/icon/PercentFill.svg'
import VerifiedUserIcon from '../../../asset/icon/VerifiedUser.svg'
import { formatPercentage } from '../../../common/common'
import colors from '../../../constants/colors'
import { listWarehouseExportOrdersState } from '../../../redux/warehouse/warehouse.selectors'
import React, { useEffect, useRef, useState } from 'react'
import format from 'date-fns/format'
import { useDispatch, useSelector } from 'react-redux'
import { getKanbanWarehouseExportOrdersAction } from '../../../redux/warehouse/warehouse.actions'
import { getProfileState } from '../../../redux/auth/auth.selectors'
import WarehouseImportBoardStandStill from '../../../components/Kanban/Warehouse/StandStill/board/board'
import { InputAdornment } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { titleExportKanban } from '../../../constants/attributesKanbanExportWarehouse'
import CustomDatePicker from '../../../components/DateTime/DatePicker'
import { subscribeToChannel } from '../../../utils/pusher'
import SearchBar from "../../../components/Buttons/Search";

export default function ExportWarehouseManagementPage() {
  const { t } = useTranslation()
  const getProfile = useSelector(getProfileState)
  const [searchValue, setSearchValue] = useState('')
  const [selectedRange, setSelectedRange] = useState([format(new Date(), 'yyyy-MM-dd')])
  const dispatch = useDispatch()
  const [columns, setColumns] = useState({ staticData: {}, kanbanData: {} })
  const selectedRangeRef = useRef(selectedRange)
  const listWarehouseExportOrders = useSelector(listWarehouseExportOrdersState)

  useEffect(() => {
    dispatch(getKanbanWarehouseExportOrdersAction({ search_warehouse_export_order: searchValue, date: selectedRange }))
  }, [dispatch, selectedRange])

  useEffect(() => {
    if (listWarehouseExportOrders) {
      const staticData = {
        quantity_warehouse_export_orders_behind_schedule:
          listWarehouseExportOrders.quantity_warehouse_export_orders_behind_schedule ?? 0,
        quantity_warehouse_export_orders_on_time:
          listWarehouseExportOrders.quantity_warehouse_export_orders_on_time ?? 0,
        percent_warehouse_export_orders_on_time: listWarehouseExportOrders.percent_warehouse_export_orders_on_time ?? 0,
        total_warehouse_export_orders: listWarehouseExportOrders.total_warehouse_export_orders ?? 0
      }

      const kanbanData = {
        warehouse_export_orders_waiting: listWarehouseExportOrders.warehouse_export_orders_waiting ?? [],
        warehouse_export_orders_processing: listWarehouseExportOrders.warehouse_export_orders_processing ?? [],
        warehouse_export_orders_completed: listWarehouseExportOrders.warehouse_export_orders_completed ?? [],
        warehouse_export_orders_cancelled: listWarehouseExportOrders.warehouse_export_orders_cancelled ?? []
      }
      setColumns({ staticData: staticData, kanbanData: kanbanData })
    }
  }, [listWarehouseExportOrders])

  useEffect(() => {
    const channel = subscribeToChannel(getProfile.id)
    channel.bind('kanban-warehouse-export-order-event', function (data) {
      updateOrderInColumns(data)
    })

    return () => {
      channel.unbind('kanban-warehouse-export-order-event')
    }
  }, [getProfile])

  const updateOrderInColumns = (data) => {
    const {
      id,
      from_column,
      to_column,
      warehouse_export_order_name,
      code,
      export_date,
      from,
      to,
      warning,
      export_time,
      quantity_warehouse_export_orders_behind_schedule,
      quantity_warehouse_export_orders_on_time,
      percent_warehouse_export_orders_on_time,
      total_warehouse_export_orders
    } = data

    const orderDate = new Date(export_date)
    const selectedDate = new Date(selectedRangeRef.current)

    const isDateInRange = orderDate.getTime() === selectedDate.getTime()
    const isMatchingSearch =
      searchValue === '' || code.includes(searchValue) || warehouse_export_order_name.includes(searchValue)

    if (!isDateInRange || !isMatchingSearch) return

    setColumns((prevColumns) => {
      const { staticData, kanbanData } = prevColumns
      const updatedKanbanData = { ...kanbanData }

      const moveOrder = (sourceColumn, targetColumn) => {
        if (sourceColumn && updatedKanbanData[sourceColumn]) {
          updatedKanbanData[sourceColumn] = updatedKanbanData[sourceColumn].filter((order) => order.id !== id)
        }
        updatedKanbanData[targetColumn] = [data, ...updatedKanbanData[targetColumn]]
      }

      const addOrderToColumn = (column) => {
        updatedKanbanData[column] = [
          { id, code, warehouse_export_order_name, from, to, warning, export_time },
          ...updatedKanbanData[column]
        ]
      }

      if (from_column) {
        moveOrder(from_column, to_column)
      } else {
        for (let column in updatedKanbanData) {
          if (updatedKanbanData[column].some((order) => order.id === id)) {
            updatedKanbanData[column] = updatedKanbanData[column].filter((order) => order.id !== id)
            break
          }
        }
        addOrderToColumn(to_column)
      }

      const updatedStaticData = {
        quantity_warehouse_export_orders_behind_schedule:
          quantity_warehouse_export_orders_behind_schedule ??
          staticData.quantity_warehouse_export_orders_behind_schedule,
        quantity_warehouse_export_orders_on_time:
          quantity_warehouse_export_orders_on_time ?? staticData.quantity_warehouse_export_orders_on_time,
        percent_warehouse_export_orders_on_time:
          percent_warehouse_export_orders_on_time ?? staticData.percent_warehouse_export_orders_on_time,
        total_warehouse_export_orders: total_warehouse_export_orders ?? staticData.total_warehouse_export_orders
      }

      return {
        staticData: updatedStaticData,
        kanbanData: updatedKanbanData
      }
    })
  }

  const handleDateChange = (range) => {
    setSelectedRange(range)
    selectedRangeRef.current = range
  }

  const handleSearchValue = () => {
    if (searchValue === '') {
      dispatch(getKanbanWarehouseExportOrdersAction({ date: selectedRange }))
    } else {
      dispatch(
        getKanbanWarehouseExportOrdersAction({
          search_warehouse_export_order: searchValue,
          date: selectedRange
        })
      )
    }
  }

  const handleClearSearchValue = () => {
    setSearchValue('')
    dispatch(getKanbanWarehouseExportOrdersAction({ date: selectedRange }))
  }

  return (
    <>
      <HeaderPage
        title={t('exportWarehouseManagement')}
        actionButton={
          <Button disabled className="modalButtonClick">
            <TbEdit style={{ fontSize: '16px', marginBottom: '2px' }} />
            {t('createWarehouseExportOrder')}
          </Button>
        }
      />
      <Box sx={{ display: 'flex', gap: '20px', m: '10px 16px', justifyContent: 'space-between' }}>
        <SearchBar
            searchValue={searchValue}
            handleOnChangeValue={(event) => setSearchValue(event.target.value)}
            handleSearch={handleSearchValue}
            handleClearSearch={handleClearSearchValue}
            placeholderText="enterTheWarehouseDispatchOrderCode"
            buttonText="find"
        />
        <CustomDatePicker onChange={handleDateChange} />
      </Box>
      <Box sx={{ display: 'flex', gap: '20px', m: '11px 16px' }}>
        <Box className="box-statistic-export-warehouse">
          <AssignmentLateIcon />
          <Box>
            <Typography className="title">{t('numberOfDelayedDispatchOrders')}</Typography>
            <Typography className="text" sx={{ color: colors.redColor }}>
              {columns.staticData.quantity_warehouse_export_orders_behind_schedule}
            </Typography>
          </Box>
        </Box>
        <Box className="box-statistic-export-warehouse">
          <VerifiedUserIcon />
          <Box>
            <Typography className="title">{t('numberOfOnTimeWarehouseDispatchOrders')}</Typography>
            <Typography className="text" sx={{ color: colors.greenColor }}>
              {columns.staticData.quantity_warehouse_export_orders_on_time}
            </Typography>
          </Box>
        </Box>
        <Box className="box-statistic-export-warehouse">
          <PercentFillIcon />
          <Box>
            <Typography className="title">{t('rateOfTimelyStockDispatches')}</Typography>
            <Typography className="text">
              {formatPercentage(columns.staticData.percent_warehouse_export_orders_on_time)}
            </Typography>
          </Box>
        </Box>
        <Box className="box-statistic-export-warehouse">
          <ArticleFillIcon />
          <Box>
            <Typography className="title">{t('totalNumberOfWarehouseDispatchOrders')}</Typography>
            <Typography className="text">{columns.staticData.total_warehouse_export_orders}</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ m: '4px 60px' }}>
          <WarehouseImportBoardStandStill
            initial={columns?.kanbanData}
            title={titleExportKanban}
            withScrollableColumns
          />
        </Box>
      </Box>
    </>
  )
}
