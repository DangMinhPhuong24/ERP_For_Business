import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListRoleRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        ROLE_NAME: paramKeys.ROLE_NAME,
    };
}
