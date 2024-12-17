import Request from '../Request'
import paramKeys from '../paramKeys'

export class GetListDataTopInventoryRequest extends Request {
  static Keys = {
    WAREHOUSE_ID: paramKeys.WAREHOUSE_ID,
    WAREHOUSE_LOCATION_TYPE: paramKeys.WAREHOUSE_LOCATION_TYPE
  }
}

export class GetListDataLongestInventoryRequest extends Request {
  static Keys = {
    WAREHOUSE_ID: paramKeys.WAREHOUSE_ID,
    WAREHOUSE_LOCATION_TYPE: paramKeys.WAREHOUSE_LOCATION_TYPE
  }
}

export class GetDetailProductInventoryRequest extends Request {
  static Keys = {
    WAREHOUSE_ID: paramKeys.WAREHOUSE_ID,
    PRODUCT_MANAGEMENT_ID: paramKeys.PRODUCT_MANAGEMENT_ID,
    SORT_BY: paramKeys.SORT_BY,
    PAGE: paramKeys.PAGE,
    WAREHOUSE_LOCATION_TYPE: paramKeys.WAREHOUSE_LOCATION_TYPE
  }
}
