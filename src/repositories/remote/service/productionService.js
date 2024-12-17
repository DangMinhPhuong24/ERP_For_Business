import urls from '../urls'
import { post, get, _delete, put } from '../network'
import GetListOderForProductionManagementRequest from '../request/production/GetListOderForProductionManagementRequest'
import GetStatisticOderForProductionManagementRequest from '../request/production/GetStatisticOderForProductionManagementRequest'
import GetKanbanOderForProductionManagementRequest from '../request/production/GetKanbanOderForProductionManagementRequest'
import UpdateOrderWaitingManufactureToOrderWaitingCreatedRequest from '../request/production/UpdateOrderWaitingManufactureToOrderWaitingCreatedRequest'
import UpdateOrderWaitingCreatedToOrderWaitingManufactureRequest from '../request/production/UpdateOrderWaitingCreatedToOrderWaitingManufactureRequest'
import GetListManufactureOrdersRequest from '../request/production/GetListManufactureOrdersRequest'
import GetStatisticManufactureOrdersRequest from '../request/production/GetStatisticManufactureOrdersRequest'
import GetKanBanManufactureOrdersRequest from '../request/production/GetKanBanManufactureOrdersRequest'
import GetAllSettingForManufactureManagementRequest from '../request/production/GetAllSettingForManufactureManagementRequest'
import GetListMachinesRequest from '../request/production/GetListMachinesRequest'
import CreateMachineRequest from '../request/production/CreateMachineRequest'
import DeleteMachineRequest from '../request/production/DeleteMachineRequest'
import GetDetailMachineRequest from '../request/production/GetDetailMachineRequest'
import UpdateMachineRequest from '../request/production/UpdateMachineRequest'
import UpdateSettingForManufactureManagementRequest from '../request/production/UpdateSettingForManufactureManagementRequest'
import GetListHistoryMachineMaintenanceRequest from '../request/production/GetListHistoryMachineMaintenanceRequest'
import GetListWorkersRequest from '../request/production/GetListWorkersRequest'
import GetDetailWorkerRequest from '../request/production/GetDetailWorkerRequest'
import GetListWorkerWorkHistoryRequest from '../request/production/GetListWorkerWorkHistoryRequest'
import GetListWorkerAssignmentsRequest from '../request/production/GetListWorkerAssignmentsRequest'
import CreateProductRequest from '../request/product/CreateProductRequest'

export function getListOderForProductionManagement(params) {
  let param = null
  if (params) {
    const getListOderForProductionManagementRequest = new GetListOderForProductionManagementRequest()
    getListOderForProductionManagementRequest.addParam(
      GetListOderForProductionManagementRequest.Keys.PAGE,
      params.page || ''
    )
    getListOderForProductionManagementRequest.addParam(
      GetListOderForProductionManagementRequest.Keys.SORT_BY,
      params.sort_by || ''
    )
    getListOderForProductionManagementRequest.addParam(
      GetListOderForProductionManagementRequest.Keys.PRODUCT_CODE,
      params.code || ''
    )
    getListOderForProductionManagementRequest.addParam(
      GetListOderForProductionManagementRequest.Keys.FROM_DATE,
      params.from_date || ''
    )
    getListOderForProductionManagementRequest.addParam(
      GetListOderForProductionManagementRequest.Keys.TO_DATE,
      params.to_date || ''
    )
    getListOderForProductionManagementRequest.addParam(
      GetListOderForProductionManagementRequest.Keys.ODER_CUSTOMER_ID,
      params.customer_id || ''
    )
    getListOderForProductionManagementRequest.addParam(
      GetListOderForProductionManagementRequest.Keys.ORDER_STATUS,
      params.order_status_id || ''
    )
    param = getListOderForProductionManagementRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_ORDER_FOR_PRODUCTION_MANAGEMENT, param, headers)
}

export function getStatisticOderForProductionManagement(params) {
  let param = null
  if (params) {
    const getStatisticOderForProductionManagementRequest = new GetStatisticOderForProductionManagementRequest()
    getStatisticOderForProductionManagementRequest.addParam(
      GetStatisticOderForProductionManagementRequest.Keys.PRODUCT_CODE,
      params.code || ''
    )
    getStatisticOderForProductionManagementRequest.addParam(
      GetStatisticOderForProductionManagementRequest.Keys.FROM_DATE,
      params.from_date || ''
    )
    getStatisticOderForProductionManagementRequest.addParam(
      GetStatisticOderForProductionManagementRequest.Keys.TO_DATE,
      params.to_date || ''
    )
    getStatisticOderForProductionManagementRequest.addParam(
      GetStatisticOderForProductionManagementRequest.Keys.ODER_CUSTOMER_ID,
      params.customer_id || ''
    )
    getStatisticOderForProductionManagementRequest.addParam(
      GetStatisticOderForProductionManagementRequest.Keys.ORDER_STATUS,
      params.order_status_id || ''
    )
    param = getStatisticOderForProductionManagementRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_STATISTIC_ORDER_FOR_PRODUCTION_MANAGEMENT, param, headers)
}

export function getListOrderStatus() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_STATUS_ORDER, param, headers)
}

export function getListStatusForManufacture() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_STATUS_FOR_MANUFACTURE, param, headers)
}

export function getKanbanOderForProductionManagement(params) {
  let param = null
  if (params) {
    const getKanbanOderForProductionManagementRequest = new GetKanbanOderForProductionManagementRequest()
    getKanbanOderForProductionManagementRequest.addParam(
      GetKanbanOderForProductionManagementRequest.Keys.PRODUCT_CODE,
      params.code || ''
    )
    getKanbanOderForProductionManagementRequest.addParam(
      GetKanbanOderForProductionManagementRequest.Keys.FROM_DATE,
      params.from_date || ''
    )
    getKanbanOderForProductionManagementRequest.addParam(
      GetKanbanOderForProductionManagementRequest.Keys.TO_DATE,
      params.to_date || ''
    )
    getKanbanOderForProductionManagementRequest.addParam(
      GetKanbanOderForProductionManagementRequest.Keys.ODER_CUSTOMER_ID,
      params.customer_id || ''
    )
    getKanbanOderForProductionManagementRequest.addParam(
      GetKanbanOderForProductionManagementRequest.Keys.ORDER_STATUS,
      params.order_status_id || ''
    )
    param = getKanbanOderForProductionManagementRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_KANBAN_ORDER_FOR_PRODUCTION_MANAGEMENT, param, headers)
}

export function updateOrderWaitingManufactureToOrderWaitingCreated(params) {
  const updateOrderWaitingManufactureToOrderWaitingCreatedRequest =
    new UpdateOrderWaitingManufactureToOrderWaitingCreatedRequest()
  updateOrderWaitingManufactureToOrderWaitingCreatedRequest.addParam(
    UpdateOrderWaitingManufactureToOrderWaitingCreatedRequest.Keys.ODER_ID,
    params.id
  )
  const paramRequest = updateOrderWaitingManufactureToOrderWaitingCreatedRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_ORDER_WAITING_MANUFACTURE_TO_ORDER_WAITING_CREATED, paramRequest, headers)
}

export function updateOrderWaitingCreatedToOrderWaitingManufacture(params) {
  const updateOrderWaitingCreatedToOrderWaitingManufactureRequest =
    new UpdateOrderWaitingCreatedToOrderWaitingManufactureRequest()
  updateOrderWaitingCreatedToOrderWaitingManufactureRequest.addParam(
    UpdateOrderWaitingCreatedToOrderWaitingManufactureRequest.Keys.ODER_ID,
    params.id
  )
  const paramRequest = updateOrderWaitingCreatedToOrderWaitingManufactureRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_ORDER_WAITING_CREATED_TO_ORDER_WAITING_MANUFACTURE, paramRequest, headers)
}

export function getListManufactureOrders(params) {
  let param = null
  if (params) {
    const getListManufactureOrdersRequest = new GetListManufactureOrdersRequest()
    getListManufactureOrdersRequest.addParam(GetListManufactureOrdersRequest.Keys.PAGE, params.page || '')
    getListManufactureOrdersRequest.addParam(GetListManufactureOrdersRequest.Keys.PRODUCT_CODE, params.code || '')
    getListManufactureOrdersRequest.addParam(GetListManufactureOrdersRequest.Keys.FROM_DATE, params.from_date || '')
    getListManufactureOrdersRequest.addParam(GetListManufactureOrdersRequest.Keys.TO_DATE, params.to_date || '')
    getListManufactureOrdersRequest.addParam(
      GetListManufactureOrdersRequest.Keys.MANUFACTURE_PLAN_ID,
      params.plan_id || ''
    )
    getListManufactureOrdersRequest.addParam(
      GetListManufactureOrdersRequest.Keys.MANUFACTURE_ORDER_ID,
      params.order_id || ''
    )
    getListManufactureOrdersRequest.addParam(
      GetListManufactureOrdersRequest.Keys.MANUFACTURE_ORDER_STATUS,
      params.manufacture_order_status_id || ''
    )
    param = getListManufactureOrdersRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_MANUFACTURE_ORDERS, param, headers)
}

export function getStatisticManufactureOrders(params) {
  let param = null
  if (params) {
    const getStatisticManufactureOrdersRequest = new GetStatisticManufactureOrdersRequest()
    getStatisticManufactureOrdersRequest.addParam(
      GetStatisticManufactureOrdersRequest.Keys.PRODUCT_CODE,
      params.code || ''
    )
    getStatisticManufactureOrdersRequest.addParam(
      GetStatisticManufactureOrdersRequest.Keys.FROM_DATE,
      params.from_date || ''
    )
    getStatisticManufactureOrdersRequest.addParam(
      GetStatisticManufactureOrdersRequest.Keys.TO_DATE,
      params.to_date || ''
    )
    getStatisticManufactureOrdersRequest.addParam(
      GetStatisticManufactureOrdersRequest.Keys.MANUFACTURE_PLAN_ID,
      params.plan_id || ''
    )
    getStatisticManufactureOrdersRequest.addParam(
      GetStatisticManufactureOrdersRequest.Keys.MANUFACTURE_ORDER_ID,
      params.order_id || ''
    )
    getStatisticManufactureOrdersRequest.addParam(
      GetStatisticManufactureOrdersRequest.Keys.MANUFACTURE_ORDER_STATUS,
      params.manufacture_order_status_id || ''
    )
    param = getStatisticManufactureOrdersRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_STATISTIC_MANUFACTURE_ORDERS, param, headers)
}
export function getKanBanManufactureOrders(params) {
  let param = null
  if (params) {
    const getKanBanManufactureOrdersRequest = new GetKanBanManufactureOrdersRequest()
    getKanBanManufactureOrdersRequest.addParam(GetKanBanManufactureOrdersRequest.Keys.PRODUCT_CODE, params.code || '')
    getKanBanManufactureOrdersRequest.addParam(GetKanBanManufactureOrdersRequest.Keys.FROM_DATE, params.from_date || '')
    getKanBanManufactureOrdersRequest.addParam(GetKanBanManufactureOrdersRequest.Keys.TO_DATE, params.to_date || '')
    getKanBanManufactureOrdersRequest.addParam(
      GetKanBanManufactureOrdersRequest.Keys.MANUFACTURE_PLAN_ID,
      params.plan_id || ''
    )
    getKanBanManufactureOrdersRequest.addParam(
      GetKanBanManufactureOrdersRequest.Keys.MANUFACTURE_ORDER_ID,
      params.order_id || ''
    )
    getKanBanManufactureOrdersRequest.addParam(
      GetKanBanManufactureOrdersRequest.Keys.MANUFACTURE_ORDER_STATUS,
      params.manufacture_order_status_id || ''
    )
    param = getKanBanManufactureOrdersRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_KANBAN_MANUFACTURE_ORDERS, param, headers)
}

export function exportDataManufactureOrdersToExcel(params) {
  let param = null
  if (params) {
    const getKanBanManufactureOrdersRequest = new GetKanBanManufactureOrdersRequest()
    getKanBanManufactureOrdersRequest.addParam(GetKanBanManufactureOrdersRequest.Keys.PRODUCT_CODE, params.code || '')
    getKanBanManufactureOrdersRequest.addParam(GetKanBanManufactureOrdersRequest.Keys.FROM_DATE, params.from_date || '')
    getKanBanManufactureOrdersRequest.addParam(GetKanBanManufactureOrdersRequest.Keys.TO_DATE, params.to_date || '')
    getKanBanManufactureOrdersRequest.addParam(
      GetKanBanManufactureOrdersRequest.Keys.MANUFACTURE_PLAN_ID,
      params.plan_id || ''
    )
    getKanBanManufactureOrdersRequest.addParam(
      GetKanBanManufactureOrdersRequest.Keys.MANUFACTURE_ORDER_ID,
      params.order_id || ''
    )
    getKanBanManufactureOrdersRequest.addParam(
      GetKanBanManufactureOrdersRequest.Keys.MANUFACTURE_ORDER_STATUS,
      params.manufacture_order_status_id || ''
    )
    param = getKanBanManufactureOrdersRequest.getParams()
  }
  const headers = {}
  return get(urls.EXPORT_EXCEL_DATA_MANUFACTURE_ORDER, param, headers)
}

export function getListPlan() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_PLAN, param, headers)
}
export function getListAllOrder() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_ORDER, param, headers)
}

export function getListMachines(params) {
  let param = null
  if (params) {
    const getListMachinesRequest = new GetListMachinesRequest()
    getListMachinesRequest.addParam(GetListMachinesRequest.Keys.PAGE, params.page || '')
    getListMachinesRequest.addParam(GetListMachinesRequest.Keys.NAME, params.name || '')
    getListMachinesRequest.addParam(GetListMachinesRequest.Keys.FROM_DATE, params.from_date || '')
    getListMachinesRequest.addParam(GetListMachinesRequest.Keys.TO_DATE, params.to_date || '')
    getListMachinesRequest.addParam(GetListMachinesRequest.Keys.MACHINES_TYPE_ID, params.machine_type_id || '')
    getListMachinesRequest.addParam(GetListMachinesRequest.Keys.WORKER_ARRANGE_ID, params.worker_arrange_id || '')
    param = getListMachinesRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_MACHINES, param, headers)
}

export function getListAllMachineType() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_MACHINE_TYPE, param, headers)
}

export function getListAllWorkerArrange() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_WORKER_ARRANGE, param, headers)
}

export function exportDataMachinesToExcel(params) {
  let param = null
  if (params) {
    const getListMachinesRequest = new GetListMachinesRequest()
    getListMachinesRequest.addParam(GetListMachinesRequest.Keys.NAME, params.name || '')
    getListMachinesRequest.addParam(GetListMachinesRequest.Keys.FROM_DATE, params.from_date || '')
    getListMachinesRequest.addParam(GetListMachinesRequest.Keys.TO_DATE, params.to_date || '')
    getListMachinesRequest.addParam(GetListMachinesRequest.Keys.MACHINES_TYPE_ID, params.machine_type_id || '')
    getListMachinesRequest.addParam(GetListMachinesRequest.Keys.WORKER_ARRANGE_ID, params.worker_arrange_id || '')
    param = getListMachinesRequest.getParams()
  }
  const headers = {}
  return get(urls.EXPORT_EXCEL_DATA_MACHINE, param, headers)
}
export function createMachine(params) {
  const createMachineRequest = new CreateMachineRequest()
  createMachineRequest.addParam(CreateMachineRequest.Keys.NAME, params.name || '')
  createMachineRequest.addParam(CreateMachineRequest.Keys.MACHINES_TYPE_ID, params.machine_type_id || '')
  createMachineRequest.addParam(CreateMachineRequest.Keys.MANUFACTURER, params.manufacturer || '')
  createMachineRequest.addParam(CreateMachineRequest.Keys.BUY_DATE, params.buy_date || '')
  createMachineRequest.addParam(CreateMachineRequest.Keys.MAINTENANCE_DATE, params.maintenance_date)
  const param = createMachineRequest.getParams()
  const headers = {}
  return post(urls.CREATE_MACHINE, param, headers)
}

export function deleteMachine(machineId) {
  const headers = {}
  const deleteMachineRequest = new DeleteMachineRequest()
  deleteMachineRequest.addParam(DeleteMachineRequest.Keys.MACHINES_ID, machineId)
  const params = deleteMachineRequest.getParams()
  return _delete(urls.DELETE_DATA_MACHINE, params, headers)
}

export function getDetailMachine(ID) {
  const getDetailMachineRequest = new GetDetailMachineRequest()
  getDetailMachineRequest.addParam(GetDetailMachineRequest.Keys.MACHINES_ID, ID)
  const param = getDetailMachineRequest.getParams()
  const headers = {}
  return get(urls.GET_DETAIL_MACHINE, param, headers)
}

export function updateMachine(params) {
  const updateMachineRequest = new UpdateMachineRequest()
  updateMachineRequest.addParam(UpdateMachineRequest.Keys.MACHINES_ID, params.id)
  updateMachineRequest.addParam(UpdateMachineRequest.Keys.NAME, params.name || '')
  updateMachineRequest.addParam(UpdateMachineRequest.Keys.MACHINES_TYPE_ID, params.machine_type_id || '')
  updateMachineRequest.addParam(UpdateMachineRequest.Keys.MANUFACTURER, params.manufacturer || '')
  updateMachineRequest.addParam(UpdateMachineRequest.Keys.BUY_DATE, params.buy_date || '')
  updateMachineRequest.addParam(UpdateMachineRequest.Keys.MAINTENANCE_DATE, params.maintenance_date)
  const paramRequest = updateMachineRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_DATA_MACHINE, paramRequest, headers)
}

export function getAllSettingForManufactureManagement(params) {
  let param = null
  if (params) {
    const getAllSettingForManufactureManagementRequest = new GetAllSettingForManufactureManagementRequest()
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.MANUFACTURE_PRODUCTIVITY_BELOW_DAY,
      params.manufacture_productivity_below_day || ''
    )
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.MANUFACTURE_PRODUCTIVITY_EXCEED_DAY,
      params.manufacture_productivity_exceed_day || ''
    )
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.TRANSPORT_PRODUCTIVITY_BELOW_DAY,
      params.transport_productivity_below_day || ''
    )
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.TRANSPORT_PRODUCTIVITY_EXCEED_DAY,
      params.transport_productivity_exceed_day || ''
    )
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.QUANTITY_ORDER_RETURN_WEEK,
      params.quantity_order_return_week || ''
    )
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.QUANTITY_ORDER_RETURN_MONTH,
      params.quantity_order_return_month || ''
    )
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.QUANTITY_CLAIM_WEEK,
      params.quantity_claim_week || ''
    )
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.QUANTITY_CLAIM_MONTH,
      params.quantity_claim_month || ''
    )
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.TIME_WORKER_LEAVE,
      params.time_worker_leave || ''
    )
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.TIME_MACHINE_MAINTENANCE,
      params.time_machine_maintenance || ''
    )
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.MINUTES_MANUFACTURE_ORDER_BEHIND_SCHEDULE,
      params.minutes_manufacture_order_behind_schedule || ''
    )
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.MINUTES_DELIVERY_BEHIND_SCHEDULE,
      params.minutes_delivery_behind_schedule || ''
    )
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.MINUTES_CHANGE_PROCESS,
      params.minutes_change_process || ''
    )
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.INVENTORY_PROCESS_SAW_CUT,
      params.inventory_process_saw_cut || ''
    )
    getAllSettingForManufactureManagementRequest.addParam(
      GetAllSettingForManufactureManagementRequest.Keys.INVENTORY_PROCESS_CUT_TRIM,
      params.inventory_process_cut_trim || ''
    )
    param = getAllSettingForManufactureManagementRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_ALL_SETTING_FOR_MANUFACTURE_MANAGEMENT, param, headers)
}
export function updateSettingForManufactureManagement(params) {
  let param = null
  if (params) {
    const updateSettingForManufactureManagementRequest = new UpdateSettingForManufactureManagementRequest()
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.MANUFACTURE_PRODUCTIVITY_BELOW_DAY,
      params.manufacture_productivity_below_day || ''
    )
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.MANUFACTURE_PRODUCTIVITY_EXCEED_DAY,
      params.manufacture_productivity_exceed_day || ''
    )
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.TRANSPORT_PRODUCTIVITY_BELOW_DAY,
      params.transport_productivity_below_day || ''
    )
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.TRANSPORT_PRODUCTIVITY_EXCEED_DAY,
      params.transport_productivity_exceed_day || ''
    )
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.QUANTITY_ORDER_RETURN_WEEK,
      params.quantity_order_return_week || ''
    )
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.QUANTITY_ORDER_RETURN_MONTH,
      params.quantity_order_return_month || ''
    )
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.QUANTITY_CLAIM_WEEK,
      params.quantity_claim_week || ''
    )
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.QUANTITY_CLAIM_MONTH,
      params.quantity_claim_month || ''
    )
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.TIME_WORKER_LEAVE,
      params.time_worker_leave || ''
    )
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.TIME_MACHINE_MAINTENANCE,
      params.time_machine_maintenance || ''
    )
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.MINUTES_MANUFACTURE_ORDER_BEHIND_SCHEDULE,
      params.minutes_manufacture_order_behind_schedule || ''
    )
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.MINUTES_DELIVERY_BEHIND_SCHEDULE,
      params.minutes_delivery_behind_schedule || ''
    )
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.MINUTES_CHANGE_PROCESS,
      params.minutes_change_process || ''
    )
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.INVENTORY_PROCESS_SAW_CUT,
      params.inventory_process_saw_cut || ''
    )
    updateSettingForManufactureManagementRequest.addParam(
      UpdateSettingForManufactureManagementRequest.Keys.INVENTORY_PROCESS_CUT_TRIM,
      params.inventory_process_cut_trim || ''
    )
    param = updateSettingForManufactureManagementRequest.getParams()
  }
  const headers = {}
  return put(urls.UPDATE_SETTING_FOR_MANUFACTURE_MANAGEMENT, param, headers)
}

export function getListHistoryMachineMaintenance(params) {
  let param = null
  if (params) {
    const getListHistoryMachineMaintenanceRequest = new GetListHistoryMachineMaintenanceRequest()
    getListHistoryMachineMaintenanceRequest.addParam(
      GetListHistoryMachineMaintenanceRequest.Keys.PAGE,
      params.page || ''
    )
    getListHistoryMachineMaintenanceRequest.addParam(
      GetListHistoryMachineMaintenanceRequest.Keys.MACHINE_ID,
      params.machine_id || ''
    )
    getListHistoryMachineMaintenanceRequest.addParam(
      GetListHistoryMachineMaintenanceRequest.Keys.FROM_DATE,
      params.from_date || ''
    )
    getListHistoryMachineMaintenanceRequest.addParam(
      GetListHistoryMachineMaintenanceRequest.Keys.TO_DATE,
      params.to_date || ''
    )
    param = getListHistoryMachineMaintenanceRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_HISTORY_MACHINE_MAINTENANCES, param, headers)
}

export function getListHistoryMachineOperation(params) {
  let param = null
  if (params) {
    const getListHistoryMachineMaintenanceRequest = new GetListHistoryMachineMaintenanceRequest()
    getListHistoryMachineMaintenanceRequest.addParam(
      GetListHistoryMachineMaintenanceRequest.Keys.PAGE,
      params.page || ''
    )
    getListHistoryMachineMaintenanceRequest.addParam(
      GetListHistoryMachineMaintenanceRequest.Keys.MACHINE_ID,
      params.machine_id || ''
    )
    getListHistoryMachineMaintenanceRequest.addParam(
      GetListHistoryMachineMaintenanceRequest.Keys.FROM_DATE,
      params.from_date || ''
    )
    getListHistoryMachineMaintenanceRequest.addParam(
      GetListHistoryMachineMaintenanceRequest.Keys.TO_DATE,
      params.to_date || ''
    )
    param = getListHistoryMachineMaintenanceRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_MACHINE_OPERATIONS, param, headers)
}
export function getListWorker(params) {
  let param = null
  if (params) {
    const getListWorkersRequest = new GetListWorkersRequest()
    getListWorkersRequest.addParam(GetListWorkersRequest.Keys.PAGE, params.page || '')
    getListWorkersRequest.addParam(GetListWorkersRequest.Keys.WORKER_CODE, params.code || '')
    getListWorkersRequest.addParam(GetListWorkersRequest.Keys.WORKER_NAME, params.name || '')
    getListWorkersRequest.addParam(GetListWorkersRequest.Keys.WORKER_AGE, params.age || '')
    getListWorkersRequest.addParam(GetListWorkersRequest.Keys.YEARS_EXPERIENCE, params.years_experience || '')
    getListWorkersRequest.addParam(GetListWorkersRequest.Keys.WORKER_ARRANGE_ID, params.worker_arrange_id || '')
    param = getListWorkersRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_WORKERS, param, headers)
}
export function exportDataWorkerToExcel(params) {
  let param = null
  if (params) {
    const getListWorkersRequest = new GetListWorkersRequest()
    getListWorkersRequest.addParam(GetListWorkersRequest.Keys.WORKER_CODE, params.code || '')
    getListWorkersRequest.addParam(GetListWorkersRequest.Keys.WORKER_NAME, params.name || '')
    getListWorkersRequest.addParam(GetListWorkersRequest.Keys.WORKER_AGE, params.age || '')
    getListWorkersRequest.addParam(GetListWorkersRequest.Keys.YEARS_EXPERIENCE, params.years_experience || '')
    getListWorkersRequest.addParam(GetListWorkersRequest.Keys.WORKER_ARRANGE_ID, params.worker_arrange_id || '')
    param = getListWorkersRequest.getParams()
  }

  const headers = {}
  return get(urls.EXPORT_EXCEL_DATA_WORKERS, param, headers)
}
export function getDetailWorker(ID) {
  const getDetailWorkerRequest = new GetDetailWorkerRequest()
  getDetailWorkerRequest.addParam(GetDetailWorkerRequest.Keys.WORKER_ID, ID)
  const param = getDetailWorkerRequest.getParams()
  const headers = {}
  return get(urls.GET_DETAIL_WORKER, param, headers)
}
export function getListAllMachine() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_MACHINE, param, headers)
}
export function getListWorkerWorkHistory(params) {
  let param = null
  if (params) {
    const getListWorkerWorkHistoryRequest = new GetListWorkerWorkHistoryRequest()
    getListWorkerWorkHistoryRequest.addParam(GetListWorkerWorkHistoryRequest.Keys.PAGE, params.page || '')
    getListWorkerWorkHistoryRequest.addParam(
      GetListWorkerWorkHistoryRequest.Keys.WORKER_DETAILS_ID,
      params.user_id || ''
    )
    getListWorkerWorkHistoryRequest.addParam(GetListWorkerWorkHistoryRequest.Keys.FROM_DATE, params.from_date || '')
    getListWorkerWorkHistoryRequest.addParam(GetListWorkerWorkHistoryRequest.Keys.TO_DATE, params.to_date || '')
    param = getListWorkerWorkHistoryRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_WORKER_WORK_HISTORY, param, headers)
}
export function getListWorkerAssignments(params) {
  let param = null
  if (params) {
    const getListWorkerAssignmentsRequest = new GetListWorkerAssignmentsRequest()
    getListWorkerAssignmentsRequest.addParam(
      GetListWorkerAssignmentsRequest.Keys.LIST_WORKER_ID,
      params.worker_id || ''
    )
    getListWorkerAssignmentsRequest.addParam(GetListWorkerAssignmentsRequest.Keys.DATE, params.date || '')
    param = getListWorkerAssignmentsRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_WORKER_ASSIGNMENTS, param, headers)
}
