import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  DeleteSupplierRequest extends Request {
    static Keys = {
        PRODUCTS_ID: paramKeys.PRODUCTS_ID
    };
}
