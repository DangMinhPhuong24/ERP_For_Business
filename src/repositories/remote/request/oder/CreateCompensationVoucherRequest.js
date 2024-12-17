import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  CreateCompensationVoucherRequest extends Request {
    static Keys = {
        ADJUSTMENT_VOUCHER_ODER_ID: paramKeys.ADJUSTMENT_VOUCHER_ODER_ID,
        ODER_ADDRESS_ID: paramKeys.ODER_ADDRESS_ID,
        ODER_PROVINCE_ID: paramKeys.ODER_PROVINCE_ID,
        ODER_DISTRICT_ID: paramKeys.ODER_DISTRICT_ID,
        ODER_WARD_ID: paramKeys.ODER_WARD_ID,
        ODER_ADDRESS_DETAIL: paramKeys.ODER_ADDRESS_DETAIL,
        COMPENSATION_VOUCHER_QUANTITIES: paramKeys.COMPENSATION_VOUCHER_QUANTITIES,
    };
}
