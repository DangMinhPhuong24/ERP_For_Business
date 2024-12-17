import { createSlice } from '@reduxjs/toolkit';
import {
    getDebtGroupListAction,
    getDebtAgeListAction,
    getQuoteListAction,
    createDebtGroupAction,
    removeMessageErrorAction,
    createDebtAgeAction,
    getListProductAction,
    createQuoteAction,
    deleteDataDebtGroupConfigAction,
    deleteDataQuoteConfigAction,
    deleteDataDebtAgeConfigAction,
    updateDebtGroupAction,
    updateDebtAgeAction,
    updateQuoteAction,
} from './config.actions';

const configSlice = createSlice({
    name: 'config',
    initialState: {
        debtGroupListState: [],
        debtAgeListState: [],
        quoteListState: [],
        createDebtGroupSuccessFlag: false,
        errorCreateDebtGroupMessage: "",
        createDebtAgeSuccessFlag: false,
        errorCreateAgeGroupMessage: "",
        productListState: [],
        createQuoteSuccessFlag: false,
        errorCreateQuoteMessage: "",
        updateDebtGroupSuccessFlag: false,
        errorUpdateDebtGroupMessage: "",
        updateDebtAgeSuccessFlag: false,
        errorUpdateDebtAgeMessage: "",
        updateQuoteSuccessFlag: false,
        errorUpdateQuoteMessage: "",
        deleteDebtGroupConfigSuccessMessage: null,
        deleteDebtGroupConfigErrorMessage: null,
        deleteDebtAgeConfigSuccessMessage: null,
        deleteDebtAgeConfigErrorMessage: null,
        deleteQuoteConfigSuccessMessage: null,
        deleteQuoteConfigErrorMessage: null,
    },
    reducers: {
        setDebtGroupListPage(state, action) {
            state.debtGroupListPage = action.payload;
        },
        setDebtGroupTotalPages(state, action) {
            state.debtGroupTotalPages = action.payload;
        },
        setDebtAgeListPage(state, action) {
            state.debtAgeListPage = action.payload;
        },
        setDebtAgeTotalPages(state, action) {
            state.debtAgeTotalPages = action.payload;
        },
        setQuoteListPage(state, action) {
            state.quoteListPage = action.payload;
        },
        setQuoteListTotalPages(state, action) {
            state.quoteListTotalPages = action.payload;
        },
        setErrorMessageDebtGroupState(state, action) {
            state.errorMessageDebtGroup = action.payload;
        },
        setDeleteMessageState: (state) => {
            state.deleteDebtGroupConfigSuccessMessage = null;
            state.deleteDebtGroupConfigErrorMessage = null;
            state.deleteDebtAgeConfigSuccessMessage = null;
            state.deleteDebtAgeConfigErrorMessage = null;
            state.deleteQuoteConfigSuccessMessage = null;
            state.deleteQuoteConfigErrorMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDebtGroupListAction.pending, (state) => {
                state.debtGroupListState = [];
            })
            .addCase(getDebtGroupListAction.fulfilled, (state, action) => {
                state.debtGroupListState = action.payload;
            })
            .addCase(getDebtGroupListAction.rejected, (state, action) => {
                state.debtGroupListState = [];
            })
            .addCase(getDebtAgeListAction.pending, (state) => {
                state.debtAgeListState = [];
            })
            .addCase(getDebtAgeListAction.fulfilled, (state, action) => {
                state.debtAgeListState = action.payload;
            })
            .addCase(getDebtAgeListAction.rejected, (state, action) => {
                state.debtAgeListState = [];
            })
            .addCase(getQuoteListAction.pending, (state) => {
                state.quoteListState = [];
            })
            .addCase(getQuoteListAction.fulfilled, (state, action) => {
                state.quoteListState = action.payload;
            })
            .addCase(getQuoteListAction.rejected, (state, action) => {
                state.quoteListState = [];
            })
            .addCase(createDebtGroupAction.pending, (state) => {
                state.createDebtGroupSuccessFlag = false;
            })
            .addCase(createDebtGroupAction.fulfilled, (state, action) => {
                state.createDebtGroupSuccessFlag = true;
                state.errorCreateDebtGroupMessage = "";
            })
            .addCase(createDebtGroupAction.rejected, (state, action) => {
                state.createDebtGroupSuccessFlag = false;
                state.errorCreateDebtGroupMessage = action.error?.message;
            })
            .addCase(removeMessageErrorAction.fulfilled, (state, action) => {
                state.errorCreateDebtGroupMessage = "";
                state.errorCreateAgeGroupMessage = "";
                state.errorCreateQuoteMessage = "";
                state.errorMessageDebtGroup = "";
                state.errorUpdateDebtAgeMessage = "";
                state.errorUpdateQuoteMessage = "";

            })
            .addCase(createDebtAgeAction.pending, (state) => {
                state.createDebtAgeSuccessFlag = false;
            })
            .addCase(createDebtAgeAction.fulfilled, (state, action) => {
                state.createDebtAgeSuccessFlag = true;
                state.errorCreateAgeGroupMessage = "";
            })
            .addCase(createDebtAgeAction.rejected, (state, action) => {
                state.createDebtAgeSuccessFlag = false;
                state.errorCreateAgeGroupMessage = action.error?.message;
            })
            .addCase(getListProductAction.pending, (state) => {
                state.productListState = [];
            })
            .addCase(getListProductAction.fulfilled, (state, action) => {
                state.productListState = action.payload;
            })
            .addCase(getListProductAction.rejected, (state, action) => {
                state.productListState = [];
            })
            .addCase(createQuoteAction.pending, (state) => {
                state.createQuoteSuccessFlag = false;
            })
            .addCase(createQuoteAction.fulfilled, (state, action) => {
                state.createQuoteSuccessFlag = true;
                state.errorCreateQuoteMessage = "";
            })
            .addCase(createQuoteAction.rejected, (state, action) => {
                state.createQuoteSuccessFlag = false;
                state.errorCreateQuoteMessage = action.error?.message;
            })
            .addCase(deleteDataDebtGroupConfigAction.pending, (state, action) => {
                state.deleteDebtGroupConfigSuccessMessage = null;
            })
            .addCase(deleteDataDebtGroupConfigAction.fulfilled, (state, action) => {
                state.deleteDebtGroupConfigSuccessMessage = action.payload.message;
                state.deleteDebtGroupConfigErrorMessage = "";
            })
            .addCase(deleteDataDebtGroupConfigAction.rejected, (state, action) => {
                state.deleteDebtGroupConfigErrorMessage = action.error?.message;
            })
            .addCase(deleteDataQuoteConfigAction.pending, (state, action) => {
                state.deleteQuoteConfigSuccessMessage = null;
            })
            .addCase(deleteDataQuoteConfigAction.fulfilled, (state, action) => {
                state.deleteQuoteConfigSuccessMessage = action.payload.message;
                state.deleteQuoteConfigErrorMessage = "";
            })
            .addCase(deleteDataQuoteConfigAction.rejected, (state, action) => {
                state.deleteQuoteConfigErrorMessage = action.error?.message;
            })
            .addCase(deleteDataDebtAgeConfigAction.pending, (state, action) => {
                state.deleteDebtAgeConfigSuccessMessage = null;
            })
            .addCase(deleteDataDebtAgeConfigAction.fulfilled, (state, action) => {
                state.deleteDebtAgeConfigSuccessMessage = action.payload.message;
                state.deleteDebtAgeConfigErrorMessage = "";
            })
            .addCase(deleteDataDebtAgeConfigAction.rejected, (state, action) => {
                state.deleteDebtAgeConfigErrorMessage = action.error?.message;
            })
            .addCase(updateDebtGroupAction.pending, (state) => {
                state.updateDebtGroupSuccessFlag = false;
            })
            .addCase(updateDebtGroupAction.fulfilled, (state, action) => {
                state.updateDebtGroupSuccessFlag = true;
                state.errorUpdateDebtGroupMessage = "";
            })
            .addCase(updateDebtGroupAction.rejected, (state, action) => {
                state.updateDebtGroupSuccessFlag = false;
                state.errorUpdateDebtGroupMessage = action.error?.message;
            })
            .addCase(updateDebtAgeAction.pending, (state) => {
                state.updateDebtAgeSuccessFlag = false;
            })
            .addCase(updateDebtAgeAction.fulfilled, (state, action) => {
                state.updateDebtAgeSuccessFlag = true;
                state.errorUpdateDebtAgeMessage = "";
            })
            .addCase(updateDebtAgeAction.rejected, (state, action) => {
                state.updateDebtAgeSuccessFlag = false;
                state.errorUpdateDebtAgeMessage = action.error?.message;
            })
            .addCase(updateQuoteAction.pending, (state) => {
                state.updateQuoteSuccessFlag = false;
            })
            .addCase(updateQuoteAction.fulfilled, (state, action) => {
                state.updateQuoteSuccessFlag = true;
                state.errorUpdateQuoteMessage = "";
            })
            .addCase(updateQuoteAction.rejected, (state, action) => {
                state.updateQuoteSuccessFlag = false;
                state.errorUpdateQuoteMessage = action.error?.message;
            })
    },
});
export const { setDebtGroupListPage, setDebtGroupTotalPages, setDebtAgeListPage,
    setDebtAgeTotalPages, setQuoteListPage, setQuoteListTotalPages,
    setDeleteMessageState, setErrorMessageDebtGroupState,
} = configSlice.actions;
export default configSlice;