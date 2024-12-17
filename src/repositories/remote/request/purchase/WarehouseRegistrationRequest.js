import Request from '../Request'
import paramKeys from '../paramKeys'

export class GetListWarehouseImportOrderRequest extends Request {
  static Keys = {
    PAGE: paramKeys.PAGE,
    FROM_DATE: paramKeys.FROM_DATE,
    TO_DATE: paramKeys.TO_DATE,
    WAREHOUSE_IMPORT_ORDER_CODE: paramKeys.WAREHOUSE_IMPORT_ORDER_CODE,
    WAREHOUSE_IMPORT_ORDER_STATUS_ID: paramKeys.WAREHOUSE_IMPORT_ORDER_STATUS_ID
  }
}

export class CreateWarehouseImportOrderRequest extends Request {
  static Keys = {
    PURCHASE_ORDER_ID: paramKeys.PURCHASE_ORDER_ID,
    RECEIVING_LOCATION_ID: paramKeys.RECEIVING_LOCATION_ID,
    IMPORT_TIME: paramKeys.IMPORT_TIME,
    IMPORT_DATE: paramKeys.IMPORT_DATE,
    PRODUCT_WAREHOUSE_WAREHOUSE_IMPORT_ORDER: paramKeys.PRODUCT_WAREHOUSE_WAREHOUSE_IMPORT_ORDER
  }
}

export class UpdateWarehouseImportOrderRequest extends Request {
  static Keys = {
    ID: paramKeys.PURCHASE_ID,
    PURCHASE_ORDER_ID: paramKeys.PURCHASE_ORDER_ID,
    RECEIVING_LOCATION_ID: paramKeys.RECEIVING_LOCATION_ID,
    IMPORT_TIME: paramKeys.IMPORT_TIME,
    IMPORT_DATE: paramKeys.IMPORT_DATE,
    PRODUCT_WAREHOUSE_WAREHOUSE_IMPORT_ORDER: paramKeys.PRODUCT_WAREHOUSE_WAREHOUSE_IMPORT_ORDER
  }
}

export class GetListProductManagementByPurchaseOrderIdRequest extends Request {
  static Keys = {
    PURCHASE_ORDER_ID: paramKeys.PURCHASE_ORDER_ID,
    RECEIVING_LOCATION_ID: paramKeys.RECEIVING_LOCATION_ID,
    IMPORT_TIME: paramKeys.IMPORT_TIME,
    IMPORT_DATE: paramKeys.IMPORT_DATE
  }
}

export class GetEditWarehouseImportOrderRequest extends Request {
  static Keys = {
    PURCHASE_ID: paramKeys.PURCHASE_ID
  }
}
