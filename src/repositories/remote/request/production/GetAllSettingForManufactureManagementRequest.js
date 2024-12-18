import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetAllSettingForManufactureManagementRequest extends Request {
    static Keys = {
        MANUFACTURE_PRODUCTIVITY_BELOW_DAY: paramKeys.MANUFACTURE_PRODUCTIVITY_BELOW_DAY,
        MANUFACTURE_PRODUCTIVITY_EXCEED_DAY: paramKeys.MANUFACTURE_PRODUCTIVITY_EXCEED_DAY,
        TRANSPORT_PRODUCTIVITY_BELOW_DAY: paramKeys.TRANSPORT_PRODUCTIVITY_BELOW_DAY,
        TRANSPORT_PRODUCTIVITY_EXCEED_DAY: paramKeys.TRANSPORT_PRODUCTIVITY_EXCEED_DAY,
        QUANTITY_ORDER_RETURN_WEEK: paramKeys.QUANTITY_ORDER_RETURN_WEEK,
        QUANTITY_ORDER_RETURN_MONTH: paramKeys.QUANTITY_ORDER_RETURN_MONTH,
        QUANTITY_CLAIM_WEEK: paramKeys.QUANTITY_CLAIM_WEEK,
        QUANTITY_CLAIM_MONTH: paramKeys.QUANTITY_CLAIM_MONTH,
        TIME_WORKER_LEAVE: paramKeys.TIME_WORKER_LEAVE,
        TIME_MACHINE_MAINTENANCE: paramKeys.TIME_MACHINE_MAINTENANCE,
        MINUTES_MANUFACTURE_ORDER_BEHIND_SCHEDULE: paramKeys.MINUTES_MANUFACTURE_ORDER_BEHIND_SCHEDULE,
        MINUTES_DELIVERY_BEHIND_SCHEDULE: paramKeys.MINUTES_DELIVERY_BEHIND_SCHEDULE,
        MINUTES_CHANGE_PROCESS: paramKeys.MINUTES_CHANGE_PROCESS,
        INVENTORY_PROCESS_SAW_CUT: paramKeys.INVENTORY_PROCESS_SAW_CUT,
        INVENTORY_PROCESS_CUT_TRIM: paramKeys.INVENTORY_PROCESS_CUT_TRIM,
    };
}