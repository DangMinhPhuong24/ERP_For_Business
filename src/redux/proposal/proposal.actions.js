import {createAsyncThunk} from "@reduxjs/toolkit";
import {setLoading, setShowToast, setToastIsSuccess, setToastMessage} from "../app/app.slice";
import {
    setCurrentPage, setCurrentPageQuotationList,
    setTotalPages, setTotalPagesPurchaseOrderList, setTotalPagesQuotationList,
} from './proposal.slice';
import {
    createProposalDebtAge,
    getAllProposalStatus,
    getDetailProposalDebtAge,
    getDetailProposalPurchaseOrder,
    getDetailProposalQuotation,
    getListProposalDebtAge,
    getListProposalPurchaseOrder,
    getListProposalQuotation,
    getStatisticProposal,
    updateApproveProposalDebtAge,
    updateApproveProposalPurchaseOrder,
    updateApproveProposalQuotation
} from "../../repositories/remote/service/proposalService";

export const getListProposalDebtAgeAction = createAsyncThunk('proposal/getListProposalDebtAge', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getListProposalDebtAge(credential);
        thunkAPI.dispatch(setLoading(false))
        thunkAPI.dispatch(setCurrentPage(response.current_page));
        thunkAPI.dispatch(setTotalPages(response.total_pages));
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        throw new Error(response.response.data.message);
    }
});

export const getAllProposalStatusAction = createAsyncThunk('proposal/getAllProposalStatus', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getAllProposalStatus(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        throw new Error(response.response.data.message);
    }
});

export const getListProposalQuotationAction = createAsyncThunk('proposal/getListProposalQuotation', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getListProposalQuotation(credential);
        thunkAPI.dispatch(setLoading(false))
        thunkAPI.dispatch(setCurrentPageQuotationList(response.current_page));
        thunkAPI.dispatch(setTotalPagesQuotationList(response.total_pages));
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        throw new Error(response.response.data.message);
    }
});

export const getStatisticProposalAction = createAsyncThunk('proposal/getStatisticProposal', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getStatisticProposal(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        throw new Error(response.response.data.message);
    }
});

export const createProposalDebtAgeAction = createAsyncThunk('proposal/createProposalDebtAge', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await createProposalDebtAge(credential);
        thunkAPI.dispatch(setLoading(false))
        thunkAPI.dispatch(setShowToast(true))
        thunkAPI.dispatch(setToastMessage(response.message))
        thunkAPI.dispatch(setToastIsSuccess(true))
        return response;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        thunkAPI.dispatch(setShowToast(true))
        thunkAPI.dispatch(setToastMessage(response.response.data.message))
        thunkAPI.dispatch(setToastIsSuccess(false))
        throw new Error(response.response.data.message);
    }
});

export const getDetailProposalDebtAgeAction = createAsyncThunk('proposal/getDetailProposalDebtAge', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getDetailProposalDebtAge(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        throw new Error(response.response.data.message);
    }
});

export const updateApproveProposalDebtAgeAction = createAsyncThunk('proposal/updateApproveProposalDebtAge', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await updateApproveProposalDebtAge(credential);
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

export const updateApproveProposalPurchaseOrderAction = createAsyncThunk('proposal/updateApproveProposalPurchaseOrder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await updateApproveProposalPurchaseOrder(credential);
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

export const getDetailProposalQuotationAction = createAsyncThunk('proposal/getDetailProposalQuotation', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getDetailProposalQuotation(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        throw new Error(response.response.data.message);
    }
});

export const updateApproveProposalQuotationAction = createAsyncThunk('proposal/updateApproveProposalQuotation', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await updateApproveProposalQuotation(credential);
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

export const getListProposalPurchaseOrderAction = createAsyncThunk('proposal/getListProposalPurchaseOrder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getListProposalPurchaseOrder(credential);
        thunkAPI.dispatch(setLoading(false))
        thunkAPI.dispatch(setTotalPagesPurchaseOrderList(response.total_pages));
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        throw new Error(response.response.data.message);
    }
});

export const getDetailProposalPurchaseOrderAction = createAsyncThunk('proposal/getDetailProposalPurchaseOrder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getDetailProposalPurchaseOrder(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        throw new Error(response.response.data.message);
    }
});
