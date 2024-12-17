import Request from '../Request'
import paramKeys from '../paramKeys'

export default class UpdateDepartmentRequest extends Request {
  static Keys = {
    DEPARTMENT_ID: paramKeys.ACCOUNT_DEPARTMENT_ID,
    DEPARTMENT_NAME: paramKeys.DEPARTMENT_NAME,
    DESCRIPTION: paramKeys.DESCRIPTION
  }
}
