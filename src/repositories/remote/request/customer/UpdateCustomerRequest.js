import Request from '../Request';
import paramKeys from '../paramKeys';

export default class UpdateCustomerRequest extends Request {
    static Keys = {
        CUSTOMER_ID: paramKeys.CUSTOMER_ID,
        CUSTOMER_NAME: paramKeys.CUSTOMER_NAME,
        COMPANY_NAME: paramKeys.COMPANY_NAME,
        PHONE_NUMBER: paramKeys.PHONE_NUMBER,
        ADDRESS_BRANCHES: paramKeys.ADDRESS_BRANCHES,
        ADDRESS_OFFICES: paramKeys.ADDRESS_OFFICES,
        ADDRESS_FACTORIES: paramKeys.ADDRESS_FACTORIES,
        ZALO_NUMBER: paramKeys.ZALO_NUMBER,
        DEBT_LIMIT: paramKeys.DEBT_LIMIT,
        DEBT_AGE_ID: paramKeys.DEBT_AGE_ID,
        SALE_IN_CHANGE: paramKeys.SALE_IN_CHANGE,
        ADDRESSES: paramKeys.ADDRESSES,
    };
}
