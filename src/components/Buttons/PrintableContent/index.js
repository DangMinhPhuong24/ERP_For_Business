import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import { Box, Button, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import QRCode from 'react-qr-code';
import { useTranslation } from "react-i18next";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import { formatNumber } from "../../../common/common";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.body}`]: {
    fontSize: '14px',
    lineHeight: '16.41px',
    textAlign: 'left',
    letterSpacing: '0em',
    border: 'none',
    padding: '0',
    verticalAlign: 'top'
  }
}));

const QRBox = ({ item }) => {
  const { t } = useTranslation();

  return (
    <Box
      className="print-only"
      sx={{
        width: '15cm',
        height: '7.5cm',
        border: '1px solid black',
        padding: 1,
        boxSizing: 'border-box',
        mb: 2,
      }}
    >
      <Typography variant="h6" component="h2" fontWeight="bold">
        CÔNG TY TNHH LINH HIẾU
      </Typography>
      <Box sx={{ display: 'flex', mt: 1 }}>
        <Box>
          <TableContainer>
            <Table sx={{ border: 'none' }}>
              <TableBody>
                <TableRow>
                  <StyledTableCell component="th" sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '100px' }}>
                    <Typography className="text-print">{t('commodityDode')}:</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography className="text-print">{item.code}</Typography>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell component="th" sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '100px' }}>
                    <Typography className="text-print">{t('format')}:</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography className="text-print">{item.finished_product_form?.finished_product_form_name}</Typography>
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, flexDirection: 'column' }}>
            <QRCode
              style={{ height: '130px', width: '130px' }}
              value={item?.product_warehouse_qr || ''}
            />
            <Typography style={{ marginTop: '10px' }} className="text-print">
              {item?.product_warehouse_qr}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginLeft: '40px' }}>
          <TableContainer>
            <Table sx={{ border: 'none' }}>
              <TableBody>
                <TableRow>
                  <StyledTableCell component="th" sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '100px' }}>
                    <Typography className="text-print">{t('width')} (cm):</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography className="text-print">{formatNumber(item.width) ?? 0}</Typography>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell component="th" sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '100px' }}>
                    <Typography className="text-print">{t('length')} (m):</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography className="text-print">{formatNumber(item.length) ?? 0}</Typography>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell component="th" sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '100px' }}>
                    <Typography className="text-print">{t('quantity')}:</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography className="text-print">{item.quantity}</Typography>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell component="th" sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '100px' }}>
                    <Typography className="text-print">M<sup>2</sup>:</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography className="text-print">{formatNumber(item.square_meter)}</Typography>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell component="th" sx={{ whiteSpace: 'nowrap', pr: '16px !important', width: '100px' }}>
                    <Typography className="text-print">{t('day')}:</Typography>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography className="text-print">{item.formation_date}</Typography>
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

const PrintableContent = ({ data }) => {
  let componentRef = useRef();
  const { t } = useTranslation();

  return (
    <>
      <ReactToPrint
        trigger={() => (
          <Button className="printQRButton">
            {t('printQR')} <ArrowForwardIcon />
          </Button>
        )}
        content={() => componentRef}
      />
      <Box
        ref={(el) => (componentRef = el)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: '15px'
        }}
      >
        {Array.isArray(data)
          ? data.map((item, index) => <QRBox key={index} item={item} />)
          : <QRBox item={data} />}
      </Box>
    </>
  );
};

export default PrintableContent;
