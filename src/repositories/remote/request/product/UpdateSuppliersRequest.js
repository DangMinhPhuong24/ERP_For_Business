import Request from '../Request'
import paramKeys from '../paramKeys'

export default class UpdateSuppliersRequest extends Request {
  static Keys = {
    DETAIL_SUPPLIER_ID: paramKeys.DETAIL_SUPPLIER_ID,
    SUPPLIER_NAME: paramKeys.SUPPLIER_NAME,
    ABBREVIATION: paramKeys.ABBREVIATION,
    PERSON_IN_CHARGES: paramKeys.PERSON_IN_CHARGES,
    TAX_CODE: paramKeys.TAX_CODE,
    ADDRESS: paramKeys.ADDRESS,
    PHONE_NUMBER: paramKeys.PHONE_NUMBER,
    USER_GMAIL: paramKeys.USER_GMAIL,
    SUPPLIER_TYPE_ID: paramKeys.SUPPLIER_TYPE_ID,
    CURRENCY_UNIT_ID: paramKeys.CURRENCY_UNIT_ID,
    SUPPLIER_TAX: paramKeys.SUPPLIER_TAX,
  }
}
