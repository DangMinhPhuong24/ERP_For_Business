import { createSlice } from '@reduxjs/toolkit'
import {
  createPurchaseOrdersAction,
  deletePurchaseOrderAction,
  getAllProductBySupplierAction,
  getAllProductManagementByPurchaseOrderId,
  getAllProductWithTrashedAction,
  getAllPurchaseOrdersStatusAction,
  getAllPurchaseOrderStatusCreateAction,
  getAllPurchaseOrderStatusUpdateAction,
  getDetailPurchaseOrderAction,
  getDetailPurchaseOrderForUpdateAction,
  getDetailSupplierNoPermissionAction,
  getEditWarehouseImportOrderAction,
  getListOrderedProductAction,
  getListProductManagementByPurchaseOrderId,
  getListPurchaseOrderAction, getListPurchaseOrderAlertAction,
  getListPurchaseOrderCodeOrdered, getListSupplierTaxesBySupplierIdAction,
  getListWarehouseImportOrder,
  getProductInfoByCodeAndSupplierIdAction,
  getProductInfoByCodeAndSupplierIdForQuickOrderAction,
  removeMessageErrorPurchaseModuleAction,
  updatePurchaseOrdersAction,
} from './purchase.action'

const purchaseOrderSlice = createSlice({
  name: 'purchaseOrder',
  initialState: {
    detailPurchaseOrder: {},
    detailPurchaseOrderForUpdate: {},
    listAllStatusCreate: [],
    listAllStatusUpdate: [],
    listAllProductBySupplier: [],
    listProductInfo: [],
    listProductInfomationForQuickOrder: [],
    createPurchaseOrderSuccessFlag: false,
    updatePurchaseOrderSuccessFlag: false,
    listPurchaseOrder: [],
    listAllPurchaseOrderStatus: [],
    deletePurchaseOrderSuccessMessage: false,
    deletePurchaseOrderErrorMessage: false,
    listWarehouseImportOrder: [],
    purchaseOrderData: [],
    totalPageOfWarehouseImportOrder: 1,
    listPurchaseOrderCodeOrdered: [],
    listProductManagementByPurchaseOrderId: [],
    listAllProductManagementByPurchaseOrderId: [],
    detailSupplierById: [],
    getAllProductWithTrashed: [],
    editDataWarehouseImportOrder: [],
    getListOrderedProduct: [],
    getListPurchaseOrderAlert: [],
    getListSupplierTaxesBySupplierId: [],
  },
  reducers: {
    setCurrentPageQuotationList(state, action) {
      state.currentPageQuotationList = action.payload
    },
    setTotalPagesQuotationList(state, action) {
      state.totalPagesQuotationList = action.payload
    },
    setTotalPagesListPurchaseOrder(state, action) {
      state.totalPagesListPurchaseOrder = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailPurchaseOrderAction.pending, (state) => {
        state.detailPurchaseOrder = {}
      })
      .addCase(getDetailPurchaseOrderAction.fulfilled, (state, action) => {
        state.detailPurchaseOrder = action.payload
      })
      .addCase(getDetailPurchaseOrderAction.rejected, (state, action) => {
        state.detailPurchaseOrder = {}
      })
      .addCase(getDetailPurchaseOrderForUpdateAction.pending, (state) => {
        state.detailPurchaseOrderForUpdate = {}
      })
      .addCase(getDetailPurchaseOrderForUpdateAction.fulfilled, (state, action) => {
        state.detailPurchaseOrderForUpdate = action.payload
      })
      .addCase(getDetailPurchaseOrderForUpdateAction.rejected, (state, action) => {
        state.detailPurchaseOrderForUpdate = {}
      })
      .addCase(getAllPurchaseOrderStatusCreateAction.pending, (state) => {
        state.listAllStatusCreate = []
      })
      .addCase(getAllPurchaseOrderStatusCreateAction.fulfilled, (state, action) => {
        state.listAllStatusCreate = action.payload
      })
      .addCase(getAllPurchaseOrderStatusCreateAction.rejected, (state, action) => {
        state.listAllStatusCreate = []
      })
      .addCase(getAllPurchaseOrderStatusUpdateAction.pending, (state) => {
        state.listAllStatusUpdate = []
      })
      .addCase(getAllPurchaseOrderStatusUpdateAction.fulfilled, (state, action) => {
        state.listAllStatusUpdate = action.payload
      })
      .addCase(getAllPurchaseOrderStatusUpdateAction.rejected, (state, action) => {
        state.listAllStatusUpdate = []
      })
      .addCase(getAllProductBySupplierAction.pending, (state) => {
        state.listAllProductBySupplier = []
      })
      .addCase(getAllProductBySupplierAction.fulfilled, (state, action) => {
        state.listAllProductBySupplier = action.payload
      })
      .addCase(getAllProductBySupplierAction.rejected, (state, action) => {
        state.listAllProductBySupplier = []
      })
      .addCase(getProductInfoByCodeAndSupplierIdAction.pending, (state) => {
        state.listProductInfo = []
      })
      .addCase(getProductInfoByCodeAndSupplierIdAction.fulfilled, (state, action) => {
        state.listProductInfo = action.payload
      })
      .addCase(getProductInfoByCodeAndSupplierIdAction.rejected, (state, action) => {
        state.listProductInfo = []
      })
      .addCase(getProductInfoByCodeAndSupplierIdForQuickOrderAction.pending, (state) => {
        state.listProductInfomationForQuickOrder = []
      })
      .addCase(getProductInfoByCodeAndSupplierIdForQuickOrderAction.fulfilled, (state, action) => {
        state.listProductInfomationForQuickOrder = action.payload
      })
      .addCase(getProductInfoByCodeAndSupplierIdForQuickOrderAction.rejected, (state, action) => {
        state.listProductInfomationForQuickOrder = []
      })
      .addCase(createPurchaseOrdersAction.pending, (state) => {
        state.createPurchaseOrderSuccessFlag = false
        state.purchaseOrderData = []
      })
      .addCase(createPurchaseOrdersAction.fulfilled, (state, action) => {
        state.createPurchaseOrderSuccessFlag = true
        state.purchaseOrderData = action.payload
      })
      .addCase(createPurchaseOrdersAction.rejected, (state, action) => {
        state.createPurchaseOrderSuccessFlag = false
        state.purchaseOrderData = []
      })
      .addCase(updatePurchaseOrdersAction.pending, (state) => {
        state.updatePurchaseOrderSuccessFlag = false
      })
      .addCase(updatePurchaseOrdersAction.fulfilled, (state, action) => {
        state.updatePurchaseOrderSuccessFlag = true
      })
      .addCase(updatePurchaseOrdersAction.rejected, (state, action) => {
        state.updatePurchaseOrderSuccessFlag = false
      })
      .addCase(removeMessageErrorPurchaseModuleAction.fulfilled, (state, action) => {
        state.createPurchaseOrderSuccessFlag = false
        state.updatePurchaseOrderSuccessFlag = false
      })
      .addCase(getListPurchaseOrderAction.pending, (state) => {
        state.listPurchaseOrder = []
      })
      .addCase(getListPurchaseOrderAction.fulfilled, (state, action) => {
        state.listPurchaseOrder = action.payload
      })
      .addCase(getListPurchaseOrderAction.rejected, (state, action) => {
        state.listPurchaseOrder = []
      })
      .addCase(getAllPurchaseOrdersStatusAction.pending, (state) => {
        state.listAllPurchaseOrderStatus = []
      })
      .addCase(getAllPurchaseOrdersStatusAction.fulfilled, (state, action) => {
        state.listAllPurchaseOrderStatus = action.payload
      })
      .addCase(getAllPurchaseOrdersStatusAction.rejected, (state, action) => {
        state.listAllPurchaseOrderStatus = []
      })
      .addCase(deletePurchaseOrderAction.pending, (state) => {
        state.deletePurchaseOrderSuccessMessage = false
        state.deletePurchaseOrderErrorMessage = false
      })
      .addCase(deletePurchaseOrderAction.fulfilled, (state, action) => {
        state.deletePurchaseOrderSuccessMessage = action.payload.message
        state.deletePurchaseOrderErrorMessage = false
      })
      .addCase(deletePurchaseOrderAction.rejected, (state, action) => {
        state.deletePurchaseOrderSuccessMessage = true
        state.deletePurchaseOrderErrorMessage = action.error?.message
      })
      .addCase(getListWarehouseImportOrder.fulfilled, (state, action) => {
        state.listWarehouseImportOrder = action.payload.data
        state.totalPageOfWarehouseImportOrder = action.payload.total_pages
      })
      .addCase(getListWarehouseImportOrder.rejected, (state) => {
        state.listWarehouseImportOrder = []
      })
      .addCase(getListPurchaseOrderCodeOrdered.fulfilled, (state, action) => {
        state.listPurchaseOrderCodeOrdered = action.payload
      })
      .addCase(getListPurchaseOrderCodeOrdered.rejected, (state, action) => {
        state.listPurchaseOrderCodeOrdered = []
      })
      .addCase(getListProductManagementByPurchaseOrderId.fulfilled, (state, action) => {
        state.listProductManagementByPurchaseOrderId = action.payload
      })
      .addCase(getListProductManagementByPurchaseOrderId.rejected, (state, action) => {
        state.listProductManagementByPurchaseOrderId = []
      })
      .addCase(getAllProductManagementByPurchaseOrderId.fulfilled, (state, action) => {
        state.listAllProductManagementByPurchaseOrderId = action.payload
      })
      .addCase(getAllProductManagementByPurchaseOrderId.rejected, (state, action) => {
        state.listAllProductManagementByPurchaseOrderId = []
      })
      .addCase(getDetailSupplierNoPermissionAction.pending, (state) => {
        state.detailSupplierById = []
      })
      .addCase(getDetailSupplierNoPermissionAction.fulfilled, (state, action) => {
        state.detailSupplierById = action.payload
      })
      .addCase(getDetailSupplierNoPermissionAction.rejected, (state, action) => {
        state.detailSupplierById = []
      })
      .addCase(getAllProductWithTrashedAction.pending, (state) => {
        state.getAllProductWithTrashed = []
      })
      .addCase(getAllProductWithTrashedAction.fulfilled, (state, action) => {
        state.getAllProductWithTrashed = action.payload
      })
      .addCase(getAllProductWithTrashedAction.rejected, (state, action) => {
        state.getAllProductWithTrashed = []
      })
      .addCase(getEditWarehouseImportOrderAction.fulfilled, (state, action) => {
        state.editDataWarehouseImportOrder = action.payload
      })
      .addCase(getEditWarehouseImportOrderAction.rejected, (state, action) => {
        state.editDataWarehouseImportOrder = []
      })
      .addCase(getListOrderedProductAction.pending, (state) => {
        state.getListOrderedProduct = []
      })
      .addCase(getListOrderedProductAction.fulfilled, (state, action) => {
        state.getListOrderedProduct = action.payload
      })
      .addCase(getListOrderedProductAction.rejected, (state, action) => {
        state.getListOrderedProduct = []
      })
      .addCase(getListPurchaseOrderAlertAction.pending, (state) => {
        state.getListPurchaseOrderAlert = []
      })
      .addCase(getListPurchaseOrderAlertAction.fulfilled, (state, action) => {
        state.getListPurchaseOrderAlert = action.payload
      })
      .addCase(getListPurchaseOrderAlertAction.rejected, (state, action) => {
        state.getListPurchaseOrderAlert = []
      })
      .addCase(getListSupplierTaxesBySupplierIdAction.pending, (state) => {
        state.getListSupplierTaxesBySupplierId = []
      })
      .addCase(getListSupplierTaxesBySupplierIdAction.fulfilled, (state, action) => {
        state.getListSupplierTaxesBySupplierId = action.payload
      })
      .addCase(getListSupplierTaxesBySupplierIdAction.rejected, (state, action) => {
        state.getListSupplierTaxesBySupplierId = []
      })
  }
})
export const { setCurrentPageQuotationList, setTotalPagesQuotationList, setTotalPagesListPurchaseOrder } =
  purchaseOrderSlice.actions
export default purchaseOrderSlice
