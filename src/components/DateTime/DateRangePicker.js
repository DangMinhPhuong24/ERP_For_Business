import React, { useEffect, useState } from 'react'
import DateRangePicker from 'rsuite/DateRangePicker'
import 'rsuite/DateRangePicker/styles/index.css'
import subDays from 'date-fns/subDays'
import startOfWeek from 'date-fns/startOfWeek'
import endOfWeek from 'date-fns/endOfWeek'
import addDays from 'date-fns/addDays'
import startOfMonth from 'date-fns/startOfMonth'
import endOfMonth from 'date-fns/endOfMonth'
import addMonths from 'date-fns/addMonths'
import { useTranslation } from 'react-i18next'
import format from 'date-fns/format'
import CalenderIcon from '../../asset/icon/Calender.svg'
import { isEqual, parse } from 'date-fns'

const CustomDateRangePicker = ({
  onChange,
  mode,
  dataCustomerDetail,
  dataStatisticProposal,
  none,
  noDisplayLabel,
  value,
  onSelect
}) => {
  const { t } = useTranslation()
  const [selectedRange, setSelectedRange] = useState([])
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (Array.isArray(value) && value.length === 2) {
      const dateObjects = value.map((dateStr) => parse(dateStr, 'yyyy-MM-dd', new Date()))
      setSelectedRange(dateObjects)
    }
  }, [value])

  useEffect(() => {
    if (mode === 'last7Days') {
      setSelectedRange([subDays(new Date(), 6), new Date()])
      onChange && onChange([format(subDays(new Date(), 6), 'yyyy-MM-dd'), format(new Date(), 'yyyy-MM-dd')])
      setLabel(t('last7Days'))
    } else if (mode === 'last30Days') {
      setSelectedRange([subDays(new Date(), 29), new Date()])
      onChange && onChange([format(subDays(new Date(), 29), 'yyyy-MM-dd'), format(new Date(), 'yyyy-MM-dd')])
      setLabel(t('last30Days'))
    } else if (onSelect) {
      setSelectedRange(null)
      setLabel('')
    } else {
      const currentDate = new Date()
      setSelectedRange([currentDate, currentDate])
      setLabel(t('toDay'))
    }
  }, [mode, onSelect])

  useEffect(() => {
    if (dataCustomerDetail && dataCustomerDetail.created_at && none !== true) {
      const startDate = parse(dataCustomerDetail.created_at, 'dd-MM-yyyy', new Date())
      setSelectedRange([startDate, new Date()])
    }
  }, [dataCustomerDetail, none])

  useEffect(() => {
    if (dataStatisticProposal && dataStatisticProposal.created_at_proposal_debt_age) {
      const startDate = parse(dataStatisticProposal.created_at_proposal_debt_age, 'dd/MM/yyyy', new Date())
      setSelectedRange([startDate, new Date()])
    } else if (dataStatisticProposal && dataStatisticProposal.created_at_proposal_quotation) {
      const startDate = parse(dataStatisticProposal.created_at_proposal_quotation, 'dd/MM/yyyy', new Date())
      setSelectedRange([startDate, new Date()])
    } else if (dataStatisticProposal && dataStatisticProposal.created_at_purchase_order) {
      const startDate = parse(dataStatisticProposal.created_at_purchase_order, 'dd/MM/yyyy', new Date())
      setSelectedRange([startDate, new Date()])
    }
  }, [dataStatisticProposal])

  const predefinedRanges = [
    {
      label: t('toDay'),
      value: [new Date(), new Date()],
      placement: 'left'
    },
    {
      label: t('yesterday'),
      value: [addDays(new Date(), -1), addDays(new Date(), -1)],
      placement: 'left'
    },
    {
      label: t('thisWeek'),
      value: [startOfWeek(new Date()), endOfWeek(new Date())],
      placement: 'left'
    },
    {
      label: t('last7Days'),
      value: [subDays(new Date(), 6), new Date()],
      placement: 'left'
    },
    {
      label: t('last30Days'),
      value: [subDays(new Date(), 29), new Date()],
      placement: 'left'
    },
    {
      label: t('thisMonth'),
      value: [startOfMonth(new Date()), new Date()],
      placement: 'left'
    },
    {
      label: t('lastMonth'),
      value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
      placement: 'left'
    },
    {
      label: t('thisYear'),
      value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
      placement: 'left'
    },
    {
      label: t('lastYear'),
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
      placement: 'left'
    },
    {
      label: t('allTime'),
      value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
      placement: 'left'
    },
    {
      label: t('lastWeek'),
      closeOverlay: false,
      value: (value) => {
        const [start = new Date()] = value || []
        return [
          addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
          addDays(endOfWeek(start, { weekStartsOn: 0 }), -7)
        ]
      },
      appearance: 'default'
    }
  ]

  const isInRange = (range, predefinedRange) => {
    return isEqual(range[0], predefinedRange[0]) && isEqual(range[1], predefinedRange[1])
  }
  const handleRangeChange = (range) => {
    if (range) {
      let newLabel = t('custom')
      for (const predefinedRange of predefinedRanges) {
        if (Array.isArray(predefinedRange.value)) {
          if (isInRange(range, predefinedRange.value)) {
            newLabel = predefinedRange.label
            break
          }
        }
      }
      setSelectedRange(range)
      onChange && onChange(range.map((date) => format(date, 'yyyy-MM-dd')))
      setLabel(newLabel)
    } else {
      const currentDate = new Date()
      setSelectedRange([currentDate, currentDate])
    }
  }
  return (
    <div>
      <DateRangePicker
        className="custom-date-range-picker"
        label={!noDisplayLabel ? <span style={{ fontStyle: 'italic' }}>{label}</span> : ''}
        ranges={predefinedRanges}
        placeholder={t('pleaseSelectDeliveryDate')}
        value={selectedRange}
        format="dd-MM-yyyy"
        placement="auto"
        cleanable={false}
        caretAs={CalenderIcon}
        size="md"
        onChange={handleRangeChange}
      />
    </div>
  )
}

export default CustomDateRangePicker
