import {useTranslation} from "react-i18next";
import Backdrop from "@mui/material/Backdrop";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import {Box, InputLabel, TextField} from "@mui/material";
import Modal from "@mui/material/Modal";
import colors from "../../../../../constants/colors";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {isNumeric} from "../../../../../common/common";


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


export default function RefuseModal({open, nameTitle, handleCloseModal,handleUpdate}) {
    const {t} = useTranslation();
    const [reason, setReason] = useState('');
    const [errorMessageReason, setErrorMessageReason] = useState('');

    useEffect(() => {
        setReason('');
        setErrorMessageReason('');
    }, [open]);

    const handleSubmit = () => {
        const debtAge = {
            reason: reason,
        }
        let validate = validateData(debtAge);
        if (validate) {
            handleUpdate(debtAge);
        }
    }

    const validateData = (debtAge) => {
        let flag = true;
        setErrorMessageReason("");

        if (!debtAge.reason) {
            setErrorMessageReason(t("requiredField"));
            flag = false;
        }
        return flag;
    };


    const handleCancel = () => {
        handleCloseModal();
    }

    return (
        <Box>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                // onClose={handleCloseModal}
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
                    <Box sx={{p: '0 16px 25px 16px', mt: '20px'}}>
                        <InputLabel required
                                    className="requiredTextField inputLabel-modal">{t('reasons')}</InputLabel>
                        <TextField
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            error={errorMessageReason ? true : false}
                            helperText= {errorMessageReason ? errorMessageReason : ""}
                            fullWidth
                            multiline
                            placeholder={t("pleaseEnterReason")}
                            rows={3}
                            InputProps={{
                                classes: {
                                    root: 'custom-input-search'
                                }
                            }}
                        />
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
                        <Button onClick={handleCancel} className="backButton">
                            {t("back")}
                        </Button>
                        <Button variant="contained" onClick={handleSubmit} className="confirmButton">
                            {t("confirm")}
                            <ArrowForwardIcon/>
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}