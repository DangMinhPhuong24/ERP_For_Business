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
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import "../../../../resource/style/ConfigStyle.css";
import colors from "../../../../constants/colors";
import ModalDelete from "../../../Modal/Common/delete";
import { formatCurrencyWithoutSymbol } from "../../../../common/common";
import Notification from "../../../Modal/Common/loadingNotification";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: colors.lightgreyColor,
        color: theme.palette.common.black,
        fontSize: 14,
        fontWeight: '700',
        lineHeight: '14px',
        letterSpacing: '0em',
        textAlign: 'left',
        padding: '3px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        textAlign: 'left',
        padding: '3px',
        whiteSpace: 'pre-wrap',
        wordWrap: 'break-word',
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

const ActivityHistoryTable = ({ titleTable, data, loading }) => {
    const { t } = useTranslation();

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {titleTable.map((item, index) => (
                            <StyledTableCell align="right" key={index}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>{t(item)}</div>
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
                            <StyledTableCell>{item.created_at}</StyledTableCell>
                            <StyledTableCell sx={{ color: colors.oceanblueColor }}>{item.manufacture_order_code}</StyledTableCell>
                            <StyledTableCell >{item.join}</StyledTableCell>
                            <StyledTableCell>{item.performance}</StyledTableCell>
                            <StyledTableCell>{formatCurrencyWithoutSymbol(item.price)}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ActivityHistoryTable;
