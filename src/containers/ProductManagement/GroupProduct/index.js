import {useTranslation} from 'react-i18next'
import colors from '../../../constants/colors'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {AddCircleOutlineRounded} from '@mui/icons-material'
import {useDispatch, useSelector} from 'react-redux'
import {
    createProductGroupsErrorMessageState,
    createProductGroupsSuccessFlagState,
    deleteProductGroupSuccessMessageState,
    getDetailProductGroupState,
    listProductGroupState,
    productGroupTotalPagesState,
    updateProductGroupsErrorMessageState,
    updateProductGroupsSuccessFlagState
} from '../../../redux/product/product.selectors'
import {
    createProductGroupsAction,
    deleteProductGroupAction,
    getDetailProductGroupAction,
    getListProductGroupAction,
    removeMessageErrorAction,
    updateProductGroupsAction
} from '../../../redux/product/product.actions'
import HeaderPage from 'components/HeaderPage'
import ProductGroupModal from "../../../components/Modal/ProductManagement/ProductGroup";
import {permissionActions} from "../../../constants/titlePermissions";
import {useRoleCheck} from "../../../utils";
import BasicTable from "../../../components/BasicTable";
import {TbEdit} from "react-icons/tb";
import ModalDelete from "../../../components/Modal/Common/delete";

const GroupProductPage = () => {
    const {t} = useTranslation()
    const listProductGroup = useSelector(listProductGroupState)
    const [loading, setLoading] = useState(false)
    const productGroupTotalPages = useSelector(productGroupTotalPagesState)
    const dispatch = useDispatch()
    const deleteProductGroupSuccessMessage = useSelector(deleteProductGroupSuccessMessageState)
    const [isOpenProductGroupModal, setIsOpenProductGroupModal] = useState(false)
    const createProductGroupsSuccessFlag = useSelector(createProductGroupsSuccessFlagState)
    const createProductGroupsErrorMessage = useSelector(createProductGroupsErrorMessageState)
    const [loadingAPICreate, setLoadingAPICreate] = useState(true)
    const getDetailProductGroup = useSelector(getDetailProductGroupState)
    const [isOpenUpdateProductGroupModal, setIsOpenUpdateProductGroupModal] = useState(false)
    const updateProductGroupsSuccessFlag = useSelector(updateProductGroupsSuccessFlagState)
    const updateProductGroupsErrorMessage = useSelector(updateProductGroupsErrorMessageState)
    const {isSuperAdmin, userInfo} = useRoleCheck();
    const permissionsData = useMemo(
        () => (Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : []),
        [userInfo]
    )
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        dispatch(getListProductGroupAction())
    }, [])

    useEffect(() => {
        if (createProductGroupsSuccessFlag || updateProductGroupsSuccessFlag) {
            setCurrentPage(1)
            dispatch(getListProductGroupAction())
        }
    }, [createProductGroupsSuccessFlag, updateProductGroupsSuccessFlag])

    useEffect(() => {
        if (deleteProductGroupSuccessMessage) {
            setCurrentPage(1)
            dispatch(getListProductGroupAction())
        }
    }, [deleteProductGroupSuccessMessage])

    const handlePageChange = (event, page) => {
        setLoading(true)
        setCurrentPage(page)
        dispatch(getListProductGroupAction({page})).then(() => setLoading(false))
    }

    const handleDelete = (params) => {
        dispatch(deleteProductGroupAction(params))
    }

    const handleEditClick = (params) => {
        dispatch(getDetailProductGroupAction(params))
        setIsOpenUpdateProductGroupModal(true)
    }

    const handleCreateProductGroupModal = () => {
        setIsOpenProductGroupModal(true)
    }

    const handleCloseProductGroupModal = () => {
        setIsOpenUpdateProductGroupModal(false)
        setIsOpenProductGroupModal(false)
    }

    const removeMessageError = useCallback(() => {
        dispatch(removeMessageErrorAction())
    }, [dispatch])

    const handleCreateProductGroups = (params) => {
        setLoadingAPICreate(false)
        dispatch(createProductGroupsAction(params)).finally(() => {
            setLoadingAPICreate(true)
        })
    }

    const handleUpdateProductGroups = (params) => {
        setLoadingAPICreate(false)
        dispatch(updateProductGroupsAction(params)).finally(() => {
            setLoadingAPICreate(true)
        })
    }

    const headers = useMemo(
        () => [
            {
                key: 'productGroupName',
                label: t('productGroupName'),
                align: 'left'
            },
            {
                key: 'actions',
                label: t('actions')
            }
        ],
        [t]
    )

    const rows = listProductGroup.map((row, index) => ({
            productGroupName: {
                label: row.product_group_name
            },
            actions: {
                label: (
                    <>
                        <Button
                            className={`button-action ${!isSuperAdmin && !permissionsData.some(item => item.name === permissionActions.UPDATE_PRODUCT_GROUP) ? 'disabled-cursor' : ''}`}
                            disabled={!isSuperAdmin && !permissionsData.some(item => item.name === permissionActions.UPDATE_PRODUCT_GROUP)}
                            onClick={() => handleEditClick(row.id)}
                        >
                            <TbEdit style={{color: colors.amberColor, width: 24, height: 24}}/>
                        </Button>
                        <ModalDelete
                            disable={!isSuperAdmin && !permissionsData.some(item => item.name === permissionActions.DELETE_PRODUCT_GROUP)}
                            successFlag={deleteProductGroupSuccessMessage}
                            id={row.id}
                            buttonName={t('delete')}
                            handleDelete={handleDelete}
                        />
                    </>
                ),
            },
            id: {
                label: row.id
            }
        }))

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <HeaderPage
                title={t('groupProductManagement')}
                actionButton={
                    <Button
                        onClick={handleCreateProductGroupModal}
                        className={`addButton ${!isSuperAdmin && !permissionsData.some(item => item.name === permissionActions.ADD_PRODUCT_GROUP) ? 'disabled-cursor' : ''}`}
                        disabled={!isSuperAdmin && !permissionsData.some(item => item.name === permissionActions.ADD_PRODUCT_GROUP)}
                        startIcon={<AddCircleOutlineRounded/>}
                    >
                        {t('addProductGroups')}
                    </Button>
                }
            />
            <ProductGroupModal
                nameTitle={t('addProductGroups')}
                open={isOpenProductGroupModal}
                handleClose={handleCloseProductGroupModal}
                errorMessage={createProductGroupsErrorMessage}
                successFlag={createProductGroupsSuccessFlag}
                removeMessageError={removeMessageError}
                handleSubmitAction={handleCreateProductGroups}
                loadingAPICreate={loadingAPICreate}
            />
            {(permissionsData.some(item => item.name === permissionActions.LIST_PRODUCT_GROUP) || isSuperAdmin) && (
                <Box p={2}>
                    <Box
                        component="form"
                        sx={{bgcolor: colors.lilywhiteColor, borderRadius: '10px', p: 2, position: 'relative'}}
                    >
                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2}}>
                            <Typography className="frontpager">{t('productGroupList')}</Typography>
                        </Box>
                        <Box>
                            {!loading && (
                                <BasicTable
                                    loading={loading}
                                    headers={headers}
                                    rows={rows}
                                    totalPages={productGroupTotalPages}
                                    currentPage={currentPage}
                                    showIndex
                                    handlePageChange={handlePageChange}
                                />
                            )}
                        </Box>
                        <ProductGroupModal
                            nameTitle={t('editProductGroups')}
                            open={isOpenUpdateProductGroupModal}
                            handleClose={handleCloseProductGroupModal}
                            errorMessage={updateProductGroupsErrorMessage}
                            successFlag={updateProductGroupsSuccessFlag}
                            removeMessageError={removeMessageError}
                            handleSubmitAction={handleUpdateProductGroups}
                            loadingAPICreate={loadingAPICreate}
                            dataDetail={getDetailProductGroup}
                            isEdit={true}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    )
}
export default GroupProductPage
