import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListWorkersRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        WORKER_CODE: paramKeys.WORKER_CODE,
        WORKER_NAME: paramKeys.WORKER_NAME,
        WORKER_AGE: paramKeys.WORKER_AGE,
        YEARS_EXPERIENCE: paramKeys.YEARS_EXPERIENCE,
        WORKER_ARRANGE_ID: paramKeys.WORKER_ARRANGE_ID,
    };
}