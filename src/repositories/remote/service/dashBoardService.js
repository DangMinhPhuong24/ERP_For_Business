import { get } from '../network'
import GetAllDashBoardSaleForSalesPeopleRequest from '../request/dashboard/GetAllDashBoardSaleForSalesPeopleRequest'
import GetListDashBoardCustomerWithDebtsRequest from '../request/dashboard/GetListDashBoardCustomerWithDebtsRequest'
import GetListDashBoardSaleForAdminRequest from '../request/dashboard/GetListDashBoardSaleForAdminRequest'
import GetListTopBestSellingRequest from '../request/dashboard/GetListTopBestSellingRequest'
import urls from '../urls'

export function getListDashBoardCustomerWithDebts(params) {
  let param = null
  if (params) {
    const getListDashBoardCustomerWithDebtsRequest = new GetListDashBoardCustomerWithDebtsRequest()
    // eslint-disable-next-line no-use-before-define
    getListDashBoardCustomerWithDebtsRequest.addParam(
      GetListDashBoardCustomerWithDebtsRequest.Keys.PAGE,
      params.page || ''
    )
    getListDashBoardCustomerWithDebtsRequest.addParam(
      GetListDashBoardCustomerWithDebtsRequest.Keys.DASHBOARD_CUSTOMER_NAME,
      params.customer_name || ''
    )
    getListDashBoardCustomerWithDebtsRequest.addParam(
      GetListDashBoardCustomerWithDebtsRequest.Keys.DASHBOARD_DEBT_GROUP,
      params.debt_group || ''
    )
    getListDashBoardCustomerWithDebtsRequest.addParam(
      GetListDashBoardCustomerWithDebtsRequest.Keys.DASHBOARD_TOTAL_DEBT,
      params.total_debt || ''
    )
    getListDashBoardCustomerWithDebtsRequest.addParam(
      GetListDashBoardCustomerWithDebtsRequest.Keys.DASHBOARD_OVERDUE_AMOUNT,
      params.overdue_amount || ''
    )
    getListDashBoardCustomerWithDebtsRequest.addParam(
      GetListDashBoardCustomerWithDebtsRequest.Keys.DASHBOARD_NUMBER_DAY_OVERDUE,
      params.number_day_overdue || ''
    )
    param = getListDashBoardCustomerWithDebtsRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_CUSTOMER_WITH_DEBTS, param, headers)
}
export function getAllDashBoardSaleForSalesPeople(params) {
  let param = null
  if (params) {
    const getAllDashBoardSaleForSalesPeopleRequest = new GetAllDashBoardSaleForSalesPeopleRequest()
    // eslint-disable-next-line no-use-before-define
    getAllDashBoardSaleForSalesPeopleRequest.addParam(
      GetAllDashBoardSaleForSalesPeopleRequest.Keys.DASHBOARD_SALE_CURRENT_MONTH,
      params.current_month || ''
    )
    getAllDashBoardSaleForSalesPeopleRequest.addParam(
      GetAllDashBoardSaleForSalesPeopleRequest.Keys.DASHBOARD_SALE_CURRENT_YEAR,
      params.current_year || ''
    )
    getAllDashBoardSaleForSalesPeopleRequest.addParam(
      GetAllDashBoardSaleForSalesPeopleRequest.Keys.DASHBOARD_SALE_REMAINING_DAYS,
      params.remaining_days || ''
    )
    getAllDashBoardSaleForSalesPeopleRequest.addParam(
      GetAllDashBoardSaleForSalesPeopleRequest.Keys.DASHBOARD_SALE_TOTAL_REVENUE,
      params.total_revenue_for_the_month || ''
    )
    getAllDashBoardSaleForSalesPeopleRequest.addParam(
      GetAllDashBoardSaleForSalesPeopleRequest.Keys.DASHBOARD_SALE_TOTAL_KPI,
      params.total_kpi_for_the_month || ''
    )
    getAllDashBoardSaleForSalesPeopleRequest.addParam(
      GetAllDashBoardSaleForSalesPeopleRequest.Keys.DASHBOARD_SALE_PERCENT_KPI,
      params.percent_kpi_for_the_month || ''
    )
    getAllDashBoardSaleForSalesPeopleRequest.addParam(
      GetAllDashBoardSaleForSalesPeopleRequest.Keys.DASHBOARD_SALE_REVENUE_TODAY,
      params.revenue_today || ''
    )
    getAllDashBoardSaleForSalesPeopleRequest.addParam(
      GetAllDashBoardSaleForSalesPeopleRequest.Keys.DASHBOARD_SALE_ORDERS_TODAY,
      params.orders_today || ''
    )
    getAllDashBoardSaleForSalesPeopleRequest.addParam(
      GetAllDashBoardSaleForSalesPeopleRequest.Keys.DASHBOARD_SALE_TOTAL_REVENUE_FOR_YEAR,
      params.total_revenue_for_the_year || ''
    )
    getAllDashBoardSaleForSalesPeopleRequest.addParam(
      GetAllDashBoardSaleForSalesPeopleRequest.Keys.DASHBOARD_SALE_TOP_SALESPERSON,
      params.top_salesperson || ''
    )
    param = getAllDashBoardSaleForSalesPeopleRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_ALL_DASHBOARD_SALE_FOR_SALESPEOPLE, param, headers)
}

export function getDashBoardSaleForAdmin(params) {
  let param = null
  if (params) {
    const getListDashBoardSaleForAdminRequest = new GetListDashBoardSaleForAdminRequest()
    getListDashBoardSaleForAdminRequest.addParam(
      GetListDashBoardSaleForAdminRequest.Keys.FROM_DATE,
      params.from_date || ''
    )
    getListDashBoardSaleForAdminRequest.addParam(GetListDashBoardSaleForAdminRequest.Keys.TO_DATE, params.to_date || '')
    getListDashBoardSaleForAdminRequest.addParam(
      GetListDashBoardSaleForAdminRequest.Keys.REVENUE_BY_REGION,
      params.revenue_by_region || ''
    )
    getListDashBoardSaleForAdminRequest.addParam(
      GetListDashBoardSaleForAdminRequest.Keys.TOTAL_REVENUE,
      params.total_revenue || ''
    )
    getListDashBoardSaleForAdminRequest.addParam(
      GetListDashBoardSaleForAdminRequest.Keys.ORDER_QUANTITY,
      params.order_quantity || ''
    )
    getListDashBoardSaleForAdminRequest.addParam(
      GetListDashBoardSaleForAdminRequest.Keys.TOTAL_PROFIT,
      params.total_profit || ''
    )
    getListDashBoardSaleForAdminRequest.addParam(
      GetListDashBoardSaleForAdminRequest.Keys.TOP_CUSTOMERS,
      params.top_customers || ''
    )
    param = getListDashBoardSaleForAdminRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_DASHBOARD_SALE_FOR_ADMIN, param, headers)
}

export function getListTopBestSelling(params) {
  let param = null
  if (params) {
    const getListTopBestSellingRequest = new GetListTopBestSellingRequest()
    getListTopBestSellingRequest.addParam(
      GetListTopBestSellingRequest.Keys.PRODUCT_CODE_TOP_SELLING,
      params.PRODUCT_CODE_TOP_SELLING || ''
    )
    getListTopBestSellingRequest.addParam(
      GetListTopBestSellingRequest.Keys.PRODUCT_NAME_TOP_SELLING,
      params.PRODUCT_NAME_TOP_SELLING || ''
    )
    getListTopBestSellingRequest.addParam(
      GetListTopBestSellingRequest.Keys.PRODUCT_REVENUE_EACH_MONTH,
      params.PRODUCT_REVENUE_EACH_MONTH || ''
    )
    param = getListTopBestSellingRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_TOP_SELLING_PRODUCTS, param, headers)
}
