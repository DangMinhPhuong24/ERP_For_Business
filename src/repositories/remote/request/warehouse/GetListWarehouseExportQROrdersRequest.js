import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetListWarehouseExportQROrdersRequest extends Request {
  static Keys = {
    WAREHOUSE_IMPORT_ORDER_QR_ID: paramKeys.WAREHOUSE_IMPORT_ORDER_QR_ID
  }
}
