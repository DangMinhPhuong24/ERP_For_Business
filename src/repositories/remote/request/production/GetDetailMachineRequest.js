import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetDetailMachineRequest extends Request {
    static Keys = {
        MACHINES_ID: paramKeys.MACHINES_ID
    };
}
