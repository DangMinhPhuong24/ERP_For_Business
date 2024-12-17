import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetAllCalendarByUserIdRequest extends Request {
  static Keys = {
    TO_DATE: paramKeys.TO_DATE,
    FROM_DATE: paramKeys.FROM_DATE,
    USER_ID: paramKeys.USER_ID_CALENDAR,
    USER_IDS: paramKeys.USER_IDS
  }
}
