import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  DeleteCompensationVoucherRequest extends Request {
    static Keys = {
        COMPENSATION_VOUCHER_ID: paramKeys.COMPENSATION_VOUCHER_ID
    };
}
