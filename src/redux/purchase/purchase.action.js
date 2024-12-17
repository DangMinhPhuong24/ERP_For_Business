import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  createPurchaseOrders,
  createWarehouseImportOrderService,
  deletePurchaseOrder,
  getAllProductBySupplier,
  getAllProductManagementByPurchaseOrderIdService,
  getAllProductWithTrashed,
  getAllPurchaseOrdersStatus,
  getAllPurchaseOrderStatusCreate,
  getAllPurchaseOrderStatusUpdate,
  getDetailPurchaseOrder,
  getDetailPurchaseOrderForUpdate,
  getDetailSupplierNoPermission,
  getEditWarehouseImportOrderService,
  getListOrderedProduct,
  getListProductManagementByPurchaseOrderIdService,
  getListPurchaseOrder, getListPurchaseOrderAlert,
  getListPurchaseOrderCodeOrderedService, getListSupplierTaxesBySupplierId,
  getListWarehouseImportOrderService,
  getProductInfoByCodeAndSupplierId,
  updatePurchaseOrders,
  updateWarehouseImportOrderService
} from '../../repositories/remote/service/purchaseOrderService'
import { setLoading, setShowToast, setToastIsSuccess, setToastMessage } from '../app/app.slice'
import { setTotalPagesListPurchaseOrder } from '../purchase/purchase.slice'

export const getDetailPurchaseOrderAction = createAsyncThunk(
  'purchaseOrder/getDetailPurchaseOrder',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getDetailPurchaseOrder(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)
export const getDetailPurchaseOrderForUpdateAction = createAsyncThunk(
  'purchaseOrder/getDetailPurchaseOrderForUpdate',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getDetailPurchaseOrderForUpdate(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)
export const getListPurchaseOrderAction = createAsyncThunk(
  'purchaseOrder/getListPurchaseOrder',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListPurchaseOrder(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setTotalPagesListPurchaseOrder(response.total_pages))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllPurchaseOrdersStatusAction = createAsyncThunk(
  'purchaseOrder/getAllPurchaseOrdersStatus',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllPurchaseOrdersStatus(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)
export const getAllPurchaseOrderStatusCreateAction = createAsyncThunk(
  'purchase/getAllPurchaseOrderStatusCreate',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllPurchaseOrderStatusCreate(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
export const getAllPurchaseOrderStatusUpdateAction = createAsyncThunk(
  'purchase/getAllPurchaseOrderStatusUpdate',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllPurchaseOrderStatusUpdate(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
export const getAllProductBySupplierAction = createAsyncThunk(
  'purchase/getAllProductBySupplier',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllProductBySupplier(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
export const getProductInfoByCodeAndSupplierIdAction = createAsyncThunk(
  'purchase/getProductInfoByCodeAndSupplierId',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getProductInfoByCodeAndSupplierId(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getProductInfoByCodeAndSupplierIdForQuickOrderAction = createAsyncThunk(
  'purchase/listProductInfomationForQuickOrder',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getProductInfoByCodeAndSupplierId(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)


export const createPurchaseOrdersAction = createAsyncThunk(
  'purchase/createPurchaseOrders',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await createPurchaseOrders(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(false))
      throw new Error(response.response.data.message)
    }
  }
)
export const updatePurchaseOrdersAction = createAsyncThunk(
  'purchase/updatePurchaseOrders',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await updatePurchaseOrders(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(false))
      throw new Error(response.response.data.message)
    }
  }
)
export const removeMessageErrorPurchaseModuleAction = createAsyncThunk(
  'purchase/removeMessageError',
  async (credential, thunkAPI) => {
    return true
  }
)

export const deletePurchaseOrderAction = createAsyncThunk(
  'purchaseOrder/deletePurchaseOrder',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await deletePurchaseOrder(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.response.data.message.id[0]))
      thunkAPI.dispatch(setToastIsSuccess(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getListWarehouseImportOrder = createAsyncThunk(
  'warehouse/getListWarehouseImportOrder',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListWarehouseImportOrderService(credential)
      thunkAPI.dispatch(setLoading(false))
      return response
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getListPurchaseOrderCodeOrdered = createAsyncThunk(
  'warehouse/getListPurchaseOrderCodeOrdered',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListPurchaseOrderCodeOrderedService(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getListProductManagementByPurchaseOrderId = createAsyncThunk(
  'warehouse/getListProductManagementByPurchaseOrderId',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListProductManagementByPurchaseOrderIdService(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getAllProductManagementByPurchaseOrderId = createAsyncThunk(
  'warehouse/getAllProductManagementByPurchaseOrderId',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllProductManagementByPurchaseOrderIdService(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const createWarehouseImportOrder = createAsyncThunk(
  'warehouse/createWarehouseImportOrder',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await createWarehouseImportOrderService(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.response.data.message.id[0]))
      thunkAPI.dispatch(setToastIsSuccess(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const updateWarehouseImportOrder = createAsyncThunk(
  'warehouse/updateWarehouseImportOrder',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await updateWarehouseImportOrderService(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.response.data.message.id[0]))
      thunkAPI.dispatch(setToastIsSuccess(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getDetailSupplierNoPermissionAction = createAsyncThunk(
  'purchaseOrder/getDetailSupplierNoPermission',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getDetailSupplierNoPermission(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllProductWithTrashedAction = createAsyncThunk(
  'purchaseOrder/getAllProductWithTrashed',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllProductWithTrashed(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getEditWarehouseImportOrderAction = createAsyncThunk(
  'purchaseOrder/getEditWarehouseImportOrderAction',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getEditWarehouseImportOrderService(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getListOrderedProductAction = createAsyncThunk(
  'purchaseOrder/getListOrderedProduct',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListOrderedProduct(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getListPurchaseOrderAlertAction = createAsyncThunk(
  'purchaseOrder/getListPurchaseOrderAlert',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListPurchaseOrderAlert(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getListSupplierTaxesBySupplierIdAction = createAsyncThunk(
  'purchaseOrder/getListSupplierTaxesBySupplierId',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListSupplierTaxesBySupplierId(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)