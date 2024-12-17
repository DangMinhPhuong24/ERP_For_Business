import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetStatisticOderForProductionManagementRequest extends Request {
    static Keys = {
        PRODUCT_CODE: paramKeys.PRODUCT_CODE,
        FROM_DATE: paramKeys.FROM_DATE,
        TO_DATE: paramKeys.TO_DATE,
        ODER_CUSTOMER_ID: paramKeys.ODER_CUSTOMER_ID,
        ORDER_STATUS: paramKeys.ORDER_STATUS,
    };
}
