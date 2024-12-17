import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  CreateOderPreviewRequest extends Request {
    static Keys = {
        ODER_CUSTOMER_ID: paramKeys.ODER_CUSTOMER_ID,
        ODER_ADDRESS_BRANCH_ID: paramKeys.ODER_ADDRESS_BRANCH_ID,
        ODER_ADDRESS_ID: paramKeys.ODER_ADDRESS_ID,
        ODER_PROVINCE_ID: paramKeys.ODER_PROVINCE_ID,
        ODER_DISTRICT_ID: paramKeys.ODER_DISTRICT_ID,
        ODER_WARD_ID: paramKeys.ODER_WARD_ID,
        ODER_ADDRESS_DETAIL: paramKeys.ODER_ADDRESS_DETAIL,
        ODER_PAYMENT_ID: paramKeys.ODER_PAYMENT_ID,
        ODER_DELEVERY_DATE: paramKeys.ODER_DELEVERY_DATE,
        ODER_DELEVERY_SHIFT_ID: paramKeys.ODER_DELEVERY_SHIFT_ID,
        ODER_PRODUCT_ITEMS: paramKeys.ODER_PRODUCT_ITEMS,
        ODER_AMOUNT: paramKeys.ODER_AMOUNT,
        ODER_DELIVERY_CHARGE: paramKeys.ODER_DELIVERY_CHARGE,
        ODER_DISCOUNT: paramKeys.ODER_DISCOUNT,
        ODER_TAX_TYPE: paramKeys.ODER_TAX_TYPE,
        ODER_TAX_AMOUNT: paramKeys.ODER_TAX_AMOUNT,
        ODER_TOTAL_COST: paramKeys.ODER_TOTAL_COST,
        DESCRIPTION:paramKeys.DESCRIPTION,
        ODER_TAG_ID: paramKeys.ODER_TAG_ID,
    };
}
