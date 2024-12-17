import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import {useTranslation} from 'react-i18next'
import {FaDownload} from 'react-icons/fa6'
import {TbEdit, TbEye} from 'react-icons/tb'
import colors from '../../../../constants/colors'
import statusQuotation from '../../../../constants/statusQuotation'
import ModalDelete from '../../../Modal/Common/delete'
import {downloadFile} from '../../../../utils/download'
import BasicTable from "../../../BasicTable";
import * as React from "react";
import {useMemo} from "react";

const CustomerDetailTable = (props) => {
    const {
        data,
        loading,
        handleDetailQuotationModal,
        handelEditQuotation,
        handleDelete,
        successFlag,
        checkPermissionUpdate,
        isShowMobile,
        currentPagePagination,
        handlePageChange,
        totalPages
    } = props
    const {t} = useTranslation()
    const handleView = (quotationId) => {
        handleDetailQuotationModal(quotationId)
    }
    const handleEdit = (quotationId) => {
        handelEditQuotation(quotationId)
    }

    const handleDownload = (filename) => async () => {
        await downloadFile(filename);
    };

    const headers = useMemo(() => {
        if (isShowMobile) {
            return [
                {
                    key: 'timeQuotation',
                    label: t('timeQuotation'),
                    fontWeight: '700'
                },
                {
                    key: 'status',
                    label: t('status'),
                    fontWeight: '700',
                    align: 'left',
                }
            ]
        }

        return [
            {
                key: 'timeQuotation',
                label: t('timeQuotation'),
                fontWeight: '700'
            },
            {
                key: 'totalProduct',
                label: t('totalProduct'),
                fontWeight: '700',
                align: 'right',
            },
            {
                key: 'quantityProductsPriceChange',
                label: t('quantityProductsPriceChange'),
                fontWeight: '700',
                align: 'right',
            },
            {
                key: 'status',
                label: t('status'),
                fontWeight: '700',
                align: 'left',
            },
            {
                key: 'actions',
                label: t('actions'),
                fontWeight: '700'
            }
        ]
    }, [isShowMobile, t])

    const rows = useMemo(() => {
        return data.map((row) => {
            if (isShowMobile) {
                return {
                    timeQuotation: {
                        label: row.created_at,
                    },
                    status: {
                        label: (
                            <>
                                <Typography style={{color: statusQuotation[row.proposal_status?.proposal_status_name]}}>
                                    {row.proposal_status?.proposal_status_name}
                                </Typography>
                            </>
                        ),
                    },
                    id: {
                        label: row.id
                    }
                }
            }

            return {
                timeQuotation: {
                    label: row.created_at,
                    cellWithButton: true
                },
                totalProduct: {
                    label: row.total_product_management_quotation_history,
                    cellWithButton: true
                },
                quantityProductsPriceChange: {
                    label: row.product_management_quotation_history_price_adjustment,
                    cellWithButton: true
                },
                status: {
                    label: (
                        <>
                            <Typography style={{color: statusQuotation[row.proposal_status?.proposal_status_name]}}>
                                {row.proposal_status?.proposal_status_name}
                            </Typography>
                        </>
                    ),
                    cellWithButton: true
                },
                actions: {
                    label: (
                        <>
                            <Button className="button-action" onClick={() => handleView(row.id)}>
                                <TbEye style={{color: colors.lightroyalblueColor}}/>
                            </Button>
                            {row.proposal_status?.id === 2 && (
                                <Button className="button-action" onClick={handleDownload(row.file_path)}>
                                    <FaDownload style={{color: colors.greenColor}}/>
                                </Button>
                            )}
                            {(row.proposal_status?.id === 1) && (
                                <>
                                    <Button
                                        disabled={checkPermissionUpdate}
                                        className={`button-action ${checkPermissionUpdate ? 'disabled-cursor' : ''}`}
                                        onClick={() => handleEdit(row.id)}
                                    >
                                        <TbEdit style={{color: colors.amberColor}}/>
                                    </Button>
                                    <ModalDelete
                                        disable={checkPermissionUpdate}
                                        successFlag={successFlag}
                                        id={row.id}
                                        handleDelete={handleDelete}
                                    />
                                </>
                            )}
                        </>
                    ),
                },
                id: {
                    label: row.id
                }
            }
        })
    }, [
        data,
        handleView,
        handleDelete,
        successFlag
    ])

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
                    {...(isShowMobile && {minWidth: 300})}
                />
            )}
        </>
    )
}

export default CustomerDetailTable
