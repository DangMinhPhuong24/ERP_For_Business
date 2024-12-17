import {createAsyncThunk} from "@reduxjs/toolkit";
import {setLoading, setShowToast, setToastMessage, setToastIsSuccess} from "../app/app.slice";
import {
    getAllDashBoardSaleForSalesPeople,
    getListDashBoardCustomerWithDebts,
} from "../../repositories/remote/service/dashBoardService"
import { setCurrentPage,
    setTotalPages,
} from './dashboard.slice';
import {
    getDashBoardSaleForAdmin, getListTopBestSelling,
} from "../../repositories/remote/service/dashBoardService";

export const getListDashBoardDebtAction = createAsyncThunk('dashboard/getList', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
      const response = await getListDashBoardCustomerWithDebts(credential);
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setCurrentPage(response.current_page));
      thunkAPI.dispatch(setTotalPages(response.total_pages));
      return response.data;
  } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message);
  }
  });
export const getListDashBoardSaleForAdminAction = createAsyncThunk('dashboard/getListDashBoardSaleForAdmin', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getDashBoardSaleForAdmin(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        throw new Error(response.response.data.message);
    }
});

export const getListTopBestSellingAction = createAsyncThunk('dashboard/getListTopBestSelling', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getListTopBestSelling(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        throw new Error(response.response.data.message);
    }
});

export const getAllDashBoardSaleAction = createAsyncThunk('dashboard/getAll', async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
        const response = await getAllDashBoardSaleForSalesPeople(credential);
        thunkAPI.dispatch(setLoading(false))
        return response.data;
    } catch (response) {
        thunkAPI.dispatch(setLoading(false))
        throw new Error(response.response.data.message);
    }
});