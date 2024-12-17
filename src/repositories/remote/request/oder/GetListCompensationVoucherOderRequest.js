import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListCompensationVoucherOderRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        ADJUSTMENT_VOUCHER_ODER_ID: paramKeys.ADJUSTMENT_VOUCHER_ODER_ID,
    };
}
