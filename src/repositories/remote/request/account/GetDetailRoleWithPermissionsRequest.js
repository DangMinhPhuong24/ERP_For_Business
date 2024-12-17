import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetDetailRoleWithPermissionsRequest extends Request {
  static Keys = {
    ROLE_ID: paramKeys.ROLE_ID
  }
}
