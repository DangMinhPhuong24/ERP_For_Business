// @ts-nocheck
import DateRangeIcon from '@mui/icons-material/DateRange'
import { IconButton, InputAdornment } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import dayjs from 'dayjs'
import colors from '../../../constants/colors'
import { useTranslation } from 'react-i18next'

export default function DatePickerCalendar({
  value,
  onChange,
  error,
  classes,
  minDate,
  disablePast = false,
  customStyle,
  isDisabled
}) {
  const { t } = useTranslation()
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      localeText={{ cancelButtonLabel: t('cancel'), okButtonLabel: t('Ok') }}
    >
      <MobileDatePicker
        sx={customStyle}
        minDate={minDate}
        value={value ? dayjs(value, 'DD-MM-YYYY') : null}
        format="DD-MM-YYYY"
        onChange={onChange}
        disablePast={disablePast ? true : false}
        disabled={isDisabled}
        slotProps={{
          textField: {
            size: 'small',
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end">
                    <DateRangeIcon sx={{ color: colors.whiteColor }} />
                  </IconButton>
                </InputAdornment>
              ),
              classes: { root: classes }
            },
            error: !!error,
            helperText: error?.message
          }
        }}
      />
    </LocalizationProvider>
  )
}
