import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetDetailSupplierRequest extends Request {
  static Keys = {
    DETAIL_SUPPLIER_ID: paramKeys.DETAIL_SUPPLIER_ID
  }
}
