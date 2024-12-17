import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListProductOderRequest extends Request {
    static Keys = {
        ODER_CUSTOMER_ID: paramKeys.ODER_CUSTOMER_ID,
    };
}
