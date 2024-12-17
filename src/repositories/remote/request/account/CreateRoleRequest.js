import Request from '../Request'
import paramKeys from '../paramKeys'

export default class CreateRoleRequest extends Request {
  static Keys = {
    DISPLAY_NAME: paramKeys.DISPLAY_NAME,
    ROLE_TYPE: paramKeys.ROLE_TYPE,
    PERMISSIONS: paramKeys.PERMISSIONS
  }
}
