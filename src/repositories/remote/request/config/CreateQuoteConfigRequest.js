import Request from '../Request';
import paramKeys from '../paramKeys';

export default class CreateQuoteConfigRequest extends Request {
    static Keys = {
        PRODUCT_ID: paramKeys.PRODUCT_ID,
        ALLOWABLE_DEVIATION: paramKeys.ALLOWABLE_DEVIATION,
    };
}
