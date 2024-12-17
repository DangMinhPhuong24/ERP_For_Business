import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import {Box, InputLabel, TextField} from "@mui/material";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import PolygonIcon from "../../../../asset/icon/Polygon.svg";
import colors from "../../../../constants/colors";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import selectedCase from "../../../../constants/selectedCase";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:'505px',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    overflow: 'auto',

};

export default function ProposedDebtAgeModal({open, nameTitle, handleCloseModal, dataCustomerDetail, dataDebtAge, customerId, handleSubmitAction,
                                                 isEdit, isView, dataDetailProposalDebtAge}) {
    const { t } = useTranslation();
    const [debtAge, setDebtAge] = useState('');

    useEffect(() => {
        if(isEdit){
            setDebtAge(dataDetailProposalDebtAge.debt_age?.id || "");
        }else{
            setDebtAge('');
        }

    }, [isEdit , dataDetailProposalDebtAge]);

    const handleSubmit = () =>{
        let dataProposal = {}
        if(isEdit){
            dataProposal = {
                id: dataDetailProposalDebtAge.id,
                debt_age_id: debtAge,
            }
        }else{
            dataProposal = {
                customer_id: customerId,
                debt_age_id: debtAge
            }
        }
        handleSubmitAction(dataProposal)
    }
    const handleCancel = () =>{
        handleCloseModal();
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
                        {!isView ? (
                            <>
                                <Box sx={{display:'flex', gap:'35px', mt:'48px', alignItems:'baseline'}}>
                                    <Box flex={1}>
                                        <InputLabel className="inputLabel-modal">{t('customerName')}</InputLabel>
                                    </Box>
                                    <Box flex={3}>
                                        <Typography component="p">
                                            {dataCustomerDetail.customer_name}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{display:'flex', gap:'35px', mt:'21px'}}>
                                    <Box flex={1}>
                                        <InputLabel className="inputLabel-modal">{t('debtAge')}</InputLabel>
                                    </Box>
                                    <Box flex={3}>
                                        <Autocomplete
                                            popupIcon={<PolygonIcon/>}
                                            size='small'
                                            sx={{width:'200px'}}
                                            options={dataDebtAge}
                                            value={dataDebtAge.find(option => option.id === debtAge) || null}
                                            getOptionLabel={(option) => option.debt_age_name}
                                            onChange={(event, value) => setDebtAge(value ? value.id : '')}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        classes: {
                                                            root: 'custom-input-search'
                                                        }
                                                    }}
                                                    placeholder={t("selectDebtAge")}
                                                />
                                            )}
                                            ListboxProps={{sx: {fontSize: '12px'}}}
                                        />
                                    </Box>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Box sx={{display:'flex', gap:'35px', mt:'48px', alignItems:'baseline'}}>
                                    <Box flex={1}>
                                        <InputLabel className="inputLabel-modal">{t('customerName')}</InputLabel>
                                    </Box>
                                    <Box flex={2}>
                                        <Typography className="typography-propose" component="p">
                                            {dataCustomerDetail.customer_name}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{display:'flex', gap:'35px', mt:'21px', alignItems:'baseline'}}>
                                    <Box flex={1}>
                                        <InputLabel className="inputLabel-modal">{t('proposeDebtAge')}</InputLabel>
                                    </Box>
                                    <Box flex={2}>
                                        <Typography className="typography-propose" component="p">
                                            {dataDetailProposalDebtAge.debt_age?.debt_age_name}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{display:'flex', gap:'35px', mt:'21px', alignItems:'baseline'}}>
                                    <Box flex={1}>
                                        <InputLabel className="inputLabel-modal">{t('proposalTime')}</InputLabel>
                                    </Box>
                                    <Box flex={2}>
                                        <Typography className="typography-propose" component="p">
                                            {dataDetailProposalDebtAge.created_at}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{display:'flex', gap:'35px', mt:'21px', alignItems:'baseline'}}>
                                    <Box flex={1}>
                                        <InputLabel className="inputLabel-modal">{t('status')}</InputLabel>
                                    </Box>
                                    <Box flex={2}>
                                        <Typography className="typography-propose" component="p">
                                            {
                                                dataDetailProposalDebtAge.proposal_status?.id === selectedCase.pending
                                                    ? <span style={{color: colors.slategrayColor}}>{dataDetailProposalDebtAge.proposal_status?.proposal_status_name}</span>
                                                    : dataDetailProposalDebtAge.proposal_status?.id === selectedCase.approved
                                                        ? <span style={{color: colors.greenColor}}>{dataDetailProposalDebtAge.proposal_status?.proposal_status_name}</span>
                                                        : <span style={{color: colors.redColor}}>{dataDetailProposalDebtAge.proposal_status?.proposal_status_name}</span>
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                                {!(dataDetailProposalDebtAge.proposal_status?.id === selectedCase.pending || dataDetailProposalDebtAge.proposal_status?.id === selectedCase.approved) ? (
                                    <Box sx={{ display: 'flex', gap: '35px', mt: '21px', alignItems: 'baseline' }}>
                                        <Box flex={1}>
                                            <InputLabel className="inputLabel-modal">{t('reason')}</InputLabel>
                                        </Box>
                                        <Box flex={2}>
                                            <Typography className="typography-propose" component="p">
                                                {dataDetailProposalDebtAge.reason}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ) : null}
                            </>
                        )}
                    </Box>
                    <Box sx={{
                        position: 'sticky',
                        bottom: '0',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: '8px 16px',
                        bgcolor: colors.paleblueColor,
                        zIndex: 1,
                    }}>
                        {!isView ? (
                            <>
                                <Button onClick={handleCancel} className="cancelButton">
                                    {t("cancel")}
                                </Button>
                                <Button variant="contained" onClick={handleSubmit}  className="confirmButton">
                                    {t("proposal")}
                                    <ArrowForwardIcon/>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={handleCancel} className="closeButton">
                                    {t("close")}
                                </Button>
                            </>
                        )}
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}