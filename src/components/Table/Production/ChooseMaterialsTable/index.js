import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import { Grid } from '@mui/material';
import colors from '../../../../constants/colors';
import { useTranslation } from 'react-i18next';
import { formatPercentage } from '../../../../common/common';

const StyledCheckbox = styled(Checkbox)`
    &.Mui-checked {
        color: green;
    }
`;
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: colors.lightgreyColor,
        color: theme.palette.common.black,
        fontSize: 12,
        fontWeight: '700',
        lineHeight: '30px',
        letterSpacing: '0em',
        textAlign: 'left',
        padding: '3px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
        textAlign: 'left',
        padding: '3px',
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

export default function ChooseMaterialsTable({titleTable, data, checkedItems, handleCheckboxChange }) {
    const {t} = useTranslation();

    return (
        <TableContainer component={Paper} sx={{ mt: 2, maxHeight: '45vh', overflowY: 'auto' }}>
            <Table sx={{ minWidth: 200 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        {titleTable.map((item, index) => (
                            <StyledTableCell align="right" key={index}>
                                <div style={{ display: 'flex', alignItems: 'center', fontSize:'12px' }}>
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
                                    style={{ fontSize: '12px', textAlign: 'center' }}
                                >
                                    {t('noData')}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, index) => (
                            <StyledTableRow key={item.id} className={item.checked ? 'checked-row' : ''}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell>{item.mahang}</StyledTableCell>
                                <StyledTableCell>
                                    <Grid>{item.size}</Grid>
                                    <Grid sx={{ color: colors.darkSandYellowColor }}>{t('Phí tạm tính:')}</Grid>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Grid sx={{ textAlign: 'center' }}>
                                        <Grid>{item.quantity}</Grid>
                                        <Grid sx={{ color: colors.darkSandYellowColor }}>
                                            {`${item.provisionalFee} (${formatPercentage(item.percent)})`}
                                        </Grid>
                                    </Grid>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <Grid sx={{ color: colors.greenColor }}>{item.status}</Grid>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <StyledCheckbox
                                        checked={checkedItems[item.id]}
                                        onChange={() => handleCheckboxChange(item.id)}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
