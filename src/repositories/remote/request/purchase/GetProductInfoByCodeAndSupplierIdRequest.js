import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetProductInfoByCodeAndSupplierIdRequest extends Request {
  static Keys = {
    SUPPLIER_ID: paramKeys.SUPPLIER_ID,
    PRODUCT_MANAGEMENT_ID: paramKeys.PRODUCT_MANAGEMENT_ID,
  };
}