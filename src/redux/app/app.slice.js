/* eslint-disable no-param-reassign */
/* redux-toolkit create slice with Immer reducer, no need "immutable" reducer here */
import { createSlice } from '@reduxjs/toolkit';
import {
    loadingAction,
    setGetListDistrictFactoryFlagAction,
    getListDistrictFactoryByProvinceIdAction, getListWardFactoryByDistrictIdAction,
    setGetListDistrictOfficeFlagAction, setGetListWardFactoryFlagAction,
    setGetListWardOfficeFlagAction,
    showToastAction, getAllNotificationAction, updateNotificationStatusAction,

} from './app.actions';
import {
  getListProvinceAction,
  getListDistrictByProvinceIdAction,
  getListWardByDistrictIdAction,
  getListDebtGroupsAction,
  getListDebtAgeAction,
  getListAllDeliveryShiftAction,
  getListAllPaymentAction,
  getListAllTagAction,
  clearDataDistrictAndWardAction,
  setGetListDistrictFlagAction,
  setGetListWardFlagAction
} from '../app/app.actions'
import commons from '../../../src/constants/common'
import { getListAllFinishedProductFormAction } from '../customer/customer.actions'

const appSlice = createSlice({
  name: 'app',
  initialState: {
      loading: false,
      appState: null,
      toastStatus: false,
      toastMessage: null,
      toastIsSuccess: null,
      provinceList: [],
      listDistrict: [],
      listWard: [],
      listAllFinishedProductForm:[],
      debtGroupList: [],
      debtAgeList: [],
      districtList:[],
      salesInChargeList: [],
      districtListTemp: [],
      wardList:[],
      wardListTemp: [],
      getDistrictToTempFlag: false,
      getWardToTempFlag: false,
      districtOfficeList:[],
      wardOfficeList:[],
      districtFactoryList:[],
      wardFactoryList:[],
      districtOfficeListTemp: [],
      wardOfficeListTemp: [],
      districtFactoryListTemp: [],
      wardFactoryListTemp: [],
      getDistrictOfficeToTempFlag: false,
      getWardOfficeToTempFlag: false,
      getDistrictFactoryToTempFlag: false,
      getWardFactoryToTempFlag: false,
      districtListTempFactory: [],
      wardListTempFactory: [],
      listAllPayment: [],
      listAllDeliveryShift: [],
      listAllTag: [],
      sidebarWidth:"",
      listAllNotification: [],
      sideBarStatus: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setAppState: (state, action) => {
      state.appState = action.payload
    },
    setShowToast: (state, action) => {
      state.toastStatus = action.payload
    },
    setToastMessage: (state, action) => {
      state.toastMessage = action.payload
    },
    setErrorMessage: (state, action) => {
      state.errorProvincMessage = action.payload
    },
    setToastIsSuccess: (state, action) => {
      if (action.payload) {
        state.toastIsSuccess = commons.STATUS_TOAST_SUCCESS
      } else {
        state.toastIsSuccess = commons.STATUS_TOAST_ERROR
      }
    },
    setSidebarWidth: (state, action) => {
      state.sidebarWidth = action.payload
    },
    setSideBarStatus: (state, action) => {
      state.sideBarStatus = action.payload
    }
  },
  extraReducers: (builder) => {
      builder
          .addCase(loadingAction.pending, (state) => {
                state.loading = true;
          })
          .addCase(loadingAction.fulfilled, (state, action) => {
                state.loading = action;
          })
          .addCase(showToastAction.pending, (state) => {
              state.toastStatus = false;
          })
          .addCase(showToastAction.fulfilled, (state, action) => {
              state.toastStatus = action.payload;
          })
          //get province list
          .addCase(getListProvinceAction.pending, (state, action) => {
              state.listDistrict = [];
              state.listWard = [];
          })
          .addCase(getListProvinceAction.fulfilled, (state, action) => {
              state.listDistrict = action.payload;
          })
          .addCase(getListProvinceAction.rejected, (state, action) => {
              state.toastStatus = true;
              // state.errorProvincMessage = action.error?.message;
              state.toastMessage = action.error?.message;
              state.toastIsSuccess = commons.STATUS_TOAST_ERROR;
          })
          //get district list by province id
          .addCase(getListDistrictByProvinceIdAction.pending, (state, action) => {
              state.wardList = [];
              state.wardOfficeList = [];
              state.wardFactoryList = [];
          })
          .addCase(getListDistrictByProvinceIdAction.fulfilled, (state, action) => {
              if (state.getDistrictToTempFlag) {
                  state.districtListTemp = action.payload;
                  state.getDistrictToTempFlag = false;
              } else {
                  state.districtList = action.payload;
              }
              if (state.getDistrictOfficeToTempFlag) {
                  state.districtOfficeListTemp = action.payload;
                  state.getDistrictOfficeToTempFlag = false;
              } else {
                  state.districtOfficeList = action.payload;
              }
              if (state.getDistrictFactoryToTempFlag) {
                  state.districtFactoryListTemp = action.payload;
                  state.getDistrictFactoryToTempFlag = false;
              } else {
                  state.districtFactoryList = action.payload;
              }
          })
          .addCase(getListDistrictByProvinceIdAction.rejected, (state, action) => {
              state.toastStatus = true;
              state.toastMessage = action.error?.message;
              state.toastIsSuccess = commons.STATUS_TOAST_ERROR;
          })
          //get district list factory by province id
          .addCase(getListDistrictFactoryByProvinceIdAction.pending, (state, action) => {
              state.wardList = []
          })
          .addCase(getListDistrictFactoryByProvinceIdAction.fulfilled, (state, action) => {
              if (state.getDistrictToTempFlag) {
                  state.districtListTempFactory = action.payload
                  state.getDistrictToTempFlag = false
              } else {
                  state.districtList = action.payload
              }
          })
          .addCase(getListDistrictFactoryByProvinceIdAction.rejected, (state, action) => {
              state.toastStatus = true
              state.toastMessage = action.error?.message
              state.toastIsSuccess = commons.STATUS_TOAST_ERROR
          })
          //get ward by district id
          .addCase(getListWardByDistrictIdAction.pending, (state, action) => {
              state.wardList = [];
              state.wardOfficeList = [];
              state.wardFactoryList = [];
          })
          .addCase(getListWardByDistrictIdAction.fulfilled, (state, action) => {
              if (state.getWardToTempFlag) {
                  state.wardListTemp = action.payload;
                  state.getWardToTempFlag = false;
              } else {
                  state.wardList = action.payload;
              }
              if (state.getWardOfficeToTempFlag) {
                  state.wardOfficeListTemp = action.payload;
                  state.getWardOfficeToTempFlag = false;
              } else {
                  state.wardOfficeList = action.payload;
              }
              if (state.getWardFactoryToTempFlag) {
                  state.wardFactoryListTemp = action.payload;
                  state.getWardFactoryToTempFlag = false;
              } else {
                  state.wardFactoryList = action.payload;
              }
          })
          .addCase(getListWardByDistrictIdAction.rejected, (state, action) => {
              state.toastStatus = true;
              state.toastMessage = action.error?.message;
              state.toastIsSuccess = commons.STATUS_TOAST_ERROR;
          })
          // get ward factory by district id
          .addCase(getListWardFactoryByDistrictIdAction.fulfilled, (state, action) => {
              if (state.getWardToTempFlag) {
                  state.wardListTempFactory = action.payload
                  state.getWardToTempFlag = false
              } else {
                  state.wardList = action.payload
              }
          })
          //get list debt group
          .addCase(getListDebtGroupsAction.pending, (state, action) => {
              state.debtGroupList = [];
          })
          .addCase(getListDebtGroupsAction.fulfilled, (state, action) => {
              state.debtGroupList = action.payload;
          })
          .addCase(getListDebtGroupsAction.rejected, (state, action) => {
              state.toastStatus = true;
              state.toastMessage = action.error?.message;
              state.toastIsSuccess = commons.STATUS_TOAST_ERROR;
          })

      //get list debt age
      .addCase(getListDebtAgeAction.pending, (state, action) => {
        state.debtAgeList = []
      })
      .addCase(getListDebtAgeAction.fulfilled, (state, action) => {
        state.debtAgeList = action.payload
      })
      .addCase(getListDebtAgeAction.rejected, (state, action) => {
        state.toastStatus = true
        state.toastMessage = action.error?.message
        state.toastIsSuccess = commons.STATUS_TOAST_ERROR
      })

      //get list payment
      .addCase(getListAllPaymentAction.pending, (state, action) => {
        state.listAllPayment = []
      })
      .addCase(getListAllPaymentAction.fulfilled, (state, action) => {
        state.listAllPayment = action.payload
      })
      .addCase(getListAllPaymentAction.rejected, (state, action) => {
        state.toastStatus = true
        state.toastMessage = action.error?.message
        state.toastIsSuccess = commons.STATUS_TOAST_ERROR
      })

      //get list delivery shift
      .addCase(getListAllDeliveryShiftAction.pending, (state, action) => {
        state.listAllDeliveryShift = []
      })
      .addCase(getListAllDeliveryShiftAction.fulfilled, (state, action) => {
        state.listAllDeliveryShift = action.payload
      })
      .addCase(getListAllDeliveryShiftAction.rejected, (state, action) => {
        state.toastStatus = true
        state.toastMessage = action.error?.message
        state.toastIsSuccess = commons.STATUS_TOAST_ERROR
      })

      //get list all tag
      .addCase(getListAllTagAction.pending, (state, action) => {
        state.listAllTag = []
      })
      .addCase(getListAllTagAction.fulfilled, (state, action) => {
        state.listAllTag = action.payload
      })
      .addCase(getListAllTagAction.rejected, (state, action) => {
        state.toastStatus = true
        state.toastMessage = action.error?.message
        state.toastIsSuccess = commons.STATUS_TOAST_ERROR
      })

          .addCase(clearDataDistrictAndWardAction.fulfilled, (state, action) => {
              state.districtList = [];
              state.wardList = [];
          })
          .addCase(setGetListDistrictFlagAction.fulfilled, (state, action) => {
              state.getDistrictToTempFlag = action;
          })
          .addCase(setGetListWardFlagAction.fulfilled, (state, action) => {
              state.getWardToTempFlag = action;
          })
          .addCase(setGetListDistrictOfficeFlagAction.fulfilled, (state, action) => {
              state.getDistrictOfficeToTempFlag = action;
          })
          .addCase(setGetListWardOfficeFlagAction.fulfilled, (state, action) => {
              state.getWardOfficeToTempFlag = action;
          })
          .addCase(setGetListDistrictFactoryFlagAction.fulfilled, (state, action) => {
              state.getDistrictFactoryToTempFlag = action;
          })
          .addCase(setGetListWardFactoryFlagAction.fulfilled, (state, action) => {
              state.getWardFactoryToTempFlag = action;
          })
          .addCase(getListAllFinishedProductFormAction.pending, (state, action) => {
              state.listAllFinishedProductForm = [];
          })
          .addCase(getListAllFinishedProductFormAction.fulfilled, (state, action) => {
              state.listAllFinishedProductForm = action.payload;
          })
          .addCase(getListAllFinishedProductFormAction.rejected, (state, action) => {
              state.listAllFinishedProductForm = [];
          })
          .addCase(getAllNotificationAction.pending, (state, action) => {
              state.listAllNotification = [];
          })
          .addCase(getAllNotificationAction.fulfilled, (state, action) => {
              state.listAllNotification = action.payload;
          })
          .addCase(getAllNotificationAction.rejected, (state, action) => {
              state.listAllNotification = [];
          })
  },
});

export const { setLoading } = appSlice.actions
export const { setAppState } = appSlice.actions
export const { setShowToast } = appSlice.actions
export const { setToastMessage } = appSlice.actions
export const { setToastIsSuccess } = appSlice.actions
export const { setSidebarWidth } = appSlice.actions
export const { setSideBarStatus } = appSlice.actions
export const { setErrorMessage } = appSlice.actions
export default appSlice
