import React, { useEffect, useState } from 'react'
import { Box, TextField, MenuItem, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import colors from '../../../constants/colors'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import Autocomplete from '@mui/material/Autocomplete'
import PolygonIcon from '../../../asset/icon/Polygon.svg'

const SearchFormProductionOrder = ({ listAllPlan, listAllOrderStatus, listAllOrder, onClear, onSubmit }) => {
  const { t } = useTranslation()
  const [codeOrder, setCodeOrder] = useState('')
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [selectedOrder, setSelectedOrder] = useState('')
  const [selectedPlan, setSelectedPlan] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  const handleFromDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('DD-MM-YYYY')
    setFromDate(formattedDate)
  }

  const handleToDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('DD-MM-YYYY')
    setToDate(formattedDate)
  }
  const handleSubmit = () => {
    let paramSearch = {
      code: codeOrder,
      from_date: fromDate,
      to_date: toDate,
      order_id: selectedOrder,
      manufacture_order_status_id: selectedStatus,
      plan_id: selectedPlan
    }
    onSubmit(paramSearch)
  }
  const handleClear = () => {
    setToDate(null)
    setFromDate(null)
    setCodeOrder('')
    setSelectedOrder('')
    setSelectedStatus('')
    setSelectedPlan('')
    onClear()
  }

  return (
    <Box component="form" sx={{ bgcolor: '#FFFFFF', p: 2, mt: 2, borderRadius: '10px', position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '8px',
          background: 'red',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px'
        }}
      />
      <Typography variant="h6" gutterBottom>
        {t('search')}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        <TextField
          value={codeOrder}
          onChange={(e) => setCodeOrder(e.target.value)}
          label={t('productionOrderCode')}
          variant="outlined"
          size="small"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label={t('fromTheDateOfOrderCreation')}
            value={fromDate ? dayjs(fromDate) : null}
            onChange={handleFromDateChange}
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true
              }
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label={t('toTheOrderCreationDate')}
            value={toDate ? dayjs(toDate) : null}
            onChange={handleToDateChange}
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true
              }
            }}
          />
        </LocalizationProvider>
        <Autocomplete
          popupIcon={<PolygonIcon />}
          size="small"
          options={listAllPlan}
          value={listAllPlan.find((option) => option && option.id === selectedPlan) || null}
          onChange={(event, value) => setSelectedPlan(value ? value.id : '')}
          getOptionLabel={(option) => option.code}
          renderInput={(params) => <TextField {...params} label={t('plan')} variant="outlined" />}
        />
        <Autocomplete
          popupIcon={<PolygonIcon />}
          size="small"
          options={listAllOrder}
          value={listAllOrder.find((option) => option.id === selectedOrder) || null}
          onChange={(event, value) => setSelectedOrder(value ? value.id : '')}
          getOptionLabel={(option) => option.code}
          renderInput={(params) => <TextField {...params} label={t('order')} variant="outlined" />}
        />
        <Autocomplete
          popupIcon={<PolygonIcon />}
          size="small"
          options={listAllOrderStatus}
          value={listAllOrderStatus.find((option) => option.id === selectedStatus) || null}
          onChange={(event, value) => setSelectedStatus(value ? value.id : '')}
          getOptionLabel={(option) => option.manufacture_order_status_name}
          renderInput={(params) => <TextField {...params} label={t('status')} variant="outlined" />}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', gridColumn: 'span 3' }}>
          <Button
            onClick={() => {
              handleSubmit()
            }}
            on
            sx={{
              bgcolor: colors.whiteColor,
              color: colors.blackColor,
              marginRight: 2,
              '&:hover': { backgroundColor: colors.blueColor, color: '#FFFFFF' }
            }}
          >
            {t('search')}
          </Button>
          <Button
            onClick={() => {
              handleClear()
            }}
            variant="outlined"
            sx={{ color: colors.blackColor, borderColor: colors.blackColor }}
          >
            {t('delete')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default SearchFormProductionOrder
