import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetListDebtGroupConfigRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        DEBT_GROUP_NAME: paramKeys.DEBT_GROUP_NAME,
        START_DAY: paramKeys.START_DAY,
        END_DAY: paramKeys.END_DAY,
    };
}
