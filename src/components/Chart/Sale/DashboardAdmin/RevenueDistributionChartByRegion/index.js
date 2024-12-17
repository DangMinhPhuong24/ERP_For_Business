import { Box, Typography } from '@mui/material'
import { PieChart } from '@mui/x-charts/PieChart'
import { isEmpty } from 'lodash'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import colors from '../../../../../constants/colors'

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export default function RevenueDistributionChartByRegion({ revenueByRegion }) {
  const { t } = useTranslation()

  const pieChart = useMemo(
    () =>
      revenueByRegion
        .filter((revenue) => {
          return revenue.id !== null
        })
        .map((item) => ({
          value: item.revenue_by_region,
          label: item ? item?.district_name : t('unknown'),
          color: getRandomColor()
        })),
    [revenueByRegion, t]
  )

  return (
    <Box
      sx={{
        backgroundColor: colors.lilywhiteColor,
        p: 2,
        mt: 2,
        borderRadius: '10px',
        boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
        display: 'grid',
        height: '344px',
        alignContent: 'center',
        justifyItems: 'center'
      }}
    >
      <Typography sx={{ fontWeight: 700, fontSize: '12px' }} gutterBottom>
        {t('revenueDistributionChartByRegion')}
      </Typography>
      {(revenueByRegion && revenueByRegion.length === 0) || isEmpty(pieChart) ? (
        <Typography sx={{ width: 500, height: 280, textAlign: 'center' }}>{t('noData')}</Typography>
      ) : (
        <PieChart
          series={[
            {
              data: pieChart,
              innerRadius: 30
            }
          ]}
          width={500}
          height={290}
          margin={{ right: 300 }}
          slotProps={{
            legend: {
              direction: 'column',
              position: {
                vertical: 'top',
                horizontal: 'right'
              },
              itemMarkWidth: 10,
              itemMarkHeight: 10,
              markGap: 5,
              itemGap: 10
            }
          }}
        />
      )}
    </Box>
  )
}
