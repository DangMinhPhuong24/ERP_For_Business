import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, FormControl, MenuItem, Select, Tab } from '@mui/material'
import HeaderPage from 'components/HeaderPage'
import colors from 'constants/colors'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import WarehouseTraffic from './WarehouseTraffic'
import Inventory from './Inventory'
import {
  listAllWarehousesState,
  listOrderAlertState,
  totalPagesListOrderAlertState
} from '../../../redux/warehouse/warehouse.selectors'
import { useDispatch, useSelector } from 'react-redux'
import { getListAllWarehouseAction, getListOrderAlertAction } from '../../../redux/warehouse/warehouse.actions'
import BasicTable from '../../../components/BasicTable'
import { formatNumber } from '../../../common/common'
import PolygonIcon from 'asset/icon/Polygon.svg'

export default function DashboardWarehousePage() {
  const { t } = useTranslation()
  const [valueTabs, setValueTabs] = useState('1')
  const [loading, setLoading] = useState(false)
  const listOrderAlert = useSelector(listOrderAlertState)
  const totalPagesListOrderAlert = useSelector(totalPagesListOrderAlertState)
  const listAllWarehouses = useSelector(listAllWarehousesState)
  const [selectedWarehouse, setSelectedWarehouse] = React.useState('')
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(getListAllWarehouseAction())
  }, [dispatch])

  useEffect(() => {
    if (listAllWarehouses.length > 0) {
      setSelectedWarehouse(listAllWarehouses[listAllWarehouses.length - 1].id)
    }
  }, [listAllWarehouses])

  useEffect(() => {
    if (selectedWarehouse) {
      setCurrentPage(1)
      dispatch(getListOrderAlertAction({ warehouse_id: selectedWarehouse }))
    }
  }, [selectedWarehouse, dispatch])

  const handleChange = (event) => {
    setSelectedWarehouse(event.target.value)
  }

  const handleChangeTabs = (event, newValueTabs) => {
    setValueTabs(newValueTabs)
  }

  const handlePageChange = (event, page) => {
    setCurrentPage(page)
    setLoading(true)
    dispatch(getListOrderAlertAction({ page, warehouse_id: selectedWarehouse })).then(() => setLoading(false))
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
        key: 'detailedDescription',
        label: t('detailedDescription'),
        align: 'left',
        w: '35%'
      },
      {
        key: 'totalSquareMetersInInventory',
        label: t('totalSquareMetersInInventory'),
        align: 'right'
      },
      {
        key: 'warningSquareMeters',
        label: t('warningSquareMeters'),
        align: 'right',
        color: colors.redColor
      }
    ],
    [t]
  )

  const rows = useMemo(() => {
    return listOrderAlert.map((row, index) => ({
      commodityDode: {
        label: row.code
      },
      itemName: {
        label: row.product_name
      },
      detailedDescription: {
        label: row.description
      },
      totalSquareMetersInInventory: {
        label: formatNumber(row.total_square_meter_product_children)
      },
      warningSquareMeters: {
        label: formatNumber(row.min_inventory)
      },
      id: {
        label: row.id
      }
    }))
  }, [listOrderAlert])

  return (
    <>
      <HeaderPage
        title={t('dashboard')}
        actionButton={
          <Box sx={{ minWidth: 250 }}>
            <FormControl size="small" fullWidth>
              <Select
                IconComponent={PolygonIcon}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedWarehouse}
                onChange={handleChange}
                sx={{
                  backgroundColor: colors.lilywhiteColor,
                  '& .MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center'
                  }
                }}
              >
                {listAllWarehouses.map((warehouse) => (
                  <MenuItem value={warehouse.id}>{`${warehouse.warehouse_name}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
      />
      <Box sx={{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '20px', margin: 2 }}>
        <TabContext value={valueTabs}>
          <Box
            sx={{
              width: '100%',
              borderBottom: 1,
              borderColor: 'divider'
            }}
          >
            <TabList
              onChange={handleChangeTabs}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                minHeight: '30px !important'
              }}
            >
              <Tab className="button-tabs" style={{ minWidth: 180 }} label={t('inventory')} value="1" />
              <Tab className="button-tabs" style={{ minWidth: 180 }} label={t('warehouseTraffic')} value="2" />
              <Tab className="button-tabs" style={{ minWidth: 180 }} label={t('orderAlert')} value="3" />
            </TabList>
          </Box>
          {/*-------------------------------------TAB-PANEL-1--------------------------------------*/}
          <TabPanel sx={{ padding: '0' }} value="1">
            {selectedWarehouse && <Inventory warehouseId={selectedWarehouse} />}
          </TabPanel>
          {/*-------------------------------------TAB-PANEL-2--------------------------------------*/}
          <TabPanel sx={{ padding: '0' }} value="2">
            {selectedWarehouse && <WarehouseTraffic warehouseId={selectedWarehouse} />}
          </TabPanel>
          {/*-------------------------------------TAB-PANEL-3--------------------------------------*/}
          <TabPanel sx={{ padding: '0', mt: '10px' }} value="3">
            {!loading && (
              <BasicTable
                loading={loading}
                headers={headers}
                rows={rows}
                totalPages={totalPagesListOrderAlert}
                currentPage={currentPage}
                showIndex
                handlePageChange={handlePageChange}
              />
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </>
  )
}
