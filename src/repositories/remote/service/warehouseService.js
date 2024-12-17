// @ts-nocheck
import urls from '../urls'
import { post, get, _delete, put } from '../network'
import GetStatisticWarehouseRequest from '../request/warehouse/GetStatisticWarehouseRequest'
import GetListWarehousesRequest from '../request/warehouse/GetListWarehousesRequest'
import GetStatisticWarehouseLocationRequest from '../request/warehouse/GetStatisticWarehouseLocationRequest'
import GetListWarehousesLocationRequest from '../request/warehouse/GetListWarehousesLocationRequest'
import GetProductDetailRequest from '../request/warehouse/GetProductDetailRequest'
import UpdateProductConfigRequest from '../request/warehouse/UpdateProductConfigRequest'
import GetLocationDetailRequest from '../request/warehouse/GetLocationDetailRequest'
import GetListProductByWarehouseLocationIdRequest from '../request/warehouse/GetListProductByWarehouseLocationIdRequest'
import CreateWarehouseLocationRequest from '../request/warehouse/CreateWarehouseLocationRequest'
import DeleteLocationRequest from '../request/warehouse/DeleteLocationRequest'
import UpdateWarehouseLocationRequest from '../request/warehouse/UpdateWarehouseLocationRequest'
import CreateWarehouseRequest from '../request/warehouse/CreateWarehouseRequest'
import GetDetailWarehouseRequest from '../request/warehouse/GetDetailWarehouseRequest'
import UpdateWarehouseRequest from '../request/warehouse/UpdateWarehouseRequest'
import DeleteWarehouseRequest from '../request/warehouse/DeleteWarehouseRequest'
import GetKanbanWarehouseImportOrdersRequest from '../request/warehouse/GetKanbanWarehouseImportOrdersRequest'
import GetDetailWarehouseImportOrdersRequest from '../request/warehouse/GetDetailWarehouseImportOrdersRequest'
import GetKanbanWarehouseExportOrdersRequest from '../request/warehouse/GetKanbanWarehouseExportOrdersRequest'
import GetDetailWarehouseExportOrdersRequest from '../request/warehouse/GetDetailWarehouseExportOrdersRequest'
import GetFormationHistoryByProductRequest from '../request/warehouse/GetFormationHistoryByProductRequest'
import GetListOrderAlertRequest from '../request/warehouse/GetListOrderAlertRequest'
import GetListDataPieChartWarehouseTrafficRequest from '../request/warehouse/GetListDataPieChartWarehouseTrafficRequest'
import GetList from '../request/warehouse/GetListDataBarChartWarehouseTrafficRequest'
import {
  GetDetailProductInventoryRequest,
  GetListDataLongestInventoryRequest,
  GetListDataTopInventoryRequest
} from '../request/warehouse/InventoryRequest'
import GetListWarehouseExportQROrdersRequest from '../request/warehouse/GetListWarehouseExportQROrdersRequest'

export function GetStatisticWarehouse(params) {
  let param = null
  if (params) {
    const getStatisticWarehouseRequest = new GetStatisticWarehouseRequest()
    getStatisticWarehouseRequest.addParam(
      GetStatisticWarehouseRequest.Keys.DATE_WEIGHT_INVENTORY,
      params.date_weight_inventory || ''
    )
    getStatisticWarehouseRequest.addParam(
      GetStatisticWarehouseRequest.Keys.DATE_LENGTH_INVENTORY,
      params.date_length_inventory || ''
    )
    param = getStatisticWarehouseRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_STATISTIC_WAREHOUSE, param, headers)
}

export function GetListWarehouses(params) {
  let param = null
  if (params) {
    const getListWarehousesRequest = new GetListWarehousesRequest()
    getListWarehousesRequest.addParam(GetListWarehousesRequest.Keys.PAGE, params.page || '')
    getListWarehousesRequest.addParam(GetListWarehousesRequest.Keys.SEARCH_WAREHOUSE, params.search_warehouse || '')
    getListWarehousesRequest.addParam(GetListWarehousesRequest.Keys.BRANCH_ID, params.branch_id || '')
    param = getListWarehousesRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_WAREHOUSES, param, headers)
}

export function GetStatisticWarehouseLocation(params) {
  let param = null
  if (params) {
    const getStatisticWarehouseLocationRequest = new GetStatisticWarehouseLocationRequest()
    getStatisticWarehouseLocationRequest.addParam(
      GetStatisticWarehouseLocationRequest.Keys.DATE_WEIGHT_INVENTORY,
      params.date_weight_inventory || ''
    )
    getStatisticWarehouseLocationRequest.addParam(
      GetStatisticWarehouseLocationRequest.Keys.DATE_LENGTH_INVENTORY,
      params.date_length_inventory || ''
    )
    param = getStatisticWarehouseLocationRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_STATISTIC_WAREHOUSE_LOCATION, param, headers)
}

export function GetListWarehousesLocation(params) {
  let param = null
  if (params) {
    const getListWarehousesLocationRequest = new GetListWarehousesLocationRequest()
    getListWarehousesLocationRequest.addParam(GetListWarehousesLocationRequest.Keys.PAGE, params.page || '')
    getListWarehousesLocationRequest.addParam(
      GetListWarehousesLocationRequest.Keys.SEARCH_WAREHOUSE_LOCATION,
      params.search_warehouse_location || ''
    )
    getListWarehousesLocationRequest.addParam(
      GetListWarehousesLocationRequest.Keys.WAREHOUSE_ID,
      params.warehouse_id || ''
    )
    getListWarehousesLocationRequest.addParam(
      GetListWarehousesLocationRequest.Keys.WAREHOUSE_LOCATION_TYPE_ID,
      params.warehouse_location_type_id || ''
    )
    param = getListWarehousesLocationRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_WAREHOUSES_LOCATION, param, headers)
}

export function getListAllWarehouse() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_ALL_WAREHOUSES, param, headers)
}

export function getProductDetail(productId) {
  const getProductDetailRequest = new GetProductDetailRequest()
  getProductDetailRequest.addParam(GetProductDetailRequest.Keys.PRODUCT_DETAIL_ID, productId)
  const param = getProductDetailRequest.getParams()
  const headers = {}
  return get(urls.GET_DETAIL_PRODUCT_WAREHOUSE, param, headers)
}

export function getFormationHistoryByProduct(productWarehouseId) {
  const getFormationHistoryByProductRequest = new GetFormationHistoryByProductRequest()
  getFormationHistoryByProductRequest.addParam(
    GetFormationHistoryByProductRequest.Keys.PRODUCT_WAREHOUSE_ID,
    productWarehouseId
  )
  const param = getFormationHistoryByProductRequest.getParams()
  const headers = {}
  return get(urls.GET_FORMATION_HISTORY_BY_PRODUCT_WAREHOUSE, param, headers)
}

export function updateProductConfig(params) {
  let param = null
  if (params) {
    const updateProductConfigRequest = new UpdateProductConfigRequest()
    updateProductConfigRequest.addParam(UpdateProductConfigRequest.Keys.PRODUCT_DETAIL_ID, params.id || '')
    updateProductConfigRequest.addParam(
      UpdateProductConfigRequest.Keys.LENGTH_INVENTORY_MIN,
      params.length_inventory_min || ''
    )
    updateProductConfigRequest.addParam(
      UpdateProductConfigRequest.Keys.LENGTH_INVENTORY_MAX,
      params.length_inventory_max || ''
    )
    updateProductConfigRequest.addParam(
      UpdateProductConfigRequest.Keys.ROLL_INVENTORY_MIN,
      params.roll_inventory_max || ''
    )
    updateProductConfigRequest.addParam(UpdateProductConfigRequest.Keys.LENGTH_SELL_WEEK, params.length_sell_week || '')
    updateProductConfigRequest.addParam(
      UpdateProductConfigRequest.Keys.LENGTH_SELL_MONTH,
      params.length_sell_month || ''
    )
    param = updateProductConfigRequest.getParams()
  }
  const headers = {}
  return put(urls.UPDATE_PRODUCT_CONFIG, param, headers)
}

export function getLocationDetail(params) {
  const getLocationDetailRequest = new GetLocationDetailRequest()
  getLocationDetailRequest.addParam(GetLocationDetailRequest.Keys.LOCATION_ID, params.id)
  getLocationDetailRequest.addParam(
    GetLocationDetailRequest.Keys.DATE_WEIGHT_IMPORT_WAREHOUSE,
    params.date_weight_import_warehouse || ''
  )
  getLocationDetailRequest.addParam(
    GetLocationDetailRequest.Keys.DATE_SQUARE_METER_IMPORT_WAREHOUSE,
    params.date_square_meter_import_warehouse || ''
  )
  const param = getLocationDetailRequest.getParams()
  const headers = {}
  return get(urls.GET_DETAIL_WAREHOUSE_LOCATION, param, headers)
}

export function getListProductByWarehouseLocationId(params) {
  const getListProductByWarehouseLocationIdRequest = new GetListProductByWarehouseLocationIdRequest()
  getListProductByWarehouseLocationIdRequest.addParam(
    GetListProductByWarehouseLocationIdRequest.Keys.PAGE,
    params.page || ''
  )
  getListProductByWarehouseLocationIdRequest.addParam(
    GetListProductByWarehouseLocationIdRequest.Keys.WAREHOUSE_LOCATION_ID,
    params.warehouse_location_id
  )
  getListProductByWarehouseLocationIdRequest.addParam(
    GetListProductByWarehouseLocationIdRequest.Keys.SEARCH_PRODUCT_WAREHOUSE,
    params.search_product_warehouse || ''
  )
  const param = getListProductByWarehouseLocationIdRequest.getParams()
  const headers = {}
  return get(urls.GET_LIST_PRODUCT_WAREHOUSE_BY_WAREHOUSE_LOCATION_ID, param, headers)
}

export function exportDataProductByWarehouseLocationIdToExcel(params) {
  let param = null
  if (params) {
    const exportDataProductByWarehouseLocationIdToExcelRequest = new GetListProductByWarehouseLocationIdRequest()
    exportDataProductByWarehouseLocationIdToExcelRequest.addParam(
      GetListProductByWarehouseLocationIdRequest.Keys.search_product_warehouse,
      params.search_product_warehouse || ''
    )
    exportDataProductByWarehouseLocationIdToExcelRequest.addParam(
      GetListProductByWarehouseLocationIdRequest.Keys.WAREHOUSE_LOCATION_ID,
      params.warehouse_location_id || ''
    )
    param = exportDataProductByWarehouseLocationIdToExcelRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_EXPORT_PRODUCT_WAREHOUSE_BY_WAREHOUSE_LOCATION_ID, param, headers)
}

export function createWarehouseLocation(params) {
  let param = null
  if (params) {
    const createWarehouseLocationRequest = new CreateWarehouseLocationRequest()
    createWarehouseLocationRequest.addParam(CreateWarehouseLocationRequest.Keys.WAREHOUSE_ID, params.warehouse_id || '')
    createWarehouseLocationRequest.addParam(
      CreateWarehouseLocationRequest.Keys.WAREHOUSE_LOCATION_NAME,
      params.warehouse_location_name || ''
    )
    createWarehouseLocationRequest.addParam(
      CreateWarehouseLocationRequest.Keys.WAREHOUSE_LOCATION_TYPE_ID,
      params.warehouse_location_type_id || ''
    )
    createWarehouseLocationRequest.addParam(CreateWarehouseLocationRequest.Keys.HEIGHT, params.height || '')
    createWarehouseLocationRequest.addParam(CreateWarehouseLocationRequest.Keys.LENGTH, params.length || '')
    createWarehouseLocationRequest.addParam(CreateWarehouseLocationRequest.Keys.WIDTH, params.width || '')
    createWarehouseLocationRequest.addParam(
      CreateWarehouseLocationRequest.Keys.LIMIT_INVENTORY_SQUARE_METER,
      params.limit_inventory_square_meter || ''
    )
    createWarehouseLocationRequest.addParam(CreateWarehouseLocationRequest.Keys.DESCRIPTION, params.description || '')
    param = createWarehouseLocationRequest.getParams()
  }
  const headers = {}
  return post(urls.CREATE_WAREHOUSE_LOCATION, param, headers)
}

export function updateWarehouseLocation(params) {
  let param = null
  if (params) {
    const updateWarehouseLocationRequest = new UpdateWarehouseLocationRequest()
    updateWarehouseLocationRequest.addParam(UpdateWarehouseLocationRequest.Keys.WAREHOUSE_ID, params.warehouse_id || '')
    updateWarehouseLocationRequest.addParam(UpdateWarehouseLocationRequest.Keys.LOCATION_ID, params.id || '')
    updateWarehouseLocationRequest.addParam(
      UpdateWarehouseLocationRequest.Keys.WAREHOUSE_LOCATION_NAME,
      params.warehouse_location_name || ''
    )
    updateWarehouseLocationRequest.addParam(
      UpdateWarehouseLocationRequest.Keys.WAREHOUSE_LOCATION_TYPE_ID,
      params.warehouse_location_type_id || ''
    )
    updateWarehouseLocationRequest.addParam(UpdateWarehouseLocationRequest.Keys.HEIGHT, params.height || '')
    updateWarehouseLocationRequest.addParam(UpdateWarehouseLocationRequest.Keys.LENGTH, params.length || '')
    updateWarehouseLocationRequest.addParam(UpdateWarehouseLocationRequest.Keys.WIDTH, params.width || '')
    updateWarehouseLocationRequest.addParam(
      UpdateWarehouseLocationRequest.Keys.LIMIT_INVENTORY_SQUARE_METER,
      params.limit_inventory_square_meter || ''
    )
    updateWarehouseLocationRequest.addParam(UpdateWarehouseLocationRequest.Keys.DESCRIPTION, params.description || '')
    param = updateWarehouseLocationRequest.getParams()
  }
  const headers = {}
  return put(urls.UPDATE_WAREHOUSE_LOCATION, param, headers)
}

export function deleteWarehouseLocation(locationId) {
  const headers = {}
  const deleteLocationRequest = new DeleteLocationRequest()
  deleteLocationRequest.addParam(DeleteLocationRequest.Keys.LOCATION_ID, locationId)
  const params = deleteLocationRequest.getParams()
  return _delete(urls.DELETE_WAREHOUSE_LOCATION, params, headers)
}

export function getAllWarehouseLocation() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_ALL_WAREHOUSE_LOCATION, param, headers)
}

//WAREHOUSE
export function createWarehouse(params) {
  let param = null
  if (params) {
    const createWarehouseRequest = new CreateWarehouseRequest()
    createWarehouseRequest.addParam(CreateWarehouseRequest.Keys.WAREHOUSE_NAME, params.warehouse_name || '')
    createWarehouseRequest.addParam(CreateWarehouseRequest.Keys.BRANCH_ID, params.branch_id || '')
    createWarehouseRequest.addParam(CreateWarehouseRequest.Keys.DESCRIPTION, params.description || '')
    param = createWarehouseRequest.getParams()
  }
  const headers = {}
  return post(urls.CREATE_WAREHOUSE, param, headers)
}

export function getDetailWarehouse(params) {
  const getDetailWarehouseRequest = new GetDetailWarehouseRequest()
  getDetailWarehouseRequest.addParam(GetDetailWarehouseRequest.Keys.WAREHOUSE_PRIMARY_ID, params.id)
  getDetailWarehouseRequest.addParam(
    GetDetailWarehouseRequest.Keys.DATE_WEIGHT_IMPORT_WAREHOUSE,
    params.date_weight_import_warehouse || ''
  )
  getDetailWarehouseRequest.addParam(
    GetDetailWarehouseRequest.Keys.DATE_SQUARE_METER_IMPORT_WAREHOUSE,
    params.date_square_meter_import_warehouse || ''
  )
  const param = getDetailWarehouseRequest.getParams()
  const headers = {}
  return get(urls.GET_DETAIL_WAREHOUSE, param, headers)
}

export function updateWarehouse(params) {
  let param = null
  if (params) {
    const updateWarehouseRequest = new UpdateWarehouseRequest()
    updateWarehouseRequest.addParam(UpdateWarehouseRequest.Keys.WAREHOUSE_PRIMARY_ID, params.id || '')
    updateWarehouseRequest.addParam(UpdateWarehouseRequest.Keys.WAREHOUSE_NAME, params.warehouse_name || '')
    updateWarehouseRequest.addParam(UpdateWarehouseRequest.Keys.BRANCH_ID, params.branch_id || '')
    updateWarehouseRequest.addParam(UpdateWarehouseRequest.Keys.DESCRIPTION, params.description || '')
    param = updateWarehouseRequest.getParams()
  }
  const headers = {}
  return put(urls.UPDATE_WAREHOUSE, param, headers)
}

export function deleteWarehouse(warehouseId) {
  const headers = {}
  const deleteWarehouseRequest = new DeleteWarehouseRequest()
  deleteWarehouseRequest.addParam(DeleteWarehouseRequest.Keys.WAREHOUSE_PRIMARY_ID, warehouseId)
  const params = deleteWarehouseRequest.getParams()
  return _delete(urls.DELETE_WAREHOUSE, params, headers)
}

export function getKanbanWarehouseImportOrders(params) {
  const getKanbanWarehouseImportOrdersRequest = new GetKanbanWarehouseImportOrdersRequest()
  getKanbanWarehouseImportOrdersRequest.addParam(
    GetKanbanWarehouseImportOrdersRequest.Keys.WAREHOUSE_IMPORT_ORDER_CODE,
    params.code || ''
  )
  getKanbanWarehouseImportOrdersRequest.addParam(GetKanbanWarehouseImportOrdersRequest.Keys.DATE, params.date || '')
  const param = getKanbanWarehouseImportOrdersRequest.getParams()
  const headers = {}
  return get(urls.GET_KANBAN_WAREHOUSE_IMPORT_ORDERS, param, headers)
}

export function getDetailWarehouseImportOrders(id) {
  const getDetailWarehouseImportOrdersRequest = new GetDetailWarehouseImportOrdersRequest()
  getDetailWarehouseImportOrdersRequest.addParam(
    GetDetailWarehouseImportOrdersRequest.Keys.WAREHOUSE_IMPORT_ORDER_ID,
    id || ''
  )
  const param = getDetailWarehouseImportOrdersRequest.getParams()
  const headers = {}
  return get(urls.DETAIL_WAREHOUSE_IMPORT_ORDERS, param, headers)
}

export function getDetailWarehouseExportOrders(id) {
  const getDetailWarehouseExportOrdersRequest = new GetDetailWarehouseExportOrdersRequest()
  getDetailWarehouseExportOrdersRequest.addParam(
    GetDetailWarehouseExportOrdersRequest.Keys.WAREHOUSE_EXPORT_ORDER_ID,
    id || ''
  )
  const param = getDetailWarehouseExportOrdersRequest.getParams()
  const headers = {}
  return get(urls.DETAIL_WAREHOUSE_EXPORT_ORDERS, param, headers)
}

export function getListWarehouseExportQROrders(id) {
  const getListWarehouseExportQROrdersRequest = new GetListWarehouseExportQROrdersRequest()
  getListWarehouseExportQROrdersRequest.addParam(
    GetListWarehouseExportQROrdersRequest.Keys.WAREHOUSE_IMPORT_ORDER_QR_ID,
    id
  )
  const param = getListWarehouseExportQROrdersRequest.getParams()
  const headers = {}
  return get(urls.GET_LIST_QR_PRODUCT_WAREHOUSE_BY_WAREHOUSE_IMPORT_ORDER_ID, param, headers)
}

export function getKanbanWarehouseExportOrders(params) {
  const getKanbanWarehouseExportOrdersRequest = new GetKanbanWarehouseExportOrdersRequest()
  getKanbanWarehouseExportOrdersRequest.addParam(
    GetKanbanWarehouseExportOrdersRequest.Keys.WAREHOUSE_EXPORT_ORDER_CODE,
    params.search_warehouse_export_order || ''
  )
  getKanbanWarehouseExportOrdersRequest.addParam(GetKanbanWarehouseExportOrdersRequest.Keys.DATE, params.date || '')
  const param = getKanbanWarehouseExportOrdersRequest.getParams()
  const headers = {}
  return get(urls.GET_KANBAN_WAREHOUSE_EXPORT_ORDERS, param, headers)
}

export function getListOrderAlert(params) {
  let param = null
  if (params) {
    const getListOrderAlertRequest = new GetListOrderAlertRequest()
    getListOrderAlertRequest.addParam(GetListOrderAlertRequest.Keys.WAREHOUSE_ID, params.warehouse_id || '')
    getListOrderAlertRequest.addParam(GetListOrderAlertRequest.Keys.PAGE, params.page || '')
    param = getListOrderAlertRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_ORDER_ALERT, param, headers)
}

export function getListDataPieChartWarehouseTrafficService(params) {
  let param = null
  if (params) {
    const getListDataPieChartWarehouseTrafficRequest = new GetListDataPieChartWarehouseTrafficRequest()
    getListDataPieChartWarehouseTrafficRequest.addParam(
      GetListDataPieChartWarehouseTrafficRequest.Keys.WAREHOUSE_ID,
      params.warehouse_id
    )

    param = getListDataPieChartWarehouseTrafficRequest.getParams()
  }
  const headers = {}
  return get(urls.LIST_WAREHOUSE_FLOW, param, headers)
}

export function getListDataBarChartWarehouseTrafficService(params) {
  let param = null
  if (params) {
    const getListDataBarChartWarehouseTrafficRequest = new GetList()
    getListDataBarChartWarehouseTrafficRequest.addParam(GetList.Keys.WAREHOUSE_ID, params.warehouse_id)
    getListDataBarChartWarehouseTrafficRequest.addParam(
      GetList.Keys.WAREHOUSE_LOCATION_TYPE_ID,
      params.warehouse_location_type_id
    )

    param = getListDataBarChartWarehouseTrafficRequest.getParams()
  }
  const headers = {}
  return get(urls.DETAIL_WAREHOUSE_FLOW, param, headers)
}

export function getListDataTopInventoryService(params) {
  let param = null
  if (params) {
    const getListDataTopInventoryRequest = new GetListDataTopInventoryRequest()
    getListDataTopInventoryRequest.addParam(GetListDataTopInventoryRequest.Keys.WAREHOUSE_ID, params.warehouse_id)
    getListDataTopInventoryRequest.addArrayParams(
      GetListDataTopInventoryRequest.Keys.WAREHOUSE_LOCATION_TYPE,
      'warehouse_location_type',
      params.warehouse_location_type || []
    )

    param = getListDataTopInventoryRequest.getParams()
  }
  const headers = {}
  return get(urls.TOP_INVENTORY, param, headers)
}

export function getListDataLongestInventoryService(params) {
  let param = null
  if (params) {
    const getListDataLongestInventoryRequest = new GetListDataLongestInventoryRequest()
    getListDataLongestInventoryRequest.addParam(
      GetListDataLongestInventoryRequest.Keys.WAREHOUSE_ID,
      params.warehouse_id
    )
    getListDataLongestInventoryRequest.addArrayParams(
      GetListDataLongestInventoryRequest.Keys.WAREHOUSE_LOCATION_TYPE,
      'warehouse_location_type',
      params.warehouse_location_type || []
    )

    param = getListDataLongestInventoryRequest.getParams()
  }
  const headers = {}
  return get(urls.LONGEST_INVENTORY, param, headers)
}

export function getDetailProductsInventoryService(params) {
  let param = null
  if (params) {
    const getDetailProductInventoryRequest = new GetDetailProductInventoryRequest()
    getDetailProductInventoryRequest.addParam(GetDetailProductInventoryRequest.Keys.WAREHOUSE_ID, params.warehouse_id)
    getDetailProductInventoryRequest.addParam(
      GetDetailProductInventoryRequest.Keys.PRODUCT_MANAGEMENT_ID,
      params.product_management_id || ''
    )
    getDetailProductInventoryRequest.addParam(GetDetailProductInventoryRequest.Keys.SORT_BY, params.sort_by || '')
    getDetailProductInventoryRequest.addParam(GetDetailProductInventoryRequest.Keys.PAGE, params.page || '')
    getDetailProductInventoryRequest.addArrayParams(
      GetDetailProductInventoryRequest.Keys.WAREHOUSE_LOCATION_TYPE,
      'warehouse_location_type',
      params.warehouse_location_type || []
    )

    param = getDetailProductInventoryRequest.getParams()
  }
  const headers = {}
  return get(urls.DETAIL_PRODUCTS_INVENTORY, param, headers)
}
