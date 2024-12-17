import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import styleds from '@xstyled/styled-components';
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
import ModalDelete from '../../../Modal/Common/delete';
import {useNavigate} from "react-router-dom";
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

const WorkerTable = ({ titleTable, data, handlerDelete, successMessage, errorMessage, handlerDetail,loading, onOpenView }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleOpenUpdateModal = (ID) => {
        // handlerDetail(ID);
    };

    const handleOpenView = (ID) => {
        navigate(`/production/resource-management/workerdetail?id=${ ID }`);
    };

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
                            <StyledTableCell>{index + 1}</StyledTableCell>
                            <StyledTableCell>
                                <button className="custom-button" onClick={() => onOpenView(item.id)}>
                                    {item.code}
                                </button>
                            </StyledTableCell>
                            <StyledTableCell >{item.name}</StyledTableCell>
                            <StyledTableCell >{item.years_experience}</StyledTableCell>
                            <StyledTableCell >{item.worker_arrange_name}</StyledTableCell>
                            <StyledTableCell >{item.machine_name}</StyledTableCell>
                            <StyledTableCell>
                                <Button className="buttontableStyle" onClick={() => onOpenView(item.id)}>{t('view')}</Button>
                                <Button className="buttontableStyle" >{t('printQR')}</Button>
                                <Button className="buttontableStyle" onClick={() => handleOpenUpdateModal()}>{t('edit')}</Button>
                                <ModalDelete
                                    successMessage={successMessage}
                                    errorMessage={errorMessage}
                                    id={item.id}
                                    buttonName={t('delete')}
                                    handleDelete={handlerDelete}
                                />
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default WorkerTable;
