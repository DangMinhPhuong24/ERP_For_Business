/* eslint-disable no-param-reassign */
/* redux-toolkit create slice with Immer reducer, no need "immutable" reducer here */
import { createSlice } from '@reduxjs/toolkit'
import {
  getRoleListAction,
  getUserListAction,
  deleteDataUserAction,
  getListRolesAction,
  createDataUserAction,
  removeMessageErrorAction,
  getUserDetailAction,
  updateDataUserAction,
  getListAllBranchAction,
  getListAllUserAction,
  getDepartmentDetailAction,
  updateDepartmentAction,
  createDepartmentAction,
  getListDepartmentAction,
  deleteDepartmentAction,
  getAllDepartmentAction,
  getAllDepartmentForUserAction,
  getAllRoleForUserAction,
  getListPermissionsAction,
  getDetailRoleWithPermissionsAction,
  createRoleAction,
  getListRoleTypeAction,
  updateRoleAction,
  deleteRoleAction
} from './account.actions'
import dimensions from '../../constants/dimensions'

const accountSlice = createSlice({
  name: 'account',
  initialState: {
    currentPage: dimensions.table.defaultCurrentPage,
    totalPages: dimensions.table.defaultTotalPages,
    roleCurrentPage: dimensions.table.defaultCurrentPage,
    roleTotalPages: dimensions.table.defaultTotalPages,
    roleListState: [],
    userListState: [],
    listRoles: [],
    listBranchs: [],
    userDetail: [],
    listAllUsers: [],
    listDepartments: [],
    departmentDetail: [],
    createDepartmentSuccessFlag: false,
    updateDepartmentSuccessFlag: false,
    deleteDepartmentSuccessFlag: false,
    errorCreateDepartmentMessage: '',
    errorUpdateDepartmentMessage: '',
    deleteUserSuccessFlag: false,
    createUserSuccessFlag: false,
    errorCreateUserMessage: '',
    updateUserSuccessFlag: false,
    errorUpdateUserMessage: '',
    departmentAll: [],
    departmentAllForUser: [],
    roleAllForUser: [],
    listPermissions: [],
    listRoleWithPermissionsDetail: [],
    createRoleSuccessFlag: false,
    updateRoleSuccessFlag: false,
    errorRoleMessage: '',
    listRoleType: [],
    deleteRoleSuccessFlag: false
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload
    },
    setRoleCurrentPage(state, action) {
      state.roleCurrentPage = action.payload
    },
    setRoleTotalPages(state, action) {
      state.roleTotalPages = action.payload
    },
    setUserCurrentPage(state, action) {
      state.userListPage = action.payload
    },
    setUserTotalPages(state, action) {
      state.userTotalPages = action.payload
    },
    setDeleteMessageState: (state) => {}
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRoleListAction.pending, (state) => {
        state.roleListState = []
      })
      .addCase(getRoleListAction.fulfilled, (state, action) => {
        state.roleListState = action.payload
      })
      .addCase(getRoleListAction.rejected, (state, action) => {
        state.roleListState = []
      })
      .addCase(getUserDetailAction.pending, (state) => {
        state.userDetail = []
      })
      .addCase(getUserDetailAction.fulfilled, (state, action) => {
        state.userDetail = action.payload
      })
      .addCase(getUserDetailAction.rejected, (state, action) => {
        state.userDetail = []
      })
      .addCase(getListRolesAction.pending, (state) => {
        state.listRoles = []
      })
      .addCase(getListRolesAction.fulfilled, (state, action) => {
        state.listRoles = action.payload
      })
      .addCase(getListRolesAction.rejected, (state, action) => {
        state.listRoles = []
      })
      .addCase(getUserListAction.pending, (state) => {
        state.userListState = []
      })
      .addCase(getUserListAction.fulfilled, (state, action) => {
        state.userListState = action.payload
      })
      .addCase(getUserListAction.rejected, (state, action) => {
        state.userListState = []
      })
      .addCase(deleteDataUserAction.pending, (state, action) => {
        state.deleteUserSuccessFlag = false
      })
      .addCase(deleteDataUserAction.fulfilled, (state, action) => {
        state.deleteUserSuccessFlag = true
      })
      .addCase(deleteDataUserAction.rejected, (state, action) => {
        state.deleteUserSuccessFlag = false
      })
      .addCase(createDataUserAction.pending, (state, action) => {
        state.createUserSuccessFlag = false
      })
      .addCase(createDataUserAction.fulfilled, (state, action) => {
        state.createUserSuccessFlag = true
        state.errorCreateUserMessage = ''
      })
      .addCase(createDataUserAction.rejected, (state, action) => {
        state.createUserSuccessFlag = false
        state.errorCreateUserMessage = action.payload
      })
      .addCase(removeMessageErrorAction.fulfilled, (state, action) => {
        state.errorCreateUserMessage = ''
        state.errorUpdateUserMessage = ''
        state.errorRoleMessage = ''
        state.createRoleSuccessFlag = false
        state.updateRoleSuccessFlag = false
      })
      .addCase(updateDataUserAction.pending, (state, action) => {
        state.updateUserSuccessFlag = false
      })
      .addCase(updateDataUserAction.fulfilled, (state, action) => {
        state.updateUserSuccessFlag = true
        state.errorUpdateUserMessage = ''
      })
      .addCase(updateDataUserAction.rejected, (state, action) => {
        state.updateUserSuccessFlag = false
        state.errorUpdateUserMessage = action.payload
      })
      .addCase(getListAllBranchAction.pending, (state) => {
        state.listBranchs = []
      })
      .addCase(getListAllBranchAction.fulfilled, (state, action) => {
        state.listBranchs = action.payload
      })
      .addCase(getListAllBranchAction.rejected, (state, action) => {
        state.listBranchs = []
      })
      .addCase(getListAllUserAction.pending, (state, action) => {
        state.listAllUsers = []
      })
      .addCase(getListAllUserAction.fulfilled, (state, action) => {
        state.listAllUsers = action.payload
      })
      .addCase(getListAllUserAction.rejected, (state, action) => {
        state.listAllUsers = []
      })
      .addCase(getListDepartmentAction.pending, (state, action) => {
        state.listDepartments = []
      })
      .addCase(getListDepartmentAction.fulfilled, (state, action) => {
        state.listDepartments = action.payload
      })
      .addCase(getListDepartmentAction.rejected, (state, action) => {
        state.listDepartments = []
      })
      .addCase(createDepartmentAction.pending, (state, action) => {
        state.createDepartmentSuccessFlag = false
      })
      .addCase(createDepartmentAction.fulfilled, (state, action) => {
        state.createDepartmentSuccessFlag = true
        state.errorCreateDepartmentMessage = ''
      })
      .addCase(createDepartmentAction.rejected, (state, action) => {
        state.createDepartmentSuccessFlag = false
        state.errorCreateDepartmentMessage = action.error?.message
      })
      .addCase(updateDepartmentAction.pending, (state, action) => {
        state.updateDepartmentSuccessFlag = false
      })
      .addCase(updateDepartmentAction.fulfilled, (state, action) => {
        state.updateDepartmentSuccessFlag = true
        state.errorUpdateDepartmentMessage = ''
      })
      .addCase(updateDepartmentAction.rejected, (state, action) => {
        state.updateDepartmentSuccessFlag = false
        state.errorUpdateDepartmentMessage = action.error?.message
      })
      .addCase(getDepartmentDetailAction.pending, (state) => {
        state.departmentDetail = []
      })
      .addCase(getDepartmentDetailAction.fulfilled, (state, action) => {
        state.departmentDetail = action.payload
      })
      .addCase(getDepartmentDetailAction.rejected, (state, action) => {
        state.departmentDetail = []
      })
      .addCase(deleteDepartmentAction.pending, (state, action) => {
        state.deleteDepartmentSuccessFlag = false
      })
      .addCase(deleteDepartmentAction.fulfilled, (state, action) => {
        if (state.currentPage >= action.payload.total_pages) {
          state.currentPage = action.payload.total_pages
        }
        state.deleteDepartmentSuccessFlag = true
      })
      .addCase(deleteDepartmentAction.rejected, (state, action) => {
        state.deleteDepartmentSuccessFlag = false
      })
      .addCase(getAllDepartmentAction.pending, (state) => {
        state.departmentAll = []
      })
      .addCase(getAllDepartmentAction.fulfilled, (state, action) => {
        state.departmentAll = action.payload
      })
      .addCase(getAllDepartmentAction.rejected, (state, action) => {
        state.departmentAll = []
      })
      .addCase(getAllDepartmentForUserAction.pending, (state) => {
        state.departmentAllForUser = []
      })
      .addCase(getAllDepartmentForUserAction.fulfilled, (state, action) => {
        state.departmentAllForUser = action.payload
      })
      .addCase(getAllDepartmentForUserAction.rejected, (state, action) => {
        state.departmentAllForUser = []
      })
      .addCase(getAllRoleForUserAction.pending, (state) => {
        state.roleAllForUser = []
      })
      .addCase(getAllRoleForUserAction.fulfilled, (state, action) => {
        state.roleAllForUser = action.payload
      })
      .addCase(getAllRoleForUserAction.rejected, (state, action) => {
        state.roleAllForUser = []
      })
      .addCase(getListPermissionsAction.pending, (state) => {
        state.listPermissions = []
      })
      .addCase(getListPermissionsAction.fulfilled, (state, action) => {
        state.listPermissions = action.payload
      })
      .addCase(getListPermissionsAction.rejected, (state, action) => {
        state.listPermissions = []
      })
      .addCase(getDetailRoleWithPermissionsAction.pending, (state) => {
        state.listRoleWithPermissionsDetail = []
      })
      .addCase(getDetailRoleWithPermissionsAction.fulfilled, (state, action) => {
        state.listRoleWithPermissionsDetail = action.payload
      })
      .addCase(getDetailRoleWithPermissionsAction.rejected, (state, action) => {
        state.listRoleWithPermissionsDetail = []
      })
      .addCase(createRoleAction.pending, (state, action) => {
        state.createRoleSuccessFlag = false
      })
      .addCase(createRoleAction.fulfilled, (state, action) => {
        state.createRoleSuccessFlag = true
        state.errorRoleMessage = ''
      })
      .addCase(createRoleAction.rejected, (state, action) => {
        state.createRoleSuccessFlag = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.errorRoleMessage = errorMessage
      })
      .addCase(getListRoleTypeAction.pending, (state) => {
        state.listRoleType = []
      })
      .addCase(getListRoleTypeAction.fulfilled, (state, action) => {
        state.listRoleType = action.payload
      })
      .addCase(getListRoleTypeAction.rejected, (state, action) => {
        state.listRoleType = []
      })
      .addCase(updateRoleAction.pending, (state, action) => {
        state.updateRoleSuccessFlag = false
      })
      .addCase(updateRoleAction.fulfilled, (state, action) => {
        state.updateRoleSuccessFlag = true
        state.errorRoleMessage = ''
      })
      .addCase(updateRoleAction.rejected, (state, action) => {
        state.updateRoleSuccessFlag = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.errorRoleMessage = errorMessage
      })
      .addCase(deleteRoleAction.pending, (state, action) => {
        state.deleteRoleSuccessFlag = false
      })
      .addCase(deleteRoleAction.fulfilled, (state, action) => {
        state.deleteRoleSuccessFlag = true
      })
      .addCase(deleteRoleAction.rejected, (state, action) => {
        state.deleteRoleSuccessFlag = false
      })
  }
})
export const {
  setCurrentPage,
  setTotalPages,
  setDeleteMessageState,
  setUserCurrentPage,
  setUserTotalPages,
  setRoleCurrentPage,
  setRoleTotalPages
} = accountSlice.actions
export default accountSlice
