import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListProductGroupRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
    };
}
