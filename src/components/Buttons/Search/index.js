import React from 'react'
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { IoCloseOutline, IoSearchOutline } from 'react-icons/io5'
import colors from '../../../constants/colors'
import { useTranslation } from 'react-i18next'

const SearchBar = ({
  searchValue,
  handleOnChangeValue,
  handleSearch,
  handleClearSearch,
  placeholderText,
  buttonText,
  textFieldProps
}) => {
  const { t } = useTranslation()
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <TextField
        size="small"
        placeholder={t(placeholderText)}
        value={searchValue}
        onChange={handleOnChangeValue}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            handleSearch()
          }
        }}
        sx={{ width: '210px', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
        InputProps={{
          sx: {
            borderRadius: '8px !important',
            '&.MuiOutlinedInput-root': {
              padding: 0
            },
            backgroundColor: colors.lilywhiteColor
          },
          endAdornment: searchValue && (
            <InputAdornment position="end">
              <IconButton sx={{ color: colors.blackColor }} onClick={handleClearSearch}>
                <IoCloseOutline />
              </IconButton>
            </InputAdornment>
          ),
          disableUnderline: true,
          ...textFieldProps
        }}
      />
      <Box>
        <Button
          className="modalButton"
          sx={{
            gap: '8px',
            textAlign: 'center',
            lineHeight: '16.94px',
            '&:hover': {
              backgroundColor: colors.blueColor,
              color: colors.lilywhiteColor
            }
          }}
          onClick={handleSearch}
        >
          <IoSearchOutline style={{ fontSize: '16px' }} />
          {t(buttonText)}
        </Button>
      </Box>
    </Box>
  )
}
export default SearchBar
