import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import {getProfile, login, loginMobile, loginZalo, refreshToken} from '../../repositories/remote/service/authService';
import {setLoading, setShowToast, setToastIsSuccess, setToastMessage} from "../app/app.slice";
import { isMobile } from '../../common/common'

export const logoutAction = createAction('auth/logout');

export const loginAction = createAsyncThunk('auth/login', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        let response;
        if (isMobile) {
            response = await loginMobile(credential);
        } else {
            response = await login(credential);
        }
        thunkAPI.dispatch(setLoading(false));
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        return thunkAPI.rejectWithValue(response.response.data);
    }
});

export const refreshTokenAction = createAsyncThunk('auth/refreshToken', async (credential) => {
  const response = await refreshToken(credential);
  return response.data;
});

export const loginZaloAction = createAsyncThunk('auth/loginZalo', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await loginZalo(credential);
        thunkAPI.dispatch(setLoading(false))
        thunkAPI.dispatch(setShowToast(true))
        thunkAPI.dispatch(setToastMessage(response.message))
        thunkAPI.dispatch(setToastIsSuccess(true))
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        thunkAPI.dispatch(setShowToast(true))
        thunkAPI.dispatch(setToastMessage(response.response.data.message))
        thunkAPI.dispatch(setToastIsSuccess(false))
        throw new Error(response.response.data.message);
    }
});

export const getProfileAction = createAsyncThunk('auth/getProfile', async (credential, thunkAPI) => {
    try {
        const response = await getProfile(credential);
        return response.data;
    } catch (response) {
        throw new Error(response.response.data.message);
    }
});
