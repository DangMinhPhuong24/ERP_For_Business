// @ts-nocheck
import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {Box, Button, Tooltip, Typography} from '@mui/material'
import colors from '../../../constants/colors'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import DepartmentModal from '../../../components/Modal/Account/Department/Create'
import {
    createDepartmentAction,
    deleteDepartmentAction,
    getAllDepartmentAction,
    getListDepartmentAction,
    updateDepartmentAction
} from '../../../redux/account/account.actions'
import {
    createDepartmentSuccessFlagState,
    deleteDepartmentSuccessFlagState,
    departmentAllState,
    listDepartmentState,
    totalPagesState,
    updateDepartmentSuccessFlagState
} from '../../../redux/account/account.selectors'
import HeaderPage from 'components/HeaderPage'
import BasicTable from "../../../components/BasicTable";
import {TbEdit} from "react-icons/tb";
import ModalDelete from "../../../components/Modal/Common/delete";
import { formatNumber }  from '../../../common/common'

const DepartmentPage = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [currentData, setCurrentData] = useState(null)
    const [loading, setLoading] = useState(false)
    const listDepartment = useSelector(listDepartmentState)
    const totalPages = useSelector(totalPagesState)
    const createDepartmentSuccessFlag = useSelector(createDepartmentSuccessFlagState)
    const updateDepartmentSuccessFlag = useSelector(updateDepartmentSuccessFlagState)
    const deleteDepartmentSuccessFlag = useSelector(deleteDepartmentSuccessFlagState)
    const departmentAll = useSelector(departmentAllState)
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        dispatch(getListDepartmentAction())
        dispatch(getAllDepartmentAction())
    }, [dispatch])

    useEffect(() => {
        if (createDepartmentSuccessFlag || updateDepartmentSuccessFlag || deleteDepartmentSuccessFlag) {
            setCurrentPage(1)
            dispatch(getListDepartmentAction())
        }
    }, [createDepartmentSuccessFlag, updateDepartmentSuccessFlag, deleteDepartmentSuccessFlag, dispatch])

    const handleClickOpen = () => {
        setCurrentData(null)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handlePageChange = (event, page) => {
        setLoading(true)
        setCurrentPage(page)
        dispatch(getListDepartmentAction({page})).then(() => setLoading(false))
    }

    const handleCreateDepartment = useCallback(
        (value) => {
            dispatch(createDepartmentAction(value))
        },
        [dispatch]
    )

    const handleEditDepartment = useCallback(
        (value) => {
            dispatch(updateDepartmentAction(value))
        },
        [dispatch]
    )

    const handleEditClick = (item) => {
        setCurrentData(item)
        setOpen(true)
    }

    const handleDeleteDepartment = useCallback(
        (id) => {
            dispatch(deleteDepartmentAction(id))
        },
        [dispatch]
    )

    const headers = useMemo(
        () => [
            {
                key: 'nameDepartment',
                label: t('nameDepartment'),
                align: 'left'
            },
            {
                key: 'description',
                label: t('description'),
                align: 'left'
            },
            {
                key: 'numberAccount',
                label: t('numberAccount'),
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
        return listDepartment.map((row, index) => ({
            nameDepartment: {
                label: row.department_name
            },
            description: {
                label: row.description
            },
            numberAccount: {
                label: formatNumber(row.quantity_account)
            },
            actions: {
                label: (
                    <>
                        <Button className="button-action" onClick={() => handleEditClick(row)}>
                            <TbEdit style={{color: colors.amberColor, width: 24, height: 24}}/>
                        </Button>
                        <ModalDelete
                            successFlag={deleteDepartmentSuccessFlag}
                            id={row.id}
                            buttonName={t('delete')}
                            handleDelete={handleDeleteDepartment}
                            disable={row.quantity_account > 0}
                            tooltipMessage={t('departmentInUse')}
                        />
                    </>
                ),
            },
            id: {
                label: row.id
            }
        }))
    }, [listDepartment])

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <HeaderPage
                title={t('departmentManagement')}
                actionButton={
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button className="modalButtonClick" sx={{gap: '8px'}} onClick={handleClickOpen}>
                            <AddCircleOutlineIcon/>
                            {t('addDepartment')}
                        </Button>
                    </Box>
                }
            />
            <Box p={2}>
                <Box
                    component="form"
                    sx={{bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '20px', position: 'relative'}}
                >
                    <Box sx={{display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem'}}>
                        <Typography sx={{fontWeight: '500', fontSize: '20px', color: colors.indigoColor}}>
                            {t('departmentList')}
                        </Typography>
                    </Box>
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
                </Box>
            </Box>
            {open && (
                <DepartmentModal
                    handleCreateDepartment={handleCreateDepartment}
                    handleEditDepartment={handleEditDepartment}
                    open={open}
                    onClose={handleClose}
                    currentData={currentData}
                    departmentAll={departmentAll}
                />
            )}
        </Box>
    )
}

export default DepartmentPage
