// @ts-nocheck
import { AuthContext } from 'contexts/AuthContext'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { getProfileState } from '../redux/auth/auth.selectors'
import { getProfileAction } from '../redux/auth/auth.actions'
import {
  getAllNotificationAction,
  getListAllDeliveryShiftAction,
  getListAllPaymentAction, getListAllTagAction,
  getListDebtAgeAction,
  getListDebtGroupsAction,
  getListProvinceAction
} from "../redux/app/app.actions";
import {
  getListAllCustomerAction,
  getListAllFinishedProductFormAction,
  getListAllProductFormAction,
  getListSalesInChargeAction
} from "../redux/customer/customer.actions";
import {getCookie} from "../utils";

const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch()

  const [userInfo, setUserInfo] = useState({})

  const getProfile = useSelector(getProfileState)
  const storedToken = getCookie('token')

  useEffect(() => {
    if(storedToken){
      dispatch(getProfileAction())
      dispatch(getListProvinceAction())
      dispatch(getListDebtGroupsAction())
      dispatch(getListDebtAgeAction())
      dispatch(getListAllPaymentAction())
      dispatch(getListAllDeliveryShiftAction())
      dispatch(getListAllTagAction())
      dispatch(getListAllFinishedProductFormAction())
      dispatch(getListAllProductFormAction())
      dispatch(getListSalesInChargeAction())
      dispatch(getListAllCustomerAction())
      dispatch(getAllNotificationAction({ offset: '' }))
    }
  }, [dispatch, storedToken])

  useEffect(() => {
    if (getProfile) {
      setUserInfo(getProfile)
    } else {
      setUserInfo({})
    }
  }, [getProfile])

  return <AuthContext.Provider value={{ userInfo, setUserInfo }}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
