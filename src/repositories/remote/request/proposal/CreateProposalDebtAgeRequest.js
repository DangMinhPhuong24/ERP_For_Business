import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  CreateProposalDebtAgeRequest extends Request {
    static Keys = {
        DEBT_AGE_CUSTOMER_ID: paramKeys.DEBT_AGE_CUSTOMER_ID,
        DEBT_AGE_ID: paramKeys.DEBT_AGE_ID,
    };
}