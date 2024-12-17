import React, { useEffect, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import "../../../../resource/style/ConfigStyle.css";
import colors from "../../../../constants/colors";
import ModalDelete from "../../../Modal/Common/delete";
import Notification from "../../../Modal/Common/loadingNotification";
import { TbEdit } from "react-icons/tb";
import { useRoleCheck } from "../../../../utils";
import { checkAttributeValue } from "../../../../common/common";
import { permissionActions } from "../../../../constants/titlePermissions";
import BasicTable from "../../../BasicTable";

const DebtAgeTable = (props) => {
    const { data, handlerDelete, successMessage, errorMessage, handlerUpdate, loading, handlePageChange,
        currentPagePagination, totalPages
    } = props
    const { t } = useTranslation();
    const { isSuperAdmin, userInfo } = useRoleCheck();
    const permissionsData = useMemo(
        () => (Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : []),
        [userInfo]
    )
    const handleOpenUpdateModal = (debtAgeData) => {
        handlerUpdate(debtAgeData);
    };
    const headers = useMemo(
        () => [
            {
                key: 'debtAge',
                label: t('debtAge'),
                align: 'left',
            },
            {
                key: 'allowedNumberOfDaysOfLatePayment',
                label: t('allowedNumberOfDaysOfLatePayment'),
                align: 'right',
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
            debtAge: {
                label: row.debt_age_name
            },
            allowedNumberOfDaysOfLatePayment: {
                label: row.days_allowed
            },
            actions: {
                label: (
                    <>
                        {(isSuperAdmin || checkAttributeValue(permissionsData, 'name', permissionActions.UPDATE_DEBT_AGE)) && (
                            <Button className="button-action" onClick={() => handleOpenUpdateModal(row)}>
                                <TbEdit style={{ color: colors.amberColor, width: 24, height: 24 }} />
                            </Button>
                        )}
                        {(isSuperAdmin || checkAttributeValue(permissionsData, 'name', permissionActions.DELETE_DEBT_AGE)) && (
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

export default DebtAgeTable;
