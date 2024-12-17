import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetAllPurchaseOrderStatusForUpdateRequest extends Request {
  static Keys = {
    PURCHASE_ORDER_ID: paramKeys.PURCHASE_ORDER_ID
  }
}
