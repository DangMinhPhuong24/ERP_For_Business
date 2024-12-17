import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetNotificationStatusRequest extends Request {
  static Keys = {
    OFFSET: paramKeys.OFFSET,
  };
}
