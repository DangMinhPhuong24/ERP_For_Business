import Request from '../Request'
import paramKeys from '../paramKeys'

export default class CreateDepartmentRequest extends Request {
  static Keys = {
    DEPARTMENT_NAME: paramKeys.DEPARTMENT_NAME,
    DESCRIPTION: paramKeys.DESCRIPTION
  }
}
