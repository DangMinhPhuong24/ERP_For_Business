import Request from '../Request'
import paramKeys from '../paramKeys'

export default class UpdateQuotationRequest extends Request {
  static Keys = {
    QUOTATION_ID: paramKeys.QUOTATION_ID,
    EFFECTIVE_DATE: paramKeys.EFFECTIVE_DATE,
    FILE_PATH: paramKeys.FILE_PATH,
    PRODUCT_MANAGEMENTS: paramKeys.PRODUCT_MANAGEMENTS,
    REASON: paramKeys.REASON
  }
}
