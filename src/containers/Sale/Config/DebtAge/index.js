import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DebtAgeTable from "../../../../components/Table/ConfigTable/DebtAge";
import DebtAgeModal from "../../../../components/Modal/Config/DebtAge";
import { useDispatch, useSelector } from "react-redux";
import {
    createDebtAgeSuccessFlagState,
    debtAgeListState,
    deleteDebtAgeConfigErrorMessageState,
    deleteDebtAgeConfigSuccessMessageState,
    errorsMessageCreateDebtAgeState,
    errorsMessageUpdateDebtAgeState,
    totalPagesDebtAgeState,
    updateDebtAgeSuccessFlagState
} from "../../../../redux/config/config.selectors";
import {
    createDebtAgeAction,
    deleteDataDebtAgeConfigAction,
    getDebtAgeListAction,
    removeMessageErrorAction,
    updateDebtAgeAction,
} from "../../../../redux/config/config.actions";
import PaginationComponent from "../../../../components/Paginate/index";
import colors from "../../../../constants/colors";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useRoleCheck } from "../../../../utils";
import { checkAttributeValue } from "../../../../common/common";
import { permissionActions } from "../../../../constants/titlePermissions";

function DebtAgePage() {
    const { t } = useTranslation();
    const listGroupAge = useSelector(debtAgeListState);
    const totalPages = useSelector(totalPagesDebtAgeState);
    const errorsMessageCreateDebtAge = useSelector(errorsMessageCreateDebtAgeState);
    const createDebtAgeSuccessFlag = useSelector(createDebtAgeSuccessFlagState);
    const deleteSuccessMessage = useSelector(deleteDebtAgeConfigSuccessMessageState);
    const deleteDebtAgeErrorMessage = useSelector(deleteDebtAgeConfigErrorMessageState);
    const updateDebtAgeSuccessFlag = useSelector(updateDebtAgeSuccessFlagState);
    const errorsMessageUpdateDebtAge = useSelector(errorsMessageUpdateDebtAgeState);
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
    const [selectedDebtAge, setSelectedDebtAge] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [currentPageDebtAge, setCurrentPageDebtAge] = useState(1)
    const { isSuperAdmin, userInfo } = useRoleCheck();
    const permissionsData = useMemo(
        () => (Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : []),
        [userInfo]
    )

    useEffect(() => {
        dispatch(getDebtAgeListAction());
    }, [dispatch]);

    useEffect(() => {
        if (deleteSuccessMessage || deleteDebtAgeErrorMessage) {
            if (deleteSuccessMessage !== "") {
                refreshData();
            }
        }
    }, [deleteSuccessMessage, deleteDebtAgeErrorMessage]);

    useEffect(() => {
        if (createDebtAgeSuccessFlag || updateDebtAgeSuccessFlag) {
            removeMessageError()
            setIsCreateModalOpen(false);
            setIsOpenUpdateModal(false);
            refreshData();
        }
    }, [createDebtAgeSuccessFlag, updateDebtAgeSuccessFlag]);

    const openCreateModal = () => {
        setIsCreateModalOpen(true);
    };

    const handleDetailDebtAge = useCallback((debtAgeData) => {
        setSelectedDebtAge(debtAgeData);
        setIsOpenUpdateModal(true);
    }, []);

    const handleCloseCreateModal = useCallback(() => {
        setIsCreateModalOpen(false);
        removeMessageError()
    }, []);

    const refreshData = useCallback((params) => {
        setCurrentPageDebtAge(1)
        dispatch(getDebtAgeListAction(params));
    }, []);

    const createDebtAge = useCallback((value) => {
        dispatch(createDebtAgeAction(value));
    }, [dispatch]);

    const deleteDebtAge = useCallback((params) => {
        dispatch(deleteDataDebtAgeConfigAction(params));
    }, []);

    const updateDebtAge = useCallback((value) => {
        dispatch(updateDebtAgeAction(value))
    }, []);

    const handlePageChange = (event, page) => {
        setLoading(true);
        setCurrentPageDebtAge(page)
        dispatch(getDebtAgeListAction({ page })).then(() => {
            setLoading(false);
        });
    };

    const removeMessageError = useCallback(() => {
        dispatch(removeMessageErrorAction());
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
                        {t("debtAge")}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {(isSuperAdmin || checkAttributeValue(permissionsData, 'name', permissionActions.CREATE_DEBT_AGE)) && (
                        <Button
                            sx={{ mr: 1, gap: '8px', fontSize: '14px', fontWeight: 500 }}
                            onClick={openCreateModal}
                            className="modalButtonClick"
                        >
                            <IoIosAddCircleOutline sx={{ width: '13.33px', height: '13.33px' }} />
                            {t('addDebtAge')}
                        </Button>
                    )}
                    {isCreateModalOpen && (
                        <DebtAgeModal
                            open={isCreateModalOpen}
                            nameTitle={t("addDebtAge")}
                            handleCreateDebtAge={createDebtAge}
                            errorsMessage={errorsMessageCreateDebtAge}
                            successFlag={createDebtAgeSuccessFlag}
                            handleClose={handleCloseCreateModal}
                            isEdit={false}
                            closeModalAction={() => {
                                setSelectedDebtAge(null);
                                removeMessageError();
                            }}
                        />
                    )}
                </Box>
            </Box>
            <div style={{ marginTop: '5px' }}>
                <DebtAgeTable
                    data={listGroupAge}
                    successMessage={deleteSuccessMessage}
                    errorMessage={deleteDebtAgeErrorMessage}
                    handlerDelete={deleteDebtAge}
                    handlerUpdate={handleDetailDebtAge}
                    loading={loading}
                    handlePageChange={handlePageChange}
                    currentPagePagination={currentPageDebtAge}
                    totalPages={totalPages}
                />
            </div>
            {isOpenUpdateModal && (
                <DebtAgeModal
                    nameTitle={t("updateDebtAge")}
                    handleDetailDebtAge={handleDetailDebtAge}
                    handleUpdateDebtAge={updateDebtAge}
                    errorsMessage={errorsMessageUpdateDebtAge}
                    successFlag={updateDebtAgeSuccessFlag}
                    closeModalAction={() => {
                        setSelectedDebtAge(null);
                        removeMessageError();
                    }}
                    debtAgeData={selectedDebtAge}
                    isEdit={true}
                    open={isOpenUpdateModal}
                    handleClose={handleCloseUpdateModal}
                />
            )}
        </Box>
    )
}

export default DebtAgePage
