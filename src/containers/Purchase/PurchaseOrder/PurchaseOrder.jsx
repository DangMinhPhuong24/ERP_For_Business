import { AddCircleOutlineRounded } from '@mui/icons-material'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbEdit, TbEye } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PolygonIcon from '../../../asset/icon/Polygon.svg'
import { checkAttributeValue, formatNumber } from '../../../common/common'
import BasicTable from '../../../components/BasicTable'
import SearchBar from '../../../components/Buttons/Search'
import CustomDateRangePicker from '../../../components/DateTime/DateRangePicker'
import HeaderPage from '../../../components/HeaderPage'
import ModalDelete from '../../../components/Modal/Common/delete'
import colors from '../../../constants/colors'
import { permissionActions } from '../../../constants/titlePermissions'
import {
  deletePurchaseOrderAction,
  getAllPurchaseOrdersStatusAction,
  getListPurchaseOrderAction
} from '../../../redux/purchase/purchase.action'
import {
  deletePurchaseOrderSuccessMessageState,
  listAllPurchaseOrderStatusState,
  listPurchaseOrderState,
  totalPagesListPurchaseOrderState
} from '../../../redux/purchase/purchase.selectors'
import { useRoleCheck } from '../../../utils'
import CreatePurchaseOrderIcon from "../../../asset/icon/CreatePurchaseOrderIcon.svg";
import CreateOrUpdateWarehouseImportOrder from "../../../components/Modal/Purchase/CreateWarehouseImportOrder";

function PurchaseOrderPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isSuperAdmin, userInfo } = useRoleCheck()
  const permissionsData = useMemo(
    () => (Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : []),
    [userInfo]
  )
  const listPurchaseOrder = useSelector(listPurchaseOrderState)
  const totalPagesListPurchaseOrder = useSelector(totalPagesListPurchaseOrderState)
  const [searchValue, setSearchValue] = useState('')
  const [statusPurchaseOrderId, setStatusPurchaseOrderId] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const listAllPurchaseOrderStatus = useSelector(listAllPurchaseOrderStatusState)
  const [selectedRange, setSelectedRange] = useState([])
  const deletePurchaseOrderSuccessMessage = useSelector(deletePurchaseOrderSuccessMessageState)
  const searchStatusPurchaseOrder = localStorage.getItem('searchStatusPurchaseOrder')
  const selectedRangeLocal = JSON.parse(localStorage.getItem('selectedRange'))
  const searchPurchaseOrderValue = localStorage.getItem('searchPurchaseOrderValue')
  const [open, setOpen] = useState(false)
  const [importOrder, setImportOrder] = useState({})
  const [purchaseOrderId, setPurchaseOrderId] = useState(null)

  useEffect(() => {
    if (searchStatusPurchaseOrder || selectedRangeLocal || searchPurchaseOrderValue) {
      if (Array.isArray(selectedRangeLocal) && selectedRangeLocal.length > 1) {
        setSelectedRange(selectedRangeLocal || [])
      }
      if (searchStatusPurchaseOrder) {
        setStatusPurchaseOrderId(searchStatusPurchaseOrder)
      }
      if (searchPurchaseOrderValue) {
        setSearchValue(searchPurchaseOrderValue)
      }
    } else {
      dispatch(getListPurchaseOrderAction())
    }
    dispatch(getAllPurchaseOrdersStatusAction())
  }, [])

  useEffect(() => {
    const startDate =
      selectedRange[0] ||
      (Array.isArray(selectedRangeLocal) && selectedRangeLocal.length > 1 ? selectedRangeLocal[0] : '')
    const endDate =
      selectedRange[1] ||
      (Array.isArray(selectedRangeLocal) && selectedRangeLocal.length > 1 ? selectedRangeLocal[1] : '')
    setLoading(true)
    dispatch(
      getListPurchaseOrderAction({
        status_id: statusPurchaseOrderId || searchStatusPurchaseOrder,
        code: searchValue || searchPurchaseOrderValue,
        start_date: startDate,
        end_date: endDate
      })
    ).then(() => {
      setLoading(false)
    })
    setCurrentPage(1)
  }, [selectedRange, statusPurchaseOrderId, deletePurchaseOrderSuccessMessage, dispatch])

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
    setLoading(true)
    dispatch(
      getListPurchaseOrderAction({
        status_id: statusPurchaseOrderId,
        page,
        code: searchValue,
        start_date: selectedRange[0],
        end_date: selectedRange[1]
      })
    ).then(() => {
      setLoading(false)
    })
  }

  const handleView = (Id) => {
    if (statusPurchaseOrderId) {
      localStorage.setItem('searchStatusPurchaseOrder', statusPurchaseOrderId)
    }
    if (selectedRange.length > 0) {
      localStorage.setItem('selectedRange', JSON.stringify(selectedRange))
    }
    localStorage.setItem('searchPurchaseOrderValue', searchValue)
    navigate(`/purchase/detail-purchase-view?id=${Id}`)
  }

  const handleOpenUpdate = (id) => {
    navigate(`/purchase/edit?id=${id}`)
  }

  const handleOpenDialog = (purchaseOrderId) => {
    setPurchaseOrderId(purchaseOrderId)
    setImportOrder({})
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setPurchaseOrderId(null)
    setOpen(false)
  }

  const handleOpenCreate = () => {
    navigate(`/purchase/create`)
  }

  const deletePurchaseOrder = useCallback((param) => {
    dispatch(deletePurchaseOrderAction(param))
  }, [])

  const headers = useMemo(
    () => [
      {
        key: 'codeOrder',
        label: t('codeOrder')
      },
      {
        key: 'supplier',
        label: t('supplier'),
        align: 'left'
      },
      {
        key: 'totalValue',
        label: t('totalValue'),
        align: 'right'
      },
      {
        key: 'creationTime',
        label: t('creationTime')
      },
      {
        key: 'status',
        label: t('status'),
        align: 'left'
      },
      {
        key: 'actions',
        label: t('actions')
      }
    ],
    [t]
  )

  const rows = useMemo(() => {
    return listPurchaseOrder.map((row) => ({
      codeOrder: {
        label: row.code,
        cellWithButton: true
      },
      supplier: {
        label: row.supplier.supplier_name,
        cellWithButton: true
      },
      totalValue: {
        label: (
          <>
            {formatNumber(row.purchase_order_product_total)} {row.supplier.currency_unit.name}
          </>
        ),
        cellWithButton: true
      },
      creationTime: {
        label: row.created_at,
        cellWithButton: true
      },
      status: {
        label: row.status.name,
        cellWithButton: true
      },
      actions: {
        label: (
          <>
            {(isSuperAdmin ||
              checkAttributeValue(permissionsData, 'name', permissionActions.DETAIL_PURCHASING_ORDER)) && (
                <Button onClick={() => handleView(row.id)} className="button-action">
                  <TbEye style={{ color: colors.lightroyalblueColor, width: 24, height: 24 }} />
                </Button>
              )}
            {(isSuperAdmin ||
              checkAttributeValue(permissionsData, 'name', permissionActions.UPDATE_PURCHASING_ORDER)) && (
                <Button className="button-action" onClick={() => handleOpenUpdate(row.id)}>
                  <TbEdit style={{ color: colors.amberColor, width: 24, height: 24 }} />
                </Button>
              )}
            {(isSuperAdmin ||
              checkAttributeValue(permissionsData, 'name', permissionActions.CREATE_REGISTER_TO_IMPORT_WAREHOUSE))
              && row.status?.id === 2 && (
              <Button className="button-action" onClick={() => handleOpenDialog(row.id)}>
                <CreatePurchaseOrderIcon/>
              </Button>
            )}
            {(isSuperAdmin ||
              checkAttributeValue(permissionsData, 'name', permissionActions.DELETE_PURCHASING_ORDER)) && (
                <ModalDelete
                  successMessage={deletePurchaseOrderSuccessMessage}
                  id={row.id}
                  buttonName={t('delete')}
                  handleDelete={deletePurchaseOrder}
                  disable={row.is_disabled}
                  tooltipMessage={t('onlyDraftPrPlacedPurchaseOrdersCanBeDeleted')}
                />
              )}
          </>
        )
      },
      id: {
        label: row.id
      }
    }))
  }, [listPurchaseOrder, permissionsData, isSuperAdmin, permissionActions])

  const handleDateRangeChange = (range) => {
    setSelectedRange(range)
  }

  const handleFindClick = () => {
    setCurrentPage(1)
    setLoading(true)
    dispatch(
      getListPurchaseOrderAction({
        status_id: statusPurchaseOrderId,
        code: searchValue,
        start_date: selectedRange[0],
        end_date: selectedRange[1]
      })
    ).then(() => {
      setLoading(false)
    })
  }

  const handleClear = () => {
    setSearchValue('')
    setCurrentPage(1)
    setLoading(true)
    localStorage.removeItem('searchPurchaseOrderValue')
    dispatch(
      getListPurchaseOrderAction({
        status_id: statusPurchaseOrderId,
        start_date: selectedRange[0],
        end_date: selectedRange[1]
      })
    ).then(() => {
      setLoading(false)
    })
  }

  return (
    <>
      <HeaderPage
        title={t('purchaseOrderManagement')}
        actionButton={
          <Button
            sx={{ gap: '8px' }}
            onClick={handleOpenCreate}
            className={`addButton ${!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.CREATE_PURCHASING_ORDER) ? 'disabled-cursor' : ''}`}
            disabled={
              !isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.CREATE_PURCHASING_ORDER)
            }
          >
            <AddCircleOutlineRounded style={{ fontSize: '16px', marginBottom: '2px' }} />
            {t('createPurchaseOrder')}
          </Button>
        }
      />
      <Box p={2}>
        <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
          <Box
            component="form"
            sx={{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', p: 2, position: 'relative' }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography className="frontpager">{t('purchaseOrderList')}</Typography>
            </Box>
            <Box
              sx={{
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <SearchBar
                  searchValue={searchValue}
                  handleOnChangeValue={(e) => setSearchValue(e.target.value)}
                  handleSearch={handleFindClick}
                  handleClearSearch={handleClear}
                  placeholderText="enterPurchaseOrderNumber"
                  buttonText="find"
                />
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Autocomplete
                  popupIcon={<PolygonIcon />}
                  size="small"
                  className="autocomplete-container"
                  options={listAllPurchaseOrderStatus ? listAllPurchaseOrderStatus : []}
                  value={
                    listAllPurchaseOrderStatus.find((option) => option.id === Number(statusPurchaseOrderId)) || null
                  }
                  onChange={(event, value) => {
                    if (value) {
                      setStatusPurchaseOrderId(value.id)
                    } else {
                      setStatusPurchaseOrderId('')
                      localStorage.removeItem('searchStatusPurchaseOrder')
                    }
                  }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => <TextField {...params} placeholder={t('status')} variant="outlined" />}
                  ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                  classes={{ inputRoot: 'custom-input-search' }}
                />
                <CustomDateRangePicker
                  onChange={handleDateRangeChange}
                  noDisplayLabel={true}
                  value={selectedRange}
                  onSelect={true}
                />
              </Box>
            </Box>
            <Box
              component="form"
              sx={{
                bgcolor: colors.lilywhiteColor,
                borderRadius: '10px',
                position: 'relative',
                mt: 2
              }}
            >
              {!loading && (
                <BasicTable
                  loading={loading}
                  headers={headers}
                  rows={rows}
                  totalPages={totalPagesListPurchaseOrder}
                  currentPage={currentPage}
                  showIndex
                  handlePageChange={handlePageChange}
                  navigateToDetail={handleView}
                />
              )}
            </Box>
            <CreateOrUpdateWarehouseImportOrder
              isCreatePurchaseOrderId={true}
              open={open}
              onClose={handleCloseDialog}
              purchaseOrderId={purchaseOrderId}
              importOrder={importOrder}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default PurchaseOrderPage
