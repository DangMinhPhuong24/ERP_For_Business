import Request from '../Request'
import paramKeys from '../paramKeys'

export default class ApproveCalendarRequest extends Request {
  static Keys = {
    ID: paramKeys.CALENDAR_ID,
    CALENDAR_STATUS_ID: paramKeys.CALENDAR_STATUS_ID
  }
}
