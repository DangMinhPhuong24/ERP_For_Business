import React, { useEffect, useState } from 'react'
import { Box, MenuItem, Typography, Menu, ListItemText, Checkbox } from '@mui/material'
import Button from '@mui/material/Button'
import { useTranslation } from 'react-i18next'
import colors from '../../../constants/colors'
import { HiChevronDown } from 'react-icons/hi2'
import { HiChevronUp } from 'react-icons/hi2'
import { GoGear } from 'react-icons/go'
import { IoSearchOutline } from 'react-icons/io5'
import CustomTextField from '../../Buttons/TextField/CustomFormTextField'
import CustomAutocomplete from '../../Buttons/TextField/CustomFormAutocomplete'
import CustomAutocompleteMulti from '../../Buttons/TextField/CustomAutocompleteMulti'

const filterOptions = [
  { label: 'customerName' },
  { label: 'phoneNumber' },
  { label: 'companyName' },
  { label: 'city' },
  { label: 'district' },
  { label: 'ward' },
  { label: 'debtGroup' },
  { label: 'debtAge' },
  { label: 'industryGroup' },
  { label: 'customerRank' },
  { label: 'typeOfBusiness' },
  { label: 'productApplication' }
]

const SearchFormCustomer = ({
  dataProvince,
  onChangeProvince,
  dataDistrict,
  onChangeDistrict,
  dataWard,
  dataDebtGroup,
  dataDebtAge,
  onSubmit,
  onClear,
  listAllIndustryGroup,
  listAllCustomerRank,
  listAllCompanyType,
  listAllProductApplication
}) => {
  const [customerName, setCustomerName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [wardId, setWardId] = useState('')
  const [debtGroupId, setDebtGroupId] = useState('')
  const [debtAgeId, setDebtAgeId] = useState('')
  const [provinceId, setProvinceId] = useState('')
  const [districtId, setDistrictId] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [boxHeight, setBoxHeight] = useState('auto')
  const [anchorEl, setAnchorEl] = useState(null)
  const menuOpen = Boolean(anchorEl)
  const [industryGroup, setIndustryGroup] = useState([])
  const [customerRankGroup, setCustomerRankGroup] = useState([])
  const [companyTypeGroup, setCompanyTypeGroup] = useState([])
  const [productApplicationGroup, setProductApplicationGroup] = useState([])
  const [selectedFilters, setSelectedFilters] = useState({
    customerName: true,
    phoneNumber: true,
    companyName: true,
    city: true,
    district: true,
    ward: true,
    debtGroup: true,
    debtAge: true
  })
  const [selectedFilterOrder, setSelectedFilterOrder] = useState([
    'customerName',
    'phoneNumber',
    'companyName',
    'city',
    'district',
    'ward',
    'debtGroup',
    'debtAge'
  ])

  useEffect(() => {
    if (selectedFilterOrder.length > 8 || selectedFilters.length > 8) {
      localStorage.setItem('filterCustomer', JSON.stringify({ selectedFilterOrder, selectedFilters }))
    }
  }, [selectedFilterOrder, selectedFilters])

  const handleClickToggle = () => {
    setShowSearch(!showSearch)
    setBoxHeight(showSearch ? 'auto' : '70px')
  }
  const handleSubmit = () => {
    let paramSearch = {
      customer_name: customerName,
      phone_number: phoneNumber,
      company_name: companyName,
      ward_id: wardId,
      debt_group_id: debtGroupId,
      debt_age_id: debtAgeId,
      province_id: provinceId,
      district_id: districtId,
      customer_rank_ids: customerRankGroup,
      company_type_ids: companyTypeGroup,
      product_application_ids: productApplicationGroup,
      industry_group_ids: industryGroup
    }
    onSubmit(paramSearch)
  }

  const handleClear = () => {
    setCustomerName('')
    setPhoneNumber('')
    setCompanyName('')
    setProvinceId('')
    setDebtAgeId('')
    setDebtGroupId('')
    setDistrictId('')
    setWardId('')
    setIndustryGroup([])
    setCustomerRankGroup([])
    setCompanyTypeGroup([])
    setProductApplicationGroup([])
    localStorage.removeItem('customerSearch')
    onClear()
  }

  const onChangeProvinceSelect = (value) => {
    if (value != '') {
      setProvinceId(value)
      setDistrictId('')
      setWardId('')
      onChangeProvince(value)
    } else {
      setProvinceId('')
      setDistrictId('')
      setWardId('')
    }
  }

  const handlePhoneNumberChange = (value) => {
    if (!isNaN(value)) {
      setPhoneNumber(value)
    }
  }

  const { t } = useTranslation()

  useEffect(() => {
    const storedState = localStorage.getItem('customerSearch')
    const filterCustomerState = localStorage.getItem('filterCustomer')
    if (filterCustomerState) {
      const { selectedFilterOrder, selectedFilters } = JSON.parse(filterCustomerState)
      setSelectedFilterOrder(selectedFilterOrder)
      setSelectedFilters(selectedFilters)
    }

    if (storedState) {
      const {
        company_name,
        phone_number,
        customer_name,
        ward_id,
        debt_group_id,
        debt_age_id,
        province_id,
        district_id,
        customer_rank_ids,
        company_type_ids,
        product_application_ids,
        industry_group_ids
      } = JSON.parse(storedState)
      const selectedProvince = dataProvince.find((option) => option.id === province_id)
      if (selectedProvince) {
        setProvinceId(province_id)
        onChangeProvince(province_id)
      } else {
        setProvinceId('')
        setDistrictId('')
        setWardId('')
      }

      if (district_id) {
        onChangeDistrict(district_id)
        setDistrictId(district_id)
      } else {
        setDistrictId('')
        setWardId('')
      }
      setCustomerName(customer_name)
      setPhoneNumber(phone_number)
      setCompanyName(company_name)
      setWardId(ward_id)
      setDebtGroupId(debt_group_id)
      setDebtAgeId(debt_age_id)
      setIndustryGroup(industry_group_ids)
      setCustomerRankGroup(customer_rank_ids)
      setCompanyTypeGroup(company_type_ids)
      setProductApplicationGroup(product_application_ids)
    }
  }, [dataProvince])

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleMenusClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleIndustryGroupChange = (event, value) => {
    const selectedIds = value.map((option) => option.id)
    setIndustryGroup(selectedIds)
  }

  const selectedIndustryGroups = listAllIndustryGroup.filter((option) => industryGroup.includes(option.id))

  const handleCustomerRankGroupChange = (event, value) => {
    const selectedIds = value.map((option) => option.id)
    setCustomerRankGroup(selectedIds)
  }

  const selectedCustomerRankGroups = listAllCustomerRank.filter((option) => customerRankGroup.includes(option.id))

  const handleCompanyTypeGroupChange = (event, value) => {
    const selectedIds = value.map((option) => option.id)
    setCompanyTypeGroup(selectedIds)
  }

  const selectedCompanyTypeGroups = listAllCompanyType.filter((option) => companyTypeGroup.includes(option.id))

  const handleProductApplicationGroupChange = (event, value) => {
    const selectedIds = value.map((option) => option.id)
    setProductApplicationGroup(selectedIds)
  }

  const selectedProductApplicationGroups = listAllProductApplication.filter((option) =>
    productApplicationGroup.includes(option.id)
  )

  const handleCheckboxChange = (stateKey) => {
    setSelectedFilters((prevState) => ({
      ...prevState,
      [stateKey]: !prevState[stateKey]
    }))

    setSelectedFilterOrder((prevOrder) => {
      if (prevOrder.includes(stateKey)) {
        return prevOrder.filter((key) => key !== stateKey)
      } else {
        return [...prevOrder, stateKey]
      }
    })
  }

  const handleReset = () => {
    setSelectedFilters({
      customerName: true,
      phoneNumber: true,
      companyName: true,
      city: true,
      district: true,
      ward: true,
      debtGroup: true,
      debtAge: true
    })
    setSelectedFilterOrder([
      'customerName',
      'phoneNumber',
      'companyName',
      'city',
      'district',
      'ward',
      'debtGroup',
      'debtAge'
    ])
  }

  const onChangeDistrictSelect = (value) => {
    if (value != '') {
      setDistrictId(value)
      setWardId('')
      onChangeDistrict(value)
    } else {
      setDistrictId('')
    }
  }

  const renderInputs = () => {
    return selectedFilterOrder.map((stateKey) => {
      switch (stateKey) {
        case 'customerName':
          return (
            <CustomTextField
              label={t('customerName')}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              labelClassName="inputLabel-search"
            />
          )
        case 'phoneNumber':
          return (
            <CustomTextField
              label={t('phoneNumber')}
              value={phoneNumber}
              onChange={(e) => handlePhoneNumberChange(e.target.value)}
              labelClassName="inputLabel-search"
            />
          )
        case 'companyName':
          return (
            <CustomTextField
              label={t('companyName')}
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              labelClassName="inputLabel-search"
            />
          )
        case 'city':
          return (
            <CustomAutocomplete
              label={t('city')}
              value={provinceId}
              options={dataProvince}
              placeholder={t('select')}
              onChange={onChangeProvinceSelect}
              getOptionLabel={(option) => option.province_name}
              labelClassName="inputLabel-search"
            />
          )
        case 'district':
          return (
            <CustomAutocomplete
              labelClassName="inputLabel-search"
              label={t('district')}
              value={districtId}
              onChange={onChangeDistrictSelect}
              options={provinceId ? dataDistrict : []}
              placeholder={t('select')}
              getOptionLabel={(option) => option.district_name}
              noOptionsText={
                !provinceId && <span style={{ color: colors.grayColor }}>{t('pleaseSelectCityProvinceFirst')}</span>
              }
            />
          )
        case 'ward':
          return (
            <CustomAutocomplete
              labelClassName="inputLabel-search"
              label={t('ward')}
              value={wardId}
              onChange={(id) => setWardId(id)}
              options={districtId ? dataWard : []}
              placeholder={t('select')}
              getOptionLabel={(option) => option.ward_name}
              noOptionsText={
                !districtId && <span style={{ color: colors.grayColor }}>{t('pleaseSelectDistrictFirst')}</span>
              }
            />
          )
        case 'debtGroup':
          return (
            <CustomAutocomplete
              labelClassName="inputLabel-search"
              label={t('debtGroup')}
              value={debtGroupId}
              onChange={(id) => setDebtGroupId(id)}
              options={dataDebtGroup}
              placeholder={t('select')}
              getOptionLabel={(option) => option.debt_group_name}
            />
          )
        case 'debtAge':
          return (
            <CustomAutocomplete
              labelClassName="inputLabel-search"
              label={t('debtAge')}
              value={debtAgeId}
              onChange={(id) => setDebtAgeId(id)}
              options={dataDebtAge}
              placeholder={t('select')}
              getOptionLabel={(option) => option.debt_age_name}
            />
          )
        case 'industryGroup':
          return (
            <CustomAutocompleteMulti
              labelClassName="inputLabel-search"
              label={t('industryGroup')}
              value={selectedIndustryGroups}
              onChange={handleIndustryGroupChange}
              options={listAllIndustryGroup}
              placeholder={t('enterIndustryGroup')}
              getOptionLabel={(option) => option.industry_group_name}
              renderOptionLabel={(option) => <span>{option.industry_group_name}</span>}
            />
          )
        case 'customerRank':
          return (
            <CustomAutocompleteMulti
              labelClassName="inputLabel-search"
              label={t('customerRank')}
              value={selectedCustomerRankGroups}
              onChange={handleCustomerRankGroupChange}
              options={listAllCustomerRank}
              placeholder={t('selectCustomerClass')}
              getOptionLabel={(option) => option.customer_rank_name}
              renderOptionLabel={(option) => <span>{option.customer_rank_name}</span>}
            />
          )
        case 'typeOfBusiness':
          return (
            <CustomAutocompleteMulti
              labelClassName="inputLabel-search"
              label={t('typeOfBusiness')}
              value={selectedCompanyTypeGroups}
              onChange={handleCompanyTypeGroupChange}
              options={listAllCompanyType}
              placeholder={t('selectCompanyType')}
              getOptionLabel={(option) => option.company_type_name}
              renderOptionLabel={(option) => <span>{option.company_type_name}</span>}
            />
          )
        case 'productApplication':
          return (
            <CustomAutocompleteMulti
              labelClassName="inputLabel-search"
              label={t('productApplication')}
              value={selectedProductApplicationGroups}
              onChange={handleProductApplicationGroupChange}
              options={listAllProductApplication}
              placeholder={t('selectProductApplication')}
              getOptionLabel={(option) => option.product_application_name}
              renderOptionLabel={(option) => <span>{option.product_application_name}</span>}
            />
          )
        default:
          return null
      }
    })
  }

  return (
    <Box sx={{ bgcolor: '#FFFFFF', p: 2, borderRadius: '10px', position: 'relative', height: boxHeight }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: colors.indigoColor }}>
          {t('search')}
        </Typography>
        {showSearch ? (
          <HiChevronDown
            onClick={() => handleClickToggle()}
            style={{ cursor: 'pointer', fontSize: '35px', color: '#B2B2B2' }}
          />
        ) : (
          <HiChevronUp
            onClick={() => handleClickToggle()}
            style={{ cursor: 'pointer', fontSize: '35px', color: '#B2B2B2' }}
          />
        )}
      </Box>
      {!showSearch && (
        <>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, mt: 1 }}>{renderInputs()}</Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Box sx={{ display: 'flex', gap: '9px', mx: 'auto' }}>
              <Button className="modalButton" onClick={handleSubmit}>
                <IoSearchOutline style={{ fontSize: '16px' }} />
                {t('search')}
              </Button>
              <Button
                onClick={handleClear}
                variant="outlined"
                sx={{
                  lineHeight: '17.71px',
                  color: colors.darkmidnightblueColor,
                  bgcolor: colors.lightblueColor,
                  textTransform: 'none',
                  border: 'none',
                  borderRadius: '8px'
                }}
              >
                {t('delete')}
              </Button>
            </Box>
            <Box
              sx={{
                width: '30px',
                height: '30px',
                borderRadius: '5px',
                border: '0.5px solid #AAAAAA',
                cursor: 'pointer',
                padding: '5px',
                boxShadow: '0px 4px 4px 0px #00000026'
              }}
              onClick={handleMenusClick}
            >
              <GoGear style={{ width: '20px', height: '20px', color: colors.lightroyalblueColor }} />
            </Box>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={menuOpen}
            onClose={handleMenuClose}
            id="menu-appbar"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            PaperProps={{
              style: {
                width: '183px',
                borderRadius: '5px',
                marginLeft: '-5px'
              }
            }}
          >
            <Box
              sx={{ borderBottom: '1px solid #AAAAAA', padding: '10px' }}
              height="36px"
              display="flex"
              justifyContent="space-between"
              width="100%"
            >
              <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{t('showFilters')}</Typography>
              <Typography
                onClick={handleReset}
                color="primary"
                sx={{ cursor: 'pointer', fontSize: '12px', fontWeight: 400 }}
              >
                {t('reset')}
              </Typography>
            </Box>
            <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
              {filterOptions.map((option, index) => (
                <MenuItem disabled={index < 8} key={option.label} onClick={() => handleCheckboxChange(option.label)}>
                  <Checkbox
                    sx={{
                      width: '16px',
                      height: '16px',
                      '& .MuiSvgIcon-root': {
                        fontSize: 16,
                        color: index < 8 ? 'rgba(0, 123, 255, 0.5)' : ''
                      }
                    }}
                    checked={!!selectedFilters[option.label]}
                    disabled={index < 8}
                  />
                  <ListItemText>
                    <Typography sx={{ fontSize: '12px', fontWeight: 400 }}>{t(option.label)}</Typography>
                  </ListItemText>
                </MenuItem>
              ))}
            </div>
          </Menu>
        </>
      )}
    </Box>
  )
}

export default SearchFormCustomer
