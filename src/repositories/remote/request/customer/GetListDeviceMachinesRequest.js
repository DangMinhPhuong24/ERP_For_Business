import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetListDeviceMachinesRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        ID_OF_CUSTOMER: paramKeys.ID_OF_CUSTOMER,
    };
}
