import Request from '../Request';
import paramKeys from '../paramKeys';

export default class CreateUserRequest extends Request {
    static Keys = {
        USER_NAME: paramKeys.USER_NAME,
        USER_GMAIL: paramKeys.USER_GMAIL,
        USER_PASSWORD: paramKeys.USER_PASSWORD,
        USER_FULL_NAME: paramKeys.USER_FULL_NAME,
        USER_ROLE_NAME: paramKeys.USER_ROLE_NAME,
        BRANCH_ID: paramKeys.BRANCH_ID,
        DEPARTMENT_ID: paramKeys.DEPARTMENT_ID,
    };
}
