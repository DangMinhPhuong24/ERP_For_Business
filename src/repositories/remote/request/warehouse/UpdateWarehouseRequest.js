import Request from '../Request'
import paramKeys from '../paramKeys'

export default class UpdateWarehouseRequest extends Request {
  static Keys = {
    WAREHOUSE_PRIMARY_ID: paramKeys.WAREHOUSE_PRIMARY_ID,
    WAREHOUSE_NAME: paramKeys.WAREHOUSE_NAME,
    BRANCH_ID: paramKeys.BRANCH_ID,
    DESCRIPTION: paramKeys.DESCRIPTION
  }
}
