// @ts-nocheck
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Box, Button, Typography } from '@mui/material'
import HeaderPage from 'components/HeaderPage'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkAttributeValue } from '../../../common/common'
import colors from '../../../constants/colors'
import { permissionActions } from '../../../constants/titlePermissions'
import { deleteProductManagementAction, getListProductManagementAction } from '../../../redux/product/product.actions'
import {
  deleteProductSuccessMessageState,
  getListProductManagementState,
  productTotalPagesState
} from '../../../redux/product/product.selectors'
import { useRoleCheck } from '../../../utils'
import SearchBar from '../../../components/Buttons/Search'
import BasicTable from '../../../components/BasicTable'
import { TbEdit, TbEye } from 'react-icons/tb'
import ModalDelete from '../../../components/Modal/Common/delete'

const ProductPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const productList = useSelector(getListProductManagementState)
  const [loading, setLoading] = useState(false)
  const totalPages = useSelector(productTotalPagesState)
  const deleteProductSuccessMessage = useSelector(deleteProductSuccessMessageState)
  const { isSuperAdmin, userInfo } = useRoleCheck()
  const permissionsData = useMemo(
    () => (Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : []),
    [userInfo]
  )
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const searchProductValueSelected = localStorage.getItem('searchProductValue')
    setSearchValue(searchProductValueSelected)
    setLoading(true)
    setCurrentPage(1)
    dispatch(getListProductManagementAction({ search_product_management: searchProductValueSelected })).then(() => {
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    if (deleteProductSuccessMessage) {
      setCurrentPage(1)
      dispatch(getListProductManagementAction({ search_product_management: searchValue }))
    }
  }, [deleteProductSuccessMessage])

  const handlePageChange = (event, page) => {
    setLoading(true)
    setCurrentPage(page)
    dispatch(getListProductManagementAction({ page, search_product_management: searchValue })).then(() =>
      setLoading(false)
    )
  }

  const handleCreateProduct = () => {
    navigate(`/product/create`)
  }

  const handleDelete = (params) => {
    dispatch(deleteProductManagementAction(params))
  }

  const handleOnChangeValue = (e) => {
    const value = e.target.value
    setSearchValue(value)
    localStorage.setItem('searchProductValue', value)
  }

  const handleSearch = () => {
    setLoading(true)
    setCurrentPage(1)
    dispatch(getListProductManagementAction({ search_product_management: searchValue })).then(() => {
      setLoading(false)
    })
  }

  const handleClearSearch = () => {
    setLoading(true)
    setCurrentPage(1)
    setSearchValue('')
    localStorage.removeItem('searchProductValue')
    dispatch(getListProductManagementAction()).then(() => {
      setLoading(false)
    })
  }

  const handleEditClick = (id) => {
    navigate(`/product/edit?id=${id}`)
  }
  const handleView = (id) => {
    navigate(`/product/details/view?id=${id}`)
  }

  const headers = useMemo(
    () => [
      {
        key: 'internalCode',
        label: t('internalCode'),
        align: 'left'
      },
      {
        key: 'nameCall',
        label: t('name'),
        align: 'left'
      },
      {
        key: 'actions',
        label: t('actions')
      }
    ],
    [t]
  )

  const rows = productList.map((row, index) => ({
      internalCode: {
        label: row.code,
        cellWithButton: true
      },
      nameCall: {
        label: row.product_name,
        cellWithButton: true
      },
      actions: {
        label: (
          <>
            <Button
              className={`button-action ${!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.DETAIL_PRODUCT) ? 'disabled-cursor' : ''}`}
              disabled={
                !isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.DETAIL_PRODUCT)
              }
              onClick={() => handleView(row.id)}
            >
              <TbEye style={{ color: colors.lightroyalblueColor }} />
            </Button>
            <Button
              className={`button-action ${!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.UPDATE_PRODUCT) ? 'disabled-cursor' : ''}`}
              disabled={
                !isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.UPDATE_PRODUCT)
              }
              onClick={() => handleEditClick(row.id)}
            >
              <TbEdit style={{ color: colors.amberColor, width: 24, height: 24 }} />
            </Button>
            <ModalDelete
              disable={!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.DELETE_PRODUCT)}
              successFlag={deleteProductSuccessMessage}
              id={row.id}
              buttonName={t('delete')}
              handleDelete={handleDelete}
            />
          </>
        )
      },
      id: {
        label: row.id
      }
    }))

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <HeaderPage
        title={t('productManagement')}
        actionButton={
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              className={`addButton ${!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.ADD_PRODUCT) ? 'disabled-cursor' : ''}`}
              disabled={!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.ADD_PRODUCT)}
              onClick={handleCreateProduct}
              startIcon={<AddCircleOutlineIcon />}
            >
              {t('addProduct')}
            </Button>
          </Box>
        }
      />
      {(isSuperAdmin || checkAttributeValue(permissionsData, 'name', permissionActions.LIST_PRODUCT)) && (
        <Box p={2}>
          <Box
            component="form"
            sx={{
              bgcolor: colors.lilywhiteColor,
              borderRadius: '10px',
              padding: '20px',
              position: 'relative'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
              <Typography sx={{ fontWeight: '500', fontSize: '20px', color: colors.indigoColor }}>
                {t('productList')}
              </Typography>
            </Box>
            <Box sx={{ marginTop: '10px', marginBottom: '10px' }}>
              <SearchBar
                searchValue={searchValue}
                handleOnChangeValue={handleOnChangeValue}
                handleSearch={handleSearch}
                handleClearSearch={handleClearSearch}
                placeholderText="enterInternalOrName"
                buttonText="find"
              />
            </Box>
            <Box>
              {!loading && (
                <BasicTable
                  loading={loading}
                  headers={headers}
                  rows={rows}
                  totalPages={totalPages}
                  currentPage={currentPage}
                  showIndex
                  handlePageChange={handlePageChange}
                  navigateToDetail={handleView}
                />
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default ProductPage
