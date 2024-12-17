// @ts-nocheck
import { _delete, get, post, put } from '../network'
import CreatePurchaseOrdersRequest from '../request/purchase/CreatePurchaseOrdersRequest'
import DeletePurchaseOrderRequest from '../request/purchase/DeletePurchaseOrderRequest'
import GetAllPurchaseOrderStatusForUpdateRequest from '../request/purchase/GetAllPurchaseOrderStatusForUpdateRequest'
import GetAllPurchaseOrderStatusRequest from '../request/purchase/GetAllPurchaseOrderStatusRequest'
import GetDetailPurchaseForUpdateRequest from '../request/purchase/GetDetailPurchaseForUpdateRequest'
import GetDetailPurchaseOrderRequest from '../request/purchase/GetDetailPurchaseRequest'
import GetDetailSupplierNoPermissionRequest from '../request/purchase/GetDetailSupplierNoPermissionRequest'
import GetListPurchaseOrderRequest from '../request/purchase/GetListPurchaseOrderRequest'
import GetProductInfoByCodeAndSupplierIdRequest from '../request/purchase/GetProductInfoByCodeAndSupplierIdRequest'
import {
  CreateWarehouseImportOrderRequest,
  GetEditWarehouseImportOrderRequest,
  GetListProductManagementByPurchaseOrderIdRequest,
  GetListWarehouseImportOrderRequest,
  UpdateWarehouseImportOrderRequest
} from '../request/purchase/WarehouseRegistrationRequest'
import GetDetailSupplierRequest from '../request/product/GetDetailSupplierRequest'
import urls from '../urls'
import GetListPurchaseOrderAlertRequest from "../request/purchase/GetListPurchaseOrderAlertRequest";
import {id} from "date-fns/locale";
import GetListSupplierTaxesBySupplierIdRequest from "../request/purchase/GetListSupplierTaxesBySupplierIdRequest";

export function getDetailPurchaseOrder(purchaseId) {
  const getDetailPurchaseOrderRequest = new GetDetailPurchaseOrderRequest()
  getDetailPurchaseOrderRequest.addParam(GetDetailPurchaseOrderRequest.Keys.PURCHASE_ID, purchaseId)
  const param = getDetailPurchaseOrderRequest.getParams()
  const headers = {}
  return get(urls.GET_SHOW_DETAIL_PURCHASE_ORDER, param, headers)
}

export function getDetailPurchaseOrderForUpdate(purchaseId) {
  const getDetailPurchaseForUpdateRequest = new GetDetailPurchaseForUpdateRequest()
  getDetailPurchaseForUpdateRequest.addParam(GetDetailPurchaseForUpdateRequest.Keys.PURCHASE_ID, purchaseId)
  const param = getDetailPurchaseForUpdateRequest.getParams()
  const headers = {}
  return get(urls.GET_SHOW_DETAIL_PURCHASE_ORDER_FOR_UPDATE, param, headers)
}

export function getListPurchaseOrder(params) {
  let param = null
  if (params) {
    const getListPurchaseOrderRequest = new GetListPurchaseOrderRequest()
    getListPurchaseOrderRequest.addParam(GetListPurchaseOrderRequest.Keys.CODE, params.code || '')
    getListPurchaseOrderRequest.addParam(GetListPurchaseOrderRequest.Keys.PAGE, params.page || '')
    getListPurchaseOrderRequest.addParam(GetListPurchaseOrderRequest.Keys.STATUS_ID, params.status_id || '')
    getListPurchaseOrderRequest.addParam(GetListPurchaseOrderRequest.Keys.START_DATE, params.start_date || '')
    getListPurchaseOrderRequest.addParam(GetListPurchaseOrderRequest.Keys.END_DATE, params.end_date || '')
    param = getListPurchaseOrderRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_PURCHASE_ORDER, param, headers)
}

export function getAllPurchaseOrdersStatus() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_PURCHASE_ORDERS_STATUS, param, headers)
}

export function deletePurchaseOrder(id) {
  const headers = {}
  const deletePurchaseOrderRequest = new DeletePurchaseOrderRequest()
  deletePurchaseOrderRequest.addParam(DeletePurchaseOrderRequest.Keys.PURCHASE_ID, id)
  const params = deletePurchaseOrderRequest.getParams()
  return _delete(urls.GET_LIST_PURCHASE_ORDER, params, headers)
}

export function getAllPurchaseOrderStatusCreate() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_PURCHASE_ORDER_STATUS_FOR_CREATE, param, headers)
}

export function getAllPurchaseOrderStatusUpdate(statusID) {
  let param = null
  const getAllPurchaseOrderStatusForUpdateRequest = new GetAllPurchaseOrderStatusForUpdateRequest()
  getAllPurchaseOrderStatusForUpdateRequest.addParam(
    GetAllPurchaseOrderStatusForUpdateRequest.Keys.PURCHASE_ORDER_ID,
    statusID
  )
  param = getAllPurchaseOrderStatusForUpdateRequest.getParams()
  const headers = {}
  return get(urls.GET_ALL_PURCHASE_ORDER_STATUS_FOR_UPDATE, param, headers)
}

export function getAllProductBySupplier(params) {
  let param = null
  if (params) {
    const getAllPurchaseOrderStatusRequest = new GetAllPurchaseOrderStatusRequest()
    getAllPurchaseOrderStatusRequest.addParam(GetAllPurchaseOrderStatusRequest.Keys.SUPPLIER_ID, params.supplier_id)
    param = getAllPurchaseOrderStatusRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_ALL_PRODUCT_BY_SUPPLIER, param, headers)
}

export function getProductInfoByCodeAndSupplierId(params) {
  let param = null
  if (params) {
    const getProductInfoByCodeAndSupplierIdRequest = new GetProductInfoByCodeAndSupplierIdRequest()
    getProductInfoByCodeAndSupplierIdRequest.addParam(
      GetProductInfoByCodeAndSupplierIdRequest.Keys.SUPPLIER_ID,
      params.supplier_id
    )
    getProductInfoByCodeAndSupplierIdRequest.addParam(
      GetProductInfoByCodeAndSupplierIdRequest.Keys.PRODUCT_MANAGEMENT_ID,
      params.product_management_id
    )
    param = getProductInfoByCodeAndSupplierIdRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_PRODUCT_INFORMATION_BY_CODE_AND_SUPPLIER, param, headers)
}

export function createPurchaseOrders(params) {
  let param = null
  if (params) {
    const createPurchaseOrdersRequest = new CreatePurchaseOrdersRequest()
    createPurchaseOrdersRequest.addParam(
      CreatePurchaseOrdersRequest.Keys.PURCHASE_ORDER_STATUS_ID,
      params.purchase_order_status_id
    )
    createPurchaseOrdersRequest.addParam(
      CreatePurchaseOrdersRequest.Keys.PRODUCT_MANAGEMENT_ID,
      params.product_management_id
    )
    createPurchaseOrdersRequest.addParam(CreatePurchaseOrdersRequest.Keys.SUPPLIER_ID, params.supplier_id)
    createPurchaseOrdersRequest.addParam(CreatePurchaseOrdersRequest.Keys.SUPPLIER_TAX_ID, params.supplier_tax_id)
    createPurchaseOrdersRequest.addParam(CreatePurchaseOrdersRequest.Keys.ODER_DELEVERY_DATE, params.delivery_date)
    createPurchaseOrdersRequest.addParam(
      CreatePurchaseOrdersRequest.Keys.PURCHASE_ORDER_PRODUCTS,
      params.purchase_order_products
    )
    createPurchaseOrdersRequest.addParam(CreatePurchaseOrdersRequest.Keys.NOTE, params.note)
    createPurchaseOrdersRequest.addParam(
      CreatePurchaseOrdersRequest.Keys.FILE_PURCHASE_ORDERS,
      params.file_purchase_orders || ''
    )
    param = createPurchaseOrdersRequest.getParams()
  }
  const headers = {}
  return post(urls.PURCHASE_ORDERS, param, headers)
}

export function updatePurchaseOrders(params) {
  let param = null
  if (params) {
    const createPurchaseOrdersRequest = new CreatePurchaseOrdersRequest()
    createPurchaseOrdersRequest.addParam(CreatePurchaseOrdersRequest.Keys.PURCHASE_ID, params.id)
    createPurchaseOrdersRequest.addParam(
      CreatePurchaseOrdersRequest.Keys.PURCHASE_ORDER_STATUS_ID,
      params.purchase_order_status_id
    )
    // createPurchaseOrdersRequest.addParam(CreatePurchaseOrdersRequest.Keys.PRODUCT_MANAGEMENT_ID, params.product_management_id)
    createPurchaseOrdersRequest.addParam(CreatePurchaseOrdersRequest.Keys.SUPPLIER_ID, params.supplier_id)
    createPurchaseOrdersRequest.addParam(CreatePurchaseOrdersRequest.Keys.SUPPLIER_TAX_ID, params.supplier_tax_id)
    createPurchaseOrdersRequest.addParam(CreatePurchaseOrdersRequest.Keys.ODER_DELEVERY_DATE, params.delivery_date)
    createPurchaseOrdersRequest.addParam(
      CreatePurchaseOrdersRequest.Keys.PURCHASE_ORDER_PRODUCTS,
      params.purchase_order_products
    )
    createPurchaseOrdersRequest.addParam(CreatePurchaseOrdersRequest.Keys.NOTE, params.note)
    createPurchaseOrdersRequest.addParam(
      CreatePurchaseOrdersRequest.Keys.FILE_PURCHASE_ORDERS,
      params.file_purchase_orders || ''
    )
    param = createPurchaseOrdersRequest.getParams()
  }
  const headers = {}
  return put(urls.PURCHASE_ORDERS, param, headers)
}

export function getListWarehouseImportOrderService(params) {
  let param = null
  if (params) {
    const getListWarehouseImportOrder = new GetListWarehouseImportOrderRequest()
    getListWarehouseImportOrder.addParam(GetListWarehouseImportOrderRequest.Keys.FROM_DATE, params.fromDate || '')
    getListWarehouseImportOrder.addParam(GetListWarehouseImportOrderRequest.Keys.TO_DATE, params.toDate || '')
    getListWarehouseImportOrder.addParam(GetListWarehouseImportOrderRequest.Keys.PAGE, params.page || '')
    getListWarehouseImportOrder.addParam(
      GetListWarehouseImportOrderRequest.Keys.WAREHOUSE_IMPORT_ORDER_CODE,
      params.warehouseImportOrderCode || ''
    )
    getListWarehouseImportOrder.addParam(
      GetListWarehouseImportOrderRequest.Keys.WAREHOUSE_IMPORT_ORDER_STATUS_ID,
      params.warehouseImportOrderStatusId || ''
    )

    param = getListWarehouseImportOrder.getParams()
  }

  const headers = {}
  return get(urls.GET_LIST_WAREHOUSE_IMPORT_ORDER, param, headers)
}

export function getListPurchaseOrderCodeOrderedService(params) {
  let param = null

  const headers = {}
  return get(urls.LIST_PURCHASE_ORDER_CODE_ORDERED, param, headers)
}

export function getListProductManagementByPurchaseOrderIdService(params) {
  let param = null

  if (params) {
    const createWarehouseImportOrderRequest = new GetListProductManagementByPurchaseOrderIdRequest()
    createWarehouseImportOrderRequest.addParam(
      GetListProductManagementByPurchaseOrderIdRequest.Keys.PURCHASE_ORDER_ID,
      params.purchaseOrderId || ''
    )

    param = createWarehouseImportOrderRequest.getParams()
  }

  const headers = {}
  return get(urls.GET_LIST_PRODUCT_MANAGEMENT_BY_PURCHASE_ORDER_ID, param, headers)
}

export function getAllProductManagementByPurchaseOrderIdService(params) {
  let param = null

  if (params) {
    const createWarehouseImportOrderRequest = new GetListProductManagementByPurchaseOrderIdRequest()
    createWarehouseImportOrderRequest.addParam(
      GetListProductManagementByPurchaseOrderIdRequest.Keys.PURCHASE_ORDER_ID,
      params.purchaseOrderId || ''
    )

    param = createWarehouseImportOrderRequest.getParams()
  }

  const headers = {}
  return get(urls.GET_ALL_PRODUCT_MANAGEMENT_BY_PURCHASE_ORDER_ID, param, headers)
}

export function createWarehouseImportOrderService(params) {
  let param = null

  if (params) {
    const createWarehouseImportOrderRequest = new CreateWarehouseImportOrderRequest()
    createWarehouseImportOrderRequest.addParam(
      CreateWarehouseImportOrderRequest.Keys.PURCHASE_ORDER_ID,
      params.purchaseOrderId || ''
    )
    createWarehouseImportOrderRequest.addParam(
      CreateWarehouseImportOrderRequest.Keys.RECEIVING_LOCATION_ID,
      params.receivingLocationId || ''
    )
    createWarehouseImportOrderRequest.addParam(
      CreateWarehouseImportOrderRequest.Keys.IMPORT_TIME,
      params.importTime || ''
    )
    createWarehouseImportOrderRequest.addParam(
      CreateWarehouseImportOrderRequest.Keys.IMPORT_DATE,
      params.importDate || ''
    )
    createWarehouseImportOrderRequest.addParam(
      CreateWarehouseImportOrderRequest.Keys.PRODUCT_WAREHOUSE_WAREHOUSE_IMPORT_ORDER,
      params.productWarehouseWarehouseImportOrder || ''
    )

    param = createWarehouseImportOrderRequest.getParams()
  }
  const headers = {}
  return post(urls.CREATE_WAREHOUSE_IMPORT_ORDER, param, headers)
}

export function updateWarehouseImportOrderService(params) {
  let param = null

  if (params) {
    const updateWarehouseImportOrderRequest = new UpdateWarehouseImportOrderRequest()
    updateWarehouseImportOrderRequest.addParam(UpdateWarehouseImportOrderRequest.Keys.ID, params.id || '')
    updateWarehouseImportOrderRequest.addParam(
      UpdateWarehouseImportOrderRequest.Keys.PURCHASE_ORDER_ID,
      params.purchaseOrderId || ''
    )
    updateWarehouseImportOrderRequest.addParam(
      UpdateWarehouseImportOrderRequest.Keys.RECEIVING_LOCATION_ID,
      params.receivingLocationId || ''
    )
    updateWarehouseImportOrderRequest.addParam(
      UpdateWarehouseImportOrderRequest.Keys.IMPORT_TIME,
      params.importTime || ''
    )
    updateWarehouseImportOrderRequest.addParam(
      UpdateWarehouseImportOrderRequest.Keys.IMPORT_DATE,
      params.importDate || ''
    )
    updateWarehouseImportOrderRequest.addParam(
      UpdateWarehouseImportOrderRequest.Keys.PRODUCT_WAREHOUSE_WAREHOUSE_IMPORT_ORDER,
      params.productWarehouseWarehouseImportOrder || ''
    )

    param = updateWarehouseImportOrderRequest.getParams()
  }
  const headers = {}
  return put(urls.UPDATE_WAREHOUSE_IMPORT_ORDER, param, headers)
}

export function getDetailSupplierNoPermission(id) {
  const headers = {}
  const getDetailSupplierNoPermissionRequest = new GetDetailSupplierNoPermissionRequest()
  getDetailSupplierNoPermissionRequest.addParam(GetDetailSupplierNoPermissionRequest.Keys.PURCHASE_ID, id)
  const params = getDetailSupplierNoPermissionRequest.getParams()
  return get(urls.DETAIL_SUPPLIER_NO_PERMISSION, params, headers)
}

export function getAllProductWithTrashed() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_PRODUCT_WITH_TRASHED, param, headers)
}

export function getEditWarehouseImportOrderService(id) {
  const headers = {}

  const getEditWarehouseImportOrderRequest = new GetEditWarehouseImportOrderRequest()
  getEditWarehouseImportOrderRequest.addParam(GetEditWarehouseImportOrderRequest.Keys.PURCHASE_ID, id)
  const params = getEditWarehouseImportOrderRequest.getParams()

  return get(urls.EDIT_WAREHOUSE_IMPORT_ORDER, params, headers)
}

export function getListOrderedProduct() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_ORDERED_PRODUCT, param, headers)
}

export function getListPurchaseOrderAlert(params) {
  let param = null
  if (params) {
    const getListPurchaseOrderAlertRequest = new GetListPurchaseOrderAlertRequest()
    getListPurchaseOrderAlertRequest.addParam(GetListPurchaseOrderAlertRequest.Keys.PAGE, params.page || '')
    param = getListPurchaseOrderAlertRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_PURCHASE_ORDER_ALERT, param, headers)
}

export function getListSupplierTaxesBySupplierId(supplierId) {
  const headers = {}

  const getListSupplierTaxesBySupplierIdRequest = new GetListSupplierTaxesBySupplierIdRequest()
  getListSupplierTaxesBySupplierIdRequest.addParam(GetListSupplierTaxesBySupplierIdRequest.Keys.SUPPLIER_ID, supplierId)
  const params = getListSupplierTaxesBySupplierIdRequest.getParams()
  return get(urls.GET_LIST_SUPPLIER_TAXES_BY_SUPPLIER_ID, params, headers)
}