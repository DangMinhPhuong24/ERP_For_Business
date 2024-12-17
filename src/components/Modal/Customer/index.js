import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'
import { InputLabel, TextField } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import Backdrop from '@mui/material/Backdrop'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import PolygonIcon from '../../../asset/icon/Polygon.svg'
import colors from '../../../constants/colors'
import commons from '../../../constants/common'
import dimensions from '../../../constants/dimensions'
import '../../../resource/style/ModalCustomerStyle.css'
import '../../../resource/style/common.css'
import {getErrorMessageByName, isCanShowAllCustomers, useRoleCheck, validateCustomer} from 'utils'
import { isEmpty } from 'lodash'
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import {formatNumber} from "../../../common/common";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '648px',
  maxHeight: '580px',
  bgcolor: 'background.paper',
  borderRadius: '16px',
  overflow: 'auto'
}

export default function CustomerModal(props) {
  const {
    open,
    nameTitle,
    dataProvince,
    onChangeProvince,
    dataDistrict,
    onChangeDistrict,
    dataWard,
    dataDebtAge,
    dataSalesInCharge,
    handleCreateCustomer,
    createSuccessFlag,
    errorCreateCustomerMessage,
    removeMessageError,
    handleCloseModal,
    dataBack,
    dataDistrictFactory,
    onChangeProvinceFactory,
    dataWardFactory,
    onChangeDistrictFactory
  } = props
  const { t } = useTranslation()
  const [addresses, setAddresses] = useState([{ province_id: '', district_id: '', ward_id: '' }])
  const [factoryAddresses, setFactoryAddresses] = useState([{ province_id: '', district_id: '', ward_id: '' }])
  const [branches, setBranches] = useState([{ address_branch_name: '' }])
  const [indexDistrict, setIndexDistrict] = useState('')
  const [indexWard, setIndexWard] = useState('')
  const [indexDistrictFactory, setIndexDistrictFactory] = useState('')
  const [indexWardFactory, setIndexWardFactory] = useState('')
  const [listDistrictFactory, setListDistrictFactory] = useState([{ idFactory: 0, data: [] }])
  const [listWardFactory, setListWardFactory] = useState([{ idFactory: 0, data: [] }])
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
  const { isSuperAdmin, userInfo } = useRoleCheck();
  const userRole = useMemo(() => userInfo.role?.type?.name ?? '', [userInfo])
  const [filteredSalesInCharge, setFilteredSalesInCharge] = useState(dataSalesInCharge);

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
    const numAddresses = addresses.length
    const modalHeight = dimensions.modal.heightbefore + (numAddresses - 1) * dimensions.modal.size
    const modalStyle = { ...style, height: `${modalHeight}px` }
    setModalStyle(modalStyle)
  }, [addresses])

  useEffect(() => {
    if (dataDistrictFactory.length > 0) {
      const updateDataDistrictIfSameId = listDistrictFactory.map((district) => {
        if (district?.idFactory === indexDistrictFactory) {
          return { idFactory: district?.idFactory, data: dataDistrictFactory }
        } else {
          return { idFactory: district?.idFactory, data: district?.data }
        }
      })
      setListDistrictFactory(updateDataDistrictIfSameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexDistrictFactory, dataDistrictFactory])

  useEffect(() => {
    if (dataWardFactory.length > 0) {
      const updateDataWardIfSameId = listWardFactory.map((ward) => {
        if (ward?.idFactory === indexWardFactory) {
          return { idFactory: ward?.idFactory, data: dataWardFactory }
        } else {
          return { idFactory: ward?.idFactory, data: ward?.data }
        }
      })
      setListWardFactory(updateDataWardIfSameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexWardFactory, dataWardFactory])

  useEffect(() => {
    if (dataDistrict.length > 0) {
      const updateDataDistrictIfSameId = listDistrictOffice.map((district) => {
        if (district?.id === indexDistrict) {
          return { id: district?.id, data: dataDistrict }
        } else {
          return { id: district?.id, data: district?.data }
        }
      })
      setListDistrictOffice(updateDataDistrictIfSameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexDistrict, dataDistrict])

  useEffect(() => {
    if (dataWard.length > 0) {
      const updateDataWardIfSameId = listWardOffice.map((ward) => {
        if (ward?.id === indexWard) {
          return { id: ward?.id, data: dataWard }
        } else {
          return { id: ward?.id, data: ward?.data }
        }
      })
      setListWardOffice(updateDataWardIfSameId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexWard, dataWard])

  const handleAddAddress = (index) => {
    if (addresses.length < commons.MAX_ADDRESS_COUNT) {
      setAddresses([...addresses, { province_id: '', district_id: '', ward_id: '' }])
      setListDistrictOffice([...listDistrictOffice, { id: index + 1, data: [] }])
      setListWardOffice([...listWardOffice, { id: index + 1, data: [] }])
    }
  }

  const handleRemoveAddress = (index) => {
    const updatedAddresses = [...addresses]
    updatedAddresses.splice(index, 1)

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

    setAddresses(updatedAddresses)
  }

  const salesInCharges = useMemo(() => {
    if (!dataSalesInCharge || !salesInCharge) {
      return [];
    }
    return dataSalesInCharge.filter((option) => salesInCharge.includes(option.id))
  }, [dataSalesInCharge, salesInCharge])

  const handleClose = () => {
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
    handleCloseModal()
  }

  const handleAddressChange = (index, field, value) => {
    let updatedAddresses = [...addresses]
    if (value) {
      updatedAddresses[index][field] = value
      setAddresses(updatedAddresses)
      onChangeProvince(value)
      updatedAddresses[index]['district_id'] = ''
      updatedAddresses[index]['ward_id'] = ''
      setIndexDistrict(index)
    } else {
      updatedAddresses[index][field] = ''
      updatedAddresses[index]['district_id'] = ''
      updatedAddresses[index]['ward_id'] = ''
      setAddresses(updatedAddresses)
      setIndexDistrict(index)
      setIndexWard(index)
    }
  }

  const handleAddressChangeDistrict = (index, field, value) => {
    let updatedAddresses = [...addresses]
    if (value) {
      updatedAddresses[index][field] = value
      setAddresses(updatedAddresses)
      onChangeDistrict(value)
      updatedAddresses[index]['ward_id'] = ''
      setIndexWard(index)
    } else {
      updatedAddresses[index][field] = ''
      updatedAddresses[index]['ward_id'] = ''
      setAddresses(updatedAddresses)
      setIndexWard(index)
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
      setListDistrictFactory([...listDistrictFactory, { idFactory: index + 1, data: [] }])
      setListWardFactory([...listWardFactory, { idFactory: index + 1, data: [] }])
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
      updatedFactoryAddresses[index]['district_id'] = ''
      updatedFactoryAddresses[index]['ward_id'] = ''
      setIndexDistrictFactory(index)
      onChangeProvinceFactory(value)
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
      address_factories: factoryAddresses,
      indexDistrict: indexDistrict,
      indexWard: indexWard,
      indexDistrictFactory: indexDistrictFactory,
      indexWardFactory: indexWardFactory,
      listDistrictFactory: listDistrictFactory,
      listWardFactory: listWardFactory,
      listDistrictOffice: listDistrictOffice,
      listWardOffice: listWardOffice
    }

    let validate = validateCustomer(customer, t, userRole, isSuperAdmin)
    setErrors(validate)
    if (isEmpty(validate)) {
      handleCreateCustomer(customer)
    }
  }

  useEffect(() => {
    if (dataBack) {
      setCustomerName(dataBack.customer_name)
      setPhoneNumber(dataBack.phone_number)
      setCompanyName(dataBack.company_name)
      setZaloNumber(dataBack.zalo_number)
      setDebtLimit(dataBack.debt_limit)
      setDebtAge(dataBack.debtAge)
      setSalesInCharge(dataBack.user_ids)
      if((dataBack.user_ids).length > 0){
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
      setIndexDistrict(indexDistrict)
      setIndexWard(dataBack.indexWard)
      setIndexDistrictFactory(dataBack.indexDistrictFactory)
      setIndexWardFactory(dataBack.indexWardFactory)
      setListDistrictFactory(dataBack.listDistrictFactory)
      setListWardFactory(dataBack.listWardFactory)
      setListDistrictOffice(dataBack.listDistrictOffice)
      setListWardOffice(dataBack.listWardOffice)
    }
  }, [dataBack, open, dataSalesInCharge])

  const [modalStyle, setModalStyle] = useState(style)

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          handleClose()
          handleCloseModal()
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <Box sx={{ ...modalStyle }} className="order-container">
            <Box p={2}>
              <Typography className="modalTitle">{nameTitle}</Typography>
              <Box>
                <InputLabel required className="requiredTextField inputLabel-modal">
                  {t('customerName')}
                </InputLabel>
                <TextField
                  value={customerName}
                  size="small"
                  sx={{ width: '95%' }}
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
                  sx={{ width: '95%' }}
                  fullWidth
                  placeholder={t('enterCompanyName')}
                  onChange={(e) => setCompanyName(e.target.value)}
                  error={Boolean(getErrorMessageByName(errors, 'company_name'))}
                  helperText={getErrorMessageByName(errors, 'company_name')}
                  InputProps={{
                    classes: {
                      root: 'custom-input-search'
                    }
                  }}
                />
                <Box sx={{ display: 'flex', gap: '8px' }}>
                  <Box flex={1}>
                    <InputLabel required className="requiredTextField inputLabel-modal">
                      {t('phoneNumber')}
                    </InputLabel>
                    <TextField
                      value={phoneNumber}
                      size="small"
                      fullWidth
                      error={Boolean(getErrorMessageByName(errors, 'phone_number')) || errorCreateCustomerMessage?.phone_number}
                      helperText={(getErrorMessageByName(errors, 'phone_number') || errorCreateCustomerMessage?.phone_number) ?? ''}
                      placeholder={t('enterPhoneNumber')}
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
                      value={zaloNumber}
                      size="small"
                      error={Boolean(getErrorMessageByName(errors, 'zalo_number')) || errorCreateCustomerMessage?.zalo_number}
                      helperText={(getErrorMessageByName(errors, 'zalo_number') || errorCreateCustomerMessage?.zalo_number) ?? ''}
                      fullWidth
                      placeholder={t('enterZaloNumber')}
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
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0 6px'
                      }}
                    >
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
                          flexDirection: 'column'
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
                    <Typography className="inputLabel-modal" sx={{ mt: 1 }}>
                      {`${t('officeAddress')} ${index + 1}`}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0 6px'
                      }}
                    >
                      <Box sx={{ width: '100%' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center'
                          }}
                        >
                          <Box flex={1}>
                            <Autocomplete
                              popupIcon={<PolygonIcon />}
                              options={dataProvince}
                              getOptionLabel={(option) => option.province_name}
                              value={
                                address.province_id
                                  ? dataProvince?.find((province) => province.id === address.province_id)
                                  : null
                              }
                              onChange={(e, newValue) => {
                                handleAddressChange(index, 'province_id', newValue?.id ?? '')
                              }}
                              size="small"
                              fullWidth
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder={t('city')} />
                              )}
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
                          <Box flex={1}>
                            <Autocomplete
                              popupIcon={<PolygonIcon />}
                              options={(() => {
                                let state = []
                                if (address.province_id) {
                                  state = listDistrictOffice[index].data
                                }
                                return state
                              })()}
                              getOptionLabel={(option) => option.district_name}
                              value={
                                address.district_id
                                  ? listDistrictOffice[index].data.find(
                                      (district) => district.id === address.district_id
                                    ) || null
                                  : null
                              }
                              noOptionsText={
                                <span
                                  style={{
                                    color: colors.grayColor
                                  }}
                                >
                                  {t('noData')}
                                </span>
                              }
                              onChange={(e, newValue) => {
                                if (newValue) {
                                  handleAddressChangeDistrict(index, 'district_id', newValue.id)
                                } else {
                                  handleAddressChangeDistrict(index, 'district_id', '')
                                }
                              }}
                              size="small"
                              fullWidth
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder={t('district')} />
                              )}
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
                          <Box flex={0.7}>
                            <Autocomplete
                              popupIcon={<PolygonIcon />}
                              options={(() => {
                                let state = []
                                if (address.district_id) {
                                  state = listWardOffice[index].data
                                }
                                return state
                              })()}
                              getOptionLabel={(option) => option.ward_name}
                              value={
                                address.ward_id
                                  ? listWardOffice[index].data.find((ward) => ward.id === address.ward_id) || null
                                  : null
                              }
                              noOptionsText={
                                <span
                                  style={{
                                    color: colors.grayColor
                                  }}
                                >
                                  {t('noData')}
                                </span>
                              }
                              onChange={(e, newValue) => {
                                handleAddressUpdate(index, 'ward_id', newValue?.id ?? '')
                              }}
                              size="small"
                              fullWidth
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder={t('ward')} />
                              )}
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
                        </Box>
                        <Box mt={0.5}>
                          <TextField
                            size="small"
                            onChange={(e) => handleAddressUpdate(index, 'detail', e.target.value)}
                            fullWidth
                            value={address.detail || ''}
                            placeholder={t('specificAddress')}
                            InputProps={{
                              classes: { root: 'custom-input-search' }
                            }}
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column'
                        }}
                      >
                        {addresses.length < commons.MAX_ADDRESS_COUNT && index === addresses.length - 1 && (
                          <AddCircleIcon
                            fontSize="medium"
                            onClick={() => handleAddAddress(index)}
                            className="addIcon"
                          />
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
                    <Typography className="inputLabel-modal" sx={{ mt: 1 }}>
                      {`${t('factoryAddress')} ${index + 1}`}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0 6px'
                      }}
                    >
                      <Box sx={{ width: '100%' }}>
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '8px',
                            alignItems: 'center'
                          }}
                        >
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
                              ListboxProps={{
                                sx: {
                                  maxHeight: 220,
                                  fontSize: '12px'
                                }
                              }}
                              classes={{ inputRoot: 'custom-input-search' }}
                            />
                          </Box>
                          <Box flex={1}>
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
                                <span
                                  style={{
                                    color: colors.grayColor
                                  }}
                                >
                                  {t('noData')}
                                </span>
                              }
                              onChange={(e, newValue) => {
                                handleFactoryAddressChangeDistrict(index, 'district_id', newValue?.id ?? '')
                              }}
                              size="small"
                              fullWidth
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder={t('district')} />
                              )}
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
                          <Box flex={0.7}>
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
                                  ? listWardFactory[index].data.find((ward) => ward.id === factoryAddress.ward_id) ||
                                    null
                                  : null
                              }
                              noOptionsText={
                                <span
                                  style={{
                                    color: colors.grayColor
                                  }}
                                >
                                  {t('noData')}
                                </span>
                              }
                              onChange={(e, newValue) => {
                                handleUpdateFactoryAddress(index, 'ward_id', newValue?.id ?? '')
                              }}
                              size="small"
                              fullWidth
                              renderInput={(params) => (
                                <TextField {...params} variant="outlined" placeholder={t('ward')} />
                              )}
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
                          flexDirection: 'column'
                        }}
                      >
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
                {(isSuperAdmin || isCanShowAllCustomers(userRole) ) && (
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
                                width: '95%',
                                flexGrow: 1,
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
              <Button onClick={handleClose} className="cancelButton">
                {t('cancel')}
              </Button>
              <Button onClick={handleSubmit} className="confirmButton">
                {t('continue')}
                <ArrowForwardIcon />
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
