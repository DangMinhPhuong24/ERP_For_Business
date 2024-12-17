import React from 'react'
import { Controller } from 'react-hook-form'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useTranslation } from 'react-i18next'
import PolygonIcon from '../../asset/icon/Polygon.svg'

const AutocompleteForm = ({
  name,
  control,
  errors,
  options,
  getOptionLabel,
  noOptionsText = 'noResult',
  placeholder,
  sx,
  readOnly,
  ListboxProps,
  onChange,
  fieldName = 'id',
  displayPopupIcon = false,
  ...rest
}) => {
  const { t } = useTranslation()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          {...field}
          {...rest}
          popupIcon={!displayPopupIcon ? <PolygonIcon /> : null}
          options={options}
          getOptionLabel={getOptionLabel}
          noOptionsText={t(noOptionsText)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder={t(placeholder)}
              error={!!errors[name]}
              helperText={errors[name] ? errors[name].message : ''}
              inputProps={{ ...params.inputProps, readOnly: readOnly }}
              defaultValue={{ id: 1 }}
              sx={{
                ...sx,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  'MuiAutocomplete-inputRoot': {
                    paddingRight: '56px !important',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }
                },
                '& .MuiAutocomplete-inputRoot': {
                  borderRadius: '8px'
                }
              }}
            />
          )}
          onChange={(_, value) => {
            field.onChange(value ? value[fieldName] : '')
            if (onChange) {
              onChange(value)
            }
          }}
          value={options.find((option) => option[fieldName] === field.value) || null}
          ListboxProps={ListboxProps}
        />
      )}
    />
  )
}

export default AutocompleteForm
