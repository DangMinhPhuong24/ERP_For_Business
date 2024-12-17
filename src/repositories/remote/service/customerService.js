import urls from '../urls'
import { post, get, _delete, put } from '../network'
import GetListCustomerRequest from '../request/customer/GetListCustomerRequest'
import DeleteCustomerRequest from '../request/customer/DeleteCustomerRequest'
import CreateCustomerPreviewRequest from '../request/customer/CreateCustomerPreviewRequest'
import GetDetailCustomerRequest from '../request/customer/GetDetailCustomerRequest'
import UpdateCustomerRequest from '../request/customer/UpdateCustomerRequest'
import GetListQuotationCustomerRequest from '../request/customer/GetListQuotationCustomerRequest'
import GetListQuotationHistoriesByCustomerIdRequest from '../request/customer/GetListQuotationHistoriesByCustomerIdRequest'

import CreateClaimRequest from '../request/customer/CreateClaimRequest'
import CreateQuotationRequest from '../request/customer/CreateQuotationRequest'
import CreateOderRequest from '../request/oder/CreateOderRequest'
import GetListOrderByCustomerRequest from '../request/customer/GetListOrderByCustomerRequest'
import GetListClaimHistoriesByCustomerIdRequest from '../request/customer/GetListClaimHistoriesByCustomerIdRequest'
import DeleteClaimRequest from '../request/customer/DeleteClaimRequest'
import GetDetailClaimRequest from '../request/customer/GetDetailClaimRequest'
import UpdateClaimRequest from '../request/customer/UpdateClaimRequest'
import CreateOderPreviewRequest from '../request/oder/CreateOderPreviewRequest'
import GetDetailCustomerHandbookAllRequest from '../request/customer/GetDetailCustomerHandbookAllRequest'
import UpdateCustomerHandbookAllRequest from '../request/customer/UpdateCustomerHandbookAllRequest'
import GetListProposalDebtAgeByCustomerIdRequest from '../request/customer/GetListProposalDebtAgeByCustomerIdRequest'
import GetDetailQuotationHistoryRequest from '../request/customer/GetDetailQuotationHistoryRequest'
import DeleteProposalDebtAgeRequest from '../request/customer/DeleteProposalDebtAgeRequest'
import UpdateProposalDebtAgeRequest from '../request/customer/UpdateProposalDebtAgeRequest'
import DeleteQuotationHistoryRequest from '../request/customer/DeleteQuotationHistoryRequest'
import UpdateQuotationRequest from '../request/customer/UpdateQuotationRequest'
import GetListDeviceMachinesRequest from '../request/customer/GetListDeviceMachinesRequest'
import CreateCustomerRequest from '../request/customer/CreateCustomerRequest'
import GetListConsultationHistoryRequest from '../request/customer/GetListConsultationHistoryRequest'
import CreateConsultationHistoryRequest from '../request/customer/CreateConsultationHistoryRequest'
import GetDetailConsultationHistoryRequest from '../request/customer/GetDetailConsultationHistoryRequest'
import UpdateConsultationHistoryRequest from '../request/customer/UpdateConsultationHistoryRequest'
import DeleteConsultationHistoryRequest from '../request/customer/DeleteConsultationHistoryRequest'
import UpdateOderRequest from '../request/oder/UpdateOderRequest'
import UpdateOderPreviewRequest from '../request/oder/UpdateOderPreviewRequest'

export function getListCustomer(params) {
  let param = null
  if (params) {
    const getListCustomerRequest = new GetListCustomerRequest()
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.PAGE, params.page || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.SORT_BY, params.sort_by || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.CUSTOMER_NAME, params.customer_name || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.COMPANY_NAME, params.company_name || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.PHONE_NUMBER, params.phone_number || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.DEBT_GROUP_ID, params.debt_group_id || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.DEBT_AGE_ID, params.debt_age_id || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.PROVINCE_ID_SEARCH_CONDITION, params.province_id || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.DISTRICT_ID_SEARCH_CONDITION, params.district_id || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.WARD_ID_SEARCH_CONDITION, params.ward_id || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.TYPE, params.type || '')
    getListCustomerRequest.addArrayParams(
      GetListCustomerRequest.Keys.CUSTOMER_RANK_IDS,
      'customer_rank_ids',
      params.customer_rank_ids || []
    )
    getListCustomerRequest.addArrayParams(
      GetListCustomerRequest.Keys.COMPANY_TYPE_IDS,
      'company_type_ids',
      params.company_type_ids || []
    )
    getListCustomerRequest.addArrayParams(
      GetListCustomerRequest.Keys.PRODUCT_APPLICATION_IDS,
      'product_application_ids',
      params.product_application_ids || []
    )
    getListCustomerRequest.addArrayParams(
      GetListCustomerRequest.Keys.INDUSTRY_GROUP_IDS,
      'industry_group_ids',
      params.industry_group_ids || []
    )
    param = getListCustomerRequest.getParams()
  }

  const headers = {}
  return get(urls.GET_LIST_CUSTOMER, param, headers)
}

export function createCustomerPreview(params) {
  const createCustomerPreviewRequest = new CreateCustomerPreviewRequest()
  createCustomerPreviewRequest.addParam(CreateCustomerPreviewRequest.Keys.ADDRESSES, params.addresses || '')
  createCustomerPreviewRequest.addParam(CreateCustomerPreviewRequest.Keys.CUSTOMER_NAME, params.customer_name || '')
  createCustomerPreviewRequest.addParam(CreateCustomerPreviewRequest.Keys.COMPANY_NAME, params.company_name || '')
  createCustomerPreviewRequest.addParam(CreateCustomerPreviewRequest.Keys.PHONE_NUMBER, params.phone_number || '')
  createCustomerPreviewRequest.addParam(CreateCustomerPreviewRequest.Keys.DEBT_AGE_ID, params.debtAge || '')
  createCustomerPreviewRequest.addParam(CreateCustomerPreviewRequest.Keys.DEBT_LIMIT, parseInt(params.debt_limit) || '')
  createCustomerPreviewRequest.addParam(CreateCustomerPreviewRequest.Keys.SALE_IN_CHANGE, params.user_ids || '')
  createCustomerPreviewRequest.addParam(CreateCustomerPreviewRequest.Keys.ZALO_NUMBER, params.zalo_number || '')
  createCustomerPreviewRequest.addParam(
    CreateCustomerPreviewRequest.Keys.ADDRESS_BRANCHES,
    params.address_branches || ''
  )
  createCustomerPreviewRequest.addParam(
    CreateCustomerPreviewRequest.Keys.ADDRESS_FACTORIES,
    params.address_factories || ''
  )
  createCustomerPreviewRequest.addParam(CreateCustomerPreviewRequest.Keys.ADDRESS_OFFICES, params.address_offices || '')
  const paramRequest = createCustomerPreviewRequest.getParams()
  const headers = {}
  return post(urls.CREATE_CUSTOMER_PREVIEW, paramRequest, headers)
}

export function createQuotationCustomer(params) {
  const createQuotationRequest = new CreateQuotationRequest()
  createQuotationRequest.addParam(CreateQuotationRequest.Keys.QUOTATION_CUSTOMER_ID, params.customer_id || '')
  createQuotationRequest.addParam(CreateQuotationRequest.Keys.EFFECTIVE_DATE, params.effective_date || '')
  createQuotationRequest.addParam(CreateQuotationRequest.Keys.FILE_PATH, params.file_path || '')
  createQuotationRequest.addParam(CreateQuotationRequest.Keys.PRODUCT_MANAGEMENTS, params.product_managements || '')
  createQuotationRequest.addParam(CreateQuotationRequest.Keys.REASON, params.reason || '')
  const paramRequest = createQuotationRequest.getParams()
  const headers = {}
  return post(urls.CREATE_QUOTATION, paramRequest, headers)
}

export function createQuotationCustomerPreview(params) {
  const createQuotationRequest = new CreateQuotationRequest()
  createQuotationRequest.addParam(CreateQuotationRequest.Keys.QUOTATION_CUSTOMER_ID, params.customer_id || '')
  createQuotationRequest.addParam(CreateQuotationRequest.Keys.EFFECTIVE_DATE, params.effective_date || '')
  createQuotationRequest.addParam(CreateQuotationRequest.Keys.PRODUCT_MANAGEMENTS, params.product_managements || '')
  const paramRequest = createQuotationRequest.getParams()
  const headers = {}
  return post(urls.CREATE_QUOTATION_PREVIEW, paramRequest, headers)
}

export function deleteCustomer(customerId) {
  const headers = {}
  const deleteCustomerRequest = new DeleteCustomerRequest()
  deleteCustomerRequest.addParam(DeleteCustomerRequest.Keys.CUSTOMER_ID, customerId)
  const params = deleteCustomerRequest.getParams()
  return _delete(urls.DELETE_DATA_CUSTOMER, params, headers)
}

export function getCustomerInformation(params) {
  const getDetailCustomerRequest = new GetDetailCustomerRequest()
  getDetailCustomerRequest.addParam(GetDetailCustomerRequest.Keys.CUSTOMER_ID, params.id)
  getDetailCustomerRequest.addParam(GetDetailCustomerRequest.Keys.FROM_DATE, params.from_date || '')
  getDetailCustomerRequest.addParam(GetDetailCustomerRequest.Keys.TO_DATE, params.to_date || '')
  const param = getDetailCustomerRequest.getParams()
  const headers = {}
  return get(urls.GET_CUSTOMER_INFORMATION, param, headers)
}

export function updateCustomer(params) {
  const updateCustomerRequest = new UpdateCustomerRequest()
  updateCustomerRequest.addParam(UpdateCustomerRequest.Keys.CUSTOMER_ID, params.id)
  updateCustomerRequest.addParam(UpdateCustomerRequest.Keys.CUSTOMER_NAME, params.customer_name || '')
  updateCustomerRequest.addParam(UpdateCustomerRequest.Keys.COMPANY_NAME, params.company_name || '')
  updateCustomerRequest.addParam(UpdateCustomerRequest.Keys.PHONE_NUMBER, params.phone_number || '')
  updateCustomerRequest.addParam(UpdateCustomerRequest.Keys.ZALO_NUMBER, params.zalo_number || '')
  updateCustomerRequest.addParam(UpdateCustomerRequest.Keys.DEBT_LIMIT, parseInt(params.debt_limit) || '')
  updateCustomerRequest.addParam(UpdateCustomerRequest.Keys.DEBT_AGE_ID, params.debt_age_id || '')
  updateCustomerRequest.addParam(UpdateCustomerRequest.Keys.ADDRESS_BRANCHES, params.address_branches || '')
  updateCustomerRequest.addParam(UpdateCustomerRequest.Keys.ADDRESS_OFFICES, params.address_offices || '')
  updateCustomerRequest.addParam(UpdateCustomerRequest.Keys.ADDRESS_FACTORIES, params.address_factories || '')
  let user_ids = ''
  if (params.user_ids.length > 0) {
    user_ids = params.user_ids
  }
  updateCustomerRequest.addParam(UpdateCustomerRequest.Keys.SALE_IN_CHANGE, user_ids || '')
  updateCustomerRequest.addParam(UpdateCustomerRequest.Keys.ADDRESSES, params.addresses || '')
  const paramRequest = updateCustomerRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_CUSTOMER, paramRequest, headers)
}

export function exportDataCustomerToExcel(params) {
  let param = null
  if (params) {
    const getListCustomerRequest = new GetListCustomerRequest()
    // eslint-disable-next-line no-use-before-define
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.PAGE, params.page || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.SORT_BY, params.sort_by || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.CUSTOMER_NAME, params.customer_name || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.COMPANY_NAME, params.company_name || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.PHONE_NUMBER, params.phone_number || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.DEBT_GROUP_ID, params.debt_group_id || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.DEBT_AGE_ID, params.debt_age_id || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.PROVINCE_ID_SEARCH_CONDITION, params.province_id || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.DISTRICT_ID_SEARCH_CONDITION, params.district_id || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.WARD_ID_SEARCH_CONDITION, params.ward_id || '')
    getListCustomerRequest.addParam(GetListCustomerRequest.Keys.TYPE, params.type || '')
    getListCustomerRequest.addArrayParams(
      GetListCustomerRequest.Keys.CUSTOMER_RANK_IDS,
      'customer_rank_ids',
      params.customer_rank_ids || []
    )
    getListCustomerRequest.addArrayParams(
      GetListCustomerRequest.Keys.COMPANY_TYPE_IDS,
      'company_type_ids',
      params.company_type_ids || []
    )
    getListCustomerRequest.addArrayParams(
      GetListCustomerRequest.Keys.PRODUCT_APPLICATION_IDS,
      'product_application_ids',
      params.product_application_ids || []
    )
    getListCustomerRequest.addArrayParams(
      GetListCustomerRequest.Keys.INDUSTRY_GROUP_IDS,
      'industry_group_ids',
      params.industry_group_ids || []
    )
    param = getListCustomerRequest.getParams()
  }
  const headers = {}
  return get(urls.EXPORT_EXCEL_DATA_CUSTOMER, param, headers)
}

export function getListAllCustomer() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_CUSTOMER_ALL, param, headers)
}

export function getListAllPayment() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_PAYMENT_ALL, param, headers)
}

export function getListAllDeliveryShift() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_DELIVERY_SHIFT_ALL, param, headers)
}

export function getListAllFinishedProductForm() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_FINISHED_PRODUCT_FORM_ALL, param, headers)
}

export function getListAllProductForm() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_PRODUCT_FORM_ALL, param, headers)
}

export function getListAllTag() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_TAG_ALL, param, headers)
}

export function createClaim(params) {
  let param = null
  const createClaimRequest = new CreateClaimRequest()
  createClaimRequest.addParam(CreateClaimRequest.Keys.CUSTOMER_ID, params.customerId || '')
  createClaimRequest.addParam(CreateClaimRequest.Keys.DESCRIPTION, params.description || '')
  createClaimRequest.addParam(CreateClaimRequest.Keys.CLAIM_PROBLEM_ID, params.claim_problem_id || '')
  let departmentsId = ''
  if (params.departmentsId.length > 0) {
    departmentsId = params.departmentsId
  }
  createClaimRequest.addParam(CreateClaimRequest.Keys.DEPARTMENTS_ID, departmentsId || '')
  let imageVideos = ''
  if (params.imageVideos.length > 0) {
    imageVideos = params.imageVideos
  }
  createClaimRequest.addParam(CreateClaimRequest.Keys.IMAGE_VIDEOS, imageVideos || '')
  createClaimRequest.addParam(CreateClaimRequest.Keys.CAUSE, params.reason || '')
  createClaimRequest.addParam(CreateClaimRequest.Keys.SOLUTION, params.solution || '')
  createClaimRequest.addParam(CreateClaimRequest.Keys.CLAIM_STATUS_ID, params.statusId || '')
  const headers = {}
  param = createClaimRequest.getParams()
  return post(urls.CREATE_CLAIM, param, headers)
}

export function createOder(params) {
  let param = null
  const createOderRequest = new CreateOderRequest()
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_CUSTOMER_ID, params.customer_id || '')
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_ADDRESS_BRANCH_ID, params.address_branch_id || '')
  createOderRequest.addParam(CreateOderRequest.Keys.ORDER_ADDRESS_DELIVERY_ID, params.address_delivery_id || '')
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_PROVINCE_ID, params.province_id || '')
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_DISTRICT_ID, params.district_id || '')
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_WARD_ID, params.ward_id || '')
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_ADDRESS_DETAIL, params.detail || '')
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_PAYMENT_ID, params.payment_method_id || '')
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_DELEVERY_DATE, params.delivery_date || '')
  createOderRequest.addParam(CreateOderRequest.Keys.DELIVERY_TIME, params.delivery_time || '')
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_DELEVERY_SHIFT_ID, params.delivery_shift_id || '')
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_PRODUCT_ITEMS, params.product_items || 1)
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_AMOUNT, params.amount || '')
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_DELIVERY_CHARGE, params.delivery_charges || 0)
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_DISCOUNT, params.discount || 0)
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_TAX_TYPE, params.tax_type || '')
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_TAX_AMOUNT, params.tax_amount || '')
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_TOTAL_COST, params.total_cost || '')
  let tagsId = ''
  if (params.tag_ids.length > 0) {
    tagsId = params.tag_ids
  }
  createOderRequest.addParam(CreateOderRequest.Keys.DESCRIPTION, params.description || '')
  createOderRequest.addParam(CreateOderRequest.Keys.INTERNAL_DESCRIPTION, params.internal_description || '')
  createOderRequest.addParam(CreateOderRequest.Keys.ODER_TAG_ID, tagsId)
  createOderRequest.addParam(CreateOderRequest.Keys.TAX_PERCENT, params.tax_percent || '')
  createOderRequest.addParam(CreateOderRequest.Keys.MANUFACTURE_ORDER_PRODUCT_WAREHOUSE, params.manufacture_order_product_warehouse || '')
  createOderRequest.addArrayParamsPropertyKeys(
    CreateOderRequest.Keys.MANUFACTURE_ORDER_PRODUCT_WAREHOUSE,
    'manufacture_order_product_warehouse',
    params.manufacture_order_product_warehouse || [],
    [ 'product_warehouse_id', 'manufacture_form_id', 'quantity', 'width', 'length', 'scrap']
  );
  const headers = {}
  param = createOderRequest.getParams()
  return post(urls.CREATE_AT_ODER, param, headers)
}

export function updateOder(params) {
  let param = null
  const updateOderRequest = new UpdateOderRequest()
  updateOderRequest.addParam(UpdateOderRequest.Keys.ORDER_ID, params.id || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_CUSTOMER_ID, params.customer_id || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_ADDRESS_BRANCH_ID, params.address_branch_id || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ORDER_ADDRESS_DELIVERY_ID, params.address_delivery_id || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_PROVINCE_ID, params.province_id || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_DISTRICT_ID, params.district_id || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_WARD_ID, params.ward_id || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_ADDRESS_DETAIL, params.detail || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_PAYMENT_ID, params.payment_method_id || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_DELEVERY_DATE, params.delivery_date || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.DELIVERY_TIME, params.delivery_time || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_DELEVERY_SHIFT_ID, params.delivery_shift_id || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_PRODUCT_ITEMS, params.product_items || 1)
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_AMOUNT, params.amount || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_DELIVERY_CHARGE, params.delivery_charges || 0)
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_DISCOUNT, params.discount || 0)
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_TAX_TYPE, params.tax_type || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_TAX_AMOUNT, params.tax_amount || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_TOTAL_COST, params.total_cost || '')
  let tagsId = ''
  if (params.tag_ids.length > 0) {
    tagsId = params.tag_ids
  }
  updateOderRequest.addParam(UpdateOderRequest.Keys.DESCRIPTION, params.description || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.INTERNAL_DESCRIPTION, params.internal_description || '')
  updateOderRequest.addParam(UpdateOderRequest.Keys.ODER_TAG_ID, tagsId)
  updateOderRequest.addParam(UpdateOderRequest.Keys.TAX_PERCENT, params.tax_percent || '')
  const headers = {}
  param = updateOderRequest.getParams()
  return put(urls.UPDATE_AT_ODER, param, headers)
}

export function getListQuotation(params) {
  let param = null
  if (params) {
    const getListQuotationCustomerRequest = new GetListQuotationCustomerRequest()
    getListQuotationCustomerRequest.addParam(
      GetListQuotationCustomerRequest.Keys.QUOTATION_CUSTOMER_ID,
      params.customer_id || ''
    )
    getListQuotationCustomerRequest.addParam(
      GetListQuotationCustomerRequest.Keys.SEARCH_PRODUCT_MANAGEMENT,
      params.search_product_management || ''
    )
    getListQuotationCustomerRequest.addParam(GetListQuotationCustomerRequest.Keys.SORT_BY, params.sort_by || '')
    param = getListQuotationCustomerRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_ALL_PRODUCT_MANAGEMENT_TO_CREATE_QUOTATION_FOR_CUSTOMER, param, headers)
}

export function getListQuotationHistoriesByCustomerId(params) {
  let param = null
  if (params) {
    const getListQuotationHistoriesByCustomerIdRequest = new GetListQuotationHistoriesByCustomerIdRequest()
    getListQuotationHistoriesByCustomerIdRequest.addParam(
      GetListQuotationHistoriesByCustomerIdRequest.Keys.PAGE,
      params.page || ''
    )
    getListQuotationHistoriesByCustomerIdRequest.addParam(
      GetListQuotationHistoriesByCustomerIdRequest.Keys.CUSTOMER_ID,
      params.customerId || ''
    )
    getListQuotationHistoriesByCustomerIdRequest.addParam(
      GetListQuotationHistoriesByCustomerIdRequest.Keys.FROM_DATE,
      params.from_date || ''
    )
    getListQuotationHistoriesByCustomerIdRequest.addParam(
      GetListQuotationHistoriesByCustomerIdRequest.Keys.TO_DATE,
      params.to_date || ''
    )
    param = getListQuotationHistoriesByCustomerIdRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_QUOTATION_HISTORY, param, headers)
}

export function getListOrderByCustomer(params) {
  let param = null
  if (params) {
    const getListOrderByCustomerRequest = new GetListOrderByCustomerRequest()
    getListOrderByCustomerRequest.addParam(GetListOrderByCustomerRequest.Keys.PAGE, params.page || '')
    getListOrderByCustomerRequest.addParam(GetListOrderByCustomerRequest.Keys.SORT_BY, params.sort_by || '')
    getListOrderByCustomerRequest.addParam(
      GetListOrderByCustomerRequest.Keys.ODER_CUSTOMER_ID,
      params.customer_id || ''
    )
    getListOrderByCustomerRequest.addParam(GetListOrderByCustomerRequest.Keys.FROM_DATE, params.from_date || '')
    getListOrderByCustomerRequest.addParam(GetListOrderByCustomerRequest.Keys.TO_DATE, params.to_date || '')
    getListOrderByCustomerRequest.addParam(
      GetListOrderByCustomerRequest.Keys.ORDER_STATUS,
      params.order_status_id || ''
    )
    getListOrderByCustomerRequest.addParam(GetListOrderByCustomerRequest.Keys.ODER_TOTAL_COST, params.total_cost || '')
    getListOrderByCustomerRequest.addParam(
      GetListOrderByCustomerRequest.Keys.TOTAL_COST_GREATER_THAN_EQUAL,
      params.total_cost_greater_than_equal || ''
    )
    getListOrderByCustomerRequest.addParam(
      GetListOrderByCustomerRequest.Keys.TOTAL_COST_LESS_THAN_EQUAL,
      params.total_cost_less_than_equal || ''
    )
    param = getListOrderByCustomerRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_ORDER_BY_CUSTOMER, param, headers)
}

export function getListAllStatusOrderByCustomer() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_STATUS_ORDER_BY_CUSTOMER, param, headers)
}
export function getAllClaimStatus() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_CLAIM_STATUS, param, headers)
}

export function getListClaimHistoriesByCustomerId(params) {
  let param = null
  if (params) {
    const getListClaimHistoriesByCustomerIdRequest = new GetListClaimHistoriesByCustomerIdRequest()
    getListClaimHistoriesByCustomerIdRequest.addParam(
      GetListClaimHistoriesByCustomerIdRequest.Keys.PAGE,
      params.page || ''
    )
    getListClaimHistoriesByCustomerIdRequest.addParam(
      GetListClaimHistoriesByCustomerIdRequest.Keys.CUSTOMER_ID,
      params.customerId || ''
    )
    getListClaimHistoriesByCustomerIdRequest.addParam(
      GetListClaimHistoriesByCustomerIdRequest.Keys.CLAIM_STATUS_ID,
      params.claimStatusId || ''
    )
    getListClaimHistoriesByCustomerIdRequest.addParam(
      GetListClaimHistoriesByCustomerIdRequest.Keys.FROM_DATE,
      params.from_date || ''
    )
    getListClaimHistoriesByCustomerIdRequest.addParam(
      GetListClaimHistoriesByCustomerIdRequest.Keys.TO_DATE,
      params.to_date || ''
    )
    param = getListClaimHistoriesByCustomerIdRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_CLAIMS_BY_CUSTOMER_ID, param, headers)
}
export function deleteClaim(claimId) {
  const headers = {}
  const deleteClaimRequest = new DeleteClaimRequest()
  deleteClaimRequest.addParam(DeleteClaimRequest.Keys.CLAIM_ID, claimId)
  const params = deleteClaimRequest.getParams()
  return _delete(urls.DELETE_CLAIM, params, headers)
}

export function getClaimInformation(claimId) {
  const getDetailClaimRequest = new GetDetailClaimRequest()
  getDetailClaimRequest.addParam(GetDetailClaimRequest.Keys.CLAIM_ID, claimId)
  const param = getDetailClaimRequest.getParams()
  const headers = {}
  return get(urls.GET_CLAIM_INFO, param, headers)
}
export function updateClaim(params) {
  const updateClaimRequest = new UpdateClaimRequest()
  updateClaimRequest.addParam(UpdateClaimRequest.Keys.CLAIM_ID, params.id || '')
  updateClaimRequest.addParam(UpdateClaimRequest.Keys.CLAIM_CUSTOMER_ID, params.customerId || '')
  updateClaimRequest.addParam(UpdateClaimRequest.Keys.DESCRIPTION, params.description || '')
  let departmentsId = ''
  if (params.departmentsId.length > 0) {
    departmentsId = params.departmentsId
  }
  updateClaimRequest.addParam(UpdateClaimRequest.Keys.DEPARTMENTS_ID, departmentsId || '')
  let imageVideos = ''
  if (params.imageVideos.length > 0) {
    imageVideos = params.imageVideos
  }
  updateClaimRequest.addParam(UpdateClaimRequest.Keys.IMAGE_VIDEOS, imageVideos || '')
  updateClaimRequest.addParam(UpdateClaimRequest.Keys.CLAIM_PROBLEM_ID, params.claim_problem_id || '')
  updateClaimRequest.addParam(UpdateClaimRequest.Keys.CAUSE, params.reason || '')
  updateClaimRequest.addParam(UpdateClaimRequest.Keys.SOLUTION, params.solution || '')
  updateClaimRequest.addParam(UpdateClaimRequest.Keys.CLAIM_STATUS_ID, params.statusId || '')
  const paramRequest = updateClaimRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_CLAIM_INFO, paramRequest, headers)
}

export function createOderPreview(params) {
  let param = null
  const createOderPreviewRequest = new CreateOderPreviewRequest()
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_CUSTOMER_ID, params.customer_id || '')
  createOderPreviewRequest.addParam(
    CreateOderPreviewRequest.Keys.ODER_ADDRESS_BRANCH_ID,
    params.address_branch_id || ''
  )
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_ADDRESS_ID, params.address_id || '')
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_PROVINCE_ID, params.province_id || '')
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_DISTRICT_ID, params.district_id || '')
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_WARD_ID, params.ward_id || '')
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_ADDRESS_DETAIL, params.detail || '')
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_PAYMENT_ID, params.payment_method_id || '')
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_DELEVERY_DATE, params.delivery_date || '')
  createOderPreviewRequest.addParam(
    CreateOderPreviewRequest.Keys.ODER_DELEVERY_SHIFT_ID,
    params.delivery_shift_id || ''
  )
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_PRODUCT_ITEMS, params.product_items || 1)
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_AMOUNT, params.amount || '')
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_DELIVERY_CHARGE, params.delivery_charges || 0)
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_DISCOUNT, params.discount || 0)
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_TAX_TYPE, params.tax_type || '')
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_TAX_AMOUNT, params.tax_amount || '')
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_TOTAL_COST, params.total_cost || '')
  let tagsId = ''
  if (params.tag_ids.length > 0) {
    tagsId = params.tag_ids
  }
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.DESCRIPTION, params.description || '')
  createOderPreviewRequest.addParam(CreateOderPreviewRequest.Keys.ODER_TAG_ID, tagsId)
  const headers = {}
  param = createOderPreviewRequest.getParams()
  return post(urls.CREATE_ORDER_PREVIEW, param, headers)
}

export function updateOderPreview(params) {
  let param = null
  const updateOderPreviewRequest = new UpdateOderPreviewRequest()
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_PREVIEW_ID, params.id || '')
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_CUSTOMER_ID, params.customer_id || '')
  updateOderPreviewRequest.addParam(
    UpdateOderPreviewRequest.Keys.ODER_ADDRESS_BRANCH_ID,
    params.address_branch_id || ''
  )
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_ADDRESS_ID, params.address_id || '')
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_PROVINCE_ID, params.province_id || '')
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_DISTRICT_ID, params.district_id || '')
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_WARD_ID, params.ward_id || '')
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_ADDRESS_DETAIL, params.detail || '')
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_PAYMENT_ID, params.payment_method_id || '')
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_DELEVERY_DATE, params.delivery_date || '')
  updateOderPreviewRequest.addParam(
    UpdateOderPreviewRequest.Keys.ODER_DELEVERY_SHIFT_ID,
    params.delivery_shift_id || ''
  )
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_PRODUCT_ITEMS, params.product_items || 1)
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_AMOUNT, params.amount || '')
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_DELIVERY_CHARGE, params.delivery_charges || 0)
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_DISCOUNT, params.discount || 0)
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_TAX_TYPE, params.tax_type || '')
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_TAX_AMOUNT, params.tax_amount || '')
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_TOTAL_COST, params.total_cost || '')
  let tagsId = ''
  if (params.tag_ids.length > 0) {
    tagsId = params.tag_ids
  }
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.DESCRIPTION, params.description || '')
  updateOderPreviewRequest.addParam(UpdateOderPreviewRequest.Keys.ODER_TAG_ID, tagsId)
  const headers = {}
  param = updateOderPreviewRequest.getParams()
  return put(urls.UPDATE_ORDER_PREVIEW, param, headers)
}

export function getDetailCustomerHandbookAll(params) {
  const getDetailCustomerHandbookAllRequest = new GetDetailCustomerHandbookAllRequest()
  getDetailCustomerHandbookAllRequest.addParam(
    GetDetailCustomerHandbookAllRequest.Keys.HANDBOOK_CUSTOMER_ID,
    params.customer_id
  )
  getDetailCustomerHandbookAllRequest.addParam(
    GetDetailCustomerHandbookAllRequest.Keys.FROM_DATE,
    params.from_date || ''
  )
  getDetailCustomerHandbookAllRequest.addParam(GetDetailCustomerHandbookAllRequest.Keys.TO_DATE, params.to_date || '')
  const param = getDetailCustomerHandbookAllRequest.getParams()
  const headers = {}
  return get(urls.GET_CUSTOMER_HANDBOOK_ALL, param, headers)
}

export function updateCustomerHandbookAll(params) {
  const updateCustomerHandbookAllRequest = new UpdateCustomerHandbookAllRequest()
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.HANDBOOK_CUSTOMER_ID,
    params.customer_id || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.WEBSITE_ADDRESS,
    params.website_address || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.FANPAGE_ADDRESS,
    params.fanpage_address || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.OFFICE_ADDRESS,
    params.office_address || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.ENTERPRISE_ESTABLISHMENT_DATE,
    params.enterprise_establishment_date || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.CUSTOMER_CONTACTS,
    params.customer_contacts || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.PRODUCT_GROUP_ID,
    params.product_group || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.FREQUENCY_PURCHASE_MONTHLY,
    params.frequency_purchase_monthly || ''
  )
  let image_handbooks = []
  if (params.image_handbooks.length > 0) {
    image_handbooks = params.image_handbooks
  }
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.IMAGE_HANDBOOKS,
    image_handbooks || ''
  )
  let industry_group = ''
  if (params.industry_group_ids.length > 0) {
    industry_group = params.industry_group_ids
  }
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.INDUSTRY_GROUP_ID,
    industry_group || ''
  )
  updateCustomerHandbookAllRequest.addParam(UpdateCustomerHandbookAllRequest.Keys.REGION, params.region || '')
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.PRODUCT_SUBSTITUTABILITY_ID,
    params.product_substitutability_id || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.ORDER_PLAN_HANDBOOK_ID,
    params.order_plan_handbook_id || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.QUALITY_REQUIRE_ID,
    params.quality_require_id || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.PRODUCT_APPLICATION_ID,
    params.product_application_ids || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.FREQUENCY_COMPANY_VISIT_ID,
    params.frequency_company_visit_id || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.ENTERPRISE_BIRTHDAY,
    params.enterprise_birthday || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.INCENTIVE_POLICY_ID,
    params.incentive_policy_id || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.DISCOUNT_POLICY,
    params.discount_policy || ''
  )
  updateCustomerHandbookAllRequest.addParam(UpdateCustomerHandbookAllRequest.Keys.PERSONALITY, params.personality || '')
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.SPECIAL_NOTE,
    params.special_note || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.CONSULTATION_HISTORIES,
    params.consultation_histories || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.DEVICE_MACHINES,
    params.device_machines || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.ADDRESS_DELIVERIES,
    params.address_deliveries || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.FACTORY_SCALE_ID,
    params.factory_scale_id || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.PERSONNEL_SACELE_ID,
    params.personnel_scale_id || ''
  )
  updateCustomerHandbookAllRequest.addParam(
    UpdateCustomerHandbookAllRequest.Keys.COMPANY_TYPE_ID,
    params.company_type_id || ''
  )
  const paramRequest = updateCustomerHandbookAllRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_HANDBOOK_ALL, paramRequest, headers)
}
export function getAllProductSubstitutability() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_PRODUCT_SUBSTITUTABILITY, param, headers)
}
export function getAllIndustryGroup() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_INDUSTRY_GROUP, param, headers)
}

export function getListProposalDebtAgeByCustomerId(params) {
  const getListProposalDebtAgeByCustomerIdRequest = new GetListProposalDebtAgeByCustomerIdRequest()
  getListProposalDebtAgeByCustomerIdRequest.addParam(
    GetListProposalDebtAgeByCustomerIdRequest.Keys.PAGE,
    params.page || ''
  )
  getListProposalDebtAgeByCustomerIdRequest.addParam(
    GetListProposalDebtAgeByCustomerIdRequest.Keys.DEBT_AGE_CUSTOMER_ID,
    params.customerId || ''
  )
  getListProposalDebtAgeByCustomerIdRequest.addParam(
    GetListProposalDebtAgeByCustomerIdRequest.Keys.FROM_DATE,
    params.from_date || ''
  )
  getListProposalDebtAgeByCustomerIdRequest.addParam(
    GetListProposalDebtAgeByCustomerIdRequest.Keys.TO_DATE,
    params.to_date || ''
  )
  getListProposalDebtAgeByCustomerIdRequest.addParam(
    GetListProposalDebtAgeByCustomerIdRequest.Keys.PROPOSAL_STATUS_ID,
    params.proposal_status_id || ''
  )
  getListProposalDebtAgeByCustomerIdRequest.addParam(
    GetListProposalDebtAgeByCustomerIdRequest.Keys.SORT_BY,
    params.sort_by || ''
  )
  const param = getListProposalDebtAgeByCustomerIdRequest.getParams()
  const headers = {}
  return get(urls.GET_LIST_PROPOSAL_DEBT_AGE_BY_CUSTOMER_ID, param, headers)
}

export function getAllClaimProblem() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_CLAIM_PROBLEM, param, headers)
}

export function getDetailQuotationHistory(params) {
  let param = null
  if (params) {
    const getDetailQuotationHistory = new GetDetailQuotationHistoryRequest()
    getDetailQuotationHistory.addParam(GetDetailQuotationHistoryRequest.Keys.QUOTATION_HISTORY_ID, params.id || '')
    param = getDetailQuotationHistory.getParams()
  }
  const headers = {}
  return get(urls.GET_DETAIL_QUOTATION_HISTORY, param, headers)
}

export function deleteProposalDebtAge(proposalDebtAgeId) {
  const headers = {}
  const deleteProposalDebtAgeRequest = new DeleteProposalDebtAgeRequest()
  deleteProposalDebtAgeRequest.addParam(DeleteProposalDebtAgeRequest.Keys.PROPOSAL_DEBT_AGE_ID, proposalDebtAgeId)
  const params = deleteProposalDebtAgeRequest.getParams()
  return _delete(urls.DELETE_PROPOSAL_DEBT_AGE, params, headers)
}

export function updateProposalDebtAge(params) {
  let param = null
  if (params) {
    const updateProposalDebtAgeRequest = new UpdateProposalDebtAgeRequest()
    updateProposalDebtAgeRequest.addParam(UpdateProposalDebtAgeRequest.Keys.PROPOSAL_DEBT_AGE_ID, params.id || '')
    updateProposalDebtAgeRequest.addParam(UpdateProposalDebtAgeRequest.Keys.DEBT_AGE_ID, params.debt_age_id || '')
    param = updateProposalDebtAgeRequest.getParams()
  }
  const headers = {}
  return put(urls.UPDATE_PROPOSAL_DEBT_AGE, param, headers)
}

export function getAllProductType() {
  let param = null
  const headers = {}
  return get(urls.GET_PRODUCT_TYPE_ALL, param, headers)
}

export function deleteQuotationHistory(Id) {
  const headers = {}
  const deleteQuotationHistoryRequest = new DeleteQuotationHistoryRequest()
  deleteQuotationHistoryRequest.addParam(DeleteQuotationHistoryRequest.Keys.QUOTATION_HISTORY_ID, Id)
  const params = deleteQuotationHistoryRequest.getParams()
  return _delete(urls.DELETE_QUOTATION_HISTORY, params, headers)
}

export function updateQuotation(params) {
  let param = null
  if (params) {
    const updateQuotationRequest = new UpdateQuotationRequest()
    updateQuotationRequest.addParam(UpdateQuotationRequest.Keys.QUOTATION_ID, params.id || '')
    updateQuotationRequest.addParam(UpdateQuotationRequest.Keys.EFFECTIVE_DATE, params.effective_date || '')
    updateQuotationRequest.addParam(UpdateQuotationRequest.Keys.PRODUCT_MANAGEMENTS, params.product_managements || '')
    updateQuotationRequest.addParam(UpdateQuotationRequest.Keys.REASON, params.reason || '')
    param = updateQuotationRequest.getParams()
  }
  const headers = {}
  return put(urls.UPDATE_QUOTATION, param, headers)
}

export function updateQuotationPreview(params) {
  let param = null
  if (params) {
    const updateQuotationRequest = new UpdateQuotationRequest()
    updateQuotationRequest.addParam(UpdateQuotationRequest.Keys.QUOTATION_ID, params.id || '')
    updateQuotationRequest.addParam(UpdateQuotationRequest.Keys.EFFECTIVE_DATE, params.effective_date || '')
    updateQuotationRequest.addParam(UpdateQuotationRequest.Keys.PRODUCT_MANAGEMENTS, params.product_managements || '')
    param = updateQuotationRequest.getParams()
  }
  const headers = {}
  return put(urls.UPDATE_QUOTATION_PREVIEW, param, headers)
}

export function getAllPersonnelScale() {
  let param = null
  const headers = {}
  return get(urls.GET_PERSONNEL_SCALE_ALL, param, headers)
}

export function getAllFactoryScale() {
  let param = null
  const headers = {}
  return get(urls.GET_FACTORY_SCALE_ALL, param, headers)
}

export function getAllCompanyType() {
  let param = null
  const headers = {}
  return get(urls.GET_COMPANY_TYPE_ALL, param, headers)
}

export function getAllCustomerRank() {
  let param = null
  const headers = {}
  return get(urls.GET_CUSTOMER_RANK_ALL, param, headers)
}

//tab2
export function getAllOrderPlan() {
  let param = null
  const headers = {}
  return get(urls.GET_ORDER_PLAN_ALL, param, headers)
}

export function getAllQuanlityRequire() {
  let param = null
  const headers = {}
  return get(urls.GET_QUANLITY_REQUIRE_ALL, param, headers)
}

export function getAllProductApplication() {
  let param = null
  const headers = {}
  return get(urls.GET_PRODUCT_APPLICATION_ALL, param, headers)
}

//tab3
export function getAllFrequencyCompanyVisit() {
  let param = null
  const headers = {}
  return get(urls.GET_FREQUENCY_COMPANY_VISIT_ALL, param, headers)
}

export function getAllIncentivePolicy() {
  let param = null
  const headers = {}
  return get(urls.GET_INCENTIVE_POLICY_ALL, param, headers)
}

export function getListDeviceMachines(params) {
  const getListDeviceMachinesRequest = new GetListDeviceMachinesRequest()
  getListDeviceMachinesRequest.addParam(GetListDeviceMachinesRequest.Keys.PAGE, params.page || '')
  getListDeviceMachinesRequest.addParam(GetListDeviceMachinesRequest.Keys.ID_OF_CUSTOMER, params.customer_id || '')
  const param = getListDeviceMachinesRequest.getParams()
  const headers = {}
  return get(urls.GET_LIST_DEVICE_MACHINES, param, headers)
}

export function getAllConsultationHistoryProblem() {
  let param = null
  const headers = {}
  return get(urls.CONSULTATION_HISTORY_PROBLEM_ALL, param, headers)
}

export function createCustomer(params) {
  const createCustomerRequest = new CreateCustomerRequest()
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.ADDRESSES, params.addresses || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.CUSTOMER_NAME, params.customer_name || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.COMPANY_NAME, params.company_name || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.PHONE_NUMBER, params.phone_number || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.DEBT_AGE_ID, params.debtAge || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.DEBT_LIMIT, parseInt(params.debt_limit) || '')
  let user_ids = ''
  if (params.user_ids.length > 0) {
    user_ids = params.user_ids
  }
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.SALE_IN_CHANGE, user_ids || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.ZALO_NUMBER, params.zalo_number || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.WEBSITE_ADDRESS, params.website_address || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.FANPAGE_ADDRESS, params.fanpage_address || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.OFFICE_ADDRESS, params.office_address || '')
  createCustomerRequest.addParam(
    CreateCustomerRequest.Keys.ENTERPRISE_ESTABLISHMENT_DATE,
    params.enterprise_establishment_date || ''
  )
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.PERSONNEL_SACELE_ID, params.personnel_scale_id || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.FACTORY_SCALE_ID, params.factory_scale_id || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.COMPANY_TYPE_ID, params.company_type_id || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.CUSTOMER_CONTACTS, params.customer_contacts || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.ADDRESS_DELIVERIES, params.address_deliveries || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.ADDRESS_BRANCHES, params.address_branches || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.ADDRESS_FACTORIES, params.address_factories || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.ADDRESS_OFFICES, params.address_offices || '')
  let image_handbooks = ''
  if (params.image_handbooks.length > 0) {
    image_handbooks = params.image_handbooks
  }
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.IMAGE_HANDBOOKS, image_handbooks || '')
  let industry_group = ''
  if (params.industry_group_ids.length > 0) {
    industry_group = params.industry_group_ids
  }

  let product_application = ''
  if (params.product_application_ids.length > 0) {
    product_application = params.product_application_ids
  }
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.INDUSTRY_GROUP_ID, industry_group || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.REGION, params.region || '')
  createCustomerRequest.addParam(
    CreateCustomerRequest.Keys.PRODUCT_SUBSTITUTABILITY_ID,
    params.product_substitutability_id || ''
  )
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.ORDER_PLAN_HANDBOOK_ID, params.order_plan_handbook_id || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.QUALITY_REQUIRE_ID, params.quality_require_id || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.PRODUCT_APPLICATION_ID, product_application || '')
  createCustomerRequest.addParam(
    CreateCustomerRequest.Keys.FREQUENCY_COMPANY_VISIT_ID,
    params.frequency_company_visit_id || ''
  )
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.ENTERPRISE_BIRTHDAY, params.enterprise_birthday || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.INCENTIVE_POLICY_ID, params.incentive_policy_id || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.DISCOUNT_POLICY, params.discount_policy || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.PERSONALITY, params.personality || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.SPECIAL_NOTE, params.special_note || '')
  let consultation_histories = ['']
  if (params.consultation_histories.length > 0) {
    consultation_histories = params.consultation_histories
  }
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.CONSULTATION_HISTORIES, consultation_histories || '')
  createCustomerRequest.addParam(CreateCustomerRequest.Keys.DEVICE_MACHINES, params.device_machines || '')
  const paramRequest = createCustomerRequest.getParams()
  const headers = {}
  return post(urls.CREATE_CUSTOMER, paramRequest, headers)
}
export function getAllDeviceMachineType() {
  let param = null
  const headers = {}
  return get(urls.GET_DEVICE_MACHINE_TYPE_ALL, param, headers)
}

export function getAllDeviceMachineManufacturer() {
  let param = null
  const headers = {}
  return get(urls.GET_DEVICE_MACHINE_MANUFACTURER_ALL, param, headers)
}

export function getListConsultationHistories(params) {
  const getListConsultationHistoryRequest = new GetListConsultationHistoryRequest()
  getListConsultationHistoryRequest.addParam(GetListConsultationHistoryRequest.Keys.PAGE, params.page || '')
  getListConsultationHistoryRequest.addParam(
    GetListConsultationHistoryRequest.Keys.CUSTOMER_ID,
    params.customer_id || ''
  )
  getListConsultationHistoryRequest.addParam(GetListConsultationHistoryRequest.Keys.FROM_DATE, params.from_date || '')
  getListConsultationHistoryRequest.addParam(GetListConsultationHistoryRequest.Keys.TO_DATE, params.to_date || '')
  const param = getListConsultationHistoryRequest.getParams()
  const headers = {}
  return get(urls.CONSULTATION_HISTORIES, param, headers)
}

export function createConsultationHistory(params) {
  const createConsultationHistoryRequest = new CreateConsultationHistoryRequest()
  createConsultationHistoryRequest.addParam(
    GetListConsultationHistoryRequest.Keys.CUSTOMER_ID,
    params.customer_id || ''
  )
  createConsultationHistoryRequest.addParam(
    CreateConsultationHistoryRequest.Keys.CONSULTATION_DATE,
    params.consultation_date || ''
  )
  createConsultationHistoryRequest.addParam(
    CreateConsultationHistoryRequest.Keys.CONSULTATION_HISTORY_PROBLEM_ID,
    params.consultation_history_problem_id || ''
  )
  createConsultationHistoryRequest.addParam(
    CreateConsultationHistoryRequest.Keys.INFORMATION_PROVIDER,
    params.information_provider || ''
  )
  createConsultationHistoryRequest.addParam(CreateConsultationHistoryRequest.Keys.DESCRIPTION, params.description || '')
  createConsultationHistoryRequest.addParam(CreateConsultationHistoryRequest.Keys.CONSULTANT, params.consultant || '')
  createConsultationHistoryRequest.addParam(CreateConsultationHistoryRequest.Keys.SOLUTION, params.solution || '')
  createConsultationHistoryRequest.addParam(CreateConsultationHistoryRequest.Keys.RESULT, params.result || '')
  const param = createConsultationHistoryRequest.getParams()
  const headers = {}
  return post(urls.CREATE_CONSULTATION_HISTORY, param, headers)
}

export function getDetailConsultationHistory(params) {
  const getDetailConsultationHistoryRequest = new GetDetailConsultationHistoryRequest()
  getDetailConsultationHistoryRequest.addParam(
    GetDetailConsultationHistoryRequest.Keys.CONSULTATION_HISTORY_ID,
    params.id || ''
  )
  getDetailConsultationHistoryRequest.addParam(
    GetDetailConsultationHistoryRequest.Keys.CUSTOMER_ID,
    params.customer_id || ''
  )
  getDetailConsultationHistoryRequest.addParam(
    GetDetailConsultationHistoryRequest.Keys.CUSTOMER_HANDBOOK_ID,
    params.customer_handbook_id || ''
  )
  const param = getDetailConsultationHistoryRequest.getParams()
  const headers = {}
  return get(urls.GET_CONSULTATION_HISTORY, param, headers)
}

export function updateConsultationHistory(params) {
  const updateConsultationHistoryRequest = new UpdateConsultationHistoryRequest()
  updateConsultationHistoryRequest.addParam(
    UpdateConsultationHistoryRequest.Keys.CONSULTATION_HISTORY_ID,
    params.id || ''
  )
  updateConsultationHistoryRequest.addParam(UpdateConsultationHistoryRequest.Keys.CUSTOMER_ID, params.customer_id || '')
  updateConsultationHistoryRequest.addParam(
    UpdateConsultationHistoryRequest.Keys.CUSTOMER_HANDBOOK_ID,
    params.customer_handbook_id || ''
  )
  updateConsultationHistoryRequest.addParam(
    UpdateConsultationHistoryRequest.Keys.CONSULTATION_DATE,
    params.consultation_date || ''
  )
  updateConsultationHistoryRequest.addParam(
    UpdateConsultationHistoryRequest.Keys.CONSULTATION_HISTORY_PROBLEM_ID,
    params.consultation_history_problem_id || ''
  )
  updateConsultationHistoryRequest.addParam(
    UpdateConsultationHistoryRequest.Keys.INFORMATION_PROVIDER,
    params.information_provider || ''
  )
  updateConsultationHistoryRequest.addParam(UpdateConsultationHistoryRequest.Keys.DESCRIPTION, params.description || '')
  updateConsultationHistoryRequest.addParam(UpdateConsultationHistoryRequest.Keys.CONSULTANT, params.consultant || '')
  updateConsultationHistoryRequest.addParam(UpdateConsultationHistoryRequest.Keys.SOLUTION, params.solution || '')
  updateConsultationHistoryRequest.addParam(UpdateConsultationHistoryRequest.Keys.RESULT, params.result || '')
  const param = updateConsultationHistoryRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_CONSULTATION_HISTORY, param, headers)
}

export function deleteConsultationHistory(params) {
  const headers = {}
  const deleteConsultationHistoryRequest = new DeleteConsultationHistoryRequest()
  deleteConsultationHistoryRequest.addParam(
    DeleteConsultationHistoryRequest.Keys.CONSULTATION_HISTORY_ID,
    params.id || ''
  )
  deleteConsultationHistoryRequest.addParam(DeleteConsultationHistoryRequest.Keys.CUSTOMER_ID, params.customer_id || '')
  deleteConsultationHistoryRequest.addParam(
    DeleteConsultationHistoryRequest.Keys.CUSTOMER_HANDBOOK_ID,
    params.customer_handbook_id || ''
  )
  params = deleteConsultationHistoryRequest.getParams()
  return _delete(urls.DELETE_CONSULTATION_HISTORY, params, headers)
}
