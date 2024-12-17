import { createAsyncThunk } from '@reduxjs/toolkit'
import { setLoading, setShowToast, setToastMessage, setToastIsSuccess } from '../app/app.slice'
import {
  deleteUser,
  getListRoles,
  getListUsers,
  getListRole,
  createUser,
  getUserInformation,
  updateUser,
  getListBranch,
  getListAllUser,
  getListDepartment,
  createDepartment,
  updateDepartment,
  getDetailDepartment,
  deleteDepartment,
  getAllDepartment,
  getAllDepartmentForUser,
  getAllRoleForUser,
  getListPermissions,
  getDetailRoleWithPermissions,
  createRole,
  getListRoleType,
  updateRole,
  deleteRole
} from '../../repositories/remote/service/accountService'
import {
  setCurrentPage,
  setDeleteMessageState,
  setTotalPages,
  setUserTotalPages,
  setUserCurrentPage,
  setRoleTotalPages,
  setRoleCurrentPage
} from '../account/account.slice'

export const getRoleListAction = createAsyncThunk('account/getListRole', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    thunkAPI.dispatch(setDeleteMessageState())
    const response = await getListRoles(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setRoleCurrentPage(response.current_page))
    thunkAPI.dispatch(setRoleTotalPages(response.total_pages))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getUserDetailAction = createAsyncThunk('account/getUserDetail', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    thunkAPI.dispatch(setDeleteMessageState())
    const response = await getUserInformation(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getUserListAction = createAsyncThunk('account/getListUser', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    thunkAPI.dispatch(setDeleteMessageState())
    const response = await getListUsers(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setUserCurrentPage(response.current_page))
    thunkAPI.dispatch(setUserTotalPages(response.total_pages))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const deleteDataUserAction = createAsyncThunk('account/deleteUser', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await deleteUser(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const createDataUserAction = createAsyncThunk('account/createUser', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await createUser(credential)
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
    return thunkAPI.rejectWithValue(response.response.data.message)
  }
})

export const getListRolesAction = createAsyncThunk('product/getListRoles', async (credential, thunkAPI) => {
  try {
    const response = await getListRole(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const removeMessageErrorAction = createAsyncThunk('product/removeMessageError', async (credential, thunkAPI) => {
  return true
})

export const updateDataUserAction = createAsyncThunk('account/updateUser', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await updateUser(credential)
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
    return thunkAPI.rejectWithValue(response.response.data.message)
  }
})

export const getListAllBranchAction = createAsyncThunk('production/getListBranch', async (credential, thunkAPI) => {
  try {
    const response = await getListBranch(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const getListAllUserAction = createAsyncThunk('account/getListAllUser', async (credential) => {
  try {
    const response = await getListAllUser(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const getListDepartmentAction = createAsyncThunk('account/getListDepartment', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    thunkAPI.dispatch(setDeleteMessageState())
    const response = await getListDepartment(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setCurrentPage(response.current_page))
    thunkAPI.dispatch(setTotalPages(response.total_pages))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
  }
})

export const getAllDepartmentAction = createAsyncThunk('account/getAllDepartment', async (credential, thunkAPI) => {
  try {
    const response = await getAllDepartment(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const createDepartmentAction = createAsyncThunk('account/createDepartment', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await createDepartment(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllDepartmentForUserAction = createAsyncThunk(
  'account/getAllDepartmentForUser',
  async (credential, thunkAPI) => {
    try {
      const response = await getAllDepartmentForUser(credential)
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const updateDepartmentAction = createAsyncThunk('account/updateDepartment', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await updateDepartment(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getDepartmentDetailAction = createAsyncThunk(
  'account/getDepartmentDetail',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      thunkAPI.dispatch(setDeleteMessageState())
      const response = await getDetailDepartment(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const deleteDepartmentAction = createAsyncThunk('account/deleteDepartment', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await deleteDepartment(credential)
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

export const getAllRoleForUserAction = createAsyncThunk('account/getAllRoleForUser', async (credential, thunkAPI) => {
  try {
    const response = await getAllRoleForUser(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const getListPermissionsAction = createAsyncThunk('account/getListPermissions', async (credential, thunkAPI) => {
  try {
    const response = await getListPermissions(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const getDetailRoleWithPermissionsAction = createAsyncThunk(
  'account/getDetailRoleWithPermissions',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      thunkAPI.dispatch(setDeleteMessageState())
      const response = await getDetailRoleWithPermissions(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const createRoleAction = createAsyncThunk('account/createRole', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await createRole(credential)
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
    throw new Error(JSON.stringify(response.response.data.message))
  }
})

export const getListRoleTypeAction = createAsyncThunk('account/getRoleType', async (credential, thunkAPI) => {
  try {
    const response = await getListRoleType(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const updateRoleAction = createAsyncThunk('account/updateRole', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await updateRole(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(JSON.stringify(response.response.data.message))
  }
})

export const deleteRoleAction = createAsyncThunk('account/deleteRole', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await deleteRole(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})
