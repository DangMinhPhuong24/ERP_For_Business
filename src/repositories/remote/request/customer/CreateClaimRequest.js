import Request from '../Request';
import paramKeys from '../paramKeys';

export default class  CreateClaimRequest extends Request {
    static Keys = {
        CUSTOMER_ID: paramKeys.CLAIM_CUSTOMER_ID,
        DESCRIPTION: paramKeys.DESCRIPTION,
        CLAIM_PROBLEM_ID: paramKeys.CLAIM_PROBLEM_ID,
        DEPARTMENTS_ID: paramKeys.DEPARTMENTS_ID,
        IMAGE_VIDEOS: paramKeys.IMAGE_VIDEOS,
        CAUSE: paramKeys.CAUSE,
        SOLUTION: paramKeys.SOLUTION,
        CLAIM_STATUS_ID: paramKeys.CLAIM_STATUS_ID,
    };
}
