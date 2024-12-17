import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/auth.slice'
import appSlice from './app/app.slice'
import customerSlice from './customer/customer.slice'
import configSlice from './config/config.slice'
import oderSlice from './oder/oder.slice'
import productSlice from './product/product.slice'
import accountSlice from './account/account.slice'
import dashboardSlice from './dashboard/dashboard.slice'
import productionSlice from './production/production.slice'
import warehouseSlice from './warehouse/warehouse.slice'
import proposalSlice from './proposal/proposal.slice'
import calendarSlice from './calendar/calendar.slice'
import purchaseOrderSlice from './purchase/purchase.slice'

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authSlice.reducer,
    customer: customerSlice.reducer,
    config: configSlice.reducer,
    oder: oderSlice.reducer,
    product: productSlice.reducer,
    account: accountSlice.reducer,
    dashboard: dashboardSlice.reducer,
    production: productionSlice.reducer,
    warehouse: warehouseSlice.reducer,
    proposal: proposalSlice.reducer,
    calendar: calendarSlice.reducer,
    purchaseOrder: purchaseOrderSlice.reducer
  }
})

export default store
