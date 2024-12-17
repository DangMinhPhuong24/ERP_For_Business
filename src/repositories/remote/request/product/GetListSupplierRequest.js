import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetListSupplierRequest extends Request {
  static Keys = {
    PAGE: paramKeys.PAGE,
    SEARCH_SUPPLIER: paramKeys.SEARCH_SUPPLIER
  }
}
