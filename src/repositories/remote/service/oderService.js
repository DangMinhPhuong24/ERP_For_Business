import urls from '../urls'
import { _delete, get, post, put } from '../network'
import GetListOderRequest from '../request/oder/GetListOderRequest'
import DeleteOderRequest from '../request/oder/DeleteOderRequest'
import GetDetailOderRequest from '../request/oder/GetDetailOderRequest'
import GetListProductOderRequest from '../request/oder/GetListProductOderRequest'
import GetListAdjustmentVoucherOderRequest from '../request/oder/GetListAdjustmentVoucherOderRequest'
import CreateAdjustmentVoucherRequest from '../request/oder/CreateAdjustmentVoucherRequest'
import DeleteAdjustmentVoucherRequest from '../request/oder/DeleteAdjustmentVoucherRequest'
import GetDetailAdjustmentVoucherRequest from '../request/oder/GetDetailAdjustmentVoucherRequest'
import UpdateAdjustmentVoucherRequest from '../request/oder/UpdateAdjustmentVoucherRequest'
import GetListCompensationVoucherOderRequest from '../request/oder/GetListCompensationVoucherOderRequest'
import CreateCompensationVoucherRequest from '../request/oder/CreateCompensationVoucherRequest'
import DeleteCompensationVoucherRequest from '../request/oder/DeleteCompensationVoucherRequest'
import GetDetailCompensationVoucherRequest from '../request/oder/GetDetailCompensationVoucherRequest'
import UpdateCompensationVoucherRequest from '../request/oder/UpdateCompensationVoucherRequest'
import GetAllAddressBranchByCustomerIdRequest from '../request/oder/GetAllAddressBranchByCustomerIdRequest'
import GetAllProductWarehouseByProductManagementIdRequest
  from "../request/oder/GetAllProductWarehouseByProductManagementIdRequest";
import GetAllProductWarehouseSuggestionRequest from "../request/oder/GetAllProductWarehouseSuggestionRequest";

export function getListOder(params) {
  let param = null
  if (params) {
    const getListOderRequest = new GetListOderRequest()
    getListOderRequest.addParam(GetListOderRequest.Keys.PAGE, params.page || '')
    getListOderRequest.addParam(GetListOderRequest.Keys.ODER_CODE, params.code || '')
    getListOderRequest.addParam(GetListOderRequest.Keys.PRICE, params.price || '')
    getListOderRequest.addParam(GetListOderRequest.Keys.CUSTOMER_NAME, params.customerName || '')
    getListOderRequest.addParam(GetListOderRequest.Keys.CREATE_AT_ODER, params.createdAt || '')
    getListOderRequest.addParam(GetListOderRequest.Keys.ODER_DELEVERY_DATE, params.deliveryDate || '')
    getListOderRequest.addParam(GetListOderRequest.Keys.ODER_STATUS, params.status || '')
    param = getListOderRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_ODER, param, headers)
}

export function getOderInformation(oderId) {
  const getDetailOderRequest = new GetDetailOderRequest()
  getDetailOderRequest.addParam(GetDetailOderRequest.Keys.ODER_ID, oderId)
  const param = getDetailOderRequest.getParams()
  const headers = {}
  return get(urls.GET_DETAIL_ODER, param, headers)
}

export function deleteOder(oderId) {
  const headers = {}
  const deleteOderRequest = new DeleteOderRequest()
  deleteOderRequest.addParam(DeleteOderRequest.Keys.ODER_ID, oderId)
  const params = deleteOderRequest.getParams()
  return _delete(urls.DELETE_DATA_ODER, params, headers)
}

export function getListProductByCustomer(customerId) {
  const getListProductOderRequest = new GetListProductOderRequest()
  getListProductOderRequest.addParam(GetListProductOderRequest.Keys.ODER_CUSTOMER_ID, customerId || '')
  const param = getListProductOderRequest.getParams()
  const headers = {}
  return get(urls.GET_ALL_PRODUCT_MANAGEMENT_BY_CUSTOMER_ID, param, headers)
}

export function getListAdjustmentVoucherByOrder(params) {
  const getListAdjustmentVoucherOderRequest = new GetListAdjustmentVoucherOderRequest()
  getListAdjustmentVoucherOderRequest.addParam(GetListAdjustmentVoucherOderRequest.Keys.PAGE, params.page || '')
  getListAdjustmentVoucherOderRequest.addParam(
    GetListAdjustmentVoucherOderRequest.Keys.ADJUSTMENT_VOUCHER_ODER_ID,
    params.order_id || ''
  )
  const param = getListAdjustmentVoucherOderRequest.getParams()
  const headers = {}
  return get(urls.GET_ADJUSTMENT_VOUCHER, param, headers)
}

export function createAdjustmentVoucher(params) {
  const createAdjustmentVoucherRequest = new CreateAdjustmentVoucherRequest()
  createAdjustmentVoucherRequest.addParam(
    CreateAdjustmentVoucherRequest.Keys.ADJUSTMENT_VOUCHER_ODER_ID,
    params.order_id || ''
  )
  createAdjustmentVoucherRequest.addParam(
    CreateAdjustmentVoucherRequest.Keys.ADJUSTMENT_VOUCHER_PRICE,
    params.adjustment_prices || ''
  )
  createAdjustmentVoucherRequest.addParam(CreateAdjustmentVoucherRequest.Keys.ODER_AMOUNT, params.amount || '')
  createAdjustmentVoucherRequest.addParam(CreateAdjustmentVoucherRequest.Keys.ODER_TOTAL_COST, params.total_cost || '')
  const param = createAdjustmentVoucherRequest.getParams()
  const headers = {}
  return post(urls.CREATE_ADJUSTMENT_VOUCHER, param, headers)
}

export function deleteAdjustmentVoucher(adjustmentVoucherId) {
  const headers = {}
  const deleteAdjustmentVoucherRequest = new DeleteAdjustmentVoucherRequest()
  deleteAdjustmentVoucherRequest.addParam(
    DeleteAdjustmentVoucherRequest.Keys.ADJUSTMENT_VOUCHER_ID,
    adjustmentVoucherId
  )
  const params = deleteAdjustmentVoucherRequest.getParams()
  return _delete(urls.DELETE_DATA_ADJUSTMENT_VOUCHER, params, headers)
}

export function getDetailAdjustmentVoucherByOrder(adjustmentVoucherId) {
  const getDetailAdjustmentVoucherRequest = new GetDetailAdjustmentVoucherRequest()
  getDetailAdjustmentVoucherRequest.addParam(
    GetDetailAdjustmentVoucherRequest.Keys.ADJUSTMENT_VOUCHER_ID,
    adjustmentVoucherId
  )
  const param = getDetailAdjustmentVoucherRequest.getParams()
  const headers = {}
  return get(urls.GET_DETAIL_ADJUSTMENT_VOUCHER, param, headers)
}

export function updateAdjustmentVoucherByOrder(params) {
  const updateAdjustmentVoucherRequest = new UpdateAdjustmentVoucherRequest()
  updateAdjustmentVoucherRequest.addParam(UpdateAdjustmentVoucherRequest.Keys.ADJUSTMENT_VOUCHER_ID, params.id)
  updateAdjustmentVoucherRequest.addParam(
    UpdateAdjustmentVoucherRequest.Keys.ADJUSTMENT_VOUCHER_PRICE,
    params.adjustment_prices || ''
  )
  updateAdjustmentVoucherRequest.addParam(UpdateAdjustmentVoucherRequest.Keys.ODER_AMOUNT, params.amount || '')
  updateAdjustmentVoucherRequest.addParam(UpdateAdjustmentVoucherRequest.Keys.ODER_TOTAL_COST, params.total_cost || '')
  const paramRequest = updateAdjustmentVoucherRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_DATA_ADJUSTMENT_VOUCHER, paramRequest, headers)
}

export function getListCompensationVoucherByOrder(params) {
  const getListCompensationVoucherOderRequest = new GetListCompensationVoucherOderRequest()
  getListCompensationVoucherOderRequest.addParam(GetListCompensationVoucherOderRequest.Keys.PAGE, params.page || '')
  getListCompensationVoucherOderRequest.addParam(
    GetListCompensationVoucherOderRequest.Keys.ADJUSTMENT_VOUCHER_ODER_ID,
    params.order_id || ''
  )
  const param = getListCompensationVoucherOderRequest.getParams()
  const headers = {}
  return get(urls.GET_COMPENSATION_VOUCHER, param, headers)
}

export function createCompensationVoucher(params) {
  const createCompensationVoucherRequest = new CreateCompensationVoucherRequest()
  createCompensationVoucherRequest.addParam(
    CreateCompensationVoucherRequest.Keys.ADJUSTMENT_VOUCHER_ODER_ID,
    params.order_id || ''
  )
  createCompensationVoucherRequest.addParam(
    CreateCompensationVoucherRequest.Keys.ODER_ADDRESS_ID,
    params.address_id || ''
  )
  createCompensationVoucherRequest.addParam(
    CreateCompensationVoucherRequest.Keys.ODER_PROVINCE_ID,
    params.province_id || ''
  )
  createCompensationVoucherRequest.addParam(
    CreateCompensationVoucherRequest.Keys.ODER_DISTRICT_ID,
    params.district_id || ''
  )
  createCompensationVoucherRequest.addParam(CreateCompensationVoucherRequest.Keys.ODER_WARD_ID, params.ward_id || '')
  createCompensationVoucherRequest.addParam(
    CreateCompensationVoucherRequest.Keys.ODER_ADDRESS_DETAIL,
    params.detail || ''
  )
  createCompensationVoucherRequest.addParam(
    CreateCompensationVoucherRequest.Keys.COMPENSATION_VOUCHER_QUANTITIES,
    params.compensation_quantities || ''
  )
  const param = createCompensationVoucherRequest.getParams()
  const headers = {}
  return post(urls.CREATE_COMPENSATION_VOUCHER, param, headers)
}

export function deleteCompensationVoucher(compensationVoucherId) {
  const headers = {}
  const deleteCompensationVoucherRequest = new DeleteCompensationVoucherRequest()
  deleteCompensationVoucherRequest.addParam(
    DeleteCompensationVoucherRequest.Keys.COMPENSATION_VOUCHER_ID,
    compensationVoucherId
  )
  const params = deleteCompensationVoucherRequest.getParams()
  return _delete(urls.DELETE_DATA_COMPENSATION_VOUCHER, params, headers)
}

export function getDetailCompensationVoucherByOrder(compensationVoucherId) {
  const getDetailCompensationVoucherRequest = new GetDetailCompensationVoucherRequest()
  getDetailCompensationVoucherRequest.addParam(
    GetDetailCompensationVoucherRequest.Keys.COMPENSATION_VOUCHER_ID,
    compensationVoucherId
  )
  const param = getDetailCompensationVoucherRequest.getParams()
  const headers = {}
  return get(urls.GET_DETAIL_COMPENSATION_VOUCHER, param, headers)
}

export function updateCompensationVoucherByOrder(params) {
  const updateCompensationVoucherRequest = new UpdateCompensationVoucherRequest()
  updateCompensationVoucherRequest.addParam(UpdateCompensationVoucherRequest.Keys.COMPENSATION_VOUCHER_ID, params.id)
  updateCompensationVoucherRequest.addParam(
    UpdateCompensationVoucherRequest.Keys.ODER_ADDRESS_ID,
    params.address_id || ''
  )
  updateCompensationVoucherRequest.addParam(
    UpdateCompensationVoucherRequest.Keys.ODER_PROVINCE_ID,
    params.province_id || ''
  )
  updateCompensationVoucherRequest.addParam(
    UpdateCompensationVoucherRequest.Keys.ODER_DISTRICT_ID,
    params.district_id || ''
  )
  updateCompensationVoucherRequest.addParam(UpdateCompensationVoucherRequest.Keys.ODER_WARD_ID, params.ward_id || '')
  updateCompensationVoucherRequest.addParam(
    UpdateCompensationVoucherRequest.Keys.ODER_ADDRESS_DETAIL,
    params.detail || ''
  )
  updateCompensationVoucherRequest.addParam(
    UpdateCompensationVoucherRequest.Keys.COMPENSATION_VOUCHER_QUANTITIES,
    params.compensation_quantities || ''
  )
  const paramRequest = updateCompensationVoucherRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_DATA_COMPENSATION_VOUCHER, paramRequest, headers)
}

export function getKanBanOrder() {
  let param = null
  const headers = {}
  return get(urls.GET_KANBAN_ORDER, param, headers)
}

export function getAllAddressBranchByCustomerId(customerId) {
  const getAllAddressBranchByCustomerIdRequest = new GetAllAddressBranchByCustomerIdRequest()
  getAllAddressBranchByCustomerIdRequest.addParam(
    GetAllAddressBranchByCustomerIdRequest.Keys.ID_OF_CUSTOMER,
    customerId
  )
  const param = getAllAddressBranchByCustomerIdRequest.getParams()
  const headers = {}
  return get(urls.GET_ALL_ADDRESS_BRANCH_BY_CUSTOMER_ID, param, headers)
}

export function getAllProductWarehouseByProductManagementId(params) {
  const getAllProductWarehouseByProductManagementIdRequest = new GetAllProductWarehouseByProductManagementIdRequest()
  getAllProductWarehouseByProductManagementIdRequest.addParam(GetAllProductWarehouseByProductManagementIdRequest.Keys.PRODUCT_MANAGEMENT_ID, params.product_management_id)
  getAllProductWarehouseByProductManagementIdRequest.addParam(GetAllProductWarehouseByProductManagementIdRequest.Keys.ODER_FINISHED_PRODUCT_FORM_ID, params.finished_product_form_id)
  getAllProductWarehouseByProductManagementIdRequest.addParam(GetAllProductWarehouseByProductManagementIdRequest.Keys.PRODUCT_QUANTITY, params.quantity)
  getAllProductWarehouseByProductManagementIdRequest.addParam(GetAllProductWarehouseByProductManagementIdRequest.Keys.LENGTH, params.length)
  getAllProductWarehouseByProductManagementIdRequest.addParam(GetAllProductWarehouseByProductManagementIdRequest.Keys.WIDTH, params.width)
  const param = getAllProductWarehouseByProductManagementIdRequest.getParams()
  const headers = {}
  return get(urls.GET_ALL_PRODUCT_WAREHOUSE_BY_PRODUCT_MANAGEMENT_ID, param, headers)
}

export function getAllProductWarehouseSuggestion(params) {
  const getAllProductWarehouseSuggestionRequest = new GetAllProductWarehouseSuggestionRequest()
  getAllProductWarehouseSuggestionRequest.addArrayParamsPropertyKeys(
    GetAllProductWarehouseSuggestionRequest.Keys.PRODUCT_WAREHOUSES,
    'product_warehouses',
    params.product_warehouses || [],
    [ 'product_warehouse_id', 'square_meter', 'scrap' ]
  );
  const param = getAllProductWarehouseSuggestionRequest.getParams()
  const headers = {};
  return get(urls.GET_ALL_PRODUCT_WAREHOUSE_SUGGESTION, param, headers)
}

export function getAllManufactureForm() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_MANUFACTURE_FORM, param, headers)
}