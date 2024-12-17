/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import { yupResolver } from '@hookform/resolvers/yup'
import { default as AddCircleOutline, default as AddCircleOutlineIcon } from '@mui/icons-material/AddCircleOutline'
import { Box, Button, InputLabel, Typography } from '@mui/material'
import Grid from '@mui/material/Grid'
import HeaderPage from 'components/HeaderPage'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TbEdit } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import AutocompleteForm from '../../../../components/AutocompleteForm'
import InputFieldForm from '../../../../components/InputFieldForm'
import colors from '../../../../constants/colors'
import {
  createProductManagementAction,
  getAllAdhesiveTypeAction,
  getAllBaseTypeAction,
  getAllBondingEnvAction,
  getAllNotSuitableForAction,
  getAllPrinterAction,
  getAllProductsAction,
  getAllSupplierAction,
  getAllSurfaceMaterialAction,
  getAllSurfaceTypeAction,
  getAllTolerancesAction,
  getAllTolerancesAdhesiveForceAction,
  getAllTolerancesQuantificationAction,
  getAllTolerancesThicknessAction,
  getAllTypeOfGoodsENAction,
  getAllTypeOfGoodsVNAction,
  getDetailProductManagementAction,
  removeMessageErrorAction,
  updateProductManagementAction
} from '../../../../redux/product/product.actions'

import Tooltip from '@mui/material/Tooltip'
import TextFieldWithSelect from 'components/TextFieldWithSelect'
import { toast } from 'react-toastify'
import {
  formatDate,
  formatDecimalNumber,
  formatFileSize,
  formatInputValue,
  formatNumber,
  maxDecimalsTest,
  parsePricePerSquareMeter,
  renderUploadMessage
} from '../../../../common/common'
import AutocompleteDynamic from '../../../../components/AutocompleteDynamic'
import AutocompleteMultiple from '../../../../components/AutocompleteMultiple'
import RelatedDocumentTable from '../../../../components/Table/ProductManagement/RelatedDocumentTable'
import commons from '../../../../constants/common'
import titleTableRelatedDocumentProduct from '../../../../constants/titleTableRelatedDocumentProduct'
import {
  createProductSuccessFlagState,
  errorProductMessageState,
  getAllAdhesiveTypeState,
  getAllBaseTypeState,
  getAllBondingEnvState,
  getAllNotSuitableForState,
  getAllPrinterState,
  getAllSurfaceMaterialState,
  getAllSurfaceTypeState,
  getAllTolerancesAdhesiveForceState,
  getAllTolerancesQuantificationState,
  getAllTolerancesThicknessState,
  getAllTypeOfGoodsENState,
  getAllTypeOfGoodsVNState,
  getDetailProductState,
  listAllProductsState,
  listAllSupplierState,
  updateProductSuccessFlagState
} from '../../../../redux/product/product.selectors'
import { s3 } from '../../../../utils/settingS3'

const CreateOrUpdateProductPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const productId = queryParams.get('id')
  const isCreateMode = location.pathname.includes('/create')
  const isEditMode = location.pathname.includes('/edit')

  const listAllSupplier = useSelector(listAllSupplierState)
  const listAllProducts = useSelector(listAllProductsState)
  const getAllSurfaceType = useSelector(getAllSurfaceTypeState)
  const getAllAdhesiveType = useSelector(getAllAdhesiveTypeState)
  const getAllBaseType = useSelector(getAllBaseTypeState)
  const getAllBondingEnv = useSelector(getAllBondingEnvState)
  const getAllSurfaceMaterial = useSelector(getAllSurfaceMaterialState)
  const getAllPrinter = useSelector(getAllPrinterState)
  const getAllNotSuitableFor = useSelector(getAllNotSuitableForState)
  const getAllTolerancesQuantification = useSelector(getAllTolerancesQuantificationState)
  const getAllTolerancesThickness = useSelector(getAllTolerancesThicknessState)
  const getAllTolerancesAdhesiveForce = useSelector(getAllTolerancesAdhesiveForceState)
  const getAllTypeOfGoodsVN = useSelector(getAllTypeOfGoodsVNState)
  const getAllTypeOfGoodsEN = useSelector(getAllTypeOfGoodsENState)
  const errorProductMessage = useSelector(errorProductMessageState)
  const createProductSuccessFlag = useSelector(createProductSuccessFlagState)
  const detailProduct = useSelector(getDetailProductState)
  const updateProductSuccessFlag = useSelector(updateProductSuccessFlagState)

  const [suitableTemperatureError, setSuitableTemperatureError] = useState('')
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [progress, setTotalProgress] = useState(0)
  const [supplierId, setSupplierId] = useState(null)
  const [currencyUnit, setCurrencyUnit] = useState('VND')
  const [typeNational, setTypeNational] = useState(null)
  const [surfaceQuantificationToleranceTypeId, setSurfaceQuantificationToleranceTypeId] = useState(commons.NUMBER_TWO)
  const [surfaceThicknessToleranceTypeId, setSurfaceThicknessToleranceTypeId] = useState(commons.NUMBER_THREE)
  const [adhesiveMeasurementToleranceTypeId, setAdhesiveMeasurementToleranceTypeId] = useState(commons.NUMBER_TWO)
  const [adhesiveThicknessToleranceTypeId, setAdhesiveThicknessToleranceTypeId] = useState(commons.NUMBER_THREE)
  const [baseMeasurementToleranceTypeId, setBaseMeasurementToleranceTypeId] = useState(commons.NUMBER_TWO)
  const [baseThicknessToleranceTypeId, setBaseThicknessToleranceTypeId] = useState(commons.NUMBER_THREE)
  const [adhesiveForceToleranceTypeId, setAdhesiveForceToleranceTypeId] = useState(commons.NUMBER_FOUR)
  const disabledMaxFile = selectedFiles.length >= commons.NUMBER_TEN
  const checkTypeNationalForeign = typeNational === commons.FOREIGN

  const schema = yup.object().shape({
    internalCode: yup.string().required(t('pleaseEnterInternalCode')).max(255, t('internalCodeMaxLength')).trim(),
    productName: yup.string().required(t('pleaseEnterName')).max(255, t('nameCodeMaxLength')).trim(),
    supplierId: yup
      .number()
      .required(t('supplierRequired'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    supplierProductCode: yup
      .string()
      .required(t('supplierProductCodeRequired'))
      .max(255, t('supplierProductCodeMaxLength'))
      .trim(),
    pricePerSquareMeter: yup
      .string()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(t('pricePerSquareMeterRequired'))
      .test('is-greater-than-zero', t('enterNumberGreaterThanZero'), value => {
        const numberValue = parseFloat(value.replace(/\./g, '').replace(/,/g, '.'));
        return numberValue > 0;
      }),
    typeOfGoodsVN: yup.string().required(t('typeOfGoodsRequired')).trim(),
    typeOfGoodsEN: yup.string().when('checkTypeNationalForeign', {
      is: () => checkTypeNationalForeign === true,
      then: () => yup.string().required(t('typeOfGoodsRequired')).trim(),
      otherwise: () => yup.string().nullable()
    }),
    productGroupId: yup
      .number()
      .required(t('groupProductRequired'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    productDescription: yup.string().trim(),
    note: yup.string().trim().nullable(),
    specifications: yup
      .array()
      .of(
        yup.object().shape({
          height: yup
            .string()
            .max(13, t('enterNumberLessThan13Digits'))
            .transform((value, originalValue) => (originalValue === '' ? undefined : value))
            .test('compare-height-with-length', t('compareHeightWithLength'), function (value) {
              const { length } = this.parent;

              const formatLength = parsePricePerSquareMeter(length)

              if (value !== undefined && formatLength !== undefined) {
                const heightInMeters = parsePricePerSquareMeter(value) / 100;
                return heightInMeters <= formatLength;
              }
              return true;
            })
            .nullable(),
          length: yup
            .string()
            .max(13, t('enterNumberLessThan13Digits'))
            .transform((value, originalValue) => (originalValue === '' ? undefined : value))
            .nullable()
        })
      )
      .test('has-valid-specification', t('leastOneSpecificationRequired'), (specifications) => {
        const hasAtLeastOneCompleteSpec = specifications.some((spec) => spec.height != null && spec.length != null)
        const hasIncompleteSpec = specifications.some(
          (spec) => (spec.height != null && spec.length == null) || (spec.height == null && spec.length != null)
        )

        if (hasIncompleteSpec) {
          return false
        }

        return hasAtLeastOneCompleteSpec
      }),
    facialType: yup.string().required(t('facialTypeRequired')).trim(),
    facialQuantification: yup
      .string()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(t('facialQuantificationRequired'))
      .test('is-greater-than-zero', t('enterNumberGreaterThanZero'), value => {
        const numberValue = parsePricePerSquareMeter(value);
        return numberValue > 0;
      }),
    surfaceQuantificationTolerance: yup
      .string()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(t('toleranceRequired'))
      .test('validate-surface-tolerance', t('toleranceLessThanFacialQuantification'), function (value) {
        const { facialQuantification } = this.parent

        const parsedValue = parsePricePerSquareMeter(value);
        const parsedFacialQuantification = parsePricePerSquareMeter(facialQuantification);

        if (surfaceQuantificationToleranceTypeId !== commons.NUMBER_ONE && parsedValue > parsedFacialQuantification) {
          return false
        }

        return true
      }),
    facialThickness: yup
      .string()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(t('facialThicknessRequired'))
      .test('is-greater-than-zero', t('enterNumberGreaterThanZero'), value => {
        const numberValue = parsePricePerSquareMeter(value);
        return numberValue > 0;
      }),
    surfaceThicknessTolerance: yup
      .string()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(t('toleranceRequired'))
      .test('validate-thickness-tolerance', t('toleranceLessThanSurfaceThicknessTolerance'), function (value) {
        const { facialThickness } = this.parent

        const parsedValue = parsePricePerSquareMeter(value);
        const parsedfacialThickness = parsePricePerSquareMeter(facialThickness);

        if (surfaceThicknessToleranceTypeId !== commons.NUMBER_ONE && parsedValue > parsedfacialThickness) {
          return false
        }

        return true
      }),
    adhesiveType: yup.string().required(t('adhesiveTypeRequired')).trim(),
    adhesiveQuantification: yup
      .string()
      .nullable()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .notRequired()
      .test('required-if-tolerance', t('adhesiveQuantificationRequired'), function (value) {
        const { adhesiveMeasurementTolerance } = this.parent
        if (adhesiveMeasurementTolerance !== undefined && adhesiveMeasurementTolerance !== null) {
          return value !== undefined && value !== null
        }
        return true
      }),
    adhesiveMeasurementTolerance: yup
      .string()
      .nullable()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .notRequired()
      .test('required-if-adhesiveQuantification', t('toleranceRequired'), function (value) {
        const { adhesiveQuantification } = this.parent

        const parsedAdhesiveQuantification = parsePricePerSquareMeter(adhesiveQuantification);

        if (parsedAdhesiveQuantification !== undefined && parsedAdhesiveQuantification !== null) {
          return parsePricePerSquareMeter(value, commons.ZERO) !== undefined && parsePricePerSquareMeter(value, commons.ZERO) !== null
        }

        return true
      })
      .test('validate-adhesiveQuantification-tolerance', t('toleranceLessThanAdhesiveMeasurementTolerance'), function (value) {
        const { adhesiveQuantification } = this.parent

        const parsedValue = parsePricePerSquareMeter(value, commons.ZERO);
        const parsedAdhesiveQuantification = parsePricePerSquareMeter(adhesiveQuantification);

        if (adhesiveMeasurementToleranceTypeId !== commons.NUMBER_ONE && parsedValue > parsedAdhesiveQuantification) {
          return false
        }

        return true
      }),
    adhesiveThickness: yup
      .string()
      .nullable()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .notRequired()
      .test('required-if-tolerance', t('thicknessRequired'), function (value) {
        const { adhesiveThicknessTolerance } = this.parent
        if (adhesiveThicknessTolerance !== undefined && adhesiveThicknessTolerance !== null) {
          return value !== undefined && value !== null
        }
        return true
      }),
    adhesiveThicknessTolerance: yup
      .string()
      .nullable()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .notRequired()
      .test('required-if-thickness', t('toleranceRequired'), function (value) {
        const { adhesiveThickness } = this.parent

        const parsedAdhesiveThickness = parsePricePerSquareMeter(adhesiveThickness);

        if (parsedAdhesiveThickness !== undefined && parsedAdhesiveThickness !== null) {
          return parsePricePerSquareMeter(value, commons.ZERO) !== undefined && parsePricePerSquareMeter(value, commons.ZERO) !== null
        }

        return true
      })
      .test('validate-adhesiveThickness-tolerance', t('toleranceLessThanAdhesiveThicknessTolerance'), function (value) {
        const { adhesiveThickness } = this.parent

        const parsedValue = parsePricePerSquareMeter(value, commons.ZERO);
        const parsedAdhesiveThickness = parsePricePerSquareMeter(adhesiveThickness);

        if (adhesiveThicknessToleranceTypeId !== commons.NUMBER_ONE && parsedValue > parsedAdhesiveThickness) {
          return false
        }

        return true
      }),
    baseType: yup.string().required(t('baseTypeRequired')).trim(),
    baseQuantification: yup
      .string()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(t('baseQuantificationRequired'))
      .test('is-greater-than-zero', t('enterNumberGreaterThanZero'), value => {
        const numberValue = parsePricePerSquareMeter(value);
        return numberValue > 0;
      }),
    baseMeasurementTolerance: yup
      .string()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(t('toleranceRequired'))
      .test('validate-surface-tolerance', t('toleranceLessThanBaseMeasurementTolerance'), function (value) {
        const { baseQuantification } = this.parent

        const parsedValue = parsePricePerSquareMeter(value);
        const parsedBaseQuantification = parsePricePerSquareMeter(baseQuantification);

        if (baseMeasurementToleranceTypeId !== commons.NUMBER_ONE && parsedValue > parsedBaseQuantification) {
          return false
        }

        return true
      }),
    baseThickness: yup
      .string()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(t('baseThicknessRequired'))
      .test('is-greater-than-zero', t('enterNumberGreaterThanZero'), value => {
        const numberValue = parsePricePerSquareMeter(value);
        return numberValue > 0;
      }),

    baseThicknessTolerance: yup
      .string()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(t('toleranceRequired'))
      .test('validate-baseThickness-tolerance', t('toleranceLessThanBaseThicknessTolerance'), function (value) {
        const { baseThickness } = this.parent

        const parsedValue = parsePricePerSquareMeter(value);
        const parsedBaseThickness = parsePricePerSquareMeter(baseThickness);

        if (baseThicknessToleranceTypeId !== commons.NUMBER_ONE && parsedValue > parsedBaseThickness) {
          return false
        }

        return true
      }),
    adhesiveForce: yup
      .string()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(t('adhesiveForceRequired'))
      .test('is-greater-than-zero', t('enterNumberGreaterThanZero'), value => {
        const numberValue = parsePricePerSquareMeter(value);
        return numberValue > 0;
      }),
    adhesiveForceTolerance: yup
      .string()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(t('toleranceRequired'))
      .test('validate-adhesiveForce-tolerance', t('toleranceLessThanAdhesiveForceTolerance'), function (value) {
        const { adhesiveForce } = this.parent

        const parsedValue = parsePricePerSquareMeter(value);
        const parsedAdhesiveForce = parsePricePerSquareMeter(adhesiveForce);

        if (adhesiveForceToleranceTypeId !== commons.NUMBER_ONE && parsedValue > parsedAdhesiveForce) {
          return false
        }

        return true
      }),
    temperatureFrom: yup
      .number()
      .typeError(t('onlyNumber'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .nullable()
      .max(commons.NUMBER_MAX_LENGTH, t('enterNumberLessThan13Digits'))
      .notRequired(),
    temperatureTo: yup
      .number()
      .typeError(t('onlyNumber'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .nullable()
      .max(commons.NUMBER_MAX_LENGTH, t('enterNumberLessThan13Digits'))
      .notRequired(),
    expirationDate: yup
      .number()
      .nullable()
      .typeError(t('onlyNumber'))
      .positive(t('enterNumberGreaterThanZero'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .notRequired(),
    advantages: yup.string().max(255, t('internalCodeMaxLength')).trim().nullable(),
    disadvantages: yup.string().max(255, t('internalCodeMaxLength')).trim().nullable(),
    minInventory: yup
      .string()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .nullable()
      .notRequired()
      .test('is-greater-than-zero', t('enterNumberGreaterThanZero'), value => {
        const numberValue = parsePricePerSquareMeter(value);
        return numberValue > 0;
      }),
    maxInventory: yup
      .string()
      .max(13, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .notRequired()
      .test('is-greater-than-zero', t('enterNumberGreaterThanZero'), value => {
        if (value === undefined || value === null) return true;
        const numberValue = parsePricePerSquareMeter(value);
        return numberValue > 0;
      })
      .test('is-greater', t('maxMustBeGreaterThanMin'), function (value) {
        const { minInventory } = this.parent;

        if (value === undefined || value === null) return true;

        const maxInventoryValue = parsePricePerSquareMeter(value);
        const minInventoryValue = minInventory ? parsePricePerSquareMeter(minInventory) : null;

        if (minInventoryValue !== null && minInventoryValue !== undefined) {
          return maxInventoryValue >= minInventoryValue;
        }

        return true;
      })
  })

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      internalCode: '',
      productName: '',
      productGroupId: '',
      supplierId: '',
      supplierProductCode: '',
      pricePerSquareMeter: '',
      typeOfGoodsVN: '',
      typeOfGoodsEN: '',
      productDescription: '',
      note: '',
      specifications: [
        { height: '', length: '' },
        { height: '', length: '' }
      ],
      facialType: '',
      facialQuantification: '',
      surfaceQuantificationTolerance: '',
      facialThickness: '',
      surfaceThicknessTolerance: '',
      adhesiveType: '',
      adhesiveQuantification: '',
      adhesiveMeasurementTolerance: '',
      adhesiveThickness: '',
      adhesiveThicknessTolerance: '',
      baseType: '',
      baseQuantification: '',
      baseMeasurementTolerance: '',
      baseThickness: '',
      baseThicknessTolerance: '',
      adhesiveForce: '',
      adhesiveForceTolerance: '',
      bondingEnvironment: [],
      surfaceMaterial: [],
      printingMachine: [],
      temperatureFrom: '',
      temperatureTo: '',
      notSuitable: [],
      expirationDate: '',
      advantages: '',
      disadvantages: '',
      minInventory: '',
      maxInventory: '',
      pdfs: []
    }
  })

  useEffect(() => {
    if (productId) {
      dispatch(
        getDetailProductManagementAction({
          id: productId
        })
      )
    }
  }, [productId])

  useEffect(() => {
    dispatch(getAllSupplierAction())
    dispatch(getAllProductsAction())
    dispatch(getAllSurfaceTypeAction())
    dispatch(getAllAdhesiveTypeAction())
    dispatch(getAllBaseTypeAction())
    dispatch(getAllBondingEnvAction())
    dispatch(getAllSurfaceMaterialAction())
    dispatch(getAllPrinterAction())
    dispatch(getAllNotSuitableForAction())
    dispatch(getAllTolerancesAction())
    dispatch(getAllTolerancesQuantificationAction())
    dispatch(getAllTolerancesThicknessAction())
    dispatch(getAllTolerancesAdhesiveForceAction())
    dispatch(getAllTypeOfGoodsVNAction())
    dispatch(getAllTypeOfGoodsENAction())
  }, [])

  useEffect(() => {
    if (productId && detailProduct) {
      const mappedSpecifications =
        detailProduct.specifications?.map((spec) => ({
          height: spec.height ?? '',
          length: spec.length ?? ''
        })) ?? []

      mappedSpecifications.forEach((spec, index) => {
        setValue(`specifications[${index}].height`, formatNumber(spec.height))
        setValue(`specifications[${index}].length`, formatNumber(spec.length))
      })
      const bondingEnvironments = detailProduct.bonding_env?.map((item) => item.name) ?? []
      const surfaceMaterialNames = detailProduct.surface_material?.map((item) => item.name) ?? []
      const printingMachines = detailProduct.printer?.map((item) => item.name) ?? []
      const notSuitables = detailProduct.not_suitable_for?.map((item) => item.name) ?? []

      setValue('internalCode', detailProduct.code ?? '')
      setValue('productName', detailProduct.product_name ?? '')
      setValue('productGroupId', detailProduct.product_group?.id ?? '')
      setValue('supplierId', detailProduct.supplier?.id ?? '')
      setValue('supplierProductCode', detailProduct.supplier_code ?? '')
      setValue(
        'pricePerSquareMeter',
        detailProduct.price_m2 && detailProduct.price_m2 !== 0
          ? formatNumber(detailProduct.price_m2)
          : ''
      )
      setValue('typeOfGoodsVN', detailProduct?.vn_product_category?.name ?? '')
      setValue('typeOfGoodsEN', detailProduct?.en_product_category?.name ?? '')
      setValue('productDescription', detailProduct?.description ?? '')
      setValue('note', detailProduct.note ?? '')
      setValue('facialType', detailProduct.surface_type?.name ?? '')
      setValue('facialQuantification', formatNumber(detailProduct.surface_quantification?.surface_quantification) ?? '')
      setValue(
        'surfaceQuantificationTolerance',
        formatNumber(detailProduct.surface_quantification?.surface_quantification_tolerance) ?? ''
      )
      setSurfaceQuantificationToleranceTypeId(
        detailProduct.surface_quantification?.surface_quantification_tolerance_type?.id
      )

      setValue('facialThickness', formatNumber(detailProduct.surface_thickness?.surface_thickness) ?? '')
      setValue('surfaceThicknessTolerance', formatNumber(detailProduct.surface_thickness?.surface_thickness_tolerance) ?? '')
      setSurfaceThicknessToleranceTypeId(detailProduct.surface_thickness?.surface_thickness_tolerance_type?.id)

      setValue('adhesiveType', detailProduct.adhesive_type?.name ?? '')
      setValue('adhesiveQuantification', formatNumber(detailProduct.adhesive_measurement?.adhesive_measurement) ?? '')
      setValue('adhesiveMeasurementTolerance', formatNumber(detailProduct.adhesive_measurement?.adhesive_measurement_tolerance) ?? '')
      setAdhesiveMeasurementToleranceTypeId(detailProduct.adhesive_measurement?.adhesive_measurement_tolerance_type?.id)

      setValue('adhesiveThickness', formatNumber(detailProduct.adhesive_thickness?.adhesive_thickness) ?? '')
      setValue('adhesiveThicknessTolerance', formatNumber(detailProduct.adhesive_thickness?.adhesive_thickness_tolerance) ?? '')
      setAdhesiveThicknessToleranceTypeId(detailProduct.adhesive_thickness?.adhesive_thickness_tolerance_type?.id)

      setValue('baseType', detailProduct.base_type?.name ?? '')
      setValue('baseQuantification', formatNumber(detailProduct.base_measurement?.base_measurement) ?? '')
      setValue('baseMeasurementTolerance', formatNumber(detailProduct.base_measurement?.base_measurement_tolerance) ?? '')
      setBaseMeasurementToleranceTypeId(detailProduct.base_measurement?.base_measurement_tolerance_type?.id)

      setValue('baseThickness', formatNumber(detailProduct.base_thickness?.base_thickness) ?? '')
      setValue('baseThicknessTolerance', formatNumber(detailProduct.base_thickness?.base_thickness_tolerance) ?? '')
      setBaseThicknessToleranceTypeId(detailProduct.base_thickness?.base_thickness_tolerance_type?.id)

      setValue('adhesiveForce', formatNumber(detailProduct.adhesive_force?.adhesive_force) ?? '')
      setValue('adhesiveForceTolerance', formatNumber(detailProduct.adhesive_force?.adhesive_force_tolerance) ?? '')
      setAdhesiveForceToleranceTypeId(detailProduct.adhesive_force?.adhesive_force_tolerance_type?.id)

      setValue('bondingEnvironment', bondingEnvironments)
      setValue('surfaceMaterial', surfaceMaterialNames)
      setValue('printingMachine', printingMachines)
      setValue('temperatureFrom', detailProduct.temperature_from ?? '')
      setValue('temperatureTo', detailProduct.temperature_to ?? '')
      setValue('expirationDate', detailProduct.expiry_year ?? '')
      setValue('advantages', detailProduct.advantage ?? '')
      setValue('disadvantages', detailProduct.disadvantage ?? '')
      setValue('notSuitable', notSuitables)
      setValue('minInventory', formatNumber(detailProduct.min_inventory))
      setValue('maxInventory', formatNumber(detailProduct.max_inventory))

      if (detailProduct?.pdf) {
        const formattedFiles = detailProduct?.pdf?.map((file) => ({
          id: file.id,
          url: file.path_name,
          originalName: file.path_name.split('/').pop(),
          size: file.size,
          createdAt: file.created_at
        }))
        setSelectedFiles(formattedFiles)
      }

      setCurrencyUnit(detailProduct.supplier?.currency_unit?.name ?? 'VND')
      setSupplierId(detailProduct?.supplier?.id ?? null)
      setTypeNational(detailProduct?.supplier?.supplier_type?.id ?? null)
    }
  }, [productId, detailProduct, setValue])

  const onSubmit = async (data) => {
    let fileDetails = []
    if (selectedFiles.length) {
      fileDetails = selectedFiles.map((file) => ({
        id: isEditMode ? file.id : null,
        path_name: file.originalName,
        size: file.size,
        created_at: file.createdAt
      }))
    }

    const mappedData = {
      code: data.internalCode,
      product_name: data.productName,
      product_group_id: data.productGroupId,
      supplier_id: data.supplierId,
      supplier_code: data.supplierProductCode,
      price_m2: parsePricePerSquareMeter(data.pricePerSquareMeter),
      vn_product_category_name: data.typeOfGoodsVN,
      en_product_category_name: data.typeOfGoodsEN,
      description: data.productDescription,
      note: data.note,
      specifications: data.specifications
        .filter((spec) => spec.height !== undefined && spec.length !== undefined)
        .map((spec) => ({
          height: parsePricePerSquareMeter(spec.height),
          length: parsePricePerSquareMeter(spec.length)
        })),
      surface_type: data.facialType,
      surface_quantification: parsePricePerSquareMeter(data.facialQuantification),
      surface_quantification_tolerance: parsePricePerSquareMeter(data.surfaceQuantificationTolerance, commons.ZERO),

      surface_quantification_tolerance_type_id: surfaceQuantificationToleranceTypeId,
      surface_thickness: parsePricePerSquareMeter(data.facialThickness),
      surface_thickness_tolerance: parsePricePerSquareMeter(data.surfaceThicknessTolerance, commons.ZERO),
      surface_thickness_tolerance_type_id: surfaceThicknessToleranceTypeId,

      adhesive_type: data.adhesiveType,
      adhesive_measurement: parsePricePerSquareMeter(data.adhesiveQuantification),
      adhesive_measurement_tolerance: parsePricePerSquareMeter(data.adhesiveMeasurementTolerance, commons.ZERO),
      adhesive_measurement_tolerance_type_id: adhesiveMeasurementToleranceTypeId,
      adhesive_thickness: parsePricePerSquareMeter(data.adhesiveThickness),
      adhesive_thickness_tolerance: parsePricePerSquareMeter(data.adhesiveThicknessTolerance, commons.ZERO),
      adhesive_thickness_tolerance_type_id: adhesiveThicknessToleranceTypeId,

      base_type: data.baseType,
      base_measurement: parsePricePerSquareMeter(data.baseQuantification),
      base_measurement_tolerance: parsePricePerSquareMeter(data.baseMeasurementTolerance, commons.ZERO),
      base_measurement_tolerance_type_id: baseMeasurementToleranceTypeId,

      base_thickness: parsePricePerSquareMeter(data.baseThickness),
      base_thickness_tolerance: parsePricePerSquareMeter(data.baseThicknessTolerance, commons.ZERO),
      base_thickness_tolerance_type_id: baseThicknessToleranceTypeId,

      adhesive_force: parsePricePerSquareMeter(data.adhesiveForce),
      adhesive_force_tolerance: parsePricePerSquareMeter(data.adhesiveForceTolerance, commons.ZERO),
      adhesive_force_tolerance_type_id: adhesiveForceToleranceTypeId,

      bonding_envs: data.bondingEnvironment,
      surface_materials: data.surfaceMaterial,
      printers: data.printingMachine,
      temperature_from: data.temperatureFrom,
      temperature_to: data.temperatureTo,
      expiry_year: data.expirationDate,
      advantage: data.advantages,
      disadvantage: data.disadvantages,
      not_suitable_for: data.notSuitable,
      min_inventory: parsePricePerSquareMeter(data.minInventory),
      max_inventory: parsePricePerSquareMeter(data.maxInventory),
      pdfs: fileDetails
    }

    try {
      setLoading(true)
      if (isCreateMode) {
        dispatch(createProductManagementAction(mappedData))
      } else if (isEditMode) {
        dispatch(updateProductManagementAction({ id: productId, ...mappedData }))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const removeMessageError = useCallback(() => {
    dispatch(removeMessageErrorAction())
  }, [dispatch])

  useEffect(() => {
    if (createProductSuccessFlag || updateProductSuccessFlag) {
      removeMessageError()
      setError()
      navigate(`/product`)
    }
  }, [createProductSuccessFlag, updateProductSuccessFlag, navigate, setError, removeMessageError])

  useEffect(() => {
    return () => {
      removeMessageError()
      clearErrors()
    }
  }, [location, removeMessageError, clearErrors])

  useEffect(() => {
    if (errorProductMessage) {
      if (errorProductMessage.code) {
        setError('internalCode', {
          type: 'manual',
          message: errorProductMessage.code[0]
        })
      }
      if (errorProductMessage.specifications) {
        setError('specifications', {
          type: 'manual',
          message: errorProductMessage.specifications[0]
        })
      }

      if (errorProductMessage.temperature_from) {
        setSuitableTemperatureError(errorProductMessage.temperature_from[0])
      } else {
        setSuitableTemperatureError('')
      }

      if (errorProductMessage.supplier_code) {
        setError('supplierProductCode', {
          type: 'manual',
          message: errorProductMessage.supplier_code[0]
        })
      }
    }
  }, [errorProductMessage, setError])

  const handleClickFileUpload = () => {
    fileInputRef.current.value = null
    fileInputRef.current.click()
  }

  const uploadToS3 = async (file, totalSize, setTotalProgress, cumulativeProgress) => {
    const params = {
      Bucket: process.env.REACT_APP_BUCKET,
      Key: file.name,
      Body: file,
      ContentType: file.type
    }

    return new Promise((resolve, reject) => {
      s3.upload(params)
        .on('httpUploadProgress', (progress) => {
          const fileProgress = progress.loaded
          cumulativeProgress.current += fileProgress

          const overallProgress = Math.min(Math.round((cumulativeProgress.current / totalSize) * 100), 100)
          setTotalProgress(overallProgress)
        })
        .send((err, data) => {
          if (err) {
            toast.error(`Error uploading file: ${file.name}`, { position: 'top-right' })
            reject(err)
          } else {
            resolve({
              id: Date.now() + Math.random(),
              url: data.Location,
              originalName: file.name,
              size: formatFileSize(file.size),
              createdAt: formatDate(new Date())
            })
          }
        })
    })
  }

  const handleProcessFileUpload = async (files) => {
    let validFiles = []
    let invalidFileTypes = []
    let oversizedFiles = []
    const currentFileCount = selectedFiles.length
    const newFileCount = files.length

    if (currentFileCount + newFileCount > commons.NUMBER_TEN) {
      toast.error(`${t('maxTotalFile')}`)
    }

    Array.from(files).forEach((file) => {
      const fileExtension = file.name.split('.').pop().toLowerCase()
      if (!commons.FORMAT_FILE.includes(fileExtension)) {
        invalidFileTypes.push(file)
      } else if (file.size > commons.MAX_SIZE_FILE) {
        oversizedFiles.push(file)
      } else {
        validFiles.push(file)
      }
    })

    if (invalidFileTypes.length > 0) {
      const invalidFilesMessage = renderUploadMessage(invalidFileTypes, t('inValidFileType'), 'name')

      toast.error(invalidFilesMessage)
    }

    if (oversizedFiles.length > 0) {
      const oversizedFilesMessage = renderUploadMessage(oversizedFiles, t('sizeFileLimit'), 'name')

      toast.error(oversizedFilesMessage)
    }

    const filesToUpload = validFiles.slice(0, commons.NUMBER_TEN - currentFileCount)

    const totalSize = filesToUpload.reduce((total, file) => total + file.size, 0)
    const cumulativeProgress = { current: 0 }
    setLoading(true)
    setTotalProgress(0)

    const uploadedFiles = []

    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i]
      try {
        const uploadedFileData = await uploadToS3(file, totalSize, setTotalProgress, cumulativeProgress)
        if (uploadedFileData) {
          uploadedFiles.push(uploadedFileData)
        }
      } catch (error) {
        console.error('File upload failed:', error)
      }
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...uploadedFiles])
    setLoading(false)
    if (uploadedFiles.length > 0) {
      const successMessage = renderUploadMessage(uploadedFiles, t('fileUploadSuccess'), 'originalName')
      toast.success(successMessage)
    }
  }

  const handleDelete = (fileId) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file) => file.id !== fileId))
  }

  const handleInputChange = (event, toleranceTypeId, facialQuantificationValue, fieldName, clearErrors) => {
    let value = formatInputValue(event.target.value)

    if (toleranceTypeId === commons.NUMBER_ONE && value !== '') {
      value = parseFloat(value) < 100 ? value : 100
    } else {
      if (facialQuantificationValue && value !== '') {
        value = parsePricePerSquareMeter(value) >= parsePricePerSquareMeter(facialQuantificationValue) ? facialQuantificationValue : value
      }
    }

    setValue(fieldName, formatDecimalNumber(value))
    clearErrors(fieldName)
  }

  const handleSupplierChange = (selectedSupplier) => {
    if (selectedSupplier) {
      setSupplierId(selectedSupplier.id)
    } else {
      setSupplierId(null)
      setTypeNational(null)
    }
  }

  useEffect(() => {
    if (supplierId) {
      const supplierIdSelected = listAllSupplier.find((item) => item.id === supplierId)
      setCurrencyUnit(supplierIdSelected?.currency_unit?.name)
      setTypeNational(supplierIdSelected?.supplier_type?.id)
    }
  }, [supplierId])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <HeaderPage
        title={isCreateMode ? t('addNewProduct') : isEditMode ? t('editProduct') : ''}
        actionButton={
          <>
            {isCreateMode && (
              <Button
                disabled={loading}
                className="buttonAction"
                sx={{ gap: '8px', color: colors.greenColor }}
                onClick={handleSubmit(onSubmit)}
              >
                <AddCircleOutline />
                {t('add')}
              </Button>
            )}
            {isEditMode && (
              <Button
                disabled={loading}
                className="buttonAction"
                sx={{ gap: '8px', color: colors.greenColor }}
                onClick={handleSubmit(onSubmit)}
              >
                <TbEdit style={{ fontSize: '16px', marginBottom: '2px' }} />
                {t('save')}
              </Button>
            )}
          </>
        }
      />
      <Box p={2}>
        <Box sx={{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '20px', position: 'relative' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* SECTION 1 */}
            <Box>
              <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
                <Typography
                  sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
                >
                  {t('basicInformation')}
                </Typography>
              </Box>
              <Grid spacing={1}>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('internalCode')}
                    </InputLabel>
                    <InputFieldForm
                      name="internalCode"
                      control={control}
                      errors={errors}
                      placeholder="enterInternalCode"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('name')}
                    </InputLabel>
                    <InputFieldForm name="productName" control={control} errors={errors} placeholder="enterName" />
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('supplierFullText')}
                    </InputLabel>
                    <Tooltip title={isEditMode && detailProduct.is_disabled === true ? t('theSupplierNotBeEditedWhileProductHavePurchaseOrder') : ''}>
                      <span>
                        <AutocompleteForm
                          name="supplierId"
                          control={control}
                          errors={errors}
                          options={listAllSupplier}
                          disabled={isEditMode && detailProduct.is_disabled === true}
                          getOptionLabel={(option) => option.supplier_name}
                          noOptionsText={t('noResult')}
                          placeholder={t('selectSupplier')}
                          onChange={handleSupplierChange}
                        />
                      </span>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('supplierProductCode')}
                    </InputLabel>
                    <Tooltip
                      title={supplierId === null ? `${t('pleaseChooseSupplierFirst')}` : ''}
                      disableHoverListener={supplierId !== null}
                    >
                      <div>
                        <InputFieldForm
                          name="supplierProductCode"
                          control={control}
                          errors={errors}
                          placeholder="enterSupplierProductCode"
                          disabled={supplierId === null}
                        />
                      </div>
                    </Tooltip>
                  </Grid>

                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('pricePerSquareMeter')}
                    </InputLabel>
                    <Tooltip
                      title={supplierId === null ? `${t('pleaseChooseSupplierFirst')}` : ''}
                      disableHoverListener={supplierId !== null}
                    >
                      <div>
                        <InputFieldForm
                          name="pricePerSquareMeter"
                          control={control}
                          errors={errors}
                          placeholder="enterPricePerSquareMeter"
                          label={currencyUnit}
                          textAlign="center"
                          disabled={supplierId === null}
                          enableFormat={true}
                        />
                      </div>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('productGroups')}
                    </InputLabel>
                    <AutocompleteForm
                      name="productGroupId"
                      control={control}
                      errors={errors}
                      options={listAllProducts}
                      getOptionLabel={(option) => option.product_group_name}
                      noOptionsText={t('noResult')}
                      placeholder={t('selectProductGroup')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('typeOfGoods')} (VN)
                    </InputLabel>
                    <Tooltip
                      title={supplierId === null ? `${t('pleaseChooseSupplierFirst')}` : ''}
                      disableHoverListener={supplierId !== null}
                    >
                      <div>
                        <AutocompleteDynamic
                          name="typeOfGoodsVN"
                          control={control}
                          errors={errors}
                          options={getAllTypeOfGoodsVN}
                          getOptionLabel={(option) => option.name}
                          noOptionsText={t('noResult')}
                          placeholder={t('chooseTypeOfGoods')}
                          disabled={supplierId === null}
                        />
                      </div>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel
                      required={checkTypeNationalForeign ? true : false}
                      className={`inputLabel-product ${checkTypeNationalForeign ? 'requiredTextField' : ''}`}
                    >
                      {t('typeOfGoods')} (EN)
                    </InputLabel>
                    <Tooltip
                      title={supplierId === null ? `${t('pleaseChooseSupplierFirst')}` : ''}
                      disableHoverListener={supplierId !== null}
                    >
                      <div>
                        <AutocompleteDynamic
                          name="typeOfGoodsEN"
                          control={control}
                          errors={errors}
                          options={getAllTypeOfGoodsEN}
                          getOptionLabel={(option) => option.name}
                          noOptionsText={t('noResult')}
                          placeholder={t('chooseTypeOfGoods')}
                          disabled={supplierId === null}
                        />
                      </div>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('productDescription')}</InputLabel>
                    <InputFieldForm
                      name="productDescription"
                      control={control}
                      errors={errors}
                      placeholder="enterDetailedProductDescription"
                      multiline
                      rows={2}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('note')}</InputLabel>
                    <InputFieldForm
                      name="note"
                      control={control}
                      errors={errors}
                      placeholder="enterNoteProduct"
                      multiline
                      rows={2}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('specificationsUnit')}
                    </InputLabel>
                    {Array.from({ length: 2 }).map((_, index) => (
                      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'baseline', marginTop: '0.5rem' }} key={index}>
                        <Typography sx={{ fontSize: '12px', fontWeight: '400' }}>{index + 1}</Typography>
                        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'baseline' }}>
                          <InputFieldForm
                            name={`specifications[${index}].height`}
                            control={control}
                            errors={
                              errors?.specifications?.[index]?.height
                                ? { [`specifications[${index}].height`]: errors.specifications[index].height }
                                : {}
                            }
                            placeholder={t('enterHigh')}
                            sx={{ width: '80%' }}
                            enableFormat={true}
                          />
                          <Typography sx={{ fontSize: '12px', fontWeight: '400', color: colors.greyColor }}>
                            cm
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          <InputFieldForm
                            name={`specifications[${index}].length`}
                            control={control}
                            errors={
                              errors?.specifications?.[index]?.length
                                ? { [`specifications[${index}].length`]: errors.specifications[index].length }
                                : {}
                            }
                            placeholder={t('enterLength')}
                            sx={{ width: '80%' }}
                            enableFormat={true}
                          />
                          <Typography sx={{ fontSize: '12px', fontWeight: '400', color: colors.greyColor }}>
                            m
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                    {errors.specifications && errors.specifications.message && (
                      <Typography color="error" sx={{ marginBottom: '1rem', fontSize: '0.75rem' }}>
                        {errors.specifications.message}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            {/* SECTION 2 */}
            <Box mt={4}>
              <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
                <Typography
                  sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
                >
                  {t('productSpecifications')}
                </Typography>
              </Box>
              <Grid spacing={1}>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('facialType')}
                    </InputLabel>
                    <AutocompleteDynamic
                      name="facialType"
                      control={control}
                      errors={errors}
                      options={getAllSurfaceType}
                      getOptionLabel={(option) => option.name}
                      noOptionsText={t('noResult')}
                      placeholder={t('enterOrSelect')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('facialQuantification')}
                    </InputLabel>
                    <Grid item container xs={12} spacing={1}>
                      <Grid item xs={6}>
                        <InputFieldForm
                          name="facialQuantification"
                          control={control}
                          errors={errors}
                          placeholder={t('enter')}
                          enableFormat={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextFieldWithSelect
                          name="surfaceQuantificationTolerance"
                          control={control}
                          unit={surfaceQuantificationToleranceTypeId}
                          setUnit={setSurfaceQuantificationToleranceTypeId}
                          setValue={setValue}
                          errors={errors}
                          selectOptions={getAllTolerancesQuantification}
                          placeholder={t('tolerance')}
                          enableFormat={true}
                          handleInputChange={(e) =>
                            handleInputChange(
                              e,
                              surfaceQuantificationToleranceTypeId,
                              getValues('facialQuantification'),
                              'surfaceQuantificationTolerance',
                              clearErrors
                            )
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('facialThickness')}
                    </InputLabel>
                    <Grid item container xs={12} spacing={1}>
                      <Grid item xs={6}>
                        <InputFieldForm
                          name="facialThickness"
                          control={control}
                          errors={errors}
                          placeholder={t('enter')}
                          enableFormat={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextFieldWithSelect
                          name="surfaceThicknessTolerance"
                          control={control}
                          unit={surfaceThicknessToleranceTypeId}
                          setUnit={setSurfaceThicknessToleranceTypeId}
                          setValue={setValue}
                          errors={errors}
                          selectOptions={getAllTolerancesThickness}
                          placeholder={t('tolerance')}
                          handleInputChange={(e) =>
                            handleInputChange(
                              e,
                              surfaceThicknessToleranceTypeId,
                              getValues('facialThickness'),
                              'surfaceThicknessTolerance',
                              clearErrors
                            )
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('adhesiveTypes')}
                    </InputLabel>
                    <AutocompleteDynamic
                      name="adhesiveType"
                      control={control}
                      errors={errors}
                      options={getAllAdhesiveType}
                      getOptionLabel={(option) => option.name}
                      noOptionsText={t('noResult')}
                      placeholder={t('enterOrSelect')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className=" inputLabel-product">{t('adhesiveQuantification')}</InputLabel>
                    <Grid item container xs={12} spacing={1}>
                      <Grid item xs={6}>
                        <InputFieldForm
                          name="adhesiveQuantification"
                          control={control}
                          errors={errors}
                          placeholder={t('enter')}
                          sizeWidth={'100%'}
                          enableFormat={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextFieldWithSelect
                          name="adhesiveMeasurementTolerance"
                          control={control}
                          unit={adhesiveMeasurementToleranceTypeId}
                          setUnit={setAdhesiveMeasurementToleranceTypeId}
                          setValue={setValue}
                          errors={errors}
                          selectOptions={getAllTolerancesQuantification}
                          placeholder={t('tolerance')}
                          handleInputChange={(e) =>
                            handleInputChange(
                              e,
                              adhesiveMeasurementToleranceTypeId,
                              getValues('adhesiveQuantification'),
                              'adhesiveMeasurementTolerance',
                              clearErrors
                            )
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className=" inputLabel-product">{t('adhesiveThickness')}</InputLabel>
                    <Grid item container xs={12} spacing={1}>
                      <Grid item xs={6}>
                        <InputFieldForm
                          name="adhesiveThickness"
                          control={control}
                          errors={errors}
                          placeholder={t('enter')}
                          enableFormat={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextFieldWithSelect
                          name="adhesiveThicknessTolerance"
                          control={control}
                          unit={adhesiveThicknessToleranceTypeId}
                          setUnit={setAdhesiveThicknessToleranceTypeId}
                          setValue={setValue}
                          errors={errors}
                          selectOptions={getAllTolerancesThickness}
                          placeholder={t('tolerance')}
                          handleInputChange={(e) =>
                            handleInputChange(
                              e,
                              adhesiveThicknessToleranceTypeId,
                              getValues('adhesiveThickness'),
                              'adhesiveThicknessTolerance',
                              clearErrors
                            )
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('baseType')}
                    </InputLabel>
                    <AutocompleteDynamic
                      name="baseType"
                      control={control}
                      errors={errors}
                      options={getAllBaseType}
                      getOptionLabel={(option) => option.name}
                      noOptionsText={t('noResult')}
                      placeholder={t('enterOrSelect')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('baseQuantification')}
                    </InputLabel>
                    <Grid item container xs={12} spacing={1}>
                      <Grid item xs={6}>
                        <InputFieldForm
                          name="baseQuantification"
                          control={control}
                          errors={errors}
                          placeholder={t('enter')}
                          enableFormat={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextFieldWithSelect
                          name="baseMeasurementTolerance"
                          control={control}
                          unit={baseMeasurementToleranceTypeId}
                          setUnit={setBaseMeasurementToleranceTypeId}
                          setValue={setValue}
                          errors={errors}
                          selectOptions={getAllTolerancesQuantification}
                          placeholder={t('tolerance')}
                          handleInputChange={(e) =>
                            handleInputChange(
                              e,
                              baseMeasurementToleranceTypeId,
                              getValues('baseQuantification'),
                              'baseMeasurementTolerance',
                              clearErrors
                            )
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('baseThickness')}
                    </InputLabel>
                    <Grid item container xs={12} spacing={1}>
                      <Grid item xs={6}>
                        <InputFieldForm
                          name="baseThickness"
                          control={control}
                          errors={errors}
                          placeholder={t('enter')}
                          enableFormat={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextFieldWithSelect
                          name="baseThicknessTolerance"
                          control={control}
                          unit={baseThicknessToleranceTypeId}
                          setUnit={setBaseThicknessToleranceTypeId}
                          setValue={setValue}
                          errors={errors}
                          selectOptions={getAllTolerancesThickness}
                          placeholder={t('tolerance')}
                          handleInputChange={(e) =>
                            handleInputChange(
                              e,
                              baseThicknessToleranceTypeId,
                              getValues('baseThickness'),
                              'baseThicknessTolerance',
                              clearErrors
                            )
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('adhesiveForce')}
                    </InputLabel>
                    <Grid item container xs={12} spacing={1}>
                      <Grid item xs={6}>
                        <InputFieldForm
                          name="adhesiveForce"
                          control={control}
                          errors={errors}
                          placeholder={t('enter')}
                          enableFormat={true}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextFieldWithSelect
                          name="adhesiveForceTolerance"
                          control={control}
                          unit={adhesiveForceToleranceTypeId}
                          setUnit={setAdhesiveForceToleranceTypeId}
                          setValue={setValue}
                          errors={errors}
                          selectOptions={getAllTolerancesAdhesiveForce}
                          placeholder={t('tolerance')}
                          widthSize="70px"
                          handleInputChange={(e) =>
                            handleInputChange(
                              e,
                              adhesiveForceToleranceTypeId,
                              getValues('adhesiveForce'),
                              'adhesiveForceTolerance',
                              clearErrors
                            )
                          }
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            {/* SECTION 3 */}
            <Box mt={4}>
              <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
                <Typography
                  sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
                >
                  {t('productApplication')}
                </Typography>
              </Box>
              <Grid spacing={1}>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('bondingEnvironment')}</InputLabel>
                    <AutocompleteMultiple
                      name="bondingEnvironment"
                      control={control}
                      errors={errors}
                      options={getAllBondingEnv}
                      getOptionLabel={(option) => option.name}
                      noOptionsText={t('noResult')}
                      placeholder={t('enterOrSelect')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('surfaceMaterial')}</InputLabel>
                    <AutocompleteMultiple
                      name="surfaceMaterial"
                      control={control}
                      errors={errors}
                      options={getAllSurfaceMaterial}
                      getOptionLabel={(option) => option.name}
                      noOptionsText={t('noResult')}
                      placeholder={t('enterOrSelect')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('printingMachine')}</InputLabel>
                    <AutocompleteMultiple
                      name="printingMachine"
                      control={control}
                      errors={errors}
                      options={getAllPrinter}
                      getOptionLabel={(option) => option.name}
                      noOptionsText={t('noResult')}
                      placeholder={t('enterOrSelect')}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('suitableTemperature')}</InputLabel>
                    <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
                        <InputFieldForm
                          name="temperatureFrom"
                          control={control}
                          errors={errors}
                          placeholder={t('enterDegreeValue')}
                          sx={{ width: '75%' }}
                        />
                        <Typography
                          sx={{ marginLeft: '0.8rem', fontSize: '12px', fontWeight: '400', color: colors.greyColor }}
                        >
                          {t('to')}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%' }}>
                        <InputFieldForm
                          name="temperatureTo"
                          control={control}
                          errors={errors}
                          placeholder={t('enterDegreeValue')}
                          sx={{ width: '75%' }}
                        />
                        <Typography sx={{ fontSize: '12px', fontWeight: '400', color: colors.greyColor }}>
                          {t('degreesC')}
                        </Typography>
                      </Box>
                    </Box>
                    {suitableTemperatureError && (
                      <Typography color="error" sx={{ fontSize: '0.75rem' }}>
                        {suitableTemperatureError}
                      </Typography>
                    )}
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('notSuitable')}</InputLabel>
                    <AutocompleteMultiple
                      name="notSuitable"
                      control={control}
                      errors={errors}
                      options={getAllNotSuitableFor}
                      getOptionLabel={(option) => option.name}
                      noOptionsText={t('noResult')}
                      placeholder={t('enterOrSelect')}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('expirationDate')}</InputLabel>
                    <InputFieldForm
                      name="expirationDate"
                      control={control}
                      errors={errors}
                      placeholder={t('enterYear')}
                    />
                  </Grid>
                </Grid>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('advantages')}</InputLabel>
                    <InputFieldForm name="advantages" control={control} errors={errors} placeholder={t('enter')} />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">{t('disadvantages')}</InputLabel>
                    <InputFieldForm name="disadvantages" control={control} errors={errors} placeholder={t('enter')} />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            {/* SECTION 4 */}
            <Box mt={4}>
              <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
                <Typography
                  sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
                >
                  {t('inventoryLimitProduct')}
                </Typography>
              </Box>
              <Grid spacing={1}>
                <Grid item container xs={12} spacing={2}>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">
                      {t('minimumInventory')} (m<sup>2</sup>)
                      <span style={{ fontWeight: '500', fontSize: '14px', color: colors.greyColor }}>
                        ({t('orderAlert')})
                      </span>
                    </InputLabel>
                    <InputFieldForm name="minInventory" control={control} errors={errors} placeholder={t('enter')} enableFormat={true} />
                  </Grid>
                  <Grid item xs={4}>
                    <InputLabel className="inputLabel-product">
                      {t('maximumInventory')} (m<sup>2</sup>)
                    </InputLabel>
                    <InputFieldForm name="maxInventory" control={control} errors={errors} placeholder={t('enter')} enableFormat={true} />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            {/* SECTION 5 */}
            <Box mt={4}>
              <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
                <Typography
                  sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
                >
                  {t('relatedDocuments')}
                </Typography>
              </Box>
              <Grid spacing={1}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: '0.5rem' }}>
                  <Tooltip title={disabledMaxFile ? t('alertMaxTotalFile') : ''}>
                    <Button
                      disabled={disabledMaxFile}
                      className={`addButton ${disabledMaxFile ? 'disabled-cursor' : ''}`}
                      startIcon={<AddCircleOutlineIcon />}
                      onClick={handleClickFileUpload}
                    >
                      {t('upload')}
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="application/pdf"
                      style={{ display: 'none' }}
                      onChange={(e) => handleProcessFileUpload(e.target.files)}
                    />
                  </Tooltip>
                </Box>
                <Grid container>
                  <RelatedDocumentTable
                    titleTable={titleTableRelatedDocumentProduct}
                    data={selectedFiles}
                    loading={loading}
                    handleDelete={handleDelete}
                    allowDownload={isEditMode}
                    allowDelete={true}
                    progress={progress}
                  />
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

export default CreateOrUpdateProductPage
