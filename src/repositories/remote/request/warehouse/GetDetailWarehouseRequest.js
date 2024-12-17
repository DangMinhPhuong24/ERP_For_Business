import Request from '../Request'
import paramKeys from '../paramKeys'

export default class GetDetailWarehouseRequest extends Request {
  static Keys = {
    WAREHOUSE_PRIMARY_ID: paramKeys.WAREHOUSE_PRIMARY_ID,
    DATE_WEIGHT_IMPORT_WAREHOUSE: paramKeys.DATE_WEIGHT_IMPORT_WAREHOUSE,
    DATE_SQUARE_METER_IMPORT_WAREHOUSE: paramKeys.DATE_SQUARE_METER_IMPORT_WAREHOUSE
  }
}
