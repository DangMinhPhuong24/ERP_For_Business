import { Box, Button, Divider, Typography } from '@mui/material'
import { checkStatusInWareHouse } from 'common/common'
import PieChartWarehouseTraffic from 'components/Chart/Warehouse/PieChartWarehouseTraffic'
import { optionHorizontalBar, settingSlick } from 'constants'
import colors from 'constants/colors'
import { isEmpty } from 'lodash'
import React, { useEffect, useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick/lib/slider'
import {
  getListDataBarChartWarehouseTraffic,
  getListDataPieChartWarehouseTraffic
} from '../../../../redux/warehouse/warehouse.actions'
import {
  dataBarChartWarehouseTrafficState,
  dataPieChartWarehouseTrafficState
} from '../../../../redux/warehouse/warehouse.selectors'

const WarehouseTraffic = (props) => {
  const { warehouseId } = props
  const { t } = useTranslation()

  const dispatch = useDispatch()

  const dataPieChart = useSelector(dataPieChartWarehouseTrafficState)
  const dataBarChart = useSelector(dataBarChartWarehouseTrafficState)

  useEffect(() => {
    dispatch(getListDataPieChartWarehouseTraffic({ warehouse_id: warehouseId }))
  }, [warehouseId])

  const [warehouse, setWarehouse] = useState({
    id: ''
  })

  useEffect(() => {
    dispatch(
      getListDataBarChartWarehouseTraffic({ warehouse_id: warehouseId, warehouse_location_type_id: warehouse.id })
    )
  }, [warehouse, warehouseId])

  const warehouseLocationTitle = useMemo(() => {
    if (warehouse.id == '') {
      return !isEmpty(dataPieChart) ? dataPieChart[0].warehouse_location_type_name : ''
    } else {
      return !isEmpty(dataPieChart)
        ? dataPieChart.filter((dataChart) => dataChart.id == warehouse.id)[0].warehouse_location_type_name
        : ''
    }
  }, [dataPieChart, warehouse])

  const dataLines = useMemo(() => dataBarChart.map((data) => data.progress), [dataBarChart])

  const dataLabels = useMemo(() => {
    return dataBarChart.map((data) => {
      return data.warehouse_location_name
    })
  }, [dataBarChart])

  const dataEmptyLine = useMemo(() => {
    return dataLines.map((data) => {
      if (data > 100) {
        return 0
      } else {
        return 100 - data
      }
    })
  }, [dataLines])

  const dataColor = useMemo(() => {
    return dataLines.map((data) => {
      return checkStatusInWareHouse(data)[0]
    })
  }, [dataLines])

  const dataColorEmpty = useMemo(() => {
    return dataLines.map((data) => {
      return checkStatusInWareHouse(data)[1]
    })
  }, [dataLines])

  const setHeightBarChart = useMemo(() => {
    return dataLabels.length * 40
  }, [dataLabels])

  return (
    <Box>
      <Typography my={3}>{t('listOfWarehouseTypes')}</Typography>
      <Box sx={{ marginBottom: 2 }}>
        <div className="slider-container">
          <Slider {...settingSlick}>
            {dataPieChart &&
              dataPieChart.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <Button
                      onClick={() => {
                        setWarehouse({ id: data.id })
                      }}
                      sx={{ width: '100%', paddingX: 0, textTransform: 'none' }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%'
                        }}
                      >
                        <Typography
                          sx={{
                            color: colors.blackColor,
                            wordWrap: 'break-word',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            WebkitLineClamp: 1
                          }}
                          variant="body1"
                        >
                          {data.warehouse_location_type_name}
                        </Typography>
                        <Box sx={{ width: '100%', marginY: 2 }}>
                          <PieChartWarehouseTraffic
                            dataPieChart={data.progress_each_warehouse_location}
                            label={data.warehouse_location_type_name}
                          />
                        </Box>
                      </Box>
                    </Button>
                  </React.Fragment>
                )
              })}
          </Slider>
        </div>
      </Box>
      <Divider flexItem />
      <Box>
        <Typography mt={3}>
          {t('listOfAllLocations')} - {warehouseLocationTitle}
        </Typography>

        {isEmpty(dataBarChart) ? (
          <Box p={2}>
            <Typography textAlign={'center'}>
              <em>{t('noData')}</em>
            </Typography>
          </Box>
        ) : (
          <Box sx={{ height: `${setHeightBarChart}px` }}>
            <Bar
              options={optionHorizontalBar}
              data={{
                labels: dataLabels,
                datasets: [
                  {
                    data: dataLines,
                    backgroundColor: dataColor,
                    borderWidth: 0,
                    barPercentage: 0.8,
                    categoryPercentage: 0.6
                  },
                  {
                    label: t('empty'),
                    data: dataEmptyLine,
                    backgroundColor: dataColorEmpty,
                    borderWidth: 0,
                    barPercentage: 0.8,
                    categoryPercentage: 0.6
                  }
                ]
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default WarehouseTraffic
