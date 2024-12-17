// @ts-nocheck
import {AddCircleOutlineRounded, VisibilityOutlined} from '@mui/icons-material'
import {Button, IconButton} from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import roles from 'constants/titleRole'
import React, {useEffect, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import HeaderPage from '../../../components/HeaderPage'
import colors from '../../../constants/colors'
import {deleteRoleAction, getRoleListAction} from '../../../redux/account/account.actions'
import {deleteRoleSuccessFlagState, roleListState, totalRoleGroupState} from '../../../redux/account/account.selectors'
import {setQuoteListPage} from '../../../redux/config/config.slice'
import {useRoleCheck} from "../../../utils";
import BasicTable from "../../../components/BasicTable";
import {formatNumber} from "../../../common/common";
import {TbEdit} from "react-icons/tb";
import ModalDelete from "../../../components/Modal/Common/delete";

function RolesPage() {
    const navigate = useNavigate()
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const totalPages = useSelector(totalRoleGroupState)
    const deleteRoleSuccessFlag = useSelector(deleteRoleSuccessFlagState)
    const roleData = useSelector(roleListState)
    const [loading, setLoading] = useState(false)
    const {isSuperAdmin} = useRoleCheck();
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        dispatch(getRoleListAction())
    }, [dispatch])

    const handlePageChange = (event, page) => {
        setLoading(true)
        setCurrentPage(page)
        dispatch(setQuoteListPage(page))
        dispatch(getRoleListAction({page})).then(() => {
            setLoading(false)
        })
    }
    useEffect(() => {
        if (deleteRoleSuccessFlag) {
            setLoading(true)
            setCurrentPage(1)
            dispatch(getRoleListAction()).then(() => setLoading(false))
        }
    }, [deleteRoleSuccessFlag])

    const handleDelete = (params) => {
        dispatch(deleteRoleAction(params))
    }

    const handleChangeEdit = (id) => {
        navigate(`/account/roles/edit?id=${id}`)
    }

    const handleChangeShow = (id) => {
        navigate(`/account/roles/show?id=${id}`)
    }

    const headers = useMemo(
        () => [
            {
                key: 'permissionName',
                label: t('permissionName'),
                align: 'left'
            },
            {
                key: 'typeOfRight',
                label: t('typeOfRight'),
                align: 'left'
            },
            {
                key: 'numberOfAccounts',
                label: t('numberOfAccounts'),
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
        return roleData.map((row, index) => ({
            permissionName: {
                label: row.display_name,
                cellWithButton: true
            },
            typeOfRight: {
                label: row.type?.display_name || 'Super Admin',
                cellWithButton: true
            },
            numberOfAccounts: {
                label: formatNumber(row.quantity),
                cellWithButton: true
            },
            actions: {
                label: (
                    <>
                        <IconButton onClick={() => handleChangeShow(row.id)}>
                            <VisibilityOutlined color="primary"/>
                        </IconButton>
                        {!row.is_protected ? (
                            <>
                                <IconButton onClick={() => handleChangeEdit(row.id)}>
                                    <TbEdit style={{color: colors.amberColor}}/>
                                </IconButton>
                                <ModalDelete
                                    disable={row.is_disabled}
                                    tooltipMessage={t('permissionsCanOnlyBeRemovedWhenTheNumberOfAccountsIsZero')}
                                    successFlag={deleteRoleSuccessFlag}
                                    id={row.id}
                                    handleDelete={handleDelete}
                                />
                            </>
                        ) : null}
                    </>
                ),
            },
            id: {
                label: row.id
            }
        }))
    }, [roleData])

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <HeaderPage
                title={t('roles')}
                actionButton={
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        {isSuperAdmin ? (
                            <Button
                                variant="contained"
                                onClick={() => {
                                    navigate('/account/roles/create')
                                }}
                                className="addButton"
                                startIcon={<AddCircleOutlineRounded/>}
                            >
                                {t('addRole')}
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                className="addButton disabled-cursor"
                                disabled
                                startIcon={<AddCircleOutlineRounded/>}
                            >
                                {t('addRole')}
                            </Button>
                        )}
                    </Box>
                }
            />
            <Box sx={{bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '20px', margin: 2}}>
                <Typography variant="h6" sx={{color: colors.indigoColor}}>
                    {t('permissionsList')}
                </Typography>
                {!loading && (
                    <BasicTable
                        loading={loading}
                        headers={headers}
                        rows={rows}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        showIndex
                        handlePageChange={handlePageChange}
                        navigateToDetail={handleChangeShow}
                    />
                )}
            </Box>
        </Box>
    )
}

export default RolesPage
