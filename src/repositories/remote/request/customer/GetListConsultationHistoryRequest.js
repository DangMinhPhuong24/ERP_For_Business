import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetListConsultationHistoryRequest extends Request {
  static Keys = {
    PAGE: paramKeys.PAGE,
    CUSTOMER_ID: paramKeys.ID_OF_CUSTOMER,
    FROM_DATE: paramKeys.FROM_DATE,
    TO_DATE: paramKeys.TO_DATE
  }
}
