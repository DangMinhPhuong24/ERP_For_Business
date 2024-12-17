import roles from '../constants/titleRole'
import { useMemo } from 'react'
import { useUser } from '../contexts/AuthContext'
import rolesType from '../constants/titleRoleType'

export const isCanShowAllCustomers = (userRole) => {
  return userRole === rolesType.MANAGEMENT
}

export function useRoleCheck() {
  const { userInfo } = useUser()
  const superAdminRoles = useMemo(() => [roles.SUPER_ADMIN, roles.ADMIN], [])
  const userRole = useMemo(() => userInfo.role?.name ?? '', [userInfo])
  const isSuperAdmin = useMemo(() => superAdminRoles.includes(userRole), [superAdminRoles, userRole])

  return { isSuperAdmin, userInfo }
}
