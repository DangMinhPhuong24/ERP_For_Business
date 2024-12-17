import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListProposalPurchaseOrderRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        SEARCH: paramKeys.SEARCH,
        FROM_DATE: paramKeys.FROM_DATE,
        TO_DATE: paramKeys.TO_DATE,
    };
}