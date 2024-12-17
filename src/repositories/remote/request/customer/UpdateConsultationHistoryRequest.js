import Request from '../Request'
import paramKeys from '../paramKeys'

export default class UpdateConsultationHistoryRequest extends Request {
  static Keys = {
    CONSULTATION_HISTORY_ID: paramKeys.CONSULTATION_HISTORY_ID,
    CUSTOMER_ID: paramKeys.ID_OF_CUSTOMER,
    CUSTOMER_HANDBOOK_ID: paramKeys.CUSTOMER_HANDBOOK_ID,
    CONSULTATION_DATE: paramKeys.CONSULTATION_DATE,
    CONSULTATION_HISTORY_PROBLEM_ID: paramKeys.CONSULTATION_HISTORY_PROBLEM_ID,
    INFORMATION_PROVIDER: paramKeys.INFORMATION_PROVIDER,
    DESCRIPTION: paramKeys.DESCRIPTION,
    CONSULTANT: paramKeys.CONSULTANT,
    SOLUTION: paramKeys.SOLUTION,
    RESULT: paramKeys.RESULT
  }
}
