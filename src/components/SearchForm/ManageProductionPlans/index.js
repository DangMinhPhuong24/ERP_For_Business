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

const SearchManageProductionPlans = ({ listAllCustomer, listAllOrderStatus, onClear, onSubmit, flagResetForm }) => {
  const { t } = useTranslation()
  // const [codeOrder, setCodeOrder] = useState("");
  // const [fromDate, setFromDate] = useState(null);
  // const [toDate, setToDate] = useState(null);
  // const [selectedCustomer, setSelectedCustomer] = useState("");
  // const [selectedStatus, setSelectedStatus] = useState("");
  //
  // const handleCodeOrdersChange = (event) => {
  //     setCodeOrder(event.target.value);
  // };
  //
  // // useEffect(() => {
  // //     handleClear();
  // // }, [flagResetForm])
  //
  // const handleFromDateChange = (newDate) => {
  //     const formattedDate = dayjs(newDate).format('DD-MM-YYYY');
  //     setFromDate(formattedDate);
  // };
  //
  //
  // const handleToDateChange = (newDate) => {
  //     const formattedDate = dayjs(newDate).format('DD-MM-YYYY');
  //     setToDate(formattedDate);
  // };
  //
  // const handleCustomerChange = (newValue) => {
  //     if (newValue) {
  //         setSelectedCustomer(newValue.id);
  //     }else {
  //         setSelectedCustomer('');
  //     }
  // };
  //
  // const handleStatusChange = (newValue) => {
  //     if (newValue) {
  //         setSelectedStatus(newValue.id);
  //     }else {
  //         setSelectedStatus('');
  //     }
  // };
  // const handleSubmit = () => {
  //     let paramSearch = {
  //         code: codeOrder,
  //         from_date: fromDate,
  //         to_date: toDate,
  //         customer_id: selectedCustomer,
  //         order_status_id: selectedStatus,
  //     }
  //     onSubmit(paramSearch)
  // };
  // const handleClear = () => {
  //     setToDate(null);
  //     setFromDate(null);
  //     setCodeOrder("");
  //     setSelectedCustomer('');
  //     setSelectedStatus('');
  //     onClear()
  // };

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
          // value={codeOrder}
          // onChange={handleCodeOrdersChange}
          label={t('planCode')}
          variant="outlined"
          size="small"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label={t('since')}
            // value={fromDate ? dayjs(fromDate) : null}
            // onChange={handleFromDateChange}
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
            label={t('toTheDay')}
            // value={toDate ? dayjs(toDate) : null}
            // onChange={handleToDateChange}
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
          // options={listAllCustomer}
          // value={listAllCustomer.find(option => option.id === selectedCustomer) || null}
          // onChange={(event, value) => setSelectedCustomer(value ? value.id : "")}
          // getOptionLabel={(option) => option.customer_name}
          renderInput={(params) => <TextField {...params} label={t('plan')} variant="outlined" />}
        />
        <Autocomplete
          popupIcon={<PolygonIcon />}
          size="small"
          // options={listAllOrderStatus}
          // value={listAllOrderStatus.find(option => option.id === selectedStatus) || null}
          // onChange={(event, value) => setSelectedStatus(value ? value.id : "")}
          // getOptionLabel={(option) => option.order_status_name}
          renderInput={(params) => <TextField {...params} label={t('status')} variant="outlined" />}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', gridColumn: 'span 3' }}>
          <Button
            // onClick={() => {handleSubmit();}}
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
            // onClick={() => {handleClear()}}
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

export default SearchManageProductionPlans
