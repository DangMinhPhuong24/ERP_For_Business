// @ts-nocheck
import React, { useEffect } from 'react'
import { Box, Button, Typography, Toolbar, Autocomplete } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { TextField, InputLabel } from '@mui/material'
import colors from '../../../../../../constants/colors'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { useNavigate, useLocation } from 'react-router-dom'
import * as yup from 'yup'
import DatePickerCalendar from 'components/DateTime/DatePickerCalendar'
import dayjs from 'dayjs'
import {
  listAllConsultationHistoryProblemState,
  detailConsultationHistoryState
} from '../../../../../../redux/customer/customer.selectors'
import {
  createConsultationHistoryAction,
  getAllConsultationHistoryProblemAction,
  getDetailConsultationHistoryAction,
  updateConsultationHistoryAction
} from '../../../../../../redux/customer/customer.actions'
import { useDispatch, useSelector } from 'react-redux'

export default function CreateOrUpdateConsultantHistoryMobile() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const mode = queryParams.get('mode')
  const customerId = queryParams.get('customer_id')
  const consultationHistoryId = queryParams.get('consultation_history_id')
  const customerHandBookId = queryParams.get('customer_handbook_id')

  const listAllConsultationHistoryProblem = useSelector(listAllConsultationHistoryProblemState)
  const detailConsultationHistory = useSelector(detailConsultationHistoryState)

  const schema = yup.object().shape({
    consultationHistoryProblemName: yup.string().trim(),
    informationProvider: yup.string().trim(),
    description: yup.string().trim(),
    consultant: yup.string().trim(),
    solution: yup.string().trim(),
    result: yup.string().trim()
  })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      consultationDate: consultationHistoryId
        ? dayjs(detailConsultationHistory.consultation_date).format('DD-MM-YYYY')
        : dayjs(dayjs(), 'DD-MM-YYYY').format('DD-MM-YYYY'),
      consultationHistoryProblemName: consultationHistoryId
        ? detailConsultationHistory?.consultation_history_problem?.id
        : '',
      informationProvider: consultationHistoryId ? detailConsultationHistory?.information_provider : '',
      description: consultationHistoryId ? detailConsultationHistory?.information_provider : '',
      consultant: consultationHistoryId ? detailConsultationHistory?.description : '',
      solution: consultationHistoryId ? detailConsultationHistory?.solution : '',
      result: consultationHistoryId ? detailConsultationHistory?.result : ''
    }
  })

  useEffect(() => {
    if (consultationHistoryId) {
      setValue('consultationDate', detailConsultationHistory.consultation_date || dayjs().format('DD-MM-YYYY'))
      setValue('consultationHistoryProblemName', detailConsultationHistory?.consultation_history_problem?.id || '')
      setValue('informationProvider', detailConsultationHistory.information_provider || '')
      setValue('description', detailConsultationHistory.description || '')
      setValue('consultant', detailConsultationHistory.consultant || '')
      setValue('solution', detailConsultationHistory.solution || '')
      setValue('result', detailConsultationHistory.result || '')
    }
  }, [detailConsultationHistory])

  useEffect(() => {
    dispatch(getAllConsultationHistoryProblemAction())
    if (consultationHistoryId) {
      dispatch(
        getDetailConsultationHistoryAction({
          id: consultationHistoryId,
          customer_id: customerId,
          customer_handbook_id: customerHandBookId
        })
      )
    }
  }, [])

  const onSubmit = async (data) => {
    const consultationDate = dayjs(data.consultationDate, 'DD-MM-YYYY')
    const mappedData = {
      customer_id: customerId,
      consultation_date: consultationDate.isValid() ? consultationDate.format('YYYY-MM-DD') : null,
      consultation_history_problem_id: data.consultationHistoryProblemName,
      information_provider: data.informationProvider,
      description: data.description,
      consultant: data.consultant,
      solution: data.solution,
      result: data.result
    }

    try {
      if (consultationHistoryId) {
        await dispatch(
          updateConsultationHistoryAction({
            id: consultationHistoryId,
            customer_handbook_id: customerHandBookId,
            ...mappedData
          })
        )
      } else {
        await dispatch(createConsultationHistoryAction(mappedData))
      }

      navigate(`/sale/information/consultant-history?customer_id=${customerId}`)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  const handleBackListPage = () => {
    navigate(`/sale/information/consultant-history?customer_id=${customerId}`)
  }

  const handleFormSubmit = () => {
    handleSubmit(onSubmit)()
  }

  return (
    <Box>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: '8px 16px !important',
          bgcolor: colors.lightlavendergrayColor,
          minHeight: '48px !important',
          border: '1px solid #EFF0F6 !important'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            sx={{
              bgcolor: colors.whiteColor,
              color: colors.lightroyalblueColor,
              mr: 1,
              minWidth: '30px',
              borderRadius: '8px'
            }}
            onClick={() => handleBackListPage()}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />
          </Button>
          <Typography sx={{ fontWeight: 400, fontSize: 16, color: colors.lightroyalblueColor }}>
            {mode === 'view'
              ? t('consultationDetail')
              : consultationHistoryId
                ? t('editConsultation')
                : t('addConsultation')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          {mode !== 'view' && (
            <Button className="modalButtonClick" sx={{ gap: '8px' }} onClick={handleFormSubmit}>
              <AddCircleOutlineIcon />
              {t('save')}
            </Button>
          )}
        </Box>
      </Toolbar>
      <Box p={2} component="form" sx={{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', position: 'relative' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={{ mb: 2 }}>
            <InputLabel className="inputLabel-modal">{t('day')}</InputLabel>
            {mode === 'view' ? (
              <InputLabel className="inputLabel-handbook-view">
                {detailConsultationHistory.consultation_date
                  ? detailConsultationHistory.consultation_date
                  : t('noData')}
              </InputLabel>
            ) : (
              <Controller
                name="consultationDate"
                control={control}
                render={({ field }) => {
                  return <DatePickerCalendar {...field} value={dayjs(field.value, 'DD/MM/YYYY').format('DD-MM-YYYY')} />
                }}
              />
            )}
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel className="inputLabel-modal">{t('consultationHistoryProblemName')}</InputLabel>
            {mode === 'view' ? (
              <InputLabel className="inputLabel-handbook-view">
                {listAllConsultationHistoryProblem.find(
                  (option) => option.id === detailConsultationHistory?.consultation_history_problem?.id
                )?.consultation_history_problem_name || t('noData')}
              </InputLabel>
            ) : (
              <Controller
                name="consultationHistoryProblemName"
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    options={listAllConsultationHistoryProblem}
                    getOptionLabel={(option) => option.consultation_history_problem_name}
                    noOptionsText={t('noResult')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder={t('select')}
                        error={!!errors.consultationHistoryProblemName}
                        helperText={
                          errors.consultationHistoryProblemName ? errors.consultationHistoryProblemName.message : ''
                        }
                      />
                    )}
                    onChange={(_, value) => {
                      field.onChange(value ? value.id : '')
                    }}
                    value={listAllConsultationHistoryProblem.find((option) => option.id === field.value) || null}
                    ListboxProps={{ style: { maxHeight: '180px', fontSize: '12px' } }}
                  />
                )}
              />
            )}
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel className="inputLabel-modal">{t('informationProvider')}</InputLabel>
            {mode === 'view' ? (
              <InputLabel className="inputLabel-handbook-view">
                {detailConsultationHistory?.information_provider || t('noData')}
              </InputLabel>
            ) : (
              <Controller
                name="informationProvider"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ width: '100% !important' }}
                    className="input-style"
                    placeholder={t('informationProvider')}
                    error={!!errors.informationProvider}
                    helperText={errors.informationProvider ? errors.informationProvider.message : ''}
                  />
                )}
              />
            )}
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel className="inputLabel-modal">{t('consultant')}</InputLabel>
            {mode === 'view' ? (
              <InputLabel className="inputLabel-handbook-view">
                {detailConsultationHistory?.consultant || t('noData')}
              </InputLabel>
            ) : (
              <Controller
                name="consultant"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ width: '100% !important' }}
                    className="input-style"
                    placeholder={t('consultant')}
                    error={!!errors.consultant}
                    helperText={errors.consultant ? errors.consultant.message : ''}
                  />
                )}
              />
            )}
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel className="inputLabel-modal">{t('description')}</InputLabel>
            {mode === 'view' ? (
              <InputLabel className="inputLabel-handbook-view">
                {detailConsultationHistory?.description || t('noData')}
              </InputLabel>
            ) : (
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ width: '100% !important' }}
                    multiline
                    className="input-style"
                    placeholder={t('description')}
                    rows={2}
                    error={!!errors.description}
                    helperText={errors.description ? errors.description.message : ''}
                  />
                )}
              />
            )}
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel className="inputLabel-modal">{t('solution')}</InputLabel>
            {mode === 'view' ? (
              <InputLabel className="inputLabel-handbook-view">
                {detailConsultationHistory?.solution || t('noData')}
              </InputLabel>
            ) : (
              <Controller
                name="solution"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ width: '100% !important' }}
                    multiline
                    className="input-style"
                    placeholder={t('solution')}
                    rows={2}
                    error={!!errors.solution}
                    helperText={errors.solution ? errors.solution.message : ''}
                  />
                )}
              />
            )}
          </Box>
          <Box sx={{ mb: 2 }}>
            <InputLabel className="inputLabel-modal">{t('result')}</InputLabel>
            {mode === 'view' ? (
              <InputLabel className="inputLabel-handbook-view">
                {detailConsultationHistory?.result || t('noData')}
              </InputLabel>
            ) : (
              <Controller
                name="result"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    sx={{ width: '100% !important' }}
                    multiline
                    className="input-style"
                    placeholder={t('result')}
                    rows={2}
                    error={!!errors.result}
                    helperText={errors.result ? errors.result.message : ''}
                  />
                )}
              />
            )}
          </Box>
        </form>
      </Box>
    </Box>
  )
}
