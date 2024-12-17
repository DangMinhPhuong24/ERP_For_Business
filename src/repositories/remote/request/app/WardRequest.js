import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  WardRequest extends Request {
  static Keys = {
    DISTRICT_ID: paramKeys.DISTRICT_ID,
  };
}
