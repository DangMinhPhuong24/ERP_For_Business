import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetListQuoteConfigRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        SEARCH_QUOTATION: paramKeys.SEARCH_QUOTATION,
        PRODUCT_NAME: paramKeys.PRODUCT_NAME,
        PRICE: paramKeys.PRICE,
        ALLOWABLE_DEVIATION: paramKeys.ALLOWABLE_DEVIATION,
    };
}
