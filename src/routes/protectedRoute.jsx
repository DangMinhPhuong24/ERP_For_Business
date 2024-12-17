import { Navigate, Outlet } from 'react-router-dom'
import {getCookie, useRoleCheck} from 'utils'
import rolesType from "../constants/titleRoleType";
import {permissionActions} from "../constants/titlePermissions";

export default function ProtectedRoute({ isAllowed, redirectTo = '/login', children, role, state }) {
  const { isSuperAdmin, userInfo } = useRoleCheck();
  const userRoles = userInfo.role?.permission.map(permission => permission.name) || [];
  const roleType = userInfo.role?.type?.name;
  const token = getCookie('token')
  if (!isAllowed || !token) {
    return <Navigate to={redirectTo} />
  }

  const isRoleArray = Array.isArray(role);
  const roleMatch = isRoleArray
      ? role.some(r => userRoles.includes(r))
      : userRoles.includes(role);

  const isRoleTypeValid =
      (roleType === '' && role === permissionActions.DASHBOARD_CUSTOMER && state === 'sale.dashboardSale') ||
      (roleType === rolesType.MANAGEMENT && role === permissionActions.DASHBOARD_CUSTOMER && state === 'sale.dashboardSale') ||
      (roleType === rolesType.STAFF && role === permissionActions.DASHBOARD_CUSTOMER && state === 'sale.dashboardAdmin') ||
      (roleType === rolesType.STAFF && state === 'KPIsettings');

  if (!isAllowed || (!isSuperAdmin && role && userRoles.length > 0 && !roleMatch) || isRoleTypeValid) {
    return <Navigate to={'/error-403'} />;
  }
  return children ? children : <Outlet />
}
