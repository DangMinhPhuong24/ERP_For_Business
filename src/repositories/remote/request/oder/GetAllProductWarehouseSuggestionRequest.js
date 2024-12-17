import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetAllProductWarehouseSuggestionRequest extends Request {
    static Keys = {
        PRODUCT_WAREHOUSES: paramKeys.PRODUCT_WAREHOUSES,
    };
}