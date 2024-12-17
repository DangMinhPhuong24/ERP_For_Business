import { createAsyncThunk } from '@reduxjs/toolkit'
import { setLoading, setShowToast, setToastIsSuccess, setToastMessage } from '../app/app.slice'
import {
  getListProducts,
  getListSupplier,
  getListProductType,
  getAllSupplier,
  getAllWarehouseLocation,
  getAllWarehouse,
  exportDataWarehouseProductToExcel,
  getAllProducts,
  getSuppliers,
  getListProductGroup,
  getAllSurfaceType,
  getAllAdhesiveType,
  getAllBaseType,
  getAllBondingEnv,
  getAllSurfaceMaterial,
  getAllPrinter,
  getAllNotSuitableFor,
  deleteSupplier,
  deleteProductGroup,
  createProductGroups,
  getDetailProductGroup,
  updateProductGroups,
  getExportProduct,
  getDetailSupplier, getAllSuppliersType, getAllCurrencyUnit, createSuppliers, updateSupplier
} from '../../repositories/remote/service/productService'

import {
  setCurrentPage,
  setCurrentListProductGroupPage,
  setTotalListProductGroupPages,
  setDataExportFlag,
  setTotalPages,
  setDataExportManagementFlag
} from './product.slice'
import {
  createProductManagement,
  deleteProductManagement,
  getDetailProductManagement,
  updateProductManagement,
  getListProductManagement,
  getAllTolerancesAdhesiveForce,
  getAllTolerancesThickness,
  getAllTolerancesQuantification,
  getAllTolerances,
  getAllTypeOfGoodsVN,
  getAllTypeOfGoodsEN
} from '../../repositories/remote/service/productManagementService'

export const getListProductAction = createAsyncThunk('product/getListProduct', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getListProducts(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setCurrentPage(response.current_page))
    thunkAPI.dispatch(setTotalPages(response.total_pages))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getExportProductAction = createAsyncThunk('product/getExportProduct', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getExportProduct(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const updateStatusDataExportProductFlagAction = createAsyncThunk(
  'product/updateStatusExportProductFlag',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setDataExportManagementFlag())
  }
)

export const getListSupplierAction = createAsyncThunk('product/getListSupplier', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getListSupplier(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getDetailSupplierAction = createAsyncThunk('product/getDetailSupplier', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getDetailSupplier(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getListProductTypeAction = createAsyncThunk('product/getListProductType', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getListProductType(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllSupplierAction = createAsyncThunk('product/getAllSupplier', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getAllSupplier(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllWarehouseLocationAction = createAsyncThunk(
  'product/getAllWarehouseLocation',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllWarehouseLocation(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllWarehouseAction = createAsyncThunk('product/getAllWarehouse', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getAllWarehouse(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllProductsAction = createAsyncThunk('product/getAllProducts', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getAllProducts(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const exportExcelDataWarehouseProduct = createAsyncThunk(
  'customer/exportDataWarehouseProductToExcel',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await exportDataWarehouseProductToExcel(credential)
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const getSuppliersAction = createAsyncThunk('product/getSuppliers', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getSuppliers(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setCurrentPage(response.current_page))
    thunkAPI.dispatch(setTotalPages(response.total_pages))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getListProductGroupAction = createAsyncThunk(
  'product/getListProductGroup',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListProductGroup(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setCurrentListProductGroupPage(response.current_page))
      thunkAPI.dispatch(setTotalListProductGroupPages(response.total_pages))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const removeMessageErrorAction = createAsyncThunk('product/removeMessageError', async (credential, thunkAPI) => {
  return true
})

export const getAllSurfaceTypeAction = createAsyncThunk('product/getAllSurfaceType', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getAllSurfaceType(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllAdhesiveTypeAction = createAsyncThunk('product/getAllAdhesiveType', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getAllAdhesiveType(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllBaseTypeAction = createAsyncThunk('product/getAllBaseType', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getAllBaseType(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllBondingEnvAction = createAsyncThunk('product/getAllBondingEnv', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getAllBondingEnv(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllSurfaceMaterialAction = createAsyncThunk(
  'product/getAllSurfaceMaterial',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllSurfaceMaterial(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllPrinterAction = createAsyncThunk('product/getAllPrinter', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getAllPrinter(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllNotSuitableForAction = createAsyncThunk(
  'product/getAllNotSuitableFor',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllNotSuitableFor(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getListProductManagementAction = createAsyncThunk(
  'product/getListProductManagement',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getListProductManagement(credential)
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

export const getDetailProductManagementAction = createAsyncThunk(
  'product/getDetailProductManagement',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getDetailProductManagement(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const createProductManagementAction = createAsyncThunk(
  'product/createProductManagement',
  async (credential, thunkAPI) => {
    try {
      const response = await createProductManagement(credential)
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response.data
    } catch (response) {
      throw new Error(JSON.stringify(response.response.data.message))
    }
  }
)

export const updateProductManagementAction = createAsyncThunk(
  'product/updateProductManagement',
  async (credential, thunkAPI) => {
    try {
      const response = await updateProductManagement(credential)
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response.data
    } catch (response) {
      throw new Error(JSON.stringify(response.response.data.message))
    }
  }
)

export const deleteProductManagementAction = createAsyncThunk(
  'product/deleteProductManagement',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await deleteProductManagement(credential)
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

export const deleteSupplierAction = createAsyncThunk('product/deleteSupplier', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await deleteSupplier(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.response.data.message.id[0]))
    thunkAPI.dispatch(setToastIsSuccess(false))
    throw new Error(response.response.data.message)
  }
})

export const deleteProductGroupAction = createAsyncThunk('product/deleteProductGroup', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await deleteProductGroup(credential)
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.message))
    thunkAPI.dispatch(setToastIsSuccess(true))
    return response
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setShowToast(true))
    thunkAPI.dispatch(setToastMessage(response.response.data.message.id[0]))
    thunkAPI.dispatch(setToastIsSuccess(false))
    throw new Error(response.response.data.message)
  }
})

export const createProductGroupsAction = createAsyncThunk(
  'product/createProductGroups',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await createProductGroups(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(JSON.stringify(response.response.data.message))
    }
  }
)

export const getDetailProductGroupAction = createAsyncThunk(
  'product/getDetailProductGroup',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getDetailProductGroup(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (e) {
      thunkAPI.dispatch(setLoading(false))
      throw e
    }
  }
)

export const updateProductGroupsAction = createAsyncThunk(
  'product/updateProductGroups',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await updateProductGroups(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(JSON.stringify(response.response.data.message))
    }
  }
)

export const getAllTolerancesAction = createAsyncThunk('product/getAllTolerances', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getAllTolerances(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllTolerancesQuantificationAction = createAsyncThunk(
  'product/getAllTolerancesQuantification',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllTolerancesQuantification(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllTolerancesThicknessAction = createAsyncThunk(
  'product/getAllTolerancesThickness',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllTolerancesThickness(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllTolerancesAdhesiveForceAction = createAsyncThunk(
  'product/getAllTolerancesAdhesiveForce',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllTolerancesAdhesiveForce(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllTypeOfGoodsVNAction = createAsyncThunk(
  'product/getAllTypeOfGoodsVN',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllTypeOfGoodsVN(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)

export const getAllTypeOfGoodsENAction = createAsyncThunk(
  'product/getAllTypeOfGoodsEN',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await getAllTypeOfGoodsEN(credential)
      thunkAPI.dispatch(setLoading(false))
      return response.data
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(response.response.data.message)
    }
  }
)
export const createSuppliersAction = createAsyncThunk(
  'product/createSuppliers',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await createSuppliers(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(JSON.stringify(response.response.data.message))
    }
  }
)

export const updateSupplierAction = createAsyncThunk(
  'product/updateSupplier',
  async (credential, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true))
    try {
      const response = await updateSupplier(credential)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setShowToast(true))
      thunkAPI.dispatch(setToastMessage(response.message))
      thunkAPI.dispatch(setToastIsSuccess(true))
      return response
    } catch (response) {
      thunkAPI.dispatch(setLoading(false))
      throw new Error(JSON.stringify(response.response.data.message))
    }
  }
)

export const getAllSuppliersTypeAction = createAsyncThunk('product/getAllSuppliersType', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getAllSuppliersType(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})

export const getAllCurrencyUnitAction = createAsyncThunk('product/getAllCurrencyUnit', async (credential, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true))
  try {
    const response = await getAllCurrencyUnit(credential)
    thunkAPI.dispatch(setLoading(false))
    return response.data
  } catch (response) {
    thunkAPI.dispatch(setLoading(false))
    throw new Error(response.response.data.message)
  }
})
