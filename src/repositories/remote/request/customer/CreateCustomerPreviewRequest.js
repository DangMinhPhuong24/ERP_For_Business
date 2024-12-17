import Request from "../Request"
import paramKeys from "../paramKeys"

export default class CreateCustomerPreviewRequest extends Request {
    static Keys = {
        CUSTOMER_NAME: paramKeys.CUSTOMER_NAME,
        COMPANY_NAME: paramKeys.COMPANY_NAME,
        PHONE_NUMBER: paramKeys.PHONE_NUMBER,
        DEBT_AGE_ID: paramKeys.DEBT_AGE_ID,
        DEBT_LIMIT: paramKeys.DEBT_LIMIT,
        ZALO_NUMBER: paramKeys.ZALO_NUMBER,
        SALE_IN_CHANGE: paramKeys.SALE_IN_CHANGE,
        ADDRESSES: paramKeys.ADDRESSES,
        ADDRESS_OFFICES: paramKeys.ADDRESS_OFFICES,
        ADDRESS_BRANCHES: paramKeys.ADDRESS_BRANCHES,
        ADDRESS_FACTORIES: paramKeys.ADDRESS_FACTORIES
    }
}
