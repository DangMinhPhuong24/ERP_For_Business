import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetListDataBarChartWarehouseTrafficRequest extends Request {
  static Keys = {
    WAREHOUSE_ID: paramKeys.WAREHOUSE_ID,
    WAREHOUSE_LOCATION_TYPE_ID: paramKeys.WAREHOUSE_LOCATION_TYPE_ID
  }
}
