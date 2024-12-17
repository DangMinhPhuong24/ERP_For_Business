/* eslint-disable no-param-reassign */
/* redux-toolkit create slice with Immer reducer, no need "immutable" reducer here */
import { createSlice } from '@reduxjs/toolkit';
import {
    createProposalDebtAgeAction,
    getAllProposalStatusAction,
    getDetailProposalDebtAgeAction, getDetailProposalPurchaseOrderAction,
    getDetailProposalQuotationAction,
    getListProposalDebtAgeAction, getListProposalPurchaseOrderAction,
    getListProposalQuotationAction,
    getStatisticProposalAction,
    updateApproveProposalDebtAgeAction, updateApproveProposalPurchaseOrderAction,
    updateApproveProposalQuotationAction
} from "./proposal.actions";
import dimensions from "../../constants/dimensions";


const proposalSlice = createSlice({
    name: 'proposal',
    initialState: {
        currentPage: dimensions.table.defaultCurrentPage,
        totalPages: dimensions.table.defaultTotalPages,
        proposalDebtAgeList: [],
        listAllProposalStatus: [],
        proposalQuotationList: [],
        listStatisticProposal: [],
        createProposalDebtAgeSuccessFlag: false,
        listDetailProposalDebtAge: [],
        updateApproveProposalDebtAgeSuccessFlag: false,
        errorUpdateApproveProposalDebtAgeMessage:"",
        listDetailProposalQuotation:[],
        updateApproveProposalQuotationSuccessFlag: false,
        errorUpdateApproveProposalQuotationMessage:"",
        listProposalPurchaseOrder: [],
        detailProposalPurchaseOrder: [],
        updateApproveProposalPurchaseOrderFlag: false,
        errorUpdateApproveProposalPurchaseOrderMessage: "",
    },
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setTotalPages(state, action) {
            state.totalPages = action.payload;
        },
        setCurrentPageQuotationList(state, action) {
            state.currentPageQuotationList = action.payload;
        },
        setTotalPagesQuotationList(state, action) {
            state.totalPagesQuotationList = action.payload;
        },
        setTotalPagesPurchaseOrderList(state, action) {
            state.totalPagesPurchaseOrderList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListProposalDebtAgeAction.pending, (state) => {
                state.proposalDebtAgeList = [];
            })
            .addCase(getListProposalDebtAgeAction.fulfilled, (state, action) => {
                state.proposalDebtAgeList = action.payload;
            })
            .addCase(getListProposalDebtAgeAction.rejected, (state, action) => {
                state.proposalDebtAgeList = [];
            })
            .addCase(getAllProposalStatusAction.pending, (state) => {
                state.listAllProposalStatus = [];
            })
            .addCase(getAllProposalStatusAction.fulfilled, (state, action) => {
                state.listAllProposalStatus = action.payload;
            })
            .addCase(getAllProposalStatusAction.rejected, (state, action) => {
                state.listAllProposalStatus = [];
            })
            .addCase(getListProposalQuotationAction.pending, (state) => {
                state.proposalQuotationList = [];
            })
            .addCase(getListProposalQuotationAction.fulfilled, (state, action) => {
                state.proposalQuotationList = action.payload;
            })
            .addCase(getListProposalQuotationAction.rejected, (state, action) => {
                state.proposalQuotationList = [];
            })
            .addCase(getStatisticProposalAction.pending, (state) => {
                state.listStatisticProposal = [];
            })
            .addCase(getStatisticProposalAction.fulfilled, (state, action) => {
                state.listStatisticProposal = action.payload;
            })
            .addCase(getStatisticProposalAction.rejected, (state, action) => {
                state.listStatisticProposal = [];
            })
            .addCase(createProposalDebtAgeAction.pending, (state) => {
                state.createProposalDebtAgeSuccessFlag = false;
            })
            .addCase(createProposalDebtAgeAction.fulfilled, (state, action) => {
                state.createProposalDebtAgeSuccessFlag = true;
            })
            .addCase(createProposalDebtAgeAction.rejected, (state, action) => {
                state.createProposalDebtAgeSuccessFlag = false;
            })
            .addCase(getDetailProposalDebtAgeAction.pending, (state) => {
                state.listDetailProposalDebtAge = [];
            })
            .addCase(getDetailProposalDebtAgeAction.fulfilled, (state, action) => {
                state.listDetailProposalDebtAge = action.payload;
            })
            .addCase(getDetailProposalDebtAgeAction.rejected, (state, action) => {
                state.listDetailProposalDebtAge = [];
            })
            .addCase(updateApproveProposalDebtAgeAction.pending, (state, action) => {
                state.updateApproveProposalDebtAgeSuccessFlag = false;
            })
            .addCase(updateApproveProposalDebtAgeAction.fulfilled, (state, action) => {
                state.updateApproveProposalDebtAgeSuccessFlag = true;
                state.errorUpdateApproveProposalDebtAgeMessage= "";
            })
            .addCase(updateApproveProposalDebtAgeAction.rejected, (state, action) => {
                state.updateApproveProposalDebtAgeSuccessFlag = false;
                state.errorUpdateApproveProposalDebtAgeMessage = action.error?.message;
            })
            .addCase(updateApproveProposalPurchaseOrderAction.pending, (state, action) => {
                state.updateApproveProposalPurchaseOrderFlag = false;
            })
            .addCase(updateApproveProposalPurchaseOrderAction.fulfilled, (state, action) => {
                state.updateApproveProposalPurchaseOrderFlag = true;
                state.errorUpdateApproveProposalPurchaseOrderMessage= "";
            })
            .addCase(updateApproveProposalPurchaseOrderAction.rejected, (state, action) => {
                state.updateApproveProposalPurchaseOrderFlag = false;
                state.errorUpdateApproveProposalPurchaseOrderMessage = action.error?.message;
            })
            .addCase(getDetailProposalQuotationAction.pending, (state) => {
                state.listDetailProposalQuotation = [];
            })
            .addCase(getDetailProposalQuotationAction.fulfilled, (state, action) => {
                state.listDetailProposalQuotation = action.payload;
            })
            .addCase(getDetailProposalQuotationAction.rejected, (state, action) => {
                state.listDetailProposalQuotation = [];
            })
            .addCase(updateApproveProposalQuotationAction.pending, (state, action) => {
                state.updateApproveProposalQuotationSuccessFlag = false;
            })
            .addCase(updateApproveProposalQuotationAction.fulfilled, (state, action) => {
                state.updateApproveProposalQuotationSuccessFlag = true;
                state.errorUpdateApproveProposalQuotationMessage= "";
            })
            .addCase(updateApproveProposalQuotationAction.rejected, (state, action) => {
                state.updateApproveProposalQuotationSuccessFlag = false;
                state.errorUpdateApproveProposalQuotationMessage = action.error?.message;
            })
            .addCase(getListProposalPurchaseOrderAction.pending, (state) => {
                state.listProposalPurchaseOrder = [];
            })
            .addCase(getListProposalPurchaseOrderAction.fulfilled, (state, action) => {
                state.listProposalPurchaseOrder = action.payload;
            })
            .addCase(getListProposalPurchaseOrderAction.rejected, (state) => {
                state.listProposalPurchaseOrder = [];
            })
            .addCase(getDetailProposalPurchaseOrderAction.pending, (state) => {
                state.detailProposalPurchaseOrder = [];
            })
            .addCase(getDetailProposalPurchaseOrderAction.fulfilled, (state, action) => {
                state.detailProposalPurchaseOrder = action.payload;
            })
            .addCase(getDetailProposalPurchaseOrderAction.rejected, (state) => {
                state.detailProposalPurchaseOrder = [];
            })
    },
});
export const {
    setCurrentPage,
    setTotalPages,
    setCurrentPageQuotationList,
    setTotalPagesQuotationList,
    setTotalPagesPurchaseOrderList,
} = proposalSlice.actions;
export default proposalSlice;