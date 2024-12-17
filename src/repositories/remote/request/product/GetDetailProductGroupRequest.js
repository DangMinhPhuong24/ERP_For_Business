import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetDetailProductGroupRequest extends Request {
    static Keys = {
        PRODUCT_DETAIL_ID: paramKeys.PRODUCT_DETAIL_ID,
    };
}
