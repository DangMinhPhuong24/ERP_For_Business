import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetListWarehousesLocationRequest extends Request {
  static Keys = {
    PAGE: paramKeys.PAGE,
    SEARCH_WAREHOUSE_LOCATION: paramKeys.SEARCH_WAREHOUSE_LOCATION,
    WAREHOUSE_ID: paramKeys.WAREHOUSE_ID,
    WAREHOUSE_LOCATION_TYPE_ID: paramKeys.WAREHOUSE_LOCATION_TYPE_ID
  }
}
