// @ts-nocheck
import Button from '@mui/material/Button'
import {useTranslation} from 'react-i18next'
import {TbEdit, TbEye} from 'react-icons/tb'
import colors from '../../../../constants/colors'
import ModalDelete from '../../../Modal/Common/delete'
import BasicTable from "../../../BasicTable";
import * as React from "react";
import {useMemo} from "react";

const ProposalDebtAgeTable = (props) => {
    const {
        data,
        loading,
        successFlag,
        handleDeleteProposalDebtAge,
        handleUpdateProposedDebtAge,
        handleDetailProposalDebtAge,
        checkPermissionUpdate,
        isShowMobile,
        currentPagePagination,
        handlePageChange,
        totalPages
    } = props
    const {t} = useTranslation()

    const handleView = (debtAgeId) => {
        handleDetailProposalDebtAge(debtAgeId)
    }

    const handleEdit = (debtAgeId) => {
        handleUpdateProposedDebtAge(debtAgeId)
    }

    const headers = useMemo(() => {
        if (isShowMobile) {
            return [
                {
                    key: 'proposalTime',
                    label: t('proposalTime'),
                },
                {
                    key: 'proposedDebtAge',
                    label: t('proposedDebtAge'),
                    align: 'left',
                },
                {
                    key: 'statusClaim',
                    label: t('status'),
                    align: 'left',
                }
            ]
        }

        return [
            {
                key: 'proposedDebtAge',
                label: t('proposedDebtAge'),
            },
            {
                key: 'proposalTime',
                label: t('proposalTime'),
            },
            {
                key: 'statusClaim',
                label: t('status'),
            },
            {
                key: 'actions',
                label: t('actions'),
            }
        ]
    }, [isShowMobile, t])

    const rows = useMemo(() => {
        return data.map((row) => {
            if (isShowMobile) {
                return {
                    proposalTime: {
                        label: row.created_at
                    },
                    proposedDebtAge: {
                        label: row.debt_age.debt_age_name
                    },
                    statusClaim: {
                        label: row.proposal_status?.proposal_status_name
                    },
                    id: {
                        label: row.id
                    }
                }
            }

            return {
            proposedDebtAge: {
                label: row.debt_age.debt_age_name,
                cellWithButton: true
            },
            proposalTime: {
                label: row.created_at,
                cellWithButton: true
            },
            statusClaim: {
                label: row.proposal_status?.proposal_status_name,
                cellWithButton: true
            },
            actions: {
                label: (
                    <>
                        <Button className="button-action" onClick={() => handleView(row.id)}>
                            <TbEye style={{color: colors.lightroyalblueColor}}/>
                        </Button>
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
                                    buttonName={t('delete')}
                                    handleDelete={handleDeleteProposalDebtAge}
                                />
                            </>
                        )}
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
        handleDeleteProposalDebtAge,
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

export default ProposalDebtAgeTable
