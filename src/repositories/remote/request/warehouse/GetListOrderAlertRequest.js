import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListOrderAlertRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        WAREHOUSE_ID: paramKeys.WAREHOUSE_ID,
    };
}
