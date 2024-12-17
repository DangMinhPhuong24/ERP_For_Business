import React, { useEffect, useState } from 'react'
import { Box, TextField, MenuItem, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import colors from '../../../constants/colors'
import Autocomplete from '@mui/material/Autocomplete'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import dayjs from 'dayjs'
import PolygonIcon from '../../../asset/icon/Polygon.svg'

const SearchFormMachines = ({ listAllMachineType, listAllWorkerArrange, onSubmit, onClear }) => {
  const { t } = useTranslation()
  const [fromDate, setFromDate] = useState(null)
  const [toDate, setToDate] = useState(null)
  const [machineName, setMachineName] = useState('')
  const [machineTypeId, setMachineTypeId] = useState('')
  const [workerArrangeId, setWorkerArrangeId] = useState('')

  useEffect(() => {
    const storedState = localStorage.getItem('machinesStateSearch')
    if (storedState) {
      const { fromDate, toDate, machineName, machineTypeId, workerArrangeId } = JSON.parse(storedState)
      setFromDate(fromDate)
      setToDate(toDate)
      setMachineName(machineName)
      setMachineTypeId(machineTypeId)
      setWorkerArrangeId(workerArrangeId)
    }
  }, [])

  useEffect(() => {
    if (fromDate || toDate || machineName || machineTypeId || workerArrangeId) {
      const stateToStore = JSON.stringify({ fromDate, toDate, machineName, machineTypeId, workerArrangeId })
      localStorage.setItem('machinesStateSearch', stateToStore)
    }
  }, [fromDate, toDate, machineName, machineTypeId, workerArrangeId])

  const handleSubmit = () => {
    let paramSearch = {
      name: machineName,
      from_date: fromDate,
      to_date: toDate,
      machine_type_id: machineTypeId,
      worker_arrange_id: workerArrangeId
    }
    onSubmit(paramSearch)
  }

  const handleClear = () => {
    setFromDate('')
    setToDate('')
    setMachineName('')
    setMachineTypeId('')
    setWorkerArrangeId('')
    onClear()
  }

  const handleFromDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('DD-MM-YYYY')
    setFromDate(formattedDate)
  }

  const handleToDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('DD-MM-YYYY')
    setToDate(formattedDate)
  }

  return (
    <Box component="form" sx={{ bgcolor: '#FFFFFF', p: 2, mt: 2, borderRadius: '10px', position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '8px',
          background: 'red',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px'
        }}
      />
      <Typography variant="h6" gutterBottom>
        {t('search')}
      </Typography>
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        <TextField
          value={machineName}
          onChange={(e) => setMachineName(e.target.value)}
          label={t('machineName')}
          variant="outlined"
          size="small"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label={t('since')}
            value={fromDate ? dayjs(fromDate) : null}
            onChange={handleFromDateChange}
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true
              }
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label={t('toTheDay')}
            value={toDate ? dayjs(toDate) : null}
            onChange={handleToDateChange}
            format="DD-MM-YYYY"
            slotProps={{
              textField: {
                size: 'small',
                fullWidth: true
              }
            }}
          />
        </LocalizationProvider>
        <Autocomplete
          popupIcon={<PolygonIcon />}
          size="small"
          options={listAllMachineType}
          value={listAllMachineType.find((option) => option.id === machineTypeId) || null}
          onChange={(event, value) => setMachineTypeId(value ? value.id : '')}
          getOptionLabel={(option) => option.machine_type_name}
          renderInput={(params) => <TextField {...params} label={t('machineType')} variant="outlined" />}
        />
        <Autocomplete
          popupIcon={<PolygonIcon />}
          size="small"
          options={listAllWorkerArrange}
          value={listAllWorkerArrange.find((option) => option.id === workerArrangeId) || null}
          onChange={(event, value) => setWorkerArrangeId(value ? value.id : '')}
          getOptionLabel={(option) => option.worker_arrange_name}
          renderInput={(params) => <TextField {...params} label={t('arrangeWorkers')} variant="outlined" />}
        />

        <Box sx={{ display: 'flex', justifyContent: 'center', gridColumn: 'span 3' }}>
          <Button
            onClick={() => {
              handleSubmit()
            }}
            on
            sx={{
              bgcolor: colors.whiteColor,
              color: colors.blackColor,
              marginRight: 2,
              '&:hover': { backgroundColor: colors.blueColor, color: '#FFFFFF' }
            }}
          >
            {t('search')}
          </Button>
          <Button
            onClick={() => {
              handleClear()
            }}
            variant="outlined"
            sx={{ color: colors.blackColor, borderColor: colors.blackColor }}
          >
            {t('delete')}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default SearchFormMachines
