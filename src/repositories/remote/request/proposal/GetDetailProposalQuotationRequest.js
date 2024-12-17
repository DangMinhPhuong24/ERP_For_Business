import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetDetailProposalQuotationRequest extends Request {
    static Keys = {
        PROPOSAL_QUOTATION_ID: paramKeys.PROPOSAL_QUOTATION_ID,
    };
}