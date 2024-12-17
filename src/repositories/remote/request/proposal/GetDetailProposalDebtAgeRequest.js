import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetDetailProposalDebtAgeRequest extends Request {
    static Keys = {
        PROPOSAL_ID: paramKeys.PROPOSAL_ID,
    };
}