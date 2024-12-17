import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { Add } from '@mui/icons-material'
import { Autocomplete, Box, Button, Chip, Grid, TextField, Typography } from '@mui/material'
import colors from 'constants/colors'
import { useUser } from 'contexts/AuthContext'
import React, { useEffect, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { renderAllEvents } from 'utils'
import HeaderPage from '../../components/HeaderPage'
import CreateCalendar from '../../components/Modal/Calendar/CreateCalendar'
import DetailCalendar from '../../components/Modal/Calendar/DetailCalendar'
import { getListAllUserAction } from '../../redux/account/account.actions'
import { listAllUsersState } from '../../redux/account/account.selectors'
import { searchCalendarByUserIdAction } from '../../redux/calendar/calendar.action'
import { allCalendarByUserId } from '../../redux/calendar/calendar.selectors'
import paramKeys from 'repositories/remote/request/paramKeys'
import { useLocation } from 'react-router-dom'
import commons from '../../constants/common'
import { colorUsers } from 'constants'

const CalendarPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { userInfo } = useUser()
  const location = useLocation()
  const calendarId = new URLSearchParams(location.search).get(commons.CALENDAR_ID)
  const listAllUsers = useSelector(listAllUsersState)
  const listAllCalendars = useSelector(allCalendarByUserId)

  const [myEvents, setMyEvents] = React.useState({})
  const [open, setOpen] = React.useState(false)
  const [openDetailCalendar, setOpenDetailCalendar] = React.useState(false)
  const [openNotificationCalendar, setOpenNotificationCalendar] = React.useState(true)
  const [invitees, setInvitees] = React.useState([])

  const calendarRef = useRef(null)

  useEffect(() => {
    dispatch(getListAllUserAction({ [paramKeys.EXCEPT_AUTH]: true }))
  }, [dispatch])

  const allInvitees = useMemo(() => invitees.map((invitee) => invitee.id), [invitees])
  const listUsers = useMemo(() => [userInfo.id, ...allInvitees], [allInvitees, userInfo.id])

  const listUserExceptSelected = useMemo(
    () => listAllUsers.filter((user) => !allInvitees.includes(user.id)),
    [allInvitees, listAllUsers]
  )

  useEffect(() => {
    dispatch(searchCalendarByUserIdAction({ [paramKeys.USER_IDS]: allInvitees }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, openDetailCalendar, open, invitees])

  useEffect(() => {
    const listAllEvents = renderAllEvents(listAllCalendars, listUsers, userInfo)

    if (listAllEvents.length > 0) {
      setMyEvents(listAllEvents)
    }
  }, [listAllCalendars, listUsers, userInfo])

  const [dateInfo, setDateInfo] = React.useState(null)
  const [dateEvent, setDateEvent] = React.useState(null)

  const handleClickOpen = (dateFromDateClick) => {
    setOpen(true)
    setDateEvent(dateFromDateClick)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCloseDetailCalendar = () => {
    setDateInfo(null)
    setOpenDetailCalendar(false)
  }

  useEffect(() => {
    if (calendarId && Array.isArray(myEvents) && openNotificationCalendar) {
      const event = myEvents.find((data) => data.event_id === parseFloat(calendarId))
      if (event) {
        const updatedEvent = {
          extendedProps: {
            event_id: event.event_id,
            is_owner: event.is_owner
          }
        }
        setDateInfo(updatedEvent)
        setOpenDetailCalendar(true)
        setOpenNotificationCalendar(false)
        if (calendarRef.current) {
          calendarRef.current.getApi().gotoDate(event.start)
        }
      }
    }
  }, [calendarId, myEvents, openNotificationCalendar])

  useEffect(() => {
    if (calendarId) {
      setOpenNotificationCalendar(true)
    }
  }, [calendarId])

  return (
    <>
      <HeaderPage title={t('workPlan')} />
      <Box p={2} sx={{ display: 'flex', alignItems: 'center' }}>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <Box mb={2}>
              <Button variant="outlined" sx={{ borderRadius: '17px' }} onClick={() => handleClickOpen(null)}>
                <Add />
                <Typography>{t('create')}</Typography>
              </Button>
              {open && (
                <CreateCalendar open={open} onClose={handleClose} valueUpdate={dateEvent} arrInviteesId={allInvitees} />
              )}
            </Box>
            <Box>
              <Autocomplete
                multiple
                sx={{ maxWidth: '300px !important' }}
                limitTags={3}
                id="tags-standard"
                options={listUserExceptSelected}
                noOptionsText={t('noResult')}
                getOptionLabel={(option) => option.name}
                onChange={(event, newValue) => {
                  setInvitees(newValue)
                }}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => {
                    const { key, ...tagProps } = getTagProps({ index })
                    const indexOfColors = listUsers.indexOf(parseInt(option.id))
                    return (
                      <Chip
                        key={key}
                        variant="outlined"
                        label={option.name}
                        sx={{ border: `2px solid ${colorUsers[indexOfColors]}` }}
                        size="small"
                        {...tagProps}
                      />
                    )
                  })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="standard"
                    label={t('meetWith') + '...'}
                    placeholder={t('searchForPeople')}
                  />
                )}
              />
            </Box>
          </Grid>
          <Grid item xs={10}>
            <Box
              p={2}
              sx={{
                backgroundColor: colors.lilywhiteColor,
                width: '100%',
                borderRadius: '10px'
              }}
            >
              {myEvents && (
                <FullCalendar
                  ref={calendarRef}
                  headerToolbar={{
                    end: 'dayGridYear,dayGridMonth,timeGridWeek,timeGridDay',
                    center: 'title',
                    start: 'prev today next'
                  }}
                  buttonText={{
                    today: t('toDay'),
                    year: t('year'),
                    month: t('month'),
                    week: t('week'),
                    day: t('day'),
                    list: t('list')
                  }}
                  select={function (selectionInfo) {
                    handleClickOpen(selectionInfo)
                  }}
                  locale={localStorage.getItem('react-app-lang') || 'en'}
                  height={'650px'}
                  plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
                  initialView="timeGridWeek"
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={true}
                  dragScroll={true}
                  events={myEvents}
                  allDayText={t('allDay')}
                  dateClick={function (info) {
                    handleClickOpen(info)
                  }}
                  eventClick={function (info) {
                    setOpenDetailCalendar(true)
                    setDateInfo(info.event)
                  }}
                />
              )}
              {openDetailCalendar && (
                <DetailCalendar
                  open={openDetailCalendar}
                  onClose={handleCloseDetailCalendar}
                  selectedValue={dateInfo}
                  arrInviteesId={allInvitees}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default CalendarPage
