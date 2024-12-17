import axios from 'axios'
import { refreshToken as refresh } from '../../../repositories/remote/service/authService'
import { deleteCookie, getCookie, setCookie } from 'utils'

const onRequestSuccess = async (config) => {
  const token = getCookie('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}

const onResponseSuccess = (response) => {
  return response
}

let isRefreshing = false
const currentUrl = window.location.pathname
const onResponseError = async (error) => {
  const originalRequest = error.config
  const token = getCookie('token')
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    if (!isRefreshing) {
      isRefreshing = true
      try {
        const refresh_token = localStorage.getItem('refreshToken')
        if (!token || !refresh_token) {
          localStorage.removeItem('name')
          localStorage.removeItem('refreshToken')
          deleteCookie('token')
          if (currentUrl !== '/login') {
            window.location.href = '/login'
          }
          return;
        }
        const response = await refresh(refresh_token)
        const newToken = response.data.token
        deleteCookie('token')
        setCookie('token', newToken, 30)
        localStorage.setItem('refreshToken', response.data.refresh_token)
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return axios(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('refreshToken')

        deleteCookie('token')
      } finally {
        isRefreshing = false
      }
    }
  }
  return Promise.reject(error)
}

axios.interceptors.request.use(onRequestSuccess)
axios.interceptors.response.use(onResponseSuccess, onResponseError)

export default axios
