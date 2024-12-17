import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListProposalDebtAgeRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        CUSTOMER_NAME: paramKeys.CUSTOMER_NAME,
        PROPOSAL_STATUS_ID: paramKeys.PROPOSAL_STATUS_ID,
        FROM_DATE: paramKeys.FROM_DATE,
        TO_DATE: paramKeys.TO_DATE,
        SORT_BY: paramKeys.SORT_BY,
    };
}