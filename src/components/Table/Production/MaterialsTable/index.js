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
        // textAlign: 'center',
        padding:0,
        paddingLeft: '8px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        height:'105px',
        lineHeight: '16.41px',
        textAlign: 'left',
        padding:0,
        paddingLeft: '8px',
        whiteSpace: 'pre-wrap',
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

export default function MaterialsTable ({ titleTable, data }) {
    const { t } = useTranslation();

    return (
        <TableContainer component={Paper} sx={{mt:1}}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {titleTable.map((item, index) => (
                            <StyledTableCell key={index}>
                                <div style={{ display: 'flex', alignItems: 'center', textAlign:'center', justifyContent:'center'}}>
                                    <div>{t(item)}</div>
                                </div>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow colSpan>
                            <TableCell colSpan={8}>
                                <Typography
                                    variant="body1"
                                    color="error"
                                    align="center"
                                    style={{ fontSize: '14px', textAlign: 'center' }}
                                >
                                    {t('noSuitableResultsFound')}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, index) => (
                            <StyledTableRow
                                key={index}
                            >
                                <StyledTableCell className='format'>{item.format}</StyledTableCell>
                                <StyledTableCell className='code-size'>{item.commodityDode}</StyledTableCell>
                                <StyledTableCell className='code-size'>{item.size}</StyledTableCell>
                                <StyledTableCell className='warehouse'>{item.warehouse}</StyledTableCell>
                                <StyledTableCell className='quatity-cost' sx={{textAlign:'center !important'}}>{item.quantityLongMeter}</StyledTableCell>
                                <StyledTableCell className='quatity-cost' sx={{textAlign:'center !important'}}>{item.cost}</StyledTableCell>
                                <StyledTableCell className='consumalble-cost' sx={{textAlign:'center !important'}}>{item.consumableCosts}</StyledTableCell>
                            </StyledTableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

