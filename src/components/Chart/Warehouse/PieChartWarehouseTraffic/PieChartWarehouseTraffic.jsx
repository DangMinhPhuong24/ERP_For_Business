import { Box, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts'
import { checkStatusInWareHouse, convertDataPieChart, formatNumber } from 'common/common'
import React from 'react'

const PieChartWarehouseTraffic = (props) => {
  const { dataPieChart, label } = props
  const pieParams = {
    height: 200,
    margin: { right: 5 },
    slotProps: { legend: { hidden: true } }
  }

  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <Typography
        variant="h5"
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          color: '#348ad0',
          fontWeight: '500'
        }}
      >
        {formatNumber(dataPieChart)}%
      </Typography>
      <PieChart
        {...pieParams}
        series={[
          {
            valueFormatter: () => formatNumber(dataPieChart) + '%',
            data: [
              {
                label: label,
                value: dataPieChart,
                color: checkStatusInWareHouse(dataPieChart)[0]
              }
            ],
            innerRadius: 70,
            outerRadius: 100,
            paddingAngle: 2,
            cornerRadius: 2,
            startAngle: convertDataPieChart(dataPieChart),
            endAngle: 0
          }
        ]}
      />
    </Box>
  )
}

export default PieChartWarehouseTraffic
