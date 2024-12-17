import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetDetailProposalPurchaseOrderRequest extends Request {
    static Keys = {
        ID: paramKeys.ID,
    };
}