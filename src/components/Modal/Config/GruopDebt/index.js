import React, { useState, useEffect } from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import { useTranslation } from "react-i18next"
import "../../../../resource/style/ConfigStyle.css"
import { filterDigitsLimit, isDigitOrEmpty, isNumeric } from "../../../../common/common"
import { Grid } from "@mui/material"
import colors from "../../../../constants/colors";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    // width: "588px",
    // height: '300px',
    maxHeight: "95vh",
    maxWidth: "95vw",
    bgcolor: "background.paper",
    borderRadius: "16px",
    p: 2,
    overflow: "auto",
    padding: "0px",
}

export default function GroupDebtModal(props) {
    const { open, nameTitle, handleCreateGruopDebt, handleUpdateGruopDebt, errorsMessage,
        successFlag, closeModalAction, isEdit, groupDebtData, handleClose } = props
    const { t } = useTranslation()
    const [debtGroupID, setDebtGroupID] = useState("")
    const [debtGroupName, setDebtGroupName] = useState("")
    const [debtGroupStartDay, setDebtGroupStartDay] = useState("")
    const [debtGroupEndDay, setDebtGroupEndDay] = useState("")
    const [errorMessageDebtGroupName, setErrorMessageDebtGroupName] = useState("")
    const [errorMessageStartDayNumber, setErrorMessageStartDayNumber] = useState("")
    const [errorMessageEndDayNumber, setErrorMessageEndDayNumber] = useState("")
    const [errorMessage, setErrorMessage] = useState([])

    useEffect(() => {
        const errorMessageSet = new Set();

        if (errorsMessage && errorsMessage[0]) {
            if (errorsMessage[0].debt_group_name) {
                errorsMessage[0].debt_group_name.forEach((error) => {
                    errorMessageSet.add(error);
                });
            }
            if (errorsMessage[0].start_day) {
                errorsMessage[0].start_day.forEach((error) => {
                    errorMessageSet.add(error);
                });
            }
            if (errorsMessage[0].end_day) {
                errorsMessage[0].end_day.forEach((error) => {
                    errorMessageSet.add(error);
                });
            }
            if (errorsMessage[0].overwrite) {
                errorsMessage[0].overwrite.forEach((error) => {
                    errorMessageSet.add(error);
                });
            }
        }
        setErrorMessage(Array.from(errorMessageSet));
    }, [errorsMessage]);

    useEffect(() => {
        if (isEdit && groupDebtData) {
            setDebtGroupID(groupDebtData.id)
            setDebtGroupName(groupDebtData.debt_group_name)
            setDebtGroupStartDay(groupDebtData.start_day)
            setDebtGroupEndDay(groupDebtData.end_day)
        }
    }, [isEdit, groupDebtData])

    const handleSubmit = () => {
        const groupDebt = {
            debt_group_name: debtGroupName,
            start_day: Number(debtGroupStartDay),
            end_day: Number(debtGroupEndDay),
        }
        let validate = validateData(groupDebt)
        if (validate) {
            if (isEdit) {
                groupDebt.id = debtGroupID
                handleUpdateGruopDebt(groupDebt)
            } else {
                handleCreateGruopDebt(groupDebt)
            }
        }
    }

    const validateData = (groupDebt) => {
        let flag = true
        setErrorMessageDebtGroupName("")
        setErrorMessageStartDayNumber("")
        setErrorMessageEndDayNumber("")

        if (!groupDebt.debt_group_name) {
            setErrorMessageDebtGroupName(t("pleaseEnterTheDebtGroupName"))
            flag = false
        }
        if (!groupDebt.start_day) {
            setErrorMessageStartDayNumber(t("pleaseEnterTheNumberOfDays"))
            flag = false
        } else if (groupDebt.start_day && !isNumeric(groupDebt.start_day)) {
            setErrorMessageStartDayNumber(t("onlyNumber"))
            flag = false
        }
        if (!groupDebt.end_day) {
            setErrorMessageEndDayNumber(t("pleaseEnterTheNumberOfDays"))
            flag = false
        } else if (groupDebt.end_day && !isNumeric(groupDebt.end_day)) {
            setErrorMessageEndDayNumber(t("onlyNumber"))
            flag = false
        }
        return flag
    }

    const handleCloseModal = () => {
        setErrorMessageDebtGroupName("");
        setErrorMessageStartDayNumber("");
        setErrorMessageEndDayNumber("");
        setErrorMessage([]);
        closeModalAction();
        handleClose();
    };

    const handleDebtGroupStartDayChange = (e) => {
        let { value } = e.target;
        value = filterDigitsLimit(value, 9);
        if (isDigitOrEmpty(value)) {
            setDebtGroupStartDay(value)
        }
    };

    const handleDebtGroupEndDayChange = (e) => {
        let { value } = e.target;
        value = filterDigitsLimit(value, 9);
        if (isDigitOrEmpty(value)) {
            setDebtGroupEndDay(value)
        }
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={ open }
                onClose={ handleCloseModal }
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
                            <Box sx={{ marginTop: '20px', display: "flex", flexDirection: "row", alignItems: "center", }}>
                                <Grid container >
                                    <Grid item>
                                        <Typography className="tiletypography">
                                            {t("debtGroupName")}
                                            <span className="required">*</span>
                                        </Typography>
                                        <TextField
                                            error={errorMessageDebtGroupName || (errorsMessage && errorsMessage[0]?.debt_group_name) ? true : false}
                                            required
                                            onChange={(e) => setDebtGroupName(e.target.value)}
                                            id={errorMessageDebtGroupName ? "outlined-error-helper-text" : "outlined-required"}
                                            placeholder={t("enterDebtGroupName")}
                                            size="small"
                                            sx={{ width: "212px" }}
                                            helperText={errorMessageDebtGroupName ? errorMessageDebtGroupName : ""}
                                            value={debtGroupName}
                                        />
                                    </Grid>
                                    <Grid item sx={{ marginLeft: '10px' }}>
                                        <Typography className="tiletypography">
                                            {t("numberOfDaysOfLatePayment")}
                                            <span className="required">*</span>
                                        </Typography>
                                        <Box sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "flex-end",
                                        }}>
                                            <Typography sx={{ marginRight: "4px", marginTop: "10px", fontSize: 14 }}>
                                                {t("from")}
                                            </Typography>
                                            <TextField
                                                error={errorMessageStartDayNumber || (errorsMessage && errorsMessage[0]?.start_day) ? true : false}
                                                id={errorMessageStartDayNumber ? "outlined-error-helper-text" : "outlined-required"}
                                                helperText={errorMessageStartDayNumber ? errorMessageStartDayNumber : ""}
                                                placeholder={t("enterNumber")}
                                                size="small"
                                                sx={{ width: '90px' }}
                                                onChange={(e) => handleDebtGroupStartDayChange(e)}
                                                value={debtGroupStartDay}
                                            />
                                            <Typography sx={{ marginLeft: "8px", marginRight: "4px", marginTop: "10px", fontSize: 14 }}>
                                                {t("to")}
                                            </Typography>
                                            <TextField
                                                error={errorMessageEndDayNumber || (errorsMessage && errorsMessage[0]?.end_day) ? true : false}
                                                id={errorMessageEndDayNumber ? "outlined-error-helper-text" : "outlined-required"}
                                                helperText={errorMessageEndDayNumber ? errorMessageEndDayNumber : ""}
                                                placeholder={t("enterNumber")}
                                                size="small"
                                                sx={{ width: '90px' }}
                                                onChange={(e) => handleDebtGroupEndDayChange(e)}
                                                value={debtGroupEndDay}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box sx={{ mt: 1, ml: 1 }}>
                                {errorMessage.map((error, index) => (
                                    <Typography
                                        key={index}
                                        sx={{ fontSize: '0.75rem' }}
                                        color="error"
                                    >
                                        {error}
                                    </Typography>
                                ))}
                            </Box>
                        </Box>
                        <Box className='setPaddingGroupDebtRim' sx={{ height: '64px', background: colors.paleblueColor, display: "flex", justifyContent: "flex-end", alignItems: "center", mt: 3 }}>
                            <Button variant="outlined" onClick={handleCloseModal} className="cancelButton">
                                {t("cancel")}
                            </Button>
                            <Button onClick={handleSubmit} variant="contained" className="confirmButton">
                                {isEdit ? t("save") : t("add")}
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
