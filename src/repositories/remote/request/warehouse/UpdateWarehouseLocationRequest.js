import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  UpdateWarehouseLocationRequest extends Request {
    static Keys = {
        WAREHOUSE_ID: paramKeys.WAREHOUSE_ID,
        LOCATION_ID: paramKeys.LOCATION_ID,
        WAREHOUSE_LOCATION_NAME: paramKeys.WAREHOUSE_LOCATION_NAME,
        WAREHOUSE_LOCATION_TYPE_ID: paramKeys.WAREHOUSE_LOCATION_TYPE_ID,
        HEIGHT: paramKeys.HEIGHT,
        LENGTH: paramKeys.LENGTH,
        WIDTH: paramKeys.WIDTH,
        LIMIT_INVENTORY_SQUARE_METER: paramKeys.LIMIT_INVENTORY_SQUARE_METER,
        DESCRIPTION: paramKeys.DESCRIPTION,
    };
}
