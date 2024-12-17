import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetDetailCustomerHandbookAllRequest extends Request {
    static Keys = {
        HANDBOOK_CUSTOMER_ID: paramKeys.HANDBOOK_CUSTOMER_ID,
        FROM_DATE: paramKeys.FROM_DATE,
        TO_DATE: paramKeys.TO_DATE,
    };
}
