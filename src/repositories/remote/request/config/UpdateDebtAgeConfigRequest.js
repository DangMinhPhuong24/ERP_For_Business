import Request from '../Request';
import paramKeys from '../paramKeys';

export default class UpdateDebtAgeConfigRequest extends Request {
    static Keys = {
        DEBT_AGE: paramKeys.DEBT_AGE,
        DEBT_AGE_NAME: paramKeys.DEBT_AGE_NAME,
        DAYS_ALLOWED: paramKeys.DAYS_ALLOWED,
    };
}
