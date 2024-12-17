import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  DeleteAdjustmentVoucherRequest extends Request {
    static Keys = {
        ADJUSTMENT_VOUCHER_ID: paramKeys.ADJUSTMENT_VOUCHER_ID
    };
}
