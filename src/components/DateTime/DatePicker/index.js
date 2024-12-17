import React, { useState, useEffect } from 'react'
import addDays from 'date-fns/addDays'
import { useTranslation } from 'react-i18next'
import format from 'date-fns/format'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import DatePicker from 'rsuite/DatePicker'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'

const CustomDatePicker = ({ onChange, className }) => {
  const { t } = useTranslation()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [label, setLabel] = useState('')

  useEffect(() => {
    const today = new Date()
    setSelectedDate(today)
    setLabel(t('toDay'))
  }, [t])

  const predefinedRanges = [
    {
      label: t('yesterday'),
      value: addDays(new Date(), -1),
      placement: 'left'
    },
    {
      label: t('toDay'),
      value: new Date(),
      placement: 'left'
    },
    {
      label: t('tomorrow'),
      value: addDays(new Date(), +1),
      placement: 'left'
    }
  ]

  const handleRangeChange = (date) => {
    setSelectedDate(date)

    const selectedRange = predefinedRanges.find((range) => {
      return format(range.value, 'dd-MM-yyyy') === format(date, 'dd-MM-yyyy')
    })

    if (selectedRange) {
      setLabel(selectedRange.label)
    } else {
      setLabel(t('custom'))
    }

    if (onChange) {
      onChange(format(date, 'yyyy-MM-dd'))
    }
  }

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className={className}
          label={label}
          placement="auto"
          defaultValue={dayjs().toDate()}
          format="dd-MM-yyyy"
          ranges={predefinedRanges}
          value={selectedDate}
          onChange={handleRangeChange}
          cleanable={!label}
        />
      </LocalizationProvider>
    </div>
  )
}

export default CustomDatePicker
