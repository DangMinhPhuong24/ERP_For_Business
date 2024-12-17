import React from 'react';
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import colors from "../../constants/colors";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.body}`]: {
        fontSize: '12px',
        textAlign: 'left',
        lineHeight: '14.06px',
        letterSpacing: '0em',
        border: 'none',
        padding:'0',
        verticalAlign: 'top',
    },
}));

const dataBasic = {
    madonhang: "DH0001",
    dang: "Tờ",
    tenhang: "ALT046 Tờ CDP080-YK080-YG1 (AL-GH) Decal giấy mặt trắng, để vàng logo H ghi, keo nóng",
    kickthuoc: "32cm x 54,5 cm x 1650 tờ"
};

export default function BasicInformation({ data }) {
    const { t } = useTranslation();

    const commonTypography = (text, bold = false, required = false) => (
        <Typography sx={{ fontSize: '12px', lineHeight: '14.06px', fontWeight: bold ? 'bold' : 'normal', mt: 1 }}>
            {t(text)}
            {required && <span className="required">*</span>}
        </Typography>
    );

    return (
        <Box>
            <Grid container columnSpacing={2} sx={{ marginTop: '25px' }}>
                <Grid item>
                    {commonTypography("order", false, true)}
                    <Autocomplete
                        value='DH0001'
                        options={data}
                        sx={{ width: '250px' }}
                        renderInput={(params) => <TextField {...params} size='small' />}
                    />
                </Grid>
                <Grid item>
                    {commonTypography("startTime", false, true)}
                    <Grid container columnSpacing={1}>
                        <Grid item>
                            <TextField defaultValue="09:00"
                                       sx={{ width: '98px', fontStyle: 'italic'}} size="small"
                                       inputProps={{ sx: { textAlign: 'center' } }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField defaultValue="20/10/2023"
                                       sx={{ width: '146px', fontStyle: 'italic'}} size="small"
                                       inputProps={{ sx: { textAlign: 'center' } }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {commonTypography("orderInformation", true)}
            <Box
                sx={{
                    background: colors.whiteColor,
                    borderRadius: '8px',
                    mt: 1
                }}
            >
                <Box p={1}>
                    <Typography
                        sx={{ fontWeight: 'bold', textAlign: 'center', color: colors.greyColor }}>
                        {t("displayArea")} - {t("onlyView")}
                    </Typography>
                    <TableContainer>
                        <Table sx={{ border: 'none' }}>
                            <TableBody>
                                <TableRow>
                                    <StyledTableCell component="th" sx={{whiteSpace:'nowrap', pr:'16px !important'}}>
                                        <Typography>{commonTypography(t('codeOrders'))}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography>{commonTypography(dataBasic.madonhang, true)}</Typography>
                                    </StyledTableCell>
                                </TableRow>

                                <TableRow>
                                    <StyledTableCell component="th" sx={{whiteSpace:'nowrap', pr:'16px !important'}}>
                                        <Typography>{commonTypography(t('format'))}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell >
                                        <Typography>{commonTypography(dataBasic.dang, true)}</Typography>
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCell component="th" sx={{whiteSpace:'nowrap', pr:'16px !important'}}>
                                        <Typography>{commonTypography(t('goodsName'))}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography>{commonTypography(dataBasic.tenhang, true)}</Typography>
                                    </StyledTableCell>
                                </TableRow>
                                <TableRow>
                                    <StyledTableCell component="th" sx={{whiteSpace:'nowrap', pr:'16px !important'}}>
                                        <Typography>{commonTypography(t('size'))}</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>
                                        <Typography>{commonTypography(dataBasic.kickthuoc, true)}</Typography>
                                    </StyledTableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box>
    )
}
