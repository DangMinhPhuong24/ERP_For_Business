import Request from '../Request'
import paramKeys from '../paramKeys'

export default class DeleteConsultationHistoryRequest extends Request {
  static Keys = {
    CONSULTATION_HISTORY_ID: paramKeys.CONSULTATION_HISTORY_ID,
    CUSTOMER_ID: paramKeys.ID_OF_CUSTOMER,
    CUSTOMER_HANDBOOK_ID: paramKeys.CUSTOMER_HANDBOOK_ID
  }
}
