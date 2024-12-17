import {useTranslation} from "react-i18next";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import React, {useState} from "react";
import {Box, Grid, InputLabel, TextField} from "@mui/material";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import PolygonIcon from "../../../../asset/icon/Polygon.svg";
import colors from "../../../../constants/colors";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import RefuseIcon from "../../../../asset/icon/Refuse.svg";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '525px',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    overflow: 'auto',

};


export default function DebtAgeModal({open, nameTitle, handleCloseModal, data , handleSuccess,handleCancelModal}){
    const { t } = useTranslation();

    const handleSubmit = () =>{
        handleSuccess();
    }
    const handleCancel = () =>{
        handleCancelModal();
    }
    const handle = () =>{
        const url = `/sale/information/customer-detail?id=${data.customer?.id}`;
        window.open(url, '_blank');
    }

    return(
        <Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box
                    sx={style}
                >
                    <Typography component="p" className="claim-title">
                        {nameTitle}
                    </Typography>
                    <Box sx={{p:'0 16px 25px 16px'}}>
                        <Box sx={{display:'flex', gap:'35px', mt:'48px', alignItems:'baseline'}}>
                            <Box flex={1}>
                                <InputLabel className="inputLabel-modal">{t('customerName')}</InputLabel>
                            </Box>
                            <Box sx={{display:'flex', alignItems:'baseline', gap: 1}} flex={3}>
                                <Typography className="typography-propose" component="p">
                                    {data.customer?.customer_name}
                                </Typography>
                                <Box sx={{display:'flex', alignItems:'baseline', gap: 1, color:colors.blueColor}} flex={1}>
                                    <Button className="text-field-input" onClick={handle} sx={{textDecoration:'underline', textTransform:'none'}} >
                                        {t("seeDetails")} <ArrowForwardIcon sx={{width:'15px', height:'15px'}}/>
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{display:'flex', gap:'35px', mt:'21px', alignItems:'baseline'}}>
                            <Box flex={1}>
                                <InputLabel className="inputLabel-modal">{t('proposeDebtAge')}</InputLabel>
                            </Box>
                            <Box flex={3}>
                                <Typography className="typography-propose" component="p">
                                    {data.debt_age?.debt_age_name} (<span className="text-field-input" style={{fontStyle:'italic'}}>{t('Số ngày chậm thanh toán cho phép')}: {data.debt_age?.days_allowed}</span>)
                                </Typography>
                            </Box>
                        </Box>
                        <Box sx={{display:'flex', gap:'35px', mt:'21px', alignItems:'baseline'}}>
                            <Box flex={1}>
                                <InputLabel className="inputLabel-modal">{t('proposer')}</InputLabel>
                            </Box>
                            <Box flex={3}>
                                <Typography className="typography-propose" component="p">
                                    {data.user?.name}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                    {data.proposal_status?.id === 1 && (
                        <Box sx={{
                            bottom: '0',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: '8px 16px',
                            bgcolor: colors.paleblueColor,
                            zIndex: 1,
                        }}>
                            <>
                                <Button onClick={handleCancel} className="cancelButton">
                                    {t("refuse")}
                                    <RefuseIcon />
                                </Button>
                                <Button variant="contained" onClick={handleSubmit} className="confirmButton">
                                    {t("accept")}
                                    <ArrowForwardIcon />
                                </Button>
                            </>
                        </Box>
                    )}
                </Box>
            </Modal>
        </Box>
    )
}