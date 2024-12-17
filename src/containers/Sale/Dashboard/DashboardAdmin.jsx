import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import colors from '../../../constants/colors'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import RevenueDistributionChartByRegion from '../../../components/Chart/Sale/DashboardAdmin/RevenueDistributionChartByRegion'
import ComprehensiveRevenueChart from '../../../components/Chart/Sale/DashboardAdmin/ComprehensiveRevenueChart'
import TopCustomerChart from '../../../components/Chart/Sale/DashboardAdmin/TopCustomerChart'
import CustomDateRangePicker from '../../../components/DateTime/DateRangePicker'
import ClarityExportSolid from '../../../asset/icon/ClarityExportSolid.svg'
import {
  getListDashBoardSaleForAdminAction,
  getListTopBestSellingAction
} from '../../../redux/dashboard/dashboard.actions'
import { listDashBoardSaleForAdminState, listTopBestSellingState } from '../../../redux/dashboard/dashboard.selectors'
import format from 'date-fns/format'
import { formatCurrencyWithoutSymbol } from '../../../common/common'
import { PDFDownloadLink } from '@react-pdf/renderer'
import DashboardPDFComponent from '../../../components/PDF/dashboardPDF'
import html2canvas from 'html2canvas'
import HeaderPage from 'components/HeaderPage'

const style = {
  bgcolor: colors.lilywhiteColor,
  p: 2,
  mt: 2,
  borderRadius: '10px',
  boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
  display: 'grid'
}

function DashboardAdminPage() {
  const { t } = useTranslation()
  const [selectedRange, setSelectedRange] = useState([
    format(new Date(), 'yyyy/MM/dd'),
    format(new Date(), 'yyyy/MM/dd')
  ])
  const dispatch = useDispatch()
  const listDashBoardAdmin = useSelector(listDashBoardSaleForAdminState)
  const listTopBestSelling = useSelector(listTopBestSellingState)
  const [revenueByRegion, setRevenueByRegion] = useState([])
  const [topCustomer, setTopCustomer] = useState([])
  const now = useMemo(() => new Date(), [])
  const formattedDateTime = useMemo(
    () =>
      ` ${now.getHours()}${now.getMinutes()}${now.getSeconds()}-${now.getDate()}${now.getMonth() + 1}${now.getFullYear()}`,
    [now]
  )
  const filename = useMemo(() => `dashboard-admin-linh-hieu-${formattedDateTime}.pdf`, [formattedDateTime])
  const [dashboardImages, setDashboardImages] = useState({})

  useEffect(() => {
    dispatch(
      getListDashBoardSaleForAdminAction({
        from_date: selectedRange ? selectedRange[0] : '',
        to_date: selectedRange ? selectedRange[1] : ''
      })
    )
    dispatch(getListTopBestSellingAction())
  }, [selectedRange])

  useEffect(() => {
    if (listDashBoardAdmin && listDashBoardAdmin.revenue_by_region) {
      setRevenueByRegion(listDashBoardAdmin.revenue_by_region)
    }
    if (listDashBoardAdmin && listDashBoardAdmin.top_customers) {
      setTopCustomer(listDashBoardAdmin.top_customers)
    }
  }, [listDashBoardAdmin])

  const handleDateRangeChange = (range) => {
    setSelectedRange(range)
  }

  const captureDashboardImages = async () => {
    try {
      const elements = [
        'revenue-distribution-chart',
        'comprehensive-revenue-chart',
        'top-customer-chart',
        'revenue-total'
      ]

      const images = await Promise.all(elements.map(async id => {
        const element = document.getElementById(id)
        if (element) {
          const canvas = await html2canvas(element, {
            scale: 2,
            useCORS: true
          })
          return canvas.toDataURL('image/png')
        } else {
          console.error(`Element with id ${id} not found.`)
          return null
        }
      }))

      const [chart1Image, chart2Image, chart3Image, chart4Image] = images
      setDashboardImages({
        chart1Image,
        chart2Image,
        chart3Image,
        chart4Image
      })
    } catch (error) {
      console.error('Error capturing dashboard images:', error)
    }
  }


  const handleExportPDF = async () => {
    await captureDashboardImages()
    setTimeout(() => {
      const pdfDownloadLink = document.getElementById('download')
      pdfDownloadLink.click()
    }, 2000)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <HeaderPage
        title={t('Dashboard')}
        actionButton={
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <CustomDateRangePicker onChange={handleDateRangeChange} />
            <Button className="modalButton" sx={{ gap: '8px', marginLeft: '10px' }} onClick={handleExportPDF}>
              <ClarityExportSolid />
              {t('exportReport')}
            </Button>
          </Box>
        }
      />
      <PDFDownloadLink
        id="download"
        document={
          <DashboardPDFComponent
            chart1Image={dashboardImages ? dashboardImages.chart1Image : null}
            chart2Image={dashboardImages ? dashboardImages.chart2Image : null}
            chart3Image={dashboardImages ? dashboardImages.chart3Image : null}
            chart4Image={dashboardImages ? dashboardImages.chart4Image : null}
            selectedRange={selectedRange}
          />
        }
        fileName={filename}
      />
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', padding: 2 }}>
        <Box id="revenue-distribution-chart">
          <RevenueDistributionChartByRegion revenueByRegion={revenueByRegion} />
        </Box>
        <Box id="revenue-total" sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Box
            sx={{
              ...style,
              bgcolor: colors.purpleColor,
              color: colors.lilywhiteColor,
              height: '344px',
              alignContent: 'center',
              justifyItems: 'center'
            }}
          >
            <Typography sx={{ fontWeight: 400, fontSize: '12px' }} gutterBottom>
              {t('totalSalesRevenue')}
            </Typography>
            <Typography sx={{ fontWeight: 700, fontSize: '36px' }}>
              {formatCurrencyWithoutSymbol(listDashBoardAdmin.total_revenue || 0)}
            </Typography>
          </Box>
          <Box>
            <Box sx={{ ...style, height: '163px', textAlign: 'left' }}>
              <Typography sx={{ fontWeight: 400, fontSize: '12px', textAlign: 'left' }} gutterBottom>
                {t('numberOfOrders')}
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '32px', color: colors.darkorangeColor, textAlign: 'left' }}>
                {listDashBoardAdmin.order_quantity}
              </Typography>
            </Box>
            <Box sx={{ ...style, height: '163px', textAlign: 'left' }}>
              <Typography sx={{ fontWeight: 400, fontSize: '12px', textAlign: 'left' }} gutterBottom>
                {t('totalProfit')}
              </Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '32px', color: colors.darkgreenColor, textAlign: 'left' }}>
                {formatCurrencyWithoutSymbol(listDashBoardAdmin.total_profit || 0)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box id="comprehensive-revenue-chart">
          <ComprehensiveRevenueChart listTopBestSelling={listTopBestSelling} />
        </Box>
        <Box id="top-customer-chart">
          <TopCustomerChart topCustomer={topCustomer} />
        </Box>
      </Box>
    </Box>
  )
}

export default DashboardAdminPage
