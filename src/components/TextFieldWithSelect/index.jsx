// @ts-nocheck
import React from 'react'
import { Controller } from 'react-hook-form'
import { TextField, Select, MenuItem, InputAdornment } from '@mui/material'
import PolygonIcon from '../../asset/icon/Polygon.svg'
import colors from '../../constants/colors'

const TextFieldWithSelect = ({
  control,
  name,
  selectOptions = [],
  errors,
  unit,
  setUnit,
  widthSize = '50px',
  handleInputChange,
  setValue,
  enableFormat = false,
  ...rest
}) => {
  const handleChange = (event) => {
    setUnit(event.target.value)
    setValue(name, '')
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          {...rest}
          size="small"
          variant="outlined"
          className="textFieldWithSelect"
          error={!!errors[name]}
          helperText={errors[name] ? errors[name].message : ''}
          InputProps={{
            sx: {
              borderRadius: '8px',
              '&.MuiOutlinedInput-root': {
                padding: 0
              }
            },
            startAdornment: (
              <InputAdornment position="start">
                <span style={{ paddingLeft: '10px', fontWeight: '500', fontSize: '24px', color: colors.greyColor }}>
                  ±
                </span>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Select
                  value={unit}
                  displayEmpty
                  IconComponent={PolygonIcon}
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={{
                    height: '30px',
                    width: widthSize,
                    display: 'flex',
                    alignItems: 'baseline',
                    justifyContent: 'center',
                    '& .MuiSelect-select': {
                      paddingLeft: '0px !important',
                      color: '#aaaaaa !important'
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: 'none'
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 0
                    }
                  }}
                  onChange={handleChange}
                >
                  {selectOptions.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </InputAdornment>
            )
          }}
          onChange={handleInputChange}
        />
      )}
    />
  )
}

export default TextFieldWithSelect
