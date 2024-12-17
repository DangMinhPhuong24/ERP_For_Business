import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetStatisticWarehouseRequest extends Request {
    static Keys = {
        DATE_WEIGHT_INVENTORY: paramKeys.DATE_WEIGHT_INVENTORY,
        DATE_LENGTH_INVENTORY: paramKeys.DATE_LENGTH_INVENTORY,
    };
}
