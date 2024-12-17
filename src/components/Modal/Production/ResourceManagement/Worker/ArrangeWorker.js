import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import {Box, FormControlLabel, FormLabel, Grid, Radio, RadioGroup} from '@mui/material';
import Fade from '@mui/material/Fade';
import {useLocation} from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import dayjs from "dayjs";
import PolygonIcon from "../../../../../asset/icon/Polygon.svg";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '465px',
    height: 'auto',
    maxHeight: '95vh',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    overflow: 'auto',
    padding: '20px',
};

export default function ArrangeWorkerModal({open, handleClose, nameTitle,listAllMachine,errorsMessage,handleMachines,closeModalAction,workerPlacementTime,
                                          listAllMachineType}) {
    const { t } = useTranslation();
    const [machineS1Id, setMachineS1Id] = useState("");
    const [machineS2Id, setMachineS2Id] = useState("");
    const [machineC1Id, setMachineC1Id] = useState("");
    const [machineC2Id, setMachineC2Id] = useState("");
    // const [ machineTypeErrorMessage, setErrorMessageMachineType ] = useState('');

    const handleCloseModal = () => {
        setMachineS1Id("");
        setMachineS2Id("");
        setMachineC1Id("");
        setMachineC2Id("");
        // setErrorMessageMachineType("");
        // closeModalAction();
        handleClose();
    }

    // useEffect(() => {
    //     if (!open ) {
    //         handleCloseModal();
    //     }
    // }, [open]);

    // useEffect(() => {
    //     if (mode === 'edit'){
    //         setMachineTypeId(data.machine_type?.id || "");
    //         setMachineName(data.machine_name || "");
    //         setProducerName(data.manufacturer || "");
    //         handleBuyingTimeDateChange(data.buy_date || null);
    //         if(data.maintenance_date){
    //             handleMaintenanceDateChange(data.maintenance_date);
    //         }
    //     }
    // }, [data]);

    const handleSubmit = () => {
        // let machines;
        // if(mode === "edit"){
        //     machines = {
        //         id:data.id,
        //         name:machineName,
        //         machine_type_id:machineTypeId,
        //         manufacturer:producerName,
        //         buy_date:buyingTimeDate,
        //         maintenance_date:maintenanceDate,
        //     }
        // }
        // let validate = validateData(machines);
        // if (validate) {
        //     handleMachines(machines)
        // }
    };
    // const validateData = (machines) => {
    //     let flag = true;
    //     setErrorMessageMachineName('');
    //     setErrorMessageMachineType('');
    //     setErrorMessageBuyingTime('');
    //
    //     if(!machines.name){
    //         setErrorMessageMachineName( t( 'requiredField' ) );
    //         flag = false;
    //     }
    //     if(!machines.machine_type_id){
    //         setErrorMessageMachineType( t( 'requiredField' ) );
    //         flag = false;
    //     }
    //     if(!machines.buy_date || !isValidDate(machines.buy_date)){
    //         setErrorMessageBuyingTime( t( 'pleaseSelectDeliveryDate' ) );
    //         flag = false;
    //     }
    //     return flag;
    // };

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={ handleCloseModal }
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography component="h2" className="Title-straight">
                            {nameTitle}
                        </Typography>
                        <Box sx={{ flexDirection: 'column'}}>
                            <Box>
                                <Box display="flex" alignItems="center">
                                    <Typography className="radio-text-productionMethod">
                                        {t("day")}
                                    </Typography>
                                    <TextField
                                        id="outlined-basic"
                                        size="small"
                                        sx={{ width: '127px',marginLeft: '20px'}}
                                        value={dayjs(workerPlacementTime).format('DD/MM/YYYY')}
                                    />
                                </Box>
                                <Box display="flex" alignItems="flex-start" >
                                    <Typography sx={{marginTop:"11px"}} className="radio-text-productionMethod">
                                        {t("shift")}
                                    </Typography>
                                    <Box sx={{ flexDirection: 'column'}}>
                                        <Box display="flex" alignItems="center" sx={{marginLeft:"60px"}}>
                                            <Typography className="radio-text-productionMethod">S1</Typography>
                                            <Typography className="radio-text-productionMethod" sx={{marginLeft:"55px"}}>
                                                {t("machineCharge")}
                                            </Typography>
                                            <Autocomplete
                                                popupIcon={<PolygonIcon />}
                                                sx={{ width: '180px',marginLeft:"20px"}}
                                                size='small'
                                                options={listAllMachine}
                                                value={listAllMachine.find(option => option.id === machineS1Id) || null}
                                                onChange={(event, value) => setMachineS1Id(value ? value.id : "")}
                                                getOptionLabel={(option) => option.machine_name}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder={t("chooseMachine")}
                                                        variant="outlined"
                                                        // error={machineTypeErrorMessage ? true : false}
                                                        // id={machineTypeErrorMessage ? "outlined-error-helper-text" : "outlined-required"}
                                                        // helperText={machineTypeErrorMessage ? machineTypeErrorMessage : ""}
                                                    />
                                                )}
                                                ListboxProps={{ style: { maxHeight: '180px' } }}
                                            />
                                        </Box>
                                        <Box display="flex" alignItems="center" sx={{marginLeft:"60px", marginTop:"5px"}}>
                                            <Typography className="radio-text-productionMethod">S2</Typography>
                                            <Typography className="radio-text-productionMethod" sx={{marginLeft:"60px"}}>
                                                {t("machineCharge")}
                                            </Typography>
                                            <Autocomplete
                                                popupIcon={<PolygonIcon />}
                                                sx={{ width: '180px',marginLeft:"20px"}}
                                                size='small'
                                                options={listAllMachine}
                                                value={listAllMachine.find(option => option.id === machineS2Id) || null}
                                                onChange={(event, value) => setMachineS2Id(value ? value.id : "")}
                                                getOptionLabel={(option) => option.machine_name}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder={t("chooseMachine")}
                                                        variant="outlined"
                                                        // error={machineTypeErrorMessage ? true : false}
                                                        // id={machineTypeErrorMessage ? "outlined-error-helper-text" : "outlined-required"}
                                                        // helperText={machineTypeErrorMessage ? machineTypeErrorMessage : ""}
                                                    />
                                                )}
                                                ListboxProps={{ style: { maxHeight: '150px' } }}
                                            />
                                        </Box>
                                        <Box display="flex" alignItems="center" sx={{marginLeft:"60px", marginTop:"5px"}}>
                                            <Typography className="radio-text-productionMethod">C1</Typography>
                                            <Typography className="radio-text-productionMethod" sx={{marginLeft:"60px"}}>
                                                {t("machineCharge")}
                                            </Typography>
                                            <Autocomplete
                                                popupIcon={<PolygonIcon />}
                                                sx={{ width: '180px',marginLeft:"20px"}}
                                                size='small'
                                                options={listAllMachine}
                                                value={listAllMachine.find(option => option.id === machineC1Id) || null}
                                                onChange={(event, value) => setMachineC1Id(value ? value.id : "")}
                                                getOptionLabel={(option) => option.machine_name}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder={t("chooseMachine")}
                                                        variant="outlined"
                                                        // error={machineTypeErrorMessage ? true : false}
                                                        // id={machineTypeErrorMessage ? "outlined-error-helper-text" : "outlined-required"}
                                                        // helperText={machineTypeErrorMessage ? machineTypeErrorMessage : ""}
                                                    />
                                                )}
                                                ListboxProps={{ style: { maxHeight: '180px' } }}
                                            />
                                        </Box>
                                        <Box display="flex" alignItems="center" sx={{marginLeft:"60px", marginTop:"5px"}}>
                                            <Typography className="radio-text-productionMethod">C2</Typography>
                                            <Typography className="radio-text-productionMethod" sx={{marginLeft:"60px"}}>
                                                {t("machineCharge")}
                                            </Typography>
                                            <Autocomplete
                                                popupIcon={<PolygonIcon />}
                                                sx={{ width: '180px',marginLeft:"20px"}}
                                                size='small'
                                                options={listAllMachine}
                                                value={listAllMachine.find(option => option.id === machineC2Id) || null}
                                                onChange={(event, value) => setMachineC2Id(value ? value.id : "")}
                                                getOptionLabel={(option) => option.machine_name}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder={t("chooseMachine")}
                                                        variant="outlined"
                                                        // error={machineTypeErrorMessage ? true : false}
                                                        // id={machineTypeErrorMessage ? "outlined-error-helper-text" : "outlined-required"}
                                                        // helperText={machineTypeErrorMessage ? machineTypeErrorMessage : ""}
                                                    />
                                                )}
                                                ListboxProps={{
                                                    style: {
                                                        maxHeight: '180px',
                                                    },
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, alignItems: 'center',marginTop:'20px'}}>
                            <Typography sx={{marginRight: "15px"}} variant="body1" color="error" className="error-message">
                                {errorsMessage}
                            </Typography>
                            <Button variant="outlined" onClick={handleCloseModal} className="cancelButton">
                                {t("cancel")}
                            </Button>
                            <Button variant="contained"  className="confirmButton" onClick={handleCloseModal}>
                                {t('complete')}
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
}