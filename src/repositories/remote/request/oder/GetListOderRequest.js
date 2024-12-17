import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListOderRequest extends Request {
    static Keys = {

        PAGE: paramKeys.PAGE,
        ODER_CODE: paramKeys.ODER_CODE,
        PRICE: paramKeys.PRICE,
        CUSTOMER_NAME: paramKeys.CUSTOMER_NAME,
        CREATE_AT_ODER: paramKeys.CREATE_AT_ODER,
        ODER_DELEVERY_DATE: paramKeys.ODER_DELEVERY_DATE,
        ODER_STATUS: paramKeys.ODER_STATUS,
    };
}
