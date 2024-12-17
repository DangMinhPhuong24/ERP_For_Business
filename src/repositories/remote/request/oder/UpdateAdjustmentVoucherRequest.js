import Request from '../Request';
import paramKeys from '../paramKeys';

export default class UpdateAdjustmentVoucherRequest extends Request {
    static Keys = {
        ADJUSTMENT_VOUCHER_ID: paramKeys.ADJUSTMENT_VOUCHER_ID,
        ADJUSTMENT_VOUCHER_PRICE: paramKeys.ADJUSTMENT_VOUCHER_PRICE,
        ODER_AMOUNT: paramKeys.ODER_AMOUNT,
        ODER_TOTAL_COST: paramKeys.ODER_TOTAL_COST,
    };
}
