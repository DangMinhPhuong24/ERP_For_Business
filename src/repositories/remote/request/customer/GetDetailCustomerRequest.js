import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetDetailCustomerRequest extends Request {
    static Keys = {
        CUSTOMER_ID: paramKeys.CUSTOMER_ID,
        FROM_DATE: paramKeys.FROM_DATE,
        TO_DATE: paramKeys.TO_DATE,
    };
}
