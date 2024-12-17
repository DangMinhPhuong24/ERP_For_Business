import Request from '../Request';
import paramKeys from '../paramKeys';

export default class UpdateQuoteConfigRequest extends Request {
    static Keys = {
        QUOTE_ID: paramKeys.QUOTE_ID,
        PRODUCT_ID: paramKeys.PRODUCT_ID,
        ALLOWABLE_DEVIATION: paramKeys.ALLOWABLE_DEVIATION,
        PRICE_STANDARD_SHEET: paramKeys.PRICE_STANDARD_SHEET,
        PRICE_INCLUDE_SHEET_SIZE: paramKeys.PRICE_INCLUDE_SHEET_SIZE,
        PRICE_STANDARD_ROLL: paramKeys.PRICE_STANDARD_ROLL,
        PRICE_INCLUDE_ROLL_SIZE: paramKeys.PRICE_INCLUDE_ROLL_SIZE,
    };
}
