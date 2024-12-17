import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  DeleteUserRequest extends Request {
    static Keys = {
        USER_ID: paramKeys.USER_ID
    };
}
