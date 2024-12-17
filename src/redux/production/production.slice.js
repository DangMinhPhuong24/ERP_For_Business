import { createSlice } from '@reduxjs/toolkit'
import {
  getListOderForProductionManagementAction,
  getStatisticOderForProductionManagementAction,
  getListOrderStatusAction,
  getKanbanOderForProductionManagementAction,
  updateOrderWaitingManufactureToOrderWaitingCreatedAction,
  updateOrderWaitingCreatedToOrderWaitingManufactureAction,
  getListManufactureOrdersAction,
  getKanBanManufactureOrdersAction,
  getStatisticManufactureOrdersAction,
  getListPlanAction,
  getListAllOrderAction,
  getListMachinesAction,
  getListAllMachineTypeAction,
  getListAllWorkerArrangeAction,
  exportDataMachinesToExcelAction,
  createMachineAction,
  removeMessageErrorAction,
  deleteDataMachineAction,
  getDetailMachineAction,
  updateMachineAction,
  getAllSettingForManufactureManagementAction,
  updateSettingForManufactureManagementAction,
  getListHistoryMachineMaintenanceAction,
  getListHistoryMachineOperationAction,
  exportDataManufactureOrdersToExcelAction,
  getListWorkerAction,
  exportDataWorkerToExcelAction,
  getDetailWorkerAction,
  getListAllMachineAction,
  getListWorkerWorkHistoryAction,
  getListStatusForManufactureAction,
  getListWorkerAssignmentsAction
} from './production.actions'

const productionSlice = createSlice({
  name: 'production',
  initialState: {
    listOderForProductionManagement: [],
    statisticOderForProductionManagement: [],
    listOrderStatusAction: [],
    kanbanOderForProductionManagement: [],
    updateOrderWaitingManufactureToOrderWaitingCreated: false,
    errorUpdateOrderWaitingManufactureToOrderWaitingCreatedMessage: '',
    updateOrderWaitingCreatedToOrderWaitingManufacture: false,
    errorUpdateOrderWaitingCreatedToOrderWaitingManufactureMessage: '',
    listManufactureOrders: [],
    statisticManufactureOrders: [],
    kanbanManufactureOrders: [],
    listAllPlan: [],
    listAllMachine: [],
    listAllOrder: [],
    listMachines: [],
    listAllMachineType: [],
    listAllWorkerArrange: [],
    getDataExportFlag: false,
    dataMachineExport: [],
    getDataManufactureOrdersExportFlag: false,
    dataManufactureOrdersExport: [],
    createMachineFlag: false,
    errorCreateMachineMessage: '',
    deleteMachineFlag: false,
    errorDeleteMachineMessage: '',
    detailMachine: [],
    updateMachineFlag: false,
    errorUpdateMachineMessage: '',
    listHistoryMachineMaintenance: [],
    listHistoryMachineOperation: [],
    listSettingForManufactureManagement: [],
    updateSettingForManufactureManagement: false,
    errorUpdateSettingForManufactureManagementMessage: '',
    listWorker: [],
    dataWorkerExport: [],
    detailWorker: [],
    listWorkerWorkHistory: [],
    listStatusForManufacture: [],
    listWorkerAssignments: []
  },
  reducers: {
    setCurrentPageListOderForProductionManagement(state, action) {
      state.currentPageListOderForProductionManagement = action.payload
    },
    setTotalPagesListOderForProductionManagement(state, action) {
      state.totalPagesListOderForProductionManagement = action.payload
    },
    setCurrentPageListManufactureOrders(state, action) {
      state.currentPageListManufactureOrders = action.payload
    },
    setTotalPagesListManufactureOrders(state, action) {
      state.totalPagesListManufactureOrders = action.payload
    },
    setCurrentPageListMachines(state, action) {
      state.currentPageListMachines = action.payload
    },
    setTotalPagesListMachines(state, action) {
      state.totalPagesListMachines = action.payload
    },
    setDataExportFlag(state) {
      state.getDataExportFlag = false
      state.getDataManufactureOrdersExportFlag = false
    },
    setCurrentPageListHistoryMachineMaintenance(state, action) {
      state.currentPageListHistoryMachineMaintenance = action.payload
    },
    setTotalPagesListHistoryMachineMaintenance(state, action) {
      state.totalPagesListHistoryMachineMaintenance = action.payload
    },
    setCurrentPageListHistoryMachineOperation(state, action) {
      state.currentPageListHistoryMachineOperation = action.payload
    },
    setTotalPagesHistoryMachineOperation(state, action) {
      state.totalPagesListHistoryMachineOperation = action.payload
    },
    setCurrentPageListWorkers(state, action) {
      state.currentPageListWorkers = action.payload
    },
    setTotalPagesListWorkers(state, action) {
      state.totalPagesListWorkers = action.payload
    },
    setCurrentPageListWorkerWorkHistory(state, action) {
      state.currentPageListWorkerWorkHistory = action.payload
    },
    setTotalPagesListWorkerWorkHistory(state, action) {
      state.totalPagesListWorkerWorkHistory = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListOderForProductionManagementAction.pending, (state) => {
        state.listOderForProductionManagement = []
      })
      .addCase(getListOderForProductionManagementAction.fulfilled, (state, action) => {
        state.listOderForProductionManagement = action.payload
      })
      .addCase(getListOderForProductionManagementAction.rejected, (state, action) => {
        state.listOderForProductionManagement = []
      })
      .addCase(getStatisticOderForProductionManagementAction.pending, (state) => {
        state.statisticOderForProductionManagement = []
      })
      .addCase(getStatisticOderForProductionManagementAction.fulfilled, (state, action) => {
        state.statisticOderForProductionManagement = action.payload
      })
      .addCase(getStatisticOderForProductionManagementAction.rejected, (state, action) => {
        state.statisticOderForProductionManagement = []
      })
      .addCase(getListOrderStatusAction.pending, (state) => {
        state.listOrderStatusAction = []
      })
      .addCase(getListOrderStatusAction.fulfilled, (state, action) => {
        state.listOrderStatusAction = action.payload
      })
      .addCase(getListOrderStatusAction.rejected, (state, action) => {
        state.listOrderStatusAction = []
      })
      .addCase(getKanbanOderForProductionManagementAction.pending, (state) => {
        state.kanbanOderForProductionManagement = []
      })
      .addCase(getKanbanOderForProductionManagementAction.fulfilled, (state, action) => {
        state.kanbanOderForProductionManagement = action.payload
      })
      .addCase(getKanbanOderForProductionManagementAction.rejected, (state, action) => {
        state.kanbanOderForProductionManagement = []
      })
      .addCase(updateOrderWaitingManufactureToOrderWaitingCreatedAction.pending, (state, action) => {
        state.updateOrderWaitingManufactureToOrderWaitingCreated = false
      })
      .addCase(updateOrderWaitingManufactureToOrderWaitingCreatedAction.fulfilled, (state, action) => {
        state.updateOrderWaitingManufactureToOrderWaitingCreated = true
        state.errorUpdateOrderWaitingManufactureToOrderWaitingCreatedMessage = ''
      })
      .addCase(updateOrderWaitingManufactureToOrderWaitingCreatedAction.rejected, (state, action) => {
        state.updateOrderWaitingManufactureToOrderWaitingCreated = false
        state.errorUpdateOrderWaitingManufactureToOrderWaitingCreatedMessage = action.error?.message
      })
      .addCase(updateOrderWaitingCreatedToOrderWaitingManufactureAction.pending, (state, action) => {
        state.updateOrderWaitingCreatedToOrderWaitingManufacture = false
      })
      .addCase(updateOrderWaitingCreatedToOrderWaitingManufactureAction.fulfilled, (state, action) => {
        state.updateOrderWaitingCreatedToOrderWaitingManufacture = true
        state.errorUpdateOrderWaitingCreatedToOrderWaitingManufactureMessage = ''
      })
      .addCase(updateOrderWaitingCreatedToOrderWaitingManufactureAction.rejected, (state, action) => {
        state.updateOrderWaitingCreatedToOrderWaitingManufacture = false
        state.errorUpdateOrderWaitingCreatedToOrderWaitingManufactureMessage = action.error?.message
      })
      .addCase(getListManufactureOrdersAction.pending, (state) => {
        state.listManufactureOrders = []
      })
      .addCase(getListManufactureOrdersAction.fulfilled, (state, action) => {
        state.listManufactureOrders = action.payload
      })
      .addCase(getListManufactureOrdersAction.rejected, (state, action) => {
        state.listManufactureOrders = []
      })
      .addCase(getStatisticManufactureOrdersAction.pending, (state) => {
        state.statisticManufactureOrders = []
      })
      .addCase(getStatisticManufactureOrdersAction.fulfilled, (state, action) => {
        state.statisticManufactureOrders = action.payload
      })
      .addCase(getStatisticManufactureOrdersAction.rejected, (state, action) => {
        state.statisticManufactureOrders = []
      })
      .addCase(getKanBanManufactureOrdersAction.pending, (state) => {
        state.kanbanManufactureOrders = []
      })
      .addCase(getKanBanManufactureOrdersAction.fulfilled, (state, action) => {
        state.kanbanManufactureOrders = action.payload
      })
      .addCase(getKanBanManufactureOrdersAction.rejected, (state, action) => {
        state.kanbanManufactureOrders = []
      })
      .addCase(getListPlanAction.pending, (state) => {
        state.listAllPlan = []
      })
      .addCase(getListPlanAction.fulfilled, (state, action) => {
        state.listAllPlan = action.payload
      })
      .addCase(getListPlanAction.rejected, (state, action) => {
        state.listAllPlan = []
      })
      .addCase(getListAllOrderAction.pending, (state) => {
        state.listAllOrder = []
      })
      .addCase(getListAllOrderAction.fulfilled, (state, action) => {
        state.listAllOrder = action.payload
      })
      .addCase(getListAllOrderAction.rejected, (state, action) => {
        state.listAllOrder = []
      })
      .addCase(getListMachinesAction.pending, (state) => {
        state.listMachines = []
      })
      .addCase(getListMachinesAction.fulfilled, (state, action) => {
        state.listMachines = action.payload
      })
      .addCase(getListMachinesAction.rejected, (state, action) => {
        state.listMachines = []
      })
      .addCase(getListAllMachineTypeAction.pending, (state) => {
        state.listAllMachineType = []
      })
      .addCase(getListAllMachineTypeAction.fulfilled, (state, action) => {
        state.listAllMachineType = action.payload
      })
      .addCase(getListAllMachineTypeAction.rejected, (state, action) => {
        state.listAllMachineType = []
      })
      .addCase(getListAllWorkerArrangeAction.pending, (state) => {
        state.listAllWorkerArrange = []
      })
      .addCase(getListAllWorkerArrangeAction.fulfilled, (state, action) => {
        state.listAllWorkerArrange = action.payload
      })
      .addCase(getListAllWorkerArrangeAction.rejected, (state, action) => {
        state.listAllWorkerArrange = []
      })
      .addCase(exportDataMachinesToExcelAction.pending, (state) => {
        state.dataMachineExport = []
        state.getDataExportFlag = false
      })
      .addCase(exportDataMachinesToExcelAction.fulfilled, (state, action) => {
        state.dataMachineExport = action.payload
        state.getDataExportFlag = true
      })
      .addCase(exportDataMachinesToExcelAction.rejected, (state, action) => {
        state.dataMachineExport = []
        state.getDataExportFlag = false
      })
      .addCase(createMachineAction.pending, (state, action) => {
        state.createMachineFlag = false
      })
      .addCase(createMachineAction.fulfilled, (state, action) => {
        state.createMachineFlag = true
        state.errorCreateMachineMessage = ''
      })
      .addCase(createMachineAction.rejected, (state, action) => {
        state.createMachineFlag = false
        state.errorCreateMachineMessage = action.error?.message
      })
      .addCase(removeMessageErrorAction.fulfilled, (state, action) => {
        state.errorCreateMachineMessage = ''
        state.errorUpdateMachineMessage = ''
      })
      .addCase(deleteDataMachineAction.pending, (state, action) => {
        state.deleteMachineFlag = null
      })
      .addCase(deleteDataMachineAction.fulfilled, (state, action) => {
        state.deleteMachineFlag = action.payload.message
        state.errorDeleteMachineMessage = ''
      })
      .addCase(deleteDataMachineAction.rejected, (state, action) => {
        state.errorDeleteMachineMessage = action.error?.message
      })
      .addCase(getDetailMachineAction.pending, (state) => {
        state.detailMachine = []
      })
      .addCase(getDetailMachineAction.fulfilled, (state, action) => {
        state.detailMachine = action.payload
      })
      .addCase(getDetailMachineAction.rejected, (state, action) => {
        state.detailMachine = []
      })
      .addCase(updateMachineAction.pending, (state, action) => {
        state.updateMachineFlag = false
      })
      .addCase(updateMachineAction.fulfilled, (state, action) => {
        state.updateMachineFlag = true
        state.errorUpdateMachineMessage = ''
      })
      .addCase(updateMachineAction.rejected, (state, action) => {
        state.updateMachineFlag = false
        state.errorUpdateMachineMessage = action.error?.message
      })
      .addCase(getAllSettingForManufactureManagementAction.pending, (state) => {
        state.listSettingForManufactureManagement = []
      })
      .addCase(getAllSettingForManufactureManagementAction.fulfilled, (state, action) => {
        state.listSettingForManufactureManagement = action.payload
      })
      .addCase(getAllSettingForManufactureManagementAction.rejected, (state, action) => {
        state.listSettingForManufactureManagement = []
      })
      .addCase(updateSettingForManufactureManagementAction.pending, (state, action) => {
        state.updateSettingForManufactureManagement = false
      })
      .addCase(updateSettingForManufactureManagementAction.fulfilled, (state, action) => {
        state.updateSettingForManufactureManagement = true
        state.errorUpdateSettingForManufactureManagementMessage = ''
      })
      .addCase(updateSettingForManufactureManagementAction.rejected, (state, action) => {
        state.updateSettingForManufactureManagement = false
        state.errorUpdateSettingForManufactureManagementMessage = action.error?.message
      })
      .addCase(getListHistoryMachineMaintenanceAction.pending, (state) => {
        state.listHistoryMachineMaintenance = []
      })
      .addCase(getListHistoryMachineMaintenanceAction.fulfilled, (state, action) => {
        state.listHistoryMachineMaintenance = action.payload
      })
      .addCase(getListHistoryMachineMaintenanceAction.rejected, (state, action) => {
        state.listHistoryMachineMaintenance = []
      })
      .addCase(getListHistoryMachineOperationAction.pending, (state) => {
        state.listHistoryMachineOperation = []
      })
      .addCase(getListHistoryMachineOperationAction.fulfilled, (state, action) => {
        state.listHistoryMachineOperation = action.payload
      })
      .addCase(getListHistoryMachineOperationAction.rejected, (state, action) => {
        state.listHistoryMachineOperation = []
      })
      .addCase(exportDataManufactureOrdersToExcelAction.pending, (state) => {
        state.dataManufactureOrdersExport = []
        state.getDataManufactureOrdersExportFlag = false
      })
      .addCase(exportDataManufactureOrdersToExcelAction.fulfilled, (state, action) => {
        state.dataManufactureOrdersExport = action.payload
        state.getDataManufactureOrdersExportFlag = true
      })
      .addCase(exportDataManufactureOrdersToExcelAction.rejected, (state, action) => {
        state.dataManufactureOrdersExport = []
        state.getDataManufactureOrdersExportFlag = false
      })
      .addCase(getListWorkerAction.pending, (state) => {
        state.listWorker = []
      })
      .addCase(getListWorkerAction.fulfilled, (state, action) => {
        state.listWorker = action.payload
      })
      .addCase(getListWorkerAction.rejected, (state, action) => {
        state.listWorker = []
      })
      .addCase(exportDataWorkerToExcelAction.pending, (state) => {
        state.dataWorkerExport = []
        state.getDataExportFlag = false
      })
      .addCase(exportDataWorkerToExcelAction.fulfilled, (state, action) => {
        state.dataWorkerExport = action.payload
        state.getDataExportFlag = true
      })
      .addCase(exportDataWorkerToExcelAction.rejected, (state, action) => {
        state.dataWorkerExport = []
        state.getDataExportFlag = false
      })
      .addCase(getDetailWorkerAction.pending, (state) => {
        state.detailWorker = []
      })
      .addCase(getDetailWorkerAction.fulfilled, (state, action) => {
        state.detailWorker = action.payload
      })
      .addCase(getDetailWorkerAction.rejected, (state, action) => {
        state.detailWorker = []
      })
      .addCase(getListAllMachineAction.pending, (state) => {
        state.listAllMachine = []
      })
      .addCase(getListAllMachineAction.fulfilled, (state, action) => {
        state.listAllMachine = action.payload
      })
      .addCase(getListAllMachineAction.rejected, (state, action) => {
        state.listAllMachine = []
      })
      .addCase(getListWorkerWorkHistoryAction.pending, (state) => {
        state.listWorkerWorkHistory = []
      })
      .addCase(getListWorkerWorkHistoryAction.fulfilled, (state, action) => {
        state.listWorkerWorkHistory = action.payload
      })
      .addCase(getListWorkerWorkHistoryAction.rejected, (state, action) => {
        state.listWorkerWorkHistory = []
      })
      .addCase(getListStatusForManufactureAction.pending, (state) => {
        state.listStatusForManufacture = []
      })
      .addCase(getListStatusForManufactureAction.fulfilled, (state, action) => {
        state.listStatusForManufacture = action.payload
      })
      .addCase(getListStatusForManufactureAction.rejected, (state, action) => {
        state.listStatusForManufacture = []
      })
      .addCase(getListWorkerAssignmentsAction.pending, (state) => {
        state.listWorkerAssignments = []
      })
      .addCase(getListWorkerAssignmentsAction.fulfilled, (state, action) => {
        state.listWorkerAssignments = action.payload
      })
      .addCase(getListWorkerAssignmentsAction.rejected, (state, action) => {
        state.listWorkerAssignments = []
      })
  }
})
export const {
  setCurrentPageListOderForProductionManagement,
  setTotalPagesListOderForProductionManagement,
  setTotalPagesListManufactureOrders,
  setCurrentPageListManufactureOrders,
  setCurrentPageListMachines,
  setTotalPagesListMachines,
  setDataExportFlag,
  setCurrentPageListHistoryMachineMaintenance,
  setTotalPagesListHistoryMachineMaintenance,
  setCurrentPageListHistoryMachineOperation,
  setTotalPagesHistoryMachineOperation,
  setCurrentPageListWorkers,
  setTotalPagesListWorkers,
  setCurrentPageListWorkerWorkHistory,
  setTotalPagesListWorkerWorkHistory
} = productionSlice.actions
export default productionSlice
