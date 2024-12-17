import {createAsyncThunk} from "@reduxjs/toolkit";
import {setLoading, setShowToast, setToastIsSuccess, setToastMessage} from "../app/app.slice";
import {
    deleteOder,
    getListOder,
    getOderInformation,
    getListProductByCustomer,
    getListAdjustmentVoucherByOrder,
    createAdjustmentVoucher,
    deleteAdjustmentVoucher,
    getDetailAdjustmentVoucherByOrder,
    updateAdjustmentVoucherByOrder,
    getListCompensationVoucherByOrder,
    createCompensationVoucher,
    deleteCompensationVoucher,
    getDetailCompensationVoucherByOrder,
    updateCompensationVoucherByOrder,
    getKanBanOrder,
    getAllAddressBranchByCustomerId,
    getAllProductWarehouseByProductManagementId,
    getAllManufactureForm, getAllProductWarehouseSuggestion
} from "../../repositories/remote/service/oderService";
import { setCurrentPage,
    setTotalPages, setDeleteMessageState,setAdjustmentVoucherTotalPages,setAdjustmentVoucherCurrentPage,setCompensationVoucherCurrentPage,
    setCompensationVoucherTotalPages
} from './oder.slice';
export const getOderListAction = createAsyncThunk('oder/getList', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
  try {
      thunkAPI.dispatch(setDeleteMessageState())
      const response = await getListOder(credential);
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setCurrentPage(response.current_page));
      thunkAPI.dispatch(setTotalPages(response.total_pages));
      return response.data;
  } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message);
  }
});

export const getOderDetailAction = createAsyncThunk('oder/getOderDetail', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getOderInformation(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (e) {
        thunkAPI.dispatch(setLoading(false))
        throw e;
    }
});

export const deleteDataOderAction = createAsyncThunk('oder/deleteOder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
        const response = await deleteOder(credential);
        thunkAPI.dispatch(setLoading(false));
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        throw new Error(response.response.data.message);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.response.data.message));
        thunkAPI.dispatch(setToastIsSuccess(false));
    }
});

export const getListProductByCustomerId = createAsyncThunk('oder/getProductByCustomer', async (credential, thunkAPI) => {
    try {
        const response = await getListProductByCustomer(credential);
        return response.data;
    } catch (e) {
        throw e;
    }
});

export const getListAdjustmentVoucherByOrderAction = createAsyncThunk('oder/getAdjustmentVoucherByOrder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        thunkAPI.dispatch(setDeleteMessageState())
        const response = await getListAdjustmentVoucherByOrder(credential);
        thunkAPI.dispatch(setLoading(false))
        thunkAPI.dispatch(setAdjustmentVoucherCurrentPage(response.current_page));
        thunkAPI.dispatch(setAdjustmentVoucherTotalPages(response.total_pages));
        return response.data;
    } catch (e) {
        thunkAPI.dispatch(setLoading(false))
        throw e;
    }
});

export const removeMessageErrorAction = createAsyncThunk('oder/removeMessageError', async (credential, thunkAPI) => {
    return true;
});
export const createAdjustmentVoucherByOrderAction = createAsyncThunk('oder/createAdjustmentVoucherByOrder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
        const response = await createAdjustmentVoucher(credential);
        thunkAPI.dispatch(setLoading(false));
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false));
        throw new Error(response.response.data.message);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.response.data.message));
        thunkAPI.dispatch(setToastIsSuccess(false));
    }
});

export const deleteDataAdjustmentVoucherByOrderAction = createAsyncThunk('oder/deleteAdjustmentVoucherByOrder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
        const response = await deleteAdjustmentVoucher(credential);
        thunkAPI.dispatch(setLoading(false));
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        throw new Error(response.response.data.message);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.response.data.message));
        thunkAPI.dispatch(setToastIsSuccess(false));
    }
});

export const getDetailAdjustmentVoucherByOrderAction = createAsyncThunk('oder/getDetailAdjustmentVoucherByOrder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        thunkAPI.dispatch(setDeleteMessageState())
        const response = await getDetailAdjustmentVoucherByOrder(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (e) {
        thunkAPI.dispatch(setLoading(false))
        throw e;
    }
});

export const updateDataAdjustmentVoucherByOrderAction = createAsyncThunk('oder/updateAdjustmentVoucherByOrder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
        const response = await updateAdjustmentVoucherByOrder(credential);
        thunkAPI.dispatch(setLoading(false));
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false));
        throw new Error(response.response.data.message);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.response.data.message));
        thunkAPI.dispatch(setToastIsSuccess(false));
    }
});

export const getListCompensationVoucherByOrderAction = createAsyncThunk('oder/getCompensationVoucherByOrder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        thunkAPI.dispatch(setDeleteMessageState())
        const response = await getListCompensationVoucherByOrder(credential);
        thunkAPI.dispatch(setLoading(false))
        thunkAPI.dispatch(setCompensationVoucherCurrentPage(response.current_page));
        thunkAPI.dispatch(setCompensationVoucherTotalPages(response.total_pages));
        return response.data;
    } catch (e) {
        thunkAPI.dispatch(setLoading(false))
        throw e;
    }
});

export const createCompensationVoucherByOrderAction = createAsyncThunk('oder/createCompensationVoucherByOrder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
        const response = await createCompensationVoucher(credential);
        thunkAPI.dispatch(setLoading(false));
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false));
        throw new Error(response.response.data.message);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.response.data.message));
        thunkAPI.dispatch(setToastIsSuccess(false));
    }
});

export const deleteDataCompensationVoucherByOrderAction = createAsyncThunk('oder/deleteCompensationVoucherByOrder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
        const response = await deleteCompensationVoucher(credential);
        thunkAPI.dispatch(setLoading(false));
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        throw new Error(response.response.data.message);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.response.data.message));
        thunkAPI.dispatch(setToastIsSuccess(false));
    }
});

export const getDetailCompensationVoucherByOrderAction = createAsyncThunk('oder/getDetailCompensationVoucherByOrder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        thunkAPI.dispatch(setDeleteMessageState())
        const response = await getDetailCompensationVoucherByOrder(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (e) {
        thunkAPI.dispatch(setLoading(false))
        throw e;
    }
});
export const updateDataCompensationVoucherByOrderAction = createAsyncThunk('oder/updateCompensationVoucherByOrder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    try {
        const response = await updateCompensationVoucherByOrder(credential);
        thunkAPI.dispatch(setLoading(false));
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.message));
        thunkAPI.dispatch(setToastIsSuccess(true));
        return response;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false));
        throw new Error(response.response.data.message);
        thunkAPI.dispatch(setShowToast(true));
        thunkAPI.dispatch(setToastMessage(response.response.data.message));
        thunkAPI.dispatch(setToastIsSuccess(false));
    }
});
export const getKanBanOrderAction = createAsyncThunk('oder/getKanBanOrder', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getKanBanOrder(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (e) {
        thunkAPI.dispatch(setLoading(false))
        throw e;
    }
});

export const getAllAddressBranchByCustomerIdAction = createAsyncThunk('oder/getAllAddressBranchByCustomerId', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getAllAddressBranchByCustomerId(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (e) {
        thunkAPI.dispatch(setLoading(false))
        throw e;
    }
});

export const getAllProductWarehouseByProductManagementIdAction = createAsyncThunk('oder/getAllProductWarehouseByProductManagementId', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getAllProductWarehouseByProductManagementId(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (e) {
        thunkAPI.dispatch(setLoading(false))
        throw e;
    }
});

export const getAllProductWarehouseSuggestionAction = createAsyncThunk('oder/getAllProductWarehouseSuggestion', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getAllProductWarehouseSuggestion(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (e) {
        thunkAPI.dispatch(setLoading(false))
        throw e;
    }
});

export const getAllManufactureFormAction = createAsyncThunk('oder/getAllManufactureForm', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getAllManufactureForm(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (e) {
        thunkAPI.dispatch(setLoading(false))
        throw e;
    }
});