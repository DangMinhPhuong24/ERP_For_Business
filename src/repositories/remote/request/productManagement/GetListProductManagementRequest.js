import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetListProductManagementRequest extends Request {
  static Keys = {
    PAGE: paramKeys.PAGE,
    SEARCH_PRODUCT_MANAGEMENT: paramKeys.SEARCH_PRODUCT_MANAGEMENT,
    FROM_PRICE: paramKeys.FROM_PRICE,
    TO_PRICE: paramKeys.TO_PRICE,
    SUPPLIER_ID: paramKeys.SUPPLIER_ID
  }
}
