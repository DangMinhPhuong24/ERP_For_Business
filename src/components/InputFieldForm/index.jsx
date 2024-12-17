// @ts-nocheck
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import { formatDecimalNumber, formatInputValue } from 'common/common'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import colors from '../../constants/colors'

const InputFieldForm = (props) => {
  const {
    name,
    control,
    errors,
    placeholder = '',
    sx,
    rows = 1,
    label,
    textAlign = 'left',
    defaultValue,
    showTooltip = false,
    enableFormat = false,
    allowOnlyInteger = false,
    ...rest
  } = props
  const { t } = useTranslation()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const renderInput = (
          <TextField
            {...field}
            {...rest}
            sx={{
              width: '100%',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px'
              },
              '& .MuiInputBase-input': {
                textAlign: textAlign
              },
              ...sx
            }}
            placeholder={t(placeholder)}
            error={!!errors[name]}
            helperText={errors[name] ? errors[name].message : ''}
            rows={rows}
            value={enableFormat && field.value ? formatDecimalNumber(field.value) : field.value}
            onChange={(e) => {
              let value = e.target.value;
              if (allowOnlyInteger) {
                value = value.replace(/[^0-9]/g, '')
              }
              if (enableFormat) {
                value = formatInputValue(value)
              }
              field.onChange(value);
            }}

            InputProps={{
              endAdornment: label ? (
                <InputAdornment position="end">
                  <span
                    style={{
                      fontWeight: '400',
                      fontSize: '12px',
                      color: colors.greyColor
                    }}
                  >
                    {label}
                  </span>
                </InputAdornment>
              ) : null
            }}
          />
        )
        return showTooltip ? (
          <Tooltip title={field.value}>
            {renderInput}
          </Tooltip>
        ) : (
          renderInput
        )
      }}
    />
  )
}

export default InputFieldForm
