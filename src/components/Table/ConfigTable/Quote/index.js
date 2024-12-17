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
import colors from "../../../../constants/colors";
import { checkAttributeValue, formatCurrency, formatPercentage } from '../../../../common/common';
import Notification from "../../../Modal/Common/loadingNotification";
import { TbEdit } from "react-icons/tb";
import { useRoleCheck } from "../../../../utils";
import { permissionActions } from "../../../../constants/titlePermissions";
import BasicTable from "../../../BasicTable";
import ModalDelete from "../../../Modal/Common/delete";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: colors.lightgreyColor,
        color: theme.palette.common.black,
        fontSize: 14,
        fontWeight: '700',
        lineHeight: '14px',
        letterSpacing: '0em',
        textAlign: 'center',
        padding: '3px',
        whiteSpace: 'pre-wrap',
        height: '48px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'center',
        padding: '3px',
        whiteSpace: 'pre-wrap',
        height: '56px',
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&.overdue': {
        backgroundColor: colors.brightredColor,
    },
}));

const QuoteTable = ({ currentPagePagination, data, handlerUpdate, loading, totalPages, handlePageChange }) => {
    const { t } = useTranslation();
    const { isSuperAdmin, userInfo } = useRoleCheck();
    const permissionsData = useMemo(
        () => (Array.isArray(userInfo.role?.permission) ? userInfo.role.permission : []),
        [userInfo]
    )
    const handleOpenUpdateModal = (quoteData) => {
        handlerUpdate(quoteData);
    };

    const headers = useMemo(
        () => [
            {
                key: 'commodityDode',
                label: t('commodityDode'),
                align: 'left',
            },
            {
                key: 'product',
                label: t('product'),
                align: 'left',
            },
            {
                key: 'standardSizeSheetPrice',
                label: t('standardSizeSheetPrice'),
                align: 'right',
            },
            {
                key: 'priceIncludesSheetSize',
                label: t('priceIncludesSheetSize'),
                align: 'right',
            },
            {
                key: 'standardSizeRollPrice',
                label: t('standardSizeRollPrice'),
                align: 'right',
            },
            {
                key: 'priceIncludesRollSize',
                label: t('priceIncludesRollSize'),
                align: 'right',
            },
            {
                key: 'allowableDifference',
                label: t('allowableDifference'),
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
            commodityDode: {
                label: row.code
            },
            product: {
                label: row.product_name
            },
            standardSizeSheetPrice: {
                label: formatCurrency(row.price_standard_sheet)
            },
            priceIncludesSheetSize: {
                label: formatCurrency(row.price_include_sheet_size)
            },
            standardSizeRollPrice: {
                label: formatCurrency(row.price_standard_roll)
            },
            priceIncludesRollSize: {
                label: formatCurrency(row.price_include_roll_size)
            },
            allowableDifference: {
                label: formatPercentage(row.allowable_deviation)
            },
            actions: {
                label: (
                    <>
                        {(isSuperAdmin || checkAttributeValue(permissionsData, 'name', permissionActions.UPDATE_QUOTATION)) && (
                            <Button className="button-action" onClick={() => handleOpenUpdateModal(row)}>
                                <TbEdit style={{ color: colors.amberColor, width: 24, height: 24 }} />
                            </Button>
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

export default QuoteTable;
