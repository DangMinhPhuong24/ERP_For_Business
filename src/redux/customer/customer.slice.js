/* eslint-disable no-param-reassign */
/* redux-toolkit create slice with Immer reducer, no need "immutable" reducer here */
import { createSlice } from '@reduxjs/toolkit'
import dimensions from '../../constants/dimensions'
import {
  deleteDataCustomerAction,
  createCustomerPreviewAction,
  getCustomerListAction,
  getCustomerInformationAction,
  exportExcelDataCustomer,
  updateCustomerAction,
  getListDebtAgeAction,
  getDebtGroupsAction,
  getListSalesInChargeAction,
  getListAllCustomerAction,
  createClaimAction,
  getQuotationListAction,
  createQuotationAction,
  getQuotationHistoriesByCustomerIdAction,
  getListAllFinishedProductFormAction,
  createOderAction,
  getListOrderByCustomerAction,
  getListAllStatusOrderByCustomerAction,
  getListAllProductFormAction,
  getAllClaimStatusAction,
  getListClaimHistoriesByCustomerIdAction,
  deleteClaimAction,
  getClaimInformationAction,
  updateClaimAction,
  removeMessageErrorAction,
  createOderPreviewAction,
  getDetailCustomerHandbookAllAction,
  updateCustomerHandbookAllAction,
  getAllIndustryGroupAction,
  getAllProductSubstitutabilityAction,
  getListProposalDebtAgeByCustomerIdAction,
  getAllClaimProblemAction,
  getDetailQuotationHistoryAction,
  deleteProposalDebtAgeAction,
  updateProposalDebtAgeAction,
  createQuotationPreviewAction,
  getAllProductTypeAction,
  deleteQuotationHistoryAction,
  updateQuotationAction,
  updateQuotationPreviewAction,
  getAllFactoryScaleAction,
  getAllPersonnelScaleAction,
  getAllCompanyTypeAction,
  getAllQuanlityRequireAction,
  getAllProductApplicationAction,
  getAllFrequencyCompanyVisitAction,
  getAllIncentivePolicyAction,
  getListDeviceMachinesAction,
  getAllOrderPlanAction,
  getAllConsultationHistoryProblemAction,
  createCustomerAction,
  getAllDeviceMachineTypeAction,
  getAllDeviceMachineManufacturerAction,
  getListConsultationHistoriesAction,
  createConsultationHistoryAction,
  getDetailConsultationHistoryAction,
  deleteConsultationHistoryAction,
  getAllCustomerRankAction,
  updateOderAction,
  updateOderPreviewAction
} from './customer.actions'
import appSlice from '../app/app.slice'
import { getAllSupplierAction } from '../product/product.actions'

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customerListState: [],
    quotationListState: [],
    customerDetailState: {},
    customerOfficeAddress: [{ province_id: '', district_id: '', ward_id: '', detail: '' }],
    customerFactoryAddress: [{ province_id: '', district_id: '', ward_id: '', detail: '' }],
    errorMessage: '',
    createCustomerSuccessFlag: false,
    errorCreateCustomerMessage: '',
    createQuotationSuccessFlag: false,
    errorCreateQuotationMessage: '',
    currentPage: dimensions.table.defaultCurrentPage,
    totalPages: dimensions.table.defaultTotalPages,
    deleteCustomerSuccessFlag: false,
    exportCustomerErrorMessage: '',
    dataCustomerExport: [],
    getDataExportFlag: false,
    updateCustomerSuccessFlag: false,
    errorUpdateCustomerMessage: '',
    errorGetDetailCustomerMessage: '',
    provinceList: [],
    districtList: [],
    wardList: [],
    debtGroupList: [],
    debtAgeList: [],
    salesInChargeList: [],
    districtListTemp: [],
    wardListTemp: [],
    getDistrictToTempFlag: false,
    getWardToTempFlag: false,
    listAllCustomer: [],
    listAllPayment: [],
    listAllDeliveryShift: [],
    listAllTag: [],
    listAllProductForm: [],
    listAllUser: [],
    createClaimSuccessFlag: false,
    createOderErrorMessage: '',
    createOderSuccessFlag: false,
    updateOderSuccessFlag: false,
    updateOderErrorMessage: '',
    updateOderPreviewSuccessFlag: false,
    updateOderPreviewErrorMessage: '',
    listQuotationHistories: [],
    listOrderByCustomer: [],
    getListAllStatusOrderByCustomer: [],
    listAllClaimStatus: [],
    listClaimHistories: [],
    deleteClaimSuccessMessage: null,
    deleteClaimErrorMessage: null,
    claimDetailState: {},
    updateClaimSuccessFlag: false,
    errorUpdateClaimMessage: '',
    createOderPreviewErrorMessage: false,
    createOderPreviewSuccessFlag: false,
    listDetailCustomerHandbook: [],
    updateCustomerHandbookFlag: false,
    updateCustomerHandbookErrorMessage: '',
    listAllProductSubstitutability: [],
    listAllIndustryGroup: [],
    listProposalDebtAgeByCustomerId: [],
    listAllClaimProblem: [],
    detailQuotationHistory: [],
    deleteProposalDebtAgeSuccessMessage: null,
    deleteProposalDebtAgeErrorMessage: null,
    updateProposalDebtAgeSuccessMessage: '',
    updateProposalDebtAgeErrorMessage: false,
    createQuotationPreviewSuccessFlag: '',
    errorCreateQuotationPreviewMessage: '',
    listAllProductType: [],
    deleteQuotationHistorySuccessMessage: null,
    deleteQuotationHistoryErrorMessage: null,
    updateQuotationHistorySuccessMessage: '',
    updateQuotationHistoryErrorMessage: false,
    updateQuotationPreviewSuccessFlag: '',
    errorUpdateQuotationPreviewMessage: '',
    listAllPersonnelScale: [],
    listAllFactoryScale: [],
    listAllCompanyType: [],
    listAllOrderPlan: [],
    listAllQuanlityRequire: [],
    listAllProductApplication: [],
    listAllFrequencyCompanyVisit: [],
    listAllIncentivePolicy: [],
    listDeviceMachines: [],
    listAllConsultationHistoryProblem: [],
    createCustomerErrorMessage: '',
    createCustomerSuccessMessage: false,
    listAllDeviceMachineType: [],
    listAllDeviceMachineManufacturer: [],
    listConsultationHistories: [],
    createConsultationHistorySuccessMessage: '',
    createConsultationHistoryErrorMessage: '',
    updateConsultationHistorySuccessMessage: '',
    updateConsultationHistoryErrorMessage: false,
    deleteConsultationHistorySuccessMessage: null,
    deleteConsultationHistoryErrorMessage: '',
    detailConsultationHistory: {},
    deleteConsultationHistorySuccessFlag: false,
    listAllCustomerRank: []
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload
    },
    setDeleteMessageState: (state) => {
      state.deleteCustomerSuccessMessage = null
      state.deleteCustomerErrorMessage = null
    },
    setListQuotationHistoriesCurrentPage(state, action) {
      state.quotationHistoriesListPage = action.payload
    },
    setListQuotationHistoriesTotalPages(state, action) {
      state.quotationHistoriesListTotalPages = action.payload
    },
    setDataExportFlag(state) {
      state.getDataExportFlag = false
    },
    setListOrderByCustomerCurrentPage(state, action) {
      state.listOrderByCustomerPage = action.payload
    },
    setListOrderByCustomerTotalPages(state, action) {
      state.listOrderByCustomerTotalPages = action.payload
    },
    setListClaimHistoriesCurrentPage(state, action) {
      state.claimHistoriesListPage = action.payload
    },
    setListClaimHistoriesTotalPages(state, action) {
      state.claimHistoriesListTotalPages = action.payload
    },
    setListProposalDebtAgeCurrentPage(state, action) {
      state.proposalDebtAgeCurrentPage = action.payload
    },
    setListProposalDebtAgeTotalPages(state, action) {
      state.proposalDebtAgeTotalPages = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerListAction.pending, (state) => {
        state.customerListState = []
      })
      .addCase(getCustomerListAction.fulfilled, (state, action) => {
        state.customerListState = action.payload
      })
      .addCase(getCustomerListAction.rejected, (state, action) => {
        state.customerListState = []
      })
      .addCase(getQuotationListAction.pending, (state) => {
        state.quotationListState = []
      })
      .addCase(getQuotationListAction.fulfilled, (state, action) => {
        state.quotationListState = action.payload
      })
      .addCase(getQuotationListAction.rejected, (state, action) => {
        state.quotationListState = []
      })
      .addCase(getCustomerInformationAction.pending, (state) => {
        state.customerDetailState = []
        state.customerOfficeAddress = [{ province_id: '', district_id: '', ward_id: '', detail: '' }]
        state.customerFactoryAddress = [{ province_id: '', district_id: '', ward_id: '', detail: '' }]
      })
      .addCase(getCustomerInformationAction.fulfilled, (state, action) => {
        state.customerDetailState = action.payload
        if (action.payload.address_offices) {
          let addressOfficeArr = []
          action.payload.address_offices.forEach((value, index) => {
            let officeAddress = {
              province_id: value.address.province.id,
              district_id: value.address.district.id,
              ward_id: value.address.ward.id,
              detail: value.address.detail
            }
            addressOfficeArr.push(officeAddress)
          })
          state.customerOfficeAddress = addressOfficeArr
        }
        if (action.payload.address_factories) {
          let addressFactoryArr = []
          action.payload.address_factories.forEach((value, index) => {
            let factoryAddress = {
              province_id: value.address.province.id,
              district_id: value.address.district.id,
              ward_id: value.address.ward.id,
              detail: value.address.detail
            }
            addressFactoryArr.push(factoryAddress)
          })
          state.customerFactoryAddress = addressFactoryArr
        }
      })
      .addCase(getCustomerInformationAction.rejected, (state, action) => {
        state.customerOfficeAddress = [{ province_id: '', district_id: '', ward_id: '', detail: '' }]
        state.customerFactoryAddress = [{ province_id: '', district_id: '', ward_id: '', detail: '' }]
      })
      .addCase(createCustomerPreviewAction.pending, (state) => {
        state.createCustomerSuccessFlag = false
      })
      .addCase(createCustomerPreviewAction.fulfilled, (state, action) => {
        state.createCustomerSuccessFlag = true
      })
      .addCase(createCustomerPreviewAction.rejected, (state, action) => {
        state.createCustomerSuccessFlag = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.errorCreateCustomerMessage = errorMessage
      })
      .addCase(createQuotationAction.pending, (state) => {
        state.createQuotationSuccessFlag = false
      })
      .addCase(createQuotationAction.fulfilled, (state, action) => {
        state.createQuotationSuccessFlag = true
        state.errorCreateQuotationMessageMessage = ''
      })
      .addCase(createQuotationAction.rejected, (state, action) => {
        state.createQuotationSuccessFlag = false
        state.errorCreateQuotationMessageMessage = action.error?.message
      })
      .addCase(deleteDataCustomerAction.pending, (state, action) => {
        state.deleteCustomerSuccessFlag = false
      })
      .addCase(deleteDataCustomerAction.fulfilled, (state, action) => {
        if (state.currentPage >= action.payload.total_pages) {
          state.currentPage = action.payload.total_pages
        }
        state.deleteCustomerSuccessFlag = true
      })
      .addCase(deleteDataCustomerAction.rejected, (state, action) => {
        state.deleteCustomerSuccessFlag = false
      })

      .addCase(exportExcelDataCustomer.pending, (state, action) => {
        state.dataCustomerExport = []
        state.getDataExportFlag = false
      })
      .addCase(exportExcelDataCustomer.fulfilled, (state, action) => {
        state.dataCustomerExport = action.payload
        state.getDataExportFlag = true
      })
      .addCase(exportExcelDataCustomer.rejected, (state, action) => {
        state.exportCustomerErrorMessage = action.error?.message
        state.getDataExportFlag = false
      })

      .addCase(updateCustomerAction.pending, (state) => {
        state.updateCustomerSuccessFlag = false
      })
      .addCase(updateCustomerAction.fulfilled, (state, action) => {
        state.updateCustomerSuccessFlag = true
        state.errorUpdateCustomerMessage = ''
      })
      .addCase(updateCustomerAction.rejected, (state, action) => {
        state.updateCustomerSuccessFlag = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.errorUpdateCustomerMessage = errorMessage
      })
      .addCase(getListDebtAgeAction.pending, (state, action) => {
        state.debtAgeList = []
      })
      .addCase(getListDebtAgeAction.fulfilled, (state, action) => {
        state.debtAgeList = action.payload
      })
      .addCase(getDebtGroupsAction.rejected, (state, action) => {
        state.debtAgeList = []
      })
      .addCase(getListSalesInChargeAction.pending, (state, action) => {
        state.salesInChargeList = []
      })
      .addCase(getListSalesInChargeAction.fulfilled, (state, action) => {
        state.salesInChargeList = action.payload
      })
      .addCase(getListSalesInChargeAction.rejected, (state, action) => {
        state.salesInChargeList = []
      })

      .addCase(getListAllCustomerAction.pending, (state, action) => {
        state.listAllCustomer = []
      })
      .addCase(getListAllCustomerAction.fulfilled, (state, action) => {
        state.listAllCustomer = action.payload
      })
      .addCase(getListAllCustomerAction.rejected, (state, action) => {
        state.listAllCustomer = []
      })
      .addCase(getListAllProductFormAction.pending, (state, action) => {
        state.listAllProductForm = []
      })
      .addCase(getListAllProductFormAction.fulfilled, (state, action) => {
        state.listAllProductForm = action.payload
      })
      .addCase(getListAllProductFormAction.rejected, (state, action) => {
        state.listAllProductForm = []
      })
      .addCase(createClaimAction.pending, (state) => {
        state.createClaimSuccessFlag = false
      })
      .addCase(createClaimAction.fulfilled, (state, action) => {
        state.createClaimSuccessFlag = true
      })
      .addCase(createClaimAction.rejected, (state, action) => {
        state.createClaimSuccessFlag = false
      })
      .addCase(getQuotationHistoriesByCustomerIdAction.pending, (state) => {
        state.listQuotationHistories = []
      })
      .addCase(getQuotationHistoriesByCustomerIdAction.fulfilled, (state, action) => {
        state.listQuotationHistories = action.payload
      })
      .addCase(getQuotationHistoriesByCustomerIdAction.rejected, (state, action) => {
        state.listQuotationHistories = []
      })
      .addCase(createOderAction.pending, (state) => {
        state.createOderSuccessFlag = false
        state.createOderErrorMessage = ''
      })
      .addCase(createOderAction.fulfilled, (state, action) => {
        state.createOderSuccessFlag = true
        state.createOderErrorMessage = ''
      })
      .addCase(createOderAction.rejected, (state, action) => {
        state.createOderSuccessFlag = false
        state.createOderErrorMessage = action.error?.message
      })
      .addCase(updateOderAction.pending, (state) => {
        state.updateOderSuccessFlag = false
        state.updateOderErrorMessage = ''
      })
      .addCase(updateOderAction.fulfilled, (state, action) => {
        state.updateOderSuccessFlag = true
        state.updateOderErrorMessage = ''
      })
      .addCase(updateOderAction.rejected, (state, action) => {
        state.updateOderSuccessFlag = false
        state.updateOderErrorMessage = action.error?.message
      })
      .addCase(updateOderPreviewAction.pending, (state) => {
        state.updateOderPreviewSuccessFlag = false
        state.updateOderPreviewErrorMessage = ''
      })
      .addCase(updateOderPreviewAction.fulfilled, (state, action) => {
        state.updateOderPreviewSuccessFlag = true
        state.updateOderPreviewErrorMessage = ''
      })
      .addCase(updateOderPreviewAction.rejected, (state, action) => {
        state.updateOderPreviewSuccessFlag = false
        state.updateOderPreviewErrorMessage = action.error?.message
      })
      .addCase(getListOrderByCustomerAction.pending, (state) => {
        state.listOrderByCustomer = []
      })
      .addCase(getListOrderByCustomerAction.fulfilled, (state, action) => {
        state.listOrderByCustomer = action.payload
      })
      .addCase(getListOrderByCustomerAction.rejected, (state, action) => {
        state.listOrderByCustomer = []
      })
      .addCase(getListAllStatusOrderByCustomerAction.pending, (state) => {
        state.getListAllStatusOrderByCustomer = []
      })
      .addCase(getListAllStatusOrderByCustomerAction.fulfilled, (state, action) => {
        state.getListAllStatusOrderByCustomer = action.payload
      })
      .addCase(getListAllStatusOrderByCustomerAction.rejected, (state, action) => {
        state.getListAllStatusOrderByCustomer = []
      })
      .addCase(getAllClaimStatusAction.pending, (state) => {
        state.listAllClaimStatus = []
      })
      .addCase(getAllClaimStatusAction.fulfilled, (state, action) => {
        state.listAllClaimStatus = action.payload
      })
      .addCase(getAllClaimStatusAction.rejected, (state, action) => {
        state.listAllClaimStatus = []
      })
      .addCase(getListClaimHistoriesByCustomerIdAction.pending, (state) => {
        state.listClaimHistories = []
      })
      .addCase(getListClaimHistoriesByCustomerIdAction.fulfilled, (state, action) => {
        state.listClaimHistories = action.payload
      })
      .addCase(getListClaimHistoriesByCustomerIdAction.rejected, (state, action) => {
        state.listClaimHistories = []
      })
      .addCase(deleteClaimAction.pending, (state, action) => {
        state.deleteClaimSuccessMessage = null
      })
      .addCase(deleteClaimAction.fulfilled, (state, action) => {
        state.deleteClaimSuccessMessage = action.payload.message
        state.deleteClaimErrorMessage = ''
      })
      .addCase(deleteClaimAction.rejected, (state, action) => {
        state.deleteClaimErrorMessage = action.error?.message
      })
      .addCase(getClaimInformationAction.pending, (state) => {
        state.claimDetailState = []
      })
      .addCase(getClaimInformationAction.fulfilled, (state, action) => {
        state.claimDetailState = action.payload
      })
      .addCase(getClaimInformationAction.rejected, (state, action) => {
        state.claimDetailState = []
      })
      .addCase(updateClaimAction.pending, (state) => {
        state.updateClaimSuccessFlag = false
      })
      .addCase(updateClaimAction.fulfilled, (state, action) => {
        state.updateClaimSuccessFlag = true
        state.errorUpdateClaimMessage = ''
      })
      .addCase(updateClaimAction.rejected, (state, action) => {
        state.updateClaimSuccessFlag = false
        state.errorUpdateClaimMessage = action.error?.message
      })
      .addCase(removeMessageErrorAction.fulfilled, (state, action) => {
        state.errorCreateCustomerMessage = ''
        state.updateCustomerHandbookErrorMessage = ''
        state.createOderSuccessFlag = false
        state.createOderPreviewErrorMessage = false
        state.createOderPreviewSuccessFlag = false
        state.updateOderPreviewSuccessFlag = false
        state.updateOderPreviewErrorMessage = ''
        state.updateOderSuccessFlag = false
        state.createQuotationSuccessFlag = false
        state.errorCreateQuotationMessageMessage = ''
        state.errorCreateQuotationPreviewMessage = ''
        state.createQuotationPreviewSuccessFlag = ''
        state.createOderErrorMessage = ''
        state.updateQuotationPreviewSuccessFlag = ''
        state.errorUpdateQuotationPreviewMessage = ''
        state.createCustomerSuccessFlag = false
        state.createCustomerErrorMessage = ''
        state.errorUpdateCustomerMessage = ''
        state.updateCustomerSuccessFlag = false
        state.updateCustomerHandbookFlag = false
      })
      .addCase(createOderPreviewAction.pending, (state) => {
        state.createOderPreviewSuccessFlag = false
        state.createOderPreviewErrorMessage = false
      })
      .addCase(createOderPreviewAction.fulfilled, (state, action) => {
        state.createOderPreviewErrorMessage = false
        state.createOderPreviewSuccessFlag = true
      })
      .addCase(createOderPreviewAction.rejected, (state, action) => {
        state.createOderPreviewSuccessFlag = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.createOderPreviewErrorMessage = errorMessage
      })
      .addCase(getDetailCustomerHandbookAllAction.pending, (state) => {
        state.listDetailCustomerHandbook = []
      })
      .addCase(getDetailCustomerHandbookAllAction.fulfilled, (state, action) => {
        state.listDetailCustomerHandbook = action.payload
      })
      .addCase(getDetailCustomerHandbookAllAction.rejected, (state, action) => {
        state.listDetailCustomerHandbook = []
      })
      .addCase(updateCustomerHandbookAllAction.pending, (state) => {
        state.updateCustomerHandbookFlag = false
      })
      .addCase(updateCustomerHandbookAllAction.fulfilled, (state, action) => {
        state.updateCustomerHandbookFlag = true
        state.updateCustomerHandbookErrorMessage = ''
      })
      .addCase(updateCustomerHandbookAllAction.rejected, (state, action) => {
        state.updateCustomerHandbookFlag = false
        state.updateCustomerHandbookErrorMessage = action.error?.message
      })
      .addCase(getAllProductSubstitutabilityAction.pending, (state) => {
        state.listAllProductSubstitutability = []
      })
      .addCase(getAllProductSubstitutabilityAction.fulfilled, (state, action) => {
        state.listAllProductSubstitutability = action.payload
      })
      .addCase(getAllProductSubstitutabilityAction.rejected, (state, action) => {
        state.listAllProductSubstitutability = []
      })
      .addCase(getAllIndustryGroupAction.pending, (state) => {
        state.listAllIndustryGroup = []
      })
      .addCase(getAllIndustryGroupAction.fulfilled, (state, action) => {
        state.listAllIndustryGroup = action.payload
      })
      .addCase(getAllIndustryGroupAction.rejected, (state, action) => {
        state.listAllIndustryGroup = []
      })
      .addCase(getListProposalDebtAgeByCustomerIdAction.pending, (state) => {
        state.listProposalDebtAgeByCustomerId = []
      })
      .addCase(getListProposalDebtAgeByCustomerIdAction.fulfilled, (state, action) => {
        state.listProposalDebtAgeByCustomerId = action.payload
      })
      .addCase(getListProposalDebtAgeByCustomerIdAction.rejected, (state, action) => {
        state.listProposalDebtAgeByCustomerId = []
      })
      .addCase(getAllClaimProblemAction.pending, (state) => {
        state.listAllClaimProblem = []
      })
      .addCase(getAllClaimProblemAction.fulfilled, (state, action) => {
        state.listAllClaimProblem = action.payload
      })
      .addCase(getAllClaimProblemAction.rejected, (state, action) => {
        state.listAllClaimProblem = []
      })
      .addCase(getDetailQuotationHistoryAction.pending, (state) => {
        state.detailQuotationHistory = []
      })
      .addCase(getDetailQuotationHistoryAction.fulfilled, (state, action) => {
        state.detailQuotationHistory = action.payload
      })
      .addCase(getDetailQuotationHistoryAction.rejected, (state, action) => {
        state.detailQuotationHistory = []
      })
      .addCase(deleteProposalDebtAgeAction.pending, (state, action) => {
        state.deleteProposalDebtAgeSuccessMessage = null
      })
      .addCase(deleteProposalDebtAgeAction.fulfilled, (state, action) => {
        state.deleteProposalDebtAgeSuccessMessage = action.payload.message
        state.deleteProposalDebtAgeErrorMessage = ''
      })
      .addCase(deleteProposalDebtAgeAction.rejected, (state, action) => {
        state.deleteProposalDebtAgeErrorMessage = action.error?.message
      })
      .addCase(updateProposalDebtAgeAction.pending, (state) => {
        state.updateProposalDebtAgeSuccessMessage = false
      })
      .addCase(updateProposalDebtAgeAction.fulfilled, (state, action) => {
        state.updateProposalDebtAgeSuccessMessage = true
        state.updateProposalDebtAgeErrorMessage = ''
      })
      .addCase(updateProposalDebtAgeAction.rejected, (state, action) => {
        state.updateProposalDebtAgeSuccessMessage = false
        state.updateProposalDebtAgeErrorMessage = action.error?.message
      })
      .addCase(getAllProductTypeAction.pending, (state) => {
        state.listAllProductType = []
      })
      .addCase(getAllProductTypeAction.fulfilled, (state, action) => {
        state.listAllProductType = action.payload
      })
      .addCase(getAllProductTypeAction.rejected, (state, action) => {
        state.listAllProductType = []
      })
      .addCase(createQuotationPreviewAction.pending, (state) => {
        state.createQuotationPreviewSuccessFlag = false
      })
      .addCase(createQuotationPreviewAction.fulfilled, (state, action) => {
        state.createQuotationPreviewSuccessFlag = action.payload
        state.errorCreateQuotationPreviewMessage = ''
      })
      .addCase(createQuotationPreviewAction.rejected, (state, action) => {
        state.createQuotationPreviewSuccessFlag = false
        state.errorCreateQuotationPreviewMessage = action.error?.message
      })
      .addCase(deleteQuotationHistoryAction.pending, (state, action) => {
        state.deleteQuotationHistorySuccessMessage = null
      })
      .addCase(deleteQuotationHistoryAction.fulfilled, (state, action) => {
        state.deleteQuotationHistorySuccessMessage = action.payload.message
        state.deleteQuotationHistoryErrorMessage = ''
      })
      .addCase(deleteQuotationHistoryAction.rejected, (state, action) => {
        state.deleteQuotationHistoryErrorMessage = action.error?.message
      })
      .addCase(updateQuotationAction.pending, (state) => {
        state.updateQuotationHistorySuccessMessage = false
      })
      .addCase(updateQuotationAction.fulfilled, (state, action) => {
        state.updateQuotationHistorySuccessMessage = true
        state.updateQuotationHistoryErrorMessage = ''
      })
      .addCase(updateQuotationAction.rejected, (state, action) => {
        state.updateQuotationHistorySuccessMessage = false
        state.updateQuotationHistoryErrorMessage = action.error?.message
      })
      .addCase(updateQuotationPreviewAction.pending, (state) => {
        state.updateQuotationPreviewSuccessFlag = false
      })
      .addCase(updateQuotationPreviewAction.fulfilled, (state, action) => {
        state.updateQuotationPreviewSuccessFlag = action.payload
        state.errorUpdateQuotationPreviewMessage = ''
      })
      .addCase(updateQuotationPreviewAction.rejected, (state, action) => {
        state.updateProposalDebtAgeSuccessMessage = false
        state.errorUpdateQuotationPreviewMessage = action.error?.message
      })
      .addCase(getAllPersonnelScaleAction.pending, (state) => {
        state.listAllPersonnelScale = []
      })
      .addCase(getAllPersonnelScaleAction.fulfilled, (state, action) => {
        state.listAllPersonnelScale = action.payload
      })
      .addCase(getAllPersonnelScaleAction.rejected, (state, action) => {
        state.listAllPersonnelScale = []
      })
      .addCase(getAllFactoryScaleAction.pending, (state) => {
        state.listAllFactoryScale = []
      })
      .addCase(getAllFactoryScaleAction.fulfilled, (state, action) => {
        state.listAllFactoryScale = action.payload
      })
      .addCase(getAllFactoryScaleAction.rejected, (state, action) => {
        state.listAllFactoryScale = []
      })
      .addCase(getAllCompanyTypeAction.pending, (state) => {
        state.listAllCompanyType = []
      })
      .addCase(getAllCompanyTypeAction.fulfilled, (state, action) => {
        state.listAllCompanyType = action.payload
      })
      .addCase(getAllCompanyTypeAction.rejected, (state, action) => {
        state.listAllCompanyType = []
      })
      .addCase(getAllCustomerRankAction.pending, (state) => {
        state.listAllCustomerRank = []
      })
      .addCase(getAllCustomerRankAction.fulfilled, (state, action) => {
        state.listAllCustomerRank = action.payload
      })
      .addCase(getAllCustomerRankAction.rejected, (state, action) => {
        state.listAllCustomerRank = []
      })
      .addCase(getAllOrderPlanAction.pending, (state) => {
        state.listAllOrderPlan = []
      })
      .addCase(getAllOrderPlanAction.fulfilled, (state, action) => {
        state.listAllOrderPlan = action.payload
      })
      .addCase(getAllOrderPlanAction.rejected, (state, action) => {
        state.listAllOrderPlan = []
      })
      .addCase(getAllQuanlityRequireAction.pending, (state) => {
        state.listAllQuanlityRequire = []
      })
      .addCase(getAllQuanlityRequireAction.fulfilled, (state, action) => {
        state.listAllQuanlityRequire = action.payload
      })
      .addCase(getAllQuanlityRequireAction.rejected, (state, action) => {
        state.listAllQuanlityRequire = []
      })
      .addCase(getAllProductApplicationAction.pending, (state) => {
        state.listAllProductApplication = []
      })
      .addCase(getAllProductApplicationAction.fulfilled, (state, action) => {
        state.listAllProductApplication = action.payload
      })
      .addCase(getAllProductApplicationAction.rejected, (state, action) => {
        state.listAllProductApplication = []
      })
      .addCase(getAllFrequencyCompanyVisitAction.pending, (state) => {
        state.listAllFrequencyCompanyVisit = []
      })
      .addCase(getAllFrequencyCompanyVisitAction.fulfilled, (state, action) => {
        state.listAllFrequencyCompanyVisit = action.payload
      })
      .addCase(getAllFrequencyCompanyVisitAction.rejected, (state, action) => {
        state.listAllFrequencyCompanyVisit = []
      })
      .addCase(getAllIncentivePolicyAction.pending, (state) => {
        state.listAllIncentivePolicy = []
      })
      .addCase(getAllIncentivePolicyAction.fulfilled, (state, action) => {
        state.listAllIncentivePolicy = action.payload
      })
      .addCase(getAllIncentivePolicyAction.rejected, (state, action) => {
        state.listAllIncentivePolicy = []
      })
      .addCase(getListDeviceMachinesAction.pending, (state) => {
        state.listDeviceMachines = []
      })
      .addCase(getListDeviceMachinesAction.fulfilled, (state, action) => {
        state.listDeviceMachines = action.payload
      })
      .addCase(getListDeviceMachinesAction.rejected, (state, action) => {
        state.listDeviceMachines = []
      })
      .addCase(getAllConsultationHistoryProblemAction.pending, (state) => {
        state.listAllConsultationHistoryProblem = []
      })
      .addCase(getAllConsultationHistoryProblemAction.fulfilled, (state, action) => {
        state.listAllConsultationHistoryProblem = action.payload
      })
      .addCase(getAllConsultationHistoryProblemAction.rejected, (state, action) => {
        state.listAllConsultationHistoryProblem = []
      })
      .addCase(createCustomerAction.pending, (state) => {
        state.createCustomerSuccessMessage = false
      })
      .addCase(createCustomerAction.fulfilled, (state, action) => {
        state.createCustomerSuccessMessage = true
        state.createCustomerErrorMessage = ''
      })
      .addCase(createCustomerAction.rejected, (state, action) => {
        state.createCustomerSuccessMessage = false
        state.createCustomerErrorMessage = action.error?.message
      })
      .addCase(getAllDeviceMachineTypeAction.pending, (state) => {
        state.listAllDeviceMachineType = []
      })
      .addCase(getAllDeviceMachineTypeAction.fulfilled, (state, action) => {
        state.listAllDeviceMachineType = action.payload
      })
      .addCase(getAllDeviceMachineTypeAction.rejected, (state, action) => {
        state.listAllDeviceMachineType = []
      })
      .addCase(getAllDeviceMachineManufacturerAction.pending, (state) => {
        state.listAllDeviceMachineManufacturer = []
      })
      .addCase(getAllDeviceMachineManufacturerAction.fulfilled, (state, action) => {
        state.listAllDeviceMachineManufacturer = action.payload
      })
      .addCase(getAllDeviceMachineManufacturerAction.rejected, (state, action) => {
        state.listAllDeviceMachineManufacturer = []
      })
      .addCase(getListConsultationHistoriesAction.pending, (state) => {
        state.listConsultationHistories = []
      })
      .addCase(getListConsultationHistoriesAction.fulfilled, (state, action) => {
        state.listConsultationHistories = action.payload
      })
      .addCase(getListConsultationHistoriesAction.rejected, (state, action) => {
        state.listConsultationHistories = []
      })
      .addCase(createConsultationHistoryAction.pending, (state) => {
        state.createConsultationHistorySuccessMessage = ''
      })
      .addCase(createConsultationHistoryAction.fulfilled, (state, action) => {
        state.createConsultationHistorySuccessMessage = ''
        state.createConsultationHistoryErrorMessage = ''
      })
      .addCase(createConsultationHistoryAction.rejected, (state, action) => {
        state.createConsultationHistorySuccessMessage = ''
        state.createConsultationHistoryErrorMessage = action.error?.message
      })
      .addCase(getDetailConsultationHistoryAction.fulfilled, (state, action) => {
        state.detailConsultationHistory = action.payload
      })
      .addCase(deleteConsultationHistoryAction.pending, (state, action) => {
        state.deleteClaimSuccessMessage = null
        state.deleteConsultationHistorySuccessFlag = false
      })
      .addCase(deleteConsultationHistoryAction.fulfilled, (state, action) => {
        state.deleteConsultationHistorySuccessMessage = action.payload.message
        state.deleteConsultationHistoryErrorMessage = ''
        state.deleteConsultationHistorySuccessFlag = true
      })
      .addCase(deleteConsultationHistoryAction.rejected, (state, action) => {
        state.deleteConsultationHistoryErrorMessage = action.error?.message
        state.deleteConsultationHistorySuccessFlag = false
      })
  }
})
export const {
  setCurrentPage,
  setTotalPages,
  setDeleteMessageState,
  setQuotationListPage,
  setQuotationListTotalPages,
  setListQuotationHistoriesCurrentPage,
  setListQuotationHistoriesTotalPages,
  setDataExportFlag,
  setListOrderByCustomerTotalPages,
  setListOrderByCustomerCurrentPage,
  setListClaimHistoriesCurrentPage,
  setListClaimHistoriesTotalPages,
  setListProposalDebtAgeCurrentPage,
  setListProposalDebtAgeTotalPages
} = customerSlice.actions
export default customerSlice
