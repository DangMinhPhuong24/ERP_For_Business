import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetListClaimHistoriesByCustomerIdRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        CUSTOMER_ID: paramKeys.CLAIM_CUSTOMER_ID,
        CLAIM_STATUS_ID: paramKeys.CLAIM_STATUS_ID,
        FROM_DATE: paramKeys.FROM_DATE,
        TO_DATE: paramKeys.TO_DATE,
    };
}
