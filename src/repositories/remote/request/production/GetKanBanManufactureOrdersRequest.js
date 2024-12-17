import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetKanBanManufactureOrdersRequest extends Request {
    static Keys = {
        PRODUCT_CODE: paramKeys.PRODUCT_CODE,
        FROM_DATE: paramKeys.FROM_DATE,
        TO_DATE: paramKeys.TO_DATE,
        MANUFACTURE_PLAN_ID: paramKeys.MANUFACTURE_PLAN_ID,
        MANUFACTURE_ORDER_ID: paramKeys.MANUFACTURE_ORDER_ID,
        MANUFACTURE_ORDER_STATUS: paramKeys.MANUFACTURE_ORDER_STATUS,
    };
}
