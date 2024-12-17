import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  DeleteLocationRequest extends Request {
    static Keys = {
        LOCATION_ID: paramKeys.LOCATION_ID
    };
}
