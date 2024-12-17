import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetFormationHistoryByProductRequest extends Request {
  static Keys = {
    PRODUCT_WAREHOUSE_ID: paramKeys.PRODUCT_WAREHOUSE_ID
  }
}
