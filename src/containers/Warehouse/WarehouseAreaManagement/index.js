// @ts-nocheck
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Autocomplete from '@mui/material/Autocomplete'
import {useTranslation} from 'react-i18next'
import {TbEdit, TbEye} from 'react-icons/tb'
import {useDispatch, useSelector} from 'react-redux'
import colors from '../../../constants/colors'
import PolygonIcon from '../../../asset/icon/Polygon.svg'
import {
    createWarehouseAction,
    deleteWarehouseAction,
    getDetailWarehouseAction,
    getListAllWarehouseAction,
    getListWarehousesAction,
    removeMessageErrorAction,
    updateWarehouseAction
} from '../../../redux/warehouse/warehouse.actions'
import {
    createWarehouseSuccessFlagState,
    deleteWarehouseSuccessFlagState,
    detailWarehouseState,
    errorCreateWarehouseMessageState,
    errorUpdateWarehouseMessageState,
    listWarehousesState,
    totalPagesListWarehousesState,
    updateWarehouseSuccessFlagState
} from '../../../redux/warehouse/warehouse.selectors'
import {setListWarehousesCurrentPage} from '../../../redux/warehouse/warehouse.slice'
import '../../../resource/style/ComboBoxStyle.css'
import WarehouseAreaModal from 'components/Modal/Warehouse/WarehouseAreaManagement/WarehouseArea'
import {useUser} from '../../../contexts/AuthContext'
import {listBranchsState} from '../../../redux/account/account.selectors'
import {getListAllBranchAction} from '../../../redux/account/account.actions'
import roles from '../../../constants/titleRole'
import HeaderPage from 'components/HeaderPage'
import SearchBar from '../../../components/Buttons/Search'
import BasicTable from "../../../components/BasicTable";
import {formatNumber} from "../../../common/common";
import ModalDelete from "../../../components/Modal/Common/delete";
import {useNavigate} from "react-router-dom";

export default function WarehouseAreaManagementPage() {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const listWarehouses = useSelector(listWarehousesState)
    const listBranch = useSelector(listBranchsState)
    const branches = Array.isArray(listBranch) ? listBranch : [listBranch]
    const totalPagesListWarehouses = useSelector(totalPagesListWarehousesState)
    const getDetailWarehouse = useSelector(detailWarehouseState)
    const errorCreateWarehouseMessage = useSelector(errorCreateWarehouseMessageState)
    const errorUpdateWarehouseMessage = useSelector(errorUpdateWarehouseMessageState)
    const createWarehouseSuccessFlag = useSelector(createWarehouseSuccessFlagState)
    const updateWarehouseSuccessFlag = useSelector(updateWarehouseSuccessFlagState)
    const deleteWarehouseSuccessFlag = useSelector(deleteWarehouseSuccessFlagState)
    const [loading, setLoading] = useState(false)
    const [searchWarehouse, setSearchWarehouse] = useState('')
    const [branchId, setBranchId] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    const [open, setOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const {userInfo} = useUser()
    const userRole = useMemo(() => userInfo.role?.name ?? '', [userInfo])
    const userBranch = useMemo(() => userInfo.branch?.id ?? '', [userInfo])
    const isSuperAdmin = userRole === roles.SUPER_ADMIN

    const handleClickOpenModal = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        dispatch(getListAllWarehouseAction())
        dispatch(getListAllBranchAction())
    }, [])

    useEffect(() => {
        const searchWarehouseSelected = localStorage.getItem('searchWarehouse')
        const branchSelected = localStorage.getItem('branchSearch')

        setBranchId(branchSelected)
        setSearchWarehouse(searchWarehouseSelected)

        setLoading(true)
        setCurrentPage(1)

        const searchParams = {
            search_warehouse: searchWarehouseSelected || '',
            branch_id: branchSelected || null
        }

        dispatch(getListWarehousesAction(searchParams)).then(() => {
            setLoading(false)
        })
    }, [])

    const handleClearSearchWarehouse = () => {
        setSearchWarehouse('')
        setCurrentPage(1)
        setLoading(true)
        localStorage.removeItem('searchWarehouse')
        dispatch(getListWarehousesAction({branch_id: branchId})).then(() => {
            setLoading(false)
        })
    }

    const handleClearFilterBranch = () => {
        setBranchId(null)
        setCurrentPage(1)
        setLoading(true)
        localStorage.removeItem('branchSearch')
        dispatch(getListWarehousesAction({search_warehouse: searchWarehouse})).then(() => {
            setLoading(false)
        })
    }

    const handleSearchWarehouse = () => {
        setLoading(true)
        setCurrentPage(1)
        dispatch(getListWarehousesAction({search_warehouse: searchWarehouse, branch_id: branchId})).then(() => {
            setLoading(false)
        })
    }

    const handlePageChangeWarehouseTable = (event, page) => {
        setCurrentPage(page)
        setLoading(true)
        dispatch(setListWarehousesCurrentPage(page))
        if (searchWarehouse) {
            dispatch(getListWarehousesAction({
                search_warehouse: searchWarehouse,
                branch_id: branchId,
                page
            })).then(() => {
                setLoading(false)
            })
        } else {
            dispatch(getListWarehousesAction({page})).then(() => {
                setLoading(false)
            })
        }
    }

    const removeMessageError = useCallback(() => {
        dispatch(removeMessageErrorAction())
    }, [dispatch])

    const handleChange = (event) => {
        setSearchWarehouse(event.target.value)
        localStorage.setItem('searchWarehouse', event.target.value)
    }

    const handleBranchChange = (event, value) => {
        setBranchId(value ? value.id : '')
        localStorage.setItem('branchSearch', value ? value.id : '')
    }

    const handleEditClick = (item) => {
        dispatch(getDetailWarehouseAction({id: item.id}))
        setOpen(true)
        setIsEdit(true)
    }

    const handleCreateWarehouse = useCallback(
        async (value) => {
            try {
                setLoading(true)
                await dispatch(createWarehouseAction(value))
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        },
        [dispatch]
    )

    const handleEditWarehouse = useCallback(
        async (value) => {
            try {
                setLoading(true)
                await dispatch(updateWarehouseAction(value))
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        },
        [dispatch]
    )

    const handleDelete = useCallback(
        (id) => {
            dispatch(deleteWarehouseAction(id))
        },
        [dispatch]
    )

    useEffect(() => {
        if (createWarehouseSuccessFlag || updateWarehouseSuccessFlag || deleteWarehouseSuccessFlag) {
            setCurrentPage(1)
            setOpen(false)
            if (updateWarehouseSuccessFlag) {
                dispatch(getListWarehousesAction({
                    search_warehouse: searchWarehouse,
                    branch_id: branchId,
                    page: currentPage
                }))
            } else {
                dispatch(getListWarehousesAction({search_warehouse: searchWarehouse, branch_id: branchId, page: 1}))
            }
        }
    }, [createWarehouseSuccessFlag, updateWarehouseSuccessFlag, deleteWarehouseSuccessFlag])

    useEffect(() => {
        if (branchId) {
            handleSearchWarehouse()
        }
    }, [branchId])

    const handleView = (warehouseId) => {
        navigate(`/warehouse/warehouse-area-management/warehouse-details?id=${warehouseId}`)
    }

    const headers = useMemo(
        () => [
            {
                key: 'warehouseCode',
                label: t('warehouseCode'),
                align: 'left'
            },
            {
                key: 'warehouseName',
                label: t('warehouseName'),
                align: 'left'
            },
            {
                key: 'numberOfPositions',
                label: t('numberOfPositions'),
                align: 'right'
            },
            {
                key: 'numberOfKgStored',
                label: t('numberOfKgStored'),
                align: 'right'
            },
            {
                key: 'numberOfSquareMetersOfStorage',
                label: t('numberOfSquareMetersOfStorage'),
                align: 'right'
            },
            {
                key: 'actions',
                label: t('actions')
            }
        ],
        [t]
    )

    const rows = useMemo(() => {
        return listWarehouses.map((row, index) => ({
            warehouseCode: {
                label: row.code,
                cellWithButton: true
            },
            warehouseName: {
                label: row.warehouse_name,
                cellWithButton: true
            },
            numberOfPositions: {
                label: formatNumber(row.total_warehouse_location),
                cellWithButton: true
            },
            numberOfKgStored: {
                label: formatNumber(row.weight_inventory),
                cellWithButton: true
            },
            numberOfSquareMetersOfStorage: {
                label: formatNumber(row.square_meter_inventory),
                cellWithButton: true
            },
            actions: {
                label: (
                    <>
                        <Button onClick={() => handleView(row.id)} className="button-action">
                            <TbEye style={{color: colors.lightroyalblueColor, width: 24, height: 24}}/>
                        </Button>
                        <Button
                            disabled={row.disable_update}
                            className={`button-action ${row.disable_update ? 'disabled-cursor' : ''}`}
                            onClick={() => handleEditClick(row)}
                        >
                            <TbEdit style={{color: colors.amberColor, width: 24, height: 24}}/>
                        </Button>
                        <ModalDelete
                            disable={row.disable_delete}
                            successMessage={deleteWarehouseSuccessFlag}
                            id={row.id}
                            buttonName={t('delete')}
                            handleDelete={handleDelete}
                            tooltipMessage={t('canNotDeleteWarehouse')}
                        />
                    </>
                ),
            },
            id: {
                label: row.id
            }
        }))
    }, [listWarehouses])

    return (
        <>
            <HeaderPage
                title={t('warehouseAreaManagement')}
                actionButton={
                    <Button
                        className='modalButtonClick'
                        sx={{gap: '8px'}}
                        onClick={handleClickOpenModal}
                    >
                        <TbEdit/>
                        {t('addWarehouse')}
                    </Button>
                }
            />
            <Box sx={{padding: '16px'}}>
                <Box
                    component="form"
                    sx={{
                        bgcolor: colors.lilywhiteColor,
                        p: 2,
                        borderRadius: '6px',
                        position: 'relative',
                        flexGrow: 1
                    }}
                >
                    <Box sx={{marginBottom: '10px'}}>
                        <Box>
                            <Typography
                                sx={{
                                    paddingBottom: '1rem',
                                    fontWeight: 500,
                                    fontSize: 20,
                                    fontFamily: 'Be Vietnam Pro',
                                    color: '#2B3674'
                                }}
                            >
                                {t('listWarehouses')}
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', gap: 1}}>
                            <SearchBar
                                searchValue={searchWarehouse}
                                handleOnChangeValue={handleChange}
                                handleSearch={handleSearchWarehouse}
                                handleClearSearch={handleClearSearchWarehouse}
                                placeholderText="enterWarehouseNameAndCode"
                                buttonText="find"
                            />
                            {isSuperAdmin && (
                                <Autocomplete
                                    popupIcon={<PolygonIcon/>}
                                    size="small"
                                    className="autocomplete-container"
                                    options={branches}
                                    value={branches.find((option) => option.id === Number(branchId)) ?? null}
                                    onChange={(event, value) => {
                                        handleBranchChange(event, value)
                                        if (!value) {
                                            handleClearFilterBranch()
                                        }
                                    }}
                                    getOptionLabel={(option) => option.branch_name}
                                    renderInput={(params) => <TextField {...params} placeholder={t('branch')}
                                                                        variant="outlined"/>}
                                    ListboxProps={{sx: {maxHeight: 220, fontSize: '12px'}}}
                                    classes={{inputRoot: 'custom-input-search'}}
                                    sx={{minWidth: '13rem'}}
                                />
                            )}
                        </Box>
                    </Box>
                    <Box>
                        {!loading && (
                            <BasicTable
                                loading={loading}
                                headers={headers}
                                rows={rows}
                                totalPages={totalPagesListWarehouses}
                                currentPage={currentPage}
                                showIndex
                                handlePageChange={handlePageChangeWarehouseTable}
                                navigateToDetail={handleView}
                            />
                        )}
                    </Box>
                </Box>
                <WarehouseAreaModal
                    isLoading={loading}
                    setLoading={setLoading}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    open={open}
                    handleCreateWarehouse={handleCreateWarehouse}
                    handleEditWarehouse={handleEditWarehouse}
                    handleSearchWarehouse={handleSearchWarehouse}
                    onClose={handleClose}
                    userRole={userRole}
                    userBranch={userBranch}
                    listBranch={listBranch}
                    currentData={getDetailWarehouse}
                    createWarehouseSuccessFlag={createWarehouseSuccessFlag}
                    updateWarehouseSuccessFlag={updateWarehouseSuccessFlag}
                    errorCreateWarehouseMessage={errorCreateWarehouseMessage}
                    errorUpdateWarehouseMessage={errorUpdateWarehouseMessage}
                    removeMessageError={removeMessageError}
                />
            </Box>
        </>
    )
}
