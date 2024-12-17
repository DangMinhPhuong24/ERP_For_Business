import urls from '../urls'
import { post, get, _delete, put } from '../network'
import CreateCalendarRequest from '../request/calendar/CreateCalendarRequest'
import GetAllCalendarByUserIdRequest from '../request/calendar/GetAllCalendarByUserIdRequest'
import DeleteCalendarRequest from '../request/calendar/DeleteCalendarRequest'
import ApproveCalendarRequest from '../request/calendar/ApproveCalendarRequest'
import UpdateCalendarRequest from '../request/calendar/UpdateCalendarRequest'
import DetailCalendarRequest from '../request/calendar/DetailCalendarRequest'
import { join } from 'lodash'

export function createCalendar(params) {
  let userIds = ''
  if (params.user_ids.length > 0) {
    userIds = params.user_ids
  }
  const createCalendarRequest = new CreateCalendarRequest()
  createCalendarRequest.addParam(CreateCalendarRequest.Keys.TITLE_CALENDAR, params.title || '')
  createCalendarRequest.addParam(CreateCalendarRequest.Keys.DATE_CALENDAR, params.date || '')
  createCalendarRequest.addParam(CreateCalendarRequest.Keys.START_TIME_CALENDAR, params.start_time || '')
  createCalendarRequest.addParam(CreateCalendarRequest.Keys.END_TIME_CALENDAR, params.end_time || '')
  createCalendarRequest.addParam(CreateCalendarRequest.Keys.DESCRIPTION_CALENDAR, params.description || '')
  createCalendarRequest.addParam(CreateCalendarRequest.Keys.USER_IDS, userIds ?? '')
  const paramRequest = createCalendarRequest.getParams()
  const headers = {}
  return post(urls.CREATE_CALENDAR, paramRequest, headers)
}

export function getAllCalendarByUserId(params) {
  const getAllCalendarByUserIdRequest = new GetAllCalendarByUserIdRequest()
  getAllCalendarByUserIdRequest.addParam(GetAllCalendarByUserIdRequest.Keys.FROM_DATE, params.from_date || '')
  getAllCalendarByUserIdRequest.addParam(GetAllCalendarByUserIdRequest.Keys.USER_ID, params.user_id || '')
  const paramRequest = getAllCalendarByUserIdRequest.getParams()
  const headers = {}
  return get(urls.GET_ALL_CALENDAR_BY_USER_ID, paramRequest, headers)
}

export function deleteCalendarById(params) {
  const deleteCalendarByIdRequest = new DeleteCalendarRequest()
  deleteCalendarByIdRequest.addParam(DeleteCalendarRequest.Keys.ID, params.id || '')
  const paramRequest = deleteCalendarByIdRequest.getParams()
  const headers = {}
  return _delete(urls.DELETE_CALENDAR_BY_ID, paramRequest, headers)
}

export function approveCalendarById(params) {
  const approveCalendarRequest = new ApproveCalendarRequest()
  approveCalendarRequest.addParam(ApproveCalendarRequest.Keys.ID, params.id || '')
  approveCalendarRequest.addParam(ApproveCalendarRequest.Keys.CALENDAR_STATUS_ID, params.calendar_status_id || '')
  const paramRequest = approveCalendarRequest.getParams()
  const headers = {}
  return put(urls.APPROVE_CALENDAR_BY_ID, paramRequest, headers)
}

export function updateCalendar(params) {
  const updateCalendarRequest = new UpdateCalendarRequest()
  let userIds = ''
  if (params.user_ids.length > 0) {
    userIds = params.user_ids
  }
  updateCalendarRequest.addParam(UpdateCalendarRequest.Keys.ID, params.id || '')
  updateCalendarRequest.addParam(UpdateCalendarRequest.Keys.TITLE_CALENDAR, params.title || '')
  updateCalendarRequest.addParam(UpdateCalendarRequest.Keys.DATE_CALENDAR, params.date || '')
  updateCalendarRequest.addParam(UpdateCalendarRequest.Keys.START_TIME_CALENDAR, params.start_time || '')
  updateCalendarRequest.addParam(UpdateCalendarRequest.Keys.END_TIME_CALENDAR, params.end_time || '')
  updateCalendarRequest.addParam(UpdateCalendarRequest.Keys.DESCRIPTION_CALENDAR, params.description || '')
  updateCalendarRequest.addParam(UpdateCalendarRequest.Keys.USER_IDS, userIds ?? '')
  const request = updateCalendarRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_CALENDAR, request, headers)
}

export function searchCalendarByUserId(params) {
  let userIds = ''
  if (params.user_ids.length > 0) {
    userIds = params.user_ids
  }
  const getAllCalendarByUserIdRequest = new GetAllCalendarByUserIdRequest()
  getAllCalendarByUserIdRequest.addParam(GetAllCalendarByUserIdRequest.Keys.FROM_DATE, params.from_date || '')
  getAllCalendarByUserIdRequest.addParam(GetAllCalendarByUserIdRequest.Keys.TO_DATE, params.to_date || '')
  if (params.user_ids.length > 0) {
    getAllCalendarByUserIdRequest.addParam(GetAllCalendarByUserIdRequest.Keys.USER_IDS, join(params.user_ids, ','))
  } else {
    getAllCalendarByUserIdRequest.addParam(GetAllCalendarByUserIdRequest.Keys.USER_IDS, userIds)
  }
  const paramRequest = getAllCalendarByUserIdRequest.getParams()
  const headers = {}
  return get(urls.SEARCH_CALENDAR_BY_USER_ID, paramRequest, headers)
}

export const detailCalendar = (params) => {
  const detailCalendarByIdRequest = new DetailCalendarRequest()
  detailCalendarByIdRequest.addParam(DetailCalendarRequest.Keys.ID, params.id || '')
  const paramRequest = detailCalendarByIdRequest.getParams()
  const headers = {}
  return get(urls.DETAIL_CALENDAR, paramRequest, headers)
}
