import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetDetailWorkerRequest extends Request {
    static Keys = {
        WORKER_ID: paramKeys.WORKER_ID
    };
}
