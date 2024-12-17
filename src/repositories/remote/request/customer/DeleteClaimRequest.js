import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  DeleteClaimRequest extends Request {
    static Keys = {
        CLAIM_ID: paramKeys.CLAIM_ID
    };
}
