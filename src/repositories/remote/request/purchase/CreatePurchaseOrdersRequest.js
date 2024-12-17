import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  CreatePurchaseOrdersRequest extends Request {
    static Keys = {
        PURCHASE_ID: paramKeys.PURCHASE_ID,
        PURCHASE_ORDER_STATUS_ID: paramKeys.PURCHASE_ORDER_STATUS_ID,
        PRODUCT_MANAGEMENT_ID: paramKeys.PRODUCT_MANAGEMENT_ID,
        SUPPLIER_ID: paramKeys.SUPPLIER_ID,
        SUPPLIER_TAX_ID: paramKeys.SUPPLIER_TAX_ID,
        ODER_DELEVERY_DATE: paramKeys.ODER_DELEVERY_DATE,
        PURCHASE_ORDER_PRODUCTS: paramKeys.PURCHASE_ORDER_PRODUCTS,
        NOTE: paramKeys.NOTE,
        FILE_PURCHASE_ORDERS: paramKeys.FILE_PURCHASE_ORDERS,
    };
}