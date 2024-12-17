import colors from '../../../../constants/colors'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ClearIcon from '@mui/icons-material/Clear'
import { IoSearchOutline } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import DateRangeIcon from '@mui/icons-material/DateRange'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Box, Button, IconButton, InputAdornment, TextField, Toolbar, Typography } from '@mui/material'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { isNumeric } from '../../../../common/common'
import {
  errorCreateQuotationPreviewMessageState,
  getCustomerDetailsState,
  quotationListState
} from '../../../../redux/customer/customer.selectors'
import QuotationTableMobile from '../../../../components/Table/CustomerTable/QuotationTableMobile'
import titleTableQuotationCustomerMobile from '../../../../constants/titleTableQuotationCustomerMobile'
import { createQuotationPreviewAction, getQuotationListAction } from '../../../../redux/customer/customer.actions'

const Quote = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const quotationData = useSelector(quotationListState)
  const customerDetail = useSelector(getCustomerDetailsState)
  const errorCreateQuotationPreviewMessage = useSelector(errorCreateQuotationPreviewMessageState)
  const [editedData, setEditedData] = useState([])
  const [errorMessagePrice, setErrorMessagePrice] = useState('')
  const [errorMessageCheckBox, setErrorMessageCheckBox] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [shouldSort, setShouldSort] = useState(false)
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [sortedData, setSortedData] = useState([])
  const customerId = new URLSearchParams(location.search).get('id')

  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
    setSelectedDate(formattedDate)
  }

  useEffect(() => {
    dispatch(getQuotationListAction({ customer_id: customerId }))
  }, [])

  useEffect(() => {
    const filteredQuotes = searchValue
      ? quotationData.filter(
          (quote) =>
            (quote.code && quote.code.toLowerCase().includes(searchValue.toLowerCase())) ||
            (quote.product_name && quote.product_name.toLowerCase().includes(searchValue.toLowerCase()))
        )
      : [...quotationData]
    let newSortedData = [...filteredQuotes]
    if (shouldSort) {
      newSortedData.sort((a, b) => {
        const aChecked = editedData.some((item) => item.product_management_id === a.id)
        const bChecked = editedData.some((item) => item.product_management_id === b.id)
        return bChecked - aChecked
      })
    }
    setSortedData(newSortedData)
  }, [quotationData, searchValue, shouldSort, editedData])

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
    setShouldSort(false)
  }

  const handleClearSearch = () => {
    setSearchValue('')
    setShouldSort(true)
  }

  const handleTableDataChange = (data) => {
    setEditedData(data)
  }

  const handleSubmit = () => {
    const formattedSelectedDate = dayjs(selectedDate).format('YYYY-MM-DD')
    const newData = {
      customer_id: customerId,
      effective_date: formattedSelectedDate,
      product_managements: editedData.map((item) => ({
        product_management_id: item.product_management_id,
        description: item.description,
        price_standard_sheet_adjustment: item.price_standard_sheet_adjustment,
        price_include_sheet_size_adjustment: item.price_include_sheet_size_adjustment,
        price_standard_roll_adjustment: item.price_standard_roll_adjustment,
        price_include_roll_size_adjustment: item.price_include_roll_size_adjustment
      }))
    }

    let validate = validateData(newData)
    if (validate) {
      localStorage.setItem('dataProduct', JSON.stringify(newData))
      dispatch(createQuotationPreviewAction(newData))
      navigate(`/quote/preview-quote?id=${customerId}`)
    }
  }

  const validateData = (newData) => {
    let flag = true
    setErrorMessagePrice('')
    setErrorMessageCheckBox('')
    if (newData.product_managements.length === 0) {
      setErrorMessageCheckBox(t('pleaseSelectTheProduct'))
      flag = false
    } else {
      newData.product_managements.forEach((product) => {
        if (
          !product.price_standard_sheet_adjustment &&
          !product.price_include_sheet_size_adjustment &&
          !product.price_standard_roll_adjustment &&
          !product.price_include_roll_size_adjustment
        ) {
          setErrorMessagePrice(t('pleaseEnterTheNumberPrice'))
          flag = false
        } else if (
          !isNumeric(product.price_standard_sheet_adjustment) &&
          !isNumeric(product.price_include_sheet_size_adjustment) &&
          !isNumeric(product.price_standard_roll_adjustment) &&
          !isNumeric(product.price_include_roll_size_adjustment)
        ) {
          setErrorMessagePrice(t('onlyNumber'))
          flag = false
        }
      })
    }
    return flag
  }

  return (
    <>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: '8px 16px !important',
          bgcolor: colors.lightlavendergrayColor,
          minHeight: '48px !important',
          border: '1px solid #EFF0F6 !important'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            sx={{
              bgcolor: colors.whiteColor,
              color: colors.lightroyalblueColor,
              mr: 1,
              minWidth: '30px',
              borderRadius: '8px'
            }}
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          </Button>
          <Typography sx={{ fontWeight: 400, fontSize: 16, color: colors.lightroyalblueColor }}>
            {t('createQuote')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            className="confirmButton quote-button-action"
            onClick={handleSubmit}
            sx={{ gap: '8px' }}
          >
            {t('preview')}
            <ArrowForwardIcon style={{ fontSize: '16px', marginBottom: '2px' }} />
          </Button>
        </Box>
      </Toolbar>
      <Box sx={{ backgroundColor: '#fff' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 20px' }}>
          <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap' }}>
            <Typography sx={{ fontSize: '14px', fontStyle: 'italic' }}>{t('quotationIsEffectiveFromDate')}</Typography>
          </Box>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDatePicker
                className="quote-date-picker"
                disablePast
                placeholder={t('selectDate')}
                value={dayjs(selectedDate)}
                format="DD-MM-YYYY"
                onChange={handleDateChange}
                slotProps={{
                  textField: {
                    size: 'small',
                    sx: {
                      '& input': {
                        fontSize: '0.75rem !important',
                        fontWeight: 400
                      },
                      '& input::placeholder': {
                        fontSize: '0.625rem !important',
                        fontWeight: 400
                      }
                    },
                    InputProps: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end">
                            <DateRangeIcon sx={{ color: colors.whiteColor }} />
                          </IconButton>
                        </InputAdornment>
                      )
                    }
                  }
                }}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        <TextField
          size="small"
          value={searchValue}
          onChange={handleSearchChange}
          sx={{ display: 'flex', justifyContent: 'center', margin: '10px 20px' }}
          className="CustomTextField"
          variant="filled"
          placeholder={t('enterProductNameAndProductCode')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleSearchChange} sx={{ marginBottom: '15px', color: colors.blackColor }}>
                  <IoSearchOutline />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <React.Fragment>
                {searchValue && (
                  <IconButton onClick={handleClearSearch}>
                    <ClearIcon />
                  </IconButton>
                )}
              </React.Fragment>
            ),
            disableUnderline: true
          }}
        />
        <Typography sx={{ ml: '15px' }} variant="body1" color="error" className="error-message">
          {errorCreateQuotationPreviewMessage} {errorMessageCheckBox && `${errorMessageCheckBox}`}{' '}
          {errorMessagePrice && `${errorMessagePrice}`}
        </Typography>
        <Box sx={{ margin: '20px' }}>
          <QuotationTableMobile
            titleTable={titleTableQuotationCustomerMobile}
            data={sortedData}
            onTableDataChange={handleTableDataChange}
          />
        </Box>
      </Box>
    </>
  )
}
export default Quote
