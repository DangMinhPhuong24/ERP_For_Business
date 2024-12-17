import Request from '../Request'
import paramKeys from '../paramKeys'

export default class UpdateRoleRequest extends Request {
  static Keys = {
    ROLE_ID: paramKeys.ROLE_ID,
    DISPLAY_NAME: paramKeys.DISPLAY_NAME,
    ROLE_TYPE: paramKeys.ROLE_TYPE,
    PERMISSIONS: paramKeys.PERMISSIONS
  }
}
