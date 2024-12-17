import { Box } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PolygonIcon from '../../../../../asset/icon/Polygon.svg'
import { isValidDate } from '../../../../../common/common'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '535px',
  height: 'auto',
  maxHeight: '95vh',
  bgcolor: 'background.paper',
  borderRadius: '5px',
  overflow: 'auto',
  padding: '20px'
}

export default function MachinesModal({
  open,
  handleClose,
  nameTitle,
  data,
  errorsMessage,
  handleMachines,
  closeModalAction,
  mode,
  listAllMachineType
}) {
  const { t } = useTranslation()
  const [machineTypeId, setMachineTypeId] = useState('')
  const [machineName, setMachineName] = useState('')
  const [producerName, setProducerName] = useState('')
  const [buyingTimeDate, setBuyingTimeDate] = useState(null)
  const [maintenanceDate, setMaintenanceTimeDate] = useState(null)
  const [machineNameErrorMessage, setErrorMessageMachineName] = useState('')
  const [machineTypeErrorMessage, setErrorMessageMachineType] = useState('')
  const [buyingTimeErrorMessage, setErrorMessageBuyingTime] = useState('')

  const handleCloseModal = () => {
    setMachineTypeId('')
    setMachineName('')
    setProducerName('')
    setBuyingTimeDate(null)
    setMaintenanceTimeDate(null)
    setErrorMessageMachineName('')
    setErrorMessageMachineType('')
    setErrorMessageBuyingTime('')
    closeModalAction()
    handleClose()
  }

  useEffect(() => {
    if (!open) {
      handleCloseModal()
    }
  }, [open])

  useEffect(() => {
    if (mode === 'edit') {
      setMachineTypeId(data.machine_type?.id || '')
      setMachineName(data.machine_name || '')
      setProducerName(data.manufacturer || '')
      handleBuyingTimeDateChange(data.buy_date || null)
      if (data.maintenance_date) {
        handleMaintenanceDateChange(data.maintenance_date)
      }
    }
  }, [data])

  const handleSubmit = () => {
    let machines
    if (mode === 'edit') {
      machines = {
        id: data.id,
        name: machineName,
        machine_type_id: machineTypeId,
        manufacturer: producerName,
        buy_date: buyingTimeDate,
        maintenance_date: maintenanceDate
      }
    } else {
      machines = {
        name: machineName,
        machine_type_id: machineTypeId,
        manufacturer: producerName,
        buy_date: buyingTimeDate,
        maintenance_date: maintenanceDate
      }
    }
    let validate = validateData(machines)
    if (validate) {
      handleMachines(machines)
    }
  }
  const validateData = (machines) => {
    let flag = true
    setErrorMessageMachineName('')
    setErrorMessageMachineType('')
    setErrorMessageBuyingTime('')

    if (!machines.name) {
      setErrorMessageMachineName(t('requiredField'))
      flag = false
    }
    if (!machines.machine_type_id) {
      setErrorMessageMachineType(t('requiredField'))
      flag = false
    }
    if (!machines.buy_date || !isValidDate(machines.buy_date)) {
      setErrorMessageBuyingTime(t('pleaseSelectDeliveryDate'))
      flag = false
    }
    return flag
  }

  const handleBuyingTimeDateChange = (newDate) => {
    const formattedDate = dayjs(newDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
    setBuyingTimeDate(formattedDate)
  }

  const handleMaintenanceDateChange = (newDate) => {
    const formattedDate = dayjs(newDate, 'DD/MM/YYYY').format('YYYY-MM-DD')
    setMaintenanceTimeDate(formattedDate)
  }

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography component="h2" className="Title">
              {nameTitle}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '10px' }}>
              <Box>
                <Typography className="radio-text-productionMethod">
                  {t('machineName')}
                  <span className="required">*</span>
                </Typography>
                <TextField
                  error={machineNameErrorMessage ? true : false}
                  id={machineNameErrorMessage ? 'outlined-error-helper-text' : 'outlined-required'}
                  helperText={machineNameErrorMessage ? machineNameErrorMessage : ''}
                  required
                  id="outlined-basic"
                  size="small"
                  sx={{ width: '457px' }}
                  placeholder={t('enterTheMachineName')}
                  value={machineName || null}
                  onChange={(e) => setMachineName(e.target.value)}
                />
                <Box sx={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <Box>
                    <Typography className="radio-text-productionMethod">
                      {t('machineType')}
                      <span className="required">*</span>
                    </Typography>
                    <Autocomplete
                      popupIcon={<PolygonIcon />}
                      sx={{ width: '200px' }}
                      size="small"
                      options={listAllMachineType}
                      value={listAllMachineType.find((option) => option.id === machineTypeId) || null}
                      onChange={(event, value) => setMachineTypeId(value ? value.id : '')}
                      getOptionLabel={(option) => option.machine_type_name}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          placeholder={t('selectMachineType')}
                          variant="outlined"
                          error={machineTypeErrorMessage ? true : false}
                          id={machineTypeErrorMessage ? 'outlined-error-helper-text' : 'outlined-required'}
                          helperText={machineTypeErrorMessage ? machineTypeErrorMessage : ''}
                        />
                      )}
                    />
                  </Box>
                  <Box>
                    <Typography className="radio-text-productionMethod">{t('producer')}</Typography>
                    <TextField
                      required
                      id="outlined-basic"
                      size="small"
                      sx={{ width: '246px' }}
                      placeholder={t('enterManufacturer')}
                      value={producerName || null}
                      onChange={(e) => setProducerName(e.target.value)}
                    />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                  <Box>
                    <Typography className="radio-text-productionMethod">
                      {t('buyingTime')}
                      <span className="required">*</span>
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disableFuture
                        value={buyingTimeDate ? dayjs(buyingTimeDate) : null}
                        onChange={handleBuyingTimeDateChange}
                        format="DD-MM-YYYY"
                        sx={{ width: '200px' }}
                        slotProps={{
                          textField: {
                            size: 'small',
                            fullWidth: true,
                            helperText: buyingTimeErrorMessage,
                            error: !!buyingTimeErrorMessage
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box>
                    <Typography className="radio-text-productionMethod">
                      {t('nextPeriodOfRegularMaintenance')}
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast
                        value={maintenanceDate ? dayjs(maintenanceDate) : null}
                        onChange={handleMaintenanceDateChange}
                        format="DD-MM-YYYY"
                        sx={{ width: '246px' }}
                        slotProps={{
                          textField: {
                            size: 'small',
                            fullWidth: true
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                mt: 1,
                alignItems: 'center',
                marginTop: '20px',
                marginRight: '15px'
              }}
            >
              <Typography sx={{ marginRight: '15px' }} variant="body1" color="error" className="error-message">
                {errorsMessage}
              </Typography>
              <Button variant="outlined" onClick={handleCloseModal} className="cancelButton">
                {t('cancel')}
              </Button>
              <Button variant="contained" className="confirmButton" onClick={handleSubmit}>
                {mode === 'edit' ? t('edit') : t('create')}
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
