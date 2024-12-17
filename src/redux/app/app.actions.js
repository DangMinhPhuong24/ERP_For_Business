import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getAllNotification,
  getDebtAge,
  getDebtGroups,
  getDistrictByProvinceId,
  getProvinceName,
  getWardByDistrictId,
  updateNotificationStatus,
  updateNotificationStatusAll
} from '../../repositories/remote/service/appService'
import { setDeleteMessageState } from '../customer/customer.slice'
import {
  getListAllDeliveryShift,
  getListAllPayment,
  getListAllTag
} from '../../repositories/remote/service/customerService'
import { setErrorMessage, setLoading } from '../app/app.slice'

export const loadingAction = createAsyncThunk('app/loading', async (credential) => {
  return credential
})

export const showToastAction = createAsyncThunk('app/toast', async (credential) => {
  return credential
})

export const getListProvinceAction = createAsyncThunk('app/getListProvince', async (credential, thunkAPI) => {
  try {
    const response = await getProvinceName()
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setErrorMessage(response.message))
  }
})

export const getListDistrictByProvinceIdAction = createAsyncThunk(
  'app/getListDistrictByProvinceId',
  async (credential) => {
    try {
      const response = await getDistrictByProvinceId(credential)
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const getListDistrictFactoryByProvinceIdAction = createAsyncThunk(
  'app/getListDistrictFactoryByProvinceId',
  async (credential) => {
    try {
      const response = await getDistrictByProvinceId(credential)
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const getListWardByDistrictIdAction = createAsyncThunk('app/getListWardByDistrictId', async (credential) => {
  try {
    const response = await getWardByDistrictId(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const getListWardFactoryByDistrictIdAction = createAsyncThunk(
  'app/getListWardFactoryByDistrictIdAction',
  async (credential) => {
    try {
      const response = await getWardByDistrictId(credential)
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const getListDebtGroupsAction = createAsyncThunk('app/getListDebtGroups', async (credential) => {
  try {
    const response = await getDebtGroups()
    return response.data
  } catch (response) {
    // throw new Error(response.message);
  }
})

export const getListDebtAgeAction = createAsyncThunk('app/getListDebtAge', async (credential) => {
  try {
    const response = await getDebtAge()
    return response.data
  } catch (response) {
    // throw new Error(response.response.data.message);
  }
})

export const getListAllPaymentAction = createAsyncThunk('app/getListAllPayment', async (credential, thunkAPI) => {
  try {
    thunkAPI.dispatch(setDeleteMessageState())
    const response = await getListAllPayment()
    return response.data
  } catch (response) {
    // throw new Error(response.response.data.message);
  }
})

export const getListAllDeliveryShiftAction = createAsyncThunk(
  'app/getListAllDeliveryShift',
  async (credential, thunkAPI) => {
    try {
      thunkAPI.dispatch(setDeleteMessageState())
      const response = await getListAllDeliveryShift()
      return response.data
    } catch (response) {
      // throw new Error(response.response.data.message);
    }
  }
)

export const getListAllTagAction = createAsyncThunk('app/getListAllTag', async (credential, thunkAPI) => {
  try {
    thunkAPI.dispatch(setDeleteMessageState())
    const response = await getListAllTag()
    return response.data
  } catch (response) {
    // throw new Error(response.response.data.message);
  }
})

export const clearDataDistrictAndWardAction = createAsyncThunk('app/clearDataDistrictAndWard', async (credential) => {
  return true
})

export const setGetListDistrictFlagAction = createAsyncThunk('app/setGetListDistrictFlag', async (credential) => {
  return credential
})

export const setGetListWardFlagAction = createAsyncThunk('app/setGetListWardFlag', async (credential) => {
  return credential
})

export const setGetListDistrictOfficeFlagAction = createAsyncThunk(
  'app/setGetListDistrictOfficeFlag',
  async (credential) => {
    return credential
  }
)

export const setGetListWardOfficeFlagAction = createAsyncThunk('app/setGetListWardOfficeFlag', async (credential) => {
  return credential
})

export const setGetListDistrictFactoryFlagAction = createAsyncThunk(
  'app/setGetListDistrictFactoryFlag',
  async (credential) => {
    return credential
  }
)

export const setGetListWardFactoryFlagAction = createAsyncThunk('app/setGetListWardFactoryFlag', async (credential) => {
  return credential
})

export const getAllNotificationAction = createAsyncThunk('app/getAllNotification', async (credential) => {
  try {
    const response = await getAllNotification(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const updateNotificationStatusAction = createAsyncThunk(
  'customer/updateNotificationStatus',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await updateNotificationStatus(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const updateNotificationStatusAllAction = createAsyncThunk(
  'customer/updateNotificationStatusAll',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await updateNotificationStatusAll(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
