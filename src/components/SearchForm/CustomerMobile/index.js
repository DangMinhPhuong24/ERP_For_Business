import React, { useEffect, useState } from 'react'
import { Box, TextField, MenuItem, Typography, InputLabel } from '@mui/material'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import colors from '../../../constants/colors'
import Autocomplete from '@mui/material/Autocomplete'
import { HiChevronDown } from 'react-icons/hi2'
import { HiChevronUp } from 'react-icons/hi2'
import Fade from '@mui/material/Fade'
import { IoSearchOutline } from 'react-icons/io5'
import PolygonIcon from '../../../asset/icon/Polygon.svg'
const SearchFormCustomerMobile = ({ onSubmit, onClear }) => {
  const { t } = useTranslation()
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [boxHeight, setBoxHeight] = useState('auto')

  useEffect(() => {
    if (customerName || phoneNumber) {
      const stateToStore = JSON.stringify({ customerName, phoneNumber })
      localStorage.setItem('customersStateSearch', stateToStore)
    }
  }, [customerName, phoneNumber])

  const handleClickToggle = () => {
    setShowSearch(!showSearch)
    setBoxHeight(showSearch ? 'auto' : '70px')
  }
  const handleSubmit = () => {
    let paramSearch = {
      customer_name: customerName,
      phone_number: phoneNumber
    }
    onSubmit(paramSearch)
  }

  const handleClear = () => {
    setCustomerName('')
    setPhoneNumber('')
    localStorage.removeItem('customerSearch')
    localStorage.removeItem('customersStateSearch')
    onClear()
  }

  const handlePhoneNumberChange = (value) => {
    if (!isNaN(value)) {
      setPhoneNumber(value)
    }
  }

  return (
    <Box
      sx={{
        bgcolor: colors.lilywhiteColor,
        p: '16px 8px',
        borderRadius: '10px',
        position: 'relative',
        height: boxHeight
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: colors.indigoColor }}>
          {t('search')}
        </Typography>
        {showSearch ? (
          <HiChevronDown
            onClick={() => handleClickToggle()}
            style={{ cursor: 'pointer', fontSize: '35px', color: colors.lightGreyColor }}
          />
        ) : (
          <HiChevronUp
            onClick={() => handleClickToggle()}
            style={{ cursor: 'pointer', fontSize: '35px', color: colors.lightGreyColor }}
          />
        )}
      </Box>
      {!showSearch && (
        <>
          <Box>
            <InputLabel className="inputLabel-search">{t('customerName')}</InputLabel>
            <TextField
              fullWidth
              InputProps={{
                sx: {
                  height: '35px',
                  fontSize: '12px',
                  lineHeight: '15.18px'
                },
                classes: {
                  root: 'custom-input-search'
                }
              }}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Box>
          <Box mt={1}>
            <InputLabel className="inputLabel-search">{t('phoneNumber')}</InputLabel>
            <TextField
              fullWidth
              InputProps={{
                sx: {
                  height: '35px',
                  fontSize: '12px',
                  lineHeight: '15.18px'
                },
                classes: {
                  root: 'custom-input-search'
                }
              }}
              value={phoneNumber}
              onChange={(e) => handlePhoneNumberChange(e.target.value)}
              variant="outlined"
              size="small"
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              className="modalButton"
              onClick={() => {
                handleSubmit()
              }}
              sx={{ mr: 2, gap: '8px' }}
            >
              <IoSearchOutline style={{ fontSize: '16px' }} />
              {t('search')}
            </Button>
            <Button
              onClick={() => {
                handleClear()
              }}
              variant="outlined"
              sx={{
                lineHeight: '17.71px',
                color: colors.darkmidnightblueColor,
                bgcolor: colors.lightblueColor,
                textTransform: 'none',
                border: 'none',
                borderRadius: '8px'
              }}
            >
              {t('delete')}
            </Button>
          </Box>
        </>
      )}
    </Box>
  )
}

export default SearchFormCustomerMobile
