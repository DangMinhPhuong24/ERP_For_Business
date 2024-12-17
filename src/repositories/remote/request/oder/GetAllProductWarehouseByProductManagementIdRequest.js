import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetAllProductWarehouseByProductManagementIdRequest extends Request {
    static Keys = {
        PRODUCT_MANAGEMENT_ID: paramKeys.PRODUCT_MANAGEMENT_ID,
        ODER_FINISHED_PRODUCT_FORM_ID: paramKeys.ODER_FINISHED_PRODUCT_FORM_ID,
        PRODUCT_QUANTITY: paramKeys.PRODUCT_QUANTITY,
        LENGTH: paramKeys.LENGTH,
        WIDTH: paramKeys.WIDTH,
    };
}