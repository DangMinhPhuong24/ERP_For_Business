import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  RefreshTokenRequest extends Request {
  static Keys = {
    REFRESH_TOKEN: paramKeys.REFRESH_TOKEN,
  };
}
