import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetListDashBoardSaleForAdminRequest extends Request {
    static Keys = {
        FROM_DATE: paramKeys.FROM_DATE,
        TO_DATE: paramKeys.TO_DATE,
        REVENUE_BY_REGION: paramKeys.REVENUE_BY_REGION,
        TOTAL_REVENUE: paramKeys.TOTAL_REVENUE,
        ORDER_QUANTITY: paramKeys.ORDER_QUANTITY,
        TOTAL_PROFIT: paramKeys.TOTAL_PROFIT,
        TOP_CUSTOMERS: paramKeys.TOP_CUSTOMERS,
    };
}