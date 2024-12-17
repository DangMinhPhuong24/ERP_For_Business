import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetKanbanWarehouseExportOrdersRequest extends Request {
    static Keys = {
        WAREHOUSE_EXPORT_ORDER_CODE: paramKeys.WAREHOUSE_EXPORT_ORDER_CODE,
        DATE: paramKeys.DATE,
    };
}
