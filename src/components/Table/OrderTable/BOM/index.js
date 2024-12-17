import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import colors from '../../../../constants/colors';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import {formatCurrency, formatCurrencyWithoutSymbol} from '../../../../common/common';
import TableContainer from '@mui/material/TableContainer';
import React from 'react';
import { styled } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import Notification from "../../../Modal/Common/loadingNotification";

const StyledTableCell = styled(TableCell)(({ theme }) => ( {
    [ `&.${ tableCellClasses.head }` ]: {
        backgroundColor: colors.lightwhiteColor,
        color: theme.palette.common.black,
        fontSize: 14,
        fontWeight: '700',
        lineHeight: '14px',
        letterSpacing: '0em',
        textAlign: 'center',
        padding: '3px',
        whiteSpace: 'pre-wrap',
        height:'48px',
    },
    [ `&.${ tableCellClasses.body }` ]: {
        backgroundColor: colors.lilywhiteColor,
        fontWeight: '400',
        fontSize: 14,
        textAlign: 'center',
        padding: '3px',
        whiteSpace: 'pre-wrap',
        height:'56px',
    },
} ));

const StyledTableCellBottom = styled(TableCell)(({ theme }) => ( {
    [ `&.${ tableCellClasses.body }` ]: {
        backgroundColor: colors.oceanblueColor,
        fontWeight: '700',
        fontSize: 14,
        textAlign: 'center',
        padding: '3px',
        whiteSpace: 'pre-wrap',
        height:'56px',
        color:colors.lilywhiteColor,
    },
} ));

const StyledTableRow = styled(TableRow)(({ theme }) => ( {
    '&:nth-of-type(even)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
    '&.overdue': {
        backgroundColor: colors.vividredColor,
    },
} ));

const fakeData = [
    {
        numericalOrder: '01',
        commandCode: 'LSX0003',
        orderType: 'Lệnh sản xuất',
        constituentCosts: 500000,
    },
    {
        numericalOrder: '02',
        commandCode: 'LSX9348',
        orderType: 'Lệnh sản xuất',
        constituentCosts: 800000,
    },
    {
        numericalOrder: '03',
        commandCode: 'LXK099',
        orderType: 'Lệnh xuất kho',
        constituentCosts: 1200000,
    },
    {
        numericalOrder: '04',
        commandCode: 'LXK099',
        orderType: 'Lệnh mua hàng',
        constituentCosts: 1200000,
    },
    {
        numericalOrder: '05',
        commandCode: 'LXK9384',
        orderType: 'Lệnh mua hàng',
        constituentCosts: 1200000,
    },
];



export default function BOMTable({ titleTable, data,loading, startIndex}) {
    const { t } = useTranslation();

    return (
        <TableContainer component={ Paper } sx={{ border:'1px solid #DDE1E5'}}>
            <Table sx= {{ minWidth: 400 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {titleTable.map((item, index) => (
                            <StyledTableCell key={index}>
                                <div style={{ display: 'flex', alignItems: 'center',  flexDirection: 'column', }}>
                                    <div>{t(item)}</div>
                                </div>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/*<Notification*/}
                    {/*    loading={loading}*/}
                    {/*    data={data}*/}
                    {/*    titleTable={titleTable}*/}
                    {/*/>*/}
                    {/*{data.length > 0 && data.map((item, index) => (*/}
                    {/*    <StyledTableRow key={index}>*/}
                    {/*        <StyledTableCell sx={{color: colors.slategrayColor}} >*/}
                    {/*            {(startIndex + index + 1).toString().padStart(2, '0')}*/}
                    {/*        </StyledTableCell>*/}
                    {/*        <StyledTableCell>{item.code}</StyledTableCell>*/}
                    {/*        <StyledTableCell sx={{color: colors.slategrayColor, textAlign:'right !important'}} >{formatCurrency(item.total_cost)}</StyledTableCell>*/}
                    {/*        <StyledTableCell sx={{color: colors.slategrayColor, textAlign:'left !important',paddingLeft:'30px!important'}} > {item.customer.customer_name} </StyledTableCell>*/}
                    {/*        <StyledTableCell sx={{color: colors.slategrayColor}} > {item.created_at} </StyledTableCell>*/}
                    {/*        <StyledTableCell sx={{color: colors.slategrayColor}} >{item.delivery_date}</StyledTableCell>*/}
                    {/*    </StyledTableRow>*/}
                    {/*))}*/}
                    {fakeData.map((item, index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell>{item.numericalOrder}</StyledTableCell>
                            <StyledTableCell sx={{color: colors.oceanblueColor}} >{item.commandCode}</StyledTableCell>
                            <StyledTableCell>{item.orderType}</StyledTableCell>
                            <StyledTableCell sx={{textAlign:'right !important'}} >{formatCurrencyWithoutSymbol(item.constituentCosts)}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                    <StyledTableRow>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCell></StyledTableCell>
                        <StyledTableCellBottom>
                            {t('totalCost')}
                        </StyledTableCellBottom>
                        <StyledTableCellBottom sx={{textAlign:'right !important'}}>
                            {formatCurrency(fakeData.reduce((acc, curr) => acc + curr.constituentCosts, 0))}
                        </StyledTableCellBottom>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
