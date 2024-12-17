import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  DeleteMachineRequest extends Request {
    static Keys = {
        MACHINES_ID: paramKeys.MACHINES_ID
    };
}
