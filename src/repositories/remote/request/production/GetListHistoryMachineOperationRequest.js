import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListHistoryMachineOperationRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        MACHINE_ID: paramKeys.MACHINE_ID,
        FROM_DATE: paramKeys.FROM_DATE,
        TO_DATE: paramKeys.TO_DATE,
    };
}
