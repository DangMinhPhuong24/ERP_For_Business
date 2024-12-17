// @ts-nocheck
import * as React from 'react'
import {useMemo} from 'react'
import Button from '@mui/material/Button'
import {useTranslation} from 'react-i18next'
import {useNavigate} from 'react-router-dom'
import ModalDelete from '../../Modal/Common/delete'
import {TbEdit, TbEye} from 'react-icons/tb'
import colors from '../../../constants/colors'
import {checkAttributeValue, formatCurrency} from '../../../common/common'
import CustomStepper from '../../Stepper'
import {titleStepOrder} from '../../../constants/titleStepOrder'
import {getStatusColorOder} from '../../../constants/getStatusColorOder'
import {permissionActions} from '../../../constants/titlePermissions'
import {statusOrder} from '../../../constants/statusOder'
import BasicTable from "../../BasicTable";

export default function OrderTable(props) {
    const {
        data,
        handlerDelete,
        successMessage,
        loading,
        permissionsData,
        isSuperAdmin,
        handleOpenUpdateOrderModal,
        handlePageChange,
        currentPagePagination,
        totalPages
    } = props
    const {t} = useTranslation()
    const navigate = useNavigate()
    const handleView = (customerId) => {
        navigate(`/sale/order/order-detail?id=${customerId}`)
    }

    const headers = useMemo(
        () => [
            {
                key: 'codeOrders',
                label: t('codeOrders'),
            },
            {
                key: 'customerName',
                label: t('customerName'),
                align: 'left',
            },
            {
                key: 'value',
                label: t('value'),
                align: 'right',
            },
            {
                key: 'progress',
                label: t('progress'),
            },
            {
                key: 'status',
                label: t('status'),
                align: 'left',
            },
            {
                key: 'expectedCompletion',
                label: t('expectedCompletion'),
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
            codeOrders: {
                label: row.code,
                cellWithButton: true
            },
            value: {
                label: formatCurrency(row.total_cost),
                cellWithButton: true
            },
            customerName: {
                label: row.customer.customer_name,
                cellWithButton: true
            },
            progress: {
                label: (
                    <>
                        <CustomStepper
                            steps={Object.keys(titleStepOrder)}
                            activeStep={Object.keys(row.process).filter((step) => row.process[step]).length}
                            stepLabels={titleStepOrder}
                            process={row.process}
                        />
                    </>
                ),
                cellWithButton: true
            },
            status: {
                label: row.order_status_name,
                cellWithButton: true,
                color: getStatusColorOder(row.order_status_name),
            },
            expectedCompletion: {
                label: row.estimated_time,
                cellWithButton: true
            },
            actions: {
                label: (
                    <>
                        <Button
                            onClick={() => handleView(row.id)}
                            className={`button-action ${!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.DETAIL_ORDER) ? 'disabled-cursor' : ''}`}
                            disabled={
                                !isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.DETAIL_ORDER)
                            }
                        >
                            <TbEye style={{color: colors.lightroyalblueColor, width: 24, height: 24}}/>
                        </Button>
                        {row.order_status_name !== statusOrder.CANCELED && (
                            <>
                                <Button
                                    onClick={() => handleOpenUpdateOrderModal(row.id)}
                                    className={`button-action ${row.disable || (!isSuperAdmin && !checkAttributeValue(permissionsData, 'name', permissionActions.UPDATE_ORDER)) ? 'disabled-cursor' : ''}`}
                                    disabled={
                                        row.disable ||
                                        (!isSuperAdmin &&
                                            !checkAttributeValue(permissionsData, 'name', permissionActions.UPDATE_ORDER))
                                    }
                                >
                                    <TbEdit style={{color: colors.amberColor, width: 24, height: 24}}/>
                                </Button>
                                <ModalDelete
                                    disable={
                                        row.disable ||
                                        (!isSuperAdmin &&
                                            !checkAttributeValue(permissionsData, 'name', permissionActions.DELETE_ORDER))
                                    }
                                    successMessage={successMessage}
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
                    navigateToDetail={handleView}
                    showIndex
                />
            )}
        </>
    )
}
