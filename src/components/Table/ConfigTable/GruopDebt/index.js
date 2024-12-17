import React, { useMemo } from 'react';
import Button from '@mui/material/Button';
import colors from '../../../../constants/colors'
import { useTranslation } from 'react-i18next';
import "../../../../resource/style/ConfigStyle.css";
import ModalDelete from "../../../Modal/Common/delete";
import { TbEdit } from "react-icons/tb";
import { useRoleCheck } from "../../../../utils";
import { checkAttributeValue } from "../../../../common/common";
import { permissionActions } from "../../../../constants/titlePermissions";
import BasicTable from "../../../BasicTable";

const GruopDebtTable = (props) => {
    const { data, handlerDelete, successMessage, errorMessage, handlerUpdate, loading, handlePageChange,
        currentPagePagination, totalPages
    } = props
    const { t } = useTranslation();
    const { isSuperAdmin, userInfo } = useRoleCheck();
    const permissionsData = useMemo(
        () => (Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : []),
        [userInfo]
    )
    const handleOpenUpdateModal = (groupDebtData) => {
        handlerUpdate(groupDebtData);
    };

    const headers = useMemo(
        () => [
            {
                key: 'debtGroup',
                label: t('debtGroup'),
                align: 'left',
            },
            {
                key: 'numberOfDaysOfLatePayment',
                label: t('numberOfDaysOfLatePayment'),
                align: 'left',
            },
            {
                key: 'actions',
                label: t('actions'),
            }
        ],
        [t]
    )

    const rows = useMemo(() => {
        return data.map((row) => ({
            debtGroup: {
                label: row.debt_group_name
            },
            numberOfDaysOfLatePayment: {
                label: (
                    <>
                        {t('from')} {row.start_day} {t('to')} {row.end_day} {t('day')}
                    </>
                )
            },
            actions: {
                label: (
                    <>
                        {(isSuperAdmin || checkAttributeValue(permissionsData, 'name', permissionActions.UPDATE_DEBT_GROUP)) && (
                            <Button className="button-action" onClick={() => handleOpenUpdateModal(row)}>
                                <TbEdit style={{ color: colors.amberColor, width: 24, height: 24 }} />
                            </Button>
                        )}
                        {(isSuperAdmin || checkAttributeValue(permissionsData, 'name', permissionActions.DELETE_DEBT_GROUP)) && (
                            <ModalDelete
                                successMessage={successMessage}
                                errorMessage={errorMessage}
                                id={row.id}
                                buttonName={t('delete')}
                                handleDelete={handlerDelete}
                            />
                        )}
                    </>
                )
            },
            id: {
                label: row.id
            }
        }))
    }, [data])

    return (
        <>
            {!loading && (
                <BasicTable
                    headers={headers}
                    rows={rows}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    currentPage={currentPagePagination}
                    showIndex
                    minWidth={200}
                    recordsPerPage={5}
                />
            )}
        </>
    );
};

export default GruopDebtTable;
