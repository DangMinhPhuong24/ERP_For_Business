import React, {useMemo} from 'react';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import ModalDelete from '../../../Modal/Common/delete';
import {formatCurrency} from '../../../../common/common';
import statusMapping from '../../../../constants/statusVoucherOder';
import colors from '../../../../constants/colors';
import {TbEdit, TbEye} from "react-icons/tb";
import BasicTable from "../../../BasicTable";

const AdjustTable = ({
                         data,
                         handlerDelete,
                         successMessage,
                         errorMessage,
                         handleGetDetailAdjustmentVoucher,
                         handleUpdateDetailAdjustmentVoucher,
                         loading,
                         handlePageChange,
                         currentPagePagination,
                         totalPages
                     }) => {
    const {t} = useTranslation();

    const handleView = (adjustmentVoucherId) => {
        handleGetDetailAdjustmentVoucher(adjustmentVoucherId);
    };

    const handleEdit = (adjustmentVoucherId) => {
        handleUpdateDetailAdjustmentVoucher(adjustmentVoucherId);
    };

    const headers = useMemo(
        () => [
            {
                key: 'formCode',
                label: t('formCode'),
            },
            {
                key: 'dateCreated',
                label: t('dateCreated'),
            },
            {
                key: 'oldUnitPrice',
                label: t('oldUnitPrice'),
                align: 'right',
            },
            {
                key: 'newUnitPrice',
                label: t('newUnitPrice'),
                align: 'right',
            },
            {
                key: 'status',
                label: t('status'),
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
        return data.map((row) => {
            const isApproved = row.status === 1;
            const {text, textColor} = statusMapping[row.status] || {};

            return {
                formCode: {
                    label: row.code,
                    cellWithButton: true
                },
                dateCreated: {
                    label: row.created_at,
                    cellWithButton: true
                },
                oldUnitPrice: {
                    label: formatCurrency(row.old_total_cost),
                    cellWithButton: true
                },
                newUnitPrice: {
                    label: formatCurrency(row.new_total_cost),
                    cellWithButton: true
                },
                status: {
                    label: t(text),
                    cellWithButton: true,
                    color: textColor
                },
                actions: {
                    label: (
                        <>
                            <Button
                                sx={{minWidth: 0, padding: 0, marginRight: 1}}
                                onClick={() => handleView(row.id)}>
                                <TbEye style={{color: colors.lightroyalblueColor, width: 24, height: 24}}/>
                            </Button>
                            {!isApproved && (
                                <>
                                    <Button
                                        sx={{minWidth: 0, padding: 0, marginRight: 1}}
                                        onClick={() => handleEdit(row.id)}>
                                        <TbEdit style={{color: colors.amberColor, width: 24, height: 24}}/>
                                    </Button>
                                    <ModalDelete
                                        successMessage={successMessage}
                                        errorMessage={errorMessage}
                                        id={row.id}
                                        buttonName={t('delete')}
                                        handleDelete={handlerDelete}
                                    />
                                </>
                            )}
                        </>
                    )
                },
                id: {
                    label: row.id
                }
            };
        });
    }, [data, handleView, handleEdit, handlerDelete, successMessage, errorMessage, t]);

    return (
        <>
            {!loading && (
                <BasicTable
                    headers={headers}
                    rows={rows}
                    totalPages={totalPages}
                    handlePageChange={handlePageChange}
                    currentPage={currentPagePagination}
                    navigateToDetail={handleView}
                    showIndex
                />
            )}
        </>
    );
};

export default AdjustTable;
