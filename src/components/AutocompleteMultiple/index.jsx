import { Autocomplete, TextField, Chip, createFilterOptions, ListItem } from '@mui/material'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import PolygonIcon from '../../asset/icon/Polygon.svg'

const filter = createFilterOptions()

const AutocompleteMultiple = ({
  name,
  control,
  errors,
  options,
  getOptionLabel,
  noOptionsText = 'No results',
  placeholder = 'Select',
  sx,
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
          multiple
          limitTags={2}
          popupIcon={<PolygonIcon />}
          options={options}
          value={field.value || []}
          onChange={(event, newValue) => {
            const formattedValues = newValue.reduce((acc, item) => {
              const value = typeof item === 'string' ? item : item.inputValue || item.name

              if (acc.includes(value)) {
                return acc.filter((val) => val !== value)
              }

              return [...acc, value]
            }, [])

            field.onChange(formattedValues)
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
          getOptionLabel={(option) => {
            if (typeof option === 'string') {
              return option
            }
            if (option.inputValue) {
              return option.inputValue
            }
            return option.name
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={typeof option === 'string' ? option : option.name}
                {...getTagProps({ index })}
              />
            ))
          }
          renderOption={(props, option) => {
            const selected = field.value.includes(option.name)
            return (
              <ListItem {...props} selected={selected} key={option.name}>
                {option.name}
              </ListItem>
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

export default AutocompleteMultiple
