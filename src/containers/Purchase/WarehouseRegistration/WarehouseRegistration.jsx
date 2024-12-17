import { AddCircleOutline } from '@mui/icons-material'
import { Autocomplete, Box, Button, IconButton, TextField, Typography } from '@mui/material'
import PolygonIcon from 'asset/icon/Polygon.svg'
import BasicTable from 'components/BasicTable'
import SearchBar from 'components/Buttons/Search'
import CustomDateRangePicker from 'components/DateTime/DateRangePicker'
import HeaderPage from 'components/HeaderPage'
import CreateOrUpdateWarehouseImportOrder from 'components/Modal/Purchase/CreateWarehouseImportOrder'
import colors from 'constants/colors'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { HiOutlineTrash } from 'react-icons/hi'
import { TbEdit, TbEye } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { getListWarehouseImportOrder } from '../../../redux/purchase/purchase.action'
import {
  listWarehouseImportOrderState,
  totalPageOfWarehouseImportOrderState
} from '../../../redux/purchase/purchase.selectors'
import { useStyles } from './styles'
import {
  detailWarehouseImportOrdersState,
  listWarehouseExportQROrdersState
} from '../../../redux/warehouse/warehouse.selectors'
import {
  getDetailWarehouseImportOrdersAction,
  getListWarehouseExportQROrdersAction
} from '../../../redux/warehouse/warehouse.actions'
import DetailWarehouseImportOrderModal from 'components/Modal/Warehouse/DetailWarehouseImportOrder'
import { useRoleCheck } from 'utils'
import { permissionActions } from 'constants/titlePermissions'
import { checkAttributeValue } from 'common/common'
import { STATUS_REGISTRATION } from 'constants/statusWarehouseRegistration'

function WarehouseRegistration() {
  const { t } = useTranslation()
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isSuperAdmin, userInfo } = useRoleCheck()
  const permissionsData = useMemo(
    () => (Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : []),
    [userInfo]
  )

  const [selectedRange, setSelectedRange] = useState([])
  const [open, setOpen] = useState(false)
  const [statusId, setStatusId] = React.useState('')
  const [search, setSearch] = React.useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [importOrder, setImportOrder] = useState({})

  const dataWarehouseImportOrders = useSelector(listWarehouseImportOrderState)
  const totalPagesOfTable = useSelector(totalPageOfWarehouseImportOrderState)
  const detailWarehouseRegistration = useSelector(detailWarehouseImportOrdersState)
  const listWarehouseExportQROrders = useSelector(listWarehouseExportQROrdersState)
  const handlePageChange = (event, page) => {
    setCurrentPage(page)
    dispatch(
      getListWarehouseImportOrder({
        page,
        fromDate: selectedRange[0],
        toDate: selectedRange[1],
        warehouseImportOrderStatusId: statusId,
        warehouseImportOrderCode: search
      })
    )
  }

  const handleOpenEditDialog = (dataOrder) => {
    setOpen(true)
    setImportOrder(dataOrder)
  }

  const handleOpenDialog = () => {
    setOpen(true)
    setImportOrder({})
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleDateRangeChange = (range) => {
    setCurrentPage(1)
    setSelectedRange(range)
  }

  const handleChangeTextSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleClearSearch = (event) => {
    setCurrentPage(1)
    setSearch('')
    dispatch(
      getListWarehouseImportOrder({
        page: currentPage,
        fromDate: selectedRange[0],
        toDate: selectedRange[1],
        warehouseImportOrderStatusId: statusId,
        warehouseImportOrderCode: ''
      })
    )
  }

  const handleView = useCallback(
    (Id) => {
      dispatch(getListWarehouseExportQROrdersAction(Id))
      dispatch(getDetailWarehouseImportOrdersAction(Id))
      setModalOpen(true)
    },
    [dispatch]
  )

  const handleClose = () => setModalOpen(false)

  const headers = useMemo(
    () => [
      {
        key: 'codeOrder',
        label: t('codeOrder'),
        align: 'left'
      },
      {
        key: 'warehouseOrder',
        label: t('warehouseOrder'),
        align: 'left'
      },
      {
        key: 'creationTime',
        label: t('creationTime')
      },
      {
        key: 'timeOfWarehouse',
        label: t('timeOfWarehouse')
      },
      {
        key: 'status',
        label: t('status')
      },
      {
        key: 'actions',
        label: t('actions')
      }
    ],
    [t]
  )

  const rows = useMemo(() => {
    return dataWarehouseImportOrders.map((order) => {
      return {
        codeOrder: {
          label: order.origin?.origin_name,
          align: 'left',
          cellWithButton: true
        },
        warehouseOrder: {
          label: order.code,
          align: 'left',
          cellWithButton: true
        },
        creationTime: {
          label: order.created_at,
          cellWithButton: true
        },
        timeOfWarehouse: {
          label: order.import_date,
          cellWithButton: true
        },
        status: {
          label: order.warehouse_import_order_status_name,
          cellWithButton: true
        },
        actions: {
          label: (
            <>
              {(isSuperAdmin ||
                checkAttributeValue(
                  permissionsData,
                  'name',
                  permissionActions.DETAIL_REGISTER_TO_IMPORT_WAREHOUSE
                )) && (
                <IconButton onClick={() => handleView(order.id)}>
                  <TbEye style={{ color: colors.lightroyalblueColor }} />
                </IconButton>
              )}
              {order.warehouse_import_order_status_id === STATUS_REGISTRATION.WAITING &&
                (isSuperAdmin ||
                  checkAttributeValue(
                    permissionsData,
                    'name',
                    permissionActions.UPDATE_REGISTER_TO_IMPORT_WAREHOUSE
                  )) && (
                  <IconButton onClick={() => handleOpenEditDialog(order)}>
                    <TbEdit style={{ color: colors.amberColor }} />
                  </IconButton>
                )}
              {false && (
                <>
                  {order.warehouse_import_order_status_id === STATUS_REGISTRATION.WAITING &&
                    (isSuperAdmin ||
                      checkAttributeValue(
                        permissionsData,
                        'name',
                        permissionActions.DELETE_REGISTER_TO_IMPORT_WAREHOUSE
                      )) && (
                      <IconButton>
                        <HiOutlineTrash style={{ color: colors.scarletredColor }} />
                      </IconButton>
                    )}
                </>
              )}
            </>
          )
        },
        id: {
          label: order.id
        }
      }
    })
  }, [dataWarehouseImportOrders, handleView, isSuperAdmin, permissionsData])

  useEffect(() => {
    dispatch(
      getListWarehouseImportOrder({
        fromDate: selectedRange[0],
        toDate: selectedRange[1],
        warehouseImportOrderStatusId: statusId,
        warehouseImportOrderCode: search
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRange, statusId, dispatch, open])

  const handleSearch = () => {
    dispatch(
      getListWarehouseImportOrder({
        page: currentPage,
        fromDate: selectedRange[0],
        toDate: selectedRange[1],
        warehouseImportOrderStatusId: statusId,
        warehouseImportOrderCode: search
      })
    )
  }

  const listStatus = useMemo(
    () => [
      { id: STATUS_REGISTRATION.WAITING, label: t('waiting') },
      { id: STATUS_REGISTRATION.IN_PROGRESS, label: t('inProgress') },
      { id: STATUS_REGISTRATION.COMPLETE, label: t('complete') }
    ],
    [t]
  )

  return (
    <>
      <HeaderPage
        title={t('warehouseRegistration')}
        actionButton={
          (isSuperAdmin ||
            checkAttributeValue(permissionsData, 'name', permissionActions.CREATE_REGISTER_TO_IMPORT_WAREHOUSE)) && (
            <Button
              startIcon={<AddCircleOutline fontSize="small" />}
              onClick={handleOpenDialog}
              className={`modalButtonClick `}
            >
              {t('createWarehouseImportOrder')}
            </Button>
          )
        }
      />
      <Box className={classes.wrapTable}>
        <Box>
          <Typography variant="h6" className={classes.title}>
            {t('listOfOrdersToBeImportedIntoTheWarehouse')}
          </Typography>
          <Box marginY={1} mb={2} className={classes.wrapSearchBox}>
            <SearchBar
              buttonText={t('find')}
              placeholderText={t('placeholderSearchWarehouseRegistration')}
              searchValue={search}
              handleOnChangeValue={handleChangeTextSearch}
              handleSearch={handleSearch}
              handleClearSearch={handleClearSearch}
              textFieldProps={undefined}
            />

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Autocomplete
                popupIcon={<PolygonIcon />}
                size="small"
                className="autocomplete-container"
                options={listStatus ?? []}
                onChange={(event, value) => setStatusId(value ? value.id : '')}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => <TextField {...params} placeholder={t('status')} variant="outlined" />}
                ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                classes={{ inputRoot: 'custom-input-search' }}
              />
              <CustomDateRangePicker
                onChange={handleDateRangeChange}
                mode={undefined}
                onSelect={true}
                dataCustomerDetail={undefined}
                dataStatisticProposal={undefined}
                none={undefined}
                noDisplayLabel={true}
              />
            </Box>
          </Box>
        </Box>
        <BasicTable
          headers={headers}
          rows={rows}
          showIndex
          totalPages={totalPagesOfTable}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          navigateToDetail={
            isSuperAdmin ||
            checkAttributeValue(permissionsData, 'name', permissionActions.DETAIL_REGISTER_TO_IMPORT_WAREHOUSE)
              ? handleView
              : () => {}
          }
        />
        {modalOpen && (
          <DetailWarehouseImportOrderModal
            isExport={false}
            warehouseOrderName={detailWarehouseRegistration?.warehouse_import_order_name}
            open={modalOpen}
            dataDetail={detailWarehouseRegistration}
            handleCloseModal={handleClose}
            dataPrintQR={listWarehouseExportQROrders}
          />
        )}
      </Box>
      {open && <CreateOrUpdateWarehouseImportOrder open={open} onClose={handleCloseDialog} importOrder={importOrder} />}
    </>
  )
}

export default WarehouseRegistration
