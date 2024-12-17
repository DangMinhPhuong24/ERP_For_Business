import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetListQuotationHistoriesByCustomerIdRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        CUSTOMER_ID: paramKeys.QUOTATION_CUSTOMER_ID,
        FROM_DATE: paramKeys.FROM_DATE,
        TO_DATE: paramKeys.TO_DATE,
    };
}
