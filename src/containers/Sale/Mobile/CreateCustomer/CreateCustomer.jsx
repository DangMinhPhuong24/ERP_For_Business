// @ts-nocheck
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { InputLabel, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import PolygonIcon from '../../../../asset/icon/Polygon.svg'
import HeaderPage from '../../../../components/HeaderPage'
import colors from '../../../../constants/colors'
import commons from '../../../../constants/common'
import {
  getListDistrictByProvinceIdAction,
  getListWardByDistrictIdAction,
  setGetListDistrictFactoryFlagAction,
  setGetListDistrictOfficeFlagAction,
  setGetListWardFactoryFlagAction,
  setGetListWardOfficeFlagAction
} from '../../../../redux/app/app.actions'
import {
  appDistrictFactoryListTempState,
  appDistrictOfficeListTempState,
  appProvinceListState,
  appWardFactoryListTempState,
  appWardOfficeListTempState
} from '../../../../redux/app/app.selectors'
import { SalesInChargeListState } from '../../../../redux/customer/customer.selectors'
import '../../../../resource/style/ModalCustomerStyle.css'
import '../../../../resource/style/common.css'
import {
  getErrorMessageByName,
  isCanShowAllCustomers,
  useRoleCheck,
  validateCustomer
} from 'utils'
import { isEmpty } from 'lodash'

export default function CreateCustomer(props) {
  const { onSubmit, createSuccessFlag, removeMessageError, dataBack, onSwitchToCustomerHandbook } = props
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { isSuperAdmin, userInfo } = useRoleCheck();
  const userRole = useMemo(() => userInfo.role?.type?.name ?? '', [userInfo])
  const dataSalesInCharge = useSelector(SalesInChargeListState)
  const dataProvince = useSelector(appProvinceListState)
  const dataDistrictOffice = useSelector(appDistrictOfficeListTempState)
  const dataWardOffice = useSelector(appWardOfficeListTempState)
  const dataDistrictFactory = useSelector(appDistrictFactoryListTempState)
  const dataWardFactory = useSelector(appWardFactoryListTempState)

  const [addresses, setAddresses] = useState([{ province_id: '', district_id: '', ward_id: '' }])
  const [factoryAddresses, setFactoryAddresses] = useState([{ province_id: '', district_id: '', ward_id: '' }])
  const [branches, setBranches] = useState([{ address_branch_name: '' }])

  const [indexDistrictOffice, setIndexDistrictOffice] = useState('')
  const [indexWardOffice, setIndexWardOffice] = useState('')
  const [indexDistrictFactory, setIndexDistrictFactory] = useState('')
  const [indexWardFactory, setIndexWardFactory] = useState('')
  const [filteredSalesInCharge, setFilteredSalesInCharge] = useState(dataSalesInCharge);
  const [listDistrictFactory, setListDistrictFactory] = useState([{ id: 0, data: [] }])
  const [listWardFactory, setListWardFactory] = useState([{ id: 0, data: [] }])
  const [listDistrictOffice, setListDistrictOffice] = useState([{ id: 0, data: [] }])
  const [listWardOffice, setListWardOffice] = useState([{ id: 0, data: [] }])
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [zaloNumber, setZaloNumber] = useState('')
  const [debtLimit, setDebtLimit] = useState('')
  const [debtAge, setDebtAge] = useState('')
  const [salesInCharge, setSalesInCharge] = useState([])
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (createSuccessFlag) {
      setErrors({})
      setAddresses([{ province_id: '', district_id: '', ward_id: '' }])
      setFactoryAddresses([{ province_id: '', district_id: '', ward_id: '' }])
      setBranches([{ address_branch_name: '' }])
      setCompanyName('')
      setCustomerName('')
      setDebtAge('')
      setDebtLimit('')
      setPhoneNumber('')
      setSalesInCharge([])
      setZaloNumber('')
      removeMessageError()
    }
  }, [createSuccessFlag, removeMessageError])

  useEffect(() => {
    if (dataBack) {
      setCustomerName(dataBack.customer_name)
      setPhoneNumber(dataBack.phone_number)
      setCompanyName(dataBack.company_name)
      setZaloNumber(dataBack.zalo_number)
      setDebtLimit(dataBack.debt_limit)
      setDebtAge(dataBack.debtAge)
      setSalesInCharge(dataBack.user_ids)
      if ((dataBack.user_ids).length > 0) {
        const selectedIds = dataSalesInCharge.filter((option) => option.id === dataBack.user_ids[0]);
        const selectedBranchId = selectedIds[0].branch?.id;
        const filteredData = dataSalesInCharge.filter(
          (option) => option.branch.id === selectedBranchId
        );
        setFilteredSalesInCharge(filteredData);
      }
      setBranches(dataBack.address_branches)
      setAddresses(dataBack.address_offices)
      setFactoryAddresses(dataBack.address_factories)
    }
  }, [dataBack])

  const onChangeProvinceOffice = useCallback((value) => {
    dispatch(setGetListDistrictOfficeFlagAction(true))
    dispatch(getListDistrictByProvinceIdAction(value))
  })

  const onChangeDistrictOffice = useCallback((value) => {
    dispatch(setGetListWardOfficeFlagAction(true))
    dispatch(getListWardByDistrictIdAction(value))
  })

  const onChangeProvinceFactory = useCallback((value) => {
    dispatch(setGetListDistrictFactoryFlagAction(true))
    dispatch(getListDistrictByProvinceIdAction(value))
  })

  const onChangeDistrictFactory = useCallback((value) => {
    dispatch(setGetListWardFactoryFlagAction(true))
    dispatch(getListWardByDistrictIdAction(value))
  })

  useEffect(() => {
    if (dataDistrictFactory && dataDistrictFactory.length > 0) {
      const updateDataDistrictIfSameId = listDistrictFactory.map((district) => {
        if (district?.id === indexDistrictFactory) {
          return { id: district?.id, data: dataDistrictFactory }
        } else {
          return { id: district?.id, data: district?.data }
        }
      })
      setListDistrictFactory(updateDataDistrictIfSameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDistrictFactory, indexDistrictFactory])

  useEffect(() => {
    if (dataWardFactory && dataWardFactory.length > 0) {
      const updateDataWardIfSameId = listWardFactory.map((ward) => {
        if (ward?.id === indexWardFactory) {
          return { id: ward?.id, data: dataWardFactory }
        } else {
          return { id: ward?.id, data: ward?.data }
        }
      })
      setListWardFactory(updateDataWardIfSameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataWardFactory, indexWardFactory])

  useEffect(() => {
    if (dataDistrictOffice && dataDistrictOffice.length > 0) {
      const updateDataDistrictIfSameId = listDistrictOffice.map((district) => {
        if (district?.id === indexDistrictOffice) {
          return { id: district?.id, data: dataDistrictOffice }
        } else {
          return { id: district?.id, data: district?.data }
        }
      })
      setListDistrictOffice(updateDataDistrictIfSameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDistrictOffice, indexDistrictOffice])

  useEffect(() => {
    if (dataWardOffice && dataWardOffice.length > 0) {
      const updateDataWardIfSameId = listWardOffice.map((ward) => {
        if (ward?.id === indexWardOffice) {
          return { id: ward?.id, data: dataWardOffice }
        } else {
          return { id: ward?.id, data: ward?.data }
        }
      })
      setListWardOffice(updateDataWardIfSameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataWardOffice, indexWardOffice])

  const handleAddAddress = () => {
    if (addresses.length < commons.MAX_ADDRESS_COUNT) {
      setAddresses([...addresses, { province_id: '', district_id: '', ward_id: '' }])
    }
  }

  const handleRemoveAddress = (index) => {
    const updatedAddresses = [...addresses]
    updatedAddresses.splice(index, 1)

    setAddresses(updatedAddresses)
  }

  const handleAddressChange = (index, field, value) => {
    if (value) {
      const updatedAddresses = [...addresses]
      updatedAddresses[index][field] = value
      setAddresses(updatedAddresses)
      onChangeProvinceOffice(value)
      updatedAddresses[index]['district_id'] = ''
      updatedAddresses[index]['ward_id'] = ''
      setIndexDistrictOffice(index)
    } else {
      const updatedAddresses = [...addresses]
      updatedAddresses[index][field] = ''
      updatedAddresses[index]['district_id'] = ''
      updatedAddresses[index]['ward_id'] = ''
      setAddresses(updatedAddresses)
      setIndexDistrictOffice(index)
      setIndexWardOffice(index)
    }
  }

  const handleAddressChangeDistrict = (index, field, value) => {
    if (value) {
      const updatedAddresses = [...addresses]
      updatedAddresses[index][field] = value
      setAddresses(updatedAddresses)
      onChangeDistrictOffice(value)
      updatedAddresses[index]['ward_id'] = ''
      setIndexWardOffice(index)
    } else {
      const updatedAddresses = [...addresses]
      updatedAddresses[index][field] = ''
      updatedAddresses[index]['ward_id'] = ''
      setAddresses(updatedAddresses)
      setIndexWardOffice(index)
    }
  }

  const handleAddressUpdate = (index, field, value) => {
    if (value) {
      const updatedAddresses = [...addresses]
      updatedAddresses[index][field] = value
      setAddresses(updatedAddresses)
    } else {
      const updatedAddresses = [...addresses]
      updatedAddresses[index][field] = ''
      setAddresses(updatedAddresses)
    }
  }

  const handleUpdateBranches = (index, field, value) => {
    let updatedBranches = [...branches]
    if (value) {
      updatedBranches[index][field] = value
      setBranches(updatedBranches)
    } else {
      updatedBranches[index][field] = ''
      setBranches(updatedBranches)
    }
  }

  const handleAddBranch = () => {
    if (addresses.length < commons.MAX_BRANCH_COUNT) {
      setBranches([...branches, { address_branch_name: '' }])
    }
  }

  const handleRemoveBranch = (index) => {
    const updatedBranches = [...branches]
    updatedBranches.splice(index, 1)

    setBranches(updatedBranches)
  }

  const handleAddFactoryAddress = (index) => {
    if (factoryAddresses.length < commons.MAX_BRANCH_COUNT) {
      setFactoryAddresses([...factoryAddresses, { province_id: '', district_id: '', ward_id: '' }])
      setListDistrictFactory([...listDistrictFactory, { id: index + 1, data: [] }])
      setListWardFactory([...listWardFactory, { id: index + 1, data: [] }])
    }
  }

  const salesInCharges = useMemo(() => {
    if (!dataSalesInCharge || !salesInCharge) {
      return [];
    }
    return dataSalesInCharge.filter((option) => salesInCharge.includes(option.id))
  }, [dataSalesInCharge, salesInCharge])

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
    if (value) {
      updatedFactoryAddresses[index][field] = value
      setFactoryAddresses(updatedFactoryAddresses)
    } else {
      updatedFactoryAddresses[index][field] = ''
      setFactoryAddresses(updatedFactoryAddresses)
    }
  }

  const handleFactoryAddressChange = (index, field, value) => {
    let updatedFactoryAddresses = [...factoryAddresses]
    if (value) {
      updatedFactoryAddresses[index][field] = value
      setFactoryAddresses(updatedFactoryAddresses)
      onChangeProvinceFactory(value)
      updatedFactoryAddresses[index]['district_id'] = ''
      updatedFactoryAddresses[index]['ward_id'] = ''
      setIndexDistrictFactory(index)
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
    if (value) {
      updatedFactoryAddresses[index][field] = value
      setFactoryAddresses(updatedFactoryAddresses)
      onChangeDistrictFactory(value)
      updatedFactoryAddresses[index]['ward_id'] = ''
      setIndexWardFactory(index)
    } else {
      updatedFactoryAddresses[index][field] = ''
      updatedFactoryAddresses[index]['ward_id'] = ''
      setFactoryAddresses(updatedFactoryAddresses)
      setIndexWardFactory(index)
    }
  }

  const handleSalesInCharge = (event, value) => {
    if (value.length > 0) {
      const selectedBranchId = value[0].branch.id;
      const filteredData = dataSalesInCharge.filter(
        (option) => option.branch.id === selectedBranchId
      );
      setFilteredSalesInCharge(filteredData);
      const selectedIds = value.map((option) => option.id);
      setSalesInCharge(selectedIds);
    } else {
      setFilteredSalesInCharge(dataSalesInCharge);
      const selectedIds = value.map((option) => option.id);
      setSalesInCharge(selectedIds);
    }
  };

  const handleSubmit = () => {
    const customer = {
      customer_name: customerName,
      phone_number: phoneNumber,
      zalo_number: zaloNumber,
      company_name: companyName,
      debt_limit: debtLimit,
      debtAge: debtAge,
      user_ids: salesInCharge,
      address_offices: addresses,
      address_branches: branches,
      address_factories: factoryAddresses
    }

    const validate = validateCustomer(customer, t, userRole, isSuperAdmin)
    setErrors(validate)

    if (isEmpty(validate)) {
      onSubmit(customer)
      onSwitchToCustomerHandbook()
    }
  }

  return (
    <Box>
      <HeaderPage title={t('addCustomer')} enableButtonNext onSwitchToCustomerHandbook={handleSubmit} />
      <Box m={1} sx={{ backgroundColor: '#fff', borderRadius: '16px' }} className="order-container">
        <Box px={2} py={1}>
          <InputLabel required className="requiredTextField inputLabel-modal">
            {t('customerName')}
          </InputLabel>
          <TextField
            value={customerName}
            size="small"
            fullWidth
            placeholder={t('enterCustomerName')}
            onChange={(e) => setCustomerName(e.target.value)}
            error={Boolean(getErrorMessageByName(errors, 'customer_name'))}
            helperText={getErrorMessageByName(errors, 'customer_name') ?? ''}
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
            fullWidth
            placeholder={t('enterCompanyName')}
            onChange={(e) => setCompanyName(e.target.value)}
            error={Boolean(getErrorMessageByName(errors, 'company_name'))}
            helperText={getErrorMessageByName(errors, 'company_name') ?? ''}
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
              <InputLabel required className="requiredTextField inputLabel-modal" sx={{ mt: 1 }}>
                {`${t('branch')} ${index + 1}`}
              </InputLabel>
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
                      onChange={(e) => handleUpdateBranches(index, 'address_branch_name', e.target.value)}
                      fullWidth
                      error={Boolean(getErrorMessageByName(errors, 'address_branches')[index]?.address_branch_name)}
                      helperText={getErrorMessageByName(errors, 'address_branches')[index]?.address_branch_name ?? ''}
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

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: '3px'
                  }}
                >
                  {branches.length !== commons.MAX_BRANCH_COUNT && index === branches.length - 1 && (
                    <AddCircleIcon fontSize="medium" onClick={handleAddBranch} className="addIcon" />
                  )}
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

          {addresses.map((address, index) => (
            <React.Fragment key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography className="inputLabel-modal" sx={{ mt: 1 }}>
                  {`${t('officeAddress')} ${index + 1}`}
                </Typography>
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
                        address.province_id
                          ? dataProvince.find((province) => province.id === address.province_id)
                          : null
                      }
                      onChange={(e, newValue) => {
                        handleAddressChange(index, 'province_id', newValue?.id ?? '')
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
                      classes={{ inputRoot: 'custom-input-search' }}
                    />
                  </Box>

                  <Box mt={0.5}>
                    <Autocomplete
                      popupIcon={<PolygonIcon />}
                      options={address.province_id ? listDistrictOffice[index].data : []}
                      getOptionLabel={(option) => option.district_name}
                      value={
                        address.district_id
                          ? listDistrictOffice[index].data.find((district) => district.id === address.district_id) ||
                          null
                          : null
                      }
                      noOptionsText={
                        !address[index]?.province_id && (
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
                        handleAddressChangeDistrict(index, 'district_id', newValue?.id ?? '')
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
                      options={address.district_id ? listWardOffice[index].data : []}
                      getOptionLabel={(option) => option.ward_name}
                      value={
                        address.ward_id
                          ? listWardOffice[index].data.find((ward) => ward.id === address.ward_id) || null
                          : null
                      }
                      noOptionsText={
                        !address[index]?.district_id && (
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
                        handleAddressUpdate(index, 'ward_id', newValue?.id ?? '')
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
                      onChange={(e) => handleAddressUpdate(index, 'detail', e.target.value)}
                      fullWidth
                      value={address.detail || ''}
                      placeholder={t('specificAddress')}
                      InputProps={{
                        classes: {
                          root: 'custom-input-search'
                        }
                      }}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: '3px'
                  }}
                >
                  {addresses.length < commons.MAX_ADDRESS_COUNT && index === addresses.length - 1 && (
                    <AddCircleIcon fontSize="medium" onClick={handleAddAddress} className="addIcon" />
                  )}
                  {addresses.length > 1 && (
                    <RemoveCircleIcon
                      fontSize="medium"
                      onClick={() => handleRemoveAddress(index)}
                      className="removeIcon"
                    />
                  )}
                </Box>
              </Box>
            </React.Fragment>
          ))}

          {factoryAddresses.map((factoryAddress, index) => (
            <React.Fragment key={index}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography className="inputLabel-modal" sx={{ mt: 1, mr: 1 }}>
                  {`${t('factoryAddress')} ${index + 1}`}
                </Typography>
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
                      options={factoryAddress.province_id ? listDistrictFactory[index].data : []}
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
                      options={factoryAddress.district_id ? listWardFactory[index].data : []}
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

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    ml: '3px'
                  }}
                >
                  {factoryAddresses.length !== commons.MAX_ADDRESS_COUNT && index === factoryAddresses.length - 1 && (
                    <AddCircleIcon
                      fontSize="medium"
                      onClick={() => handleAddFactoryAddress(index)}
                      className="addIcon"
                    />
                  )}
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
                    width: '93%',
                    flexGrow: 1,
                  }}
                />
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
