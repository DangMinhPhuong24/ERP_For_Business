import Request from '../Request'
import paramKeys from '../paramKeys'

export default class CreateCalendarRequest extends Request {
  static Keys = {
    TITLE_CALENDAR: paramKeys.TITLE_CALENDAR,
    DATE_CALENDAR: paramKeys.DATE_CALENDAR,
    START_TIME_CALENDAR: paramKeys.START_TIME_CALENDAR,
    END_TIME_CALENDAR: paramKeys.END_TIME_CALENDAR,
    DESCRIPTION_CALENDAR: paramKeys.DESCRIPTION_CALENDAR,
    USER_IDS: paramKeys.USER_IDS
  }
}
