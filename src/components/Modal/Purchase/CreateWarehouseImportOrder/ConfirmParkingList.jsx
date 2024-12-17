import { yupResolver } from '@hookform/resolvers/yup'
import { AddCircleOutline, EastRounded } from '@mui/icons-material'
import {
  Autocomplete,
  Box,
  Button,
  DialogActions,
  DialogContent,
  IconButton,
  TextField,
  Tooltip,
  Typography
} from '@mui/material'
import {
  areaCalculation,
  formatDecimalNumber,
  formatInputValue,
  formatNumber,
  parsePricePerSquareMeter
} from 'common/common'
import BasicTable from 'components/BasicTable'
import colors from 'constants/colors'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import * as yup from 'yup'
import {
  createWarehouseImportOrder,
  getAllProductManagementByPurchaseOrderId,
  getEditWarehouseImportOrderAction,
  getListProductManagementByPurchaseOrderId,
  getListPurchaseOrderAction,
  getListPurchaseOrderCodeOrdered,
  updateWarehouseImportOrder
} from '../../../../redux/purchase/purchase.action'
import {
  editDataWarehouseImportOrderState,
  listAllProductManagementByPurchaseOrderIdState,
  listProductManagementByPurchaseOrderIdState
} from '../../../../redux/purchase/purchase.selectors'
import { useStyles } from './styles'
import { toast } from 'react-toastify'
import PolygonIcon from 'asset/icon/Polygon.svg'
import regex from "../../../../constants/regex";

const ConfirmParkingList = (props) => {
  const { onClose, dataSelects, onBack, isEdit, importOrder } = props
  const { t } = useTranslation()
  const classes = useStyles()
  const dispatch = useDispatch()

  const dataProductManagementByPurchaseOrderIds = useSelector(listProductManagementByPurchaseOrderIdState)
  const dataProductManagementByPurchaseOrderIdsForSelect = useSelector(listAllProductManagementByPurchaseOrderIdState)
  const dataEditWarehouseImportOrder = useSelector(editDataWarehouseImportOrderState)

  useEffect(() => {
    dispatch(getListPurchaseOrderCodeOrdered())
  }, [])

  const listUnits = useMemo(
    () => [
      { id: 1, label: t('paper') },
      { id: 2, label: t('roll') }
    ],
    [t]
  )

  const headers = useMemo(
    () => [
      {
        key: 'codeLH',
        label: t('codeLH'),
        fontWeight: 500
      },
      {
        key: 'productCategories',
        label: t('productCategories'),
        fontWeight: 500
      },
      {
        key: 'description',
        label: t('description'),
        fontWeight: 500
      },
      {
        key: 'width',
        label: (
          <>
            {t('width') + ' (cm)'} <span className="required">*</span>
          </>
        ),
        fontWeight: 500
      },
      {
        key: 'length',
        label: (
          <>
            {t('length') + ' (m)'} <span className="required">*</span>
          </>
        ),
        fontWeight: 500
      },
      {
        key: 'quantity',
        label: (
          <>
            {t('SL')} <span className="required">*</span>
          </>
        ),
        fontWeight: 500
      },
      {
        key: 'unit',
        label: t('unit'),
        fontWeight: 500,
        w: '8%'
      },
      {
        key: 'm2',
        label: (
          <>
            {t('M')}
            <sup>2</sup>
          </>
        ),
        fontWeight: 500
      },
      {
        key: 'price_m2',
        label: (
          <>
            {t('priceOfSquareMeter')} / {t('M')}
            <sup>2</sup>
          </>
        ),
        fontWeight: 500
      },
      {
        key: 'actions',
        label: t('actions'),
        fontWeight: 500
      }
    ],
    [t]
  )

  const validationSchema = yup.object().shape({
    items: yup
      .array()
      .of(
        yup.object().shape({
          width: yup
            .number()
            .min(1, t('enterNumberGreaterThanZero'))
            .max(1e9, t('pleaseEnterNoMoreThanOneBillion'))
            .required(t('pleaseEnterWidth'))
            .test('compare-width-with-length', t('compareWidthWithLength'),function (value) {
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
          length: yup
            .number()
            .min(1, t('enterNumberGreaterThanZero'))
            .max(1e9, t('pleaseEnterNoMoreThanOneBillion'))
            .required(t('pleaseEnterLength'))
            .transform((value, originalValue) => {
              if (regex.validationForNumericLikeStrings.test(originalValue)) {
                return Number(originalValue.replace(/\./g, '').replace(',', '.'));
              }
            }),
          quantity: yup
            .number()
            .min(1, t('enterNumberGreaterThanZero'))
            .max(1e9, t('pleaseEnterNoMoreThanOneBillion'))
            .required(t('pleaseEnterQuantity'))
            .typeError(t('pleaseFillTrueNumberFormat'))
            .transform((value, originalValue) => (originalValue === '' ? undefined : value))
            .transform((value) => (isNaN(value) ? undefined : value)),
          codeLH: yup.string().required(t('pleaseSelectCodeLH')),
          product_category: yup.string().nullable(),
          description: yup.string().nullable(),
          m2: yup.number().nullable(),
          price_m2: yup
            .string()
            .max(13, t('enterNumberLessThan13Digits'))
            .transform((value, originalValue) => (originalValue === '' ? undefined : value))
            .required(t('pleaseEnterPriceOverSquareMeter'))
            .test('is-greater-than-zero', t('enterNumberGreaterThanZero'), (value) => {
              const numberValue = parseFloat(value.replace(/\./g, '').replace(/,/g, '.'))
              return numberValue > 0
            }),
          unit: yup.number().nullable()
        })
      )
      .min(1, t('pleaseAddAtLeastOneOrder'))
  })

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
    setError
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'all',
    defaultValues: {}
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items'
  })

  useEffect(() => {
    dispatch(
      getListProductManagementByPurchaseOrderId({
        purchaseOrderId: dataSelects.purchaseOrderId || 0
      })
    )
  }, [dataSelects.purchaseOrderId, dispatch])

  useEffect(() => {
    dispatch(
      getAllProductManagementByPurchaseOrderId({
        purchaseOrderId: dataSelects.purchaseOrderId || 0
      })
    )
  }, [dataSelects.purchaseOrderId, dispatch])

  useEffect(() => {
    dispatch(getEditWarehouseImportOrderAction(importOrder.id))
  }, [importOrder.id, dispatch])

  const allItems = watch('items')

  const onSubmit = (data) => {
    const formatDataTable = data.items.map((item) => ({
      product_management_id: item.codeLH,
      length: item.length,
      width: item.width,
      quantity: item.quantity,
      price_m2: parsePricePerSquareMeter(item.price_m2)
    }))

    if (isEdit) {
      const dataUpdate = {
        id: importOrder.id,
        purchaseOrderId: dataSelects.purchaseOrderId,
        receivingLocationId: dataSelects.warehouseLocation,
        importDate: dataSelects.date,
        importTime: dataSelects.time,
        productWarehouseWarehouseImportOrder: formatDataTable
      }
      dispatch(updateWarehouseImportOrder(dataUpdate))
        .then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            handleClose()
            reset()
          }
        })
        .catch((e) => {
          toast.error(e)
        })
    } else {
      const dataCreate = {
        purchaseOrderId: dataSelects.purchaseOrderId,
        receivingLocationId: dataSelects.warehouseLocation,
        importDate: dataSelects.date,
        importTime: dataSelects.time,
        productWarehouseWarehouseImportOrder: formatDataTable
      }

      dispatch(createWarehouseImportOrder(dataCreate))
        .then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            dispatch(getListPurchaseOrderAction())
            handleClose()
            reset()
          }
        })
        .catch((e) => {
          toast.error(e)
        })
    }
  }

  const handleClose = () => {
    onClose()
    reset()
  }

  const handleChangeStateDialog = () => {
    onBack()
    reset()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleRemoveRow = (id) => {
    remove(id)
  }

  const handleAddRow = () => {
    if (dataProductManagementByPurchaseOrderIds.length === 1) {
      append({
        width: formatNumber(dataProductManagementByPurchaseOrderIds[0].width),
        length: formatNumber(dataProductManagementByPurchaseOrderIds[0].length),
        quantity: formatNumber(dataProductManagementByPurchaseOrderIds[0].quantity),
        codeLH: dataProductManagementByPurchaseOrderIds[0].product_management.id,
        product_category: dataProductManagementByPurchaseOrderIds[0].product_management.product_category,
        description: dataProductManagementByPurchaseOrderIds[0].product_management.description,
        m2: dataProductManagementByPurchaseOrderIds[0].m2,
        unit: 2,
        price_m2: formatNumber(dataProductManagementByPurchaseOrderIds[0].price_m2)
      })
    } else {
      append({
        width: 0,
        length: 0,
        quantity: 0,
        codeLH: '',
        product_category: '',
        description: '',
        m2: 0,
        unit: 2,
        price_m2: ''
      })
    }
    setError('items', {})
  }

  const controlledFields = useMemo(() => {
    return fields.map((field, index) => {
      return {
        ...field,
        ...allItems[index]
      }
    })
  }, [allItems, fields])

  useEffect(() => {
    let oldDataOrder = []
    if (isEdit) {
      if (dataEditWarehouseImportOrder) {
        const dataImportOrders = dataEditWarehouseImportOrder['product_warehouse_warehouse_import_order']

        if (dataImportOrders) {
          oldDataOrder = Object.entries(dataImportOrders)?.map((data, key) => {
            return {
              width: formatNumber(data[1].width ?? 0),
              length: formatNumber(data[1].length ?? 0),
              quantity: formatNumber(data[1].quantity ?? 0),
              codeLH: data[1].product_management_id ?? '',
              product_category: data[1].product_category ?? '',
              product_management_id: data[1].product_management_id ?? '',
              description: data[1].description ?? '',
              m2: data[1].m2 ?? 0,
              unit: 2,
              price_m2: formatNumber(data[1].price_m2 ?? 0)
            }
          })
        }
      }
    } else {
      oldDataOrder = dataProductManagementByPurchaseOrderIds.map((data) => ({
        width: formatNumber(data.width ?? 0),
        length: formatNumber(data.length ?? 0),
        quantity: formatNumber(data.quantity ?? 0),
        codeLH: data.product_management.id ?? '',
        product_category: data.product_management.product_category ?? '',
        product_management_id: data.product_management.id ?? '',
        description: data.product_management.description ?? '',
        m2: data.m2 ?? 0,
        unit: 2,
        price_m2: formatNumber(data.price_m2 ?? 0)
      }))
    }

    reset({ items: oldDataOrder })
  }, [dataEditWarehouseImportOrder, dataProductManagementByPurchaseOrderIds, isEdit, reset])

  const lengths = watch(controlledFields.map((_, index) => `items.${index}.length`))
  const widths = watch(controlledFields.map((_, index) => `items.${index}.width`))
  const quantities = watch(controlledFields.map((_, index) => `items.${index}.quantity`))

  useEffect(() => {
    controlledFields.forEach((_, index) => {
      const length = parsePricePerSquareMeter(lengths[index] || 0)
      const width = parsePricePerSquareMeter(widths[index] || 0)
      const quantity = parsePricePerSquareMeter(quantities[index] || 0)

      if (length && width && quantity) {
        setValue(`items.${index}.m2`, areaCalculation(length, width, quantity));
      } else {
        setValue(`items.${index}.m2`, 0);
      }
    })
  }, [lengths, widths, quantities, setValue])

  const handleChangeCodeLH = useCallback(
    (index, id) => {
      const selectedItem = dataProductManagementByPurchaseOrderIdsForSelect.find((codeLH) => codeLH.id === id)
      if (selectedItem) {
        setValue(`items.${index}.codeLH`, selectedItem.product_management.id)
        setValue(`items.${index}.product_category`, selectedItem.product_management.product_category ?? '')
        setValue(`items.${index}.description`, selectedItem.product_management.description ?? '')
        setValue(`items.${index}.width`, formatNumber(selectedItem.width ?? ''))
        setValue(`items.${index}.length`, formatNumber(selectedItem.length ?? ''))
        setValue(`items.${index}.price_m2`, formatNumber(selectedItem.price_m2) ?? '')
      } else {
        setValue(`items.${index}.codeLH`, '')
        setValue(`items.${index}.product_category`, '')
        setValue(`items.${index}.description`, '')
        setValue(`items.${index}.width`, 0)
        setValue(`items.${index}.length`, 0)
        setValue(`items.${index}.m2`, 0)
        setValue(`items.${index}.price_m2`, '')
      }
      const updatedItems = watch('items')
      reset({ items: updatedItems })
    },
    [dataProductManagementByPurchaseOrderIdsForSelect, setValue, reset, watch]
  )

  const handleUnitChange = useCallback(
    (index, unit) => {
      setValue(`items.${index}.unit`, unit)
    },
    [setValue]
  )

  const rows = useMemo(() => {
    return controlledFields.map((row, index) => {
      return {
        codeLH: {
          label: (
            <>
              <Controller
                name={`items.${index}.codeLH`}
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    value={
                      dataProductManagementByPurchaseOrderIdsForSelect.find(
                        (option) => option.product_management.id === row.codeLH
                      ) || null
                    }
                    popupIcon={<PolygonIcon />}
                    options={dataProductManagementByPurchaseOrderIdsForSelect}
                    getOptionLabel={(option) => option?.product_management.code}
                    noOptionsText={t('noResult')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder={t('select')}
                        error={!!errors?.items ? !!errors?.items[index]?.codeLH : false}
                        helperText={errors?.items ? errors?.items[index]?.codeLH?.message : ''}
                        className={classes.textFieldAutocomplete}
                      />
                    )}
                    onChange={(_, selectedOption) => {
                      if (selectedOption) {
                        handleChangeCodeLH(index, selectedOption.id)
                      } else {
                        handleChangeCodeLH(index, null)
                      }
                    }}
                  />
                )}
              />
            </>
          )
        },
        productCategories: {
          label: (
            <>
              <Tooltip title={row.product_category}>
                <span>
                  <Controller
                    name={`items.${index}.product_category`}
                    control={control}
                    defaultValue={watch(`items.${index}.product_category`)}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder={t('productCategories')}
                        disabled
                        variant="outlined"
                        size="small"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                      />
                    )}
                  />
                </span>
              </Tooltip>
            </>
          )
        },
        description: {
          label: (
            <>
              <Tooltip title={row.description}>
                <span>
                  <Controller
                    name={`items.${index}.description`}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        placeholder={t('description')}
                        disabled
                        variant="outlined"
                        size="small"
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                      />
                    )}
                  />
                </span>
              </Tooltip>
            </>
          )
        },
        width: {
          label: (
            <>
              <Controller
                name={`items.${index}.width`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors?.items ? !!errors?.items[index]?.width : false}
                    helperText={errors?.items ? errors?.items[index]?.width?.message : ''}
                    value={field.value ? formatDecimalNumber(field.value) : ''}
                    placeholder={t('width')}
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      let value = e.target.value
                      value = formatInputValue(value)
                      field.onChange(value)
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                  />
                )}
              />
            </>
          ),
          align: 'right'
        },
        length: {
          label: (
            <>
              <Controller
                name={`items.${index}.length`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors?.items ? !!errors?.items[index]?.length : false}
                    helperText={errors?.items ? errors?.items[index]?.length?.message : ''}
                    placeholder={t('length')}
                    value={field.value ? formatDecimalNumber(field.value) : ''}
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      let value = e.target.value
                      value = formatInputValue(value)
                      field.onChange(value)
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                  />
                )}
              />
            </>
          ),
          align: 'right'
        },
        quantity: {
          label: (
            <>
              <Controller
                name={`items.${index}.quantity`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors?.items ? !!errors?.items[index]?.quantity : false}
                    helperText={errors?.items ? errors?.items[index]?.quantity?.message : ''}
                    placeholder={t('SL')}
                    value={field.value ? formatNumber(field.value) : ''}
                    variant="outlined"
                    size="small"
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '');
                      field.onChange(value ? parseInt(value, 10) : '');
                    }}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                  />
                )}
              />
            </>
          )
        },
        unit: {
          label: (
            <>
              <Controller
                name={`items.${index}.unit`}
                control={control}
                render={({ field }) => (
                  <Autocomplete
                    {...field}
                    value={listUnits.find((option) => option.id === row.unit) || null}
                    popupIcon={<PolygonIcon />}
                    options={listUnits}
                    getOptionLabel={(option) => option.label}
                    getOptionDisabled={(option) => option.id === 1}
                    noOptionsText={t('noResult')}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder={t('select')}
                        className={classes.textFieldAutocomplete}
                      />
                    )}
                  />
                )}
              />
            </>
          )
        },
        m2: {
          label: (
            <>
              <Controller
                name={`items.${index}.m2`}
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      value={formatNumber(watch(`items.${index}.m2`) || 0)}
                      placeholder={t('SL')}
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  )
                }}
              />
            </>
          )
        },
        price_m2: {
          label: (
            <>
              <Controller
                name={`items.${index}.price_m2`}
                control={control}
                render={({ field }) => {
                  return (
                    <TextField
                      {...field}
                      error={!!errors?.items ? !!errors?.items[index]?.price_m2 : false}
                      helperText={errors?.items ? errors?.items[index]?.price_m2?.message : ''}
                      onChange={(e) => {
                        setValue(`items.${index}.price_m2`, formatNumber(parsePricePerSquareMeter(e.target.value)))
                      }}
                      placeholder={t('enter')}
                      variant="outlined"
                      size="small"
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  )
                }}
              />
            </>
          )
        },
        actions: {
          label: (
            <>
              <IconButton onClick={() => handleRemoveRow(index)}>
                <HiOutlineTrash style={{ color: colors.scarletredColor }} />
              </IconButton>
            </>
          )
        }
      }
    })
  }, [
    classes.textFieldAutocomplete,
    control,
    controlledFields,
    dataProductManagementByPurchaseOrderIdsForSelect,
    errors?.items,
    handleChangeCodeLH,
    handleRemoveRow,
    listUnits,
    setValue,
    t,
    watch
  ])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Typography variant="h5" className={classes.title} p={0}>
            {isEdit ? t('titleEditWarehouseImportOrder') : t('createWarehouseImportOrder')}
          </Typography>
          <Box mb={2}>
            <Box>
              <Box className={classes.wrapTitleCreate}>
                <Typography className={classes.textLabel}>{t('confirmParkingList')}</Typography>
                <Button
                  className={`modalButtonClick`}
                  startIcon={<AddCircleOutline fontSize="small" />}
                  onClick={handleAddRow}
                >
                  {t('addRow')}
                </Button>
              </Box>
              <Box>
                <BasicTable headers={headers} rows={rows} showIndex currentPage={1} totalPages={1} />
                {errors?.items?.root && (
                  <Typography className={classes.textError} color={'error'}>
                    {errors?.items?.root.message}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className={classes.wrapAction}>
          <Button className={classes.cancelBtn} autoFocus onClick={handleChangeStateDialog}>
            {t('back')}
          </Button>
          <Button className={`modalButtonClick`} endIcon={<EastRounded />} type="submit" autoFocus>
            {isEdit ? t('editWarehouseImportOrder') : t('createWarehouseImportOrder')}
          </Button>
        </DialogActions>
      </form>
    </>
  )
}
export default ConfirmParkingList
