import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetListWarehousesRequest extends Request {
  static Keys = {
    PAGE: paramKeys.PAGE,
    SEARCH_WAREHOUSE: paramKeys.SEARCH_WAREHOUSE,
    BRANCH_ID: paramKeys.BRANCH_ID
  }
}
