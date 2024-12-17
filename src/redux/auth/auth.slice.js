/* eslint-disable no-param-reassign */
/* redux-toolkit create slice with Immer reducer, no need "immutable" reducer here */
import { createSlice } from '@reduxjs/toolkit'
import { loginAction, logoutAction, refreshTokenAction, getProfileAction } from './auth.actions'
import { deleteCookie, setCookie } from 'utils'

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    user: null,
    token: null,
    error: null,
    getProfileState: [],
    refresh_token: '',
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.pending, (state) => {
        state.token = null
        state.user = null
        state.error = null
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        if (action.payload.token && action.payload.refresh_token) {
          state.token = action.payload.token
          state.refresh_token = action.payload.refresh_token
          state.user = action.payload.user
          setCookie('token', action.payload.token, 30)
          localStorage.setItem('refreshToken', action.payload.refresh_token)
        }
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload.message
      })
      .addCase(logoutAction, (state) => {
        state.loading = false
        state.token = null
        state.user = null
        localStorage.removeItem('refreshToken')
        deleteCookie('token')
      })
      .addCase(refreshTokenAction.fulfilled, (state, action) => {
        state.token = action.payload.token
        state.refresh_token = action.payload.refresh_token
        setCookie('token', action.payload.token, 30)
      })
      .addCase(getProfileAction.fulfilled, (state, action) => {
        state.getProfileState = action.payload
      })
  }
})

export default usersSlice
