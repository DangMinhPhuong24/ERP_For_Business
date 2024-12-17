import { post, put, get, _delete } from '../network'
import urls from '../urls'
import CreateProductRequest from '../request/product/CreateProductRequest'
import GetDetailProductRequest from '../request/product/GetDetailProductRequest'
import UpdateProductManagementRequest from '../request/productManagement/UpdateProductManagementRequest'
import GetListProductManagementRequest from '../request/productManagement/GetListProductManagementRequest'
import DeleteProductManagementRequest from '../request/productManagement/DeleteProductManagementRequest'
import CreateProductManagementRequest from '../request/productManagement/CreateProductManagementRequest'

export function getListProductManagement(params) {
  let param = null
  if (params) {
    const getListProductManagementRequest = new GetListProductManagementRequest()
    // eslint-disable-next-line no-use-before-define
    getListProductManagementRequest.addParam(GetListProductManagementRequest.Keys.PAGE, params.page || '')
    getListProductManagementRequest.addParam(
      GetListProductManagementRequest.Keys.SEARCH_PRODUCT_MANAGEMENT,
      params.search_product_management || ''
    )
    param = getListProductManagementRequest.getParams()
  }
  const headers = {}
  return get(urls.GET_LIST_PRODUCT_MANAGEMENT, param, headers)
}

export function createProductManagement(params) {
  let param = null
  if (params) {
    const createProductManagementRequest = new CreateProductManagementRequest()
    createProductManagementRequest.addParam(CreateProductManagementRequest.Keys.PRODUCT_CODE, params.code ?? '')
    createProductManagementRequest.addParam(CreateProductManagementRequest.Keys.PRODUCT_NAME, params.product_name ?? '')
    createProductManagementRequest.addParam(CreateProductManagementRequest.Keys.SUPPLIER_ID, params.supplier_id ?? '')
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.SUPPLIER_CODE,
      params.supplier_code ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.VN_PRODUCT_CATEGORY_NAME,
      params.vn_product_category_name ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.EN_PRODUCT_CATEGORY_NAME,
      params.en_product_category_name ?? ''
    )
    createProductManagementRequest.addParam(CreateProductManagementRequest.Keys.PRICE_M2, params.price_m2 ?? '')
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.PRODUCT_GROUP_ID,
      params.product_group_id ?? ''
    )
    createProductManagementRequest.addParam(CreateProductManagementRequest.Keys.DESCRIPTION, params.description ?? '')
    createProductManagementRequest.addParam(CreateProductManagementRequest.Keys.NOTE, params.note ?? '')
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.SPECIFICATIONS,
      params.specifications ?? ''
    )
    createProductManagementRequest.addParam(CreateProductManagementRequest.Keys.SURFACE_TYPE, params.surface_type ?? '')
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.SURFACE_QUANTIFICATION,
      params.surface_quantification ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.SURFACE_QUANTIFICATION_TOLERANCE,
      params.surface_quantification_tolerance ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.SURFACE_QUANTIFICATION_TOLERANCE_TYPE_ID,
      params.surface_quantification_tolerance_type_id ?? ''
    )

    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.SURFACE_THICKNESS,
      params.surface_thickness ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.SURFACE_THICKNESS_TOLERANCE,
      params.surface_thickness_tolerance ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.SURFACE_THICKNESS_TOLERANCE_TYPE_ID,
      params.surface_thickness_tolerance_type_id ?? ''
    )

    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.ADHESIVE_TYPE,
      params.adhesive_type ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.ADHESIVE_MEASUREMENT,
      params.adhesive_measurement ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.ADHESIVE_MEASUREMENT_TOLERANCE,
      params.adhesive_measurement_tolerance ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.ADHESIVE_MEASUREMENT_TOLERANCE_TYPE_ID,
      params.adhesive_measurement_tolerance_type_id ?? ''
    )

    createProductManagementRequest.addParam(
      CreateProductRequest.Keys.ADHESIVE_THICKNESS,
      params.adhesive_thickness ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.ADHESIVE_THICKNESS_TOLERANCE,
      params.adhesive_thickness_tolerance ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.ADHESIVE_THICKNESS_TOLERANCE_TYPE_ID,
      params.adhesive_thickness_tolerance_type_id ?? ''
    )

    createProductManagementRequest.addParam(CreateProductManagementRequest.Keys.BASE_TYPE, params.base_type ?? '')
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.BASE_MEASUREMENT,
      params.base_measurement ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.BASE_MEASUREMENT_TOLERANCE,
      params.base_measurement_tolerance ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.BASE_MEASUREMENT_TOLERANCE_TYPE_ID,
      params.base_measurement_tolerance_type_id ?? ''
    )

    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.BASE_THICKNESS,
      params.base_thickness ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.BASE_THICKNESS_TOLERANCE,
      params.base_thickness_tolerance ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.BASE_THICKNESS_TOLERANCE_TYPE_ID,
      params.base_thickness_tolerance_type_id ?? ''
    )

    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.ADHESIVE_FORCE,
      params.adhesive_force ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.ADHESIVE_FORCE_TOLERANCE,
      params.adhesive_force_tolerance ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.ADHESIVE_FORCE_TOLERANCE_TYPE_ID,
      params.adhesive_force_tolerance_type_id ?? ''
    )

    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.TEMPERATURE_FROM,
      params.temperature_from ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.TEMPERATURE_TO,
      params.temperature_to ?? ''
    )
    createProductManagementRequest.addParam(CreateProductManagementRequest.Keys.EXPIRY_YEAR, params.expiry_year ?? '')
    createProductManagementRequest.addParam(CreateProductManagementRequest.Keys.ADVANTAGE, params.advantage ?? '')
    createProductManagementRequest.addParam(CreateProductManagementRequest.Keys.DISADVANTAGE, params.disadvantage ?? '')
    createProductManagementRequest.addArrayParams(
      CreateProductManagementRequest.Keys.BONDING_ENVS,
      'bonding_envs',
      params.bonding_envs ?? []
    )
    createProductManagementRequest.addArrayParams(
      CreateProductManagementRequest.Keys.SURFACE_MATERIALS,
      'surface_materials',
      params.surface_materials ?? []
    )
    createProductManagementRequest.addArrayParams(CreateProductRequest.Keys.PRINTERS, 'printers', params.printers ?? [])
    createProductManagementRequest.addArrayParams(
      CreateProductManagementRequest.Keys.NOT_SUITABLE_FOR,
      'not_suitable_for',
      params.not_suitable_for ?? []
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.MIN_INVENTORY,
      params.min_inventory ?? ''
    )
    createProductManagementRequest.addParam(
      CreateProductManagementRequest.Keys.MAX_INVENTORY,
      params.max_inventory ?? ''
    )
    createProductManagementRequest.addArrayParams(CreateProductManagementRequest.Keys.PDFS, 'pdfs', params.pdfs ?? [])
    param = createProductManagementRequest.getParams()
  }
  const headers = {}
  return post(urls.CREATE_PRODUCT_MANAGEMENT, param, headers)
}

export function getDetailProductManagement(params) {
  const getDetailProductRequest = new GetDetailProductRequest()
  getDetailProductRequest.addParam(GetDetailProductRequest.Keys.PRODUCT_DETAIL_ID, params.id)

  const param = getDetailProductRequest.getParams()
  const headers = {}
  return get(urls.DETAIL_PRODUCT_MANAGEMENT, param, headers)
}

export function updateProductManagement(params) {
  let param = null
  if (params) {
    const updateProductManagementRequest = new UpdateProductManagementRequest()
    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.PRODUCT_DETAIL_ID, params.id ?? '')
    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.PRODUCT_CODE, params.code ?? '')
    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.PRODUCT_NAME, params.product_name ?? '')
    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.SUPPLIER_ID, params.supplier_id ?? '')
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.SUPPLIER_CODE,
      params.supplier_code ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.VN_PRODUCT_CATEGORY_NAME,
      params.vn_product_category_name ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.EN_PRODUCT_CATEGORY_NAME,
      params.en_product_category_name ?? ''
    )
    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.PRICE_M2, params.price_m2 ?? '')
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.PRODUCT_GROUP_ID,
      params.product_group_id ?? ''
    )
    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.DESCRIPTION, params.description ?? '')
    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.NOTE, params.note ?? '')
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.SPECIFICATIONS,
      params.specifications ?? ''
    )
    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.SURFACE_TYPE, params.surface_type ?? '')
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.SURFACE_QUANTIFICATION,
      params.surface_quantification ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.SURFACE_QUANTIFICATION_TOLERANCE,
      params.surface_quantification_tolerance ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.SURFACE_QUANTIFICATION_TOLERANCE_TYPE_ID,
      params.surface_quantification_tolerance_type_id ?? ''
    )

    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.SURFACE_THICKNESS,
      params.surface_thickness ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.SURFACE_THICKNESS_TOLERANCE,
      params.surface_thickness_tolerance ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.SURFACE_THICKNESS_TOLERANCE_TYPE_ID,
      params.surface_thickness_tolerance_type_id ?? ''
    )

    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.ADHESIVE_TYPE,
      params.adhesive_type ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.ADHESIVE_MEASUREMENT,
      params.adhesive_measurement ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.ADHESIVE_MEASUREMENT_TOLERANCE,
      params.adhesive_measurement_tolerance ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.ADHESIVE_MEASUREMENT_TOLERANCE_TYPE_ID,
      params.adhesive_measurement_tolerance_type_id ?? ''
    )

    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.ADHESIVE_THICKNESS,
      params.adhesive_thickness ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.ADHESIVE_THICKNESS_TOLERANCE,
      params.adhesive_thickness_tolerance ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.ADHESIVE_THICKNESS_TOLERANCE_TYPE_ID,
      params.adhesive_thickness_tolerance_type_id ?? ''
    )

    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.BASE_TYPE, params.base_type ?? '')
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.BASE_MEASUREMENT,
      params.base_measurement ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.BASE_MEASUREMENT_TOLERANCE,
      params.base_measurement_tolerance ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.BASE_MEASUREMENT_TOLERANCE_TYPE_ID,
      params.base_measurement_tolerance_type_id ?? ''
    )

    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.BASE_THICKNESS,
      params.base_thickness ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.BASE_THICKNESS_TOLERANCE,
      params.base_thickness_tolerance ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.BASE_THICKNESS_TOLERANCE_TYPE_ID,
      params.base_thickness_tolerance_type_id ?? ''
    )

    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.ADHESIVE_FORCE,
      params.adhesive_force ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.ADHESIVE_FORCE_TOLERANCE,
      params.adhesive_force_tolerance ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.ADHESIVE_FORCE_TOLERANCE_TYPE_ID,
      params.adhesive_force_tolerance_type_id ?? ''
    )

    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.TEMPERATURE_FROM,
      params.temperature_from ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.TEMPERATURE_TO,
      params.temperature_to ?? ''
    )
    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.EXPIRY_YEAR, params.expiry_year ?? '')
    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.ADVANTAGE, params.advantage ?? '')
    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.DISADVANTAGE, params.disadvantage ?? '')
    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.BONDING_ENVS, params.bonding_envs ?? '')
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.SURFACE_MATERIALS,
      params.surface_materials ?? ''
    )
    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.PRINTERS, params.printers ?? '')
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.NOT_SUITABLE_FOR,
      params.not_suitable_for ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.MIN_INVENTORY,
      params.min_inventory ?? ''
    )
    updateProductManagementRequest.addParam(
      UpdateProductManagementRequest.Keys.MAX_INVENTORY,
      params.max_inventory ?? ''
    )
    updateProductManagementRequest.addParam(UpdateProductManagementRequest.Keys.PDFS, params.pdfs ?? '')

    param = updateProductManagementRequest.getParams()
  }
  const headers = {}
  return put(urls.UPDATE_PRODUCT_MANAGEMENT, param, headers)
}

export function deleteProductManagement(id) {
  const headers = {}
  const deleteProductManagementRequest = new DeleteProductManagementRequest()
  deleteProductManagementRequest.addParam(DeleteProductManagementRequest.Keys.PRODUCTS_ID, id)
  const params = deleteProductManagementRequest.getParams()
  return _delete(urls.DELETE_PRODUCT_MANAGEMENT, params, headers)
}

export function getAllTolerances() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_TOLERANCES, param, headers)
}

export function getAllTolerancesQuantification() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_TOLERANCES_QUANTIFICATION, param, headers)
}

export function getAllTolerancesThickness() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_TOLERANCES_THICKNESS, param, headers)
}

export function getAllTolerancesAdhesiveForce() {
  let param = null
  const headers = {}
  return get(urls.GET_ALL_TOLERANCES_ADHESIVE_FORCE, param, headers)
}

export function getAllTypeOfGoodsVN() {
  let param = null
  const headers = {}
  return get(urls.VN_PRODUCT_MANAGEMENTS, param, headers)
}

export function getAllTypeOfGoodsEN() {
  let param = null
  const headers = {}
  return get(urls.EN_PRODUCT_MANAGEMENTS, param, headers)
}
