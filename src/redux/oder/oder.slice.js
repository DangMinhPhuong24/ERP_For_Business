import { createSlice } from '@reduxjs/toolkit';
import {
    getOderListAction,
    deleteDataOderAction,
    getOderDetailAction,
    getListProductByCustomerId,
    getListAdjustmentVoucherByOrderAction,
    createAdjustmentVoucherByOrderAction,
    deleteDataAdjustmentVoucherByOrderAction,
    removeMessageErrorAction,
    getDetailAdjustmentVoucherByOrderAction,
    updateDataAdjustmentVoucherByOrderAction,
    getListCompensationVoucherByOrderAction,
    createCompensationVoucherByOrderAction,
    deleteDataCompensationVoucherByOrderAction,
    getDetailCompensationVoucherByOrderAction,
    updateDataCompensationVoucherByOrderAction,
    getKanBanOrderAction,
    getAllAddressBranchByCustomerIdAction,
    getAllProductWarehouseByProductManagementIdAction,
    getAllProductWarehouseSuggestionAction, getAllManufactureFormAction
} from "./oder.actions";

const oderSlice = createSlice({
    name: 'oder',
    initialState: {
        oderListState: [],
        productListState:[],
        adjustmentVoucherListState: [],
        compensationVoucherListState: [],
        adjustmentVoucherDetailState: [],
        compensationVoucherDetailState: [],
        oderDetailState: {},
        deleteOderSuccessMessage: null,
        deleteOderErrorMessage: null,
        createAdjustmentVoucherSuccessFlag: false,
        errorCreateAdjustmentVoucherMessage:"",
        deleteAdjustmentVoucherSuccessMessage: null,
        deleteAdjustmentVoucherErrorMessage: null,
        updateAdjustmentVoucherSuccessFlag: false,
        errorUpdateAdjustmentVoucherMessage:"",
        createCompensationVoucherSuccessFlag: false,
        errorCreateCompensationVoucherMessage:"",
        deleteCompensationVoucherSuccessMessage: null,
        deleteCompensationVoucherErrorMessage: null,
        updateCompensationVoucherSuccessFlag: false,
        errorUpdateCompensationVoucherMessage:"",
        listKanbanOrder: [],
        listAllBranchByCustomerId: [],
        listProductWarehouseByProductManagementId: [],
        listAllProductWarehouseSuggestion: [],
        listAllManufactureForm: [],
    },
    reducers: {
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setTotalPages(state, action) {
            state.totalPages = action.payload;
        },
        setAdjustmentVoucherCurrentPage(state, action) {
            state.adjustmentVoucherCurrentPage = action.payload;
        },
        setAdjustmentVoucherTotalPages(state, action) {
            state.adjustmentVoucherTotalPages = action.payload;
        },
        setCompensationVoucherCurrentPage(state, action) {
            state.compensationVoucherCurrentPage = action.payload;
        },
        setCompensationVoucherTotalPages(state, action) {
            state.compensationVoucherTotalPages = action.payload;
        },
        setDeleteMessageState: (state) => {
            state.deleteOderSuccessMessage = null;
            state.deleteOderErrorMessage = null;
            state.deleteAdjustmentVoucherSuccessMessage= null;
            state.deleteAdjustmentVoucherErrorMessage= null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOderListAction.pending, (state) => {
                state.oderListState = [];
            })
            .addCase(getOderListAction.fulfilled, (state, action) => {
                state.oderListState = action.payload;
            })
            .addCase(getOderListAction.rejected, (state, action) => {
                state.oderListState = [];
            })
            .addCase(getOderDetailAction.pending, (state) => {
                state.oderDetailState = [];
            })
            .addCase(getOderDetailAction.fulfilled, (state, action) => {
                state.oderDetailState = action.payload;
            })
            .addCase(deleteDataOderAction.pending, (state, action) => {
                state.deleteOderSuccessMessage = null;
            })
            .addCase(deleteDataOderAction.fulfilled, (state, action) => {
                state.deleteOderSuccessMessage = action.payload.message;
                state.deleteOderErrorMessage = "";
            })
            .addCase(deleteDataOderAction.rejected, (state, action) => {
                state.deleteOderErrorMessage = action.error?.message;
            })
            .addCase(getListProductByCustomerId.pending, (state) => {
                state.productListState = [];
            })
            .addCase(getListProductByCustomerId.fulfilled, (state, action) => {
                state.productListState = action.payload;
            })
            .addCase(getListProductByCustomerId.rejected, (state, action) => {
                state.productListState = [];
            })
            .addCase(getListAdjustmentVoucherByOrderAction.pending, (state) => {
                state.adjustmentVoucherListState = [];
            })
            .addCase(getListAdjustmentVoucherByOrderAction.fulfilled, (state, action) => {
                state.adjustmentVoucherListState = action.payload;
            })
            .addCase(getListAdjustmentVoucherByOrderAction.rejected, (state, action) => {
                state.adjustmentVoucherListState = [];
            })
            .addCase(createAdjustmentVoucherByOrderAction.pending, (state, action) => {
                state.createAdjustmentVoucherSuccessFlag = false;
            })
            .addCase(createAdjustmentVoucherByOrderAction.fulfilled, (state, action) => {
                state.createAdjustmentVoucherSuccessFlag = true;
                state.errorCreateAdjustmentVoucherMessage= "";
            })
            .addCase(createAdjustmentVoucherByOrderAction.rejected, (state, action) => {
                state.createAdjustmentVoucherSuccessFlag = false;
                state.errorCreateAdjustmentVoucherMessage = action.error?.message;
            })
            .addCase(removeMessageErrorAction.fulfilled, (state, action) => {
                state.errorCreateAdjustmentVoucherMessage = "";
                state.errorCreateCompensationVoucherMessage = "";
                state.errorUpdateAdjustmentVoucherMessage = "";
                state.errorUpdateCompensationVoucherMessage = "";
                state.listAllProductWarehouseSuggestion = [];
            })
            .addCase(deleteDataAdjustmentVoucherByOrderAction.pending, (state, action) => {
                state.deleteAdjustmentVoucherSuccessMessage = null;
            })
            .addCase(deleteDataAdjustmentVoucherByOrderAction.fulfilled, (state, action) => {
                state.deleteAdjustmentVoucherSuccessMessage = action.payload.message;
                state.deleteAdjustmentVoucherErrorMessage = "";
            })
            .addCase(deleteDataAdjustmentVoucherByOrderAction.rejected, (state, action) => {
                state.deleteAdjustmentVoucherErrorMessage = action.error?.message;
            })
            .addCase(getDetailAdjustmentVoucherByOrderAction.pending, (state) => {
                state.adjustmentVoucherDetailState = [];
            })
            .addCase(getDetailAdjustmentVoucherByOrderAction.fulfilled, (state, action) => {
                state.adjustmentVoucherDetailState = action.payload;
            })
            .addCase(getDetailAdjustmentVoucherByOrderAction.rejected, (state, action) => {
                state.adjustmentVoucherDetailState = [];
            })
            .addCase(updateDataAdjustmentVoucherByOrderAction.pending, (state, action) => {
                state.updateAdjustmentVoucherSuccessFlag = false;
            })
            .addCase(updateDataAdjustmentVoucherByOrderAction.fulfilled, (state, action) => {
                state.updateAdjustmentVoucherSuccessFlag = true;
                state.errorUpdateAdjustmentVoucherMessage= "";
            })
            .addCase(updateDataAdjustmentVoucherByOrderAction.rejected, (state, action) => {
                state.updateAdjustmentVoucherSuccessFlag = false;
                state.errorUpdateAdjustmentVoucherMessage = action.error?.message;
            })
            .addCase(getListCompensationVoucherByOrderAction.pending, (state) => {
                state.compensationVoucherListState = [];
            })
            .addCase(getListCompensationVoucherByOrderAction.fulfilled, (state, action) => {
                state.compensationVoucherListState = action.payload;
            })
            .addCase(getListCompensationVoucherByOrderAction.rejected, (state, action) => {
                state.compensationVoucherListState = [];
            })
            .addCase(createCompensationVoucherByOrderAction.pending, (state, action) => {
                state.createCompensationVoucherSuccessFlag = false;
            })
            .addCase(createCompensationVoucherByOrderAction.fulfilled, (state, action) => {
                state.createCompensationVoucherSuccessFlag = true;
                state.errorCreateCompensationVoucherMessage= "";
            })
            .addCase(createCompensationVoucherByOrderAction.rejected, (state, action) => {
                state.createCompensationVoucherSuccessFlag = false;
                state.errorCreateCompensationVoucherMessage = action.error?.message;
            })
            .addCase(deleteDataCompensationVoucherByOrderAction.pending, (state, action) => {
                state.deleteCompensationVoucherSuccessMessage = null;
            })
            .addCase(deleteDataCompensationVoucherByOrderAction.fulfilled, (state, action) => {
                state.deleteCompensationVoucherSuccessMessage = action.payload.message;
                state.deleteCompensationVoucherErrorMessage = "";
            })
            .addCase(deleteDataCompensationVoucherByOrderAction.rejected, (state, action) => {
                state.deleteCompensationVoucherErrorMessage = action.error?.message;
            })
            .addCase(getDetailCompensationVoucherByOrderAction.pending, (state) => {
                state.compensationVoucherDetailState = [];
            })
            .addCase(getDetailCompensationVoucherByOrderAction.fulfilled, (state, action) => {
                state.compensationVoucherDetailState = action.payload;
            })
            .addCase(getDetailCompensationVoucherByOrderAction.rejected, (state, action) => {
                state.compensationVoucherDetailState = [];
            })
            .addCase(updateDataCompensationVoucherByOrderAction.pending, (state, action) => {
                state.updateCompensationVoucherSuccessFlag = false;
            })
            .addCase(updateDataCompensationVoucherByOrderAction.fulfilled, (state, action) => {
                state.updateCompensationVoucherSuccessFlag = true;
                state.errorUpdateCompensationVoucherMessage= "";
            })
            .addCase(updateDataCompensationVoucherByOrderAction.rejected, (state, action) => {
                state.updateCompensationVoucherSuccessFlag = false;
                state.errorUpdateCompensationVoucherMessage = action.error?.message;
            })
            .addCase(getKanBanOrderAction.pending, (state, action) => {
                state.listKanbanOrder = [];
            })
            .addCase(getKanBanOrderAction.fulfilled, (state, action) => {
                state.listKanbanOrder = action.payload;
            })
            .addCase(getKanBanOrderAction.rejected, (state, action) => {
                state.listKanbanOrder = [];
            })
            .addCase(getAllAddressBranchByCustomerIdAction.pending, (state, action) => {
                state.listAllBranchByCustomerId = [];
            })
            .addCase(getAllAddressBranchByCustomerIdAction.fulfilled, (state, action) => {
                state.listAllBranchByCustomerId = action.payload;
            })
            .addCase(getAllAddressBranchByCustomerIdAction.rejected, (state, action) => {
                state.listAllBranchByCustomerId = [];
            })
            .addCase(getAllProductWarehouseByProductManagementIdAction.pending, (state, action) => {
                state.listProductWarehouseByProductManagementId = [];
            })
            .addCase(getAllProductWarehouseByProductManagementIdAction.fulfilled, (state, action) => {
                state.listProductWarehouseByProductManagementId = action.payload;
            })
            .addCase(getAllProductWarehouseByProductManagementIdAction.rejected, (state, action) => {
                state.listProductWarehouseByProductManagementId = [];
            })
           .addCase(getAllProductWarehouseSuggestionAction.pending, (state, action) => {
              state.listAllProductWarehouseSuggestion = [];
           })
           .addCase(getAllProductWarehouseSuggestionAction.fulfilled, (state, action) => {
              state.listAllProductWarehouseSuggestion = action.payload;
           })
           .addCase(getAllProductWarehouseSuggestionAction.rejected, (state, action) => {
              state.listAllProductWarehouseSuggestion = [];
           })
          .addCase(getAllManufactureFormAction.pending, (state, action) => {
              state.listAllManufactureForm = [];
          })
          .addCase(getAllManufactureFormAction.fulfilled, (state, action) => {
              state.listAllManufactureForm = action.payload;
          })
          .addCase(getAllManufactureFormAction.rejected, (state, action) => {
              state.listAllManufactureForm = [];
          })
    },
});
export const { setCurrentPage,
    setTotalPages, setDeleteMessageState,setAdjustmentVoucherTotalPages,setAdjustmentVoucherCurrentPage,setCompensationVoucherTotalPages,
    setCompensationVoucherCurrentPage
} = oderSlice.actions;
export default oderSlice;
