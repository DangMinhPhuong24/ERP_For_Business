import Request from '../Request';
import paramKeys from '../paramKeys';

export default class GetDetailClaimRequest extends Request {
    static Keys = {
        CLAIM_ID: paramKeys.CLAIM_ID,
    };
}
