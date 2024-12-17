import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListWorkerAssignmentsRequest extends Request {
    static Keys = {
        LIST_WORKER_ID: paramKeys.LIST_WORKER_ID,
        DATE: paramKeys.DATE,
    };
}
