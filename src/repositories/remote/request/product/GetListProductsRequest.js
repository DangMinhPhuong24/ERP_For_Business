import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetListProductsRequest extends Request {
  static Keys = {
    PAGE: paramKeys.PAGE,
    SEARCH_PRODUCT_WAREHOUSE: paramKeys.SEARCH_PRODUCT_WAREHOUSE,
    FROM_PRICE: paramKeys.FROM_PRICE,
    WAREHOUSE_ID: paramKeys.WAREHOUSE_ID
  }
}
