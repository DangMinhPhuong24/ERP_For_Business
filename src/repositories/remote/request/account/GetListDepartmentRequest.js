import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetListDepartmentRequest extends Request {
  static Keys = {
    PAGE: paramKeys.PAGE
  }
}
