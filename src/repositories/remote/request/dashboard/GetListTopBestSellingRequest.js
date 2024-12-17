import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetListTopBestSellingRequest extends Request {
    static Keys = {
        PRODUCT_CODE_TOP_SELLING: paramKeys.PRODUCT_CODE_TOP_SELLING,
        PRODUCT_NAME_TOP_SELLING: paramKeys.PRODUCT_NAME_TOP_SELLING,
        PRODUCT_REVENUE_EACH_MONTH: paramKeys.PRODUCT_REVENUE_EACH_MONTH,
    };
}