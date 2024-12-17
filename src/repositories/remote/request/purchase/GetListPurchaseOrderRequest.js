import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetListPurchaseOrderRequest extends Request {
  static Keys = {
    CODE: paramKeys.CODE,
    PAGE: paramKeys.PAGE,
    STATUS_ID: paramKeys.STATUS_ID,
    START_DATE: paramKeys.START_DATE,
    END_DATE: paramKeys.END_DATE,
  }
}
