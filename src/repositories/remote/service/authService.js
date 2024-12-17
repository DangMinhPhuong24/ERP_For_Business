import LoginRequest from '../request/auth/LoginRequest';
import urls from '../urls';
import { post, get } from '../network';
import RefreshTokenRequest from "../request/auth/RefreshTokenRequest";
import LoginZaloRequest from "../request/auth/LoginZaloRequest";

export function login(param) {
  const loginRequest = new LoginRequest();
  loginRequest.addParam(LoginRequest.Keys.USER_NAME, param.userName);
  loginRequest.addParam(LoginRequest.Keys.PASSWORD, param.password);
  const headers = {};
  const params = loginRequest.getParams();
  return post(urls.LOGIN, params, headers);
}

export function loginMobile(param) {
  const loginRequest = new LoginRequest();
  loginRequest.addParam(LoginRequest.Keys.USER_NAME, param.userName);
  loginRequest.addParam(LoginRequest.Keys.PASSWORD, param.password);
  const headers = {};
  const params = loginRequest.getParams();
  return post(urls.LOGIN_MOBILE, params, headers);
}

export function refreshToken(param) {
  const refreshTokenRequest = new RefreshTokenRequest();
  refreshTokenRequest.addParam(RefreshTokenRequest.Keys.REFRESH_TOKEN, param);
  const headers = {};
  const params = refreshTokenRequest.getParams();
  return post(urls.REFRESH_TOKEN, params, headers);
}

export function loginZalo(param) {
  const loginZaloRequest = new LoginZaloRequest();
  loginZaloRequest.addParam(LoginZaloRequest.Keys.ZALO_CODE, param.code);
  const headers = {};
  const params = loginZaloRequest.getParams();
  return post(urls.LOGIN_ZALO, params, headers);
}

export function getProfile() {
  let param = null;
  const headers = {};
  return get(urls.PROFILE , param, headers);
}

