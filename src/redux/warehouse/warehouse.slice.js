import { createSlice } from '@reduxjs/toolkit'
import {
  getListWarehousesAction,
  getStatisticWarehouseAction,
  getStatisticWarehouseLocationAction,
  getListWarehousesLocationAction,
  getListAllWarehouseAction,
  getProductDetailAction,
  updateProductConfigAction,
  getLocationDetailAction,
  getListProductByWarehouseLocationIdAction,
  exportDataProductByWarehouseLocationIdToExcelAction,
  createWarehouseLocationAction,
  deleteWarehouseLocationAction,
  updateWarehouseLocationAction,
  removeMessageErrorAction,
  getAllWarehouseLocationAction,
  createWarehouseAction,
  getDetailWarehouseAction,
  updateWarehouseAction,
  deleteWarehouseAction,
  getKanbanWarehouseImportOrdersAction,
  getDetailWarehouseImportOrdersAction,
  getKanbanWarehouseExportOrdersAction,
  getDetailWarehouseExportOrdersAction,
  getFormationHistoryByProductAction,
  getListOrderAlertAction,
  getListDataPieChartWarehouseTraffic,
  getListDataBarChartWarehouseTraffic,
  getListDataTopInventory,
  getListDataLongestInventory,
  getListDataTableInventory, getListWarehouseExportQROrdersAction
} from './warehouse.actions'

const warehouseSlice = createSlice({
  name: 'warehouse',
  initialState: {
    deleteLocationErrorMessage: '',
    statisticWarehouseListState: [],
    listWarehouses: [],
    statisticWarehouseLocationListState: [],
    listWarehousesLocationState: [],
    listAllWarehousesState: [],
    productDetailState: {},
    updateProductConfigSuccessMessage: false,
    errorProductConfigSuccessMessage: '',
    locationDetailState: {},
    listProductByLocationIdState: [],
    getDataExportFlag: false,
    createWarehouseLocationSuccessFlag: false,
    deleteLocationSuccessMessage: false,
    updateLocationSuccessMessage: false,
    errorWarehouseLocationMessage: '',
    getListAllWarehouseState: [],
    kanbanWarehouseImportOrdersState: [],
    //WAREHOUSE
    createWarehouseSuccessFlag: false,
    errorCreateWarehouseMessage: '',
    detailWarehouseState: {},
    updateWarehouseSuccessFlag: false,
    errorUpdateWarehouseMessage: '',
    errorWarehouseSuccessMessage: '',
    deleteWarehouseSuccessFlag: false,
    deleteWarehouseErrorMessage: '',
    detailWarehouseImportOrdersState: {},
    detailWarehouseExportOrdersState: {},
    listWarehouseExportOrdersState: [],
    listFormationHistoryByProductState: [],
    listOrderAlert: [],
    //DASHBOARD
    listDataPieChartWarehouseTraffic: [],
    listDataBarChartWarehouseTraffic: [],
    listDataTopInventory: [],
    listDataLongestInventory: [],
    listDataTableInventory: [],
    totalPageTableInventory: 1,
    listWarehouseExportQROrders: [],
    exportProductDataByLocationId: [],
  },
  reducers: {
    setListWarehousesCurrentPage(state, action) {
      state.currentPageListWarehouses = action.payload
    },
    setListWarehousesTotalPages(state, action) {
      state.totalPagesListWarehouses = action.payload
    },
    setListWarehousesLocationCurrentPage(state, action) {
      state.currentPageListWarehousesLocation = action.payload
    },
    setListWarehousesLocationTotalPages(state, action) {
      state.totalPagesListWarehousesLocation = action.payload
    },
    setListProductByLocationIdCurrentPage(state, action) {
      state.currentPageListProductByLocationId = action.payload
    },
    setListProductByLocationIdTotalPages(state, action) {
      state.totalPagesListProductByLocationId = action.payload
    },
    setDataExportFlag(state) {
      state.getDataExportFlag = false
    },
    setListFormationHistoryByProductCurrentPage(state, action) {
      state.currentPageListFormationHistoryByProduct = action.payload
    },
    setListFormationHistoryByProductTotalPages(state, action) {
      state.totalPagesListFormationHistoryByProduct = action.payload
    },
    setListOrderAlertCurrentPage(state, action) {
      state.currentPageListOrderAlert = action.payload
    },
    setListOrderAlertTotalPages(state, action) {
      state.totalPagesListOrderAlert = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatisticWarehouseAction.pending, (state) => {
        state.statisticWarehouseListState = []
      })
      .addCase(getStatisticWarehouseAction.fulfilled, (state, action) => {
        state.statisticWarehouseListState = action.payload
      })
      .addCase(getStatisticWarehouseAction.rejected, (state, action) => {
        state.statisticWarehouseListState = []
      })
      .addCase(getListWarehousesAction.pending, (state) => {
        state.listWarehouses = []
      })
      .addCase(getListWarehousesAction.fulfilled, (state, action) => {
        state.listWarehouses = action.payload
      })
      .addCase(getListWarehousesAction.rejected, (state, action) => {
        state.listWarehouses = []
      })
      .addCase(getStatisticWarehouseLocationAction.pending, (state) => {
        state.statisticWarehouseLocationListState = []
      })
      .addCase(getStatisticWarehouseLocationAction.fulfilled, (state, action) => {
        state.statisticWarehouseLocationListState = action.payload
      })
      .addCase(getStatisticWarehouseLocationAction.rejected, (state, action) => {
        state.statisticWarehouseLocationListState = []
      })
      .addCase(getListWarehousesLocationAction.pending, (state) => {
        state.listWarehousesLocationState = []
      })
      .addCase(getListWarehousesLocationAction.fulfilled, (state, action) => {
        state.listWarehousesLocationState = action.payload
      })
      .addCase(getListWarehousesLocationAction.rejected, (state, action) => {
        state.listWarehousesLocationState = []
      })
      .addCase(getListAllWarehouseAction.pending, (state) => {
        state.listAllWarehousesState = []
      })
      .addCase(getListAllWarehouseAction.fulfilled, (state, action) => {
        state.listAllWarehousesState = action.payload
      })
      .addCase(getListAllWarehouseAction.rejected, (state, action) => {
        state.listAllWarehousesState = []
      })
      .addCase(getProductDetailAction.pending, (state) => {
        state.productDetailState = []
      })
      .addCase(getProductDetailAction.fulfilled, (state, action) => {
        state.productDetailState = action.payload
      })
      .addCase(getProductDetailAction.rejected, (state, action) => {
        state.productDetailState = []
      })
      .addCase(updateProductConfigAction.pending, (state, action) => {
        state.updateProductConfigSuccessMessage = false
      })
      .addCase(updateProductConfigAction.fulfilled, (state, action) => {
        state.updateProductConfigSuccessMessage = true
        state.errorProductConfigSuccessMessage = ''
      })
      .addCase(updateProductConfigAction.rejected, (state, action) => {
        state.updateProductConfigSuccessMessage = false
        state.errorProductConfigSuccessMessage = action.error?.message
      })
      .addCase(getLocationDetailAction.pending, (state) => {
        state.locationDetailState = []
      })
      .addCase(getLocationDetailAction.fulfilled, (state, action) => {
        state.locationDetailState = action.payload
      })
      .addCase(getLocationDetailAction.rejected, (state, action) => {
        state.locationDetailState = []
      })
      .addCase(getListProductByWarehouseLocationIdAction.pending, (state) => {
        state.listProductByLocationIdState = []
      })
      .addCase(getListProductByWarehouseLocationIdAction.fulfilled, (state, action) => {
        state.listProductByLocationIdState = action.payload
      })
      .addCase(getListProductByWarehouseLocationIdAction.rejected, (state, action) => {
        state.listProductByLocationIdState = []
      })
      .addCase(exportDataProductByWarehouseLocationIdToExcelAction.pending, (state) => {
        state.exportProductDataByLocationId = []
        state.getDataExportFlag = false
      })
      .addCase(exportDataProductByWarehouseLocationIdToExcelAction.fulfilled, (state, action) => {
        state.exportProductDataByLocationId = action.payload
        state.getDataExportFlag = true
      })
      .addCase(exportDataProductByWarehouseLocationIdToExcelAction.rejected, (state, action) => {
        state.getDataExportFlag = false
      })
      .addCase(createWarehouseLocationAction.pending, (state) => {
        state.createWarehouseLocationSuccessFlag = false
      })
      .addCase(createWarehouseLocationAction.fulfilled, (state, action) => {
        state.createWarehouseLocationSuccessFlag = true
      })
      .addCase(createWarehouseLocationAction.rejected, (state, action) => {
        state.createWarehouseLocationSuccessFlag = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.errorWarehouseLocationMessage = errorMessage
      })
      .addCase(deleteWarehouseLocationAction.pending, (state, action) => {
        state.deleteLocationSuccessMessage = null
      })
      .addCase(deleteWarehouseLocationAction.fulfilled, (state, action) => {
        state.deleteLocationSuccessMessage = true
        state.deleteLocationErrorMessage = ''
      })
      .addCase(deleteWarehouseLocationAction.rejected, (state, action) => {
        state.deleteLocationErrorMessage = action.error?.message
      })
      .addCase(updateWarehouseLocationAction.pending, (state, action) => {
        state.updateLocationSuccessMessage = false
      })
      .addCase(updateWarehouseLocationAction.fulfilled, (state, action) => {
        state.updateLocationSuccessMessage = true
        state.errorWarehouseLocationMessage = ''
      })
      .addCase(updateWarehouseLocationAction.rejected, (state, action) => {
        state.updateLocationSuccessMessage = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.errorWarehouseLocationMessage = errorMessage
      })
      .addCase(removeMessageErrorAction.fulfilled, (state, action) => {
        state.errorWarehouseLocationMessage = ''
        state.errorCreateWarehouseMessage = ''
        state.errorUpdateWarehouseMessage = ''
      })
      .addCase(getAllWarehouseLocationAction.pending, (state) => {
        state.getListAllWarehouseState = []
      })
      .addCase(getAllWarehouseLocationAction.fulfilled, (state, action) => {
        state.getListAllWarehouseState = action.payload
      })
      .addCase(getAllWarehouseLocationAction.rejected, (state, action) => {
        state.getListAllWarehouseState = []
      })
      .addCase(createWarehouseAction.pending, (state) => {
        state.createWarehouseSuccessFlag = false
      })
      .addCase(createWarehouseAction.fulfilled, (state, action) => {
        state.createWarehouseSuccessFlag = true
        state.errorCreateWarehouseMessage = ''
      })
      .addCase(createWarehouseAction.rejected, (state, action) => {
        state.createWarehouseSuccessFlag = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.errorCreateWarehouseMessage = errorMessage
      })
      .addCase(getDetailWarehouseAction.pending, (state) => {
        state.detailWarehouseState = {}
      })
      .addCase(getDetailWarehouseAction.fulfilled, (state, action) => {
        state.detailWarehouseState = action.payload
      })
      .addCase(getDetailWarehouseAction.rejected, (state, action) => {
        state.detailWarehouseState = {}
      })
      .addCase(updateWarehouseAction.pending, (state, action) => {
        state.updateWarehouseSuccessFlag = false
      })
      .addCase(updateWarehouseAction.fulfilled, (state, action) => {
        state.updateWarehouseSuccessFlag = true
        state.errorUpdateWarehouseMessage = ''
      })
      .addCase(updateWarehouseAction.rejected, (state, action) => {
        state.updateWarehouseSuccessFlag = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.errorUpdateWarehouseMessage = errorMessage
      })
      .addCase(deleteWarehouseAction.pending, (state, action) => {
        state.deleteWarehouseSuccessFlag = false
      })
      .addCase(deleteWarehouseAction.fulfilled, (state, action) => {
        state.deleteWarehouseSuccessFlag = true
        state.deleteWarehouseErrorMessage = ''
      })
      .addCase(deleteWarehouseAction.rejected, (state, action) => {
        state.deleteWarehouseErrorMessage = action.error?.message
      })
      .addCase(getKanbanWarehouseImportOrdersAction.pending, (state) => {
        state.kanbanWarehouseImportOrdersState = []
      })
      .addCase(getKanbanWarehouseImportOrdersAction.fulfilled, (state, action) => {
        state.kanbanWarehouseImportOrdersState = action.payload
      })
      .addCase(getKanbanWarehouseImportOrdersAction.rejected, (state, action) => {
        state.kanbanWarehouseImportOrdersState = []
      })
      .addCase(getDetailWarehouseImportOrdersAction.pending, (state) => {
        state.detailWarehouseImportOrdersState = {}
      })
      .addCase(getDetailWarehouseImportOrdersAction.fulfilled, (state, action) => {
        state.detailWarehouseImportOrdersState = action.payload
      })
      .addCase(getDetailWarehouseImportOrdersAction.rejected, (state, action) => {
        state.detailWarehouseImportOrdersState = {}
      })
      .addCase(getDetailWarehouseExportOrdersAction.pending, (state) => {
        state.detailWarehouseExportOrdersState = {}
      })
      .addCase(getDetailWarehouseExportOrdersAction.fulfilled, (state, action) => {
        state.detailWarehouseExportOrdersState = action.payload
      })
      .addCase(getDetailWarehouseExportOrdersAction.rejected, (state, action) => {
        state.detailWarehouseExportOrdersState = {}
      })
      .addCase(getKanbanWarehouseExportOrdersAction.pending, (state) => {
        state.listWarehouseExportOrdersState = []
      })
      .addCase(getKanbanWarehouseExportOrdersAction.fulfilled, (state, action) => {
        state.listWarehouseExportOrdersState = action.payload
      })
      .addCase(getKanbanWarehouseExportOrdersAction.rejected, (state, action) => {
        state.listWarehouseExportOrdersState = []
      })
      .addCase(getFormationHistoryByProductAction.pending, (state) => {
        state.listFormationHistoryByProductState = []
      })
      .addCase(getFormationHistoryByProductAction.fulfilled, (state, action) => {
        state.listFormationHistoryByProductState = action.payload
      })
      .addCase(getFormationHistoryByProductAction.rejected, (state, action) => {
        state.listFormationHistoryByProductState = []
      })
      .addCase(getListOrderAlertAction.pending, (state) => {
        state.listOrderAlert = []
      })
      .addCase(getListOrderAlertAction.fulfilled, (state, action) => {
        state.listOrderAlert = action.payload
      })
      .addCase(getListOrderAlertAction.rejected, (state, action) => {
        state.listOrderAlert = []
      })
      .addCase(getListDataPieChartWarehouseTraffic.fulfilled, (state, action) => {
        state.listDataPieChartWarehouseTraffic = action.payload
      })
      .addCase(getListDataPieChartWarehouseTraffic.rejected, (state, action) => {
        state.listDataPieChartWarehouseTraffic = []
      })
      .addCase(getListDataBarChartWarehouseTraffic.fulfilled, (state, action) => {
        state.listDataBarChartWarehouseTraffic = action.payload
      })
      .addCase(getListDataBarChartWarehouseTraffic.rejected, (state, action) => {
        state.listDataBarChartWarehouseTraffic = []
      })
      .addCase(getListDataTopInventory.fulfilled, (state, action) => {
        state.listDataTopInventory = action.payload
      })
      .addCase(getListDataTopInventory.rejected, (state, action) => {
        state.listDataTopInventory = []
      })
      .addCase(getListDataLongestInventory.fulfilled, (state, action) => {
        state.listDataLongestInventory = action.payload
      })
      .addCase(getListDataLongestInventory.rejected, (state, action) => {
        state.listDataLongestInventory = []
      })
      .addCase(getListDataTableInventory.fulfilled, (state, action) => {
        state.listDataTableInventory = action.payload.data
        state.totalPageTableInventory = action.payload.total_pages
      })
      .addCase(getListDataTableInventory.rejected, (state, action) => {
        state.listDataTableInventory = []
        state.totalPageTableInventory = 1
      })
      .addCase(getListWarehouseExportQROrdersAction.pending, (state) => {
        state.listWarehouseExportQROrders = []
      })
      .addCase(getListWarehouseExportQROrdersAction.fulfilled, (state, action) => {
        state.listWarehouseExportQROrders = action.payload
      })
      .addCase(getListWarehouseExportQROrdersAction.rejected, (state, action) => {
        state.listWarehouseExportQROrders = []
      })
  }
})
export const {
  setListWarehousesCurrentPage,
  setListWarehousesTotalPages,
  setListWarehousesLocationCurrentPage,
  setListWarehousesLocationTotalPages,
  setListProductByLocationIdCurrentPage,
  setListProductByLocationIdTotalPages,
  setDataExportFlag,
  setListFormationHistoryByProductCurrentPage,
  setListFormationHistoryByProductTotalPages,
  setListOrderAlertCurrentPage,
  setListOrderAlertTotalPages
} = warehouseSlice.actions
export default warehouseSlice
