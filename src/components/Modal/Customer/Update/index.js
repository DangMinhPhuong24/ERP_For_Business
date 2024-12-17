// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { TextField, InputLabel } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import commons from '../../../../constants/common'
import colors from '../../../../constants/colors'
import Autocomplete from '@mui/material/Autocomplete'
import PolygonIcon from '../../../../asset/icon/Polygon.svg'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { getErrorMessageByName, isCanShowAllCustomers, useRoleCheck, validateCustomer } from '../../../../utils'
import { isEmpty } from 'lodash'
import {formatNumber} from "../../../../common/common";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '648px',
  maxHeight: '572px',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  overflow: 'auto'
}

export default function UpdateCustomerModal({
  open,
  handleClose,
  data,
  nameTitle,
  dataProvince,
  onChangeProvince,
  onChangeDistrict,
  dataDistrict,
  removeMessageError,
  onChangeProvinceOffice,
  onChangeDistrictOffice,
  onChangeProvinceFactory,
  onChangeDistrictFactory,
  dataDistrictOffice,
  dataWardOffice,
  dataDistrictFactory,
  dataWardFactory,
  dataWard,
  dataDebtAge,
  dataSalesInCharge,
  handleUpdate,
  errorsMessage,
  customerOfficeAddressDetailData,
  customerFactoryAddressDetailData
}) {
  const { t } = useTranslation()
  const [indexWardOffice, setIndexWardOffice] = useState('')
  const [indexWardFactory, setIndexWardFactory] = useState('')
  const [branches, setBranches] = useState([{ address_branch_name: '' }])
  const [indexDistrictOffice, setIndexDistrictOffice] = useState('')
  const [indexDistrictFactory, setIndexDistrictFactory] = useState('')
  const [listWardOffice, setListWardOffice] = useState([{ id: 0, data: [] }])
  const [listWardFactory, setListWardFactory] = useState([{ id: 0, data: [] }])
  const [officeAddresses, setOfficeAddresses] = useState([
    { province_id: '', district_id: '', ward_id: '', detail: '' }
  ])
  const [factoryAddresses, setFactoryAddresses] = useState([
    { province_id: '', district_id: '', ward_id: '', detail: '' }
  ])
  const [listDistrictOffice, setListDistrictOffice] = useState([{ id: 0, data: [] }])
  const [listDistrictFactory, setListDistrictFactory] = useState([{ id: 0, data: [] }])
  const [salesInCharge, setSalesInCharge] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [zaloNumber, setZaloNumber] = useState('')
  const [debtLimit, setDebtLimit] = useState('')
  const [debtAge, setDebtAge] = useState('')
  const [errors, setErrors] = useState({})
  const { isSuperAdmin, userInfo } = useRoleCheck()
  const userRole = useMemo(() => userInfo.role?.type?.name ?? '', [userInfo])
  const [filteredSalesInCharge, setFilteredSalesInCharge] = useState(dataSalesInCharge)

  useEffect(() => {
    if (data) {
      setCustomerName(data.customer_name)
      setCompanyName(data.company_name)
      setPhoneNumber(data.phone_number)
      setZaloNumber(data.zalo_number)
      setDebtLimit(data.debt_limit)
      setDebtAge(data.debt_age?.id)
      if (Array.isArray(data.users) && data.users.length > 0) {
        const selectedSalesIds = data.users.map((user) => user.id)
        const selectedBranchId = data.users[0].branch?.id
        const filteredData = dataSalesInCharge.filter((option) => option.branch.id === selectedBranchId)
        data.users.forEach((user) => {
          const existsInSalesInCharge = dataSalesInCharge.some((option) => option.id === user.id)
          if (!existsInSalesInCharge) {
            filteredData.push({ id: user.id, name: user.name, branch: user.branch })
          }
        })
        setFilteredSalesInCharge(filteredData)
        setSalesInCharge(selectedSalesIds)
      }
      if (data.address_branches && data.address_branches.length > 0) {
        const addressBranchArr = data.address_branches.map((value) => ({
          address_branch_name: value.address_branch_name || ''
        }))
        setBranches(addressBranchArr)
      }
      if (Array.isArray(customerOfficeAddressDetailData) && customerOfficeAddressDetailData.length > 0) {
        setOfficeAddresses(customerOfficeAddressDetailData)
      }
      if (Array.isArray(customerFactoryAddressDetailData) && customerFactoryAddressDetailData.length > 0) {
        setFactoryAddresses(customerFactoryAddressDetailData)
      }
      if (data.address_offices && data.address_offices.length > 0) {
        handleSetDataOfficeAddress(data.address_offices)
      }
      if (data.address_factories && data.address_factories.length > 0) {
        handleSetDataFactoryAddress(data.address_factories)
      }
    }
  }, [data, open])

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

  const handleCloseModal = () => {
    removeMessageError()
    setErrors({})
    setOfficeAddresses([{ province_id: '', district_id: '', ward_id: '', detail: '' }])
    setFactoryAddresses([{ province_id: '', district_id: '', ward_id: '', detail: '' }])
    handleClose()
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

  const handleSalesInCharge = (event, value) => {
    if (value.length > 0) {
      const selectedBranchId = value[0].branch.id
      const filteredData = dataSalesInCharge.filter((option) => option.branch.id === selectedBranchId)
      const newFilteredSalesInCharge = filteredSalesInCharge.filter((item) => item.branch.id === selectedBranchId)
      const uniqueFilteredData = [
        ...newFilteredSalesInCharge,
        ...filteredData.filter((item) => !newFilteredSalesInCharge.some((existing) => existing.id === item.id))
      ]
      setFilteredSalesInCharge(uniqueFilteredData)
      const selectedIds = value.map((option) => option.id)
      setSalesInCharge(selectedIds)
    } else {
      setFilteredSalesInCharge(dataSalesInCharge)
      const selectedIds = value.map((option) => option.id)
      setSalesInCharge(selectedIds)
    }
  }

  const salesInCharges = useMemo(() => {
    return filteredSalesInCharge.filter((option) => salesInCharge.includes(option.id))
  }, [filteredSalesInCharge, salesInCharge])

  const handleSubmit = () => {
    const customer = {
      id: data.id,
      customer_name: customerName,
      company_name: companyName,
      phone_number: phoneNumber,
      zalo_number: zaloNumber,
      debt_limit: parseFloat(debtLimit),
      debt_age_id: parseInt(debtAge),
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
    let validate = validateCustomer(customer, t, userRole)
    setErrors(validate)
    if (isEmpty(validate)) {
      handleUpdate(customer)
    }
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={{ ...style }} className="order-container">
            <Box p={2}>
              <Typography className="modalTitle">{nameTitle}</Typography>
              <Box>
                <InputLabel className="inputLabel-modal">
                  {t('customerName')}
                  <span style={{ color: colors.redColor }}> *</span>
                </InputLabel>
                <TextField
                  size="small"
                  sx={{ width: '95%' }}
                  error={Boolean(getErrorMessageByName(errors, 'customer_name'))}
                  helperText={getErrorMessageByName(errors, 'customer_name') ?? ''}
                  fullWidth
                  placeholder={t('enterCustomerName')}
                  value={customerName ? customerName : ''}
                  onChange={(e) => setCustomerName(e.target.value)}
                  InputProps={{
                    classes: {
                      root: 'custom-input-search'
                    }
                  }}
                />
                <InputLabel className="inputLabel-modal">
                  {t('companyName')}
                  <span style={{ color: colors.redColor }}> *</span>
                </InputLabel>
                <TextField
                  size="small"
                  sx={{ width: '95%' }}
                  fullWidth
                  error={Boolean(getErrorMessageByName(errors, 'company_name'))}
                  helperText={getErrorMessageByName(errors, 'company_name')}
                  placeholder={t('enterCompanyName')}
                  value={companyName ? companyName : ''}
                  onChange={(e) => setCompanyName(e.target.value)}
                  InputProps={{
                    classes: {
                      root: 'custom-input-search'
                    }
                  }}
                />
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  <Box flex={1}>
                    <InputLabel className="inputLabel-modal">
                      {t('phoneNumber')}
                      <span style={{ color: colors.redColor }}> *</span>
                    </InputLabel>
                    <TextField
                      size="small"
                      fullWidth
                      error={Boolean(getErrorMessageByName(errors, 'phone_number')) || errorsMessage?.phone_number}
                      helperText={(getErrorMessageByName(errors, 'phone_number') || errorsMessage?.phone_number) ?? ''}
                      placeholder={t('enterPhoneNumber')}
                      value={phoneNumber ? phoneNumber : ''}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      InputProps={{
                        classes: {
                          root: 'custom-input-search'
                        }
                      }}
                    />
                  </Box>
                  <Box flex={1}>
                    <InputLabel className="inputLabel-modal">{t('zaloNumber')}</InputLabel>
                    <TextField
                      size="small"
                      error={Boolean(getErrorMessageByName(errors, 'zalo_number')) || errorsMessage?.zalo_number}
                      helperText={(getErrorMessageByName(errors, 'zalo_number') || errorsMessage?.zalo_number) ?? ''}
                      fullWidth
                      placeholder={t('enterZaloNumber')}
                      value={zaloNumber ? zaloNumber : ''}
                      onChange={(e) => setZaloNumber(e.target.value)}
                      InputProps={{
                        classes: {
                          root: 'custom-input-search'
                        }
                      }}
                    />
                  </Box>
                  <Box flex={0.85}></Box>
                </Box>

                {branches.map((branch, index) => (
                  <React.Fragment key={index}>
                    <InputLabel required className="requiredTextField inputLabel-modal" sx={{ mt: 1 }}>
                      {`${t('branch')} ${index + 1}`}
                    </InputLabel>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0 6px' }}>
                      <Box sx={{ width: '100%' }}>
                        <Box mt={0.5}>
                          <TextField
                            size="small"
                            onChange={(e) => handleUpdateBranches(index, 'address_branch_name', e.target.value)}
                            fullWidth
                            error={Boolean(
                              getErrorMessageByName(errors, 'address_branches')[index]?.address_branch_name
                            )}
                            helperText={
                              getErrorMessageByName(errors, 'address_branches')[index]?.address_branch_name ?? ''
                            }
                            value={branch?.address_branch_name || ''}
                            placeholder={t('branchName')}
                            InputProps={{
                              classes: {
                                root: 'custom-input-search'
                              }
                            }}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                {officeAddresses.map((officeAddress, index) => (
                  <React.Fragment key={index}>
                    <Typography className="inputLabel-modal" sx={{ mt: 1 }}>
                      {`${t('officeAddress')} ${index + 1} `}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0 6px' }}>
                      <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <Box flex={1}>
                            <Autocomplete
                              popupIcon={<PolygonIcon />}
                              options={dataProvince}
                              getOptionLabel={(option) => option.province_name}
                              value={
                                officeAddress.province_id
                                  ? dataProvince.find((province) => province.id === officeAddress.province_id)
                                  : null
                              }
                              onChange={(e, newValue) => {
                                if (newValue) {
                                  handleOfficeAddressChange(index, 'province_id', newValue.id)
                                } else {
                                  handleOfficeAddressChange(index, 'province_id', '')
                                }
                              }}
                              size="small"
                              fullWidth
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder={t('city')} />
                              )}
                              ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                              classes={{ inputRoot: 'custom-input-search' }}
                            />
                          </Box>
                          <Box flex={1}>
                            <Autocomplete
                              popupIcon={<PolygonIcon />}
                              options={(() => {
                                if (officeAddress.province_id) {
                                  return listDistrictOffice[index].data
                                }
                                return []
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
                                  <span style={{ color: colors.grayColor }}>{t('pleaseSelectCityProvinceFirst')}</span>
                                )
                              }
                              onChange={(e, newValue) => {
                                handleOfficeAddressChangeDistrict(index, 'district_id', newValue?.id ?? '')
                              }}
                              size="small"
                              fullWidth
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder={t('district')} />
                              )}
                              ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                              classes={{ inputRoot: 'custom-input-search' }}
                            />
                          </Box>
                          <Box flex={0.7}>
                            <Autocomplete
                              popupIcon={<PolygonIcon />}
                              options={(() => {
                                if (officeAddress.district_id) {
                                  return listWardOffice[index].data
                                }
                                return []
                              })()}
                              getOptionLabel={(option) => option.ward_name}
                              value={
                                officeAddress.ward_id
                                  ? listWardOffice[index].data.find((ward) => ward.id === officeAddress.ward_id) || null
                                  : null
                              }
                              noOptionsText={
                                !officeAddress[index]?.district_id && (
                                  <span style={{ color: colors.grayColor }}>{t('pleaseSelectDistrictFirst')}</span>
                                )
                              }
                              onChange={(e, newValue) => {
                                handleUpdateOfficeAddress(index, 'ward_id', newValue?.id ?? '')
                              }}
                              size="small"
                              fullWidth
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder={t('ward')} />
                              )}
                              ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                              classes={{ inputRoot: 'custom-input-search' }}
                            />
                          </Box>
                        </Box>
                        <Box mt={0.5}>
                          <TextField
                            size="small"
                            onChange={(e) => handleUpdateOfficeAddress(index, 'detail', e.target.value)}
                            fullWidth
                            value={officeAddress.detail || ''}
                            placeholder={t('specificFactoryAddress')}
                            InputProps={{
                              classes: {
                                root: 'custom-input-search'
                              }
                            }}
                          />
                        </Box>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {officeAddresses.length !== commons.MAX_ADDRESS_COUNT &&
                          index === officeAddresses.length - 1 && (
                            <AddCircleIcon
                              fontSize="medium"
                              onClick={() => handleAddOfficeAddress(index)}
                              className="addIcon"
                            />
                          )}
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
                    <Typography className="inputLabel-modal" sx={{ mt: 1 }}>
                      {`${t('factoryAddress')} ${index + 1} `}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '0 6px' }}>
                      <Box sx={{ width: '100%' }}>
                        <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <Box flex={1}>
                            <Autocomplete
                              popupIcon={<PolygonIcon />}
                              options={dataProvince}
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
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder={t('city')} />
                              )}
                              ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                              classes={{ inputRoot: 'custom-input-search' }}
                            />
                          </Box>
                          <Box flex={1}>
                            <Autocomplete
                              popupIcon={<PolygonIcon />}
                              options={(() => {
                                if (factoryAddress.province_id) {
                                  return listDistrictFactory[index].data
                                }
                                return []
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
                                  <span style={{ color: colors.grayColor }}>{t('pleaseSelectCityProvinceFirst')}</span>
                                )
                              }
                              onChange={(e, newValue) => {
                                handleFactoryAddressChangeDistrict(index, 'district_id', newValue?.id ?? '')
                              }}
                              size="small"
                              fullWidth
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder={t('district')} />
                              )}
                              ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                              classes={{ inputRoot: 'custom-input-search' }}
                            />
                          </Box>
                          <Box flex={0.7}>
                            <Autocomplete
                              popupIcon={<PolygonIcon />}
                              options={(() => {
                                if (factoryAddress.district_id) {
                                  return listWardFactory[index].data
                                }
                                return []
                              })()}
                              getOptionLabel={(option) => option.ward_name}
                              value={
                                factoryAddress.ward_id
                                  ? listWardFactory[index].data.find((ward) => ward.id === factoryAddress.ward_id) ||
                                    null
                                  : null
                              }
                              noOptionsText={
                                !factoryAddress[index]?.district_id && (
                                  <span style={{ color: colors.grayColor }}>{t('pleaseSelectDistrictFirst')}</span>
                                )
                              }
                              onChange={(e, newValue) => {
                                handleUpdateFactoryAddress(index, 'ward_id', newValue?.id ?? '')
                              }}
                              size="small"
                              fullWidth
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder={t('ward')} />
                              )}
                              ListboxProps={{ sx: { maxHeight: 220, fontSize: '12px' } }}
                              classes={{ inputRoot: 'custom-input-search' }}
                            />
                          </Box>
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
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {factoryAddresses.length !== commons.MAX_ADDRESS_COUNT &&
                          index === factoryAddresses.length - 1 && (
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

                {(isSuperAdmin || isCanShowAllCustomers(userRole)) && (
                  <>
                    <Box sx={{ display: 'flex', gap: '8px' }}>
                      <Box flex={1}>
                        <InputLabel className="inputLabel-modal">{t('debtLimit')}</InputLabel>
                        <TextField
                          value={debtLimit ? formatNumber(debtLimit) : ''}
                          size="small"
                          fullWidth
                          placeholder={t('enterDebtLimit')}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            setDebtLimit(value ? parseInt(value, 10) : '')
                          }}
                          InputProps={{
                            style: {
                              height: '35px'
                            },
                            classes: {
                              root: 'custom-input-search'
                            }
                          }}
                        />
                      </Box>
                      <Box flex={1}>
                        <>
                          <InputLabel className="inputLabel-modal">{t('debtAge')}</InputLabel>
                          <Autocomplete
                            popupIcon={<PolygonIcon />}
                            size="small"
                            fullWidth
                            value={dataDebtAge.find((item) => item.id === debtAge) || null}
                            options={dataDebtAge}
                            getOptionLabel={(option) => option.debt_age_name}
                            onChange={(event, value) => setDebtAge(value ? value.id : '')}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                variant="outlined"
                                InputProps={{
                                  ...params.InputProps,
                                  classes: {
                                    root: 'custom-input-search'
                                  }
                                }}
                                placeholder={t('selectDebtAge')}
                              />
                            )}
                            ListboxProps={{ sx: { fontSize: '12px' } }}
                          />
                        </>
                      </Box>
                      <Box flex={0.85}></Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: '8px' }}>
                      <Box flex={1}>
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
                            renderOption={(props, option) => <li {...props}>{option.name}</li>}
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
                              width: '95%',
                              flexGrow: 1
                            }}
                          />
                        </>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                position: 'sticky',
                bottom: '0',
                display: 'flex',
                justifyContent: 'flex-end',
                p: '8px 16px',
                bgcolor: colors.paleblueColor,
                zIndex: 1
              }}
            >
              <Button onClick={handleCloseModal} className="cancelButton">
                {t('cancel')}
              </Button>
              <Button variant="contained" onClick={handleSubmit} className="confirmButton">
                {t('confirm')}
                <ArrowForwardIcon />
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
