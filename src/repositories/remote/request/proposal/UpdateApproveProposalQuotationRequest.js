import Request from '../Request';
import paramKeys from '../paramKeys';

export default class UpdateApproveProposalQuotationRequest extends Request {
    static Keys = {
        PROPOSAL_ID: paramKeys.PROPOSAL_ID,
        PROPOSAL_STATUS_ID: paramKeys.PROPOSAL_STATUS_ID,
        REASON: paramKeys.REASON,
    };
}
