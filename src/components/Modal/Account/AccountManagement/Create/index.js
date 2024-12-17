import React, {useEffect, useMemo, useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useTranslation } from "react-i18next";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {InputLabel, MenuItem} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import {isNumeric} from "../../../../../common/common";
import regex from "../../../../../constants/regex"
import PolygonIcon from "../../../../../asset/icon/Polygon.svg";
import colors from "../../../../../constants/colors";
import {useUser} from "../../../../../contexts/AuthContext";
import roles from "../../../../../constants/titleRole";
import {trim} from "lodash";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    maxHeight: '95vh',
    maxWidth: '95vw',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    overflow: 'auto',
};

export default function UserModal({
                                      open, nameTitle, rolesData, handleCreateUser,
                                      errorsMessage, successFlag, closeModalAction,
                                      handleClose, isEdit, handleUpdateUser, data, listBranch,
                                      departmentForUserData
                                  }) {
    const {t} = useTranslation();
    const [userID, setUserID] = useState("");
    const [username, setUsername] = useState("");
    const [gmail, setGmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstAndLastName, setFirstAndLastName] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const [selectedDepartments, setSelectedDepartments] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessageUserName, setErrorMessageUserName] = useState("");
    const [errorMessageGmail, setErrorMessageGmail] = useState("");
    const [errorMessagePassword, setErrorMessagePassword] = useState("");
    const [errorMessageFirstAndLastName, setErrorMessageFirstAndLastName] = useState("");
    const [errorMessageRole, setErrorMessageRole] = useState("");
    const [errorMessageDepartments, setErrorMessageDepartments] = useState("");
    const [errorMessageBranch, setErrorMessageBranch] = useState("");
    const { userInfo } = useUser()
    const userRole = useMemo(() => userInfo.role?.name ?? '', [userInfo])
    const userBranch = useMemo(() => userInfo.branch?.id ?? '', [userInfo])

    useEffect(() => {
        if (isEdit && data) {
            setUserID(data.id);
            setUsername(data.username);
            setGmail(data.email);
            setPassword('');
            setFirstAndLastName(data.name);
            setSelectedRole(data.role?.name);
            setSelectedDepartments(data.department?.id);
            setSelectedBranch(data.branch?.id);
        }
    }, [isEdit, data]);

    const clearInputs = () => {
        setUsername("");
        setGmail("");
        setPassword("");
        setFirstAndLastName("");
        setSelectedRole(null);
        setSelectedBranch("");
        setSelectedDepartments("");
    };

    useEffect(() => {
        if (successFlag) {
            clearInputs();
        }
    }, [successFlag]);

    useEffect(() => {
        if(errorsMessage.username || errorsMessage.email){
            setErrorMessageUserName(errorsMessage.username)
            setErrorMessageGmail(errorsMessage.email)
        }
    }, [errorsMessage]);

    const handleChoiceRole = (role) => {
        if (role && role.name) {
            setSelectedRole(role.name);
        } else {
            setSelectedRole("")
        }
    };

    const handleChoiceDepartments = (department) => {
        if (department && department.id) {
            setSelectedDepartments(department.id);
        } else {
            setSelectedDepartments("")
        }
    };

    const handleBranch = (branch) => {
        if (branch && branch.id) {
            setSelectedBranch(branch.id);
        } else {
            setSelectedBranch("")
        }
    };

    const handleSubmit = () => {
        const formData = {
            username: username,
            email: gmail,
            password: password,
            name: firstAndLastName,
            role_name: selectedRole,
            branch_id: userRole === roles.SUPER_ADMIN ? selectedBranch : userBranch,
            department_id: selectedDepartments,
        };
        let validate = validateData(formData);
        if (validate) {
            if (isEdit) {
                formData.id = userID;
                handleUpdateUser(formData)
            } else {
                handleCreateUser(formData)
            }
        }
    };


    const validateData = (formData) => {
        let flag = true;
        setErrorMessageUserName("");
        setErrorMessagePassword("");
        setErrorMessageFirstAndLastName("");
        setErrorMessageRole("");
        setErrorMessageDepartments("");
        setErrorMessageBranch("");
        setErrorMessageGmail("");
        if (!formData.username.trim()) {
            setErrorMessageUserName(t("pleaseDoNotLeaveItBlank"));
            flag = false;
        }
        if (gmail) {
            if (!regex.formatGmailCorrect.test(formData.email.trim())) {
                setErrorMessageGmail(t("formatGmailCorrect"));
                flag = false;
            }
        }
        if(!isEdit){
            if (!formData.password) {
                setErrorMessagePassword([t("pleaseDoNotLeaveItBlank")]);
                flag = false;
            }
        }
        if (!formData.name || formData.name.trim() === '') {
            setErrorMessageFirstAndLastName(t("pleaseDoNotLeaveItBlank"));
            flag = false;
        } else {
            if (!regex.accentedLetters.test(formData.name)) {
                setErrorMessageFirstAndLastName(t("nameError"));
                flag = false;
            }
        }
        if (!formData.role_name) {
            setErrorMessageRole(t("pleaseDoNotLeaveItBlank"));
            flag = false;
        }
        if (!formData.department_id) {
            setErrorMessageDepartments(t("pleaseDoNotLeaveItBlank"));
            flag = false;
        }
        if (!formData.branch_id) {
            setErrorMessageBranch(t("pleaseDoNotLeaveItBlank"));
            flag = false;
        }
        return flag;
    };


    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const normalizedListBranch = Array.isArray(listBranch) ? listBranch : [listBranch];
    const handleCloseModal = () => {
        setUsername("");
        setGmail("");
        setPassword("");
        setFirstAndLastName("");
        setSelectedRole(null);
        setErrorMessageUserName("");
        setErrorMessagePassword("");
        setErrorMessageFirstAndLastName("");
        setErrorMessageRole("");
        setSelectedBranch("");
        setErrorMessageBranch("");
        setSelectedDepartments("");
        setErrorMessageDepartments("");
        setErrorMessageGmail("");
        closeModalAction();
        handleClose();
    }


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
                        <Box p={2}>
                            <Typography className="modalTitle">
                                {nameTitle}
                            </Typography>
                            <Box>
                                <InputLabel className="inputLabel-modal">
                                    {t('username')}
                                    <span style={{color: colors.redColor}}> *</span>
                                </InputLabel>
                                <TextField
                                    error={errorMessageUserName ? true : false}
                                    id={errorMessageUserName ? "outlined-error-helper-text" : "outlined-required"}
                                    helperText={errorMessageUserName ? errorMessageUserName : ""}
                                    size='small'
                                    required
                                    fullWidth
                                    placeholder={t("enterUserName")}
                                    className="requiredTextField"
                                    value={username ? username : ''}
                                    onChange={(e) => setUsername(e.target.value)}
                                    InputProps={{
                                        classes: {
                                            root: 'custom-input-search'
                                        }
                                    }}
                                />
                                <InputLabel className="inputLabel-modal">
                                    {t('Gmail')}
                                </InputLabel>
                                <TextField
                                    error={errorMessageGmail ? true : false}
                                    id={errorMessageGmail ? "outlined-error-helper-text" : "outlined-required"}
                                    helperText={errorMessageGmail ? errorMessageGmail : ""}
                                    className="requiredTextField"
                                    size='small'
                                    fullWidth
                                    placeholder={t('enterGmail')}
                                    value={gmail ? gmail : ''}
                                    onChange={(e) => setGmail(e.target.value)}
                                    InputProps={{
                                        classes: {
                                            root: 'custom-input-search'
                                        }
                                    }}
                                />
                                <InputLabel className="inputLabel-modal">
                                    {t('password')}
                                    {!isEdit && <span style={{color: colors.redColor}}> *</span>}
                                </InputLabel>
                                <TextField
                                    error={errorMessagePassword || errorsMessage.password ? true : false}
                                    id={errorMessagePassword ? "outlined-error-helper-text" : "outlined-required"}
                                    helperText={
                                        errorMessagePassword
                                            ? errorMessagePassword
                                            : errorsMessage.password
                                                ? errorsMessage.password.map((error, index) => (
                                                    <span key={index} style={{display: 'block'}}>{error}</span>
                                                ))
                                                : ""
                                    }
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder={t("enterPassword")}
                                    value={password ? password : ''}
                                    onChange={(e) => setPassword(e.target.value)}
                                    fullWidth
                                    sx={{whiteSpace: 'pre-line'}}
                                    className="requiredTextField"
                                    required={!isEdit ? true : false}
                                    size='small'
                                    InputProps={{
                                        classes: {
                                            root: 'custom-input-search'
                                        },
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <InputLabel className="inputLabel-modal">
                                    {t('firstAndLastName')}
                                    <span style={{color: colors.redColor}}> *</span>
                                </InputLabel>
                                <TextField
                                    error={errorMessageFirstAndLastName ? true : false}
                                    id={errorMessageFirstAndLastName ? "outlined-error-helper-text" : "outlined-required"}
                                    helperText={errorMessageFirstAndLastName ? errorMessageFirstAndLastName : ""}
                                    size='small'
                                    required
                                    fullWidth
                                    placeholder={t("enterFirstAndLastName")}
                                    className="requiredTextField"
                                    value={firstAndLastName ? firstAndLastName : ''}
                                    onChange={(e) => setFirstAndLastName(e.target.value)}
                                    InputProps={{
                                        classes: {
                                            root: 'custom-input-search'
                                        }
                                    }}
                                />
                                <InputLabel className="inputLabel-modal">
                                    {t('permission')}
                                    <span style={{color: colors.redColor}}> *</span>
                                </InputLabel>
                                <Autocomplete
                                    noOptionsText={t('noResult')}
                                    onChange={(event, newValue) => {
                                        handleChoiceRole(newValue);
                                    }}
                                    options={rolesData}
                                    value={rolesData.find(role => role.name === selectedRole) || null}
                                    getOptionLabel={(options) => options.display_name}
                                    popupIcon={<PolygonIcon/>}
                                    renderInput={(params) => (
                                        <TextField
                                            error={errorMessageRole ? true : false}
                                            id={errorMessageRole ? "outlined-error-helper-text" : "outlined-required"}
                                            helperText={errorMessageRole ? errorMessageRole : ""}
                                            {...params}
                                            size="small"
                                            placeholder={t('selectRole')}
                                            InputProps={{
                                                ...params.InputProps,
                                            }}
                                            required
                                            className="requiredTextField"
                                        />
                                    )}
                                    classes={{inputRoot: 'custom-input-search'}}
                                />
                                <InputLabel className="inputLabel-modal">
                                    {t('departments')}
                                    <span style={{color: colors.redColor}}> *</span>
                                </InputLabel>
                                <Autocomplete
                                    noOptionsText={t('noResult')}
                                    onChange={(event, newValue) => {
                                        handleChoiceDepartments(newValue);
                                    }}
                                    options={departmentForUserData}
                                    value={departmentForUserData ? departmentForUserData.find(department => department.id === selectedDepartments) || null : null}
                                    getOptionLabel={(options) => options.department_name}
                                    popupIcon={<PolygonIcon/>}
                                    renderInput={(params) => (
                                        <TextField
                                            error={errorMessageDepartments ? true : false}
                                            id={errorMessageDepartments ? "outlined-error-helper-text" : "outlined-required"}
                                            helperText={errorMessageDepartments ? errorMessageDepartments : ""}
                                            {...params}
                                            size="small"
                                            placeholder={t('selectDepartment')}
                                            InputProps={{
                                                ...params.InputProps,
                                            }}
                                            required
                                            className="requiredTextField"
                                        />
                                    )}
                                    classes={{inputRoot: 'custom-input-search'}}
                                />
                                {userRole === roles.SUPER_ADMIN && (
                                    <>
                                        <InputLabel className="inputLabel-modal">
                                            {t('branch')}
                                            <span style={{color: colors.redColor}}> *</span>
                                        </InputLabel>
                                        <Autocomplete
                                            popupIcon={<PolygonIcon/>}
                                            noOptionsText={t('noResult')}
                                            onChange={(event, newValue) => {
                                                handleBranch(newValue);
                                            }}
                                            options={normalizedListBranch}
                                            value={normalizedListBranch.find(branch => branch.id === selectedBranch) || null}
                                            getOptionLabel={(option) => option.branch_name}
                                            renderInput={(params) => (
                                                <TextField
                                                    error={errorMessageBranch ? true : false}
                                                    id={errorMessageBranch ? "outlined-error-helper-text" : "outlined-required"}
                                                    helperText={errorMessageBranch ? errorMessageBranch : ""}
                                                    {...params}
                                                    size="small"
                                                    placeholder={t('selectBranch')}
                                                    InputProps={{
                                                        ...params.InputProps,
                                                    }}
                                                    required
                                                    className="requiredTextField"
                                                />
                                            )}
                                            classes={{inputRoot: 'custom-input-search'}}
                                        />
                                    </>
                                )}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                position: 'sticky',
                                bottom: '0',
                                display: 'flex',
                                justifyContent: 'flex-end',
                                p: '8px 16px',
                                bgcolor: colors.paleblueColor,
                                zIndex: 1
                            }}
                        >
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
    );
}

