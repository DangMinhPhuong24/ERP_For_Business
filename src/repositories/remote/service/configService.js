import urls from '../urls'
import { post, get, _delete, put } from '../network'
import GetListDebtGroupConfigRequest from '../request/config/GetListDebtGroupConfigRequest'
import GetListDebtAgeConfigRequest from '../request/config/GetListDebtAgeConfigRequest'
import GetListQuoteConfigRequest from '../request/config/GetListQuoteConfigRequest'
import CreateDebtGroupConfigRequest from '../request/config/CreateDebtGroupConfigRequest'
import CreateDebtAgeConfigRequest from '../request/config/CreateDebtAgeConfigRequest'
import CreateQuoteConfigRequest from '../request/config/CreateQuoteConfigRequest'
import DeleteDebtGroupConfigRequest from '../request/config/DeleteDebtGroupConfigRequest'
import DeleteDebtAgeConfigRequest from '../request/config/DeleteDebtAgeConfigRequest'
import DeleteQuoteConfigRequest from '../request/config/DeleteQuoteConfigRequest'
import UpdateDebtGroupConfigRequest from '../request/config/UpdateDebtGroupConfigRequest'
import UpdateDebtAgeConfigRequest from '../request/config/UpdateDebtAgeConfigRequest'
import UpdateQuoteConfigRequest from '../request/config/UpdateQuoteConfigRequest'

export function getListDebtGroup(params) {
  let param = null
  if (params) {
    const getListConfigRequest = new GetListDebtGroupConfigRequest()
    getListConfigRequest.addParam(GetListDebtGroupConfigRequest.Keys.PAGE, params.page || '')
    getListConfigRequest.addParam(GetListDebtGroupConfigRequest.Keys.DEBT_GROUP_NAME, params.DEBT_GROUP_NAME || '')
    getListConfigRequest.addParam(GetListDebtGroupConfigRequest.Keys.START_DAY, params.START_DAY || '')
    getListConfigRequest.addParam(GetListDebtGroupConfigRequest.Keys.END_DAY, params.END_DAY || '')
    param = getListConfigRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_DEBT_GROUP, param, headers)
}

export function createDebtGroup(params) {
  const createDebtGroupConfigRequest = new CreateDebtGroupConfigRequest()
  createDebtGroupConfigRequest.addParam(CreateDebtGroupConfigRequest.Keys.DEBT_GROUP_NAME, params.debt_group_name || '')
  createDebtGroupConfigRequest.addParam(CreateDebtGroupConfigRequest.Keys.START_DAY, params.start_day || '')
  createDebtGroupConfigRequest.addParam(CreateDebtGroupConfigRequest.Keys.END_DAY, params.end_day || '')
  createDebtGroupConfigRequest.addParam(CreateDebtGroupConfigRequest.Keys.OVERWRITE, params.overwrite || '')
  const param = createDebtGroupConfigRequest.getParams()
  const headers = {}
  return post(urls.CREATE_DEBT_GROUP, param, headers)
}

export function updateDebtGroup(params) {
  const updateDebtGroupConfigRequest = new UpdateDebtGroupConfigRequest()
  updateDebtGroupConfigRequest.addParam(UpdateDebtGroupConfigRequest.Keys.DEBT_GROUP, params.id)
  updateDebtGroupConfigRequest.addParam(UpdateDebtGroupConfigRequest.Keys.DEBT_GROUP_NAME, params.debt_group_name || '')
  updateDebtGroupConfigRequest.addParam(UpdateDebtGroupConfigRequest.Keys.START_DAY, params.start_day || '')
  updateDebtGroupConfigRequest.addParam(UpdateDebtGroupConfigRequest.Keys.END_DAY, params.end_day || '')
  updateDebtGroupConfigRequest.addParam(UpdateDebtGroupConfigRequest.Keys.OVERWRITE, params.overwrite || '')
  const paramRequest = updateDebtGroupConfigRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_DEBT_GROUP, paramRequest, headers)
}

export function updateDebtAge(params) {
  const updateDebtAgeConfigRequest = new UpdateDebtAgeConfigRequest()
  updateDebtAgeConfigRequest.addParam(UpdateDebtAgeConfigRequest.Keys.DEBT_AGE, params.id)
  updateDebtAgeConfigRequest.addParam(UpdateDebtAgeConfigRequest.Keys.DEBT_AGE_NAME, params.debt_age_name || '')
  updateDebtAgeConfigRequest.addParam(UpdateDebtAgeConfigRequest.Keys.DAYS_ALLOWED, params.days_allowed || '')
  const paramRequest = updateDebtAgeConfigRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_DEBT_AGE, paramRequest, headers)
}

export function updateQuote(params) {
  const updateQuoteConfigRequest = new UpdateQuoteConfigRequest()
  updateQuoteConfigRequest.addParam(UpdateQuoteConfigRequest.Keys.QUOTE_ID, params.id)
  updateQuoteConfigRequest.addParam(UpdateQuoteConfigRequest.Keys.PRODUCT_ID, params.product_id || '')
  updateQuoteConfigRequest.addParam(UpdateQuoteConfigRequest.Keys.ALLOWABLE_DEVIATION, params.allowable_deviation || 0)
  updateQuoteConfigRequest.addParam(
    UpdateQuoteConfigRequest.Keys.PRICE_STANDARD_SHEET,
    params.price_standard_sheet || ''
  )
  updateQuoteConfigRequest.addParam(
    UpdateQuoteConfigRequest.Keys.PRICE_INCLUDE_SHEET_SIZE,
    params.price_include_sheet_size || ''
  )
  updateQuoteConfigRequest.addParam(UpdateQuoteConfigRequest.Keys.PRICE_STANDARD_ROLL, params.price_standard_roll || '')
  updateQuoteConfigRequest.addParam(
    UpdateQuoteConfigRequest.Keys.PRICE_INCLUDE_ROLL_SIZE,
    params.price_include_roll_size || ''
  )
  const paramRequest = updateQuoteConfigRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_QUOTE, paramRequest, headers)
}

export function deleteDebtGroup(debtGroupId) {
  const headers = {}
  const deleteDebtGroupConfigRequest = new DeleteDebtGroupConfigRequest()
  deleteDebtGroupConfigRequest.addParam(DeleteDebtGroupConfigRequest.Keys.DEBT_GROUP, debtGroupId)
  const params = deleteDebtGroupConfigRequest.getParams()
  return _delete(urls.DELETE_DATA_DEBT_GROUP, params, headers)
}

export function getListDebtAge(params) {
  let param = null
  if (params) {
    const getListDebtAgeConfigRequest = new GetListDebtAgeConfigRequest()
    getListDebtAgeConfigRequest.addParam(GetListDebtAgeConfigRequest.Keys.PAGE, params.page || '')
    getListDebtAgeConfigRequest.addParam(GetListDebtAgeConfigRequest.Keys.DEBT_AGE_NAME, params.DEBT_AGE_NAME || '')
    getListDebtAgeConfigRequest.addParam(GetListDebtAgeConfigRequest.Keys.DAYS_ALLOWED, params.DAYS_ALLOWED || '')
    param = getListDebtAgeConfigRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_DEBT_AGES, param, headers)
}

export function createDebtAge(params) {
  const createDebtAgeConfigRequest = new CreateDebtAgeConfigRequest()
  createDebtAgeConfigRequest.addParam(CreateDebtAgeConfigRequest.Keys.DEBT_AGE_NAME, params.debt_age_name || '')
  createDebtAgeConfigRequest.addParam(CreateDebtAgeConfigRequest.Keys.DAYS_ALLOWED, params.days_allowed || '')
  const param = createDebtAgeConfigRequest.getParams()
  const headers = {}
  return post(urls.CREATE_DEBT_AGE, param, headers)
}

export function deleteDebtAge(debtAgeId) {
  const headers = {}
  const deleteDebtAgeConfigRequest = new DeleteDebtAgeConfigRequest()
  deleteDebtAgeConfigRequest.addParam(DeleteDebtAgeConfigRequest.Keys.DEBT_AGE, debtAgeId)
  const params = deleteDebtAgeConfigRequest.getParams()
  return _delete(urls.DELETE_DATA_DEBT_AGE, params, headers)
}

export function getListQuote(params) {
  let param = null
  if (params) {
    const getListQuoteConfigRequest = new GetListQuoteConfigRequest()
    getListQuoteConfigRequest.addParam(GetListQuoteConfigRequest.Keys.PAGE, params.page || '')
    getListQuoteConfigRequest.addParam(GetListQuoteConfigRequest.Keys.SEARCH_QUOTATION, params.search_quotation || '')
    getListQuoteConfigRequest.addParam(GetListQuoteConfigRequest.Keys.PRODUCT_NAME, params.PRODUCT_NAME || '')
    getListQuoteConfigRequest.addParam(GetListQuoteConfigRequest.Keys.PRICE, params.PRICE || '')
    getListQuoteConfigRequest.addParam(
      GetListQuoteConfigRequest.Keys.ALLOWABLE_DEVIATION,
      params.ALLOWABLE_DEVIATION || ''
    )
    param = getListQuoteConfigRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_QUOTE, param, headers)
}

export function createQuote(params) {
  const createQuoteConfigRequest = new CreateQuoteConfigRequest()
  createQuoteConfigRequest.addParam(CreateQuoteConfigRequest.Keys.PRODUCT_ID, params.product_id || '')
  createQuoteConfigRequest.addParam(CreateQuoteConfigRequest.Keys.ALLOWABLE_DEVIATION, params.allowable_deviation || '')
  const param = createQuoteConfigRequest.getParams()
  const headers = {}
  return post(urls.CREATE_QUOTE, param, headers)
}

export function deleteQuote(quoteId) {
  const headers = {}
  const deleteQuoteConfigRequest = new DeleteQuoteConfigRequest()
  deleteQuoteConfigRequest.addParam(DeleteQuoteConfigRequest.Keys.QUOTE_ID, quoteId)
  const params = deleteQuoteConfigRequest.getParams()
  return _delete(urls.DELETE_DATA_QUOTE, params, headers)
}

export function getListProduct() {
  const headers = {}
  return get(urls.GET_PRODUCT_MANAGEMENT_ALL, null, headers)
}
