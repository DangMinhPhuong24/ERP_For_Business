import {
  createCalendarAction,
  detailCalendarAction,
  getAllCalendarByUserIdAction,
  searchCalendarByUserIdAction
} from './calendar.action'
import { createSlice } from '@reduxjs/toolkit'

const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    createCalendarSuccessFully: '',
    errorCreateCalendarMessage: '',
    allCalendarByUserId: [],
    errorGetAll: '',
    calendarById: [],
    isErrorListCalendar: false,
    isLoadingListCalendar: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // create calendar
      .addCase(createCalendarAction.pending, (state) => {
        state.createCalendarSuccessFully = ''
      })
      .addCase(createCalendarAction.fulfilled, (state, action) => {
        state.createCalendarSuccessFully = action.payload
        state.errorCreateCalendarMessage = ''
      })
      .addCase(createCalendarAction.rejected, (state, action) => {
        state.createCalendarSuccessFully = ''
        state.errorCreateCalendarMessage = action.error?.message ?? ''
      })
      // get all calendar by user id
      .addCase(getAllCalendarByUserIdAction.fulfilled, (state, action) => {
        state.allCalendarByUserId = action.payload
      })
      .addCase(getAllCalendarByUserIdAction.rejected, (state, action) => {
        state.allCalendarByUserId = []
        state.isErrorListCalendar = true
      })
      // search all calendar by user id
      .addCase(searchCalendarByUserIdAction.fulfilled, (state, action) => {
        state.allCalendarByUserId = action.payload
      })
      .addCase(searchCalendarByUserIdAction.rejected, (state, action) => {
        state.allCalendarByUserId = []
        state.isErrorListCalendar = true
      })
      //detail calendar
      .addCase(detailCalendarAction.fulfilled, (state, action) => {
        state.calendarById = action.payload
      })
  }
})

export default calendarSlice
