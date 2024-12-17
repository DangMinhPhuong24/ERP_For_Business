import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  DeleteCustomerRequest extends Request {
    static Keys = {
        CUSTOMER_ID: paramKeys.CUSTOMER_ID
    };
}
