import Button from '@mui/material/Button'
import * as React from 'react'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {TbEdit, TbEye} from 'react-icons/tb'
import NoSortIcon from '../../../../asset/icon/NoSort.svg'
import SortDownIcon from '../../../../asset/icon/SortDown.svg'
import SortUpIcon from '../../../../asset/icon/SortUp.svg'
import {formatCurrencyWithoutSymbol} from '../../../../common/common'
import colors from '../../../../constants/colors'
import {useNavigate} from "react-router-dom";
import ModalDelete from "../../../Modal/Common/delete";
import BasicTable from "../../../BasicTable";
import {Box, IconButton} from "@mui/material";
import {useStyles} from "../ListCustomer/styles";

const CustomerListTransactionTable = (props) => {
    const {
        titleTable,
        data,
        loading,
        sortDataAzCode,
        sortDataZaCode,
        sortDataAzTotalCost,
        sortDataZaTotalCost,
        sortDataAzCreateAt,
        sortDataZaCreateAt,
        getListOrderByCustomer,
        checkPermissionUpdateOrder,
        checkPermissionViewOrder,
        checkPermissionDeleteOrder,
        handlerDelete,
        successMessage,
        handleOpenUpdateOrderModal,
        isShowMobile,
        currentPagePagination,
        handlePageChange,
        totalPages
    } = props
    const {t} = useTranslation()
    const navigate = useNavigate()
    const [sortStates, setSortStates] = useState({})
    const classes = useStyles()

    useEffect(() => {
        const initialSortStates = titleTable.reduce((acc, item) => {
            if (item.sortable) {
                acc[item.label] = {az: false, za: false}
            }
            return acc
        }, {})
        setSortStates(initialSortStates)
    }, [titleTable])

    const handleSort = useCallback(
        (columnName) => {
            const currentSortState = sortStates[columnName]

            switch (columnName) {
                case 'codeOrders':
                    if (!currentSortState.az && !currentSortState.za) {
                        sortDataAzCode()
                        sortStates[columnName] = {az: true, za: false}
                    } else if (currentSortState.az) {
                        sortDataZaCode()
                        sortStates[columnName] = {az: false, za: true}
                    } else {
                        getListOrderByCustomer()
                        sortStates[columnName] = {az: false, za: false}
                    }
                    break
                case 'amountOfMoney':
                    if (!currentSortState.az && !currentSortState.za) {
                        sortDataAzTotalCost()
                        sortStates[columnName] = {az: true, za: false}
                    } else if (currentSortState.az) {
                        sortDataZaTotalCost()
                        sortStates[columnName] = {az: false, za: true}
                    } else {
                        getListOrderByCustomer()
                        sortStates[columnName] = {az: false, za: false}
                    }
                    break
                case 'time':
                    if (!currentSortState.az && !currentSortState.za) {
                        sortDataAzCreateAt()
                        sortStates[columnName] = {az: true, za: false}
                    } else if (currentSortState.az) {
                        sortDataZaCreateAt()
                        sortStates[columnName] = {az: false, za: true}
                    } else {
                        getListOrderByCustomer()
                        sortStates[columnName] = {az: false, za: false}
                    }
                    break
                default:
                    break
            }
            setSortStates(sortStates)
        },
        [
            sortDataZaCode,
            sortDataAzCode,
            sortDataAzTotalCost,
            sortDataZaTotalCost,
            sortDataAzCreateAt,
            sortDataZaCreateAt,
            getListOrderByCustomer,
            sortStates
        ]
    )

    const getSortIcon = (item) => {
        if (sortStates[item]?.az) {
            return <SortUpIcon/>
        } else if (sortStates[item]?.za) {
            return <SortDownIcon/>
        } else {
            return <NoSortIcon/>
        }
    }

    const handleView = (customerId) => {
        navigate(`/sale/order/order-detail?id=${customerId}`)
    }

    const headers = useMemo(() => {
        if (isShowMobile) {
            return [
                {
                    key: 'codeOrder',
                    label: t('codeOrder'),
                    align: 'left',
                    fontWeight: '700'
                },
                {
                    key: 'amountMoney',
                    label: t('amountMoney'),
                    align: 'right',
                    fontWeight: '700'
                },
                {
                    key: 'status',
                    label: t('status'),
                    align: 'left',
                    fontWeight: '700'
                },
            ]
        }

        return [
            {
                key: 'codeOrders',
                label: (
                    <Box className={classes.wrapperHeader}>
                        {t('codeOrders')}
                        <IconButton className={classes.btnSort} onClick={() => handleSort('codeOrders')}>
                            {getSortIcon('codeOrders')}
                        </IconButton>
                    </Box>
                ),
                fontWeight: '700'
            },
            {
                key: 'amountOfMoney',
                label: (
                    <Box className={classes.wrapperHeader}>
                        {t('amountOfMoney')}
                        <IconButton className={classes.btnSort} onClick={() => handleSort('amountOfMoney')}>
                            {getSortIcon('amountOfMoney')}
                        </IconButton>
                    </Box>
                ),
                align: 'right',
                fontWeight: '700'
            },
            {
                key: 'time',
                label: (
                    <Box className={classes.wrapperHeader}>
                        {t('time')}
                        <IconButton className={classes.btnSort} onClick={() => handleSort('time')}>
                            {getSortIcon('time')}
                        </IconButton>
                    </Box>
                ),
                fontWeight: '700'
            },
            {
                key: 'status',
                label: t('status'),
                align: 'left',
                fontWeight: '700'
            },
            {
                key: 'actions',
                label: t('actions'),
            }
        ]
    }, [isShowMobile, classes.btnSort, classes.wrapperHeader, getSortIcon, handleSort, t])

    const rows = useMemo(() => {
        return data.map((row) => {
            if (isShowMobile) {
                return {
                    codeOrder: {
                        label: row.code,
                    },
                    amountMoney: {
                        label: formatCurrencyWithoutSymbol(row.total_cost),
                    },
                    status: {
                        label: row.order_status.order_status_name,
                    },
                    id: {
                        label: row.id
                    }
                }
            }

            return {
                codeOrders: {
                    label: row.code,
                    cellWithButton: true
                },
                amountOfMoney: {
                    label: formatCurrencyWithoutSymbol(row.total_cost),
                    cellWithButton: true
                },
                time: {
                    label: row.created_at,
                    cellWithButton: true
                },
                status: {
                    label: row.order_status.order_status_name,
                    cellWithButton: true
                },
                actions: {
                    label: (
                        <>
                            <Button
                                onClick={() => handleView(row.id)}
                                className={`button-action ${checkPermissionViewOrder ? 'disabled-cursor' : ''}`}
                                disabled={checkPermissionViewOrder}
                            >
                                <TbEye style={{color: colors.lightroyalblueColor}}/>
                            </Button>
                            <Button
                                className={`button-action ${row.disable || checkPermissionUpdateOrder ? 'disabled-cursor' : ''}`}
                                disabled={row.disable || checkPermissionUpdateOrder}
                                onClick={() => handleOpenUpdateOrderModal(row.id)}
                            >
                                <TbEdit style={{color: colors.amberColor}}/>
                            </Button>
                            {!isShowMobile && (
                                <ModalDelete
                                    disable={row.disable || checkPermissionDeleteOrder}
                                    successMessage={successMessage}
                                    id={row.id}
                                    buttonName={t('delete')}
                                    handleDelete={handlerDelete}
                                />
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
        handlerDelete,
        checkPermissionUpdateOrder,
        successMessage,
        isShowMobile,
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

export default CustomerListTransactionTable
