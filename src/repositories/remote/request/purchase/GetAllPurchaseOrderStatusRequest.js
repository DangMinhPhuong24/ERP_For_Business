import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetAllPurchaseOrderStatusRequest extends Request {
  static Keys = {
    SUPPLIER_ID: paramKeys.SUPPLIER_ID,
  };
}