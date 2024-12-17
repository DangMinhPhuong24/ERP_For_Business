import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useTranslation } from "react-i18next";
import "../../../../resource/style/ConfigStyle.css";
import { filterDigitsLimit, isDigitOrEmpty, isNumeric } from "../../../../common/common";
import colors from "../../../../constants/colors";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '547px',
    // height: '250px',
    maxHeight: '95vh',
    maxWidth: '95vw',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    p: 2,
    overflow: 'auto',
    padding: '0px',
};

export default function DebtAgeModal(props) {
    const { open, nameTitle, handleCreateDebtAge, errorsMessage, successFlag, closeModalAction,
        handleUpdateDebtAge, isEdit, debtAgeData, handleClose
    } = props
    const { t } = useTranslation();

    const [debtAgeID, setDebtAgeID] = useState("");
    const [debtAgeName, setAgeDebtName] = useState("");
    const [numberOfDaysOfLatePayment, setNumberOfDaysOfLatePayment] = useState("");
    const [errorMessageDebtAgeName, setErrorMessageDebtAgeName] = useState("");
    const [errorMessageNumberOfDaysOfLatePayment, setErrorMessageNumberOfDaysOfLatePayment] = useState("");

    useEffect(() => {
        if (isEdit && debtAgeData) {
            setDebtAgeID(debtAgeData.id);
            setAgeDebtName(debtAgeData.debt_age_name);
            setNumberOfDaysOfLatePayment(debtAgeData.days_allowed);
        }
    }, [isEdit, debtAgeData]);

    const handleSubmit = () => {
        const debtAge = {
            debt_age_name: debtAgeName,
            days_allowed: Number(numberOfDaysOfLatePayment),
        }
        let validate = validateData(debtAge);
        if (validate) {
            if (isEdit) {
                debtAge.id = debtAgeID;
                handleUpdateDebtAge(debtAge)
            } else {
                handleCreateDebtAge(debtAge)
            }
        }
    };
    const validateData = (debtAge) => {
        let flag = true;
        setErrorMessageDebtAgeName("");
        setErrorMessageNumberOfDaysOfLatePayment("");

        if (!debtAge.debt_age_name) {
            setErrorMessageDebtAgeName(t("pleaseEnterTheDebtAgeType"));
            flag = false;
        }
        if (!debtAge.days_allowed) {
            setErrorMessageNumberOfDaysOfLatePayment(t("pleaseEnterTheNumberOfDays"));
            flag = false;
        } else if (debtAge.days_allowed && !isNumeric(debtAge.days_allowed)) {
            setErrorMessageNumberOfDaysOfLatePayment(t("onlyNumber"));
            flag = false;
        }
        return flag;
    };

    const handleCloseModal = () => {
        setErrorMessageDebtAgeName("");
        setErrorMessageNumberOfDaysOfLatePayment("");
        setAgeDebtName("");
        setNumberOfDaysOfLatePayment("");
        closeModalAction();
        handleClose();
    }

    const handletNumberOfDaysOfLatePaymentChange = (e) => {
        let { value } = e.target;
        value = filterDigitsLimit(value, 9);
        if (isDigitOrEmpty(value)) {
            setNumberOfDaysOfLatePayment(value)
        }
    };

    return (
        <div>
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
                <Fade in={open}>
                    <Box sx={style}>
                        <Box className='setPaddingGruopDebt'>
                            <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
                                {nameTitle}
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: '20px' }}>
                                <Box>
                                    <Typography className="tiletypography">
                                        {t("debtAgeType")}
                                        <span className="required">*</span>
                                    </Typography>
                                    <TextField
                                        error={errorMessageDebtAgeName ? true : false}
                                        required
                                        onChange={(e) => setAgeDebtName(e.target.value)}
                                        id={errorMessageDebtAgeName ? "outlined-error-helper-text" : "outlined-required"}
                                        helperText={errorMessageDebtAgeName ? errorMessageDebtAgeName : ""}
                                        id="outlined-basic"
                                        placeholder={t("enterTheTypeName")}
                                        size="small"
                                        className="customTextFieldDebtAgeModal"
                                        value={debtAgeName}
                                    />
                                </Box>
                                <Box sx={{ marginLeft: '10px', marginTop: '-1px' }}>
                                    <Typography className="tiletypography">
                                        {t("numberOfDaysAllowedForLatePayment")}
                                        <span className="required">*</span>
                                    </Typography>
                                    <TextField
                                        error={errorMessageNumberOfDaysOfLatePayment ? true : false}
                                        required
                                        onChange={(e) => handletNumberOfDaysOfLatePaymentChange(e)}
                                        id={errorMessageNumberOfDaysOfLatePayment ? "outlined-error-helper-text" : "outlined-required"}
                                        helperText={errorMessageNumberOfDaysOfLatePayment ? errorMessageNumberOfDaysOfLatePayment : ""}
                                        id="outlined-basic"
                                        placeholder={t("enterTheNumberOfDays")}
                                        size="small"
                                        className="customTextFieldDebtAgeModal"
                                        value={numberOfDaysOfLatePayment}
                                    />
                                </Box>
                            </Box>
                            <Box sx={{ ml: 1 }}>
                                <Typography sx={{ fontSize: "0.75rem" }} color="error" className="error-message">
                                    {errorsMessage}
                                </Typography>
                            </Box>
                        </Box>
                        <Box className='setPaddingGroupDebtRim' sx={{ height: '64px', background: colors.paleblueColor, display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 3 }}>
                            <Button variant="outlined" onClick={handleCloseModal} className="cancelButton">
                                {t("cancel")}
                            </Button>
                            <Button onClick={handleSubmit} variant="contained" className="confirmButton" sx={{ marginRight: '15px' }}>
                                {isEdit ? t("save") : t("add")}
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
