import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  LoginRequest extends Request {
  static Keys = {
    USER_NAME: paramKeys.USER_NAME,
    PASSWORD: paramKeys.PASSWORD,
  };
}
