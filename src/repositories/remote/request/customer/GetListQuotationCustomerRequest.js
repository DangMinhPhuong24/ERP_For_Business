import Request from '../Request'
import paramKeys from '../paramKeys'
import GetListQuotationHistoriesByCustomerIdRequest from './GetListQuotationHistoriesByCustomerIdRequest'

export default class GetListQuotationCustomerRequest extends Request {
  static Keys = {
    QUOTATION_CUSTOMER_ID: paramKeys.QUOTATION_CUSTOMER_ID,
    SEARCH_PRODUCT_MANAGEMENT: paramKeys.SEARCH_PRODUCT_MANAGEMENT,
    SORT_BY: paramKeys.SORT_BY
  }
}
