/* eslint-disable no-param-reassign */
/* redux-toolkit create slice with Immer reducer, no need "immutable" reducer here */
import { createSlice } from "@reduxjs/toolkit"
import { getAllDashBoardSaleAction, getListDashBoardDebtAction } from "./dashboard.actions"
import {getListDashBoardSaleForAdminAction,getListTopBestSellingAction
} from "./dashboard.actions";

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        dashboardDebtListState: [],
        dashboardSaleForSalesPeopleState: [],
        listDashBoardSaleForAdmin: [],
        listTopBestSelling: [],
    },
    reducers: {
        setCurrentPage (state, action) {
            state.currentPage = action.payload
        },
        setTotalPages (state, action) {
            state.totalPages = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListDashBoardDebtAction.pending, (state) => {
                state.dashboardDebtListState = []
            })
            .addCase(getListDashBoardDebtAction.fulfilled, (state, action) => {
                state.dashboardDebtListState = action.payload
            })
            .addCase(getListDashBoardDebtAction.rejected, (state, action) => {
                state.dashboardDebtListState = []
            })
            .addCase(getAllDashBoardSaleAction.pending, (state) => {
                state.dashboardSaleForSalesPeopleState = []
            })
            .addCase(getAllDashBoardSaleAction.fulfilled, (state, action) => {
                state.dashboardSaleForSalesPeopleState = action.payload
            })
            .addCase(getAllDashBoardSaleAction.rejected, (state, action) => {
                state.dashboardSaleForSalesPeopleState = []
            })
            .addCase(getListDashBoardSaleForAdminAction.pending, (state, action) => {
                state.listDashBoardSaleForAdmin = [];
            })
            .addCase(getListDashBoardSaleForAdminAction.fulfilled, (state, action) => {
                state.listDashBoardSaleForAdmin = action.payload;
            })
            .addCase(getListDashBoardSaleForAdminAction.rejected, (state, action) => {
                state.listDashBoardSaleForAdmin = [];
            })
            .addCase(getListTopBestSellingAction.pending, (state, action) => {
                state.listTopBestSelling = [];
            })
            .addCase(getListTopBestSellingAction.fulfilled, (state, action) => {
                state.listTopBestSelling = action.payload;
            })
            .addCase(getListTopBestSellingAction.rejected, (state, action) => {
                state.listTopBestSelling = [];
            })
    },
})
export const {
    setCurrentPage,
    setTotalPages,
} = dashboardSlice.actions
export default dashboardSlice
