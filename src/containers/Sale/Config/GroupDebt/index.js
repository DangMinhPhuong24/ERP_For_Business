import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from "react-i18next";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { checkAttributeValue } from "../../../../common/common";
import GruopDebtModal from "../../../../components/Modal/Config/GruopDebt";
import GruopDebtTable from "../../../../components/Table/ConfigTable/GruopDebt";
import colors from "../../../../constants/colors";
import { permissionActions } from "../../../../constants/titlePermissions";
import {
    createDebtGroupAction,
    deleteDataDebtGroupConfigAction,
    getDebtGroupListAction,
    removeMessageErrorAction,
    updateDebtGroupAction,
} from "../../../../redux/config/config.actions";
import {
    createDebtGroupSuccessFlagState,
    debtGroupListState,
    deleteDebtGroupConfigErrorMessageState,
    deleteDebtGroupConfigSuccessMessageState,
    errorMessageDebtGroupState,
    errorsMessageCreateDebtGroupState,
    errorsMessageUpdateDebtGroupState,
    totalPagesDebtGroupState,
    updateDebtGroupSuccessFlagState,
} from "../../../../redux/config/config.selectors";
import { useRoleCheck } from "../../../../utils/auth";

function GruopDebtPage() {
    const { t } = useTranslation();
    const listGroupDebt = useSelector(debtGroupListState);
    const totalPages = useSelector(totalPagesDebtGroupState);
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
    const [selectedGroupDebt, setSelectedGroupDebt] = useState(null);
    const errorsMessageCreateGruopDebt = useSelector(errorsMessageCreateDebtGroupState);
    const createGruopDebtSuccessFlag = useSelector(createDebtGroupSuccessFlagState);
    const deleteSuccessMessage = useSelector(deleteDebtGroupConfigSuccessMessageState);
    const deleteDebtGroupErrorMessage = useSelector(deleteDebtGroupConfigErrorMessageState);
    const updateDebtGroupSuccessFlag = useSelector(updateDebtGroupSuccessFlagState);
    const errorsMessageUpdateDebtGroup = useSelector(errorsMessageUpdateDebtGroupState);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const errorMessageDebtGroup = useSelector(errorMessageDebtGroupState);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [currentPageGruopDebt, setCurrentPageGruopDebt] = useState(1)
    const { isSuperAdmin, userInfo } = useRoleCheck();
    const permissionsData = useMemo(
        () => (Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : []),
        [userInfo]
    )

    useEffect(() => {
        dispatch(getDebtGroupListAction());
    }, [dispatch]);

    useEffect(() => {
        if (deleteSuccessMessage || deleteDebtGroupErrorMessage) {
            if (deleteSuccessMessage !== "") {
                refreshData();
            }
        }
    }, [deleteSuccessMessage, deleteDebtGroupErrorMessage]);

    useEffect(() => {
        if (createGruopDebtSuccessFlag) {
            removeMessageError()
            setIsCreateModalOpen(false);
            refreshData();
        }
    }, [createGruopDebtSuccessFlag]);

    useEffect(() => {
        if (updateDebtGroupSuccessFlag) {
            removeMessageError()
            setIsOpenUpdateModal(false);
            refreshData();
        }
    }, [updateDebtGroupSuccessFlag]);

    const handlePageChange = (event, page) => {
        setLoading(true);
        setCurrentPageGruopDebt(page)
        dispatch(getDebtGroupListAction({ page })).then(() => {
            setLoading(false);
        });
    };
    const refreshData = useCallback((params) => {
        setCurrentPageGruopDebt(1)
        dispatch(getDebtGroupListAction(params));
    }, []);

    const handleDetailGroupDebt = useCallback((groupDebtData) => {
        setSelectedGroupDebt(groupDebtData);
        setIsOpenUpdateModal(true);
    }, []);

    const updateDebtGroup = useCallback((value) => {
        dispatch(updateDebtGroupAction(value))
    }, []);

    const createGruopDebt = useCallback((value) => {
        dispatch(createDebtGroupAction(value));
    }, [dispatch]);

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const deleteDebtGroup = useCallback((params) => {
        dispatch(deleteDataDebtGroupConfigAction(params));
    }, []);

    const removeMessageError = useCallback(() => {
        dispatch(removeMessageErrorAction());
    }, [dispatch]);

    const handleCloseCreateModal = useCallback(() => {
        setIsCreateModalOpen(false);
        removeMessageError()
    }, []);

    const handleCloseUpdateModal = useCallback(() => {
        setIsOpenUpdateModal(false);
        removeMessageError()
    }, []);

    return (
        <Box component="form" sx={{
            bgcolor: colors.lilywhiteColor,
            borderRadius: '10px',
            padding: '15px',
            position: 'relative',
            width: 'auto',
            height: '451px',
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography sx={{ fontSize: '20px', fontWeight: 500, lineHeight: '32px', color: colors.indigoColor }}>
                        {t("debtGroup")}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', }}>
                    {(isSuperAdmin || checkAttributeValue(permissionsData, 'name', permissionActions.CREATE_DEBT_GROUP)) && (
                        <Button
                            sx={{ mr: 1, gap: '8px', fontSize: '14px', fontWeight: 500 }}
                            onClick={openCreateModal}
                            className="modalButtonClick"
                        >
                            <IoIosAddCircleOutline sx={{ width: '14px', height: '14px' }} />
                            {t('addDebtGroup')}
                        </Button>
                    )}
                    {isCreateModalOpen && (
                        <GruopDebtModal
                            open={isCreateModalOpen}
                            nameTitle={t("addDebtGroup")}
                            handleCreateGruopDebt={createGruopDebt}
                            errorsMessage={errorMessageDebtGroup}
                            successFlag={createGruopDebtSuccessFlag}
                            closeModalAction={removeMessageError}
                            handleClose={handleCloseCreateModal}
                            isEdit={false}
                        />
                    )}
                </Box>
            </Box>
            <div style={{ marginTop: '5px' }}>
                <GruopDebtTable
                    data={listGroupDebt}
                    successMessage={deleteSuccessMessage}
                    errorMessage={deleteDebtGroupErrorMessage}
                    handlerDelete={deleteDebtGroup}
                    handlerUpdate={handleDetailGroupDebt}
                    loading={loading}
                    handlePageChange={handlePageChange}
                    currentPagePagination={currentPageGruopDebt}
                    totalPages={totalPages}
                />
            </div>
            {isOpenUpdateModal && (
                <GruopDebtModal
                    nameTitle={t("updateDebtGroups")}
                    handleDetailGroupDebt={handleDetailGroupDebt}
                    handleUpdateGruopDebt={updateDebtGroup}
                    errorsMessage={errorMessageDebtGroup}
                    successFlag={updateDebtGroupSuccessFlag}
                    closeModalAction={() => {
                        removeMessageError();
                        setSelectedGroupDebt(null);
                    }}
                    groupDebtData={selectedGroupDebt}
                    isEdit={true}
                    open={isOpenUpdateModal}
                    handleClose={handleCloseUpdateModal}
                />
            )}
        </Box>
    )
}

export default GruopDebtPage
