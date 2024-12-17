import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetDetailQuotationHistoryRequest extends Request {
    static Keys = {
        QUOTATION_HISTORY_ID: paramKeys.QUOTATION_HISTORY_ID,
    };
}