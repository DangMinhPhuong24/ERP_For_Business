/* eslint-disable no-param-reassign */
/* redux-toolkit create slice with Immer reducer, no need "immutable" reducer here */
import { createSlice } from '@reduxjs/toolkit'
import {
  createProductGroupsAction,
  createProductManagementAction,
  createSuppliersAction,
  deleteProductGroupAction,
  deleteProductManagementAction,
  deleteSupplierAction,
  exportExcelDataWarehouseProduct,
  getAllAdhesiveTypeAction,
  getAllBaseTypeAction,
  getAllBondingEnvAction,
  getAllCurrencyUnitAction,
  getAllNotSuitableForAction,
  getAllPrinterAction,
  getAllProductsAction,
  getAllSupplierAction,
  getAllSuppliersTypeAction,
  getAllSurfaceMaterialAction,
  getAllSurfaceTypeAction,
  getAllTolerancesAction,
  getAllTolerancesAdhesiveForceAction,
  getAllTolerancesQuantificationAction,
  getAllTolerancesThicknessAction,
  getAllTypeOfGoodsENAction,
  getAllTypeOfGoodsVNAction,
  getAllWarehouseAction,
  getAllWarehouseLocationAction,
  getDetailProductGroupAction,
  getDetailProductManagementAction,
  getDetailSupplierAction,
  getExportProductAction,
  getListProductAction,
  getListProductGroupAction,
  getListProductManagementAction,
  getListProductTypeAction,
  getListSupplierAction,
  getSuppliersAction,
  removeMessageErrorAction,
  updateProductGroupsAction,
  updateProductManagementAction, updateSupplierAction
} from './product.actions'
import dimensions from '../../constants/dimensions'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    productsList: [],
    currentPage: dimensions.table.defaultCurrentPage,
    totalPages: dimensions.table.defaultTotalPages,
    currentListProductGroupPage: dimensions.table.defaultCurrentPage,
    totalListProductGroupPages: dimensions.table.defaultTotalPages,
    listProductType: [],
    listSupplier: [],
    listAllSupplier: [],
    listAllWarehouseLocation: [],
    listAllWarehouse: [],
    listAllProducts: [],
    getDataExportFlag: false,
    dataWarehouseProductExport: [],
    exportProductErrorMessage: '',
    listProductGroup: [],
    suppliers: [],
    detailSupplier: {},
    createProductSuccessFlag: false,
    errorProductMessage: '',
    getAllSurfaceType: [],
    getAllAdhesiveType: [],
    getAllBaseType: [],
    getAllBondingEnv: [],
    getAllSurfaceMaterial: [],
    getAllPrinter: [],
    getAllNotSuitableFor: [],
    getAllTolerances: [],
    getAllTolerancesQuantification: [],
    getAllTolerancesThickness: [],
    getAllTolerancesAdhesiveForce: [],
    getDetailProduct: {},
    updateProductSuccessFlag: false,
    deleteProductSuccessMessage: false,
    deleteProductErrorMessage: false,
    deleteSupplierSuccessMessage: false,
    deleteSupplierErrorMessage: false,
    deleteProductGroupSuccessMessage: false,
    deleteProductGroupErrorMessage: false,
    getListProductManagement: [],
    createProductGroupsSuccessFlag: false,
    createProductGroupsErrorMessage: false,
    getDetailProductGroup: {},
    updateProductGroupsSuccessFlag: false,
    updateProductGroupsErrorMessage: false,
    getDataExportManagementFlag: false,
    dataWarehouseProductManagementExport: [],
    getAllTypeOfGoodsVN: [],
    getAllTypeOfGoodsEN: [],
    getAllSuppliersType: [],
    getAllCurrencyUnit: [],
    createSupplierSuccessFlag: false,
    createSupplierErrorMessage: false,
    updateSupplierSuccessFlag: false,
    updateSupplierErrorMessage: false,
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload
    },
    setCurrentListProductGroupPage(state, action) {
      state.currentListProductGroupPage = action.payload
    },
    setTotalListProductGroupPages(state, action) {
      state.totalListProductGroupPages = action.payload
    },
    setDataExportFlag(state) {
      state.getDataExportFlag = false
    },
    setDataExportManagementFlag(state) {
      state.getDataExportManagementFlag = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListProductAction.pending, (state) => {
        state.productsList = []
      })
      .addCase(getListProductAction.fulfilled, (state, action) => {
        state.productsList = action.payload
      })
      .addCase(getListProductAction.rejected, (state, action) => {
        state.productsList = []
      })

      .addCase(getListSupplierAction.pending, (state) => {
        state.listSupplier = []
      })
      .addCase(getListSupplierAction.fulfilled, (state, action) => {
        state.listSupplier = action.payload
      })
      .addCase(getListSupplierAction.rejected, (state, action) => {
        state.listSupplier = []
      })

      .addCase(getListProductTypeAction.pending, (state) => {
        state.listProductType = []
      })
      .addCase(getListProductTypeAction.fulfilled, (state, action) => {
        state.listProductType = action.payload
      })
      .addCase(getListProductTypeAction.rejected, (state, action) => {
        state.listProductType = []
      })
      .addCase(getAllSupplierAction.pending, (state) => {
        state.listAllSupplier = []
      })
      .addCase(getAllSupplierAction.fulfilled, (state, action) => {
        state.listAllSupplier = action.payload
      })
      .addCase(getAllSupplierAction.rejected, (state, action) => {
        state.listAllSupplier = []
      })
      .addCase(getAllWarehouseLocationAction.pending, (state) => {
        state.listAllWarehouseLocation = []
      })
      .addCase(getAllWarehouseLocationAction.fulfilled, (state, action) => {
        state.listAllWarehouseLocation = action.payload
      })
      .addCase(getAllWarehouseLocationAction.rejected, (state, action) => {
        state.listAllWarehouseLocation = []
      })
      .addCase(getAllWarehouseAction.pending, (state) => {
        state.listAllWarehouse = []
      })
      .addCase(getAllWarehouseAction.fulfilled, (state, action) => {
        state.listAllWarehouse = action.payload
      })
      .addCase(getAllWarehouseAction.rejected, (state, action) => {
        state.listAllWarehouse = []
      })
      .addCase(exportExcelDataWarehouseProduct.pending, (state, action) => {
        state.dataWarehouseProductExport = []
        state.getDataExportFlag = false
      })
      .addCase(exportExcelDataWarehouseProduct.fulfilled, (state, action) => {
        state.dataWarehouseProductExport = action.payload
        state.getDataExportFlag = true
      })
      .addCase(exportExcelDataWarehouseProduct.rejected, (state, action) => {
        state.exportProductErrorMessage = action.error?.message
        state.getDataExportFlag = false
      })
      .addCase(getExportProductAction.pending, (state, action) => {
        state.dataWarehouseProductManagementExport = []
        state.getDataExportManagementFlag = false
      })
      .addCase(getExportProductAction.fulfilled, (state, action) => {
        state.dataWarehouseProductManagementExport = action.payload
        state.getDataExportManagementFlag = true
      })
      .addCase(getExportProductAction.rejected, (state, action) => {
        state.getDataExportManagementFlag = false
      })
      .addCase(getAllProductsAction.pending, (state) => {
        state.listAllProducts = []
      })
      .addCase(getAllProductsAction.fulfilled, (state, action) => {
        state.listAllProducts = action.payload
      })
      .addCase(getAllProductsAction.rejected, (state, action) => {
        state.listAllProducts = []
      })
      .addCase(getListProductGroupAction.pending, (state) => {
        state.listProductGroup = []
      })
      .addCase(getListProductGroupAction.fulfilled, (state, action) => {
        state.listProductGroup = action.payload
      })
      .addCase(getListProductGroupAction.rejected, (state, action) => {
        state.listProductGroup = []
      })
      .addCase(getSuppliersAction.pending, (state) => {
        state.suppliers = []
      })
      .addCase(getSuppliersAction.fulfilled, (state, action) => {
        state.suppliers = action.payload
      })
      .addCase(getSuppliersAction.rejected, (state, action) => {
        state.suppliers = []
      })
      .addCase(getDetailSupplierAction.pending, (state) => {
        state.detailSupplier = {}
      })
      .addCase(getDetailSupplierAction.fulfilled, (state, action) => {
        state.detailSupplier = action.payload
      })
      .addCase(getDetailSupplierAction.rejected, (state, action) => {
        state.detailSupplier = {}
      })
      .addCase(getAllSurfaceTypeAction.pending, (state) => {
        state.getAllSurfaceType = []
      })
      .addCase(getAllSurfaceTypeAction.fulfilled, (state, action) => {
        state.getAllSurfaceType = action.payload
      })
      .addCase(getAllSurfaceTypeAction.rejected, (state, action) => {
        state.getAllSurfaceType = []
      })
      .addCase(getAllAdhesiveTypeAction.pending, (state) => {
        state.getAllAdhesiveType = []
      })
      .addCase(getAllAdhesiveTypeAction.fulfilled, (state, action) => {
        state.getAllAdhesiveType = action.payload
      })
      .addCase(getAllAdhesiveTypeAction.rejected, (state, action) => {
        state.getAllAdhesiveType = []
      })
      .addCase(getAllBaseTypeAction.pending, (state) => {
        state.getAllBaseType = []
      })
      .addCase(getAllBaseTypeAction.fulfilled, (state, action) => {
        state.getAllBaseType = action.payload
      })
      .addCase(getAllBaseTypeAction.rejected, (state, action) => {
        state.getAllBaseType = []
      })
      .addCase(getAllBondingEnvAction.pending, (state) => {
        state.getAllBondingEnv = []
      })
      .addCase(getAllBondingEnvAction.fulfilled, (state, action) => {
        state.getAllBondingEnv = action.payload
      })
      .addCase(getAllBondingEnvAction.rejected, (state, action) => {
        state.getAllBondingEnv = []
      })
      .addCase(getAllSurfaceMaterialAction.pending, (state) => {
        state.getAllSurfaceMaterial = []
      })
      .addCase(getAllSurfaceMaterialAction.fulfilled, (state, action) => {
        state.getAllSurfaceMaterial = action.payload
      })
      .addCase(getAllSurfaceMaterialAction.rejected, (state, action) => {
        state.getAllSurfaceMaterial = []
      })
      .addCase(getAllPrinterAction.pending, (state) => {
        state.getAllPrinter = []
      })
      .addCase(getAllPrinterAction.fulfilled, (state, action) => {
        state.getAllPrinter = action.payload
      })
      .addCase(getAllPrinterAction.rejected, (state, action) => {
        state.getAllPrinter = []
      })
      .addCase(getAllNotSuitableForAction.pending, (state) => {
        state.getAllNotSuitableFor = []
      })
      .addCase(getAllNotSuitableForAction.fulfilled, (state, action) => {
        state.getAllNotSuitableFor = action.payload
      })
      .addCase(getAllNotSuitableForAction.rejected, (state, action) => {
        state.getAllNotSuitableFor = []
      })
      //product management
      .addCase(removeMessageErrorAction.fulfilled, (state, action) => {
        state.errorProductMessage = ''
        state.createProductSuccessFlag = false
        state.updateProductSuccessFlag = false
        state.createProductGroupsSuccessFlag = false
        state.createProductGroupsErrorMessage = false
        state.createSupplierErrorMessage = false
        state.createSupplierSuccessFlag = false
        state.updateSupplierErrorMessage = false
        state.updateSupplierSuccessFlag = false
      })
      .addCase(getListProductManagementAction.pending, (state) => {
        state.getListProductManagement = []
      })
      .addCase(getListProductManagementAction.fulfilled, (state, action) => {
        state.getListProductManagement = action.payload
      })
      .addCase(getListProductManagementAction.rejected, (state, action) => {
        state.getListProductManagement = []
      })
      .addCase(createProductManagementAction.pending, (state) => {
        state.createProductSuccessFlag = false
      })
      .addCase(createProductManagementAction.fulfilled, (state, action) => {
        state.createProductSuccessFlag = true
      })
      .addCase(createProductManagementAction.rejected, (state, action) => {
        state.createProductSuccessFlag = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.errorProductMessage = errorMessage
      })
      .addCase(getDetailProductManagementAction.pending, (state) => {
        state.getDetailProduct = {}
      })
      .addCase(getDetailProductManagementAction.fulfilled, (state, action) => {
        state.getDetailProduct = action.payload
      })
      .addCase(getDetailProductManagementAction.rejected, (state, action) => {
        state.getDetailProduct = {}
      })
      .addCase(updateProductManagementAction.pending, (state) => {
        state.updateProductSuccessFlag = false
      })
      .addCase(updateProductManagementAction.fulfilled, (state, action) => {
        state.updateProductSuccessFlag = true
      })
      .addCase(updateProductManagementAction.rejected, (state, action) => {
        state.updateProductSuccessFlag = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.errorProductMessage = errorMessage
      })
      .addCase(deleteProductManagementAction.pending, (state, action) => {
        state.deleteProductSuccessMessage = null
      })
      .addCase(deleteProductManagementAction.fulfilled, (state, action) => {
        state.deleteProductSuccessMessage = action.payload.message
        state.deleteProductErrorMessage = ''
      })
      .addCase(deleteProductManagementAction.rejected, (state, action) => {
        state.deleteProductErrorMessage = action.error?.message
      })
      .addCase(deleteSupplierAction.pending, (state, action) => {
        state.deleteSupplierSuccessMessage = null
      })
      .addCase(deleteSupplierAction.fulfilled, (state, action) => {
        state.deleteSupplierSuccessMessage = action.payload.message
        state.deleteSupplierErrorMessage = ''
      })
      .addCase(deleteSupplierAction.rejected, (state, action) => {
        state.deleteSupplierErrorMessage = action.error?.message
      })
      .addCase(deleteProductGroupAction.pending, (state, action) => {
        state.deleteProductGroupSuccessMessage = null
      })
      .addCase(deleteProductGroupAction.fulfilled, (state, action) => {
        state.deleteProductGroupSuccessMessage = action.payload.message
        state.deleteProductGroupErrorMessage = ''
      })
      .addCase(deleteProductGroupAction.rejected, (state, action) => {
        state.deleteProductGroupErrorMessage = action.error?.message
      })
      .addCase(createProductGroupsAction.pending, (state, action) => {
        state.createProductGroupsSuccessFlag = false
        state.createProductGroupsErrorMessage = false
      })
      .addCase(createProductGroupsAction.fulfilled, (state, action) => {
        state.createProductGroupsSuccessFlag = true
        state.createProductGroupsErrorMessage = false
      })
      .addCase(createProductGroupsAction.rejected, (state, action) => {
        state.createProductGroupsSuccessFlag = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.createProductGroupsErrorMessage = errorMessage
      })
      .addCase(getDetailProductGroupAction.pending, (state) => {
        state.getDetailProductGroup = {}
      })
      .addCase(getDetailProductGroupAction.fulfilled, (state, action) => {
        state.getDetailProductGroup = action.payload
      })
      .addCase(getDetailProductGroupAction.rejected, (state, action) => {
        state.getDetailProductGroup = {}
      })
      .addCase(updateProductGroupsAction.pending, (state, action) => {
        state.updateProductGroupsSuccessFlag = false
        state.updateProductGroupsErrorMessage = false
      })
      .addCase(updateProductGroupsAction.fulfilled, (state, action) => {
        state.updateProductGroupsSuccessFlag = true
        state.updateProductGroupsErrorMessage = false
      })
      .addCase(updateProductGroupsAction.rejected, (state, action) => {
        state.updateProductGroupsSuccessFlag = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.updateProductGroupsErrorMessage = errorMessage
      })
      .addCase(getAllTolerancesAction.pending, (state) => {
        state.getAllTolerances = []
      })
      .addCase(getAllTolerancesAction.fulfilled, (state, action) => {
        state.getAllTolerances = action.payload
      })
      .addCase(getAllTolerancesAction.rejected, (state, action) => {
        state.getAllTolerances = []
      })
      .addCase(getAllTolerancesQuantificationAction.pending, (state) => {
        state.getAllTolerancesQuantification = []
      })
      .addCase(getAllTolerancesQuantificationAction.fulfilled, (state, action) => {
        state.getAllTolerancesQuantification = action.payload
      })
      .addCase(getAllTolerancesQuantificationAction.rejected, (state, action) => {
        state.getAllTolerancesQuantification = []
      })
      .addCase(getAllTolerancesThicknessAction.pending, (state) => {
        state.getAllTolerancesThickness = []
      })
      .addCase(getAllTolerancesThicknessAction.fulfilled, (state, action) => {
        state.getAllTolerancesThickness = action.payload
      })
      .addCase(getAllTolerancesThicknessAction.rejected, (state, action) => {
        state.getAllTolerancesThickness = []
      })
      .addCase(getAllTolerancesAdhesiveForceAction.pending, (state) => {
        state.getAllTolerancesAdhesiveForce = []
      })
      .addCase(getAllTolerancesAdhesiveForceAction.fulfilled, (state, action) => {
        state.getAllTolerancesAdhesiveForce = action.payload
      })
      .addCase(getAllTolerancesAdhesiveForceAction.rejected, (state, action) => {
        state.getAllTolerancesAdhesiveForce = []
      })
      .addCase(getAllTypeOfGoodsVNAction.pending, (state) => {
        state.getAllTypeOfGoodsVN = []
      })
      .addCase(getAllTypeOfGoodsVNAction.fulfilled, (state, action) => {
        state.getAllTypeOfGoodsVN = action.payload
      })
      .addCase(getAllTypeOfGoodsVNAction.rejected, (state, action) => {
        state.getAllTypeOfGoodsVN = []
      })
      .addCase(getAllTypeOfGoodsENAction.pending, (state) => {
        state.getAllTypeOfGoodsEN = []
      })
      .addCase(getAllTypeOfGoodsENAction.fulfilled, (state, action) => {
        state.getAllTypeOfGoodsEN = action.payload
      })
      .addCase(getAllTypeOfGoodsENAction.rejected, (state, action) => {
        state.getAllTypeOfGoodsEN = []
      })
      .addCase(getAllSuppliersTypeAction.pending, (state) => {
        state.getAllSuppliersType = []
      })
      .addCase(getAllSuppliersTypeAction.fulfilled, (state, action) => {
        state.getAllSuppliersType = action.payload
      })
      .addCase(getAllSuppliersTypeAction.rejected, (state, action) => {
        state.getAllSuppliersType = []
      })
      .addCase(getAllCurrencyUnitAction.pending, (state) => {
        state.getAllCurrencyUnit = []
      })
      .addCase(getAllCurrencyUnitAction.fulfilled, (state, action) => {
        state.getAllCurrencyUnit = action.payload
      })
      .addCase(getAllCurrencyUnitAction.rejected, (state, action) => {
        state.getAllCurrencyUnit = []
      })
      .addCase(createSuppliersAction.pending, (state) => {
        state.createSupplierSuccessFlag = false
      })
      .addCase(createSuppliersAction.fulfilled, (state, action) => {
        state.createSupplierSuccessFlag = true
      })
      .addCase(createSuppliersAction.rejected, (state, action) => {
        state.createSupplierSuccessFlag = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.createSupplierErrorMessage = errorMessage
      })
      .addCase(updateSupplierAction.pending, (state) => {
        state.updateSupplierSuccessFlag = false
      })
      .addCase(updateSupplierAction.fulfilled, (state, action) => {
        state.updateSupplierSuccessFlag = true
      })
      .addCase(updateSupplierAction.rejected, (state, action) => {
        state.updateSupplierSuccessFlag = false
        const errorMessage = JSON.parse(action.error?.message || '[]')
        state.updateSupplierErrorMessage = errorMessage
      })
  }
})
export const {
  setCurrentPage,
  setTotalPages,
  setCurrentListProductGroupPage,
  setTotalListProductGroupPages,
  setDataExportFlag,
  setDataExportManagementFlag
} = productSlice.actions
export default productSlice
