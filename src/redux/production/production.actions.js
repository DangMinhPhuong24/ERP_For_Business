import { createAsyncThunk } from '@reduxjs/toolkit'
import { setLoading, setShowToast, setToastIsSuccess, setToastMessage } from '../app/app.slice'
import {
  setCurrentPageListOderForProductionManagement,
  setTotalPagesListOderForProductionManagement,
  setCurrentPageListManufactureOrders,
  setTotalPagesListManufactureOrders,
  setCurrentPageListMachines,
  setTotalPagesListMachines,
  setDataExportFlag,
  setCurrentPageListHistoryMachineMaintenance,
  setTotalPagesListHistoryMachineMaintenance,
  setCurrentPageListHistoryMachineOperation,
  setTotalPagesHistoryMachineOperation,
  setTotalPagesListWorkers,
  setCurrentPageListWorkers,
  setCurrentPageListWorkerWorkHistory,
  setTotalPagesListWorkerWorkHistory
} from './production.slice'
import {
  getListOderForProductionManagement,
  getListOrderStatus,
  getStatisticOderForProductionManagement,
  getKanbanOderForProductionManagement,
  updateOrderWaitingManufactureToOrderWaitingCreated,
  updateOrderWaitingCreatedToOrderWaitingManufacture,
  getListManufactureOrders,
  getStatisticManufactureOrders,
  getKanBanManufactureOrders,
  getListPlan,
  getListAllOrder,
  getAllSettingForManufactureManagement,
  getListMachines,
  getListAllMachineType,
  getListAllWorkerArrange,
  exportDataMachinesToExcel,
  createMachine,
  deleteMachine,
  getDetailMachine,
  updateMachine,
  updateSettingForManufactureManagement,
  getListHistoryMachineMaintenance,
  getListHistoryMachineOperation,
  exportDataManufactureOrdersToExcel,
  getListWorker,
  exportDataWorkerToExcel,
  getDetailWorker,
  getListAllMachine,
  getListWorkerWorkHistory,
  getListStatusForManufacture,
  getListWorkerAssignments
} from '../../repositories/remote/service/productionService'

export const getListOderForProductionManagementAction = createAsyncThunk(
  'production/getListOderForProductionManagement',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListOderForProductionManagement(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setCurrentPageListOderForProductionManagement(response.current_page))
      thunkAPI.dispatch(setTotalPagesListOderForProductionManagement(response.total_pages))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getStatisticOderForProductionManagementAction = createAsyncThunk(
  'production/getStatisticOderForProductionManagement',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getStatisticOderForProductionManagement(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getListOrderStatusAction = createAsyncThunk(
  'production/getListOrderStatus',
  async (credential, thunkAPI) => {
    try {
      const response = await getListOrderStatus(credential)
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)
export const getListStatusForManufactureAction = createAsyncThunk(
  'production/getListStatusForManufacture',
  async (credential, thunkAPI) => {
    try {
      const response = await getListStatusForManufacture(credential)
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const getKanbanOderForProductionManagementAction = createAsyncThunk(
  'production/getKanbanOderForProductionManagement',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getKanbanOderForProductionManagement(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const updateOrderWaitingManufactureToOrderWaitingCreatedAction = createAsyncThunk(
  'production/updateOrderWaitingManufactureToOrderWaitingCreated',
  async (credential, thunkAPI) => {
    try {
      const response = await updateOrderWaitingManufactureToOrderWaitingCreated(credential)
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response
    } catch (response) {
      throw new Error(response.response.data.message)
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.response.data.message))
      thunkAPI.dispatch(setToastIsSuccess(false))
    }
  }
)

export const updateOrderWaitingCreatedToOrderWaitingManufactureAction = createAsyncThunk(
  'production/updateOrderWaitingCreatedToOrderWaitingManufacture',
  async (credential, thunkAPI) => {
    try {
      const response = await updateOrderWaitingCreatedToOrderWaitingManufacture(credential)
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response
    } catch (response) {
      throw new Error(response.response.data.message)
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.response.data.message))
      thunkAPI.dispatch(setToastIsSuccess(false))
    }
  }
)

export const getListManufactureOrdersAction = createAsyncThunk(
  'production/getListManufactureOrders',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListManufactureOrders(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setCurrentPageListManufactureOrders(response.current_page))
      thunkAPI.dispatch(setTotalPagesListManufactureOrders(response.total_pages))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getStatisticManufactureOrdersAction = createAsyncThunk(
  'production/getStatisticManufactureOrders',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getStatisticManufactureOrders(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getKanBanManufactureOrdersAction = createAsyncThunk(
  'production/getKanBanManufactureOrders',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getKanBanManufactureOrders(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getListPlanAction = createAsyncThunk('production/getListPlan', async (credential, thunkAPI) => {
  try {
    const response = await getListPlan(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})
export const getListAllOrderAction = createAsyncThunk('production/getListAllOrder', async (credential, thunkAPI) => {
  try {
    const response = await getListAllOrder(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})
export const getAllSettingForManufactureManagementAction = createAsyncThunk(
  'production/getAllSettingForManufactureManagement',
  async (credential, thunkAPI) => {
    try {
      const response = await getAllSettingForManufactureManagement(credential)
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const getListMachinesAction = createAsyncThunk('production/getListMachines', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getListMachines(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setCurrentPageListMachines(response.current_page))
    thunkAPI.dispatch(setTotalPagesListMachines(response.total_pages))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getListAllMachineTypeAction = createAsyncThunk(
  'production/getListAllMachineType',
  async (credential, thunkAPI) => {
    try {
      const response = await getListAllMachineType(credential)
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const getListAllWorkerArrangeAction = createAsyncThunk(
  'production/getListAllWorkerArrange',
  async (credential, thunkAPI) => {
    try {
      const response = await getListAllWorkerArrange(credential)
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const exportDataMachinesToExcelAction = createAsyncThunk(
  'production/exportDataMachinesToExcel',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await exportDataMachinesToExcel(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const createMachineAction = createAsyncThunk('production/createMachine', async (credential, thunkAPI) => {
  try {
    const response = await createMachine(credential)
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response
  } catch (response) {
    throw new Error(response.response.data.message)
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.response.data.message))
    thunkAPI.dispatch(setToastIsSuccess(false))
  }
})

export const removeMessageErrorAction = createAsyncThunk(
  'production/removeMessageError',
  async (credential, thunkAPI) => {
    return true
  }
)

export const deleteDataMachineAction = createAsyncThunk('production/deleteMachine', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await deleteMachine(credential)
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
})

export const getDetailMachineAction = createAsyncThunk('production/getDetailMachine', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getDetailMachine(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const updateStatusDataExportFlagAction = createAsyncThunk(
  'production/updateStatusDataExportFlag',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setDataExportFlag())
  }
)

export const exportDataManufactureOrdersToExcelAction = createAsyncThunk(
  'production/exportDataManufactureOrdersToExcel',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await exportDataManufactureOrdersToExcel(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const updateMachineAction = createAsyncThunk('production/updateMachine', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await updateMachine(credential)
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
})
export const updateSettingForManufactureManagementAction = createAsyncThunk(
  'production/updateSettingForManufactureManagement',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await updateSettingForManufactureManagement(credential)
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

export const getListHistoryMachineMaintenanceAction = createAsyncThunk(
  'production/getListHistoryMachineMaintenance',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListHistoryMachineMaintenance(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setCurrentPageListHistoryMachineMaintenance(response.current_page))
      thunkAPI.dispatch(setTotalPagesListHistoryMachineMaintenance(response.total_pages))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getListHistoryMachineOperationAction = createAsyncThunk(
  'production/getListHistoryMachineOperation',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListHistoryMachineOperation(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setCurrentPageListHistoryMachineOperation(response.current_page))
      thunkAPI.dispatch(setTotalPagesHistoryMachineOperation(response.total_pages))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
export const getListWorkerAction = createAsyncThunk('production/getListWorker', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getListWorker(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setCurrentPageListWorkers(response.current_page))
    thunkAPI.dispatch(setTotalPagesListWorkers(response.total_pages))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})
export const exportDataWorkerToExcelAction = createAsyncThunk(
  'production/exportDataWorkerToExcel',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await exportDataWorkerToExcel(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
export const getDetailWorkerAction = createAsyncThunk('production/getDetailWorker', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getDetailWorker(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getListAllMachineAction = createAsyncThunk(
  'production/getListAllMachine',
  async (credential, thunkAPI) => {
    try {
      const response = await getListAllMachine(credential)
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)
export const getListWorkerWorkHistoryAction = createAsyncThunk(
  'production/getListWorkerWorkHistory',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListWorkerWorkHistory(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setCurrentPageListWorkerWorkHistory(response.current_page))
      thunkAPI.dispatch(setTotalPagesListWorkerWorkHistory(response.total_pages))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getListWorkerAssignmentsAction = createAsyncThunk(
  'production/getListWorkerAssignments',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListWorkerAssignments(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
