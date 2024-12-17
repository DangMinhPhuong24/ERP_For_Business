import { get, post, put } from '../network'
import urls from '../urls'
import GetListProposalDebtAgeRequest from '../request/proposal/GetListProposalDebtAgeRequest'
import GetListProposalQuotationRequest from '../request/proposal/GetListProposalQuotationRequest'
import CreateProposalDebtAgeRequest from '../request/proposal/CreateProposalDebtAgeRequest'
import GetDetailProposalDebtAgeRequest from '../request/proposal/GetDetailProposalDebtAgeRequest'
import UpdateApproveProposalDebtAgeRequest from '../request/proposal/UpdateApproveProposalDebtAgeRequest'
import GetDetailProposalQuotationRequest from '../request/proposal/GetDetailProposalQuotationRequest'
import UpdateApproveProposalQuotationRequest from '../request/proposal/UpdateApproveProposalQuotationRequest'
import GetListProposalPurchaseOrderRequest from "../request/proposal/GetListProposalPurchaseOrderRequest";
import GetDetailProposalPurchaseOrderRequest from "../request/proposal/GetDetailProposalPurchaseOrderRequest";
import UpdateApproveProposalPurchaseOrderRequest from "../request/proposal/UpdateApproveProposalPurchaseOrderRequest";

export function getListProposalDebtAge(params) {
  let param = null
  if (params) {
    const getListProposalDebtAgeRequest = new GetListProposalDebtAgeRequest()
    getListProposalDebtAgeRequest.addParam(GetListProposalDebtAgeRequest.Keys.PAGE, params.page || '')
    getListProposalDebtAgeRequest.addParam(GetListProposalDebtAgeRequest.Keys.CUSTOMER_NAME, params.customer_name || '')
    getListProposalDebtAgeRequest.addParam(
      GetListProposalDebtAgeRequest.Keys.PROPOSAL_STATUS_ID,
      params.proposal_status_id || ''
    )
    getListProposalDebtAgeRequest.addParam(GetListProposalDebtAgeRequest.Keys.FROM_DATE, params.from_date || '')
    getListProposalDebtAgeRequest.addParam(GetListProposalDebtAgeRequest.Keys.TO_DATE, params.to_date || '')
    getListProposalDebtAgeRequest.addParam(GetListProposalDebtAgeRequest.Keys.SORT_BY, params.sort_by || '')
    param = getListProposalDebtAgeRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_PROPOSAL_DEBT_AGE, param, headers)
}

export function getAllProposalStatus() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_PROPOSAL_STATUS, param, headers)
}

export function getListProposalQuotation(params) {
  let param = null
  if (params) {
    const getListProposalQuotationRequest = new GetListProposalQuotationRequest()
    getListProposalQuotationRequest.addParam(GetListProposalQuotationRequest.Keys.PAGE, params.page || '')
    getListProposalQuotationRequest.addParam(
      GetListProposalQuotationRequest.Keys.CUSTOMER_NAME,
      params.customer_name || ''
    )
    getListProposalQuotationRequest.addParam(
      GetListProposalQuotationRequest.Keys.PROPOSAL_STATUS_ID,
      params.proposal_status_id || ''
    )
    getListProposalQuotationRequest.addParam(GetListProposalQuotationRequest.Keys.FROM_DATE, params.from_date || '')
    getListProposalQuotationRequest.addParam(GetListProposalQuotationRequest.Keys.TO_DATE, params.to_date || '')
    getListProposalQuotationRequest.addParam(GetListProposalQuotationRequest.Keys.SORT_BY, params.sort_by || '')
    param = getListProposalQuotationRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_PROPOSAL_QUOTATION, param, headers)
}

export function getStatisticProposal() {
  let param = null
  const headers = {}
  return get(urls.GET_STATISTIC_PROPOSAL, param, headers)
}

export function createProposalDebtAge(params) {
  let param = null
  if (params) {
    const createProposalDebtAgeRequest = new CreateProposalDebtAgeRequest()
    createProposalDebtAgeRequest.addParam(
      CreateProposalDebtAgeRequest.Keys.DEBT_AGE_CUSTOMER_ID,
      params.customer_id || ''
    )
    createProposalDebtAgeRequest.addParam(CreateProposalDebtAgeRequest.Keys.DEBT_AGE_ID, params.debt_age_id || '')
    param = createProposalDebtAgeRequest.getParams()
  }
  const headers = {}
  return post(urls.CREATE_PROPOSAL_DEBT_AGE, param, headers)
}

export function getDetailProposalDebtAge(params) {
  let param = null
  if (params) {
    const getDetailProposalDebtAgeRequest = new GetDetailProposalDebtAgeRequest()
    getDetailProposalDebtAgeRequest.addParam(GetDetailProposalDebtAgeRequest.Keys.PROPOSAL_ID, params.id || '')
    param = getDetailProposalDebtAgeRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_DETAIL_PROPOSAL_DEBT_AGE, param, headers)
}

export function updateApproveProposalDebtAge(params) {
  const updateApproveProposalDebtAgeRequest = new UpdateApproveProposalDebtAgeRequest()
  updateApproveProposalDebtAgeRequest.addParam(UpdateApproveProposalDebtAgeRequest.Keys.PROPOSAL_ID, params.id)
  updateApproveProposalDebtAgeRequest.addParam(
    UpdateApproveProposalDebtAgeRequest.Keys.PROPOSAL_STATUS_ID,
    params.proposal_status_id || ''
  )
  updateApproveProposalDebtAgeRequest.addParam(UpdateApproveProposalDebtAgeRequest.Keys.REASON, params.reason || '')
  const paramRequest = updateApproveProposalDebtAgeRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_APPROVE_PROPOSAL_DEBT_AGE, paramRequest, headers)
}

export function getDetailProposalQuotation(params) {
  let param = null
  if (params) {
    const getDetailProposalQuotationRequest = new GetDetailProposalQuotationRequest()
    getDetailProposalQuotationRequest.addParam(
      GetDetailProposalQuotationRequest.Keys.PROPOSAL_QUOTATION_ID,
      params.id || ''
    )
    param = getDetailProposalQuotationRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_DETAIL_PROPOSAL_QUOTATION, param, headers)
}

export function updateApproveProposalQuotation(params) {
  const updateApproveProposalQuotationRequest = new UpdateApproveProposalQuotationRequest()
  updateApproveProposalQuotationRequest.addParam(UpdateApproveProposalQuotationRequest.Keys.PROPOSAL_ID, params.id)
  updateApproveProposalQuotationRequest.addParam(
    UpdateApproveProposalQuotationRequest.Keys.PROPOSAL_STATUS_ID,
    params.proposal_status_id || ''
  )
  updateApproveProposalQuotationRequest.addParam(UpdateApproveProposalQuotationRequest.Keys.REASON, params.reason || '')
  const paramRequest = updateApproveProposalQuotationRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_APPROVE_PROPOSAL_QUOTATION, paramRequest, headers)
}

export function getListProposalPurchaseOrder(params) {
  let param = null
  if (params) {
    const getListProposalPurchaseOrderRequest = new GetListProposalPurchaseOrderRequest()
    getListProposalPurchaseOrderRequest.addParam(GetListProposalPurchaseOrderRequest.Keys.PAGE, params.page || '')
    getListProposalPurchaseOrderRequest.addParam(GetListProposalPurchaseOrderRequest.Keys.SEARCH, params.search || '')
    getListProposalPurchaseOrderRequest.addParam(GetListProposalPurchaseOrderRequest.Keys.FROM_DATE, params.from_date || '')
    getListProposalPurchaseOrderRequest.addParam(GetListProposalPurchaseOrderRequest.Keys.TO_DATE, params.to_date || '')
    param = getListProposalPurchaseOrderRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_PURCHASE_ORDER_PROPOSAL, param, headers)
}

export function getDetailProposalPurchaseOrder(id) {
  let param = null

  const getDetailProposalPurchaseOrderRequest = new GetDetailProposalPurchaseOrderRequest()
  getDetailProposalPurchaseOrderRequest.addParam(GetDetailProposalPurchaseOrderRequest.Keys.ID, id || '')
  param = getDetailProposalPurchaseOrderRequest.getParams()

  const headers = {}
  return get(urls.PURCHASE_ORDER_PROPOSAL_DETAIL, param, headers)
}

export function updateApproveProposalPurchaseOrder(params) {
  const updateApproveProposalPurchaseOrderRequest = new UpdateApproveProposalPurchaseOrderRequest()
  updateApproveProposalPurchaseOrderRequest.addParam(UpdateApproveProposalPurchaseOrderRequest.Keys.ID, params.id)
  updateApproveProposalPurchaseOrderRequest.addParam(
    UpdateApproveProposalPurchaseOrderRequest.Keys.PURCHASE_ORDER_STATUS_ID,
    params.purchase_order_status_id || ''
  )
  updateApproveProposalPurchaseOrderRequest.addParam(UpdateApproveProposalPurchaseOrderRequest.Keys.REASON, params.reason || '')
  const paramRequest = updateApproveProposalPurchaseOrderRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_PURCHASE_ORDER_PROPOSAL, paramRequest, headers)
}