import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetDetailDepartmentRequest extends Request {
  static Keys = {
    DEPARTMENT_ID: paramKeys.ACCOUNT_DEPARTMENT_ID
  }
}
