import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getListDebtAge,
    getListDebtGroup,
    getListQuote,
    createDebtGroup,
    createDebtAge,
    getListProduct,
    createQuote,
    deleteDebtGroup,
    deleteDebtAge,
    deleteQuote,
    updateDebtGroup,
    updateQuote,
    updateDebtAge
} from "../../repositories/remote/service/configService";
import {
    setDebtGroupListPage,
    setDebtGroupTotalPages,
    setDebtAgeListPage,
    setDebtAgeTotalPages,
    setQuoteListPage,
    setQuoteListTotalPages,
    setDeleteMessageState,
    setErrorMessageDebtGroupState,
    seterror
} from "./config.slice"
import { setLoading, setShowToast, setToastIsSuccess, setToastMessage } from "../app/app.slice";

export const getDebtGroupListAction = createAsyncThunk('config/getDebtGroups', async (credential, thunkAPI) => {
    try {
        thunkAPI.dispatch(setDeleteMessageState())
        const response = await getListDebtGroup(credential);
        thunkAPI.dispatch(setDebtGroupListPage(response.current_page));
        thunkAPI.dispatch(setDebtGroupTotalPages(response.total_pages));
        return response.data;
    } catch (response) {
        throw new Error(response.response.data.message);
    }
});

export const createDebtGroupAction = createAsyncThunk('config/storeDebtGroups', async (credential, thunkAPI) => {
    try {
        const response = await createDebtGroup(credential);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setErrorMessageDebtGroupState(response.response.data.message));
        throw new Error(response.response.data.message);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.response.data.message));
        thunkAPI.dispatch(setToastIsSuccess(false));
    }
});

export const updateDebtGroupAction = createAsyncThunk('config/updateDebtGroup', async (credential, thunkAPI) => {
    try {
        const response = await updateDebtGroup(credential);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setErrorMessageDebtGroupState(response.response.data.message));
        throw new Error(response.response.data.message);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.response.data.message));
        thunkAPI.dispatch(setToastIsSuccess(false));
    }
});

export const updateDebtAgeAction = createAsyncThunk('config/updateDebtAge', async (credential, thunkAPI) => {
    try {
        const response = await updateDebtAge(credential);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response.data;
    } catch (response) {
        throw new Error(response.response.data.message);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.response.data.message));
        thunkAPI.dispatch(setToastIsSuccess(false));
    }
});

export const updateQuoteAction = createAsyncThunk('config/updateQuote', async (credential, thunkAPI) => {
    try {
        const response = await updateQuote(credential);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response.data;
    } catch (response) {
        throw new Error(response.response.data.message);
    }
});

export const deleteDataDebtGroupConfigAction = createAsyncThunk('config/deleteDebtGroup', async (credential, thunkAPI) => {
    try {
        const response = await deleteDebtGroup(credential);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response;
    } catch (response) {
        throw new Error(response.response.data.message);
    }
});

export const createDebtAgeAction = createAsyncThunk('config/storeDebtAge', async (credential, thunkAPI) => {
    try {
        const response = await createDebtAge(credential);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response.data;
    } catch (response) {
        throw new Error(response.response.data.message);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.response.data.message));
        thunkAPI.dispatch(setToastIsSuccess(false));
    }
});

export const getDebtAgeListAction = createAsyncThunk('config/getDebtAges', async (credential, thunkAPI) => {
    try {
        thunkAPI.dispatch(setDeleteMessageState())
        const response = await getListDebtAge(credential);
        thunkAPI.dispatch(setDebtAgeListPage(response.current_page));
        thunkAPI.dispatch(setDebtAgeTotalPages(response.total_pages));
        return response.data;
    } catch (response) {
        throw new Error(response.response.data.message);
    }
});

export const deleteDataDebtAgeConfigAction = createAsyncThunk('config/deleteDebtAge', async (credential, thunkAPI) => {
    try {
        const response = await deleteDebtAge(credential);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response;
    } catch (response) {
        throw new Error(response.response.data.message);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.response.data.message));
        thunkAPI.dispatch(setToastIsSuccess(false));
    }
});

export const deleteDataQuoteConfigAction = createAsyncThunk('config/deleteQuote', async (credential, thunkAPI) => {
    try {
        const response = await deleteQuote(credential);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response;
    } catch (response) {
        throw new Error(response.response.data.message);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.response.data.message));
        thunkAPI.dispatch(setToastIsSuccess(false));
    }
});
export const getQuoteListAction = createAsyncThunk('config/getQuote', async (credential, thunkAPI) => {
    try {
        thunkAPI.dispatch(setDeleteMessageState())
        const response = await getListQuote(credential);
        thunkAPI.dispatch(setQuoteListPage(response.current_page));
        thunkAPI.dispatch(setQuoteListTotalPages(response.total_pages));
        return response.data;
    } catch (response) {
        throw new Error(response.response.data.message);
    }
});

export const removeMessageErrorAction = createAsyncThunk('config/removeMessageError', async (credential, thunkAPI) => {
    return true;
});

export const getListProductAction = createAsyncThunk('config/getProductName', async (credential) => {
    try {
        const response = await getListProduct();
        return response.data;
    } catch (response) {
        throw new Error(response.response.data.message);
    }
});

export const createQuoteAction = createAsyncThunk('config/storeQuotes', async (credential, thunkAPI) => {
    try {
        const response = await createQuote(credential);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response.data;
    } catch (response) {
        throw new Error(response.response.data.message);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.response.data.message));
        thunkAPI.dispatch(setToastIsSuccess(false));
    }
});
