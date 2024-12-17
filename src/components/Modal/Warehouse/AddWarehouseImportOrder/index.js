import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import DateRangeIcon from '@mui/icons-material/DateRange'
import { Box, IconButton, InputAdornment, InputBase, InputLabel, styled } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Backdrop from '@mui/material/Backdrop'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PolygonIcon from '../../../../asset/icon/Polygon.svg'
import colors from '../../../../constants/colors'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: '535px',
  height: '445px',
  maxHeight: '550px',
  borderRadius: '16px',
  overflow: 'auto'
}
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 5,
    position: 'relative',
    border: '1px solid',
    fontSize: 16,
    borderColor: colors.greyColor,
    textAlign: 'center',
    padding: '8px 12px',
    '&:focus': {
      borderColor: theme.palette.primary.main
    }
  }
}))

export default function AddWarehouseImportOrderModal({ open, nameTitle, handleCloseModal }) {
  const { t } = useTranslation()
  const [selectedDate, setSelectedDate] = useState(null)

  const dataLocation = [{ label: `${t('location')} 1` }, { label: `${t('location')} 2` }]
  const dataOrigin = [{ label: `${t('origin')} 1` }, { label: `${t('purchaseCalendar')} 2` }]

  const handleSubmit = () => {}
  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
    setSelectedDate(formattedDate)
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
        <Box sx={style}>
          <Box p={2}>
            <Typography className="modalTitle">{nameTitle}</Typography>
            <Box>
              <Box>
                <InputLabel required className="inputLabel-modal">
                  {t('origin')}
                </InputLabel>
                <Autocomplete
                  popupIcon={<PolygonIcon />}
                  size="small"
                  fullWidth
                  options={dataOrigin}
                  renderInput={(params) => (
                    <TextField {...params} placeholder={t('placeholderOrigin')} variant="outlined" />
                  )}
                  ListboxProps={{ sx: { fontSize: '12px' } }}
                />
              </Box>
              <Box>
                <InputLabel required className="inputLabel-modal">
                  {t('inputTime')}
                </InputLabel>
                <Box sx={{ display: 'flex', gap: '0 16px' }}>
                  <Box flex={1}>
                    <BootstrapInput fullWidth placeholder="9:00" />
                  </Box>
                  <Box flex={1}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <MobileDatePicker
                        disablePast
                        placeholder={t('selectDate')}
                        value={selectedDate ? dayjs(selectedDate) : null}
                        format="DD/MM/YYYY"
                        onChange={handleDateChange}
                        slotProps={{
                          textField: {
                            sx: { width: '100%' },
                            size: 'small',
                            InputProps: {
                              sx: { width: '100%' },
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton edge="end">
                                    <DateRangeIcon sx={{ color: colors.whiteColor }} />
                                  </IconButton>
                                </InputAdornment>
                              )
                            }
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: '0 16px' }}>
                <Box flex={1}>
                  <InputLabel required className="inputLabel-modal">
                    {t('receivingLocation')}
                  </InputLabel>
                  <Autocomplete
                    popupIcon={<PolygonIcon />}
                    size="small"
                    fullWidth
                    options={dataLocation}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('selectReceivingLocation')} variant="outlined" />
                    )}
                    ListboxProps={{ sx: { fontSize: '12px' } }}
                  />
                </Box>
                <Box flex={1}>
                  <InputLabel required className="inputLabel-modal">
                    {t('importLocation')}
                  </InputLabel>
                  <Autocomplete
                    popupIcon={<PolygonIcon />}
                    size="small"
                    fullWidth
                    options={dataLocation}
                    renderInput={(params) => (
                      <TextField {...params} placeholder={t('selectImportLocation')} variant="outlined" />
                    )}
                    ListboxProps={{ sx: { fontSize: '12px' } }}
                  />
                </Box>
              </Box>
              <Box>
                <InputLabel className="inputLabel-modal">{t('additionalNotes')}</InputLabel>
                <TextField fullWidth multiline placeholder={t('enterNotesAboutTheSupplierIfApplicable')} rows={2} />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: '8px 16px',
              bgcolor: colors.paleblueColor
            }}
          >
            <Button onClick={handleCloseModal} className="cancelButton">
              {t('cancel')}
            </Button>
            <Button onClick={handleSubmit} className="confirmButton">
              {t('add')}
              <ArrowForwardIcon />
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
