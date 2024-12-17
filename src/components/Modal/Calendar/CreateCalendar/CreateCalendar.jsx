import { yupResolver } from '@hookform/resolvers/yup'
import { Close } from '@mui/icons-material'
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  InputLabel,
  TextField
} from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import PolygonIcon from '../../../../asset/icon/Polygon.svg'
import { getListAllUserAction } from '../../../../redux/account/account.actions'
import { listAllUsersState } from '../../../../redux/account/account.selectors'
import {
  createCalendarAction,
  searchCalendarByUserIdAction,
  updateCalendarAction
} from '../../../../redux/calendar/calendar.action'
import DatePickerCalendar from '../../../DateTime/DatePickerCalendar'
import TimePicker from '../../../DateTime/TimePicker'
import paramKeys from 'repositories/remote/request/paramKeys'
import moment from 'moment/moment'
import { LoadingButton } from '@mui/lab'

const CreateCalendar = (props) => {
  const { onClose, open, valueUpdate, isEdit = false, arrInviteesId } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const listAllUsers = useSelector(listAllUsersState)
  const [invitees, setInvitees] = useState([])

  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setValue('date', '')
    setValue('start_time', '')
    setValue('end_time', '')
    if (isEdit) {
      setValue('title', valueUpdate?.title ? valueUpdate?.title : '')
      setValue('date', valueUpdate?.extendedProps.start_date ? dayjs(valueUpdate?.extendedProps.start_date) : '')
      setValue('start_time', valueUpdate?.start ? dayjs(valueUpdate?.start) : '')
      setValue('end_time', valueUpdate?.end ? dayjs(valueUpdate?.end) : '')
      setValue('description', valueUpdate?.extendedProps.description ? valueUpdate?.extendedProps.description : '')
      setValue('user_ids', allInvitees)
      setInvitees(allInvitees)
    } else {
      setValue('date', valueUpdate?.startStr ? dayjs(valueUpdate?.startStr) : '')
      setValue('start_time', valueUpdate?.start ? dayjs(valueUpdate?.start) : '')
      setValue('end_time', valueUpdate?.end ? dayjs(valueUpdate?.end) : '')
      setInvitees(allInvitees)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const validationSchema = yup.object().shape({
    title: yup.string().required(t('titleRequired')),
    date: yup
      .string()
      .required(t('dateRequired'))
      .typeError(t('pleaseFillTrueFormat'))
      .transform((curr, orig) => {
        return orig === '' ? null : curr
      })
      .default(undefined),
    start_time: yup
      .string()
      .required(t('startTimeRequired'))
      .typeError(t('pleaseFillTrueFormat'))
      .transform((curr, orig) => {
        return orig === '' ? null : curr
      }),
    end_time: yup
      .string()
      .ensure()
      .required(t('endTimeRequired'))
      .typeError(t('pleaseFillTrueFormat'))
      .transform((curr, orig) => {
        return orig === '' ? null : curr
      })
      .test('is-greater', t('endTimeMustBeLaterThanStartTime'), function (value) {
        const { start_time } = this.parent
        return moment(new Date(value), 'HH:mm').isAfter(moment(new Date(start_time), 'HH:mm'))
      }),
    description: yup.string(),
    user_ids: yup.array().nullable()
  })

  const allInvitees = useMemo(() => {
    if (isEdit) {
      const arrUsers = valueUpdate?.extendedProps.invitees.map((invitee) => {
        return invitee.user.id
      })
      return listAllUsers.filter((user) => arrUsers.includes(user.id))
    } else {
      return listAllUsers.filter((user) => arrInviteesId.includes(user.id))
    }
  }, [arrInviteesId, isEdit, listAllUsers, valueUpdate])

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    register
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: '',
      date: '',
      start_time: '',
      end_time: '',
      description: '',
      user_ids: []
    },
    mode: 'all'
  })

  useEffect(() => {
    dispatch(getListAllUserAction({ [paramKeys.EXCEPT_AUTH]: true }))
  }, [dispatch])

  const onSubmit = (data) => {
    const userInvitee = invitees.length > 0 ? invitees.map((invitee) => invitee.id) : []
    const transformedData = {
      ...data,
      user_ids: userInvitee,
      date: dayjs(data.date).format('YYYY-MM-DD'),
      start_time: dayjs(data.start_time).format('HH:mm'),
      end_time: dayjs(data.end_time).format('HH:mm')
    }
    setLoading(!loading)
    if (isEdit) {
      transformedData.id = valueUpdate?.extendedProps.event_id
      dispatch(updateCalendarAction(transformedData))
      dispatch(searchCalendarByUserIdAction({ user_ids: arrInviteesId }))
      setTimeout(() => {
        setLoading(!loading)
        toast.success(t('updateCalendarSuccessful'))
        handleClose()
      }, 1000)
      reset()
    } else {
      dispatch(createCalendarAction(transformedData))
      dispatch(searchCalendarByUserIdAction({ user_ids: arrInviteesId }))
      setTimeout(() => {
        setLoading(!loading)
        toast.success(t('createCalendarSuccessful'))
        handleClose()
      }, 1000)
      reset()
    }
  }

  const handleClose = () => {
    onClose(true)
  }

  const filterOptions = (options, { inputValue }) => {
    const lowercasedInput = inputValue.toLowerCase()
    return options.filter((option) => {
      const name = option.name ? option.name.toLowerCase() : ''
      const username = option.username ? option.username.toLowerCase() : ''
      return name.includes(lowercasedInput) || username.includes(lowercasedInput)
    })
  }

  return (
    <>
      {open && (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <Close />
          </IconButton>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogContent>
              <Grid mt={2}>
                <InputLabel required className="requiredTextField inputLabel-calendar">
                  {t('titleCalendar')}
                </InputLabel>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      sx={{ width: '100%' }}
                      {...field}
                      size="small"
                      error={!!errors.title}
                      helperText={errors.title ? errors.title.message : ''}
                    />
                  )}
                />
              </Grid>
              <Grid mt={2}>
                <InputLabel required className="requiredTextField inputLabel-calendar">
                  {t('timeCalendar')}
                </InputLabel>
                <Grid container spacing={0.5}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Controller
                        name="date"
                        control={control}
                        render={({ field }) => <DatePickerCalendar {...field} error={errors.date} />}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', gap: '0 5px' }}>
                      <Box>
                        <Controller
                          name="start_time"
                          control={control}
                          render={({ field }) => <TimePicker {...field} error={errors.start_time} />}
                        />
                      </Box>
                      <span style={{ fontSize: '20px' }}>-</span>
                      <Box>
                        <Controller
                          name="end_time"
                          control={control}
                          render={({ field }) => <TimePicker {...field} error={errors.end_time} />}
                        />
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
              <Grid mt={2}>
                <InputLabel className="inputLabel-calendar">{t('description')}</InputLabel>
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      className="calendar-description"
                      sx={{ width: '100%' }}
                      {...field}
                      size="small"
                      rows={4}
                      multiline
                      error={!!errors.description}
                      helperText={errors.description ? errors.description.message : ''}
                    />
                  )}
                />
              </Grid>
              <Grid mt={2}>
                <InputLabel className="inputLabel-calendar">{t('userParticipate')}</InputLabel>
                <Autocomplete
                  limitTags={3}
                  size="small"
                  popupIcon={<PolygonIcon />}
                  noOptionsText={t('noResult')}
                  {...register('user_ids')}
                  multiple
                  value={invitees}
                  onChange={(event, newValue) => {
                    setInvitees(newValue)
                  }}
                  options={listAllUsers}
                  filterOptions={filterOptions}
                  getOptionLabel={(option) => (option ? `${option.name} (${option.username})` : '')}
                  renderInput={(params) => (
                    <TextField
                      error={!!errors.user_ids}
                      helperText={errors.user_ids ? errors.user_ids.message : ''}
                      {...params}
                    />
                  )}
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>{t('cancel')}</Button>
              <LoadingButton loading={loading} type="submit">
                {isEdit ? t('update') : t('create')}
              </LoadingButton>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  )
}

export default CreateCalendar
