import { get, put, _delete, post } from '../network'
import urls from '../urls'
import GetListRoleRequest from '../request/account/GetListRoleRequest'
import GetListUserRequest from '../request/account/GetListUserRequest'
import DeleteUserRequest from '../request/account/DeleteUserRequest'
import CreateUserRequest from '../request/account/CreateUserRequest'
import GetDetailUserRequest from '../request/account/GetDetailUserRequest'
import UpdateUserRequest from '../request/account/UpdateUserRequest'
import CreateDepartmentRequest from '../request/account/CreateDepartmentRequest'
import UpdateDepartmentRequest from '../request/account/UpdateDepartmentRequest'
import GetDetailDepartmentRequest from '../request/account/GetDetailDepartmentRequest'
import DeleteDepartmentRequest from '../request/account/DeleteDepartmentRequest'
import GetListDepartmentRequest from '../request/account/GetListDepartmentRequest'
import GetDetailRoleWithPermissionsRequest from '../request/account/GetDetailRoleWithPermissionsRequest'
import CreateRoleRequest from '../request/account/CreateRoleRequest'
import UpdateRoleRequest from '../request/account/UpdateRoleRequest'
import DeleteRoleRequest from '../request/account/DeleteRoleRequest'

export function getListRoles(params) {
  let param = null
  if (params) {
    const getListRoleRequest = new GetListRoleRequest()
    // eslint-disable-next-line no-use-before-define
    getListRoleRequest.addParam(GetListRoleRequest.Keys.PAGE, params.page || '')
    getListRoleRequest.addParam(GetListRoleRequest.Keys.ROLE_NAME, params.ROLE_NAME || '')
    param = getListRoleRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_ROLES, param, headers)
}

export function getListUsers(params) {
  let param = null
  if (params) {
    const getListUserRequest = new GetListUserRequest()
    getListUserRequest.addParam(GetListUserRequest.Keys.PAGE, params.page || '')
    getListUserRequest.addParam(GetListUserRequest.Keys.SEARCH_USER, params.search_user || '')
    getListUserRequest.addParam(GetListUserRequest.Keys.USER_ROLE_NAME, params.role_name || '')
    getListUserRequest.addParam(GetListUserRequest.Keys.BRANCH_ID, params.branch_id || '')
    getListUserRequest.addParam(GetListUserRequest.Keys.DEPARTMENT_ID, params.department_id || '')
    param = getListUserRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_USERS, param, headers)
}

export function deleteUser(userId) {
  const headers = {}
  const deleteUserRequest = new DeleteUserRequest()
  deleteUserRequest.addParam(DeleteUserRequest.Keys.USER_ID, userId)
  const params = deleteUserRequest.getParams()
  return _delete(urls.DELETE_DATA_USER, params, headers)
}

export function getListRole() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_ROLES, param, headers)
}

export function createUser(params) {
  const createUserRequest = new CreateUserRequest()
  createUserRequest.addParam(CreateUserRequest.Keys.USER_NAME, params.username || '')
  createUserRequest.addParam(CreateUserRequest.Keys.USER_GMAIL, params.email || '')
  createUserRequest.addParam(CreateUserRequest.Keys.USER_PASSWORD, params.password || '')
  createUserRequest.addParam(CreateUserRequest.Keys.USER_FULL_NAME, params.name || '')
  createUserRequest.addParam(CreateUserRequest.Keys.USER_ROLE_NAME, params.role_name || '')
  createUserRequest.addParam(CreateUserRequest.Keys.BRANCH_ID, params.branch_id || '')
  createUserRequest.addParam(CreateUserRequest.Keys.DEPARTMENT_ID, params.department_id || '')
  const param = createUserRequest.getParams()
  const headers = {}
  return post(urls.CREATE_USER, param, headers)
}

export function updateUser(params) {
  const updateUserRequest = new UpdateUserRequest()
  updateUserRequest.addParam(UpdateUserRequest.Keys.USER_ID, params.id || '')
  updateUserRequest.addParam(UpdateUserRequest.Keys.USER_NAME, params.username || '')
  updateUserRequest.addParam(UpdateUserRequest.Keys.USER_GMAIL, params.email || '')
  updateUserRequest.addParam(UpdateUserRequest.Keys.USER_PASSWORD, params.password || '')
  updateUserRequest.addParam(UpdateUserRequest.Keys.USER_FULL_NAME, params.name || '')
  updateUserRequest.addParam(UpdateUserRequest.Keys.USER_ROLE_NAME, params.role_name || '')
  updateUserRequest.addParam(UpdateUserRequest.Keys.BRANCH_ID, params.branch_id || '')
  updateUserRequest.addParam(UpdateUserRequest.Keys.DEPARTMENT_ID, params.department_id || '')
  const param = updateUserRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_DATA_USER, param, headers)
}

export function getUserInformation(userId) {
  const getDetailUserRequest = new GetDetailUserRequest()
  getDetailUserRequest.addParam(GetDetailUserRequest.Keys.USER_ID, userId)
  const param = getDetailUserRequest.getParams()
  const headers = {}
  return get(urls.GET_DETAIL_USER, param, headers)
}

export function getAllDepartment() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_DEPARTMENT, param, headers)
}

export function getAllDepartmentForUser() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_DEPARTMENT_FOR_USER, param, headers)
}

export function getListBranch() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_BRANCH, param, headers)
}

export function getListAllUser(params) {
  let param = null
  if (params) {
    const getListUserRequest = new GetListUserRequest()
    getListUserRequest.addParam(GetListUserRequest.Keys.EXCEPT_AUTH, params.except_auth || '')
    param = getListUserRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_USER_ALL, param, headers)
}

//Department

export function getListDepartment(params) {
  let param = null
  if (params) {
    const getListDepartmentRequest = new GetListDepartmentRequest()
    getListDepartmentRequest.addParam(GetListDepartmentRequest.Keys.PAGE, params.page || '')
    param = getListDepartmentRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_DEPARTMENTS, param, headers)
}

export function createDepartment(params) {
  const createDepartmentRequest = new CreateDepartmentRequest()
  createDepartmentRequest.addParam(CreateDepartmentRequest.Keys.DEPARTMENT_NAME, params.department_name || '')
  createDepartmentRequest.addParam(CreateDepartmentRequest.Keys.DESCRIPTION, params.description || '')
  const param = createDepartmentRequest.getParams()
  const headers = {}
  return post(urls.CREATE_DEPARTMENT, param, headers)
}

export function updateDepartment(params) {
  const updateDepartmentRequest = new UpdateDepartmentRequest()
  updateDepartmentRequest.addParam(UpdateDepartmentRequest.Keys.DEPARTMENT_ID, params.id || '')
  updateDepartmentRequest.addParam(UpdateDepartmentRequest.Keys.DEPARTMENT_NAME, params.department_name || '')
  updateDepartmentRequest.addParam(UpdateDepartmentRequest.Keys.DESCRIPTION, params.description || '')
  const param = updateDepartmentRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_DEPARTMENT, param, headers)
}

export function getDetailDepartment(departmentId) {
  const getDetailDepartmentRequest = new GetDetailDepartmentRequest()
  getDetailDepartmentRequest.addParam(GetDetailDepartmentRequest.Keys.DEPARTMENT_ID, departmentId)
  const param = getDetailDepartmentRequest.getParams()
  const headers = {}
  return get(urls.GET_DETAIL_DEPARTMENT, param, headers)
}

export function deleteDepartment(userId) {
  const headers = {}
  const deleteDepartmentRequest = new DeleteDepartmentRequest()
  deleteDepartmentRequest.addParam(DeleteDepartmentRequest.Keys.DEPARTMENT_ID, userId)
  const params = deleteDepartmentRequest.getParams()
  return _delete(urls.DELETE_DEPARTMENT, params, headers)
}

export function getAllRoleForUser() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_ROLE_FOR_USER, param, headers)
}

export function getListPermissions() {
  let param = null
  const headers = {}
  return get(urls.LIST_PERMISSIONS, param, headers)
}

export function getDetailRoleWithPermissions(roleId) {
  const getDetailRoleWithPermissions = new GetDetailRoleWithPermissionsRequest()
  getDetailRoleWithPermissions.addParam(GetDetailRoleWithPermissionsRequest.Keys.ROLE_ID, roleId)
  const param = getDetailRoleWithPermissions.getParams()
  const headers = {}
  return get(urls.ROLE_WITH_PERMISSIONS_DETAIL, param, headers)
}

export function createRole(params) {
  const createRoleRequest = new CreateRoleRequest()
  createRoleRequest.addParam(CreateRoleRequest.Keys.DISPLAY_NAME, params.display_name || '')
  createRoleRequest.addParam(CreateRoleRequest.Keys.ROLE_TYPE, params.role_type || '')
  createRoleRequest.addParam(CreateRoleRequest.Keys.PERMISSIONS, params.permissions || '')
  const param = createRoleRequest.getParams()
  const headers = {}
  return post(urls.CREATE_ROLE, param, headers)
}

export function getListRoleType() {
  let param = null
  const headers = {}
  return get(urls.GET_LIST_ROLE_TYPE, param, headers)
}

export function updateRole(params) {
  const updateRoleRequest = new UpdateRoleRequest()
  updateRoleRequest.addParam(UpdateRoleRequest.Keys.ROLE_ID, params.id || '')
  updateRoleRequest.addParam(UpdateRoleRequest.Keys.DISPLAY_NAME, params.display_name || '')
  updateRoleRequest.addParam(UpdateRoleRequest.Keys.ROLE_TYPE, params.role_type || '')
  updateRoleRequest.addParam(UpdateRoleRequest.Keys.PERMISSIONS, params.permissions || '')
  const param = updateRoleRequest.getParams()
  const headers = {}
  return put(urls.UPDATE_ROLE, param, headers)
}

export function deleteRole(roleId) {
  const headers = {}
  const deleteRoleRequest = new DeleteRoleRequest()
  deleteRoleRequest.addParam(DeleteRoleRequest.Keys.ROLE_ID, roleId)
  const params = deleteRoleRequest.getParams()
  return _delete(urls.DELETE_ROLE, params, headers)
}
