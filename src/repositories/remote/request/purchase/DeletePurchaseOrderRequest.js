import Request from '../Request'
import paramKeys from '../paramKeys'

export default class DeletePurchaseOrderRequest extends Request {
  static Keys = {
    PURCHASE_ID: paramKeys.PURCHASE_ID,
  }
}
