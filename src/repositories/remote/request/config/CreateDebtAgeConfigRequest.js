import Request from '../Request';
import paramKeys from '../paramKeys';

export default class CreateDebtAgeConfigRequest extends Request {
    static Keys = {
        DEBT_AGE_NAME: paramKeys.DEBT_AGE_NAME,
        DAYS_ALLOWED: paramKeys.DAYS_ALLOWED,
    };
}
