// @ts-nocheck
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import colors from '../../../constants/colors'
import { useDispatch, useSelector } from 'react-redux'
import {
  dataWarehouseProductManagementExportState,
  getDataExportManagementFlagState,
  listAllWarehouseState,
  productListState,
  productTotalPagesState
} from '../../../redux/product/product.selectors'
import {
  getAllWarehouseAction,
  getExportProductAction,
  getListProductAction,
  updateStatusDataExportProductFlagAction
} from '../../../redux/product/product.actions'
import HeaderPage from 'components/HeaderPage'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import PolygonIcon from '../../../asset/icon/Polygon.svg'
import DownloadExcel from '../../../components/Buttons/DownloadExcel'
import headerCsvFileExportWarehouseProductManagement from '../../../constants/headerCsvFileExportWarehouseProductManagement'
import SearchBar from '../../../components/Buttons/Search/index'
import BasicTable from '../../../components/BasicTable'
import { formatNumber } from '../../../common/common'
import Button from '@mui/material/Button'
import { TbEye } from 'react-icons/tb'
import { Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function WarehouseProductManagementPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const totalPages = useSelector(productTotalPagesState)
  const productList = useSelector(productListState)
  const listAllWarehouse = useSelector(listAllWarehouseState)
  const [searchValue, setSearchValue] = useState(null)
  const [loading, setLoading] = useState(false)
  const [selectedWarehouse, setSelectedWarehouse] = useState(null)
  const [fileName, setFileName] = useState('')
  const dataWarehouseProductManagementExport = useSelector(dataWarehouseProductManagementExportState)
  const getDataExportManagementFlag = useSelector(getDataExportManagementFlagState)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(getAllWarehouseAction())
  }, [dispatch])

  useEffect(() => {
    const searchValue = localStorage.getItem('searchValue')
    const selectedWarehouse = localStorage.getItem('selectedWarehouse')
    if (searchValue && selectedWarehouse) {
      setSearchValue(searchValue)
      setSelectedWarehouse(JSON.parse(selectedWarehouse))
    } else {
      if (searchValue) {
        setLoading(true)
        setCurrentPage(1)
        dispatch(
          getListProductAction({
            search_product_warehouse: searchValue,
            warehouse_id: selectedWarehouse?.id
          })
        ).then(() => {
          setLoading(false)
        })
      } else if (selectedWarehouse) {
        setSelectedWarehouse(JSON.parse(selectedWarehouse))
      } else {
        dispatch(getListProductAction())
      }
    }
  }, [])

  const handlePageChange = (event, page) => {
    setLoading(true)
    setCurrentPage(page)
    dispatch(
      getListProductAction({
        search_product_warehouse: searchValue,
        page,
        warehouse_id: selectedWarehouse?.id
      })
    ).then(() => {
      setLoading(false)
    })
  }

  const handleOnChangeValue = (e) => {
    const value = e.target.value
    setSearchValue(value)
    localStorage.setItem('searchValue', value)
  }

  useEffect(() => {
    if (selectedWarehouse) {
      handleSearch()
    }
  }, [selectedWarehouse])

  const handleSearch = () => {
    setLoading(true)
    setCurrentPage(1)
    dispatch(getListProductAction({ search_product_warehouse: searchValue, warehouse_id: selectedWarehouse?.id })).then(
      () => {
        setLoading(false)
      }
    )
  }

  const handleClearSearch = () => {
    setLoading(true)
    setCurrentPage(1)
    setSearchValue('')
    localStorage.removeItem('searchValue')
    dispatch(getListProductAction({ warehouse_id: selectedWarehouse?.id })).then(() => {
      setLoading(false)
    })
  }

  const handleClearSearchBranch = useCallback(() => {
    setSelectedWarehouse(null)
    setCurrentPage(1)
    localStorage.removeItem('selectedWarehouse')
    dispatch(getListProductAction({ search_product_warehouse: searchValue })).then(() => {
      setLoading(false)
    })
  }, [dispatch, searchValue])

  const handleExportExcel = () => {
    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2)
    const currentDay = ('0' + currentDate.getDate()).slice(-2)
    const currentHour = ('0' + currentDate.getHours()).slice(-2)
    const currentMinute = ('0' + currentDate.getMinutes()).slice(-2)
    const dateString = `${currentYear}${currentMonth}${currentDay}${currentHour}${currentMinute}_`
    const fileName = `${dateString}${t('listProductsOrMaterialInStoredData')}`
    const fileNameWithExtension = `${fileName}.xlsx`
    setFileName(fileNameWithExtension)
    dispatch(getExportProductAction({ search_product_warehouse: searchValue, warehouse_id: selectedWarehouse?.id }))
  }

  const updateFlagCallBack = () => {
    dispatch(updateStatusDataExportProductFlagAction())
  }

  const handleView = (productId) => {
    navigate(`/warehouse/productManagement/product-detail?id=${productId}`)
  }

  const headers = useMemo(
    () => [
      {
        key: 'commodityDode',
        label: t('commodityDode'),
        align: 'left'
      },
      {
        key: 'itemName',
        label: t('itemName'),
        align: 'left'
      },
      {
        key: 'width',
        label: `${t('width')} (cm)`,
        align: 'right'
      },
      {
        key: 'length',
        label: `${t('length')} (m)`,
        align: 'right'
      },
      {
        key: 'quantity',
        label: t('quantity'),
        align: 'right'
      },
      {
        key: 'format',
        label: t('format'),
        align: 'left'
      },
      {
        key: 'warehouses',
        label: t('warehouses'),
        align: 'left'
      },
      {
        key: 'location',
        label: t('location'),
        align: 'left'
      },
      {
        key: 'numberOfMetersSquare',
        label: t('numberOfMetersSquare'),
        align: 'right'
      },
      {
        key: 'numberOfDaysInStored',
        label: t('numberOfDaysInStored'),
        align: 'right'
      },
      {
        key: 'dateOfImport',
        label: t('dateOfImport')
      },
      {
        key: 'dateOfFormation',
        label: t('dateOfFormation')
      },
      {
        key: 'note',
        label: t('note'),
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
    return productList.map((row) => ({
      commodityDode: {
        label: row.code,
        cellWithButton: true
      },
      itemName: {
        label: row.product_name,
        cellWithButton: true
      },
      width: {
        label: `${formatNumber(row.width)}`,
        cellWithButton: true
      },
      length: {
        label: `${formatNumber(row.length)}`,
        cellWithButton: true
      },
      quantity: {
        label: row.quantity,
        cellWithButton: true
      },
      format: {
        label: row.finished_product_form?.finished_product_form_name,
        cellWithButton: true
      },
      warehouses: {
        label: row.warehouse?.warehouse_name,
        cellWithButton: true
      },
      location: {
        label: row.warehouse_location?.warehouse_location_name,
        cellWithButton: true
      },
      numberOfMetersSquare: {
        label: formatNumber(row.square_meter),
        cellWithButton: true
      },
      numberOfDaysInStored: {
        label: formatNumber(row.inventory_period),
        cellWithButton: true
      },
      dateOfImport: {
        label: row.created_at,
        cellWithButton: true
      },
      dateOfFormation: {
        label: row.created_at,
        cellWithButton: true
      },
      note: {
        label: (
          <Tooltip title={row.note || ''}>
            {row.note && row.note.length > 5
              ? `${row.note.substring(0, 5)}...`
              : row.note || ''}
          </Tooltip>
        ),
        cellWithButton: true
      },
      actions: {
        label: (
          <>
            <Button className="button-action" onClick={() => handleView(row.id)}>
              <TbEye style={{ color: colors.lightroyalblueColor }} />
            </Button>
          </>
        ),
        cellWithButton: true
      },
      id: {
        label: row.id
      }
    }))
  }, [productList])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <HeaderPage title={t('inventoryManagement')} />
      <Box p={2}>
        <Box sx={{ width: '100%', borderBottom: 1, borderColor: 'divider' }}>
          <Box
            component="form"
            sx={{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', p: 2, position: 'relative' }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography className="frontpager">{t('listProductsOrMaterialInStored')}</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '10px',
                marginBottom: '10px'
              }}
            >
              <SearchBar
                searchValue={searchValue}
                handleOnChangeValue={handleOnChangeValue}
                handleSearch={handleSearch}
                handleClearSearch={handleClearSearch}
                placeholderText="enterProductNameAndProductCode"
                buttonText="find"
              />
              <Box>
                <Autocomplete
                  popupIcon={<PolygonIcon />}
                  noOptionsText={t('noResult')}
                  size="small"
                  sx={{ width: 220 }}
                  onChange={(event, newValue) => {
                    setSelectedWarehouse(newValue)
                    localStorage.setItem('selectedWarehouse', JSON.stringify(newValue))
                    if (!newValue) {
                      handleClearSearchBranch()
                    }
                  }}
                  value={selectedWarehouse}
                  options={listAllWarehouse}
                  getOptionLabel={(options) => (options.warehouse_name ? options.warehouse_name : '')}
                  renderInput={(params) => <TextField {...params} placeholder={t('warehouses')} variant="outlined" />}
                  ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                  classes={{ inputRoot: 'custom-input-search' }}
                />
              </Box>
              <Box sx={{ marginLeft: 'auto' }}>
                <DownloadExcel
                  csvHeader={headerCsvFileExportWarehouseProductManagement}
                  data={dataWarehouseProductManagementExport}
                  actionGetData={handleExportExcel}
                  flagGetDetail={getDataExportManagementFlag}
                  updateFlagCallBack={updateFlagCallBack}
                  filename={fileName}
                />
              </Box>
            </Box>
            {!loading && (
              <BasicTable
                loading={loading}
                headers={headers}
                rows={rows}
                totalPages={totalPages}
                currentPage={currentPage}
                showIndex
                handlePageChange={handlePageChange}
                navigateToDetail={handleView}
                minWidth={1500}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default WarehouseProductManagementPage
