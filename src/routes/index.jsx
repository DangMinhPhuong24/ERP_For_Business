import React, { useEffect, useMemo, useState } from 'react'
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom'
import Login from '../containers/Auth/Login'
import MainLayout from '../layout/MainLayout'
import { generateRoute } from './RouteGenerator'
import appRoutes from './appRoutes'
import { useSelector } from 'react-redux'
import ErrorView from '../layout/Error/ErrorView'
import { appProvincErrorState } from '../redux/app/app.selectors'
import errors from '../constants/titleError'
import CreateWorkOrder from '../containers/Production/ManageProductionOrders/CreateWorkOrder'
import MachineDetail from '../containers/Production/ResourceManagement/MachineDetail'
import WorkerDetail from '../containers/Production/ResourceManagement/WorkerDetail'
import LoadingZalo from '../layout/LoadingZalo'
import MainLayoutMobile from '../layout/Mobile/MainLayout'
import { isMobile } from '../common/common'
import Error404 from '../layout/Error/404Error'
import Quote from '../containers/Sale/Mobile/Quote'
import UpdateCustomerMobile from '../containers/Sale/Mobile/CustomerInfo/UpdateCustomer'
import CustomerHandbookMobile from '../components/Modal/Customer/CustomerHandbook/Mobile'
import PreviewQuote from '../containers/Sale/Mobile/Quote/PreviewQuote'
import MainCreateCustomer from '../containers/Sale/Mobile/MainCreateCustomer'
import ConsultantHistoryMobilePage from 'containers/Sale/Mobile/CustomerInfo/ConsultantHistoryMobile'
import CreateOrUpdateConsultantHistoryMobile from 'containers/Sale/Mobile/CustomerInfo/ConsultantHistoryMobile/CreateOrUpdateConsultantHistoryMobile'
import { getCookie, routeConfigs } from 'utils'
import ProtectedRoute from './protectedRoute'
import { permissionActions } from '../constants/titlePermissions'

function AppRoutes() {
  const routes = useMemo(() => {
    return generateRoute(appRoutes)
  }, [])
  const storedToken = getCookie('token')
  const navigate = useNavigate()
  const errorsMessageLoadProvince = useSelector(appProvincErrorState)
  const currentUrl = window.location.pathname
  const [mainLayoutComponent, setMainLayoutComponent] = useState(isMobile ? <MainLayoutMobile /> : <MainLayout />)

  useEffect(() => {
    if (!storedToken) {
      navigate('/login')
    }
  }, [storedToken])

  useEffect(() => {
    setMainLayoutComponent(isMobile ? <MainLayoutMobile /> : <MainLayout />)
  }, [isMobile])

  useEffect(() => {
    routeConfigs.forEach(config => {
      if (!config.routes.includes(currentUrl)) {
        config.items.forEach(item => localStorage.removeItem(item));
      }
    });
    if (isMobile && !isAllowedMobileRoute(currentUrl)) {
      navigate('/error-404')
    }
  }, [currentUrl])

  const isAllowedMobileRoute = (path) => {
    const allowedRoutes = [
      '/login',
      '/sale/order/order-detail',
      '/sale/information/customer-detail',
      '/sale/information',
      '/sale/order',
      '/sale',
      '/home',
      '/quote',
      '/update-customer',
      '/quote/preview-quote',
      '/handbook-mobile',
      '/',
      '',
      '/sale/information/create-customer',
      '/sale/information/consultant-history',
      '/sale/information/consultant-history/create',
      '/sale/information/consultant-history/edit'
    ]

    return allowedRoutes.includes(path)
  }

  if (errorsMessageLoadProvince === errors.STATUS_429 && window.location.pathname !== '/login') {
    return <ErrorView errorCode={429} />
  }

  return (
    <Routes>
      <Route path="" element={<Navigate to="/login" />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/error-429" element={<ErrorView errorCode={429} />} />
      <Route path="/error-403" element={<ErrorView errorCode={403} />} />
      <Route path="/error-404" element={<Error404 />} />
      <Route path="/loading-code-zalo" element={<LoadingZalo />} />
      <Route path="/" element={mainLayoutComponent}>
        {routes}
        <Route path="/production/resource-management/worker-detail" element={<WorkerDetail />} />
        <Route path="/production/resource-management/machine-detail" element={<MachineDetail />} />
        <Route path="/production/manage-production-orders/create-work-order" element={<CreateWorkOrder />} />

        <Route
          path="/quote"
          element={
            <ProtectedRoute isAllowed={true} role={permissionActions.SHOW_CUSTOMER}>
              {<Quote />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-customer"
          element={
            <ProtectedRoute isAllowed={true} role={permissionActions.SHOW_CUSTOMER}>
              {<UpdateCustomerMobile />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/quote/preview-quote"
          element={
            <ProtectedRoute isAllowed={true} role={permissionActions.SHOW_CUSTOMER}>
              {<PreviewQuote />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/handbook-mobile"
          element={
            <ProtectedRoute isAllowed={true} role={permissionActions.UPDATE_CUSTOMER}>
              {<CustomerHandbookMobile />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/sale/information/create-customer"
          element={
            <ProtectedRoute isAllowed={true} role={permissionActions.ADD_CUSTOMER}>
              {<MainCreateCustomer />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/sale/information/consultant-history"
          element={
            <ProtectedRoute isAllowed={true} role={permissionActions.SHOW_CUSTOMER}>
              {<ConsultantHistoryMobilePage />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/sale/information/consultant-history/create"
          element={
            <ProtectedRoute isAllowed={true} role={permissionActions.SHOW_CUSTOMER}>
              {<CreateOrUpdateConsultantHistoryMobile />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/sale/information/consultant-history/edit"
          element={
            <ProtectedRoute isAllowed={true} role={permissionActions.SHOW_CUSTOMER}>
              {<CreateOrUpdateConsultantHistoryMobile />}
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes
