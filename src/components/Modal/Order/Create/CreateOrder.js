import { LocalOffer } from '@mui/icons-material'
import DateRangeIcon from '@mui/icons-material/DateRange'
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaArrowRightLong } from 'react-icons/fa6'
import { formatCurrency } from '../../../../common/common'
import colors from '../../../../constants/colors'
import tagColors from '../../../../constants/colorsTag'
import '../../../../resource/style/ModalCreateOrderStyle.css'
import AutocompleteForm from "../../../AutocompleteForm";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Grid from "@mui/material/Grid";
import InputFieldForm from "../../../InputFieldForm";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../../../../redux/app/app.slice";
import { useDispatch } from "react-redux";

const style = {
  width: '50%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '800px',
  bgcolor: 'background.paper',
  borderRadius: '16px'
}

export default function OrderModal(props) {
  const {
    open,
    nameTitle,
    data,
    idCustomer,
    dataProvince,
    dataDistrict,
    dataWard,
    paymentData,
    deliveryShiftData,
    tagData,
    handleClose,
    removeMessageError,
    onChangeProvince,
    onChangeDistrict,
    formValues,
    isListCustomer
  } = props

  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const schema = yup.object().shape({
    customerName: yup.string().trim()
      .required(t('pleaseEnterCustomerName'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    addressId: yup.string().trim()
      .required(t('pleaseEnterCustomerName'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    provinceId: yup.string().when('addressId', {
      is: 'other',
      then: () => yup.string()
        .required(t('requiredField'))
        .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
      otherwise: () => yup.string().nullable()
    }),
    districtId: yup.string().when('addressId', {
      is: 'other',
      then: () => yup.string()
        .required(t('requiredField'))
        .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
      otherwise: () => yup.string().nullable()
    }),
    wardId: yup.string().when('addressId', {
      is: 'other',
      then: () => yup.string()
        .required(t('requiredField'))
        .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
      otherwise: () => yup.string().nullable()
    }),
    address: yup.string().trim(),
    branch: yup.string().trim()
      .required(t('pleaseEnterBranchName'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    payments: yup.string().trim()
      .required(t('pleaseChoosePaymentMethod'))
      .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    deliveryDate: yup
      .string()
      .required(t('pleaseSelectDeliveryDate'))
      .typeError(t('pleaseFillTrueFormat'))
      .transform((curr, orig) => {
        return orig === '' ? null : curr
      })
      .default(undefined),
    shift: yup.number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value)),
    time: yup.string().nullable(),
    tags: yup.array().nullable(),
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null)
  const [selectedTags, setSelectedTags] = useState([]);
  const {
    handleSubmit,
    reset,
    control,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
  })
  const addressId = watch('addressId');
  const districtId = watch('districtId');
  const provinceId = watch('provinceId');
  const wardId = watch('wardId');
  const addressDetail = watch('address');
  const [branchData, setBranchData] = useState([])
  const [customerPreview, setCustomerPreview] = useState('')
  const [branchPreview, setBranchPreview] = useState('')
  const [addressPreview, setAddressPreview] = useState('')
  const [paymentPreview, setPaymentPreview] = useState('')
  const [datePreview, setDatePreview] = useState('')
  const [deliveryShiftPreview, setDeliveryShiftPreview] = useState('')
  const [timePreview, setTimePreview] = useState('')
  useEffect(() => {
    dispatch(setLoading(true))
  }, [])

  useEffect(() => {
    const customerToCheck = formValues?.customerID || idCustomer;
    if (customerToCheck) {
      const foundCustomer = data.find((customer) => customer.id === Number(customerToCheck));
      setSelectedCustomer(foundCustomer);
    } else {
      setSelectedCustomer(null);
    }
  }, [idCustomer, data, open, formValues]);

  useEffect(() => {
    if (formValues) {
      setValue('customerName', formValues.customerID);
      setValue('branch', Number(formValues.branch));
      setValue('payments', Number(formValues.payments));
      setValue('shift', Number(formValues.shift ?? null));
      setValue('time', formValues.time);
      setValue('deliveryDate', formValues.deliveryDate);
      setValue('tags', formValues.tags);
      setCustomerPreview(formValues.customerPreview)
      setBranchPreview(formValues.branchPreview)
      setAddressPreview(formValues.addressPreview)
      setPaymentPreview(formValues.paymentPreview)
      setDatePreview(formValues.datePreview)
      setDeliveryShiftPreview(formValues.deliveryShiftPreview ?? '')
      setTimePreview(formValues.timePreview ?? '')
    }
  }, [formValues])

  useEffect(() => {
    if (selectedCustomer) {
      setValue('customerName', selectedCustomer.id);
      setCustomerPreview(selectedCustomer.customer_name ?? '')
      setBranchData(selectedCustomer.address_branches || []);
      if (formValues) {
        setValue('addressId', String(formValues.addressId));
        setValue('address', formValues.addressDetail);
        if (formValues.provinceId) {
          setValue('provinceId', Number(formValues.provinceId));
          onChangeProvince(String(formValues.provinceId))
        }
        if (formValues.districtId) {
          setValue('districtId', Number(formValues.districtId));
          onChangeDistrict(String(formValues.districtId))
        }
        if (formValues.wardId) {
          setValue('wardId', Number(formValues.wardId));
        }
      } else {
        const defaultAddress = selectedCustomer?.address_deliveries?.[0]
        if (defaultAddress) {
          setValue('addressId', String(defaultAddress.id));
          const { detail, ward, district, province } = defaultAddress
          const filteredValues = [
            detail,
            ward && ward.ward_name,
            district && district.district_name,
            province && province.province_name
          ].filter((value) => value)

          const addressName = filteredValues.join(', ')
          setAddressPreview(addressName)
        } else {
          setValue('addressId', 'other');
          setAddressPreview('')
        }
      }
    }
  }, [selectedCustomer, setValue, formValues])

  const handleCustomerChange = (newValue) => {
    if (newValue) {
      setSelectedCustomer(newValue)
    } else {
      setSelectedCustomer(null)
      setBranchData([])
      setValue('branch', '');
    }
  }

  const getAddressNameByIds = (wardId, districtId, provinceId, addressDetail) => {
    const ward = dataWard ? dataWard.find((ward) => ward.id === wardId) : null
    const district = dataDistrict ? dataDistrict.find((district) => district.id === districtId) : null
    const province = dataProvince ? dataProvince.find((province) => province.id === provinceId) : null

    const components = []
    if (addressDetail) {
      components.push(addressDetail)
    }
    if (ward && ward.ward_name) {
      components.push(ward.ward_name)
    }
    if (district && district.district_name) {
      components.push(district.district_name)
    }
    if (province && province.province_name) {
      components.push(province.province_name)
    }
    return components.join(', ')
  }

  useEffect(() => {
    if (addressDetail || wardId) {
      const newAddressName = getAddressNameByIds(wardId, districtId, provinceId, addressDetail)
      setAddressPreview(newAddressName)
    }
  }, [wardId, districtId, provinceId, addressDetail])

  const handleProvinceChange = (newValue) => {
    if (newValue) {
      onChangeProvince(newValue.id)
      setValue('provinceId', newValue.id);
      setValue('districtId', '');
      setValue('wardId', '');
    } else {
      setValue('districtId', '');
      setValue('provinceId', '');
      setValue('wardId', '');
    }
  }

  const handleDistrictChange = (newValue) => {
    if (newValue) {
      onChangeDistrict(newValue.id)
      setValue('districtId', newValue.id);
      setValue('wardId', '');
    } else {
      setValue('districtId', '');
      setValue('wardId', '');
    }
  }

  const handleCloseModal = () => {
    localStorage.removeItem("formState");
    reset({});
    setError()
    handleClose()
    removeMessageError()
  }

  const handleTimeChange = (newValue) => {
    const formattedTime = newValue ? newValue.format('HH:mm') : null
    setValue('time', formattedTime)
    setTimePreview(formattedTime)
  }

  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format('YYYY-MM-DD')
    setValue('deliveryDate', formattedDate)
    clearErrors('deliveryDate');
    const formattedDatePreview = dayjs(newDate).format('DD/MM/YYYY')
    setDatePreview(formattedDatePreview)
  }

  const handleTagChange = (event, tagId) => {
    let newTags;
    if (event.target.checked) {
      newTags = [...(selectedTags || []), tagId];
    } else {
      newTags = (selectedTags || []).filter(id => id !== tagId);
    }
    setSelectedTags(newTags);
    setValue('tags', newTags);
  }

  const handleShiftChange = (newValue) => {
    if (newValue) {
      const selectedShiftId = newValue.id
      setValue('shift', selectedShiftId)
      const selectedShift = deliveryShiftData.find((item) => item.id === parseInt(selectedShiftId))
      if (selectedShift) {
        setDeliveryShiftPreview(selectedShift.delivery_shift_name)
      }
    } else {
      setValue('shift', '')
      setDeliveryShiftPreview('')
    }
  }

  const handleBranchChange = (newValue) => {
    if (newValue) {
      setValue('branch', newValue.id)
      setBranchPreview(newValue.address_branch_name)
    } else {
      setValue('branch', '')
      setBranchPreview('')
    }
  }

  const handleChangePayment = (newValue) => {
    if (newValue) {
      const selectedPaymentId = newValue.id
      setValue('payments', selectedPaymentId)
      const selectedPayment = paymentData.find((item) => item.id === parseInt(selectedPaymentId))
      if (selectedPayment) {
        setPaymentPreview(selectedPayment.payment_method_name)
      }
    } else {
      setValue('payments', '')
      setPaymentPreview('')
    }
  }

  const handleChangeAddress = (event) => {
    setValue('addressId', event);
    if (event !== 'other') {
      setValue('provinceId', '');
      setValue('districtId', '');
      setValue('wardId', '');
      setValue('address', '');
    }
    if (selectedCustomer) {
      const selectedAddress = (selectedCustomer?.address_deliveries || selectedCustomer?.list_address).filter(
        (address) => address.id === parseInt(event)
      )
      if (selectedAddress.length > 0 && event !== 'other') {
        const { detail, ward, district, province } = selectedAddress[0]
        const filteredValues = [
          detail,
          ward && ward.ward_name,
          district && district.district_name,
          province && province.province_name
        ].filter((value) => value)
        const addressName = filteredValues.join(', ')
        setAddressPreview(addressName)
      } else {
        setAddressPreview('')
      }
    }
  }

  const onSubmit = (data) => {
    const formData = {
      customerID: data.customerName,
      addressId: data.addressId,
      branch: data.branch,
      deliveryDate: data.deliveryDate,
      payments: data.payments,
      shift: data.shift,
      time: data.time,
      tags: data.tags,
      districtId: data.districtId ?? '',
      provinceId: data.provinceId ?? '',
      wardId: data.wardId ?? '',
      addressDetail: data.address ?? '',
      customerPreview: customerPreview,
      branchPreview: branchPreview,
      addressPreview: addressPreview,
      paymentPreview: paymentPreview,
      datePreview: datePreview,
      deliveryShiftPreview: deliveryShiftPreview,
      timePreview: timePreview,
      isListCustomer: isListCustomer
    }
    localStorage.setItem("formState", JSON.stringify(formData));
    navigate('/sale/create-order')
  }

  useEffect(() => {
    dispatch(setLoading(false))
  }, [])

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 100
        }}
      >
        <Box sx={{ ...style }} className="order-container">
          <Box className="setPadding">
            <Typography variant="h6" component="p" className="order-title">
              {nameTitle}
            </Typography>
            {/*--------------CUSTOMER NAME---------------*/}
            <Grid spacing={1}>
              <Grid item container xs={12} spacing={2}>
                <Grid item xs={5}>
                  <InputLabel required className="requiredTextField inputLabel">
                    {t('customerName')}
                  </InputLabel>
                  <AutocompleteForm
                    name="customerName"
                    control={control}
                    errors={errors}
                    options={data || []}
                    getOptionLabel={(option) => option.customer_name}
                    noOptionsText={t('noResult')}
                    placeholder={t('select')}
                    onChange={handleCustomerChange}
                  />
                  {selectedCustomer && selectedCustomer.overdue_amount != null ? (
                    <Box
                      sx={{
                        background: colors.lightCreamYellowColor,
                        borderRadius: '8px',
                        padding: '4px',
                        marginTop: '10px',
                        border: '1px dashed #EBD3B7',
                        height: 'auto',
                      }}
                    >
                      <Typography sx={{ fontSize: 12, fontWeight: 400, fontStyle: 'italic' }}>
                        {selectedCustomer?.debt_group.id && (
                          <>
                            {t('debt')}{' '}
                            <span style={{ color: 'red', fontWeight: 700 }}>
                              {selectedCustomer.debt_group.debt_group_name}
                            </span>
                          </>
                        )}
                      </Typography>
                      <Typography sx={{ fontSize: 12, fontWeight: 400, fontStyle: 'italic' }}>
                        {selectedCustomer ? (
                          <span>
                            {t('stillOwedMoney')}{' '}
                            <span style={{ fontWeight: 700 }}>
                              {formatCurrency(selectedCustomer.overdue_amount)}
                            </span>{' '}
                            ({t('slow')}{' '}
                            {selectedCustomer.number_day_overdue ? selectedCustomer.number_day_overdue : 0}{' '}
                            {t('day')})
                          </span>
                        ) : null}
                      </Typography>
                    </Box>
                  ) : null}
                </Grid>
                <Grid item xs={7}>
                  <InputLabel className="inputLabel">{t('deliveryAddress')}</InputLabel>
                  {selectedCustomer && (
                    <>
                      <Controller
                        name="addressId"
                        control={control}
                        render={({ field }) => (
                          <RadioGroup
                            {...field}
                            onChange={(e) => handleChangeAddress(e.target.value)}
                            value={String(field.value)}
                          >
                            {(selectedCustomer.address_deliveries || selectedCustomer.list_address || []).map(
                              (address, index) => (
                                <FormControlLabel
                                  sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }, m: '0 0 0', height: '28px' }}
                                  key={index}
                                  value={String(address.id)}
                                  control={<Radio />}
                                  label={
                                    <Typography
                                      className="radio-text"
                                      sx={{ maxWidth: '100%', lineHeight: '12.41px' }}
                                    >
                                      {address.detail ? `${address.detail}, ` : ''}
                                      {address.ward?.ward_name ? `${address.ward.ward_name}, ` : ''}
                                      {address.district?.district_name ? `${address.district.district_name}, ` : ''}
                                      {address.province?.province_name ? `${address.province.province_name}.` : ''}
                                    </Typography>
                                  }
                                />
                              )
                            )}
                            <FormControlLabel
                              sx={{ '& .MuiSvgIcon-root': { fontSize: 16 }, m: '0 0 0', height: '24px' }}
                              value="other"
                              control={<Radio />}
                              label={<Typography className="radio-text">{t('other')}</Typography>}
                            />
                          </RadioGroup>
                        )}
                      />
                      {addressId === 'other' && (
                        <Box sx={{ marginLeft: '35px', marginTop: '2px' }}>
                          <Grid item container xs={12} spacing={1}>
                            <Grid item xs={6}>
                              <AutocompleteForm
                                name="provinceId"
                                control={control}
                                errors={errors}
                                options={dataProvince || []}
                                getOptionLabel={(option) => option.province_name}
                                noOptionsText={t('noResult')}
                                placeholder={t('selectCityProvince')}
                                onChange={handleProvinceChange}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <AutocompleteForm
                                name="districtId"
                                control={control}
                                errors={errors}
                                options={provinceId ? dataDistrict : []}
                                getOptionLabel={(option) => option.district_name}
                                noOptionsText={
                                  provinceId ? t('noResult') : t('pleaseSelectCityProvinceFirst')
                                }
                                placeholder={t('selectDistrict')}
                                onChange={handleDistrictChange}
                              />
                            </Grid>
                          </Grid>
                          <Grid marginTop={0.5} item container xs={12} spacing={1}>
                            <Grid item xs={6}>
                              <AutocompleteForm
                                name="wardId"
                                control={control}
                                errors={errors}
                                options={districtId ? dataWard : []}
                                getOptionLabel={(option) => option.ward_name}
                                noOptionsText={
                                  districtId && provinceId ? t('noResult') : t('pleaseSelectDistrictFirst')
                                }
                                placeholder={t('selectWardCommune')}
                              />
                            </Grid>
                            <Grid item xs={6}>
                            </Grid>
                          </Grid>
                          <Grid marginTop={1.4} container xs={12}>
                            <InputFieldForm
                              name="address"
                              control={control}
                              errors={errors}
                              placeholder="address"
                            />
                          </Grid>
                        </Box>
                      )}
                    </>
                  )}
                </Grid>
              </Grid>
              {/*-------------------Address Branch-------------------*/}
              <Grid marginTop={0.5} item container xs={12} spacing={2}>
                <Grid item xs={5}>
                  <InputLabel required className="requiredTextField inputLabel">
                    {t('branch')}
                  </InputLabel>
                  <AutocompleteForm
                    name="branch"
                    control={control}
                    errors={errors}
                    options={branchData}
                    getOptionLabel={(option) => option.address_branch_name || ''}
                    placeholder={t('select')}
                    onChange={handleBranchChange}
                  />
                </Grid>
              </Grid>
              {/*--------------Payments-------------*/}
              <Grid marginTop={0.5} item container xs={12} spacing={2}>
                <Grid item xs={5}>
                  <InputLabel required className="requiredTextField inputLabel">
                    {t('payments')}
                  </InputLabel>
                  <AutocompleteForm
                    name="payments"
                    control={control}
                    errors={errors}
                    options={paymentData || []}
                    getOptionLabel={(option) => option.payment_method_name}
                    placeholder={t('selectPayDirectlyDebt')}
                    onChange={handleChangePayment}
                  />
                </Grid>
                <Grid item xs={7} container spacing={2}>
                  <Grid item xs={4.5}>
                    <InputLabel required className="requiredTextField inputLabel">
                      {t('deliveryDate')}
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="deliveryDate"
                        control={control}
                        render={({ field }) => (
                          <MobileDatePicker
                            disablePast
                            placeholder={t('selectDate')}
                            value={field.value ? dayjs(field.value) : null}
                            format="DD-MM-YYYY"
                            onChange={(date) => {
                              handleDateChange(date)
                            }}
                            renderInput={(params) => <TextField {...params} sx={{ width: '139px !important' }} />}
                            slots={{
                              textField: (params) => (
                                <TextField
                                  {...params}
                                  size="small"
                                  placeholder={t('selectDate')}
                                  error={!!errors.deliveryDate}
                                  helperText={errors.deliveryDate?.message}
                                  sx={{
                                    width: '139px',
                                    '& input': {
                                      fontSize: '0.75rem',
                                      fontWeight: 400
                                    },
                                    '& input::placeholder': {
                                      fontSize: '0.625rem',
                                      fontWeight: 400
                                    }
                                  }}
                                  InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <IconButton edge="end">
                                          <DateRangeIcon sx={{ color: colors.whiteColor }} />
                                        </IconButton>
                                      </InputAdornment>
                                    )
                                  }}
                                />
                              )
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={2.5}>
                    <InputLabel className="inputLabel">
                      {t('shift')}
                    </InputLabel>
                    <AutocompleteForm
                      name="shift"
                      control={control}
                      errors={errors}
                      options={deliveryShiftData || []}
                      getOptionLabel={(option) => option.delivery_shift_name}
                      placeholder={t('select')}
                      onChange={handleShiftChange}
                    />
                  </Grid>
                  <Grid item xs={3.5}>
                    <InputLabel className="inputLabel">
                      {t('time')}
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Controller
                        name="time"
                        control={control}
                        render={({ field }) => (
                          <DesktopTimePicker
                            onError={() => false}
                            value={field.value ? dayjs(field.value, 'HH:mm') : null}
                            ampm={false}
                            ampmInClock={false}
                            onChange={(time) => {
                              handleTimeChange(time)
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          {/*-----------------TAG-------------------*/}
          <Box
            className="setPadding"
            sx={{
              display: 'flex',
              marginTop: '10px',
              alignItems: 'center',
              justifyContent: 'space-between',
              columnGap: 2,
              height: '60px',
              background: colors.paleblueColor,
              borderBottomRightRadius: '16px',
              borderBottomLeftRadius: '16px',
              paddingTop: '0px !important'
            }}
          >
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <Box>
                <InputLabel className="inputLabel">{t('tag')}</InputLabel>
              </Box>
              <Box sx={{ display: 'flex', marginBottom: '3px' }}>
                {tagData.map((tag, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Controller
                      name="tags"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          {...field}
                          sx={{ ml: 2, '& .MuiSvgIcon-root': { fontSize: 18 }, p: 0, color: colors.azureblueColor }}
                          checked={field.value?.includes(tag.id) || false}
                          onChange={(event) => handleTagChange(event, tag.id)}
                        />
                      )}
                    />
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
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleCloseModal} className="cancelButtonGlobal" variant="outlined">
                {t('cancel')}
              </Button>
              <Button onClick={handleSubmit(onSubmit)} className="confirmButtonGlobal">
                {t('continue')}
                <FaArrowRightLong />
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
