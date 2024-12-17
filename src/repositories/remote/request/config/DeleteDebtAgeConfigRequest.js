import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  DeleteDebtAgeConfigRequest extends Request {
    static Keys = {
        DEBT_AGE: paramKeys.DEBT_AGE
    };
}
