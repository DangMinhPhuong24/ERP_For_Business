import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import { Box, Button, Typography } from '@mui/material'
import HeaderPage from 'components/HeaderPage'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TbEdit } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import BasicTable from '../../../components/BasicTable'
import ModalDelete from '../../../components/Modal/Common/delete'
import SupplierModal from '../../../components/Modal/ProductManagement/Supplier/index'
import colors from '../../../constants/colors'
import { permissionActions } from '../../../constants/titlePermissions'
import {
  createSuppliersAction,
  deleteSupplierAction,
  getAllCurrencyUnitAction,
  getAllSuppliersTypeAction,
  getDetailSupplierAction,
  getSuppliersAction,
  removeMessageErrorAction,
  updateSupplierAction
} from '../../../redux/product/product.actions'
import {
  createSupplierErrorMessageState,
  createSupplierSuccessFlagState,
  deleteSupplierSuccessMessageState,
  detailSupplierState,
  getAllCurrencyUnitState,
  getAllSuppliersTypeState,
  suppliersState,
  totalPagesState,
  updateSupplierErrorMessageState,
  updateSupplierSuccessFlagState
} from '../../../redux/product/product.selectors'
import { useRoleCheck } from '../../../utils'

const SupplierPage = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const listSuppliers = useSelector(suppliersState)
  const totalPages = useSelector(totalPagesState)
  const deleteSupplierSuccessMessage = useSelector(deleteSupplierSuccessMessageState)
  const getAllCurrencyUnit = useSelector(getAllCurrencyUnitState)
  const getAllSuppliersType = useSelector(getAllSuppliersTypeState)
  const createSupplierSuccessFlag = useSelector(createSupplierSuccessFlagState)
  const createSupplierErrorMessage = useSelector(createSupplierErrorMessageState)
  const { isSuperAdmin, userInfo } = useRoleCheck()
  const [currentPage, setCurrentPage] = useState(1)
  const permissionsData = useMemo(
    () => (Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : []),
    [userInfo]
  )
  const [isOpenCreateSupplierModal, setIsOpenCreateSupplierModal] = useState(false)
  const [loadingAPICreate, setLoadingAPICreate] = useState(true)
  const supplierDetail = useSelector(detailSupplierState)
  const [isOpenUpdateSupplierModal, setIsOpenUpdateSupplierModal] = useState(false)
  const updateSupplierSuccessFlag = useSelector(updateSupplierSuccessFlagState)
  const updateSupplierErrorMessage = useSelector(updateSupplierErrorMessageState)

  useEffect(() => {
    dispatch(getSuppliersAction())
  }, [dispatch])

  useEffect(() => {
    if (deleteSupplierSuccessMessage || createSupplierSuccessFlag || updateSupplierSuccessFlag) {
      setCurrentPage(1)
      setLoading(true)
      dispatch(getSuppliersAction()).then(() => setLoading(false))
    }
  }, [deleteSupplierSuccessMessage, createSupplierSuccessFlag, updateSupplierSuccessFlag])

  const removeMessageError = useCallback(() => {
    dispatch(removeMessageErrorAction())
  }, [])

  const handlePageChange = (event, page) => {
    setLoading(true)
    setCurrentPage(page)
    dispatch(getSuppliersAction({ page })).then(() => setLoading(false))
  }

  const handleEditClick = (supplierId) => {
    dispatch(getAllSuppliersTypeAction())
    dispatch(getAllCurrencyUnitAction())
    dispatch(getDetailSupplierAction(supplierId))
    setIsOpenUpdateSupplierModal(true)
  }

  const handleDelete = (param) => {
    dispatch(deleteSupplierAction(param))
  }

  const handleUpdateSupplier = (param) => {
    setLoadingAPICreate(false)
    dispatch(updateSupplierAction(param)).finally(() => setLoadingAPICreate(true))
  }

  const handleCreateSupplier = (param) => {
    setLoadingAPICreate(false)
    dispatch(createSuppliersAction(param)).finally(() => setLoadingAPICreate(true))
  }

  const headers = useMemo(
    () => [
      {
        key: 'supplierName',
        label: t('supplierName'),
        align: 'left',
        w: '70%'
      },
      {
        key: 'type',
        label: t('type'),
        align: 'left'
      },
      {
        key: 'actions',
        label: t('actions')
      }
    ],
    [t]
  )

  const rows = useMemo(() => {
    return listSuppliers.map((row) => ({
      supplierName: {
        label: row.supplier_name
      },
      type: {
        label: row?.supplier_type?.supplier_type_name
      },
      actions: {
        label: (
          <>
            <Button className="button-action" onClick={() => handleEditClick(row.id)}>
              <TbEdit style={{ color: colors.amberColor, width: 24, height: 24 }} />
            </Button>
            <ModalDelete
              successFlag={deleteSupplierSuccessMessage}
              id={row.id}
              buttonName={t('delete')}
              handleDelete={handleDelete}
              disable={row.disable_delete}
              tooltipMessage={t('cannotDeleteASupplierThatHasProductsInTheSystem')}
            />
          </>
        )
      },
      id: {
        label: row.id
      }
    }))
  }, [listSuppliers])

  const handleCreateSupplierModal = () => {
    dispatch(getAllSuppliersTypeAction())
    dispatch(getAllCurrencyUnitAction())
    setIsOpenCreateSupplierModal(true)
  }

  const handleCloseSupplierModal = () => {
    setIsOpenCreateSupplierModal(false)
    setIsOpenUpdateSupplierModal(false)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <HeaderPage
        title={t('supplierManagement')}
        actionButton={
          <Button
            onClick={handleCreateSupplierModal}
            className={`addButton ${!isSuperAdmin && !permissionsData.some((item) => item.name === permissionActions.ADD_SUPPLIER) ? 'disabled-cursor' : ''}`}
            disabled={!isSuperAdmin && !permissionsData.some((item) => item.name === permissionActions.ADD_SUPPLIER)}
            startIcon={<AddCircleOutlineIcon />}
          >
            {t('addSupplier')}
          </Button>
        }
      />
      {(permissionsData.some((item) => item.name === permissionActions.LIST_SUPPLIER) || isSuperAdmin) && (
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
                {t('supplierList')}
              </Typography>
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
                />
              )}
              {isOpenCreateSupplierModal && (
                <SupplierModal
                  nameTitle={t('addSupplier')}
                  open={isOpenCreateSupplierModal}
                  handleClose={handleCloseSupplierModal}
                  getAllCurrencyUnit={getAllCurrencyUnit}
                  getAllSuppliersType={getAllSuppliersType}
                  errorMessage={createSupplierErrorMessage}
                  successFlag={createSupplierSuccessFlag}
                  removeMessageError={removeMessageError}
                  handleSubmitAction={handleCreateSupplier}
                  loadingAPICreate={loadingAPICreate}
                />
              )}
              {isOpenUpdateSupplierModal && (
                <SupplierModal
                  isEdit={true}
                  dataDetail={supplierDetail}
                  nameTitle={t('editSupplier')}
                  open={isOpenUpdateSupplierModal}
                  handleClose={handleCloseSupplierModal}
                  getAllCurrencyUnit={getAllCurrencyUnit}
                  getAllSuppliersType={getAllSuppliersType}
                  errorMessage={updateSupplierErrorMessage}
                  successFlag={updateSupplierSuccessFlag}
                  removeMessageError={removeMessageError}
                  handleSubmitAction={handleUpdateSupplier}
                  loadingAPICreate={loadingAPICreate}
                />
              )}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default SupplierPage
