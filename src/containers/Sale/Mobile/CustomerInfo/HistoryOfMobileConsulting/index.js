import React from 'react'
import { Box, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import dayjs from 'dayjs'
import DateRangeIcon from '@mui/icons-material/DateRange'
import colors from '../../../../../constants/colors'
import PolygonIcon from '../../../../../asset/icon/Polygon.svg'
import Autocomplete from '@mui/material/Autocomplete'
import { useTranslation } from 'react-i18next'

function HistoryOfMobileConsultingPage(props) {
  const {
    listAllConsultationHistoryProblem,
    data,
    mode,
    handleUpdateConsultingHistory,
    handleCreateConsultingHistory,
    isEdit
  } = props
  const { t } = useTranslation()

  return (
    <Box>
      <Box>
        <InputLabel className="inputLabel-handbook">{t('day')}</InputLabel>
        {mode ? (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              placeholder={t('selectDate')}
              value={dayjs(data.item?.consultation_date)}
              format="DD-MM-YYYY"
              error={false}
              onChange={(date) => {
                if (!isEdit) {
                  handleCreateConsultingHistory('consultation_date', date.format('YYYY-MM-DD'))
                } else {
                  handleUpdateConsultingHistory(data?.index, 'consultation_date', date.format('YYYY-MM-DD'))
                }
              }}
              slotProps={{
                textField: {
                  size: 'small',
                  sx: {
                    '& input': {
                      fontSize: '0.75rem !important',
                      fontWeight: 400
                    },
                    '& input::placeholder': {
                      fontSize: '0.625rem !important',
                      fontWeight: 400
                    }
                  },
                  InputProps: {
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
        ) : (
          <InputLabel className="inputLabel-handbook-view">
            {dayjs(data.item?.consultation_date).format('DD/MM/YYYY') || t('noData')}
          </InputLabel>
        )}
      </Box>
      <Box>
        <InputLabel className="inputLabel-handbook">{t('problem')}</InputLabel>
        {mode ? (
          <Autocomplete
            popupIcon={<PolygonIcon />}
            noOptionsText={t('noResult')}
            onChange={(event, newValue) => {
              if (!isEdit) {
                handleCreateConsultingHistory('consultation_history_problem_id', newValue.id)
              } else {
                handleUpdateConsultingHistory(data?.index, 'consultation_history_problem_id', newValue.id)
              }
            }}
            options={listAllConsultationHistoryProblem}
            getOptionLabel={(option) => option.consultation_history_problem_name}
            value={
              listAllConsultationHistoryProblem.find(
                (product) => product.id === data.item?.consultation_history_problem_id
              ) || null
            }
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                placeholder={t('select')}
                InputProps={{
                  ...params.InputProps
                }}
              />
            )}
            ListboxProps={{ style: { maxHeight: '180px', fontSize: '12px' } }}
          />
        ) : (
          <InputLabel className="inputLabel-handbook-view">
            {listAllConsultationHistoryProblem.find(
              (product) => product.id === data.item?.consultation_history_problem_id
            )?.consultation_history_problem_name || t('noData')}
          </InputLabel>
        )}
      </Box>
      <Box>
        <InputLabel className="inputLabel-handbook">{t('informationDisseminator')}</InputLabel>
        {mode ? (
          <TextField
            fullWidth
            value={data.item?.information_provider}
            onChange={(e) => {
              if (!isEdit) {
                handleCreateConsultingHistory('information_provider', e.target.value)
              } else {
                handleUpdateConsultingHistory(data?.index, 'information_provider', e.target.value)
              }
            }}
          />
        ) : (
          <InputLabel className="inputLabel-handbook-view">{data.item?.information_provider || t('noData')}</InputLabel>
        )}
      </Box>
      <Box>
        <InputLabel className="inputLabel-handbook">{t('describeTheProblem')}</InputLabel>
        {mode ? (
          <TextField
            multiline
            maxRows={4}
            fullWidth
            value={data.item?.description}
            onChange={(e) => {
              if (!isEdit) {
                handleCreateConsultingHistory('description', e.target.value)
              } else {
                handleUpdateConsultingHistory(data?.index, 'description', e.target.value)
              }
            }}
          />
        ) : (
          <InputLabel className="inputLabel-handbook-view">{data.item?.description || t('noData')}</InputLabel>
        )}
      </Box>
      <Box>
        <InputLabel className="inputLabel-handbook">{t('consultants')}</InputLabel>
        {mode ? (
          <TextField
            fullWidth
            value={data.item?.consultant}
            onChange={(e) => {
              if (!isEdit) {
                handleCreateConsultingHistory('consultant', e.target.value)
              } else {
                handleUpdateConsultingHistory(data?.index, 'consultant', e.target.value)
              }
            }}
          />
        ) : (
          <InputLabel className="inputLabel-handbook-view">{data.item?.consultant || t('noData')}</InputLabel>
        )}
      </Box>
      <Box>
        <InputLabel className="inputLabel-handbook">{t('solution')}</InputLabel>
        {mode ? (
          <TextField
            multiline
            maxRows={4}
            fullWidth
            value={data.item?.solution}
            onChange={(e) => {
              if (!isEdit) {
                handleCreateConsultingHistory('solution', e.target.value)
              } else {
                handleUpdateConsultingHistory(data?.index, 'solution', e.target.value)
              }
            }}
          />
        ) : (
          <InputLabel className="inputLabel-handbook-view">{data.item?.solution || t('noData')}</InputLabel>
        )}
      </Box>
      <Box>
        <InputLabel className="inputLabel-handbook">{t('result')}</InputLabel>
        {mode ? (
          <TextField
            multiline
            maxRows={4}
            fullWidth
            value={data.item?.result}
            onChange={(e) => {
              if (!isEdit) {
                handleCreateConsultingHistory('result', e.target.value)
              } else {
                handleUpdateConsultingHistory(data?.index, 'result', e.target.value)
              }
            }}
          />
        ) : (
          <InputLabel className="inputLabel-handbook-view">{data.item?.result || t('noData')}</InputLabel>
        )}
      </Box>
    </Box>
  )
}

export default HistoryOfMobileConsultingPage
