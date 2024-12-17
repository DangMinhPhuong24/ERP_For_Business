import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListOrderByCustomerRequest extends Request {
    static Keys = {
        SORT_BY: paramKeys.SORT_BY,
        PAGE: paramKeys.PAGE,
        ODER_CUSTOMER_ID: paramKeys.ODER_CUSTOMER_ID,
        FROM_DATE: paramKeys.FROM_DATE,
        TO_DATE: paramKeys.TO_DATE,
        ORDER_STATUS: paramKeys.ORDER_STATUS,
        ODER_TOTAL_COST: paramKeys.ODER_TOTAL_COST,
        TOTAL_COST_GREATER_THAN_EQUAL: paramKeys.TOTAL_COST_GREATER_THAN_EQUAL,
        TOTAL_COST_LESS_THAN_EQUAL: paramKeys.TOTAL_COST_LESS_THAN_EQUAL,
    };
}
