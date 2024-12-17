import { yupResolver } from "@hookform/resolvers/yup";
import { AddCircleOutline, LocalOffer } from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, Tooltip, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import FormHelperText from '@mui/material/FormHelperText';
import { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doReadNumber, ReadingConfig } from "read-vietnamese-number";
import * as yup from "yup";
import { areaCalculation, formatCurrency, formatNumber, normalizeLargeNumber, parsePricePerSquareMeter } from "../../../../common/common";
import AutocompleteForm from "../../../../components/AutocompleteForm";
import HeaderPage from "../../../../components/HeaderPage";
import InputFieldForm from "../../../../components/InputFieldForm";
import ChooseMaterialsModal from "../../../../components/Modal/Order/ChooseMaterials";
import PreviewOrder from "../../../../components/Modal/Order/Preview";
import CreateOrUpdateTable from "../../../../components/Table/OrderTable/CreateOrUpdate";
import colors from "../../../../constants/colors";
import tagColors from "../../../../constants/colorsTag";
import commons from "../../../../constants/common";
import { listAllFinishedProductFormState, listAllTagState } from "../../../../redux/app/app.selectors";
import {
  createOderAction,
  createOderPreviewAction,
  removeMessageErrorAction
} from "../../../../redux/customer/customer.actions";
import {
  createOderErrorMessageState,
  createOderPreviewSuccessFlagState,
  createOderSuccessFlagState,
  errorCreateOderPreviewErrorMessageState,
  listAllProductFormState
} from "../../../../redux/customer/customer.selectors";
import {
  getAllManufactureFormAction,
  getAllProductWarehouseByProductManagementIdAction,
  getAllProductWarehouseSuggestionAction,
  getListProductByCustomerId,
  removeMessageErrorAction as removeMessageErrorOrderAction
} from "../../../../redux/oder/oder.actions";
import {
  listAllManufactureFormState,
  listAllProductWarehouseSuggestionState,
  listProductWarehouseByProductManagementIdState,
  productByCustomerState
} from "../../../../redux/oder/oder.selectors";

const TooltipButtonWithHelperText = ({
  isFormComplete,
  tooltipText,
  buttonText,
  onClick,
  showHelperText,
  helperText,
}) => {
  return (
    <Tooltip
      title={!isFormComplete ? tooltipText : ''}
      arrow
      disableHoverListener={isFormComplete}
      sx={{ border: !isFormComplete ? '1px solid red' : 'none' }}
    >
      <span>
        <Button
          sx={{ mt: 1.2 }}
          className={`nextButtonGlobal ${!isFormComplete ? 'disabled-cursor' : ''}`}
          endIcon={<NavigateNextIcon style={{ fontSize: '16px', marginBottom: '2px' }} />}
          onClick={onClick}
          disabled={!isFormComplete}
        >
          {buttonText}
        </Button>
        {showHelperText && (
          <FormHelperText sx={{ width: '100px' }} error>
            {helperText}
          </FormHelperText>
        )}
      </span>
    </Tooltip>
  );
};

export default function CreateOrUpdateOrder() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const errorCreateOderPreviewErrorMessage = useSelector(errorCreateOderPreviewErrorMessageState)
  const errorsMessageCreateOder = useSelector(createOderErrorMessageState)
  const createOderPreviewSuccessFlag = useSelector(createOderPreviewSuccessFlagState)
  const schema = yup.object().shape({
    goodsName: yup.string().trim()
      .required(t('requiredField'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    type: yup.string().trim()
      .required(t('requiredField'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    productForm: yup.number(),
    finished_product_form_standard_id: yup.string().when('productForm', {
      is: 2,
      then: () => yup.string()
        .required(t('requiredField'))
        .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
      otherwise: () => yup.string().nullable()
    }),
    quantity: yup.number()
      .required(t('requiredField'))
      .max(1e9, t('pleaseEnterNoMoreThanOneBillion'))
      .transform((value, originalValue) => {
        if (originalValue === '') return undefined
        return Number(originalValue.replace(',', '.'))
      }),
    width: yup.number()
      .required(t('requiredField'))
      .max(1e9, t('pleaseEnterNoMoreThanOneBillion'))
      .transform((value, originalValue) => {
        if (originalValue === '') return undefined
        return Number(originalValue.replace(',', '.'))
      })
      .test('compare-width-with-length', function (value) {
        const { length, type } = this.parent;

        if (value !== undefined && length !== undefined) {
          const widthInMeters = value / 100;
          const isValid = widthInMeters <= length;

          if (!isValid) {
            if (type === 1 || type === '1') {
              return this.createError({ message: t('compareWidthWithLength') });
            } else {
              return this.createError({ message: t('compareHeightWithLength') });
            }
          }
          return true;
        }
        return true;
      }),
    length: yup.number()
      .required(t('requiredField'))
      .max(1e9, t('pleaseEnterNoMoreThanOneBillion'))
      .transform((value, originalValue) => {
        if (originalValue === '') return undefined
        return Number(originalValue.replace(',', '.'))
      }),
    unitPrice: yup.number()
      .required(t('requiredField'))
      .typeError(t('onlyNumber'))
      .positive(t('enterNumberGreaterThanZero'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    width_standard: yup.number().when('productForm', {
      is: 2,
      then: () => yup.number()
        .required(t('requiredField'))
        .max(1e9, t('pleaseEnterNoMoreThanOneBillion'))
        .transform((value, originalValue) => {
          if (originalValue === '') return undefined
          return Number(originalValue.replace(',', '.'))
        })
        .test('compare-widthStandard-with-lengthStandard', function (value) {
          const { length_standard, finishedProductFormStandard } = this.parent;

          if (value !== undefined && length_standard !== undefined) {
            const widthInMeters = value / 100;
            const isValid = widthInMeters <= length_standard;

            if (!isValid) {
              if (finishedProductFormStandard === 1 || finishedProductFormStandard === '1') {
                return this.createError({ message: t('compareWidthWithLength') });
              } else {
                return this.createError({ message: t('compareHeightWithLength') });
              }
            }
            return true;
          }
          return true;
        }),
      otherwise: () => yup.number().nullable()
        .transform((value, originalValue) => {
          if (originalValue === '') return undefined
          return Number(originalValue.replace(',', '.'))
        }),
    }),
    length_standard: yup.number().when('productForm', {
      is: 2,
      then: () => yup.number()
        .required(t('requiredField'))
        .max(1e9, t('pleaseEnterNoMoreThanOneBillion'))
        .transform((value, originalValue) => {
          if (originalValue === '') return undefined
          return Number(originalValue.replace(',', '.'))
        }),
      otherwise: () => yup.number().nullable()
        .transform((value, originalValue) => {
          if (originalValue === '') return undefined
          return Number(originalValue.replace(',', '.'))
        }),
    }),
    quantity_standard: yup.number().when('productForm', {
      is: 2,
      then: () => yup.number()
        .required(t('requiredField'))
        .max(1e9, t('pleaseEnterNoMoreThanOneBillion'))
        .transform((value, originalValue) => {
          if (originalValue === '') return undefined
          return Number(originalValue.replace(',', '.'))
        }),
      otherwise: () => yup.number().nullable()
        .transform((value, originalValue) => {
          if (originalValue === '') return undefined
          return Number(originalValue.replace(',', '.'))
        }),
    }),
    squareMeter: yup.string(),
    squareMeterStandard: yup.string(),
    explanationNotesForOrders: yup.string().trim(),
    internalNotes: yup.string().trim(),
    valueAddedServices: yup.string(),
    productCost: yup.string(),
    discount: yup.number()
      .nullable()
      .max(100, t('requiredInputBetween0And100'))
      .transform((value, originalValue) => {
        if (originalValue === '') return undefined
        return Number(originalValue.replace(',', '.'))
      }),
    shippingFee: yup.number()
      .typeError(t('onlyNumber'))
      .positive(t('enterNumberGreaterThanZero'))
      .integer(t('enterIntegerValue'))
      .max(commons.NUMBER_MAX_LENGTH, t('enterNumberLessThan13Digits'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    serviceAvailable: yup.number(),
    ratio: yup.number().when('serviceAvailable', {
      is: 1,
      then: () => yup.number()
        .required(t('requiredField'))
        .positive(t('enterNumberGreaterThanZero'))
        .max(100, t('requiredInputBetween0And100'))
        .transform((value, originalValue) => {
          if (typeof originalValue === 'string' && originalValue !== '') {
            return Number(originalValue.replace(',', '.'));
          }
          if (originalValue === '') {
            return undefined;
          }
          return value;
        }),
      otherwise: () => yup.number().nullable()
    }),
    total: yup.string(),
  })
  const [data, setData] = useState({});
  const tagData = useSelector(listAllTagState)
  const productData = useSelector(productByCustomerState)
  const finishedProductFormData = useSelector(listAllFinishedProductFormState)
  const productFormData = useSelector(listAllProductFormState)
  const [widthLabel, setWidthLabel] = useState(t('width'));
  const [widthLabelStandard, setWidthLabelStandard] = useState(t('width'));
  const [isOpenChooseMaterialsModal, setIsOpenChooseMaterialsModal] = useState(false);
  const listProductWarehouseByProductManagementId = useSelector(listProductWarehouseByProductManagementIdState);
  const listAllProductWarehouseSuggestion = useSelector(listAllProductWarehouseSuggestionState);
  const listAllManufactureForm = useSelector(listAllManufactureFormState);
  const [dataListProductWarehouseByProductManagementId, setDataListProductWarehouseByProductManagementId] = useState([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [isPreviewModalOpen, setPreviewModalOpen] = useState(false)
  const [previewData, setPreviewData] = useState({})
  const [goodNamePreview, setGoodNamePreview] = useState('')
  const [orderData, setOrderData] = useState(null);
  const createOderSuccessFlag = useSelector(createOderSuccessFlagState)
  const [showHelperText, setShowHelperText] = useState(false);
  const [errorsTable, setErrorTables] = useState({});
  const {
    handleSubmit,
    control,
    setValue,
    setError,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      squareMeter: 0,
      serviceAvailable: 0,
      ratio: 0,
      total: 0
    },
  })
  const quantity = watch('quantity');
  const width = watch('width');
  const length = watch('length');
  const selectedType = watch('type');
  const goodsName = watch('goodsName');
  const product = productData.find((p) => p.id === goodsName)
  const productForm = watch('productForm');
  const type = watch('type');
  const finishedProductFormStandard = watch('finished_product_form_standard_id');
  const widthStandard = watch('width_standard');
  const lengthStandard = watch('length_standard');
  const quantityStandard = watch('quantity_standard');
  const serviceAvailable = watch('serviceAvailable');
  const squareMeter = watch('squareMeter');
  const squareMeterStandard = watch('squareMeterStandard');
  const unitPrice = watch('unitPrice');
  const discount = watch('discount');
  const ratio = watch('ratio');
  const productCost = watch('productCost');
  const total = watch('total');
  const shippingFee = watch('shippingFee');
  const valueAddedServices = watch('valueAddedServices');
  const config = new ReadingConfig()
  config.unit = ['đồng']

  useEffect(() => {
    if (createOderPreviewSuccessFlag) {
      setPreviewModalOpen(true)
      removeMessageError()
    }
  }, [createOderPreviewSuccessFlag]);

  useEffect(() => {
    if (createOderSuccessFlag) {
      removeMessageError()
      localStorage.removeItem("formState");
      if (data.isListCustomer) {
        navigate('/sale/information')
      } else {
        navigate('/sale/order')
      }
    }
  }, [createOderSuccessFlag]);

  const removeMessageError = useCallback(() => {
    dispatch(removeMessageErrorAction())
  }, [])

  useEffect(() => {
    if (errorCreateOderPreviewErrorMessage && errorCreateOderPreviewErrorMessage.length > 0) {
      const priceErrorMessage = errorCreateOderPreviewErrorMessage[0]["product_items.0.price"]?.[0];
      if (priceErrorMessage) {
        setError('unitPrice', {
          type: 'manual',
          message: priceErrorMessage
        });
      }
    }
  }, [errorCreateOderPreviewErrorMessage, setError]);

  useEffect(() => {
    if (serviceAvailable === 1 || serviceAvailable === '1') {
      setValue('ratio', 8)
      setValue('valueAddedServices', formatCurrency(parsePricePerSquareMeter(productCost) * (8 / 100)))
    }
  }, [serviceAvailable]);

  useEffect(() => {
    if (productFormData.length > 0) {
      setValue('productForm', String(productFormData[0].id));
    }
  }, [productFormData, setValue]);

  useEffect(() => {
    const savedData = localStorage.getItem("formState");
    if (savedData) {
      const formData = JSON.parse(savedData);
      setData(formData);
    } else {
      navigate('/sale/order')
    }
  }, []);

  useEffect(() => {
    if (productCost != null && serviceAvailable != null && valueAddedServices != null) {
      let discountValue = parseFloat(discount ?? 0)
      if (isNaN(discountValue)) {
        discountValue = 0
      } else {
        discountValue /= 100
      }
      const taxValue = parseFloat(serviceAvailable) === 1 ? parsePricePerSquareMeter(valueAddedServices) : 0
      const newTotal = parsePricePerSquareMeter(productCost) + parseFloat(shippingFee ?? 0) - parsePricePerSquareMeter(productCost) * discountValue + taxValue
      setValue('total', newTotal)
    } else {
      setValue('total', 0)
    }
  }, [productCost, shippingFee, discount, serviceAvailable, valueAddedServices])

  useEffect(() => {
    if (listAllProductWarehouseSuggestion.length > 0) {
      setDataListProductWarehouseByProductManagementId(listAllProductWarehouseSuggestion)
      dispatch(removeMessageErrorOrderAction())
    }
  }, [listAllProductWarehouseSuggestion]);

  useEffect(() => {
    dispatch(getAllManufactureFormAction())
  }, [dispatch]);

  useEffect(() => {
    if (selectedType === 2) {
      setWidthLabel(t('high'));
    } else {
      setWidthLabel(t('width'));
    }
  }, [selectedType]);

  useEffect(() => {
    if (finishedProductFormStandard === 1) {
      setWidthLabelStandard(t('width'));
    } else {
      setWidthLabelStandard(t('high'));
    }
  }, [finishedProductFormStandard]);

  useEffect(() => {
    if (quantity && width && length) {
      const parsedLength = parsePricePerSquareMeter(length)
      const parsedWidth = parsePricePerSquareMeter(width)
      const parsedQuantity = parsePricePerSquareMeter(quantity)
      const squareMeter = areaCalculation(parsedLength, parsedWidth, parsedQuantity)
      setValue('squareMeter', formatNumber(squareMeter));
    } else {
      setValue('squareMeter', 0);
    }
  }, [quantity, width, length]);

  useEffect(() => {
    if (quantityStandard && widthStandard && lengthStandard) {
      const parsedLength = parsePricePerSquareMeter(lengthStandard)
      const parsedWidth = parsePricePerSquareMeter(widthStandard)
      const parsedQuantity = parsePricePerSquareMeter(quantityStandard)
      const squareMeter = areaCalculation(parsedLength, parsedWidth, parsedQuantity)
      setValue('squareMeterStandard', formatNumber(squareMeter));
    } else {
      setValue('squareMeterStandard', 0);
    }
  }, [quantityStandard, widthStandard, lengthStandard]);

  useEffect(() => {
    if (productForm === 1 || productForm === '1') {
      if (squareMeter && unitPrice) {
        const totalCost = Number(parsePricePerSquareMeter(squareMeter)) * parsePricePerSquareMeter(unitPrice);
        setValue('productCost', formatCurrency(totalCost));
      } else {
        setValue('productCost', 0);
      }
    } else {
      if (squareMeterStandard && unitPrice) {
        const totalCost = Number(parsePricePerSquareMeter(squareMeterStandard)) * parsePricePerSquareMeter(unitPrice);
        setValue('productCost', formatCurrency(totalCost));
      } else {
        setValue('productCost', 0);
      }
    }
  }, [squareMeterStandard, squareMeter, unitPrice, productForm]);

  useEffect(() => {
    if (!ratio) {
      setValue('valueAddedServices', 0);
      return;
    }

    const parsedRatio = Number(parsePricePerSquareMeter(ratio));
    const validRatio = Math.min(parsedRatio, 100);
    if (validRatio !== parsedRatio) {
      setValue('ratio', validRatio);
    }

    if (productCost && serviceAvailable === '1') {
      const total = Number(parsePricePerSquareMeter(productCost)) * (validRatio / 100);
      setValue('valueAddedServices', formatCurrency(total));
    } else {
      setValue('valueAddedServices', 0);
    }
  }, [ratio, productCost, setValue])

  useEffect(() => {
    if (data.customerID) {
      dispatch(getListProductByCustomerId(data.customerID))
    }
  }, [dispatch, data])

  useEffect(() => {
    setCloseModal(true);
    setTimeout(() => setCloseModal(false), 1000);
  }, [listAllProductWarehouseSuggestion])

  const getProductPrice = (product, product_form_id, finished_product_form_id) => {
    const parsedProductFormId = parseInt(product_form_id)
    const parsedFinishedProductFormId = parseInt(finished_product_form_id)
    if (!product) return ''
    if (parsedFinishedProductFormId === 1 && parsedProductFormId === 1) {
      return product.price_include_sheet_size
    } else if (parsedFinishedProductFormId === 2 && parsedProductFormId === 1) {
      return product.price_include_roll_size
    } else if (parsedFinishedProductFormId === 1 && parsedProductFormId === 2) {
      return product.price_standard_sheet
    } else if (parsedFinishedProductFormId === 2 && parsedProductFormId === 2) {
      return product.price_standard_roll
    }
    return ''
  }

  const handleCreateChooseMaterials = (data) => {
    dispatch(getAllProductWarehouseSuggestionAction({ product_warehouses: data }))
  }

  const handleChoiceProduct = (product) => {
    if (product) {
      setValue('goodsName', product.id)
      setValue('productForm', productFormData[0]?.id)
      setValue('type', finishedProductFormData[0]?.id)
      setValue('width', formatNumber(product.width))
      setValue('length', formatNumber(product.length))
      setValue('unitPrice', formatNumber(product.price_include_roll_size) || 0)
      setGoodNamePreview(product.product_name)
    } else {
      setValue('goodsName', '')
      setValue('productForm', productFormData[0]?.id)
      setValue('type', '')
      setValue('width', '')
      setValue('length', '')
      setValue('unitPrice', '')
      setValue('quantity', '')
      setValue('squareMeter', 0);
      setGoodNamePreview('')
    }
  }

  const handleFinishedProductFormChange = (event) => {
    if (event) {
      setValue('type', event.id)
      if (productForm === 1 || productForm === '1') {
        setValue('unitPrice', formatNumber(getProductPrice(product, productForm, event.id)))
      }
      setValue('squareMeter', squareMeter ?? 0);

    } else {
      setValue('type', '')
    }
  }

  const handleProductFormChange = (event) => {
    const value = event.target.value
    setDataListProductWarehouseByProductManagementId([])
    setValue('productForm', value)
    if (value === 1 || value === '1') {
      setValue('unitPrice', formatNumber(getProductPrice(product, value, selectedType)))
      setValue('finished_product_form_standard_id', '')
      setValue('width_standard', '')
      setValue('length_standard', '')
      setValue('quantity_standard', '')
      setValue('squareMeterStandard', '')
    } else {
      setValue('finished_product_form_standard_id', productFormData[1]?.id)
      setValue('unitPrice', formatNumber(getProductPrice(product, value, selectedType)))
      setValue('squareMeterStandard', 0)
    }
  }

  const handleFinishedProductFormStandardChange = (event) => {
    if (event) {
      setValue('finished_product_form_standard_id', event.id)
      setValue('unitPrice', formatNumber(getProductPrice(product, productForm, event.id)))
    } else {
      setValue('finished_product_form_standard_id', '')
      setValue('unitPrice', 0)
    }
  }

  const handleOpenChooseMaterialsModal = () => {
    dispatch(getAllProductWarehouseByProductManagementIdAction({
      product_management_id: goodsName,
      finished_product_form_id: (productForm === 1 || productForm === '1') ? type : finishedProductFormStandard,
      length: (productForm === 1 || productForm === '1') ? parsePricePerSquareMeter(length) : parsePricePerSquareMeter(lengthStandard),
      width: (productForm === 1 || productForm === '1') ? parsePricePerSquareMeter(width) : parsePricePerSquareMeter(widthStandard),
      quantity: (productForm === 1 || productForm === '1') ? parsePricePerSquareMeter(quantity) : parsePricePerSquareMeter(quantityStandard),
    }))
    setIsOpenChooseMaterialsModal(true)
  }

  const handleCloseChooseMaterialsModal = () => {
    setIsOpenChooseMaterialsModal(false)
  }

  const isFormComplete = useMemo(() => {
    if (productForm === 2 || productForm === '2') {
      return quantityStandard && widthStandard && lengthStandard && finishedProductFormStandard && goodsName;
    } else {
      return quantity && width && length && selectedType && goodsName;
    }
  }, [productForm, goodsName, quantity, width, length, selectedType, quantityStandard, widthStandard, lengthStandard, finishedProductFormStandard]);

  const handleManufactureFormChange = (id, newValue) => {
    const updatedData = dataListProductWarehouseByProductManagementId.map((item) =>
      item.id === id
        ? {
          ...item,
          manufacture_form: { ...item.manufacture_form, id: newValue },
        }
        : item
    );
    setDataListProductWarehouseByProductManagementId(updatedData);
  };

  const handlerDelete = (id) => {
    const updatedData = dataListProductWarehouseByProductManagementId.filter((item) => item.id !== id);
    setDataListProductWarehouseByProductManagementId(updatedData);
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 1000);
  };

  const onSubmit = (dataPreview) => {
    if (!dataListProductWarehouseByProductManagementId || dataListProductWarehouseByProductManagementId.length === 0) {
      setShowHelperText(true);
    } else {
      setShowHelperText(false);
      const product_items = [
        {
          product_management_id: dataPreview.goodsName,
          product_form_id: dataPreview.productForm,
          length: dataPreview.length,
          width: dataPreview.width,
          quantity: dataPreview.quantity,
          finished_product_form_id: dataPreview.type ?? '',
          length_standard: dataPreview.length_standard ?? '',
          width_standard: dataPreview.width_standard ?? '',
          quantity_standard: dataPreview.quantity_standard ?? '',
          finished_product_form_standard_id: dataPreview.finished_product_form_standard_id ?? '',
          price: parsePricePerSquareMeter(dataPreview.unitPrice),
          product_name: goodNamePreview
        },
      ];
      const order = {
        customer_id: data.customerID,
        address_branch_id: data.branch,
        address_delivery_id: data.addressId === 'other' ? '' : data.addressId,
        province_id: data.provinceId,
        district_id: data.districtId,
        ward_id: data.wardId,
        detail: data.addressDetail,
        payment_method_id: data.payments,
        delivery_date: data.deliveryDate,
        delivery_shift_id: data.shift ?? '',
        product_items: product_items,
        amount: parsePricePerSquareMeter(dataPreview.productCost),
        delivery_charges: shippingFee,
        discount: dataPreview.discount ?? 0,
        tax_type: dataPreview.serviceAvailable,
        tax_amount: parsePricePerSquareMeter(dataPreview.valueAddedServices),
        total_cost: dataPreview.total,
        tag_ids: data.tags ?? [],
        description: dataPreview.explanationNotesForOrders ?? '',
        tax_percent: dataPreview.ratio,
        delivery_time: data.time ?? '',
        internal_description: dataPreview.internalNotes ?? '',
        manufacture_order_product_warehouse: dataListProductWarehouseByProductManagementId.map((item) => ({
          product_warehouse_id: item.id,
          manufacture_form_id: item.manufacture_form.id,
          quantity: parsePricePerSquareMeter(item.quantity),
          width: parsePricePerSquareMeter(item.width),
          length: parsePricePerSquareMeter(item.length),
          scrap: item.scrap,
        })),
      }
      setOrderData(order);
      dispatch(createOderPreviewAction(order))
      setPreviewData({
        customer: data.customerPreview,
        branch: data.branchPreview,
        address: data.addressPreview,
        payment: data.paymentPreview,
        date: data.datePreview,
        delivery_shift: data.deliveryShiftPreview,
        goods: product_items,
        intoMoney: parsePricePerSquareMeter(dataPreview.productCost),
        shippingFee: shippingFee ?? 0,
        discount: dataPreview.discount ?? 0,
        taxAmount: parsePricePerSquareMeter(dataPreview.valueAddedServices),
        total: dataPreview.total,
        description: dataPreview.explanationNotesForOrders ?? ''
      })
    }
  }

  const handleClosePreviewModal = () => {
    removeMessageError()
    setPreviewModalOpen(false)
  }

  const handleCreateOderAction = useCallback(() => {
    if (orderData) {
      dispatch(createOderAction(orderData));
    }
  }, [orderData, dispatch]);

  const handleNumberReading = (config, total) => {
    try {
      const normalizedNumber = normalizeLargeNumber(total);

      return doReadNumber(config, normalizedNumber);
    } catch (error) {
      return t('numberTooLarge');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <HeaderPage
        title={t('createAnOrder')}
        actionButton={
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              className="buttonAction"
              sx={{ gap: '8px', color: colors.greenColor }}
              startIcon={<AddCircleOutline style={{ fontSize: '16px', marginBottom: '2px' }} />}
              onClick={handleSubmit(onSubmit)}
            >
              {t('preview')}
            </Button>
          </Box>
        }
      />
      <Box p={2}>
        <Box sx={{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '20px', position: 'relative' }}>
          <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
            <Typography
              sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
            >
              {t('customerInformation')}
            </Typography>
          </Box>
          <Grid spacing={1}>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={4}>
                <InputLabel className="inputLabel">
                  {t('customer')}
                </InputLabel>
                <InputLabel sx={{ ml: 1 }} className="text-output-label">
                  {data?.customerPreview}
                </InputLabel>
              </Grid>
              <Grid item xs={4}>
                <InputLabel className="inputLabel">
                  {t('branch')}
                </InputLabel>
                <InputLabel sx={{ ml: 1 }} className="text-output-label">
                  {data?.branchPreview}
                </InputLabel>
              </Grid>
              <Grid item xs={4}>
                <InputLabel className="inputLabel">
                  {t('deliveryAddress')}
                </InputLabel>
                <InputLabel sx={{ ml: 1 }} className="text-output-label">
                  {data?.addressPreview}
                </InputLabel>
              </Grid>
            </Grid>
            <Grid mt={0.5} item container xs={12} spacing={2}>
              <Grid item xs={4}>
                <InputLabel className="inputLabel">
                  {t('payments')}
                </InputLabel>
                <InputLabel sx={{ ml: 1 }} className="text-output-label">
                  {data?.paymentPreview}
                </InputLabel>
              </Grid>
              <Grid item xs={4}>
                <InputLabel className="inputLabel">
                  {t('deliveryDate')} - {t('shift')} - {t('timeCalendar')}
                </InputLabel>
                <InputLabel sx={{ ml: 1 }} className="text-output-label">
                  {data?.datePreview}
                  {data?.deliveryShiftPreview ? ` - ${data.deliveryShiftPreview}` : ""}
                  {data?.timePreview ? ` - ${data.timePreview}` : ""}
                </InputLabel>
              </Grid>
              <Grid item xs={4}>
                <InputLabel className="inputLabel">
                  {t('tag')}
                </InputLabel>
                <InputLabel sx={{ ml: 1 }} className="text-output-label">
                  {data.tags && data.tags.length > 0 ? (
                    tagData
                      .filter((tag) => data.tags.includes(tag.id))
                      .map((tag, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              whiteSpace: 'nowrap',
                              backgroundColor: tagColors[tag.tag_name]?.backgroundColor || 'transparent',
                              borderRadius: '15px',
                              padding: '2px 5px'
                            }}
                          >
                            <LocalOffer className="icon-checkbox" />
                            <span style={{ color: colors.lilywhiteColor, fontSize: 12, fontWeight: 700 }}>
                              {tag.tag_name}
                            </span>
                          </Box>
                        </Box>
                      ))
                  ) : (
                    <InputLabel sx={{ ml: 1 }} className="text-output-label">
                      {t('noData')}
                    </InputLabel>
                  )}
                </InputLabel>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{
          bgcolor: colors.lilywhiteColor,
          borderRadius: '10px',
          padding: '20px',
          position: 'relative',
          marginTop: '10px'
        }}>
          <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
            <Typography
              sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
            >
              {t('productInfo')}
            </Typography>
          </Box>
          <Grid spacing={1}>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={3.5}>
                <InputLabel required className="inputLabel requiredTextField">
                  {t('goodsName')}
                </InputLabel>
                <AutocompleteForm
                  name="goodsName"
                  control={control}
                  errors={errors}
                  options={productData || []}
                  getOptionLabel={(option) => option.product_name}
                  noOptionsText={t('noResult')}
                  placeholder={t('select')}
                  onChange={handleChoiceProduct}
                />
              </Grid>
              <Grid item xs={2}>
                <InputLabel required className="inputLabel requiredTextField">
                  {t('type')}
                </InputLabel>
                <AutocompleteForm
                  name="type"
                  control={control}
                  errors={errors}
                  options={finishedProductFormData || []}
                  getOptionLabel={(option) => option.finished_product_form_name}
                  noOptionsText={t('noResult')}
                  placeholder={t('select')}
                  onChange={handleFinishedProductFormChange}
                />
              </Grid>
              <Grid item xs={1}>
                <InputLabel required className="inputLabel requiredTextField">
                  {t('quantity')}
                </InputLabel>
                <InputFieldForm
                  name="quantity"
                  control={control}
                  errors={errors}
                  placeholder={t('import')}
                  enableFormat={true}
                  allowOnlyInteger={true}
                />
              </Grid>
              <Grid item xs={1}>
                <InputLabel required className="inputLabel requiredTextField">
                  {widthLabel} (Cm)
                </InputLabel>
                <InputFieldForm
                  name="width"
                  control={control}
                  errors={errors}
                  placeholder={t('import')}
                  enableFormat={true}
                />
              </Grid>
              <Grid item xs={1}>
                <InputLabel required className="inputLabel requiredTextField">
                  {t('length')} (m)
                </InputLabel>
                <InputFieldForm
                  name="length"
                  control={control}
                  errors={errors}
                  placeholder={t('import')}
                  enableFormat={true}
                />
              </Grid>
              <Grid item xs={1}>
                <InputLabel className="inputLabel">
                  M<sup>2</sup>
                </InputLabel>
                <InputFieldForm
                  name="squareMeter"
                  control={control}
                  errors={errors}
                  disabled
                />
              </Grid>
              {(productForm === 1 || productForm === '1') && (
                <>
                  <Grid item xs={1}>
                    <InputLabel required className="inputLabel requiredTextField">
                      {t('unitPrice')}/m<sup>2</sup>
                    </InputLabel>
                    <InputFieldForm
                      name="unitPrice"
                      control={control}
                      errors={errors}
                      placeholder={t('import')}
                      enableFormat={true}
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <TooltipButtonWithHelperText
                      isFormComplete={isFormComplete}
                      tooltipText={t('pleaseEnterFullProductInformation')}
                      buttonText={t('buttonChooseMaterials')}
                      onClick={handleSubmit(handleOpenChooseMaterialsModal)}
                      showHelperText={showHelperText}
                      helperText={t('buttonChooseMaterials')}
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Grid mt={0.5} item container xs={12} spacing={2}>
              <Grid container item xs={3.5}>
                <InputLabel sx={{ display: 'flex', alignItems: 'center', }} className="inputLabel-noBottom">
                  {t('form')}
                </InputLabel>
                <Controller
                  name="productForm"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      {...field}
                      sx={{ flexDirection: 'row' }}
                      onChange={(event) => handleProductFormChange(event)}
                      value={String(field.value)}
                    >
                      {productFormData.map((item) => (
                        <FormControlLabel
                          key={item.id}
                          value={item.id}
                          sx={{
                            '& .MuiSvgIcon-root': {
                              fontSize: 16,
                              marginLeft: '5px'
                            },
                            marginRight: '5px'
                          }}
                          control={<Radio />}
                          label={
                            <span className="radio-text">
                              {item.product_form_name === 'Không bao khổ' ? (
                                <>
                                  <span style={{ fontWeight: 700 }}>Không</span>
                                  <span> bao khổ</span>
                                </>
                              ) : (
                                ' ' + item.product_form_name
                              )}
                            </span>
                          }
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </Grid>
              {(productForm === 2 || productForm === '2') && (
                <>
                  <Grid item xs={2}>
                    <InputLabel required className="inputLabel requiredTextField">
                      {t('type')}
                    </InputLabel>
                    <AutocompleteForm
                      name="finished_product_form_standard_id"
                      control={control}
                      errors={errors}
                      options={finishedProductFormData || []}
                      getOptionLabel={(option) => option.finished_product_form_name}
                      noOptionsText={t('noResult')}
                      placeholder={t('select')}
                      onChange={handleFinishedProductFormStandardChange}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <InputLabel required className="inputLabel requiredTextField">
                      {t('quantity')}
                    </InputLabel>
                    <InputFieldForm
                      name="quantity_standard"
                      control={control}
                      errors={errors}
                      placeholder={t('import')}
                      enableFormat={true}
                      allowOnlyInteger={true}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <InputLabel required className="inputLabel requiredTextField">
                      {widthLabelStandard} (Cm)
                    </InputLabel>
                    <InputFieldForm
                      name="width_standard"
                      control={control}
                      errors={errors}
                      placeholder={t('import')}
                      enableFormat={true}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <InputLabel required className="inputLabel requiredTextField">
                      {t('length')} (m)
                    </InputLabel>
                    <InputFieldForm
                      name="length_standard"
                      control={control}
                      errors={errors}
                      placeholder={t('import')}
                      enableFormat={true}
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <InputLabel className="inputLabel">
                      M<sup>2</sup>
                    </InputLabel>
                    <InputFieldForm
                      name="squareMeterStandard"
                      control={control}
                      errors={errors}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <InputLabel required className="inputLabel requiredTextField">
                      {t('unitPrice')}/m<sup>2</sup>
                    </InputLabel>
                    <InputFieldForm
                      name="unitPrice"
                      control={control}
                      errors={errors}
                      placeholder={t('import')}
                      enableFormat={true}
                    />
                  </Grid>
                  <Grid item xs={1.5}>
                    <TooltipButtonWithHelperText
                      isFormComplete={isFormComplete}
                      tooltipText={t('pleaseEnterFullProductInformation')}
                      buttonText={t('buttonChooseMaterials')}
                      onClick={handleSubmit(handleOpenChooseMaterialsModal)}
                      showHelperText={showHelperText}
                      helperText={t('buttonChooseMaterials')}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          {dataListProductWarehouseByProductManagementId.length > 0 && (
            <Grid spacing={1}>
              <InputLabel sx={{
                fontSize: '14px',
                fontWeight: 700,
                color: colors.oceanblueColor,
                textDecoration: 'underline',
                textUnderlinePosition: 'under',
                mt: 1, mb: 1
              }}
              >
                {t('listOfUsedMaterials')}
              </InputLabel>
              <CreateOrUpdateTable
                handleManufactureFormChange={handleManufactureFormChange}
                data={dataListProductWarehouseByProductManagementId}
                listAllManufactureForm={listAllManufactureForm}
                control={control}
                handlerDelete={handlerDelete}
                successMessage={successMessage}
                errorsTable={errorsTable}
                setErrorTables={setErrorTables}
              />
            </Grid>
          )}
        </Box>
        <Box sx={{
          bgcolor: colors.lilywhiteColor,
          borderRadius: '10px',
          padding: '20px',
          position: 'relative',
          marginTop: '10px'
        }}>
          <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
            <Typography
              sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
            >
              {t('note')}
            </Typography>
          </Box>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <InputLabel className="inputLabel">
                {t('explanationNotesForOrders')}
              </InputLabel>
              <InputFieldForm
                name="explanationNotesForOrders"
                control={control}
                errors={errors}
                placeholder={t('enterAdditionalDescriptionsOrNotesSpecificToTheOrder')}
              />
            </Grid>

            <Grid item xs={12} mt={0.5}>
              <InputLabel className="inputLabel">
                {t('internalNotes')}
              </InputLabel>
              <InputFieldForm
                name="internalNotes"
                control={control}
                errors={errors}
                placeholder={t('enterAdditionalExplanationsOrInternalNotes')}
              />
            </Grid>
          </Grid>

        </Box>
        <Box sx={{
          bgcolor: colors.lilywhiteColor,
          borderRadius: '10px',
          padding: '20px',
          position: 'relative',
          marginTop: '10px'
        }}>
          <Box sx={{ width: '100%', textAlign: 'center', mb: '0.5rem' }}>
            <Typography
              sx={{ fontWeight: '500', fontSize: '16px', fontStyle: 'italic', color: colors.lightroyalblueColor }}
            >
              {t('intoMoney')}
            </Typography>
          </Box>
          <Grid spacing={1}>
            <Grid item container xs={12} spacing={2}>
              <Grid item xs={3.5}>
                <InputLabel className="inputLabel">
                  {t('productCost')} (VND)
                </InputLabel>
                <InputFieldForm
                  name="productCost"
                  control={control}
                  errors={errors}
                  disabled
                />
              </Grid>
              <Grid item xs={4} container spacing={2}>
                <Grid item xs={5}>
                  <InputLabel className="inputLabel">
                    {t('discount')} (%)
                  </InputLabel>
                  <InputFieldForm
                    name="discount"
                    control={control}
                    errors={errors}
                    enableFormat={true}
                  />
                </Grid>
                <Grid item xs={7}>
                  <InputLabel className="inputLabel">
                    {t('shippingFee')}
                  </InputLabel>
                  <InputFieldForm
                    name="shippingFee"
                    control={control}
                    errors={errors}
                    enableFormat={true}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid mt={0.5} item container xs={12} spacing={2}>
              <Grid item xs={3.5}>
                <InputLabel className="inputLabel">
                  {t('valueAddedServices')}
                </InputLabel>
                <Box>
                  <Controller
                    name="serviceAvailable"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup
                        {...field}
                        sx={{ gap: '12px' }}
                        row
                        onChange={(e) => field.onChange(e.target.value)}
                        value={String(field.value)}
                      >
                        <FormControlLabel
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }, marginRight: '5px' }}
                          value="1"
                          control={<Radio />}
                          label={<span className="radio-text">{t('yes')}</span>}
                        />
                        <FormControlLabel
                          sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }, marginRight: '5px' }}
                          value="0"
                          control={<Radio />}
                          label={
                            <span className="radio-text">
                              <span className="bold-text">{t('no')}</span>
                            </span>
                          }
                        />
                      </RadioGroup>
                    )}
                  />
                </Box>
              </Grid>
              {(serviceAvailable === 1 || serviceAvailable === '1') && (
                <Grid item xs={4} container spacing={2}>
                  <Grid item xs={5}>
                    <InputLabel className="inputLabel">
                      {t('ratio')} (%)
                    </InputLabel>
                    <InputFieldForm
                      name="ratio"
                      control={control}
                      errors={errors}
                      enableFormat={true}
                    />
                  </Grid>
                  <Grid item xs={7}>
                    <InputLabel className="inputLabel">
                      {t('valueAddedServices')}
                    </InputLabel>
                    <InputFieldForm
                      name="valueAddedServices"
                      control={control}
                      errors={errors}
                      disabled
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid mt={1} item xs={12}>
              <Box
                sx={{
                  height: '1px',
                  background: colors.lightGrayColor
                }}
              />
              <Box
                sx={{
                  margin: '15px 0 15px',
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <InputLabel
                    style={{ textTransform: 'uppercase', fontSize: 14, fontWeight: 700, color: colors.blackColor }}
                  >
                    {t('total')}
                  </InputLabel>
                </Box>
                {total >= 0 && (
                  <Box sx={{ flex: 2, textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontSize: 18, fontWeight: 700, color: colors.redColor }}>
                      {formatCurrency(total)}
                    </Typography>
                    <Typography sx={{ fontSize: '12px', overflowWrap: 'break-word', width: '100%' }}>
                      <span> {t('inWords')}:</span>
                      {handleNumberReading(config, Math.round(Number(total)))}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {isOpenChooseMaterialsModal && (
        <ChooseMaterialsModal
          dataListProductWarehouseByProductManagementId={dataListProductWarehouseByProductManagementId}
          open={isOpenChooseMaterialsModal}
          handleClose={handleCloseChooseMaterialsModal}
          data={listProductWarehouseByProductManagementId}
          handleCreateChooseMaterials={handleCreateChooseMaterials}
          closeModal={closeModal}
        />
      )}
      <PreviewOrder
        open={isPreviewModalOpen}
        handleClose={handleClosePreviewModal}
        nameTitle={t('createAnOrderPreview')}
        previewData={previewData}
        errorsMessage={errorsMessageCreateOder}
        handleSubmitAction={handleCreateOderAction}
      />
    </Box>
  )
}