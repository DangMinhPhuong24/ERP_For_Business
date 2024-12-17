import { DesktopTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

export default function TimePickerComponent({ value, onChange, error, customStyle }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopTimePicker
        sx={customStyle}
        ampm={false}
        value={value ? dayjs(value) : ''}
        onChange={onChange}
        onError={(newError) => error}
        format="HH:mm"
        slotProps={{
          textField: {
            error: !!error,
            helperText: error ? error.message : ''
          }
        }}
      />
    </LocalizationProvider>
  )
}
