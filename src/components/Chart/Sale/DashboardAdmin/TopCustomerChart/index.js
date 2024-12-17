import { useTranslation } from 'react-i18next'
import colors from '../../../../../constants/colors'
import { Box, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Typography from '@mui/material/Typography'
import { BarChart } from '@mui/x-charts'
import '../../../../../resource/style/ChartStyle.css'
import { formatCurrency } from '../../../../../common/common'

const chartSetting = {
  xAxis: [
    {
      label: '(VND)'
    }
  ],
  margin: { left: 90 }
}

const valueFormatter = (value) => `${formatCurrency(value)}`
export default function TopCustomerChart({ topCustomer }) {
  const [barChartData, setBarChartData] = useState([
    {
      total_revenue: 0,
      customer_name: ''
    }
  ])

  const { t } = useTranslation()
  const [chartWidth, setChartWidth] = useState(522)
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 1708) {
        setChartWidth(482)
      } else if (window.innerWidth >= 1708 && window.innerWidth <= 1812) {
        setChartWidth(650)
      } else {
        setChartWidth(700)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const splitStringBySpaceAndLength = (str, maxLength) => {
    if (str.length <= maxLength) return str;

    const words = str.split(' ');
    let currentLine = '';
    const result = [];

    words.forEach((word) => {
      if (currentLine.length + word.length + 1 <= maxLength) {
        currentLine += (currentLine.length > 0 ? ' ' : '') + word;
      } else {
        result.push(currentLine);
        currentLine = word;
      }
    });

    if (currentLine.length > 0) {
      result.push(currentLine);
    }

    return result.join('\n');
  };

  useEffect(() => {
    if (topCustomer && topCustomer.length === 0) {
      setBarChartData([
        {
          total_revenue: 0,
          customer_name: ''
        }
      ])
    } else {
      const newData = topCustomer.map((item) => ({
        total_revenue: item.total_revenue,
        customer_name: splitStringBySpaceAndLength(item.customer_name, 15)
      }));
      setBarChartData(newData)
    }
  }, [topCustomer])

  return (
    <Box
      sx={{
        height: '410px',
        bgcolor: colors.lilywhiteColor,
        p: 2,
        borderRadius: '10px',
        boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)'
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: '12px' }} gutterBottom>
        {t('topCustomer')}
      </Typography>
      {topCustomer && topCustomer.length === 0 ? (
        <Typography sx={{ width: 550, height: 340, textAlign: 'center' }}>{t('noData')}</Typography>
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BarChart
            dataset={barChartData}
            yAxis={[{ scaleType: 'band', dataKey: 'customer_name' }]}
            series={[{ dataKey: 'total_revenue', valueFormatter }]}
            layout="horizontal"
            grid={{ vertical: true }}
            width={chartWidth}
            height={360}
            {...chartSetting}
          />
        </Box>
      )}
    </Box>
  )
}
