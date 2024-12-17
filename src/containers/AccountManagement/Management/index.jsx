import React, {useCallback, useEffect, useMemo, useState} from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import colors from '../../../constants/colors'
import Typography from '@mui/material/Typography'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import TextField from '@mui/material/TextField'
import {
    createDataUserAction,
    deleteDataUserAction,
    getAllDepartmentAction,
    getAllDepartmentForUserAction,
    getAllRoleForUserAction,
    getListAllBranchAction,
    getListRolesAction,
    getUserDetailAction,
    getUserListAction,
    removeMessageErrorAction,
    updateDataUserAction
} from '../../../redux/account/account.actions'
import {
    createUserSuccessFlagState,
    deleteUserSuccessFlagState,
    departmentAllForUserState,
    departmentAllState,
    errorsMessageCreateUserState,
    errorsMessageupdateUserState,
    listBranchsState,
    roleAllForUserState,
    roleListAllState,
    totalUserGroupState,
    updateUserSuccessFlagState,
    userDetailState,
    userListState
} from '../../../redux/account/account.selectors'
import {setUserCurrentPage} from '../../../redux/account/account.slice'
import Autocomplete from '@mui/material/Autocomplete'
import UserModal from '../../../components/Modal/Account/AccountManagement/Create'
import PolygonIcon from '../../../asset/icon/Polygon.svg'
import {RiUserAddLine} from 'react-icons/ri'
import {useUser} from '../../../contexts/AuthContext'
import roles from '../../../constants/titleRole'
import HeaderPage from 'components/HeaderPage'
import SearchBar from "../../../components/Buttons/Search";
import BasicTable from "../../../components/BasicTable";
import {TbEdit} from "react-icons/tb";
import ModalDelete from "../../../components/Modal/Common/delete";

function ManagementPage() {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')
    const totalPages = useSelector(totalUserGroupState)
    const userData = useSelector(userListState)
    const deleteUserSuccessFlag = useSelector(deleteUserSuccessFlagState)
    const createUserSuccessFlag = useSelector(createUserSuccessFlagState)
    const errorsMessageCreateUser = useSelector(errorsMessageCreateUserState)
    const updateUserSuccessFlag = useSelector(updateUserSuccessFlagState)
    const errorsMessageUpdateUser = useSelector(errorsMessageupdateUserState)
    const rolesData = useSelector(roleListAllState)
    const userDetail = useSelector(userDetailState)
    const listBranch = useSelector(listBranchsState)
    const departmentAll = useSelector(departmentAllState)
    const departmentAllForUser = useSelector(departmentAllForUserState)
    const roleAllForUser = useSelector(roleAllForUserState)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState(null)
    const [loading, setLoading] = useState(false)
    const [selectedBranch, setSelectedBranch] = useState(null)
    const [selectedDepartment, setSelectedDepartment] = useState(null)
    const normalizedListBranch = Array.isArray(listBranch) ? listBranch : [listBranch]
    const {userInfo} = useUser()
    const userRole = useMemo(() => userInfo.role?.name ?? '', [userInfo])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(getUserListAction())
        dispatch(getListRolesAction())
        dispatch(getListAllBranchAction())
        dispatch(getAllDepartmentAction())
    }, [])

    const deleteUser = useCallback((params) => {
        dispatch(deleteDataUserAction(params))
    }, [])

    const handleCreateUser = useCallback(
        (value) => {
            dispatch(createDataUserAction(value))
        },
        [dispatch]
    )

    const updateUser = useCallback(
        (value) => {
            dispatch(updateDataUserAction(value))
        },
        [dispatch]
    )

    useEffect(() => {
        if (createUserSuccessFlag || updateUserSuccessFlag || deleteUserSuccessFlag) {
            if (createUserSuccessFlag) {
                setIsCreateModalOpen(false)
            }
            if (updateUserSuccessFlag) {
                setIsUpdateModalOpen(false)
            }
            dispatch(
                getUserListAction({
                    search_user: searchValue,
                    role_name: selectedRole?.name,
                    branch_id: selectedBranch?.id,
                    department_id: selectedDepartment?.id
                })
            )
        }
    }, [
        createUserSuccessFlag,
        updateUserSuccessFlag,
        deleteUserSuccessFlag,
        dispatch,
        selectedRole,
        selectedBranch,
        selectedDepartment
    ])

    const removeMessageError = useCallback(() => {
        dispatch(removeMessageErrorAction())
    }, [dispatch])

    const handlePageChange = (event, page) => {
        setLoading(true)
        setCurrentPage(page)
        dispatch(setUserCurrentPage(page))
        dispatch(
            getUserListAction({
                search_user: searchValue,
                role_name: selectedRole?.name,
                page,
                branch_id: selectedBranch?.id,
                department_id: selectedDepartment?.id
            })
        ).then(() => {
            setLoading(false)
        })
    }

    const handleSearch = (params) => {
        setLoading(true)
        setCurrentPage(1)
        if (params === '') {
            dispatch(getUserListAction()).then(() => {
                setLoading(false)
            })
        } else {
            dispatch(
                getUserListAction({
                    search_user: searchValue,
                    role_name: selectedRole?.name,
                    branch_id: selectedBranch?.id,

                    department_id: selectedDepartment?.id
                })
            ).then(() => {
                setLoading(false)
            })
        }
    }

    const handleSearchSelected = useCallback(() => {
        setLoading(true)
        setCurrentPage(1)
        dispatch(
            getUserListAction({
                search_user: searchValue,
                branch_id: selectedBranch?.id,
                role_name: selectedRole?.name,
                department_id: selectedDepartment?.id
            })
        ).then(() => {
            setLoading(false)
        })
    }, [dispatch, searchValue, selectedBranch, selectedRole, selectedDepartment])

    const handleClearSearchRole = useCallback(() => {
        setSelectedRole(null)
        setCurrentPage(1)
        dispatch(
            getUserListAction({
                search_user: searchValue,
                branch_id: selectedBranch?.id,
                department_id: selectedDepartment?.id
            })
        )
    }, [dispatch, searchValue, selectedBranch, selectedDepartment])

    const handleClearSearchBranch = useCallback(() => {
        setSelectedBranch(null)
        setCurrentPage(1)
        dispatch(
            getUserListAction({
                search_user: searchValue,
                role_name: selectedRole?.name,
                department_id: selectedDepartment?.id
            })
        )
    }, [dispatch, searchValue, selectedRole, selectedDepartment])

    const handleClearSearchDepartment = useCallback(() => {
        setSelectedDepartment(null)
        setCurrentPage(1)
        dispatch(getUserListAction({
            search_user: searchValue,
            role_name: selectedRole?.name,
            branch_id: selectedBranch?.id
        }))
    }, [dispatch, searchValue, selectedRole, selectedBranch])

    const handleClearSearch = useCallback(() => {
        setSearchValue('')
        setCurrentPage(1)
        dispatch(
            getUserListAction({
                role_name: selectedRole?.name,
                branch_id: selectedBranch?.id,
                department_id: selectedDepartment?.id
            })
        )
    }, [dispatch, selectedRole, selectedBranch, selectedDepartment])

    const openCreateModal = () => {
        dispatch(getAllDepartmentForUserAction())
        dispatch(getAllRoleForUserAction())
        setIsCreateModalOpen(true)
    }

    const handleUpdateUser = useCallback(
        (params) => {
            dispatch(getUserDetailAction(params))
            dispatch(getAllDepartmentForUserAction())
            dispatch(getAllRoleForUserAction())
            setIsUpdateModalOpen(true)
        },
        [dispatch]
    )

    const handleCloseUpdateModal = useCallback(() => {
        setIsUpdateModalOpen(false)
    }, [])

    const handleCloseCreateModal = useCallback(() => {
        setIsCreateModalOpen(false)
    }, [])

    useEffect(() => {
        if (selectedRole !== null || selectedBranch !== null || selectedDepartment !== null) {
            handleSearchSelected()
        }
    }, [selectedRole, selectedBranch, selectedDepartment])

    const headers = useMemo(
        () => [
            {
                key: 'username',
                label: t('username'),
                align: 'left'
            },
            {
                key: 'Gmail',
                label: t('Gmail'),
                align: 'left'
            },
            {
                key: 'firstAndLastName',
                label: t('firstAndLastName'),
                align: 'left'
            },
            {
                key: 'decentralization',
                label: t('decentralization'),
                align: 'left'
            },
            {
                key: 'departments',
                label: t('departments'),
                align: 'left'
            },
            {
                key: 'branch',
                label: t('branch'),
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
        return userData.map((row) => ({
            username: {
                label: row.username
            },
            Gmail: {
                label: row.email
            },
            firstAndLastName: {
                label: row.name
            },
            decentralization: {
                label: row.role.display_name
            },
            departments: {
                label: row.department.department_name
            },
            branch: {
                label: row.branch.branch_name
            },
            actions: {
                label: (
                    <>
                        <Button
                            className="button-action"
                            onClick={() => handleUpdateUser(row.id)}>
                            <TbEdit style={{color: colors.amberColor}}/>
                        </Button>
                        <ModalDelete
                            successFlag={deleteUserSuccessFlag}
                            id={row.id}
                            buttonName={t('delete')}
                            handleDelete={deleteUser}
                        />
                    </>
                ),
            },
            id: {
                label: row.id
            }
        }))
    }, [userData])

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <HeaderPage
                title={t('accountManagement')}
                actionButton={
                    <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button sx={{gap: '8px'}} onClick={openCreateModal} className="modalButtonClick">
                            <RiUserAddLine style={{fontSize: '16px', marginBottom: '2px'}}/>
                            {t('addAccount')}
                        </Button>
                    </Box>
                }
            />
            <UserModal
                open={isCreateModalOpen}
                nameTitle={t('addAccount')}
                rolesData={roleAllForUser}
                handleClose={handleCloseCreateModal}
                errorsMessage={errorsMessageCreateUser}
                successFlag={createUserSuccessFlag}
                isEdit={false}
                handleCreateUser={handleCreateUser}
                closeModalAction={removeMessageError}
                listBranch={listBranch}
                departmentForUserData={departmentAllForUser}
            />

            <Box p={2}>
                <Box
                    component="form"
                    sx={{bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '20px', position: 'relative'}}
                >
                    <Typography className="frontpager">{t('accountList')}</Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            gap: '0 8px',
                            marginTop: '30px'
                        }}
                    >
                        <SearchBar
                            searchValue={searchValue}
                            handleOnChangeValue={(e) => setSearchValue(e.target.value)}
                            handleSearch={handleSearch}
                            handleClearSearch={handleClearSearch}
                            placeholderText="search"
                            buttonText="find"
                        />
                        <Autocomplete
                            popupIcon={<PolygonIcon/>}
                            noOptionsText={t('noResult')}
                            size="small"
                            sx={{flex: 0.5}}
                            onChange={(event, newValue) => {
                                setSelectedRole(newValue)
                                if (!newValue) {
                                    handleClearSearchRole()
                                }
                            }}
                            value={selectedRole}
                            options={rolesData}
                            getOptionLabel={(options) => (options.display_name ? options.display_name : '')}
                            renderInput={(params) => <TextField {...params} placeholder={t('permission')}
                                                                variant="outlined"/>}
                            ListboxProps={{sx: {maxHeight: 220, fontSize: '12px'}}}
                            classes={{inputRoot: 'custom-input-search'}}
                        />
                        <Autocomplete
                            popupIcon={<PolygonIcon/>}
                            noOptionsText={t('noResult')}
                            size="small"
                            sx={{flex: 0.5}}
                            onChange={(event, newValue) => {
                                setSelectedDepartment(newValue)
                                if (!newValue) {
                                    handleClearSearchDepartment()
                                }
                            }}
                            value={selectedDepartment}
                            options={departmentAll}
                            getOptionLabel={(options) => (options.department_name ? options.department_name : '')}
                            renderInput={(params) => <TextField {...params} placeholder={t('departments')}
                                                                variant="outlined"/>}
                            ListboxProps={{sx: {maxHeight: 220, fontSize: '12px'}}}
                            classes={{inputRoot: 'custom-input-search'}}
                        />
                        {userRole === roles.SUPER_ADMIN && (
                            <Autocomplete
                                popupIcon={<PolygonIcon/>}
                                noOptionsText={t('noResult')}
                                size="small"
                                sx={{flex: 0.5}}
                                onChange={(event, newValue) => {
                                    setSelectedBranch(newValue)
                                    if (!newValue) {
                                        handleClearSearchBranch()
                                    }
                                }}
                                value={selectedBranch}
                                options={normalizedListBranch}
                                getOptionLabel={(options) => (options.branch_name ? options.branch_name : '')}
                                renderInput={(params) => <TextField {...params} placeholder={t('branch')}
                                                                    variant="outlined"/>}
                                ListboxProps={{sx: {maxHeight: 220, fontSize: '12px'}}}
                                classes={{inputRoot: 'custom-input-search'}}
                            />
                        )}
                        <Box sx={{flex: 1.5}}></Box>
                    </Box>
                    <Box mt={2}>
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
                    <UserModal
                        open={isUpdateModalOpen}
                        nameTitle={t('editAccount')}
                        rolesData={roleAllForUser}
                        handleClose={handleCloseUpdateModal}
                        errorsMessage={errorsMessageUpdateUser}
                        successFlag={updateUserSuccessFlag}
                        isEdit={true}
                        data={userDetail}
                        handleUpdateUser={updateUser}
                        closeModalAction={removeMessageError}
                        listBranch={listBranch}
                        departmentForUserData={departmentAll}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default ManagementPage
