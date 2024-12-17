// @ts-nocheck
import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { InputLabel, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PolygonIcon from '../../../../../asset/icon/Polygon.svg'
import { isFirstCharacterZero, isNumeric } from '../../../../../common/common'
import colors from '../../../../../constants/colors'
import commons from '../../../../../constants/common'
import '../../../../../resource/style/ModalCustomerStyle.css'
import '../../../../../resource/style/common.css'
import HeaderPage from '../../../../../components/HeaderPage'
import { useDispatch, useSelector } from 'react-redux'
import {
  customerFactoryAddressState,
  customerOfficeAddressState,
  errorsMessageUpdateCustomerState,
  getCustomerDetailsState,
  SalesInChargeListState,
  updateCustomerSuccessFlagState
} from '../../../../../redux/customer/customer.selectors'
import {
  appDistrictFactoryListTempState,
  appDistrictOfficeListTempState,
  appProvinceListState,
  appWardFactoryListTempState,
  appWardOfficeListTempState
} from '../../../../../redux/app/app.selectors'
import {
  getListDistrictByProvinceIdAction,
  getListWardByDistrictIdAction,
  setGetListDistrictFactoryFlagAction,
  setGetListDistrictOfficeFlagAction,
  setGetListWardFactoryFlagAction,
  setGetListWardOfficeFlagAction
} from '../../../../../redux/app/app.actions'
import {
  getCustomerInformationAction,
  removeMessageErrorAction,
  updateCustomerAction
} from '../../../../../redux/customer/customer.actions'
import { useLocation, useNavigate } from 'react-router-dom'
import { isCanShowAllCustomers, useRoleCheck, getErrorMessageByName, validateCustomer } from "../../../../../utils";
import { isEmpty } from 'lodash'

export default function UpdateCustomerMobile() {
  const { t } = useTranslation()
  const [officeAddresses, setOfficeAddresses] = useState([
    { province_id: '', district_id: '', ward_id: '', detail: '' }
  ])
  const [factoryAddresses, setFactoryAddresses] = useState([
    { province_id: '', district_id: '', ward_id: '', detail: '' }
  ])
  const [branches, setBranches] = useState([{ address_branch_name: '' }])
  const [indexWardOffice, setIndexWardOffice] = useState('')
  const [indexDistrictOffice, setIndexDistrictOffice] = useState('')
  const [indexDistrictFactory, setIndexDistrictFactory] = useState('')
  const [indexWardFactory, setIndexWardFactory] = useState('')
  const [listWardOffice, setListWardOffice] = useState([{ id: 0, data: [] }])
  const [listDistrictOffice, setListDistrictOffice] = useState([{ id: 0, data: [] }])
  const [listWardFactory, setListWardFactory] = useState([{ id: 0, data: [] }])
  const [listDistrictFactory, setListDistrictFactory] = useState([{ id: 0, data: [] }])
  const location = useLocation()
  const customerId = new URLSearchParams(location.search).get('id')
  const customerDetail = useSelector(getCustomerDetailsState)
  const dataProvince = useSelector(appProvinceListState)
  const dataDistrictOffice = useSelector(appDistrictOfficeListTempState)
  const dataWardOffice = useSelector(appWardOfficeListTempState)
  const dataDistrictFactory = useSelector(appDistrictFactoryListTempState)
  const dataWardFactory = useSelector(appWardFactoryListTempState)
  const dataSalesInCharge = useSelector(SalesInChargeListState)
  const customerOfficeAddressDetail = useSelector(customerOfficeAddressState)
  const customerFactoryAddressDetail = useSelector(customerFactoryAddressState)
  const errorsMessageUpdateCustomer = useSelector(errorsMessageUpdateCustomerState)
  const updateCustomerSuccessFlag = useSelector(updateCustomerSuccessFlagState)
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [zaloNumber, setZaloNumber] = useState('')
  const [salesInCharge, setSalesInCharge] = useState('')
  const [errorMessageCustomerName, setErrorMessageCustomerName] = useState('')
  const [errorMessageCompanyName, setErrorMessageCompanyName] = useState('')
  const [errorMessagePhoneNumber, setErrorMessagePhoneNumber] = useState('')
  const [errorMessageZaloNumber, setErrorMessageZaloNumber] = useState('')
  const [errorMessageSales, setErrorMessageSales] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isSuperAdmin, userInfo } = useRoleCheck();
  const userRole = useMemo(() => userInfo.role?.type?.name ?? '', [userInfo])
  const [filteredSalesInCharge, setFilteredSalesInCharge] = useState(dataSalesInCharge);
  const [errors, setErrors] = useState({})

  useEffect(() => {
    dispatch(getCustomerInformationAction({ id: customerId, from_date: '', to_date: '' }))
  }, [])

  useEffect(() => {
    if (customerDetail) {
      setCustomerName(customerDetail.customer_name)
      setCompanyName(customerDetail.company_name)
      setPhoneNumber(customerDetail.phone_number)
      setZaloNumber(customerDetail.zalo_number)
      if (Array.isArray(customerDetail.users) && customerDetail.users.length > 0) {
        const selectedSalesIds = customerDetail.users.map(user => user.id);
        const selectedBranchId = customerDetail.users[0].branch?.id;
        const filteredData = dataSalesInCharge.filter(
          (option) => option.branch.id === selectedBranchId
        );
        customerDetail.users.forEach(user => {
          const existsInSalesInCharge = dataSalesInCharge.some(option => option.id === user.id);
          if (!existsInSalesInCharge) {
            filteredData.push({ id: user.id, name: user.name, branch: user.branch });
          }
        });
        setFilteredSalesInCharge(filteredData);
        setSalesInCharge(selectedSalesIds);
      }
      setBranches(customerDetail.address_branches || [])

      if (Array.isArray(customerOfficeAddressDetail) && customerOfficeAddressDetail.length > 0) {
        setOfficeAddresses(customerOfficeAddressDetail)
      }
      if (Array.isArray(customerFactoryAddressDetail) && customerFactoryAddressDetail.length > 0) {
        setFactoryAddresses(customerFactoryAddressDetail)
      }
      if (customerDetail.address_offices && customerDetail.address_offices.length > 0) {
        handleSetDataOfficeAddress(customerDetail.address_offices)
      }
      if (customerDetail.address_factories && customerDetail.address_factories.length > 0) {
        handleSetDataFactoryAddress(customerDetail.address_factories)
      }
    }
  }, [customerDetail])

  useEffect(() => {
    if (updateCustomerSuccessFlag) {
      navigate(-1)
      dispatch(removeMessageErrorAction())
    }
  }, [updateCustomerSuccessFlag])

  const handleSetDataOfficeAddress = (data) => {
    if (data) {
      setListDistrictOffice(data.map((value) => ({ id: value.address.district.id, data: value.district_list })))
      setListWardOffice(data.map((value) => ({ id: value.address.ward.id, data: value.ward_list })))
    }
  }
  const handleSetDataFactoryAddress = (data) => {
    if (data) {
      setListDistrictFactory(data.map((value) => ({ id: value.address.district.id, data: value.district_list })))
      setListWardFactory(data.map((value) => ({ id: value.address.ward.id, data: value.ward_list })))
    }
  }

  useEffect(() => {
    if (dataDistrictOffice.length > 0) {
      const updateDataDistrictIfSameId = listDistrictOffice.map((district) => {
        if (district?.id === indexDistrictOffice) {
          return { id: district?.id, data: dataDistrictOffice }
        } else {
          return { id: district?.id, data: district?.data }
        }
      })
      setListDistrictOffice(updateDataDistrictIfSameId)
    }
  }, [dataDistrictOffice, indexDistrictOffice])

  useEffect(() => {
    if (dataWardOffice.length > 0) {
      const updateDataWardIfSameId = listWardOffice.map((ward) => {
        if (ward?.id === indexWardOffice) {
          return { id: ward?.id, data: dataWardOffice }
        } else {
          return { id: ward?.id, data: ward?.data }
        }
      })
      setListWardOffice(updateDataWardIfSameId)
    }
  }, [dataWardOffice, indexWardOffice])

  useEffect(() => {
    if (dataDistrictFactory.length > 0) {
      const updateDataDistrictIfSameId = listDistrictFactory.map((district) => {
        if (district?.id === indexDistrictFactory) {
          return { id: district?.id, data: dataDistrictFactory }
        } else {
          return { id: district?.id, data: district?.data }
        }
      })
      setListDistrictFactory(updateDataDistrictIfSameId)
    }
  }, [dataDistrictFactory, indexDistrictFactory])

  useEffect(() => {
    if (dataWardFactory.length > 0) {
      const updateDataWardIfSameId = listWardFactory.map((ward) => {
        if (ward?.id === indexWardFactory) {
          return { id: ward?.id, data: dataWardFactory }
        } else {
          return { id: ward?.id, data: ward?.data }
        }
      })
      setListWardFactory(updateDataWardIfSameId)
    }
  }, [dataWardFactory, indexWardFactory])

  const onChangeProvinceOffice = useCallback((value) => {
    dispatch(setGetListDistrictOfficeFlagAction(true))
    dispatch(getListDistrictByProvinceIdAction(value))
  }, [])

  const onChangeDistrictOffice = useCallback((value) => {
    dispatch(setGetListWardOfficeFlagAction(true))
    dispatch(getListWardByDistrictIdAction(value))
  }, [])

  const onChangeProvinceFactory = useCallback((value) => {
    dispatch(setGetListDistrictFactoryFlagAction(true))
    dispatch(getListDistrictByProvinceIdAction(value))
  }, [])

  const onChangeDistrictFactory = useCallback((value) => {
    dispatch(setGetListWardFactoryFlagAction(true))
    dispatch(getListWardByDistrictIdAction(value))
  }, [])

  const handleUpdate = useCallback((params) => {
    dispatch(updateCustomerAction(params))
  }, [])

  const handleUpdateBranches = (index, field, value) => {
    let updatedBranches = [...branches]
    let updatedAddress = { ...updatedBranches[index] }
    updatedAddress[field] = value || ''
    updatedBranches[index] = updatedAddress
    setBranches(updatedBranches)
  }

  const handleAddBranch = () => {
    if (branches.length < commons.MAX_BRANCH_COUNT) {
      setBranches([...branches, { address_branch_name: '' }])
    }
  }

  const handleRemoveBranch = (index) => {
    const updatedBranches = [...branches]
    updatedBranches.splice(index, 1)
    setBranches(updatedBranches)
  }

  const handleAddOfficeAddress = (index) => {
    if (officeAddresses.length < commons.MAX_ADDRESS_COUNT) {
      setOfficeAddresses([...officeAddresses, { province_id: '', district_id: '', ward_id: '', detail: '' }])
      setListDistrictOffice([...listDistrictOffice, { id: index + 1, data: [] }])
      setListWardOffice([...listWardOffice, { id: index + 1, data: [] }])
    }
  }

  const handleRemoveOfficeAddress = (index) => {
    const updatedOfficeAddresses = [...officeAddresses]
    updatedOfficeAddresses.splice(index, 1)

    const updateListDistrictOffice = [...listDistrictOffice]
    const updateListWardOffice = [...listWardOffice]

    if (index >= 0 && index < updateListDistrictOffice.length) {
      updateListDistrictOffice.splice(index, 1)
      updateListDistrictOffice.forEach((item, index) => (item.id = index))
    }

    if (index >= 0 && index < updateListWardOffice.length) {
      updateListWardOffice.splice(index, 1)
      updateListWardOffice.forEach((item, index) => (item.id = index))
    }

    setListDistrictOffice(updateListDistrictOffice)
    setListWardOffice(updateListWardOffice)
    setOfficeAddresses(updatedOfficeAddresses)
  }
  const handleUpdateOfficeAddress = (index, field, value) => {
    let updatedOfficeAddresses = [...officeAddresses]
    let updatedAddress = { ...updatedOfficeAddresses[index] }
    updatedAddress[field] = value || ''
    updatedOfficeAddresses[index] = updatedAddress
    setOfficeAddresses(updatedOfficeAddresses)
  }

  const handleOfficeAddressChange = (index, field, value) => {
    let updatedOfficeAddresses = [...officeAddresses]
    if (value) {
      let updatedAddress = { ...updatedOfficeAddresses[index] }
      updatedAddress[field] = value
      if (field === 'province_id') {
        updatedAddress['district_id'] = ''
        updatedAddress['ward_id'] = ''
      }
      updatedOfficeAddresses[index] = updatedAddress
      setOfficeAddresses(updatedOfficeAddresses)
      onChangeProvinceOffice(value)
      setIndexDistrictOffice(index)
      setIndexWardOffice(index)
    } else {
      updatedOfficeAddresses[index][field] = ''
      updatedOfficeAddresses[index]['district_id'] = ''
      updatedOfficeAddresses[index]['ward_id'] = ''
      setOfficeAddresses(updatedOfficeAddresses)
      setIndexDistrictOffice(index)
      setIndexWardOffice(index)
    }
  }

  const handleOfficeAddressChangeDistrict = (index, field, value) => {
    let updatedOfficeAddresses = [...officeAddresses]
    if (value !== undefined && value !== null) {
      let updatedAddress = { ...updatedOfficeAddresses[index] }
      updatedAddress[field] = value
      if (field === 'district_id') {
        updatedAddress['ward_id'] = ''
      }
      updatedOfficeAddresses[index] = updatedAddress
      setOfficeAddresses(updatedOfficeAddresses)
      onChangeDistrictOffice(value)
      setIndexWardOffice(index)
    } else {
      updatedOfficeAddresses[index][field] = ''
      if (field === 'district_id') {
        updatedOfficeAddresses[index]['ward_id'] = ''
      }
      setOfficeAddresses(updatedOfficeAddresses)
      setIndexWardOffice(index)
    }
  }

  const handleAddFactoryAddress = (index) => {
    if (factoryAddresses.length < commons.MAX_ADDRESS_COUNT) {
      setFactoryAddresses([...factoryAddresses, { province_id: '', district_id: '', ward_id: '', detail: '' }])
      setListDistrictFactory([...listDistrictFactory, { id: index + 1, data: [] }])
      setListWardFactory([...listWardFactory, { id: index + 1, data: [] }])
    }
  }

  const handleRemoveFactoryAddress = (index) => {
    const updatedFactoryAddresses = [...factoryAddresses]
    updatedFactoryAddresses.splice(index, 1)

    const updateListDistrictFactory = [...listDistrictFactory]
    const updateListWardFactory = [...listWardFactory]

    if (index >= 0 && index < updateListDistrictFactory.length) {
      updateListDistrictFactory.splice(index, 1)
      updateListDistrictFactory.forEach((item, index) => (item.id = index))
    }
    if (index >= 0 && index < updateListWardFactory.length) {
      updateListWardFactory.splice(index, 1)
      updateListWardFactory.forEach((item, index) => (item.id = index))
    }
    setListDistrictFactory(updateListDistrictFactory)
    setListWardFactory(updateListWardFactory)
    setFactoryAddresses(updatedFactoryAddresses)
  }

  const handleUpdateFactoryAddress = (index, field, value) => {
    let updatedFactoryAddresses = [...factoryAddresses]
    let updatedAddress = { ...updatedFactoryAddresses[index] }
    updatedAddress[field] = value || ''
    updatedFactoryAddresses[index] = updatedAddress
    setFactoryAddresses(updatedFactoryAddresses)
  }

  const handleFactoryAddressChange = (index, field, value) => {
    let updatedFactoryAddresses = [...factoryAddresses]
    if (value) {
      let updatedAddress = { ...updatedFactoryAddresses[index] }
      updatedAddress[field] = value
      if (field === 'province_id') {
        updatedAddress['district_id'] = ''
        updatedAddress['ward_id'] = ''
      }
      updatedFactoryAddresses[index] = updatedAddress
      setFactoryAddresses(updatedFactoryAddresses)
      onChangeProvinceFactory(value)
      setIndexDistrictFactory(index)
      setIndexWardFactory(index)
    } else {
      updatedFactoryAddresses[index][field] = ''
      updatedFactoryAddresses[index]['district_id'] = ''
      updatedFactoryAddresses[index]['ward_id'] = ''
      setFactoryAddresses(updatedFactoryAddresses)
      setIndexDistrictFactory(index)
      setIndexWardFactory(index)
    }
  }

  const handleFactoryAddressChangeDistrict = (index, field, value) => {
    let updatedFactoryAddresses = [...factoryAddresses]
    if (value !== undefined && value !== null) {
      let updatedAddress = { ...updatedFactoryAddresses[index] }
      updatedAddress[field] = value
      if (field === 'district_id') {
        updatedAddress['ward_id'] = ''
      }
      updatedFactoryAddresses[index] = updatedAddress
      setFactoryAddresses(updatedFactoryAddresses)
      onChangeDistrictFactory(value)
      setIndexWardFactory(index)
    } else {
      updatedFactoryAddresses[index][field] = ''
      if (field === 'district_id') {
        updatedFactoryAddresses[index]['ward_id'] = ''
      }
      setFactoryAddresses(updatedFactoryAddresses)
      setIndexWardFactory(index)
    }
  }

  const handleSubmit = () => {
    const customer = {
      id: customerId,
      customer_name: customerName,
      company_name: companyName,
      phone_number: phoneNumber,
      zalo_number: zaloNumber,
      user_ids: salesInCharge,
      address_branches: branches,
      address_offices: officeAddresses.map((address) => ({
        ...address,
        province_id: parseInt(address.province_id),
        district_id: parseInt(address.district_id),
        ward_id: parseInt(address.ward_id)
      })),
      address_factories: factoryAddresses.map((address) => ({
        ...address,
        province_id: parseInt(address.province_id),
        district_id: parseInt(address.district_id),
        ward_id: parseInt(address.ward_id)
      }))
    }

    const validate = validateCustomer(customer, t, userRole, isSuperAdmin)
    setErrors(validate)

    if (isEmpty(validate)) {
      handleUpdate(customer)
    }
  }

  const handleSalesInCharge = (event, value) => {
    if (value.length > 0) {
      const selectedBranchId = value[0].branch.id;
      const filteredData = dataSalesInCharge.filter(option => option.branch.id === selectedBranchId);
      const newFilteredSalesInCharge = filteredSalesInCharge.filter(item => item.branch.id === selectedBranchId);
      const uniqueFilteredData = [
        ...newFilteredSalesInCharge,
        ...filteredData.filter(item => !newFilteredSalesInCharge.some(existing => existing.id === item.id))
      ];
      setFilteredSalesInCharge(uniqueFilteredData);
      const selectedIds = value.map((option) => option.id);
      setSalesInCharge(selectedIds);
    } else {
      setFilteredSalesInCharge(dataSalesInCharge);
      const selectedIds = value.map((option) => option.id);
      setSalesInCharge(selectedIds);
    }
  };

  const salesInCharges = useMemo(() => {
    if (!dataSalesInCharge || !salesInCharge) {
      return [];
    }
    return dataSalesInCharge.filter((option) => salesInCharge.includes(option.id))
  }, [dataSalesInCharge, salesInCharge])

  return (
    <div>
      <HeaderPage title={t('editCustomer')} />
      <Box m={1} sx={{ backgroundColor: '#fff', borderRadius: '16px' }} className="order-container">
        <Box px={2} py={1}>
          <InputLabel required className="requiredTextField inputLabel-modal">
            {t('customerName')}
          </InputLabel>
          <TextField
            value={customerName}
            size="small"
            error={Boolean(getErrorMessageByName(errors, 'customer_name'))}
            helperText={getErrorMessageByName(errors, 'customer_name') ?? ''}
            fullWidth
            placeholder={t('enterCustomerName')}
            onChange={(e) => setCustomerName(e.target.value)}
            id={errorMessageCustomerName ? 'outlined-error-helper-text' : 'outlined-required'}
            InputProps={{
              classes: {
                root: 'custom-input-search'
              }
            }}
          />
          <InputLabel required className="requiredTextField inputLabel-modal">
            {t('companyName')}
          </InputLabel>
          <TextField
            value={companyName}
            size="small"
            error={Boolean(getErrorMessageByName(errors, 'company_name'))}
            helperText={getErrorMessageByName(errors, 'company_name') ?? ''}
            fullWidth
            placeholder={t('enterCompanyName')}
            id={errorMessageCompanyName ? 'outlined-error-helper-text' : 'outlined-required'}
            onChange={(e) => setCompanyName(e.target.value)}
            InputProps={{
              classes: {
                root: 'custom-input-search'
              }
            }}
          />
          <InputLabel required className="requiredTextField inputLabel-modal">
            {t('phoneNumber')}
          </InputLabel>
          <TextField
            value={phoneNumber}
            size="small"
            fullWidth
            error={Boolean(getErrorMessageByName(errors, 'phone_number'))}
            helperText={getErrorMessageByName(errors, 'phone_number') ?? ''}
            id={errorMessagePhoneNumber ? 'outlined-error-helper-text' : 'outlined-required'}
            placeholder={t('enterPhoneNumber')}
            onChange={(e) => setPhoneNumber(e.target.value)}
            InputProps={{
              classes: {
                root: 'custom-input-search'
              }
            }}
          />

          <InputLabel className="inputLabel-modal">{t('zaloNumber')}</InputLabel>
          <TextField
            value={zaloNumber}
            size="small"
            error={Boolean(getErrorMessageByName(errors, 'zalo_number'))}
            helperText={getErrorMessageByName(errors, 'zalo_number') ?? ''}
            id={errorMessageZaloNumber ? 'outlined-error-helper-text' : 'outlined-required'}
            fullWidth
            placeholder={t('enterZaloNumber')}
            onChange={(e) => setZaloNumber(e.target.value)}
            InputProps={{
              classes: {
                root: 'custom-input-search'
              }
            }}
          />
          {branches.map((branch, index) => (
            <React.Fragment key={index}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                <InputLabel required className="requiredTextField inputLabel-modal" sx={{ mt: 1 }}>
                  {`${t('branch')} ${index + 1}`}
                </InputLabel>
                {branches.length !== commons.MAX_BRANCH_COUNT && index === branches.length - 1 && (
                  <AddCircleIcon fontSize="medium" onClick={handleAddBranch} className="addIcon" />
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Box mt={0.5}>
                    <TextField
                      size="small"
                      error={Boolean(getErrorMessageByName(errors, 'address_branches')[index]?.address_branch_name)}
                      helperText={getErrorMessageByName(errors, 'address_branches')[index]?.address_branch_name ?? ''}
                      onChange={(e) => handleUpdateBranches(index, 'address_branch_name', e.target.value)}
                      fullWidth
                      value={branch.address_branch_name || ''}
                      placeholder={t('branchName')}
                      InputProps={{
                        classes: {
                          root: 'custom-input-search'
                        }
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  {branches.length > 1 && (
                    <RemoveCircleIcon
                      fontSize="medium"
                      onClick={() => handleRemoveBranch(index)}
                      className="removeIcon"
                    />
                  )}
                </Box>
              </Box>
            </React.Fragment>
          ))}

          {officeAddresses.map((officeAddress, index) => (
            <React.Fragment key={index}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                <Typography className="inputLabel-modal" sx={{ mt: 1 }}>
                  {`${t('officeAddress')} ${index + 1}`}
                </Typography>
                {officeAddresses.length !== commons.MAX_ADDRESS_COUNT && index === officeAddresses.length - 1 && (
                  <AddCircleIcon fontSize="medium" onClick={() => handleAddOfficeAddress(index)} className="addIcon" />
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Box mt={0.5}>
                    <Autocomplete
                      popupIcon={<PolygonIcon />}
                      options={dataProvince ?? []}
                      getOptionLabel={(option) => option.province_name}
                      value={
                        officeAddress.province_id
                          ? dataProvince.find((province) => province.id === officeAddress.province_id)
                          : null
                      }
                      onChange={(e, newValue) => {
                        handleOfficeAddressChange(index, 'province_id', newValue?.id ?? '')
                      }}
                      size="small"
                      fullWidth
                      renderInput={(params) => <TextField {...params} variant="outlined" placeholder={t('city')} />}
                      ListboxProps={{
                        sx: {
                          maxHeight: 220,
                          fontSize: '12px'
                        }
                      }}
                      classes={{
                        inputRoot: 'custom-input-search'
                      }}
                    />
                  </Box>
                  <Box mt={0.5}>
                    <Autocomplete
                      popupIcon={<PolygonIcon />}
                      options={(() => {
                        let state = []
                        if (officeAddress.province_id) {
                          state = listDistrictOffice[index].data
                        }
                        return state
                      })()}
                      getOptionLabel={(option) => option.district_name}
                      value={
                        officeAddress.district_id
                          ? listDistrictOffice[index].data.find(
                            (district) => district.id === officeAddress.district_id
                          ) || null
                          : null
                      }
                      noOptionsText={
                        !officeAddress[index]?.province_id && (
                          <span
                            style={{
                              color: colors.grayColor
                            }}
                          >
                            {t('pleaseSelectCityProvinceFirst')}
                          </span>
                        )
                      }
                      onChange={(e, newValue) => {
                        handleOfficeAddressChangeDistrict(index, 'district_id', newValue?.id ?? '')
                      }}
                      size="small"
                      fullWidth
                      renderInput={(params) => <TextField {...params} variant="outlined" placeholder={t('district')} />}
                      ListboxProps={{
                        sx: {
                          maxHeight: 220,
                          fontSize: '12px'
                        }
                      }}
                      classes={{
                        inputRoot: 'custom-input-search'
                      }}
                    />
                  </Box>
                  <Box mt={0.5}>
                    <Autocomplete
                      popupIcon={<PolygonIcon />}
                      options={(() => {
                        let state = []
                        if (officeAddress.district_id) {
                          state = listWardOffice[index].data
                        }
                        return state
                      })()}
                      getOptionLabel={(option) => option.ward_name}
                      value={
                        officeAddress.ward_id
                          ? listWardOffice[index].data.find((ward) => ward.id === officeAddress.ward_id) || null
                          : null
                      }
                      noOptionsText={
                        !officeAddress[index]?.district_id && (
                          <span
                            style={{
                              color: colors.grayColor
                            }}
                          >
                            {t('pleaseSelectDistrictFirst')}
                          </span>
                        )
                      }
                      onChange={(e, newValue) => {
                        handleUpdateOfficeAddress(index, 'ward_id', newValue?.id ?? '')
                      }}
                      size="small"
                      fullWidth
                      renderInput={(params) => <TextField {...params} variant="outlined" placeholder={t('ward')} />}
                      ListboxProps={{
                        sx: {
                          maxHeight: 220,
                          fontSize: '12px'
                        }
                      }}
                      classes={{
                        inputRoot: 'custom-input-search'
                      }}
                    />
                  </Box>

                  <Box mt={0.5}>
                    <TextField
                      size="small"
                      onChange={(e) => handleUpdateOfficeAddress(index, 'detail', e.target.value)}
                      fullWidth
                      value={officeAddress.detail || ''}
                      placeholder={t('specificOfficeAddress')}
                      InputProps={{
                        classes: {
                          root: 'custom-input-search'
                        }
                      }}
                    />
                  </Box>
                </Box>

                <Box>
                  {officeAddresses.length > 1 && (
                    <RemoveCircleIcon
                      fontSize="medium"
                      onClick={() => handleRemoveOfficeAddress(index)}
                      className="removeIcon"
                    />
                  )}
                </Box>
              </Box>
            </React.Fragment>
          ))}

          {factoryAddresses.map((factoryAddress, index) => (
            <React.Fragment key={index}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                <Typography className="inputLabel-modal" sx={{ mt: 1, mr: 1 }}>
                  {`${t('factoryAddress')} ${index + 1}`}
                </Typography>
                {factoryAddresses.length !== commons.MAX_ADDRESS_COUNT && index === factoryAddresses.length - 1 && (
                  <AddCircleIcon fontSize="medium" onClick={() => handleAddFactoryAddress(index)} className="addIcon" />
                )}
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Box mt={0.5}>
                    <Autocomplete
                      popupIcon={<PolygonIcon />}
                      options={dataProvince ?? []}
                      getOptionLabel={(option) => option.province_name}
                      value={
                        factoryAddress.province_id
                          ? dataProvince.find((province) => province.id === factoryAddress.province_id)
                          : null
                      }
                      onChange={(e, newValue) => {
                        handleFactoryAddressChange(index, 'province_id', newValue?.id ?? '')
                      }}
                      size="small"
                      fullWidth
                      renderInput={(params) => <TextField {...params} variant="outlined" placeholder={t('city')} />}
                      ListboxProps={{
                        sx: {
                          maxHeight: 220,
                          fontSize: '12px'
                        }
                      }}
                      classes={{
                        inputRoot: 'custom-input-search'
                      }}
                    />
                  </Box>
                  <Box mt={0.5}>
                    <Autocomplete
                      popupIcon={<PolygonIcon />}
                      options={(() => {
                        let state = []
                        if (factoryAddress.province_id) {
                          state = listDistrictFactory[index].data
                        }
                        return state
                      })()}
                      getOptionLabel={(option) => option.district_name}
                      value={
                        factoryAddress.district_id
                          ? listDistrictFactory[index].data.find(
                            (district) => district.id === factoryAddress.district_id
                          ) || null
                          : null
                      }
                      noOptionsText={
                        !factoryAddress[index]?.province_id && (
                          <span
                            style={{
                              color: colors.grayColor
                            }}
                          >
                            {t('pleaseSelectCityProvinceFirst')}
                          </span>
                        )
                      }
                      onChange={(e, newValue) => {
                        handleFactoryAddressChangeDistrict(index, 'district_id', newValue?.id ?? '')
                      }}
                      size="small"
                      fullWidth
                      renderInput={(params) => <TextField {...params} variant="outlined" placeholder={t('district')} />}
                      ListboxProps={{
                        sx: {
                          maxHeight: 220,
                          fontSize: '12px'
                        }
                      }}
                      classes={{
                        inputRoot: 'custom-input-search'
                      }}
                    />
                  </Box>
                  <Box mt={0.5}>
                    <Autocomplete
                      popupIcon={<PolygonIcon />}
                      options={(() => {
                        let state = []
                        if (factoryAddress.district_id) {
                          state = listWardFactory[index].data
                        }
                        return state
                      })()}
                      getOptionLabel={(option) => option.ward_name}
                      value={
                        factoryAddress.ward_id
                          ? listWardFactory[index].data.find((ward) => ward.id === factoryAddress.ward_id) || null
                          : null
                      }
                      noOptionsText={
                        !factoryAddress[index]?.district_id && (
                          <span
                            style={{
                              color: colors.grayColor
                            }}
                          >
                            {t('pleaseSelectDistrictFirst')}
                          </span>
                        )
                      }
                      onChange={(e, newValue) => {
                        handleUpdateFactoryAddress(index, 'ward_id', newValue?.id ?? '')
                      }}
                      size="small"
                      fullWidth
                      renderInput={(params) => <TextField {...params} variant="outlined" placeholder={t('ward')} />}
                      ListboxProps={{
                        sx: {
                          maxHeight: 220,
                          fontSize: '12px'
                        }
                      }}
                      classes={{
                        inputRoot: 'custom-input-search'
                      }}
                    />
                  </Box>

                  <Box mt={0.5}>
                    <TextField
                      size="small"
                      onChange={(e) => handleUpdateFactoryAddress(index, 'detail', e.target.value)}
                      fullWidth
                      value={factoryAddress.detail || ''}
                      placeholder={t('specificFactoryAddress')}
                      InputProps={{
                        classes: {
                          root: 'custom-input-search'
                        }
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  {factoryAddresses.length > 1 && (
                    <RemoveCircleIcon
                      fontSize="medium"
                      onClick={() => handleRemoveFactoryAddress(index)}
                      className="removeIcon"
                    />
                  )}
                </Box>
              </Box>
            </React.Fragment>
          ))}

          <Box sx={{ display: 'flex', gap: '8px' }}>
            <Box flex={1}>
              {(isSuperAdmin || isCanShowAllCustomers(userRole)) && (
                <>
                  <InputLabel required className="requiredTextField inputLabel-modal">
                    {t('salesInCharge')}
                  </InputLabel>
                  <Autocomplete
                    multiple
                    size="small"
                    popupIcon={<PolygonIcon />}
                    noOptionsText={t('noResult')}
                    options={filteredSalesInCharge}
                    value={salesInCharges}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option?.name ?? ''}
                    onChange={handleSalesInCharge}
                    renderOption={(props, option) => (
                      <li {...props}>
                        {option.name}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        placeholder={t('selectPersonInCharge')}
                        InputProps={{
                          ...params.InputProps,
                          classes: {
                            root: 'custom-input-search'
                          }
                        }}
                        error={Boolean(getErrorMessageByName(errors, 'user_id'))}
                        helperText={getErrorMessageByName(errors, 'user_id') ?? ''}
                      />
                    )}
                    sx={{
                      width: '100%',
                      flexGrow: 1,
                    }}
                  />
                </>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'sticky',
            bottom: '0',
            display: 'flex',
            justifyContent: 'center',
            p: '8px 16px',
            bgcolor: colors.paleblueColor,
            zIndex: 1
          }}
        >
          <Button onClick={() => navigate(-1)} className="cancelButton">
            {t('cancel')}
          </Button>
          <Button onClick={handleSubmit} className="confirmButton">
            {t('confirm')}
            <ArrowForwardIcon />
          </Button>
        </Box>
      </Box>
    </div>
  )
}
