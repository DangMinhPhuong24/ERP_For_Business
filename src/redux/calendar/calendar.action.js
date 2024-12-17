import { createAsyncThunk, isRejectedWithValue } from '@reduxjs/toolkit'
import {
  approveCalendarById,
  createCalendar,
  deleteCalendarById,
  detailCalendar,
  getAllCalendarByUserId,
  searchCalendarByUserId,
  updateCalendar
} from '../../repositories/remote/service/calendarService'

export const createCalendarAction = createAsyncThunk('calendar/createCalendar', async (credential, thunkAPI) => {
  try {
    const response = await createCalendar(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const getAllCalendarByUserIdAction = createAsyncThunk(
  'calendar/getAllCalendarByUserId',
  async (credential, thunkAPI) => {
    try {
      const response = await getAllCalendarByUserId(credential)
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const updateCalendarAction = createAsyncThunk('calendar/updateCalendarAction', async (credential, thunkAPI) => {
  try {
    const response = await updateCalendar(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const deleteCalendarAction = createAsyncThunk('calendar/deleteCalendarAction', async (credential, thunkAPI) => {
  try {
    const response = await deleteCalendarById(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const approveCalendarAction = createAsyncThunk(
  'calendar/approveCalendarAction',
  async (credential, thunkAPI) => {
    try {
      const response = await approveCalendarById(credential)
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const searchCalendarByUserIdAction = createAsyncThunk(
  'calendar/searchCalendarByUserIdAction',
  async (credential, thunkAPI) => {
    try {
      const response = await searchCalendarByUserId(credential)
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const detailCalendarAction = createAsyncThunk('calendar/detailCalendarAction', async (credential, thunkAPI) => {
  try {
    const response = await detailCalendar(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})
