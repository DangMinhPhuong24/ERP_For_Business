import Request from '../Request'
import paramKeys from '../paramKeys'

export default class CreateProductGroupsRequest extends Request {
  static Keys = {
    PRODUCT_GROUP_NAME: paramKeys.PRODUCT_GROUP_NAME,
  }
}
