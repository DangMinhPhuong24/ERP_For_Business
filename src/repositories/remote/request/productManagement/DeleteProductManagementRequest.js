import Request from '../Request'
import paramKeys from '../paramKeys'

export default class DeleteProductManagementRequest extends Request {
  static Keys = {
    PRODUCTS_ID: paramKeys.PRODUCTS_ID
  }
}
