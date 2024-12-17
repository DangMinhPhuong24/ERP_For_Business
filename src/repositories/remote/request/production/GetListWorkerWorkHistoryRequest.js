import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListWorkerWorkHistoryRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        WORKER_DETAILS_ID: paramKeys.WORKER_DETAILS_ID,
        FROM_DATE: paramKeys.FROM_DATE,
        TO_DATE: paramKeys.TO_DATE,
    };
}
