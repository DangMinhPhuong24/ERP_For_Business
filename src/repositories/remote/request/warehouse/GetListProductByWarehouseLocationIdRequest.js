import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetListProductByWarehouseLocationIdRequest extends Request {
  static Keys = {
    PAGE: paramKeys.PAGE,
    WAREHOUSE_LOCATION_ID: paramKeys.WAREHOUSE_LOCATION_ID,
    SEARCH_PRODUCT_WAREHOUSE: paramKeys.SEARCH_PRODUCT_WAREHOUSE
  }
}
