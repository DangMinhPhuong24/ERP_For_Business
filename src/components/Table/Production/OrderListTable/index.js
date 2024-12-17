import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import colors from '../../../../constants/colors';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { formatCurrency } from "../../../../common/common"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Notification from "../../../Modal/Common/loadingNotification";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: colors.lightgreyColor,
        color: theme.palette.common.black,
        fontSize: 14,
        fontWeight: '700',
        lineHeight: '30px',
        letterSpacing: '0em',
        textAlign: 'left',
        padding: '3px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'left',
        padding: '3px',
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

const OrderListTable = ({ titleTable, data, handleDetailOrder ,sortedAZTotalCost, sortedZATotalCost,
                            sortedAZCustomerName, sortedZACustomerName, sortedAZCreateAt, sortedZACreateAt,
                            sortedAZDeliveryDate, sortedZADeliveryDate, sortedAZStatus, sortedZAStatus,
                            getListOderForProductionManagement,loading}) => {
    const { t } = useTranslation();
    const [sortStates, setSortStates] = useState({});
    useEffect(() => {
        const initialSortStates = titleTable.reduce((acc, item) => {
            if (item.sortable) {
                acc[item.label] = { az: false, za: false };
            }
            return acc;
        }, {});
        setSortStates(initialSortStates);
    }, [titleTable]);
    const handleOpenProductionMethodModal = (orderId) => {
        handleDetailOrder(orderId)
    };
    const handleSort = (columnName) => {
        const newSortStates = { ...sortStates };
        const currentSortState = newSortStates[columnName];

        switch (columnName) {
            case "value":
                if (!currentSortState.az && !currentSortState.za) {
                    sortedAZTotalCost();
                    newSortStates[columnName] = { az: true, za: false };
                } else if (currentSortState.az) {
                    sortedZATotalCost();
                    newSortStates[columnName] = { az: false, za: true };
                } else {
                    getListOderForProductionManagement();
                    newSortStates[columnName] = { az: false, za: false };
                }
                break;
            case "customerName":
                if (!currentSortState.az && !currentSortState.za) {
                    sortedAZCustomerName();
                    newSortStates[columnName] = { az: true, za: false };
                } else if (currentSortState.az) {
                    sortedZACustomerName();
                    newSortStates[columnName] = { az: false, za: true };
                } else {
                    getListOderForProductionManagement();
                    newSortStates[columnName] = { az: false, za: false };
                }
                break;
            case "creationTime":
                if (!currentSortState.az && !currentSortState.za) {
                    sortedAZCreateAt();
                    newSortStates[columnName] = { az: true, za: false };
                } else if (currentSortState.az) {
                    sortedZACreateAt();
                    newSortStates[columnName] = { az: false, za: true };
                } else {
                    getListOderForProductionManagement();
                    newSortStates[columnName] = { az: false, za: false };
                }
                break;
            case "deliveryTime":
                if (!currentSortState.az && !currentSortState.za) {
                    sortedAZDeliveryDate();
                    newSortStates[columnName] = { az: true, za: false };
                } else if (currentSortState.az) {
                    sortedZADeliveryDate();
                    newSortStates[columnName] = { az: false, za: true };
                } else {
                    getListOderForProductionManagement();
                    newSortStates[columnName] = { az: false, za: false };
                }
                break;
            case "statusClaim":
                if (!currentSortState.az && !currentSortState.za) {
                    sortedAZStatus();
                    newSortStates[columnName] = { az: true, za: false };
                } else if (currentSortState.az) {
                    sortedZAStatus();
                    newSortStates[columnName] = { az: false, za: true };
                } else {
                    getListOderForProductionManagement();
                    newSortStates[columnName] = { az: false, za: false };
                }
                break;
            default:
                break;
        }
        setSortStates(newSortStates);
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {titleTable.map((item, index) => (
                            <StyledTableCell align="right" key={index}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>{t(item.label)}</div>
                                    {item.sortable && (
                                        <Button sx={{ minWidth: 'auto', p: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                                                onClick={() => handleSort(item.label)}>
                                            <ArrowDropUpIcon sx={{ width: '24px', color: sortStates[item.label]?.az ? colors.blackColor : colors.greyColor, marginBottom: '-8px' }} />
                                            <ArrowDropDownIcon sx={{ width: '24px', color: sortStates[item.label]?.za ? colors.blackColor : colors.greyColor, marginTop: '-8px' }} />
                                        </Button>
                                    )}
                                </div>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <Notification
                        loading={loading}
                        data={data}
                        titleTable={titleTable}
                    />
                    {data.length > 0 && data.map((item, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell>{index + 1}</StyledTableCell>
                            <StyledTableCell>{item.code}</StyledTableCell>
                            <StyledTableCell>{formatCurrency(item.total_cost)}</StyledTableCell>
                            <StyledTableCell>{item.customer_name}</StyledTableCell>
                            <StyledTableCell>{item.created_at}</StyledTableCell>
                            <StyledTableCell>{item.delivery_shift_name} {t('day')} {item.delivery_date}</StyledTableCell>
                            <StyledTableCell>{item.order_status_name}</StyledTableCell>
                            <StyledTableCell>
                                <Button onClick={() => handleOpenProductionMethodModal(item.id)}>{t('createCommand')}</Button>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default OrderListTable;