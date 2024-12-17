import { colorUsers } from 'constants/colorsCalendar'
import colors from 'constants/colors'
import dayjs from 'dayjs'
import { flattenDeep } from 'lodash'
import { statusApproveCalendar } from 'constants'

export const renderAllEvents = (listAllCalendars, listUsers, userInfo) => {
  let listUserExceptAuth = [...listUsers]
  listUserExceptAuth.shift()

  const arrEvents = flattenDeep(listAllCalendars).map((calendarEvent) => {
    const indexOfColors = listUsers.indexOf(parseInt(calendarEvent.user_id))
    let event = {
      display: 'block',
      title: calendarEvent.title,
      start: dayjs(calendarEvent.date + 'T' + calendarEvent.start_time).format('YYYY-MM-DD HH:mm:ss'),
      end: dayjs(calendarEvent.date + 'T' + calendarEvent.end_time).format('YYYY-MM-DD HH:mm:ss'),
      start_date: calendarEvent.date,
      end_date: calendarEvent.end_date ?? null,
      start_time: calendarEvent.start_time,
      end_time: calendarEvent.end_time,
      description: calendarEvent.description,
      creator: calendarEvent.creator,
      event_id: calendarEvent.id,
      is_owner: calendarEvent.check,
      invitees: calendarEvent.calendar_user ?? [],
      groupId: calendarEvent.user_id,
      borderColor: colorUsers[indexOfColors],
      backgroundColor: colorUsers[indexOfColors],
      isGuest: listUserExceptAuth.includes(calendarEvent.creator.id) ? true : false
    }

    // eslint-disable-next-line eqeqeq
    if (calendarEvent.creator.id === userInfo?.id && calendarEvent.user_id == userInfo?.id) {
      event.borderColor = colorUsers[indexOfColors]
      event.backgroundColor = colorUsers[indexOfColors]
      event.textColor = colors.lilywhiteColor
    } else {
      if (calendarEvent.status_join === statusApproveCalendar.APPROVED) {
        event.borderColor = colorUsers[indexOfColors]
        event.backgroundColor = colorUsers[indexOfColors]
        event.textColor = colors.lilywhiteColor
      } else if (calendarEvent.status_join === statusApproveCalendar.REJECTED) {
        event.borderColor = colorUsers[indexOfColors]
        event.backgroundColor = colors.paleblueColor
        event.textColor = colorUsers[indexOfColors]
      } else {
        event.borderColor = colorUsers[indexOfColors]
        event.backgroundColor = colors.paleblueColor
        event.textColor = colorUsers[indexOfColors]
      }
    }

    return event
  })
  return arrEvents
}
