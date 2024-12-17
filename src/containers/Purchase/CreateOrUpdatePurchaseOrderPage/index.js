/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import { yupResolver } from '@hookform/resolvers/yup'
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { default as AddCircleOutline, default as AddCircleOutlineIcon } from '@mui/icons-material/AddCircleOutline'
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle"
import { Box, Button, InputLabel, Typography } from '@mui/material'
import Autocomplete from "@mui/material/Autocomplete"
import Grid from '@mui/material/Grid'
import TextField from "@mui/material/TextField"
import Tooltip from '@mui/material/Tooltip'
import HeaderPage from 'components/HeaderPage'
import dayjs from "dayjs"
import { useCallback, useEffect, useRef, useState } from 'react'
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TbEdit } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import PolygonIcon from "../../../asset/icon/Polygon.svg"
import {
  formatDate,
  formatFileSize,
  formatNumber,
  parseFormattedNumber,
  parsePricePerSquareMeter,
  renderUploadMessage
} from '../../../common/common'
import AutocompleteForm from '../../../components/AutocompleteForm'
import DatePickerCalendar from "../../../components/DateTime/DatePickerCalendar"
import InputFieldForm from '../../../components/InputFieldForm'
import RelatedDocumentTable from '../../../components/Table/ProductManagement/RelatedDocumentTable'
import colors from '../../../constants/colors'
import commons from '../../../constants/common'
import regex from "../../../constants/regex"
import titleTableRelatedDocumentProduct from '../../../constants/titleTableRelatedDocumentProduct'
import { listAllFinishedProductFormState } from "../../../redux/app/app.selectors"
import { getAllSupplierAction } from '../../../redux/product/product.actions'
import { listAllSupplierState } from '../../../redux/product/product.selectors'
import {
  createPurchaseOrdersAction,
  getAllProductBySupplierAction,
  getAllProductWithTrashedAction,
  getAllPurchaseOrderStatusCreateAction,
  getAllPurchaseOrderStatusUpdateAction,
  getDetailPurchaseOrderForUpdateAction,
  getDetailSupplierNoPermissionAction,
  getListSupplierTaxesBySupplierIdAction,
  getProductInfoByCodeAndSupplierIdAction,
  getProductInfoByCodeAndSupplierIdForQuickOrderAction,
  removeMessageErrorPurchaseModuleAction,
  updatePurchaseOrdersAction
} from "../../../redux/purchase/purchase.action"
import {
  createPurchaseOrderSuccessFlagState,
  detailPurchaseOrderForUpdateState,
  detailSupplierByIdState,
  getAllProductWithTrashedState,
  getListSupplierTaxesBySupplierIdState,
  listAllProductBySupplierState,
  listAllStatusCreateState,
  listAllStatusUpdateState,
  listProductInfomationForQuickOrderState,
  listProductInfoState,
  purchaseOrderDataState,
  updatePurchaseOrderSuccessFlagState
} from "../../../redux/purchase/purchase.selectors"
import { s3 } from "../../../utils"

const CreateOrUpdatePurchaseOrderPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const purchaseOrderId = queryParams.get('id')
  const paramProductId = queryParams.get('product_id')
  const paramSupplierId = queryParams.get('supplier_id')
  const isCreateMode = location.pathname.includes('/create')
  const isEditMode = location.pathname.includes('/edit')
  const isQuickCreateMode = location.pathname.includes('/quick-create')
  const [loading, setLoading] = useState(false)

  const listAllSupplier = useSelector(listAllSupplierState)
  const listProductInfo = useSelector(listProductInfoState)
  const listSupplierTaxesBySupplierId = useSelector(getListSupplierTaxesBySupplierIdState)
  const listProductInfomationForQuickOrder = useSelector(listProductInfomationForQuickOrderState)
  const listAllStatusCreate = useSelector(listAllStatusCreateState)
  const listAllStatusUpdate = useSelector(listAllStatusUpdateState)
  const listAllProductBySupplier = useSelector(listAllProductBySupplierState)
  const purchaseOrderData = useSelector(purchaseOrderDataState)
  const supplierDetail = useSelector(detailSupplierByIdState)
  const getAllProductWithTrashed = useSelector(getAllProductWithTrashedState)
  const finishedProductFormData = useSelector(listAllFinishedProductFormState)
  const createPurchaseOrderSuccess = useSelector(createPurchaseOrderSuccessFlagState)
  const updatePurchaseOrderSuccess = useSelector(updatePurchaseOrderSuccessFlagState)
  const detailPurchaseOrder = useSelector(detailPurchaseOrderForUpdateState)
  const [selectedDate, setSelectedDate] = useState(null)
  const fileInputRef = useRef(null)
  const [selectedFiles, setSelectedFiles] = useState([])
  const [progress, setTotalProgress] = useState(0)
  const disabledMaxFile = selectedFiles.length >= commons.NUMBER_TEN
  const [supplierId, setSupplierId] = useState(null)
  const [reload, setReload] = useState(false)
  const prevListProductInfoRef = useRef();

  const schema = yup.object().shape({
    statusId: yup.string().required(t('statusRequired')).trim(),
    supplierId: yup.string().required(t('supplierRequired')).trim(),
    supplierTax: yup.string().required(t('pleaseChooseNameOfTaxType')).trim(),
    deliveryDate: yup
      .date()
      .required(t('pleaseSelectDeliveryDate'))
      .typeError(t('pleaseFillTrueFormat'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    productList: yup.array()
      .of(
        yup.object().shape({
          productId: yup.string().required(t('LHCodeRequired')).trim(),
          length: yup
            .number()
            .positive(t('enterNumberGreaterThanZero'))
            .required(t('pleaseEnterLength'))
            .max(1e9, t('pleaseEnterNoMoreThanOneBillion'))
            .transform((value, originalValue) => {
              if (regex.validationForNumericLikeStrings.test(originalValue)) {
                return Number(originalValue.replace(/\./g, '').replace(',', '.'));
              }
            }),
          width: yup
            .number()
            .positive(t('enterNumberGreaterThanZero'))
            .required(t('pleaseEnterWidth'))
            .max(1e9, t('pleaseEnterNoMoreThanOneBillion'))
            .test('compare-width-with-length', t('compareWidthWithLength'), function (value) {
              const { length } = this.parent;

              if (value !== undefined && length !== undefined) {
                const heightInMeters = value / 100;
                return heightInMeters <= length;
              }
              return true;
            })
            .transform((value, originalValue) => {
              if (regex.validationForNumericLikeStrings.test(originalValue)) {
                return Number(originalValue.replace(/\./g, '').replace(',', '.'));
              }
            }),
          quantity: yup
            .number()
            .positive(t('enterNumberGreaterThanZero'))
            .required(t('pleaseEnterQuantity'))
            .max(1e9, t('pleaseEnterNoMoreThanOneBillion'))
            .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
          pricePerSquareMeter: yup
            .string()
            .max(13, t('enterNumberLessThan13Digits'))
            .transform((value, originalValue) => (originalValue === '' ? undefined : value))
            .required(t('pleaseEnterPriceOverSquareMeter'))
            .test('is-greater-than-zero', t('enterNumberGreaterThanZero'), value => {
              const numberValue = parseFloat(value.replace(/\./g, '').replace(/,/g, '.'));
              return numberValue > 0;
            })
        })
      )
  });

  const {
    control,
    handleSubmit,
    setValue,
    setError,
    watch,
    clearErrors,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      pdfs: [],
      statusId: '',
      supplierId: '',
      // supplierTax: '',
      orderNote: '',
      deliveryDate: '',
      productList: [
        {
          id: '',
          productId: '',
          productCodeLH: '',
          supplierProductCode: '',
          typeOfGoods: '',
          describe: '',
          length: '',
          width: '',
          quantity: '',
          unit: '',
          squareMeter: '',
          pricePerSquareMeter: ''
        }
      ]
    }
  })

  const { fields: productList, append, update, remove } = useFieldArray({
    control,
    name: 'productList'
  });

  const statusID = useWatch({ control, name: 'statusId' })
  const productId = useWatch({ control, name: productList.map((_, index) => `productList[${index}].productId`) });
  const lengths = useWatch({ control, name: productList.map((_, index) => `productList[${index}].length`) });
  const widths = useWatch({ control, name: productList.map((_, index) => `productList[${index}].width`) });
  const quantities = useWatch({ control, name: productList.map((_, index) => `productList[${index}].quantity`) });
  const previousProductId = useRef(productId);

  useEffect(() => {
    dispatch(getAllSupplierAction())
    dispatch(getAllProductWithTrashedAction())
    if (!isEditMode) {
      dispatch(getAllPurchaseOrderStatusCreateAction())
    }
    if (purchaseOrderId) {
      dispatch(getDetailPurchaseOrderForUpdateAction(purchaseOrderId))
      if (isEditMode) {
        dispatch(getAllPurchaseOrderStatusUpdateAction(purchaseOrderId))
      }
    }
  }, [purchaseOrderId, isEditMode])

  useEffect(() => {
    if (isQuickCreateMode) {
      dispatch(getProductInfoByCodeAndSupplierIdForQuickOrderAction({
        supplier_id: paramSupplierId,
        product_management_id: paramProductId
      }))
    }
  }, [isQuickCreateMode])

  useEffect(() => {
    if (isQuickCreateMode) {
      const currentProductInfo = prevListProductInfoRef.current ?? listProductInfomationForQuickOrder;

      if (listAllStatusCreate.length > 0) {
        setValue('statusId', listAllStatusCreate[0].id)
      }
      setValue('supplierId', listProductInfomationForQuickOrder.supplier?.id)
      setSupplierId(listProductInfomationForQuickOrder.supplier?.id ?? null)

      const products = [listProductInfomationForQuickOrder]
      const mappedProductList = products.map((item) => ({
        productId: item.id ?? '',
        productCodeLH: item.code ?? '',
        supplierProductCode: item?.supplier_code ?? '',
        typeOfGoods: item?.supplier?.supplier_type?.id === 1 ? item.vn_product_category?.name : item.en_product_category?.name ?? '',
        describe: item.description ?? '',
        length: formatNumber(item.specifications?.[0]?.length) ?? '',
        width: formatNumber(item.specifications?.[0]?.height) ?? '',
        quantity: formatNumber(item.quantity) ?? '',
        squareMeter: formatNumber(item.m2) ?? '',
        unit: finishedProductFormData[0]?.id ?? '',
        pricePerSquareMeter: formatNumber(item.price_m2) ?? '',
      }));

      setValue('productList', mappedProductList)
      prevListProductInfoRef.current = currentProductInfo;
    }
  }, [isQuickCreateMode, listAllStatusCreate, finishedProductFormData, listProductInfomationForQuickOrder, setSupplierId, setValue])

  const removeMessageError = useCallback(() => {
    dispatch(removeMessageErrorPurchaseModuleAction())
  }, [dispatch])

  useEffect(() => {
    if (createPurchaseOrderSuccess || updatePurchaseOrderSuccess) {
      removeMessageError()
      setError()
      if ((isCreateMode || isQuickCreateMode) && purchaseOrderData) {
        navigate(`/purchase/detail-purchase-view?id=${purchaseOrderData.data.id}`)
      } else if (isEditMode && purchaseOrderId) {
        navigate(`/purchase/detail-purchase-view?id=${purchaseOrderId}`)
      }
    }
  }, [
    createPurchaseOrderSuccess,
    updatePurchaseOrderSuccess,
    navigate,
    purchaseOrderId,
    purchaseOrderData,
    setError,
    removeMessageError
  ])

  useEffect(() => {
    if (isCreateMode) {
      if (listAllStatusCreate.length > 0) {
        setValue('statusId', listAllStatusCreate[0].id)
      }
    }
  }, [isCreateMode, listAllStatusCreate, setValue])

  useEffect(() => {
    if (JSON.stringify(previousProductId.current) !== JSON.stringify(productId)) {
      productId.forEach((id, index) => {
        if (id === '') {
          setValue(`productList[${index}].productId`, '')
          setValue(`productList[${index}].supplierProductCode`, '')
          setValue(`productList[${index}].typeOfGoods`, '')
          setValue(`productList[${index}].describe`, '')
          setValue(`productList[${index}].length`, '')
          setValue(`productList[${index}].width`, '')
          setValue(`productList[${index}].quantity`, '')
          setValue(`productList[${index}].unit`, '')
          setValue(`productList[${index}].squareMeter`, '')
          setValue(`productList[${index}].pricePerSquareMeter`, '')
        }
      })
      previousProductId.current = productId
    }
  }, [productId, setValue])

  useEffect(() => {
    if (supplierId) {
      if (reload) {
        const initialProductList = [{
          productId: '',
          supplierProductCode: '',
          typeOfGoods: '',
          describe: '',
          length: '',
          width: '',
          quantity: '',
          unit: '',
          squareMeter: '',
          pricePerSquareMeter: ''
        }];
        setValue('productList', initialProductList);
      }
      dispatch(getAllProductBySupplierAction({ supplier_id: supplierId }))
      dispatch(getDetailSupplierNoPermissionAction(supplierId))
      dispatch(getListSupplierTaxesBySupplierIdAction(supplierId))
    }
  }, [supplierId, dispatch])

  useEffect(() => {
    if (isEditMode && detailPurchaseOrder) {
      setValue('statusId', detailPurchaseOrder.status?.id)
      setValue('supplierId', detailPurchaseOrder.supplier?.id)
      setValue('supplierTax', detailPurchaseOrder.supplier_tax?.id)
      setValue('deliveryDate', dayjs(detailPurchaseOrder.delivery_date, 'DD-MM-YYYY'))
      setValue('orderNote', detailPurchaseOrder.note)

      const products = Array.isArray(detailPurchaseOrder.purchase_order_product)
        ? detailPurchaseOrder.purchase_order_product
        : []
      const mappedProductList = products.map((product) => ({
        id: product.id,
        productId: product.product_management_id ?? '',
        productCodeLH: product.lh_code ?? '',
        supplierProductCode: product.supplier_code ?? '',
        typeOfGoods: product.product_category ?? '',
        describe: product.description ?? '',
        length: formatNumber(product.length) ?? '',
        width: formatNumber(product.width) ?? '',
        quantity: formatNumber(product.quantity) ?? '',
        squareMeter: formatNumber(product.m2) ?? '',
        unit: product.finished_product_form?.id ?? '',
        pricePerSquareMeter: formatNumber(product.price_m2) ?? '',
      }));

      setValue('productList', mappedProductList)
      setSupplierId(detailPurchaseOrder?.supplier?.id ?? null)

      if (detailPurchaseOrder.file_purchase_order?.length) {
        const formattedFiles = detailPurchaseOrder.file_purchase_order.map((file) => ({
          id: file.id,
          url: file.name,
          originalName: file.name.split('/').pop(),
          size: file.size,
          createdAt: file.created_at
        }))

        setSelectedFiles(formattedFiles)
      }
    }
  }, [isEditMode, detailPurchaseOrder])

  useEffect(() => {
    productList.forEach((product, index) => {
      const length = parsePricePerSquareMeter(lengths[index])
      const width = parsePricePerSquareMeter(widths[index])
      const quantity = parsePricePerSquareMeter(quantities[index])

      if (length && width && quantity) {
        const squareMeter = formatNumber(length * width * 0.01 * quantity)
        setValue(`productList[${index}].squareMeter`, squareMeter)
      } else {
        setValue(`productList[${index}].squareMeter`, '')
      }
    });
    if (selectedDate) {
      setValue('deliveryDate', selectedDate);
    }
  }, [productList, lengths, widths, quantities, selectedDate])

  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
    setSelectedDate(formattedDate)
  }
  const handleChangeSupplierId = (selectedSupplier) => {
    if (selectedSupplier) {
      setSupplierId(selectedSupplier.id)
      setReload(true)
    } else {
      setSupplierId(null)
      setReload(false)
    }
  }

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
    let oversizedFiles = []
    const currentFileCount = selectedFiles.length
    const newFileCount = files.length

    if (currentFileCount + newFileCount > commons.NUMBER_TEN) {
      toast.error(`${t('maxTotalFile')}`)
    }

    Array.from(files).forEach((file) => {
      // const fileExtension = file.name.split('.').pop().toLowerCase()
      if (file.size > commons.MAX_SIZE_FILE) {
        oversizedFiles.push(file)
      } else {
        validFiles.push(file)
      }
    })

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

  const handleAddProductList = () => {
    append({
      productId: '',
      supplierProductCode: '',
      typeOfGoods: '',
      describe: '',
      length: '',
      width: '',
      quantity: '',
      unit: '',
      squareMeter: '',
      pricePerSquareMeter: ''
    })
  }

  const handleRemoveProductList = (index) => {
    remove(index)
  }

  const handleProductCodeChange = useCallback((index, value) => {
    dispatch(getProductInfoByCodeAndSupplierIdAction({
      supplier_id: supplierId,
      product_management_id: value
    })).then(response => {
      if (response && response.payload) {
        const productInfo = response.payload;
        setValue(`productList[${index}].productId`, productInfo.id);
        setValue(`productList[${index}].productCodeLH`, productInfo.code);
        setValue(`productList[${index}].supplierProductCode`, productInfo.supplier_code);
        setValue(`productList[${index}].typeOfGoods`, productInfo?.supplier?.supplier_type?.id === 1 ? productInfo.vn_product_category?.name : productInfo.en_product_category?.name);
        setValue(`productList[${index}].describe`, productInfo.description);
        setValue(`productList[${index}].length`, formatNumber(productInfo.specifications?.[0]?.length));
        setValue(`productList[${index}].width`, formatNumber(productInfo.specifications?.[0]?.height));
        setValue(`productList[${index}].unit`, finishedProductFormData[0]?.id);
        setValue(`productList[${index}].pricePerSquareMeter`, formatNumber(productInfo.price_m2));
      }
    });
    clearErrors('productList');
  }, [dispatch, supplierId, setValue, finishedProductFormData]);


  const onSubmit = async (data) => {
    let fileDetails = []
    if (selectedFiles.length) {
      fileDetails = selectedFiles.map((file) => ({
        id: isEditMode ? file.id : null,
        name: file.originalName,
        size: file.size,
        created_at: file.createdAt
      }))
    }
    const mappedData = {
      purchase_order_status_id: data.statusId,
      supplier_id: data.supplierId,
      delivery_date: dayjs(data.deliveryDate).format('YYYY-MM-DD'),
      note: data.orderNote,
      supplier_tax_id: data.supplierTax,
      purchase_order_products: data.productList
        .map((product) => ({
          id: product.id,
          product_management_id: product.productId,
          lh_code: product.productCodeLH,
          supplier_code: product.supplierProductCode,
          product_category: product.typeOfGoods,
          description: product.describe,
          length: product.length,
          width: product.width,
          quantity: product.quantity,
          finished_product_form_id: product.unit,
          m2: parseFormattedNumber(product.squareMeter),
          price_m2: parsePricePerSquareMeter(product.pricePerSquareMeter),
        })),
      file_purchase_orders: fileDetails
    }

    try {
      setLoading(true)
      if (isCreateMode || isQuickCreateMode) {
        dispatch(createPurchaseOrdersAction(mappedData))
      } else if (isEditMode) {
        dispatch(updatePurchaseOrdersAction({ id: purchaseOrderId, ...mappedData }))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <HeaderPage
        title={(isCreateMode || isQuickCreateMode) ? t('createPurchaseOrder') : isEditMode ? t('editPurchaseOrder') : ''}
        actionButton={
          <>
            {(isCreateMode || isQuickCreateMode) && (
              <Button
                disabled={loading}
                className="buttonAction"
                sx={{ gap: '8px', color: colors.greenColor }}
                onClick={handleSubmit(onSubmit)}
              >
                <AddCircleOutline />
                {t('complete')}
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
                  {t('purchaseInformation')}
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={2}>
                  <InputLabel required className="requiredTextField inputLabel-product">
                    {t('status')}
                  </InputLabel>
                  <AutocompleteForm
                    name="statusId"
                    control={control}
                    errors={errors}
                    options={((isCreateMode || isQuickCreateMode) ? listAllStatusCreate : listAllStatusUpdate).map((option) => ({
                      ...option,
                      disabled: option.status === true
                    }))}
                    getOptionDisabled={(option) => option.disabled}
                    renderOption={(props, option) => (
                      <li {...props} style={{ opacity: option.disabled ? 0.5 : 1 }}>
                        {option.name}
                      </li>
                    )}
                    getOptionLabel={(option) => option.name}
                    noOptionsText={t('noResult')}
                    placeholder={t('select')}
                    readOnly={true}
                  />
                </Grid>
                <Grid item xs={2}>
                  <InputLabel required className="requiredTextField inputLabel-product">
                    {t('supplierFullText')}
                  </InputLabel>
                  <AutocompleteForm
                    name="supplierId"
                    control={control}
                    errors={errors}
                    options={listAllSupplier}
                    getOptionLabel={(option) => option.supplier_name}
                    noOptionsText={t('noResult')}
                    placeholder={t('selectSupplier')}
                    onChange={handleChangeSupplierId}
                    readOnly={true}
                    disableClearable={true}
                    disabled={statusID !== 1}
                  />
                </Grid>
                <Tooltip title={!supplierId ? t('pleaseChooseSupplierFirst') : ''}>
                  <Grid item xs={2}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('tax')}
                    </InputLabel>
                    <AutocompleteForm
                      name="supplierTax"
                      control={control}
                      errors={errors}
                      options={listSupplierTaxesBySupplierId}
                      getOptionLabel={(option) => option.tax_name}
                      noOptionsText={t('noResult')}
                      placeholder={t('nameOfTaxType')}
                      readOnly={true}
                      disableClearable={true}
                      disabled={!supplierId || statusID !== 1}
                    />
                  </Grid>
                </Tooltip>
                <Grid item xs={1.5}>
                  <InputLabel required className="requiredTextField inputLabel-product">
                    {t('deliveryDate')}
                  </InputLabel>
                  <Controller
                    name="deliveryDate"
                    control={control}
                    render={({ field }) =>
                      <DatePickerCalendar
                        {...field}
                        error={errors.deliveryDate}
                        minDate={dayjs().add(1, 'day')}
                        classes={'custom-input-search'}
                        isDisabled={statusID !== 1}
                      />}
                  />
                </Grid>
              </Grid>
            </Box>
            {/* SECTION 2 */}
            <Box mt={4}>
              <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
                <Typography
                  sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
                >
                  {t('productList')}
                </Typography>
              </Box>
              {productList.map((product, index) => (
                <Grid key={product.id} container spacing={1} alignItems="baseline">
                  <Grid item xs={1.5}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('productCodeLH')}
                    </InputLabel>
                    <Tooltip title={!supplierId ? t('pleaseChooseSupplierFirst') : ''}>
                      <span>
                        <Controller
                          name={`productList[${index}].productId`}
                          control={control}
                          render={({ field }) => (
                            <Autocomplete
                              {...field}
                              popupIcon={<PolygonIcon />}
                              options={listAllProductBySupplier}
                              getOptionLabel={(option) => option.code}
                              noOptionsText={t(supplierId ? t('noResult') : t('supplierRequired'))}
                              disabled={!supplierId || statusID !== 1}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  size="small"
                                  placeholder={t('select')}
                                  error={!!errors[`productList[${index}].productId`] && supplierId}
                                  helperText={supplierId && errors[`productList[${index}].productId`] ? errors[`productList[${index}].productId`].message : ''}
                                />
                              )}
                              classes={{ inputRoot: 'custom-input-search' }}
                              onChange={(event, newValue) => {
                                if (!newValue) {
                                  setValue(`productList[${index}].productId`, '');
                                } else {
                                  handleProductCodeChange(index, newValue.id);
                                }
                              }}
                              value={[
                                ...(getAllProductWithTrashed || []),
                                ...(listAllProductBySupplier || [])
                              ].find((option) => option.id === field.value) || null}
                            />
                          )}
                        />
                      </span>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={1.5}>
                    <InputLabel className="inputLabel-product">{t('productCodeSupplier')}</InputLabel>
                    <InputFieldForm
                      name={`productList[${index}].supplierProductCode`}
                      control={control}
                      errors={errors?.productList?.[index]?.supplierProductCode
                        ? { [`productList[${index}].supplierProductCode`]: errors.productList[index].supplierProductCode }
                        : {}}
                      disabled={true}
                      defaultValue={product.supplierProductCode}
                      showTooltip={true}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <InputLabel className="inputLabel-product">{t('typeOfGoods')}</InputLabel>
                    <InputFieldForm
                      name={`productList[${index}].typeOfGoods`}
                      control={control}
                      errors={errors?.productList?.[index]?.typeOfGoods
                        ? { [`productList[${index}].typeOfGoods`]: errors.productList[index].typeOfGoods }
                        : {}}
                      defaultValue={product.typeOfGoods}
                      disabled={true}
                      showTooltip={true}
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <InputLabel className="inputLabel-product">{t('description')}</InputLabel>
                    <InputFieldForm
                      name={`productList[${index}].describe`}
                      control={control}
                      errors={errors?.productList?.[index]?.describe
                        ? { [`productList[${index}].describe`]: errors.productList[index].describe }
                        : {}}
                      defaultValue={product.describe}
                      showTooltip={true}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={0.8}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {`${t('width')} (cm)`}
                    </InputLabel>
                    <Tooltip title={productId[index] === '' ? t('LHCodeRequired') : ''}>
                      <span>
                        <InputFieldForm
                          name={`productList[${index}].width`}
                          control={control}
                          disabled={productId[index] === '' || statusID !== 1}
                          errors={errors?.productList?.[index]?.width
                            ? { [`productList[${index}].width`]: errors.productList[index].width }
                            : {}}
                          placeholder={t('enter')}
                          defaultValue={productList[index].width}
                          enableFormat={true}
                        />
                      </span>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={0.8}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {`${t('length')} (m)`}
                    </InputLabel>
                    <Tooltip title={productId[index] === '' ? t('LHCodeRequired') : ''}>
                      <span>
                        <InputFieldForm
                          name={`productList[${index}].length`}
                          control={control}
                          disabled={productId[index] === '' || statusID !== 1}
                          errors={errors?.productList?.[index]?.length
                            ? { [`productList[${index}].length`]: errors.productList[index].length }
                            : {}}
                          placeholder={t('enter')}
                          defaultValue={productList[index].length}
                          enableFormat={true}
                        />
                      </span>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={0.8}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {t('quantity')}
                    </InputLabel>
                    <Tooltip title={productId[index] === '' ? t('LHCodeRequired') : ''}>
                      <span>
                        <InputFieldForm
                          name={`productList[${index}].quantity`}
                          control={control}
                          disabled={productId[index] === '' || statusID !== 1}
                          errors={errors?.productList?.[index]?.quantity
                            ? { [`productList[${index}].quantity`]: errors.productList[index].quantity }
                            : {}}
                          placeholder={t('enter')}
                          defaultValue={productList[index].quantity}
                          enableFormat={true}
                          allowOnlyInteger={true}
                        />
                      </span>
                    </Tooltip>
                  </Grid>
                  <Grid item xs={0.8}>
                    <InputLabel className="inputLabel-product">{t('unit')}</InputLabel>
                    <AutocompleteForm
                      name={`productList[${index}].unit`}
                      control={control}
                      errors={errors?.productList?.[index]?.unit
                        ? { [`productList[${index}].unit`]: errors.productList[index].unit }
                        : {}}
                      disabled={true}
                      displayPopupIcon={true}
                      options={finishedProductFormData}
                      getOptionLabel={(option) => option.finished_product_form_name}
                      noOptionsText={t('noResult')}
                    />
                  </Grid>
                  <Grid item xs={0.8}>
                    <InputLabel className="inputLabel-product">
                      {t('M')}
                      <sup>2</sup>
                    </InputLabel>
                    <InputFieldForm
                      name={`productList[${index}].squareMeter`}
                      control={control}
                      errors={errors}
                      disabled={true}
                      showTooltip={true}
                    />
                  </Grid>
                  <Grid item xs={1.2}>
                    <InputLabel required className="requiredTextField inputLabel-product">
                      {'Giá / m'}
                      <sup>2</sup>{' '}
                      {supplierId && supplierDetail && supplierDetail.currency_unit
                        ? `(${supplierDetail.currency_unit?.name})`
                        : ''}
                    </InputLabel>
                    <Tooltip title={productId[index] === '' ? t('LHCodeRequired') : ''}>
                      <span>
                        <InputFieldForm
                          name={`productList[${index}].pricePerSquareMeter`}
                          control={control}
                          disabled={productId[index] === '' || statusID !== 1}
                          errors={errors?.productList?.[index]?.pricePerSquareMeter
                            ? { [`productList[${index}].pricePerSquareMeter`]: errors.productList[index].pricePerSquareMeter }
                            : {}}
                          placeholder={t('enter')}
                          enableFormat={true}
                        />
                      </span>
                    </Tooltip>
                  </Grid>
                  {statusID === 1 && (
                    <Grid item xs={0.3} sx={{ m: 'auto' }}>
                      {index === productList.length - 1 && (
                        <AddCircleIcon fontSize="medium" onClick={() => handleAddProductList()} className="addIcon" />
                      )}
                      {productList.length > 1 && (
                        <RemoveCircleIcon
                          fontSize="medium"
                          onClick={() => handleRemoveProductList(index)}
                          className="removeIcon"
                        />
                      )}
                    </Grid>
                  )}
                </Grid>
              ))}
            </Box>
            {/* SECTION 3 */}
            <Box mt={4}>
              <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
                <Typography
                  sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
                >
                  {t('orderNotes')}
                </Typography>
              </Box>
              <Grid>
                <InputLabel className="inputLabel-product">{t('orderNotes')}</InputLabel>
                <InputFieldForm
                  name="orderNote"
                  control={control}
                  errors={errors}
                  placeholder="enterNotesForTheSupplierIfApplicable"
                  multiline={true}
                  rows={3}
                />
              </Grid>
            </Box>
            {/* SECTION 4 */}
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

export default CreateOrUpdatePurchaseOrderPage
