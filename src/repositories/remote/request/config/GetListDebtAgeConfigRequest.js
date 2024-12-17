import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetListDebtAgeConfigRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        DEBT_AGE_NAME: paramKeys.DEBT_AGE_NAME,
        DAYS_ALLOWED: paramKeys.DAYS_ALLOWED,
    };
}
