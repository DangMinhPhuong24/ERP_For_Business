// @ts-nocheck
import Button from '@mui/material/Button'
import {useTranslation} from 'react-i18next'
import {TbEdit, TbEye} from 'react-icons/tb'
import colors from '../../../../constants/colors'
import ModalDelete from '../../../Modal/Common/delete'
import * as React from "react";
import {useMemo} from "react";
import BasicTable from "../../../BasicTable";
import Typography from "@mui/material/Typography";
import statusQuotation from "../../../../constants/statusQuotation";

const ClaimHistoriesTable = (props) => {
    const {
        data,
        loading,
        successFlag,
        handleDelete,
        handleGetDataClaim,
        handleViewDetailClaim,
        checkPermissionUpdate,
        isShowMobile,
        currentPagePagination,
        handlePageChange,
        totalPages
    } = props
    const {t} = useTranslation()

    const handleView = (customerId) => {
        handleViewDetailClaim(customerId)
    }

    const handleEdit = (customerId) => {
        handleGetDataClaim(customerId)
    }


    const headers = useMemo(() => {
        if (isShowMobile) {
            return [
                {
                    key: 'dateCreated',
                    label: t('dateCreated'),
                    fontWeight: '700'
                },
                {
                    key: 'statusClaim',
                    label: t('status'),
                    fontWeight: '700',
                    align: 'left',
                }
            ]
        }

        return [
            {
                key: 'customerName',
                label: t('customerName'),
                fontWeight: '700',
                align: 'left',
            },
            {
                key: 'describeTheProblem',
                label: t('describeTheProblem'),
                fontWeight: '700',
                align: 'left',
            },
            {
                key: 'typeOfProblem',
                label: t('typeOfProblem'),
                fontWeight: '700',
                align: 'left',
            },
            {
                key: 'statusClaim',
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
                    dateCreated: {
                        label: row.created_at,
                    },
                    statusClaim: {
                        label: row.claim_status?.claim_status_name,
                    },
                    id: {
                        label: row.id
                    }
                }
            }

            return {
            customerName: {
                label: row.customer.customer_name,
                cellWithButton: true
            },
            describeTheProblem: {
                label: row.description,
                cellWithButton: true
            },
            typeOfProblem: {
                label: row.claim_problem?.claim_status_name,
                cellWithButton: true
            },
            statusClaim: {
                label: row.claim_status?.claim_status_name,
                cellWithButton: true
            },
            actions: {
                label: (
                    <>
                        <Button className="button-action" onClick={() => handleView(row.id)}>
                            <TbEye style={{color: colors.lightroyalblueColor}}/>
                        </Button>
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
                ),
            },
            id: {
                label: row.id
            }
            }})
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

export default ClaimHistoriesTable
