import React, {useEffect, useRef} from 'react';
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
import Tooltip, {tooltipClasses} from "@mui/material/Tooltip";
import gifImage from "../../../../asset/images/2acfa2de9ac1fcc35985c6cbcc66ec23.gif";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";
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

const LightTooltip = styleds( ({ className, ...props }) => (
    <Tooltip {...props} classes= {{ popper: className }}/>
) )( ({ theme }) => ({
    [ `& .${ tooltipClasses.tooltip }` ]: {
        backgroundColor: colors.lilywhiteColor,
        color: colors.blackColor,
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        fontSize: 14,
        fontWeight: 700,
        borderRadius: 5,
        maxWidth: 'none',
        whiteSpace: 'nowrap',
    },
}) );

const GifImage = styleds.img({
    width: '27px',
    height: '23px',
});


const MachineryTable = ({ titleTable, data, handlerDelete, successMessage, errorMessage,
                            handlerDetail,loading,handlerPrint,detailMachine,onOpenView }) => {
    const { t } = useTranslation();
    let componentRef = useRef();
    const navigate = useNavigate();
    const handleOpenUpdateModal = (ID) => {
        handlerDetail(ID);
    };

    const handlePrintQr = (ID) => {
        handlerPrint(ID);
    };

    return (
        <TableContainer component={Paper}>
            <Box sx={{  display: 'none'}}>
                <Box ref={(el) => (componentRef = el)}>
                    <QRCode
                        className="qr-code"
                        style={{ height: "128px", maxWidth: "100%", width: "128px" }}
                        value={detailMachine?.qr || ''}
                    />
                    <Box className="qr-scan-text qr-scan-text-print" >{ t('scanMe') }</Box>
                </Box>
            </Box>
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
                            <StyledTableCell >
                                {item.warning && (
                                    <LightTooltip title={item.warning} TransitionProps= {{ timeout: 0 }}>
                                        <GifImage src={gifImage} alt="gif" />
                                    </LightTooltip>
                                )}
                            </StyledTableCell>
                            <StyledTableCell>
                                <button className="custom-button" onClick={() => onOpenView(item.id)}>
                                    {item.machine_name}
                                </button>
                            </StyledTableCell>
                            <StyledTableCell >{item.machine_type_name}</StyledTableCell>
                            <StyledTableCell >{item.machine_status_name}</StyledTableCell>
                            <StyledTableCell >{item.performance}</StyledTableCell>
                            <StyledTableCell >{item.worker_arrange_name}</StyledTableCell>
                            <StyledTableCell>
                                <Button className="buttontableStyle" onClick={() => onOpenView(item.id)}>{t('view')}</Button>
                                <ReactToPrint
                                    trigger={() =>  <Button className="buttontableStyle" onClick={() => handlePrintQr(item.id)}>{t('printQR')}</Button>}
                                    content={() => componentRef}
                                />
                                <Button className="buttontableStyle" onClick={() => handleOpenUpdateModal(item.id)}>{t('edit')}</Button>
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

export default MachineryTable;
