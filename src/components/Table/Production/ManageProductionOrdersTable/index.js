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

const ManageProductionOrdersTable = ({ titleTable, data }) => {
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
                {/*<TableBody>*/}
                {/*    {data.length === 0 ? (*/}
                {/*        <TableRow colSpan>*/}
                {/*            <TableCell colSpan={8}>*/}
                {/*                <Typography*/}
                {/*                    variant="body1"*/}
                {/*                    color="error"*/}
                {/*                    align="center"*/}
                {/*                    style={{ fontSize: '14px', textAlign: 'center' }}*/}
                {/*                >*/}
                {/*                    {t('noSuitableResultsFound')}*/}
                {/*                </Typography>*/}
                {/*            </TableCell>*/}
                {/*        </TableRow>*/}
                {/*    ) : (*/}
                {/*        data.map((item, index) => (*/}
                {/*            <StyledTableRow*/}
                {/*                key={index}*/}
                {/*            >*/}
                {/*                <StyledTableCell>{index + 1}</StyledTableCell>*/}
                {/*                <StyledTableCell>{item.customer_name}</StyledTableCell>*/}
                {/*                <StyledTableCell>{item.debt_group}</StyledTableCell>*/}
                {/*                <StyledTableCell>{formatCurrency(item.total_debt)}</StyledTableCell>*/}
                {/*                <StyledTableCell>{formatCurrency(item.overdue_amount)}</StyledTableCell>*/}
                {/*                <StyledTableCell>{item.number_day_overdue}</StyledTableCell>*/}

                {/*            </StyledTableRow>*/}
                {/*        ))*/}
                {/*    )}*/}
                {/*</TableBody>*/}
            </Table>
        </TableContainer>
    );
};

export default ManageProductionOrdersTable;

