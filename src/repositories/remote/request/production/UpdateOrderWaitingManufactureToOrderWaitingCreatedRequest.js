import Request from '../Request';
import paramKeys from '../paramKeys';

export default class UpdateOrderWaitingManufactureToOrderWaitingCreatedRequest extends Request {
    static Keys = {
        ODER_ID: paramKeys.ODER_ID,
    };
}
