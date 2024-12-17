import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  DeleteQuoteConfigRequest extends Request {
    static Keys = {
        QUOTE_ID: paramKeys.QUOTE_ID
    };
}
