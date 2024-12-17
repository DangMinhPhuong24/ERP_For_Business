import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetAllAddressBranchByCustomerIdRequest extends Request {
    static Keys = {
        ID_OF_CUSTOMER: paramKeys.ID_OF_CUSTOMER,
    };
}