import { createAsyncThunk } from '@reduxjs/toolkit'
import { setLoading, setShowToast, setToastMessage, setToastIsSuccess } from '../app/app.slice'
import {
  createWarehouse,
  createWarehouseLocation,
  deleteWarehouse,
  deleteWarehouseLocation,
  exportDataProductByWarehouseLocationIdToExcel,
  getDetailWarehouse,
  getListAllWarehouse,
  getListProductByWarehouseLocationId,
  GetListWarehouses,
  GetListWarehousesLocation,
  getLocationDetail,
  getProductDetail,
  GetStatisticWarehouse,
  GetStatisticWarehouseLocation,
  updateProductConfig,
  updateWarehouse,
  updateWarehouseLocation,
  getAllWarehouseLocation,
  getKanbanWarehouseImportOrders,
  getDetailWarehouseImportOrders,
  getKanbanWarehouseExportOrders,
  getDetailWarehouseExportOrders,
  getFormationHistoryByProduct,
  getListOrderAlert,
  getListDataPieChartWarehouseTrafficService,
  getListDataBarChartWarehouseTrafficService,
  getDetailProductsInventoryService,
  getListDataTopInventoryService,
  getListDataLongestInventoryService, getListWarehouseExportQROrders
} from '../../repositories/remote/service/warehouseService'
import {
  setListWarehousesCurrentPage,
  setListWarehousesTotalPages,
  setListWarehousesLocationCurrentPage,
  setListWarehousesLocationTotalPages,
  setListProductByLocationIdCurrentPage,
  setListProductByLocationIdTotalPages,
  setListFormationHistoryByProductTotalPages,
  setListFormationHistoryByProductCurrentPage,
  setListOrderAlertCurrentPage,
  setListOrderAlertTotalPages,
  setDataExportFlag
} from '../warehouse/warehouse.slice'

export const getStatisticWarehouseAction = createAsyncThunk(
  'warehouse/getStatisticWarehouse',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await GetStatisticWarehouse(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getListWarehousesAction = createAsyncThunk('warehouse/getListWarehouses', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await GetListWarehouses(credential)
    thunkAPI.dispatch(setListWarehousesCurrentPage(response.current_page))
    thunkAPI.dispatch(setListWarehousesTotalPages(response.total_pages))
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getStatisticWarehouseLocationAction = createAsyncThunk(
  'warehouse/getStatisticWarehouseLocation',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await GetStatisticWarehouseLocation(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getListWarehousesLocationAction = createAsyncThunk(
  'warehouse/getListWarehousesLocation',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await GetListWarehousesLocation(credential)
      thunkAPI.dispatch(setListWarehousesLocationCurrentPage(response.current_page))
      thunkAPI.dispatch(setListWarehousesLocationTotalPages(response.total_pages))
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getListAllWarehouseAction = createAsyncThunk(
  'warehouse/getListAllWarehouse',
  async (credential, thunkAPI) => {
    try {
      const response = await getListAllWarehouse(credential)
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const getProductDetailAction = createAsyncThunk('warehouse/getProductDetail', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getProductDetail(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (e) {
    thunkAPI.dispatch(setLoading(false))
    throw e
  }
})

export const getFormationHistoryByProductAction = createAsyncThunk(
  'warehouse/getFormationHistoryByProduct',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getFormationHistoryByProduct(credential)
      thunkAPI.dispatch(setListFormationHistoryByProductCurrentPage(response.current_page))
      thunkAPI.dispatch(setListFormationHistoryByProductTotalPages(response.total_pages))
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const updateProductConfigAction = createAsyncThunk(
  'warehouse/updateProductConfig',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await updateProductConfig(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.response.data.message))
      thunkAPI.dispatch(setToastIsSuccess(false))
    }
  }
)

export const getLocationDetailAction = createAsyncThunk('warehouse/getLocationDetail', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getLocationDetail(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (e) {
    thunkAPI.dispatch(setLoading(false))
    throw e
  }
})

export const getListProductByWarehouseLocationIdAction = createAsyncThunk(
  'warehouse/getListProductByWarehouseLocationId',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListProductByWarehouseLocationId(credential)
      thunkAPI.dispatch(setListProductByLocationIdCurrentPage(response.current_page))
      thunkAPI.dispatch(setListProductByLocationIdTotalPages(response.total_pages))
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const exportDataProductByWarehouseLocationIdToExcelAction = createAsyncThunk(
  'warehouse/exportDataProductByWarehouseLocationIdToExcel',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await exportDataProductByWarehouseLocationIdToExcel(credential)
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const updateStatusDataExportProductByWarehouseLocationIdFlagAction = createAsyncThunk(
  'warehouse/updateStatusDataExportProductByWarehouseLocationId',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setDataExportFlag())
  }
)

export const createWarehouseLocationAction = createAsyncThunk(
  'warehouse/createWarehouseLocation',
  async (credential, thunkAPI) => {
    try {
      const response = await createWarehouseLocation(credential)
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response.data
    } catch (response) {
      throw new Error(JSON.stringify(response.response.data.message))
    }
  }
)

export const updateWarehouseLocationAction = createAsyncThunk(
  'warehouse/updateWarehouseLocation',
  async (credential, thunkAPI) => {
    try {
      const response = await updateWarehouseLocation(credential)
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response.data
    } catch (response) {
      throw new Error(JSON.stringify(response.response.data.message))
    }
  }
)

export const deleteWarehouseLocationAction = createAsyncThunk(
  'warehouse/deleteWarehouseLocation',
  async (credential, thunkAPI) => {
    try {
      const response = await deleteWarehouseLocation(credential)
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const removeMessageErrorAction = createAsyncThunk(
  'warehouse/removeMessageError',
  async (credential, thunkAPI) => {
    return true
  }
)

//WAREHOUSE NEW

export const createWarehouseAction = createAsyncThunk('warehouse/createWarehouse', async (credential, thunkAPI) => {
  try {
    const response = await createWarehouse(credential)
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response.data
  } catch (response) {
    throw new Error(JSON.stringify(response.response.data.message))
  }
})

export const getDetailWarehouseAction = createAsyncThunk(
  'warehouse/getDetailWarehouse',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getDetailWarehouse(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const updateWarehouseAction = createAsyncThunk('warehouse/updateWarehouse', async (credential, thunkAPI) => {
  try {
    const response = await updateWarehouse(credential)
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response.data
  } catch (response) {
    throw new Error(JSON.stringify(response.response.data.message))
  }
})

export const deleteWarehouseAction = createAsyncThunk('warehouse/deleteWarehouse', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await deleteWarehouse(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.response.data.message))
    thunkAPI.dispatch(setToastIsSuccess(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllWarehouseLocationAction = createAsyncThunk(
  'warehouse/getAllWarehouseLocation',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllWarehouseLocation(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getKanbanWarehouseImportOrdersAction = createAsyncThunk(
  'warehouse/getKanbanWarehouseImportOrders',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getKanbanWarehouseImportOrders(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getDetailWarehouseImportOrdersAction = createAsyncThunk(
  'warehouse/getDetailWarehouseImportOrders',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getDetailWarehouseImportOrders(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getDetailWarehouseExportOrdersAction = createAsyncThunk(
  'warehouse/getDetailWarehouseExportOrders',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getDetailWarehouseExportOrders(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getListWarehouseExportQROrdersAction = createAsyncThunk(
  'warehouse/getListWarehouseExportQROrders',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListWarehouseExportQROrders(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getKanbanWarehouseExportOrdersAction = createAsyncThunk(
  'warehouse/getKanbanWarehouseExportOrders',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getKanbanWarehouseExportOrders(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getListOrderAlertAction = createAsyncThunk('warehouse/getListOrderAlert', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getListOrderAlert(credential)
    thunkAPI.dispatch(setListOrderAlertCurrentPage(response.current_page))
    thunkAPI.dispatch(setListOrderAlertTotalPages(response.total_pages))
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (e) {
    thunkAPI.dispatch(setLoading(false))
    throw e
  }
})

//Warehouse dashboard

export const getListDataPieChartWarehouseTraffic = createAsyncThunk(
  'warehouse/getListDataPieChartWarehouseTraffic',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListDataPieChartWarehouseTrafficService(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getListDataBarChartWarehouseTraffic = createAsyncThunk(
  'warehouse/getListDataBarChartWarehouseTraffic',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListDataBarChartWarehouseTrafficService(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getListDataTopInventory = createAsyncThunk(
  'warehouse/getListDataTopInventory',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListDataTopInventoryService(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getListDataLongestInventory = createAsyncThunk(
  'warehouse/getListDataLongestInventory',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListDataLongestInventoryService(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getListDataTableInventory = createAsyncThunk(
  'warehouse/getListDataTableInventory',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getDetailProductsInventoryService(credential)
      thunkAPI.dispatch(setLoading(false))
      return response
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)
