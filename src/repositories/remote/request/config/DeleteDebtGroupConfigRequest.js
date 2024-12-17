import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  DeleteDebtGroupConfigRequest extends Request {
    static Keys = {
        DEBT_GROUP: paramKeys.DEBT_GROUP
    };
}
