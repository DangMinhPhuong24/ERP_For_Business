import { createAsyncThunk } from '@reduxjs/toolkit'
import { setLoading, setShowToast, setToastMessage, setToastIsSuccess } from '../app/app.slice'
import {
  setDeleteMessageState,
  setListQuotationHistoriesTotalPages,
  setListQuotationHistoriesCurrentPage,
  setListClaimHistoriesCurrentPage,
  setListClaimHistoriesTotalPages,
  setListProposalDebtAgeCurrentPage,
  setListProposalDebtAgeTotalPages
} from './customer.slice'
import {
  deleteCustomer,
  getListCustomer,
  createCustomer,
  getCustomerInformation,
  exportDataCustomerToExcel,
  updateCustomer,
  getListAllCustomer,
  createClaim,
  getListAllPayment,
  getListAllDeliveryShift,
  getListQuotation,
  getListAllFinishedProductForm,
  getListAllTag,
  createOder,
  getListQuotationHistoriesByCustomerId,
  getListAllProductForm,
  getListOrderByCustomer,
  getListAllStatusOrderByCustomer,
  getAllClaimStatus,
  getListClaimHistoriesByCustomerId,
  deleteClaim,
  getClaimInformation,
  updateClaim,
  createOderPreview,
  getDetailCustomerHandbookAll,
  updateCustomerHandbookAll,
  getAllProductSubstitutability,
  getAllIndustryGroup,
  getListProposalDebtAgeByCustomerId,
  getAllClaimProblem,
  getDetailQuotationHistory,
  deleteProposalDebtAge,
  updateProposalDebtAge,
  getAllProductType,
  createQuotationCustomerPreview,
  deleteQuotationHistory,
  updateQuotation,
  updateQuotationPreview,
  getAllPersonnelScale,
  getAllFactoryScale,
  getAllCompanyType,
  getAllQuanlityRequire,
  getAllProductApplication,
  getAllFrequencyCompanyVisit,
  getAllIncentivePolicy,
  getListDeviceMachines,
  getAllOrderPlan,
  getAllConsultationHistoryProblem,
  createCustomerPreview,
  getAllDeviceMachineType,
  getAllDeviceMachineManufacturer,
  getListConsultationHistories,
  createConsultationHistory,
  updateConsultationHistory,
  getDetailConsultationHistory,
  deleteConsultationHistory,
  getAllCustomerRank,
  updateOder,
  updateOderPreview
} from '../../repositories/remote/service/customerService'
import { getDebtAge, getDebtGroups, getSalesInCharge } from '../../repositories/remote/service/appService'
import {
  setCurrentPage,
  setTotalPages,
  setDataExportFlag,
  setListOrderByCustomerTotalPages,
  setListOrderByCustomerCurrentPage
} from './customer.slice'

export const getCustomerListAction = createAsyncThunk('customer/getList', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    thunkAPI.dispatch(setDeleteMessageState())
    const response = await getListCustomer(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setCurrentPage(response.current_page))
    thunkAPI.dispatch(setTotalPages(response.total_pages))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const createCustomerPreviewAction = createAsyncThunk(
  'customer/createCustomerPreview',
  async (credential, thunkAPI) => {
    try {
      const response = await createCustomerPreview(credential)
      return response.data
    } catch (response) {
      throw new Error(JSON.stringify(response.response.data.message))
    }
  }
)

export const createQuotationAction = createAsyncThunk('customer/storeQuotation', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    if (credential.data.warning !== '') {
      thunkAPI.dispatch(setToastMessage(credential.data.warning))
    } else {
      thunkAPI.dispatch(setToastMessage(credential.message))
    }
    thunkAPI.dispatch(setToastIsSuccess(true))
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.response.data.message))
    thunkAPI.dispatch(setToastIsSuccess(false))
  }
})

export const createQuotationPreviewAction = createAsyncThunk(
  'customer/createQuotationCustomerPreview',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await createQuotationCustomerPreview(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const createQuotationCatchAction = createAsyncThunk(
  'customer/storeQuotationCatch',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(credential))
    thunkAPI.dispatch(setToastIsSuccess(false))
  }
)

export const createQuotationSuccessAction = createAsyncThunk(
  'customer/storeQuotationSuccess',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(credential))
    thunkAPI.dispatch(setToastIsSuccess(true))
  }
)

export const deleteDataCustomerAction = createAsyncThunk('customer/deleteCustomer', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await deleteCustomer(credential)
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
export const getCustomerInformationAction = createAsyncThunk(
  'customer/getCustomerInformation',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getCustomerInformation(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const exportExcelDataCustomer = createAsyncThunk(
  'customer/exportDataCustomerToExcel',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await exportDataCustomerToExcel(credential)
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const updateCustomerAction = createAsyncThunk('customer/update', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await updateCustomer(credential)

    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response.data
  } catch (response) {
    throw new Error(JSON.stringify(response.response.data.message))
  }
})

export const getDebtGroupsAction = createAsyncThunk('customer/getDebtGroups', async (credential) => {
  try {
    const response = await getDebtGroups()
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const getListDebtAgeAction = createAsyncThunk('customer/getListDebtAge', async (credential) => {
  try {
    const response = await getDebtAge()
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const getListSalesInChargeAction = createAsyncThunk('customer/ListSalesInCharge', async (credential) => {
  try {
    const response = await getSalesInCharge()
    return response.data
  } catch (response) {
    // throw new Error(response.response.data.message);
  }
})

export const getListAllCustomerAction = createAsyncThunk(
  'customer/getListAllCustomer',
  async (credential, thunkAPI) => {
    try {
      thunkAPI.dispatch(setDeleteMessageState())
      const response = await getListAllCustomer()
      return response.data
    } catch (response) {
      // throw new Error(response.response.data.message);
    }
  }
)

export const getListAllPaymentAction = createAsyncThunk('customer/getListAllPayment', async (credential, thunkAPI) => {
  try {
    thunkAPI.dispatch(setDeleteMessageState())
    const response = await getListAllPayment()
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const getListAllProductFormAction = createAsyncThunk(
  'customer/getListAllProductForm',
  async (credential, thunkAPI) => {
    try {
      thunkAPI.dispatch(setDeleteMessageState())
      const response = await getListAllProductForm()
      return response.data
    } catch (response) {
      // throw new Error(response.response.data.message);
    }
  }
)

export const getListAllDeliveryShiftAction = createAsyncThunk(
  'customer/getListAllDeliveryShift',
  async (credential, thunkAPI) => {
    try {
      thunkAPI.dispatch(setDeleteMessageState())
      const response = await getListAllDeliveryShift()
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const getListAllFinishedProductFormAction = createAsyncThunk(
  'customer/getListAllFinishedProductForm',
  async (credential, thunkAPI) => {
    try {
      thunkAPI.dispatch(setDeleteMessageState())
      const response = await getListAllFinishedProductForm()
      return response.data
    } catch (response) {
      // throw new Error(response.response.data.message);
    }
  }
)

export const getListAllTagAction = createAsyncThunk('customer/getListAllTag', async (credential, thunkAPI) => {
  try {
    thunkAPI.dispatch(setDeleteMessageState())
    const response = await getListAllTag()
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})

export const createClaimAction = createAsyncThunk('customer/createClaim', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    thunkAPI.dispatch(setDeleteMessageState())
    const response = await createClaim(credential)
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

export const createOderAction = createAsyncThunk('customer/createOder', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    thunkAPI.dispatch(setDeleteMessageState())
    const response = await createOder(credential)
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

export const updateOderAction = createAsyncThunk('customer/updateOder', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    thunkAPI.dispatch(setDeleteMessageState())
    const response = await updateOder(credential)
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

export const getQuotationListAction = createAsyncThunk('customer/getQuotation', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    thunkAPI.dispatch(setDeleteMessageState())
    const response = await getListQuotation(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getQuotationHistoriesByCustomerIdAction = createAsyncThunk(
  'customer/getQuotationByCustomerId',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      thunkAPI.dispatch(setDeleteMessageState())
      const response = await getListQuotationHistoriesByCustomerId(credential)
      thunkAPI.dispatch(setListQuotationHistoriesCurrentPage(response.current_page))
      thunkAPI.dispatch(setListQuotationHistoriesTotalPages(response.total_pages))
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const updateStatusDataExportFlagAction = createAsyncThunk(
  'customer/updateStatusDataExportFlag',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setDataExportFlag())
  }
)

export const getListOrderByCustomerAction = createAsyncThunk(
  'customer/getListOrderByCustomer',
  async (credential, thunkAPI) => {
    try {
      const response = await getListOrderByCustomer(credential)
      thunkAPI.dispatch(setListOrderByCustomerCurrentPage(response.current_page))
      thunkAPI.dispatch(setListOrderByCustomerTotalPages(response.total_pages))
      return response.data
    } catch (e) {
      throw e
    }
  }
)

export const getListAllStatusOrderByCustomerAction = createAsyncThunk(
  'customer/getListAllStatusOrderByCustomer',
  async (credential, thunkAPI) => {
    try {
      const response = await getListAllStatusOrderByCustomer()
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllClaimStatusAction = createAsyncThunk('customer/getAllClaimStatus', async (credential, thunkAPI) => {
  try {
    const response = await getAllClaimStatus(credential)
    return response.data
  } catch (response) {
    throw new Error(response.response.data.message)
  }
})
export const getListClaimHistoriesByCustomerIdAction = createAsyncThunk(
  'customer/getListClaimHistoriesByCustomerId',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListClaimHistoriesByCustomerId(credential)
      thunkAPI.dispatch(setListClaimHistoriesCurrentPage(response.current_page))
      thunkAPI.dispatch(setListClaimHistoriesTotalPages(response.total_pages))
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
export const deleteClaimAction = createAsyncThunk('customer/deleteClaim', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await deleteClaim(credential)
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
export const getClaimInformationAction = createAsyncThunk(
  'customer/getClaimInformation',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getClaimInformation(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)
export const updateClaimAction = createAsyncThunk('customer/updateClaim', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await updateClaim(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.response.data.message))
    thunkAPI.dispatch(setToastIsSuccess(false))
    throw new Error(response.response.data.message)
  }
})

export const removeMessageErrorAction = createAsyncThunk(
  'customer/removeMessageError',
  async (credential, thunkAPI) => {
    return true
  }
)

export const createOderPreviewAction = createAsyncThunk('customer/createOderPreview', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await createOderPreview(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setDeleteMessageState())
    return response
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(JSON.stringify(response.response.data.message))
  }
})

export const updateOderPreviewAction = createAsyncThunk('customer/updateOderPreview', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await updateOderPreview(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setDeleteMessageState())
    return response
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(JSON.stringify(response.response.data.message))
  }
})

export const getDetailCustomerHandbookAllAction = createAsyncThunk(
  'customer/getDetailCustomerHandbookAll',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getDetailCustomerHandbookAll(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const updateCustomerHandbookAllAction = createAsyncThunk(
  'customer/updateCustomerHandbookAll',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await updateCustomerHandbookAll(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.response.data.message))
      thunkAPI.dispatch(setToastIsSuccess(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllProductSubstitutabilityAction = createAsyncThunk(
  'customer/getAllProductSubstitutability',
  async (credential, thunkAPI) => {
    try {
      const response = await getAllProductSubstitutability()
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllIndustryGroupAction = createAsyncThunk(
  'customer/getAllIndustryGroup',
  async (credential, thunkAPI) => {
    try {
      const response = await getAllIndustryGroup()
      return response.data
    } catch (response) {
      throw new Error(response.response.data.message)
    }
  }
)

export const getListProposalDebtAgeByCustomerIdAction = createAsyncThunk(
  'customer/getListProposalDebtAgeByCustomerId',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListProposalDebtAgeByCustomerId(credential)
      thunkAPI.dispatch(setListProposalDebtAgeCurrentPage(response.current_page))
      thunkAPI.dispatch(setListProposalDebtAgeTotalPages(response.total_pages))
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getAllClaimProblemAction = createAsyncThunk(
  'customer/getAllClaimProblem',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllClaimProblem(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getDetailQuotationHistoryAction = createAsyncThunk(
  'customer/getDetailQuotationHistory',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getDetailQuotationHistory(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const deleteProposalDebtAgeAction = createAsyncThunk(
  'customer/deleteProposalDebtAge',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await deleteProposalDebtAge(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const updateProposalDebtAgeAction = createAsyncThunk(
  'customer/updateProposalDebtAge',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await updateProposalDebtAge(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.response.data.message))
      thunkAPI.dispatch(setToastIsSuccess(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllProductTypeAction = createAsyncThunk('customer/getAllProductType', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getAllProductType(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const deleteQuotationHistoryAction = createAsyncThunk(
  'customer/deleteQuotationHistory',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await deleteQuotationHistory(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const updateQuotationAction = createAsyncThunk('customer/updateQuotation', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await updateQuotation(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.response.data.message))
    thunkAPI.dispatch(setToastIsSuccess(false))
    throw new Error(response.response.data.message)
  }
})

export const updateQuotationPreviewAction = createAsyncThunk(
  'customer/updateQuotationPreview',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await updateQuotationPreview(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllPersonnelScaleAction = createAsyncThunk(
  'customer/getAllPersonnelScale',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllPersonnelScale(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
export const getAllFactoryScaleAction = createAsyncThunk(
  'customer/getAllFactoryScale',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllFactoryScale(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
export const getAllCompanyTypeAction = createAsyncThunk('customer/getAllCompanyType', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getAllCompanyType(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllCustomerRankAction = createAsyncThunk(
  'customer/getAllCustomerRank',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllCustomerRank(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

//tab2
export const getAllOrderPlanAction = createAsyncThunk('customer/getAllOrderPlan', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getAllOrderPlan(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllQuanlityRequireAction = createAsyncThunk(
  'customer/getAllQuanlityRequire',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllQuanlityRequire(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
export const getAllProductApplicationAction = createAsyncThunk(
  'customer/getAllProductApplication',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllProductApplication(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
//tab3
export const getAllFrequencyCompanyVisitAction = createAsyncThunk(
  'customer/getAllFrequencyCompanyVisit',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllFrequencyCompanyVisit(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
export const getAllIncentivePolicyAction = createAsyncThunk(
  'customer/getAllIncentivePolicy',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllIncentivePolicy(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getListDeviceMachinesAction = createAsyncThunk(
  'customer/getListDeviceMachines',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListDeviceMachines(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllConsultationHistoryProblemAction = createAsyncThunk(
  'customer/getAllConsultationHistoryProblem',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllConsultationHistoryProblem(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const createCustomerAction = createAsyncThunk('customer/createCustomer', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await createCustomer(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.response.data.message))
    thunkAPI.dispatch(setToastIsSuccess(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllDeviceMachineTypeAction = createAsyncThunk(
  'customer/getAllDeviceMachineType',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllDeviceMachineType(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllDeviceMachineManufacturerAction = createAsyncThunk(
  'customer/getAllDeviceMachineManufacturer',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllDeviceMachineManufacturer(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getListConsultationHistoriesAction = createAsyncThunk(
  'customer/getListConsultationHistories',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListConsultationHistories(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setCurrentPage(response.current_page))
      thunkAPI.dispatch(setTotalPages(response.total_pages))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const createConsultationHistoryAction = createAsyncThunk(
  'customer/createConsultationHistory',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await createConsultationHistory(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.response.data.message))
      thunkAPI.dispatch(setToastIsSuccess(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getDetailConsultationHistoryAction = createAsyncThunk(
  'customer/getDetailConsultationHistory',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getDetailConsultationHistory(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const updateConsultationHistoryAction = createAsyncThunk(
  'customer/updateConsultationHistory',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await updateConsultationHistory(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.response.data.message))
      thunkAPI.dispatch(setToastIsSuccess(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const deleteConsultationHistoryAction = createAsyncThunk(
  'customer/deleteConsultationHistory',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await deleteConsultationHistory(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
