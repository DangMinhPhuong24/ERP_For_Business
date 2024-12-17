import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetListUserRequest extends Request {
  static Keys = {
    PAGE: paramKeys.PAGE,
    SEARCH_USER: paramKeys.SEARCH_USER,
    USER_ROLE_NAME: paramKeys.USER_ROLE_NAME,
    BRANCH_ID: paramKeys.BRANCH_ID,
    DEPARTMENT_ID: paramKeys.DEPARTMENT_ID,
    EXCEPT_AUTH: paramKeys.EXCEPT_AUTH
  }
}
