import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  LoginZaloRequest extends Request {
  static Keys = {
    ZALO_CODE: paramKeys.ZALO_CODE,
  };
}
