import Request from '../Request'
import paramKeys from '../paramKeys'

export default class CreateConsultationHistoryRequest extends Request {
  static Keys = {
    CUSTOMER_ID: paramKeys.ID_OF_CUSTOMER,
    CONSULTATION_DATE: paramKeys.CONSULTATION_DATE,
    CONSULTATION_HISTORY_PROBLEM_ID: paramKeys.CONSULTATION_HISTORY_PROBLEM_ID,
    INFORMATION_PROVIDER: paramKeys.INFORMATION_PROVIDER,
    DESCRIPTION: paramKeys.DESCRIPTION,
    CONSULTANT: paramKeys.CONSULTANT,
    SOLUTION: paramKeys.SOLUTION,
    RESULT: paramKeys.RESULT
  }
}
