import React from 'react';
import {useTranslation} from "react-i18next";
import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import '../../../../resource/style/OderDetailStyle.css';
import {formatCurrency, formatNumber, formatPercentage} from "../../../../common/common";
import {TableContainer, Table, TableRow, TableCell, TableBody } from '@mui/material';
import {styled} from "@mui/material/styles";
import {tableCellClasses} from "@mui/material/TableCell";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: '14px',
        lineHeight: '16.41px',
        textAlign: 'left',
        letterSpacing: '0em',
        border: 'none',
        padding: '0',
        verticalAlign: 'top',
    },
}));

function calculateTotal(item) {
    const length = parseFloat(item.length);
    const width = parseFloat(item.width);
    const quantityValue = parseFloat(item.quantity);
    const length_standard = parseFloat(item.length_standard);
    const width_standard = parseFloat(item.width_standard);
    const quantityStandard = parseFloat(item.quantity_standard);
    const productForm = parseFloat(item.product_form.id);
    const finishedProduct = parseFloat(item.finished_product_form.id);
    const priceValue = parseFloat(item.price);
    const finishedProductStandard = parseFloat(item.finished_product_form_standard.id);
    const isValidNumber = (value) => !isNaN(value);

    let total = 0;

    if (productForm === 2 && isValidNumber(priceValue) && isValidNumber(quantityStandard) && isValidNumber(width_standard) && isValidNumber(length_standard)) {
        const lengthStandard = finishedProductStandard === 1 ? length_standard / 100 : length_standard;
        const widthStandard = width_standard / 100;
        total += quantityStandard * widthStandard * lengthStandard;
    } else if (productForm === 1 && isValidNumber(priceValue) && isValidNumber(quantityValue) && isValidNumber(width) && isValidNumber(length)) {
        const lengthInMeters = finishedProduct === 1 ? length / 100 : length;
        const widthInMeters = width / 100;
        total = quantityValue * lengthInMeters * widthInMeters;
    }

    return total;
}

function ReceiptTable({data,mode}) {
    const { t } = useTranslation();
    return(
        <Box>
            {mode !== 'no information' && (
                <Box flex={1}>
                    <TableContainer>
                        <Table sx={{ border: 'none' }}>
                            <TableBody>
                                {data.customer && (
                                    <>
                                        <TableRow>
                                            <StyledTableCell component="th" sx={{ whiteSpace: 'nowrap' }}>
                                                <Typography className="customerInfoItem">{t('customer')}:</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Typography className="customerInfoItem">{data.customer?.customer_name ? data.customer.customer_name : '\u00A0'}</Typography>
                                            </StyledTableCell>
                                        </TableRow>
                                        <TableRow>
                                            <StyledTableCell component="th" sx={{ whiteSpace: 'nowrap' }}>
                                                <Typography className="customerInfoItem">{t('deliveryAddress')}:</Typography>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Typography className="customerInfoItem">
                                                    {data.customer.address_delivery ? (
                                                      <>
                                                          {data.customer.address_delivery.detail && `${data.customer.address_delivery.detail}, `}
                                                          {data.customer.address_delivery.ward.ward_name && `${data.customer.address_delivery.ward.ward_name}, `}
                                                          {data.customer.address_delivery.district.district_name && `${data.customer.address_delivery.district.district_name}, `}
                                                          {data.customer.address_delivery.province.province_name}
                                                      </>
                                                    ) : (
                                                      <>
                                                          {data.customer.address && data.customer.address.detail && `${data.customer.address.detail}, `}
                                                          {data.customer.address && data.customer.address.ward?.ward_name && `${data.customer.address.ward.ward_name}, `}
                                                          {data.customer.address && data.customer.address.district?.district_name && `${data.customer.address.district.district_name}, `}
                                                          {data.customer.address && data.customer.address.province?.province_name}
                                                      </>
                                                    )}
                                                </Typography>
                                            </StyledTableCell>
                                        </TableRow>
                                    </>
                                )}
                                <TableRow>
                                    <StyledTableCell component="th" sx={{
                                        whiteSpace: 'nowrap',
                                        pr: '16px !important',
                                        width: '140px',
                                    }}>
                                        <Typography className="customerInfoItem">{t('payments')}:</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', }}>
                                            <Typography className="customerInfoItem">
                                                {data.payment_method?.payment_method_name ? data.payment_method.payment_method_name : t('noData')}
                                            </Typography>
                                            <Typography sx={{ marginLeft: '150px' }} className="customerInfoItem">
                                                {t('deliveryTerm')}: {data.delivery_date}
                                            </Typography>
                                        </Box>
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCell component="th" sx={{ whiteSpace: 'nowrap' }}>
                                        <Typography className="customerInfoItem">{t('explain')}:</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography className="customerInfoItem">{data.description ? data.description : t('noData')}</Typography>
                                    </StyledTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
            <table style={{ width: '100%', border: '1px solid #ccc', borderCollapse: 'collapse' }}>
                <thead>
                <tr>
                    <th className="uppercaseTh" rowSpan="2"> {t('goodsName')} </th>
                    <th className="specificationsTh" colSpan="4"> {t('specifications')} </th>
                    <th className="slTh" rowSpan="2">SL (M2)</th>
                    <th className="cell-with-border" rowSpan="2">{t('unitPrice')}</th>
                    <th className="cell-with-border" rowSpan="2">{t('intoMoney')}</th>
                </tr>
                <tr>
                    <th className="standardTh" colSpan="2">{t('standard')}</th>
                    <th className="machiningTh" colSpan="2">{t('machining')}</th>
                </tr>
                {data && data.product_items && data.product_items.map((item, index) => (
                    <React.Fragment key={index}>
                        <tr>
                            <th className="table-cell" rowSpan="2">{item.product.product_name}</th>
                            <th className="another-table-cell" colSpan="2">
                                {item.product_form.id === 2 && (
                                    <>
                                        {formatNumber(item.length_standard)} x {formatNumber(item.width_standard)} x {formatNumber(item.quantity_standard)}{" "}
                                        {item.finished_product_form_standard.id === 1 ? 'T' : (item.finished_product_form_standard.id === 2 ? 'C' : '')}
                                    </>
                                )}
                            </th>
                            <th className="another-table-cell" colSpan="2">
                                {formatNumber(item.length)} x {formatNumber(item.width)} x {formatNumber(item.quantity)}
                                {item.finished_product_form.id === 1 ? 'T' : (item.finished_product_form.id === 2 ? 'C' : '')}
                            </th>
                            <th className="another-table-cell" rowSpan="2">{formatNumber(calculateTotal(item))}</th>
                            <th className="custom-table-cell" rowSpan="2">{formatCurrency(item.price)}</th>
                            <th className="custom-table-cell" rowSpan="2">
                                {formatCurrency(calculateTotal(item) * item.price)}
                            </th>
                        </tr>
                        <tr></tr>
                    </React.Fragment>
                ))}
                </thead>
                <tbody>
                <tr>
                    <td className="custom-table-header" colSpan="5">{t('intoMoney')}</td>
                    <td className="customCell"colSpan="5">{formatCurrency(data.amount)}</td>
                </tr>
                <tr>
                    <td className="custom-table-header" colSpan="5">
                        {t('shippingAndProcessingFees')}
                    </td>
                    <td className="customCell"colSpan="5">{formatCurrency(data.delivery_charges?data.delivery_charges : '')}</td>
                </tr>
                <tr>
                    <td className="custom-table-header" colSpan="5">
                        {t('discount')}
                    </td>
                    <td className="customCell"colSpan="5">{formatPercentage(data.discount?data.discount : 0)}</td>
                </tr>
                <tr>
                    <td className="custom-table-header" colSpan="5">
                        {t('tax')}
                    </td>
                    <td className="customCell"colSpan="5">{formatCurrency(data.tax_amount?data.tax_amount : '')}</td>
                </tr>
                <tr>
                    <td className="custom-table-header" colSpan="5">
                        {t('total')}
                    </td>
                    <td className="customCell"colSpan="5">
                        {formatCurrency(data.total_cost)}
                    </td>
                </tr>
                </tbody>
            </table>
        </Box>
    );
}
export default ReceiptTable;
