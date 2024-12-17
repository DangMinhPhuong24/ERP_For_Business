import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListProposalDebtAgeByCustomerIdRequest extends Request {
    static Keys = {
        SORT_BY: paramKeys.SORT_BY,
        PAGE: paramKeys.PAGE,
        DEBT_AGE_CUSTOMER_ID: paramKeys.DEBT_AGE_CUSTOMER_ID,
        FROM_DATE: paramKeys.FROM_DATE,
        TO_DATE: paramKeys.TO_DATE,
        PROPOSAL_STATUS_ID: paramKeys.PROPOSAL_STATUS_ID,
    };
}
