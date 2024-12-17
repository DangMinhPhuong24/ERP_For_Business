import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListCustomerRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        CUSTOMER_NAME: paramKeys.CUSTOMER_NAME,
        SORT_BY: paramKeys.SORT_BY,
        COMPANY_NAME: paramKeys.COMPANY_NAME,
        PHONE_NUMBER: paramKeys.PHONE_NUMBER,
        DEBT_AGE_ID: paramKeys.DEBT_AGE_ID,
        DEBT_GROUP_ID: paramKeys.DEBT_GROUP_ID,
        PROVINCE_ID_SEARCH_CONDITION: paramKeys.PROVINCE_ID_SEARCH_CONDITION,
        DISTRICT_ID_SEARCH_CONDITION: paramKeys.DISTRICT_ID_SEARCH_CONDITION,
        WARD_ID_SEARCH_CONDITION: paramKeys.WARD_ID_SEARCH_CONDITION,
        TYPE: paramKeys.TYPE,
        CUSTOMER_RANK_IDS: paramKeys.CUSTOMER_RANK_IDS,
        COMPANY_TYPE_IDS: paramKeys.COMPANY_TYPE_IDS,
        PRODUCT_APPLICATION_IDS: paramKeys.PRODUCT_APPLICATION_IDS,
        INDUSTRY_GROUP_IDS: paramKeys.INDUSTRY_GROUP_IDS,
    };
}
