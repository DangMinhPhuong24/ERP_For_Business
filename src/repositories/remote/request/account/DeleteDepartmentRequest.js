import Request from '../Request'
import paramKeys from '../paramKeys'

export default class DeleteDepartmentRequest extends Request {
  static Keys = {
    DEPARTMENT_ID: paramKeys.ACCOUNT_DEPARTMENT_ID
  }
}
