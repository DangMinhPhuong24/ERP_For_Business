import Request from '../Request'
import paramKeys from '../paramKeys'

export default class DetailCalendarRequest extends Request {
  static Keys = {
    ID: paramKeys.CALENDAR_ID
  }
}
