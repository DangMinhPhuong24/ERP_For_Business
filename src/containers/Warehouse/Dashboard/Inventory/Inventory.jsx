// @ts-nocheck
import { VisibilityOutlined } from '@mui/icons-material'
import { Box, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import 'chartjs-plugin-datalabels'
import { formatNumber } from 'common/common'
import AutocompleteCheckboxesTags from 'components/AutocompleteCheckbox'
import BasicTable from 'components/BasicTable'
import { optionBar } from 'constants'
import colors from 'constants/colors'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getAllWarehouseLocationAction,
  getListDataLongestInventory,
  getListDataTableInventory,
  getListDataTopInventory
} from '../../../../redux/warehouse/warehouse.actions'
import {
  dataLongestInventoryState,
  dataTableInventoryState,
  dataTopInventoryState,
  getListAllWarehouseState,
  totalPageTableInventoryState
} from '../../../../redux/warehouse/warehouse.selectors'

const Inventory = (props) => {
  const { warehouseId } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [indexElementChart, setIndexElementChart] = useState(0)
  const [sortBy, setSortBy] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectWarehouse, setSelectWarehouse] = useState([])

  const listWarehouses = useSelector(getListAllWarehouseState)
  const dataTopInventories = useSelector(dataTopInventoryState)
  const dataLongestInventories = useSelector(dataLongestInventoryState)
  const dataTableInventories = useSelector(dataTableInventoryState)
  const totalPages = useSelector(totalPageTableInventoryState)

  const navigateToDetail = useCallback(
    (productId) => {
      navigate(`/warehouse/productManagement/product-detail?id=${productId}`)
    },
    [navigate]
  )

  const warehouseLocationTypes = useMemo(() => {
    if (selectWarehouse) {
      return selectWarehouse.map((warehouse) => {
        return warehouse.id
      })
    }
  }, [selectWarehouse])

  useEffect(() => {
    dispatch(getAllWarehouseLocationAction())
  }, [])

  useEffect(()=>{
    setSelectWarehouse(listWarehouses)
  },[listWarehouses])

  useEffect(() => {
    dispatch(getListDataTopInventory({ warehouse_id: warehouseId, warehouse_location_type: warehouseLocationTypes }))
  }, [warehouseId, warehouseLocationTypes])

  useEffect(() => {
    dispatch(
      getListDataLongestInventory({ warehouse_id: warehouseId, warehouse_location_type: warehouseLocationTypes })
    )
  }, [warehouseId, warehouseLocationTypes])

  const productDetail = useMemo(() => {
    if (sortBy == 1) {
      return dataTopInventories[indexElementChart] || ''
    } else {
      return dataLongestInventories[indexElementChart] || ''
    }
  }, [dataLongestInventories, dataTopInventories, indexElementChart, sortBy])

  useEffect(() => {
    setLoading(true)
    dispatch(
      getListDataTableInventory({
        warehouse_id: warehouseId,
        sort_by: sortBy,
        product_management_id: productDetail.id,
        page: currentPage,
        warehouse_location_type: warehouseLocationTypes
      })
    ).then(() => {
      setLoading(false)
    })
  }, [productDetail, sortBy, warehouseId, currentPage, warehouseLocationTypes])

  const dataLines = useCallback((listData) => {
    return listData.map((data) => {
      return data.product_with_the_longest_inventory_period ?? data.total_square_meter_product_children
    })
  }, [])

  const dataLabels = useCallback((listData) => {
    return listData.map((data) => {
      return data.product_name
    })
  }, [])

  const headers = useMemo(
    () => [
      {
        key: 'productCode',
        label: t('commodityDode'),
        align: 'left'
      },
      {
        key: 'productName',
        label: t('goodsName'),
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
        key: 'shape',
        label: t('format')
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
        key: 'dateOfEntry',
        label: t('dateOfEntry')
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
    return dataTableInventories.map((row, index) => ({
      productCode: {
        label: row.code,
        cellWithButton: true
      },
      productName: {
        label: row.product_name,
        cellWithButton: true
      },
      length: {
        label: formatNumber(row.length),
        cellWithButton: true
      },
      width: {
        label: formatNumber(row.width),
        cellWithButton: true
      },
      quantity: {
        label: row.quantity,
        cellWithButton: true
      },
      shape: {
        label: row.finished_product_form.finished_product_form_name,
        cellWithButton: true
      },
      warehouses: {
        label: row.warehouse.name,
        cellWithButton: true
      },
      location: {
        label: row.warehouse_location.name,
        cellWithButton: true
      },
      numberOfMetersSquare: {
        label: formatNumber(row.square_meter),
        cellWithButton: true
      },
      numberOfDaysInStored: {
        label: '' + row.inventory_period,
        cellWithButton: true
      },
      dateOfEntry: {
        label: row.created_at,
        cellWithButton: true
      },
      dateOfFormation: {
        label: row.formation_date,
        cellWithButton: true
      },
      note: {
        label: (
          <Tooltip title={row.description}>
            {row.description ? `${row.description.substring(0, 5)}${row.description.length > 5 ? '...' : ''}` : ''}
          </Tooltip>
        ),
        cellWithButton: true
      },
      actions: {
        label: (
          <IconButton onClick={() => navigateToDetail(row.id)} color="primary">
            <VisibilityOutlined />
          </IconButton>
        ),
        cellWithButton: true
      },
      id: {
        label: row.id
      }
    }))
  }, [dataTableInventories, navigateToDetail])

  const titleLegendInStock = useMemo(() => {
    return {
      x: t(''),
      y: t('squareMeters'),
      main: t('topMostInStockProducts', { amount: 10 }),
      sortBy: 1
    }
  }, [t])

  const titleLegendLongest = useMemo(() => {
    return {
      x: t(''),
      y: t('day'),
      main: t('topLongestLastingProducts', { amount: 10 }),
      sortBy: 2
    }
  }, [t])

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
    dispatch(
      getListDataTableInventory({
        warehouse_id: warehouseId,
        sort_by: sortBy,
        product_management_id: productDetail.id,
        page
      })
    )
  }

  const dataMeterOfLongestInventories = useMemo(() => {
    return dataLongestInventories.map((data) => {
      return data.total_square_meter_product_children
    })
  }, [dataLongestInventories])

  return (
    <Box>
      <Box marginY={3}>
        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
          <AutocompleteCheckboxesTags
          selectWarehouse={selectWarehouse}
            dataSelects={listWarehouses}
            setSelectWarehouse={setSelectWarehouse}
            resetCurrentPage={setCurrentPage}
          />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} borderRight={'solid 1px #aaa'} p={2}>
            {dataTopInventories && (
              <Bar
                options={optionBar(t, titleLegendInStock, setIndexElementChart, setSortBy, setCurrentPage)}
                data={{
                  labels: dataLabels(dataTopInventories),
                  datasets: [
                    {
                      data: dataLines(dataTopInventories),
                      backgroundColor: colors.azureblueColor,
                      borderWidth: 0
                    }
                  ]
                }}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6} p={2}>
            {dataLongestInventories && (
              <Bar
                options={optionBar(
                  t,
                  titleLegendLongest,
                  setIndexElementChart,
                  setSortBy,
                  setCurrentPage,
                  dataMeterOfLongestInventories
                )}
                data={{
                  labels: dataLabels(dataLongestInventories),
                  datasets: [
                    {
                      data: dataLines(dataLongestInventories),
                      backgroundColor: colors.orange,
                      borderWidth: 0
                    }
                  ]
                }}
              />
            )}
          </Grid>
        </Grid>
        <Divider />
        <Box>
          <Typography my={3}>
            {t('detailInformation')} {productDetail.product_name ? ` - ${productDetail.product_name}` : ''}
          </Typography>
          <Box>
            {!loading && (
              <BasicTable
                loading={loading}
                headers={headers}
                rows={rows}
                totalPages={totalPages}
                currentPage={currentPage}
                showIndex
                handlePageChange={handlePageChange}
                navigateToDetail={navigateToDetail}
                minWidth={1500}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Inventory
