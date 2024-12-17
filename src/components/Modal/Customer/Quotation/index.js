import React, { useCallback, useEffect, useState } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'react-i18next'
import '../../../../resource/style/ModalQuotationStyle.css'
import { InputAdornment } from '@mui/material'
import titleTableQuotationCustomer from '../../../../constants/titleTableQuotationCustomer'
import QuotationTable from '../../../Table/CustomerTable/QuotationTable'
import IconButton from '@mui/material/IconButton'
import colors from '../../../../constants/colors'
import { IoSearchOutline } from 'react-icons/io5'
import { FaArrowRightLong } from 'react-icons/fa6'
import ClearIcon from '@mui/icons-material/Clear'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import dayjs from 'dayjs'
import DateRangeIcon from '@mui/icons-material/DateRange'
import { LocalizationProvider } from '@mui/x-date-pickers'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  p: 2,
  overflow: 'auto',
  padding: 0,
  maxHeight: '90% !important'
}

export default function QuotationModal({
  open,
  nameTitle,
  quotationData,
  handleCreatePreviewQuote,
  errorsMessage,
  handleClose,
  dataCustomer,
  removeMessageError,
  getProfile,
  dataDetail,
  isEdit,
  databack
}) {
  const { t } = useTranslation()
  const [editedData, setEditedData] = useState([])
  const [errorMessageCheckBox, setErrorMessageCheckBox] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [shouldSort, setShouldSort] = useState(false)
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [filteredData, setFilteredData] = useState([])
  const [sortedData, setSortedData] = useState([])
  const [errorMessagePrice, setErrorMessagePrice] = useState({})

  useEffect(() => {
    const newFilteredData = searchValue
      ? quotationData.filter(
          (quote) =>
            (quote.code && quote.code.toLowerCase().includes(searchValue.toLowerCase())) ||
            (quote.product_name && quote.product_name.toLowerCase().includes(searchValue.toLowerCase()))
        )
      : [...quotationData]
    setFilteredData(newFilteredData)
    setShouldSort(true)
  }, [quotationData, searchValue])

  useEffect(() => {
    if (shouldSort) {
      const newSortedData = [...filteredData]
      newSortedData.sort((a, b) => {
        const aChecked = editedData.some((item) => item.product_management_id === a.id)
        const bChecked = editedData.some((item) => item.product_management_id === b.id)
        return bChecked - aChecked
      })
      setSortedData(newSortedData)
      setShouldSort(false)
    }
  }, [filteredData, editedData, shouldSort])

  useEffect(() => {
    setSelectedDate(dayjs())
    setSearchValue('')
  }, [open])

  useEffect(() => {
    if (Object.keys(databack).length > 0) {
      setSelectedDate(dayjs(databack?.effective_date, 'YYYY/MM/DD'))
    } else if (isEdit) {
      setSelectedDate(dayjs(dataDetail?.effective_date, 'DD/MM/YYYY'))
    }
  }, [isEdit, dataDetail, databack])

  const handleTableDataChange = (data) => {
    setEditedData(data)
  }

  const handleCloseModal = () => {
    setErrorMessagePrice({})
    setErrorMessageCheckBox('')
    setSearchValue('')
    setShouldSort(false)
    setEditedData([])
    removeMessageError()
    handleClose()
  }

  const handleSubmit = () => {
    const formattedSelectedDate = dayjs(selectedDate).format('YYYY-MM-DD')
    const newData = {
      customer_id: dataCustomer.id,
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
      if (isEdit) {
        newData.id = dataDetail.id
        handleCreatePreviewQuote(newData)
      } else {
        handleCreatePreviewQuote(newData)
      }
    }
  }

  const validateData = (newData) => {
    let flag = true
    setErrorMessagePrice({})
    setErrorMessageCheckBox('')
    let productErrorMessages = {}
    if (newData.product_managements.length === 0) {
      setErrorMessageCheckBox(t('pleaseSelectTheProduct'))
      flag = false
    } else {
      newData.product_managements.forEach((product) => {
        let productError = {}
        if (!product.price_standard_sheet_adjustment) {
          productError.price_standard_sheet_adjustment = t('pleaseEnterTheNumberPrice')
          flag = false
        } else if (parseFloat(product.price_standard_sheet_adjustment) <= 0) {
          productError.price_standard_sheet_adjustment = t('enterNumberGreaterThanZero')
          flag = false
        }

        if (!product.price_include_sheet_size_adjustment) {
          productError.price_include_sheet_size_adjustment = t('pleaseEnterTheNumberPrice')
          flag = false
        } else if (parseFloat(product.price_include_sheet_size_adjustment) <= 0) {
          productError.price_include_sheet_size_adjustment = t('enterNumberGreaterThanZero')
          flag = false
        }

        if (!product.price_standard_roll_adjustment) {
          productError.price_standard_roll_adjustment = t('pleaseEnterTheNumberPrice')
          flag = false
        } else if (parseFloat(product.price_standard_roll_adjustment) <= 0) {
          productError.price_standard_roll_adjustment = t('enterNumberGreaterThanZero')
          flag = false
        }

        if (!product.price_include_roll_size_adjustment) {
          productError.price_include_roll_size_adjustment = t('pleaseEnterTheNumberPrice')
          flag = false
        } else if (parseFloat(product.price_include_roll_size_adjustment) <= 0) {
          productError.price_include_roll_size_adjustment = t('enterNumberGreaterThanZero')
          flag = false
        }
        if (Object.keys(productError).length > 0) {
          productErrorMessages[product.product_management_id] = productError
        }
      })
      setErrorMessagePrice((prev) => ({ ...prev, product_managements: productErrorMessages }))
    }
    return flag
  }

  const handleFocus = (productId, fieldName) => {
    setErrorMessagePrice((prev) => ({
      ...prev,
      product_managements: {
        ...prev.product_managements,
        [productId]: {
          ...prev.product_managements[productId],
          [fieldName]: ''
        }
      }
    }))
  }

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value)
  }

  const handleClearSearch = () => {
    setSearchValue('')
  }

  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
    setSelectedDate(formattedDate)
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={{ padding: '20px' }}>
              <Typography component="h2" className="nameTitle">
                {nameTitle}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  size="small"
                  value={searchValue}
                  onChange={handleSearchChange}
                  sx={{ width: '234px' }}
                  className="CustomTextField"
                  variant="filled"
                  placeholder={t('enterProductNameAndProductCode')}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          onClick={handleSearchChange}
                          sx={{ marginBottom: '15px', color: colors.blackColor }}
                        >
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
                <Box sx={{ display: 'flex', alignContent: 'center', gap: '10px' }}>
                  <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap' }}>
                    <Typography sx={{ fontSize: '14px', fontStyle: 'italic' }}>
                      {t('quotationIsEffectiveFromDate')}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignContent: 'center', flexWrap: 'wrap' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
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
              </Box>
              <Box sx={{ marginTop: '20px', minWidth: 1100 }}>
                <QuotationTable
                  titleTable={titleTableQuotationCustomer}
                  data={sortedData}
                  onTableDataChange={handleTableDataChange}
                  dataDetail={dataDetail}
                  databack={databack}
                  open={open}
                  errorMessagePrice={errorMessagePrice}
                  handleFocus={handleFocus}
                />
              </Box>
              <Typography
                sx={{
                  color: 'error.main',
                  textAlign: 'center',
                  fontStyle: 'italic',
                  marginTop: '10px'
                }}
              >
                {t('quotesLowerThanTheAllowableDifferenceNeedApprovedByCompetentAuthorities')}
              </Typography>
            </Box>
            <Typography sx={{ ml: '15px' }} variant="body1" color="error" className="error-message">
              {errorsMessage} {errorMessageCheckBox && `${errorMessageCheckBox}`}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                background: colors.ghostWhiteColor,
                padding: 0,
                height: '60px'
              }}
            >
              <Box sx={{ marginRight: '20px' }}>
                <Button variant="outlined" onClick={handleCloseModal} className="cancelButton">
                  {t('cancel')}
                </Button>
                <Button variant="contained" className="confirmButton" onClick={handleSubmit}>
                  {t('preview')} <FaArrowRightLong />
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
