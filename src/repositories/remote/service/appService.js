import urls from '../urls';
import {post, get, put} from '../network';
import DistrictRequest from "../request/app/DistrictRequest";
import WardRequest from "../request/app/WardRequest";
import UpdateNotificationStatusRequest from "../request/app/UpdateNotificationStatusRequest";
import GetNotificationStatusRequest from "../request/app/GetNotificationStatusRequest";

export function getProvinceName() {
  const headers = {};
  return get(urls.GET_PROVINCE_NAME, null, headers);
}

export function getDistrictByProvinceId(provinceId) {
  const districtRequest = new DistrictRequest();
  districtRequest.addParam(DistrictRequest.Keys.PROVINCE_ID, provinceId);
  const params = districtRequest.getParams();
  const headers = {};
  return get(urls.GET_DISTRICT_NAME, params, headers);
}

export function getWardByDistrictId(districtId) {
  const wardRequest = new WardRequest();
  wardRequest.addParam(WardRequest.Keys.DISTRICT_ID, districtId);
  const headers = {};
  const params = wardRequest.getParams();
  return get(urls.GET_WARD_NAME, params, headers);
}

export function getDebtGroups() {
  const headers = {};
  return get(urls.GET_LIST_DEBT_GROUP_ALL, null, headers);
}

export function getDebtAge() {
  const headers = {};
  return get(urls.GET_LIST_DEBT_AGE, null, headers);
}

export function getSalesInCharge() {
  const headers = {};
  return get(urls.GET_LIST_USER_WITH_ROLE_SALE, null, headers);
}

export function getListAllUser() {
  let param = null;
  const headers = {};
  return get(urls.GET_LIST_USER_ALL , param, headers);
}

export function getAllNotification(params) {
  const getNotificationStatusRequest = new GetNotificationStatusRequest();
  getNotificationStatusRequest.addParam(GetNotificationStatusRequest.Keys.OFFSET,params.offset || '');
  const paramRequest = getNotificationStatusRequest.getParams();
  const headers = {};
  return get(urls.GET_ALL_NOTIFICATION, paramRequest, headers);
}

export function updateNotificationStatus(params) {
  const updateNotificationStatusRequest = new UpdateNotificationStatusRequest();
  updateNotificationStatusRequest.addParam(UpdateNotificationStatusRequest.Keys.USER_ID,params.id);
  const paramRequest = updateNotificationStatusRequest.getParams();
  const headers = {};
  return put(urls.UPDATE_NOTIFICATION_STATUS , paramRequest, headers);
}

export function updateNotificationStatusAll() {
  const headers = {};
  return put(urls.UPDATE_ALL_NOTIFICATION , null, headers);
}