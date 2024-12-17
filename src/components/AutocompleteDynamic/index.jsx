import { Autocomplete, TextField, createFilterOptions } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import PolygonIcon from '../../asset/icon/Polygon.svg'

const filter = createFilterOptions()

const AutocompleteDynamic = ({
  name,
  control,
  errors,
  options,
  getOptionLabel,
  noOptionsText = 'No results',
  placeholder = 'Select',
  sx,
  disabled = false,
  ListboxProps,
  ...rest
}) => {
  const { t } = useTranslation()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...rest}
          popupIcon={<PolygonIcon />}
          options={options}
          value={field.value}
          onChange={(event, newValue) => {
            if (newValue !== null) {
              if (typeof newValue === 'string') {
                field.onChange(newValue)
              } else if (newValue.inputValue) {
                field.onChange(newValue.inputValue)
              } else {
                field.onChange(newValue.name)
              }
            } else {
              field.onChange('')
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params)

            const { inputValue } = params
            const isExisting = options.some((option) => inputValue === option.name)
            if (inputValue !== '' && !isExisting) {
              filtered.push({
                inputValue,
                name: `${t('add')} "${inputValue}"`
              })
            }

            return filtered
          }}
          disabled={disabled}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option
            }
            if (option.inputValue) {
              return option.inputValue
            }
            return option.name
          }}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props
            return (
              <li key={key} {...optionProps}>
                {option.name}
              </li>
            )
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder={t(placeholder)}
              error={!!errors[name]}
              helperText={errors[name] ? errors[name].message : ''}
              sx={{
                ...sx,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px'
                },
                '& .MuiAutocomplete-inputRoot': {
                  borderRadius: '8px'
                }
              }}
            />
          )}
        />
      )}
    />
  )
}

export default AutocompleteDynamic
