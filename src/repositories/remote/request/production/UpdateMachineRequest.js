import Request from '../Request';
import paramKeys from '../paramKeys';

export default class UpdateMachineRequest extends Request {
    static Keys = {
        MACHINES_ID: paramKeys.MACHINES_ID,
        NAME: paramKeys.NAME,
        MACHINES_TYPE_ID: paramKeys.MACHINES_TYPE_ID,
        MANUFACTURER: paramKeys.MANUFACTURER,
        BUY_DATE: paramKeys.BUY_DATE,
        MAINTENANCE_DATE: paramKeys.MAINTENANCE_DATE,
    };
}
