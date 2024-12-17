import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  DeleteProposalDebtAgeRequest extends Request {
    static Keys = {
        PROPOSAL_DEBT_AGE_ID: paramKeys.PROPOSAL_DEBT_AGE_ID
    };
}
