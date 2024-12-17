import Request from '../Request'
import paramKeys from '../paramKeys'

export default class CreateWarehouseRequest extends Request {
  static Keys = {
    WAREHOUSE_NAME: paramKeys.WAREHOUSE_NAME,
    BRANCH_ID: paramKeys.BRANCH_ID,
    DESCRIPTION: paramKeys.DESCRIPTION
  }
}
