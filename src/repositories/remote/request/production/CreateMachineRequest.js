import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  CreateMachineRequest extends Request {
    static Keys = {
        NAME: paramKeys.NAME,
        MACHINES_TYPE_ID: paramKeys.MACHINES_TYPE_ID,
        MANUFACTURER: paramKeys.MANUFACTURER,
        BUY_DATE: paramKeys.BUY_DATE,
        MAINTENANCE_DATE: paramKeys.MAINTENANCE_DATE,
    };
}
