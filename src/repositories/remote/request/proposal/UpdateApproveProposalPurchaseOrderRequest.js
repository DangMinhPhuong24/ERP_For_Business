import Request from '../Request';
import paramKeys from '../paramKeys';

export default class UpdateApproveProposalPurchaseOrderRequest extends Request {
    static Keys = {
        ID: paramKeys.ID,
        PURCHASE_ORDER_STATUS_ID: paramKeys.PURCHASE_ORDER_STATUS_ID,
        REASON: paramKeys.REASON,
    };
}
