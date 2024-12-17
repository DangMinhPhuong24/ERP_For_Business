import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  GetListMachinesRequest extends Request {
    static Keys = {
        PAGE: paramKeys.PAGE,
        NAME: paramKeys.NAME,
        FROM_DATE: paramKeys.FROM_DATE,
        TO_DATE: paramKeys.TO_DATE,
        MACHINES_TYPE_ID: paramKeys.MACHINES_TYPE_ID,
        WORKER_ARRANGE_ID: paramKeys.WORKER_ARRANGE_ID,
    };
}
