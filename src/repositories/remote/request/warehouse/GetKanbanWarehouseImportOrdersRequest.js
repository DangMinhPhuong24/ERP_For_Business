import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetKanbanWarehouseImportOrdersRequest extends Request {
    static Keys = {
        WAREHOUSE_IMPORT_ORDER_CODE: paramKeys.WAREHOUSE_IMPORT_ORDER_CODE,
        DATE: paramKeys.DATE,
    };
}
