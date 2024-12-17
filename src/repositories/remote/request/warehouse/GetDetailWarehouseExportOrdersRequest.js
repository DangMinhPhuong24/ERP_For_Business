import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetDetailWarehouseExportOrdersRequest extends Request {
  static Keys = {
    WAREHOUSE_EXPORT_ORDER_ID: paramKeys.WAREHOUSE_IMPORT_ORDER_ID
  }
}
