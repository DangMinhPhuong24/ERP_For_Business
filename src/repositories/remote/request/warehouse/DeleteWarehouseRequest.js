import Request from '../Request'
import paramKeys from '../paramKeys'

export default class DeleteWarehouseRequest extends Request {
  static Keys = {
    WAREHOUSE_PRIMARY_ID: paramKeys.WAREHOUSE_PRIMARY_ID
  }
}
