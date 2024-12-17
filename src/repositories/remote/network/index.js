import { getCookie } from 'utils'
import axios from '../../../repositories/remote/config/axiosInterceptor'

const TIMEOUT = 60000
export const networkState = {
  unAuthorize: true
}

const timeOutResponse = {
  ERROR_CODE: 'time_out',
  MESSAGE: 'The Connection has time out!'
}

export const handleUnAuthorize = (callback) => {
  // const { auth, appState } = store.getState();
  // const { refresh_token: refreshToken } = auth ?? {};
  // const { refreshingToken } = appState ?? {};
  // if (networkState.unAuthorize || refreshingToken) return;
  // networkState.unAuthorize = true;
  //
  // store.dispatch(refreshAccessTokenAction({ refreshToken, callback }));
}

async function getDefaultHeader(contentType) {
  const auth = getCookie('token')
  const accessToken = auth ? auth : ''
  return {
    Accept: '*/*',
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': contentType ? 'application/json' : 'multipart/form-data'
  }
}

async function handleResponse(response) {
  if (!response) {
    return timeOutResponse
  }
  const result = await response.data
  return await result
}

export async function get(url, params, headers) {
  const body = []
  const defaultHeader = await getDefaultHeader()
  const requestHeaders = { ...defaultHeader, ...headers }
  if (params) {
    const keys = Object.keys(params)
    keys.forEach((key) => {
      body.push(`${key}=${params[key]}`)
      if (key === 'user_ids') {
        const arrUsers = params[key].split(',')
        arrUsers.forEach((userId) => {
          body.push(`${key}[]=${userId}`)
        })
      }
    })
  }
  const strQuery = body.join('&')
  const finalUrl = params ? `${url}?${strQuery}` : `${url}`

  let response = null
  response = await axios.get(finalUrl, {
    headers: requestHeaders,
    timeout: TIMEOUT,
    responseType: 'json'
  })
  return handleResponse(response)
}

export async function post(url, params, headers) {
  let response = null
  const defaultHeader = await getDefaultHeader()
  const requestHeaders = { ...defaultHeader, ...headers }
  response = await axios.post(url, params, {
    headers: requestHeaders,
    timeout: TIMEOUT,
    responseType: 'json'
  })
  return handleResponse(response)
}

export async function put(url, params, headers) {
  let response = null
  const defaultHeader = await getDefaultHeader(true)
  const requestHeaders = { ...defaultHeader, ...headers }
  response = await axios.put(url, params, {
    headers: requestHeaders,
    timeout: TIMEOUT,
    responseType: 'json'
  })
  return handleResponse(response)
}

export async function _delete(url, params, headers) {
  const body = []
  const defaultHeader = await getDefaultHeader()
  const requestHeaders = { ...defaultHeader, ...headers }
  if (params) {
    const keys = Object.keys(params)
    keys.forEach((key) => {
      body.push(`${key}=${params[key]}`)
    })
  }
  const strQuery = body.join('&')
  const finalUrl = params ? `${url}?${strQuery}` : `${url}`
  let response = null
  response = await axios.delete(finalUrl, {
    headers: requestHeaders,
    timeout: TIMEOUT,
    responseType: 'json'
  })
  return handleResponse(response)
}
