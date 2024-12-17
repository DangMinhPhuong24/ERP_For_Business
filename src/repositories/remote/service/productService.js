import GetListProductsRequest from '../request/product/GetListProductsRequest'
import { get, _delete, post, put } from '../network'
import urls from '../urls'
import GetListProductGroupRequest from '../request/product/GetListProductGroupRequest'
import GetListSupplierRequest from '../request/product/GetListSupplierRequest'
import DeleteSupplierRequest from '../request/product/DeleteSupplierRequest'
import DeleteProductGroupRequest from '../request/product/DeleteProductGroupRequest'
import CreateProductGroupsRequest from '../request/product/CreateProductGroupsRequest'
import GetDetailProductGroupRequest from '../request/product/GetDetailProductGroupRequest'
import UpdateProductGroupsRequest from '../request/product/UpdateProductGroupsRequest'
import GetDetailSupplierRequest from '../request/product/GetDetailSupplierRequest'
import CreateSuppliersRequest from "../request/product/CreateSuppliersRequest";
import UpdateSuppliersRequest from "../request/product/UpdateSuppliersRequest";

export function getListProducts(params) {
  let param = null
  if (params) {
    const getListProductsRequest = new GetListProductsRequest()
    getListProductsRequest.addParam(GetListProductsRequest.Keys.PAGE, params.page || '')
    getListProductsRequest.addParam(
      GetListProductsRequest.Keys.SEARCH_PRODUCT_WAREHOUSE,
      params.search_product_warehouse || ''
    )
    getListProductsRequest.addParam(GetListProductsRequest.Keys.WAREHOUSE_ID, params.warehouse_id || '')
    param = getListProductsRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_PRODUCT_WAREHOUSES, param, headers)
}

export function getExportProduct(params) {
  let param = null
  if (params) {
    const getListProductsRequest = new GetListProductsRequest()
    getListProductsRequest.addParam(GetListProductsRequest.Keys.PAGE, params.page || '')
    getListProductsRequest.addParam(
      GetListProductsRequest.Keys.SEARCH_PRODUCT_WAREHOUSE,
      params.search_product_warehouse || ''
    )
    getListProductsRequest.addParam(GetListProductsRequest.Keys.WAREHOUSE_ID, params.warehouse_id || '')
    param = getListProductsRequest.getParams()
  }
  const headers = {}
  return get(urls.EXPORT_PRODUCT_WAREHOUSE, param, headers)
}
export function getListSupplier() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_SUPPLIER, param, headers)
}

export function getListProductType() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_PRODUCT_TYPE, param, headers)
}

export function getAllSupplier() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_SUPPLIERS, param, headers)
}

export function getDetailSupplier(id) {
  const headers = {}
  const getDetailSupplierRequest = new GetDetailSupplierRequest()
  getDetailSupplierRequest.addParam(GetDetailSupplierRequest.Keys.DETAIL_SUPPLIER_ID, id)
  const params = getDetailSupplierRequest.getParams()
  return get(urls.DETAIL_SUPPLIER, params, headers)
}

export function getAllWarehouseLocation() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_WAREHOUSE_LOCATION, param, headers)
}

export function getAllWarehouse() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_WAREHOUSE, param, headers)
}

export function getAllProducts() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_PRODUCTS, param, headers)
}

export function exportDataWarehouseProductToExcel(params) {
  let param = null
  if (params) {
    const getListProductsRequest = new GetListProductsRequest()
    // eslint-disable-next-line no-use-before-define
    getListProductsRequest.addParam(GetListProductsRequest.Keys.PAGE, params.page || '')
    getListProductsRequest.addParam(GetListProductsRequest.Keys.SEARCH_PRODUCT, params.searchProduct || '')
    getListProductsRequest.addParam(GetListProductsRequest.Keys.FROM_PRICE, params.fromPrice || '')
    getListProductsRequest.addParam(GetListProductsRequest.Keys.TO_PRICE, params.toPrice || '')
    getListProductsRequest.addParam(GetListProductsRequest.Keys.SUPPLIER_ID, params.supplierId || '')
    getListProductsRequest.addParam(GetListProductsRequest.Keys.PRODUCT_GROUP_ID, params.productGroupId || '')
    getListProductsRequest.addParam(GetListProductsRequest.Keys.WAREHOUSE_ID, params.warehouseId || '')
    getListProductsRequest.addParam(GetListProductsRequest.Keys.WAREHOUSE_LOCATION_ID, params.warehouseLocationId || '')
    param = getListProductsRequest.getParams()
  }
  const headers = {}
  return get(urls.EXPORT_EXCEL_DATA_WAREHOUSE_PRODUCT, param, headers)
}

export function getListProductGroup(params) {
  let param = null
  if (params) {
    const getListProductGroupRequest = new GetListProductGroupRequest()
    // eslint-disable-next-line no-use-before-define
    getListProductGroupRequest.addParam(GetListProductGroupRequest.Keys.PAGE, params.page || '')
    param = getListProductGroupRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_PRODUCT_GROUP, param, headers)
}

export function getSuppliers(params) {
  let param = null
  if (params) {
    const getListSupplierRequest = new GetListSupplierRequest()
    getListSupplierRequest.addParam(GetListSupplierRequest.Keys.PAGE, params.page || '')
    getListSupplierRequest.addParam(GetListSupplierRequest.Keys.SEARCH_SUPPLIER, params.search_supplier || '')
    param = getListSupplierRequest.getParams()
  }
  const headers = {}
  return get(urls.SUPPLIERS, param, headers)
}

export function createSuppliers(params) {
  const createSuppliersRequest = new CreateSuppliersRequest()
  createSuppliersRequest.addParam(
    CreateSuppliersRequest.Keys.SUPPLIER_NAME,
    params.supplier_name || ''
  )
  createSuppliersRequest.addParam(
    CreateSuppliersRequest.Keys.ABBREVIATION,
    params.abbreviation || ''
  )
  createSuppliersRequest.addParam(
    CreateSuppliersRequest.Keys.PERSON_IN_CHARGES,
    params.person_in_charge || ''
  )
  createSuppliersRequest.addParam(
    CreateSuppliersRequest.Keys.TAX_CODE,
    params.tax_code || ''
  )
  createSuppliersRequest.addParam(
    CreateSuppliersRequest.Keys.ADDRESS,
    params.address || ''
  )
  createSuppliersRequest.addParam(
    CreateSuppliersRequest.Keys.PHONE_NUMBER,
    params.phone_number || ''
  )
  createSuppliersRequest.addParam(
    CreateSuppliersRequest.Keys.USER_GMAIL,
    params.email || ''
  )
  createSuppliersRequest.addParam(
    CreateSuppliersRequest.Keys.SUPPLIER_TYPE_ID,
    params.supplier_type_id || ''
  )
  createSuppliersRequest.addParam(
    CreateSuppliersRequest.Keys.CURRENCY_UNIT_ID,
    params.currency_unit_id || ''
  )
  createSuppliersRequest.addParam(
    CreateSuppliersRequest.Keys.SUPPLIER_TAX,
    params.supplier_tax
  )
  const param = createSuppliersRequest.getParams()
  const headers = {}
  return post(urls.SUPPLIERS, param, headers)
}


export function getAllSuppliersType() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_SUPPLIER_TYPE_ALL, param, headers)
}

export function getAllCurrencyUnit() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_CURRENCY_UNIT_ALL, param, headers)
}

export function getAllSurfaceType() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_SURFACE_TYPE, param, headers)
}

export function getAllAdhesiveType() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_ADHESIVE_TYPE, param, headers)
}

export function getAllBaseType() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_BASE_TYPE, param, headers)
}

export function getAllBondingEnv() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_BONDING_ENV, param, headers)
}

export function getAllSurfaceMaterial() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_SURFACE_MATERIAL, param, headers)
}

export function getAllPrinter() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_PRINTER, param, headers)
}

export function getAllNotSuitableFor() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_NOT_SUITABLE_FOR, param, headers)
}

export function deleteSupplier(id) {
  const headers = {}
  const deleteSupplierRequest = new DeleteSupplierRequest()
  deleteSupplierRequest.addParam(DeleteSupplierRequest.Keys.PRODUCTS_ID, id)
  const params = deleteSupplierRequest.getParams()
  return _delete(urls.DELETE_SUPPLIER, params, headers)
}

export function deleteProductGroup(id) {
  const headers = {}
  const deleteProductGroupRequest = new DeleteProductGroupRequest()
  deleteProductGroupRequest.addParam(DeleteProductGroupRequest.Keys.PRODUCTS_ID, id)
  const params = deleteProductGroupRequest.getParams()
  return _delete(urls.DELETE_PRODUCT_GROUP, params, headers)
}

export function createProductGroups(params) {
  const createProductGroupsRequest = new CreateProductGroupsRequest()
  createProductGroupsRequest.addParam(
    CreateProductGroupsRequest.Keys.PRODUCT_GROUP_NAME,
    params.product_group_name || ''
  )
  const param = createProductGroupsRequest.getParams()
  const headers = {}
  return post(urls.PRODUCT_GROUPS, param, headers)
}

export function getDetailProductGroup(id) {
  const headers = {}
  const getDetailProductGroupRequest = new GetDetailProductGroupRequest()
  getDetailProductGroupRequest.addParam(GetDetailProductGroupRequest.Keys.PRODUCT_DETAIL_ID, id)
  const params = getDetailProductGroupRequest.getParams()
  return get(urls.DETAIL_PRODUCT_GROUPS, params, headers)
}
export function updateProductGroups(params) {
  const updateProductGroupsRequest = new UpdateProductGroupsRequest()
  updateProductGroupsRequest.addParam(UpdateProductGroupsRequest.Keys.PRODUCT_DETAIL_ID, params.id || '')
  updateProductGroupsRequest.addParam(
    UpdateProductGroupsRequest.Keys.PRODUCT_GROUP_NAME,
    params.product_group_name || ''
  )
  const param = updateProductGroupsRequest.getParams()
  const headers = {}
  return put(urls.PRODUCT_GROUPS, param, headers)
}

export function updateSupplier(params) {
  const updateSuppliersRequest = new UpdateSuppliersRequest()
  updateSuppliersRequest.addParam(
    UpdateSuppliersRequest.Keys.DETAIL_SUPPLIER_ID,
    params.id || ''
  )
  updateSuppliersRequest.addParam(
    UpdateSuppliersRequest.Keys.SUPPLIER_NAME,
    params.supplier_name || ''
  )
  updateSuppliersRequest.addParam(
    UpdateSuppliersRequest.Keys.ABBREVIATION,
    params.abbreviation || ''
  )
  updateSuppliersRequest.addParam(
    UpdateSuppliersRequest.Keys.PERSON_IN_CHARGES,
    params.person_in_charge || ''
  )
  updateSuppliersRequest.addParam(
    UpdateSuppliersRequest.Keys.TAX_CODE,
    params.tax_code || ''
  )
  updateSuppliersRequest.addParam(
    UpdateSuppliersRequest.Keys.ADDRESS,
    params.address || ''
  )
  updateSuppliersRequest.addParam(
    UpdateSuppliersRequest.Keys.PHONE_NUMBER,
    params.phone_number || ''
  )
  updateSuppliersRequest.addParam(
    UpdateSuppliersRequest.Keys.USER_GMAIL,
    params.email || ''
  )
  updateSuppliersRequest.addParam(
    UpdateSuppliersRequest.Keys.SUPPLIER_TYPE_ID,
    params.supplier_type_id || ''
  )
  updateSuppliersRequest.addParam(
    UpdateSuppliersRequest.Keys.CURRENCY_UNIT_ID,
    params.currency_unit_id || ''
  )
  updateSuppliersRequest.addParam(
    CreateSuppliersRequest.Keys.SUPPLIER_TAX,
    params.supplier_tax
  )
  const param = updateSuppliersRequest.getParams()
  const headers = {}
  return put(urls.SUPPLIERS, param, headers)
}
