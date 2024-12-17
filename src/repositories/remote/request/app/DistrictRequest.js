import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  DistrictRequest extends Request {
  static Keys = {
    PROVINCE_ID: paramKeys.PROVINCE_ID,
  };
}
