import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetDetailWarehouseImportOrdersRequest extends Request {
  static Keys = {
    WAREHOUSE_IMPORT_ORDER_ID: paramKeys.WAREHOUSE_IMPORT_ORDER_ID,
  }
}
