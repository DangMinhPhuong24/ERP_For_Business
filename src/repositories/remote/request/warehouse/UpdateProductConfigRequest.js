import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  UpdateProductConfigRequest extends Request {
    static Keys = {
        PRODUCT_DETAIL_ID: paramKeys.PRODUCT_DETAIL_ID,
        LENGTH_INVENTORY_MIN: paramKeys.LENGTH_INVENTORY_MIN,
        LENGTH_INVENTORY_MAX: paramKeys.LENGTH_INVENTORY_MAX,
        ROLL_INVENTORY_MIN: paramKeys.ROLL_INVENTORY_MIN,
        LENGTH_SELL_WEEK: paramKeys.LENGTH_SELL_WEEK,
        LENGTH_SELL_MONTH: paramKeys.LENGTH_SELL_MONTH,
    };
}
