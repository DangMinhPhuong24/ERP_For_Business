import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetListDashBoardCustomerWithDebtsRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        DASHBOARD_CUSTOMER_NAME: paramKeys.DASHBOARD_CUSTOMER_NAME,
        DASHBOARD_DEBT_GROUP: paramKeys.DASHBOARD_DEBT_GROUP,
        DASHBOARD_TOTAL_DEBT: paramKeys.DASHBOARD_TOTAL_DEBT,
        DASHBOARD_OVERDUE_AMOUNT: paramKeys.DASHBOARD_OVERDUE_AMOUNT,
        DASHBOARD_NUMBER_DAY_OVERDUE: paramKeys.DASHBOARD_NUMBER_DAY_OVERDUE,
    };
}