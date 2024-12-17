import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetLocationDetailRequest extends Request {
    static Keys = {
        LOCATION_ID: paramKeys.LOCATION_ID,
        DATE_WEIGHT_IMPORT_WAREHOUSE: paramKeys.DATE_WEIGHT_IMPORT_WAREHOUSE,
        DATE_SQUARE_METER_IMPORT_WAREHOUSE: paramKeys.DATE_SQUARE_METER_IMPORT_WAREHOUSE,
    };
}
