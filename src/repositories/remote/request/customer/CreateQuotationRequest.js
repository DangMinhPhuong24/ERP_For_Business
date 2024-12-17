import Request from '../Request'
import paramKeys from '../paramKeys'

export default class CreateQuotationRequest extends Request {
  static Keys = {
    QUOTATION_CUSTOMER_ID: paramKeys.QUOTATION_CUSTOMER_ID,
    EFFECTIVE_DATE: paramKeys.EFFECTIVE_DATE,
    FILE_PATH: paramKeys.FILE_PATH,
    PRODUCT_MANAGEMENTS: paramKeys.PRODUCT_MANAGEMENTS,
    REASON: paramKeys.REASON
  }
}
