import Request from '../Request'
import paramKeys from '../paramKeys'

export default class UpdateProductGroupsRequest extends Request {
  static Keys = {
    PRODUCT_DETAIL_ID: paramKeys.PRODUCT_DETAIL_ID,
    PRODUCT_GROUP_NAME: paramKeys.PRODUCT_GROUP_NAME,
  }
}
