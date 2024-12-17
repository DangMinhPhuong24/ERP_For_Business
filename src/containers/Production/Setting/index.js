import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import colors from "../../../constants/colors";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import {
    errorsMessageUpdateSettingState,
    listSettingForManufactureManagementState,
    updateSettingSuccessState
} from "../../../redux/production/production.selectors";
import {
    getAllSettingForManufactureManagementAction,
    updateSettingForManufactureManagementAction
} from "../../../redux/production/production.actions";
import Toolbar from "@mui/material/Toolbar";

const redStyleBox = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '8px',
    background: 'red',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
};
export default function SettingPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listSettingData = useSelector(listSettingForManufactureManagementState);
    const [editIndexes, setEditIndexes] = useState({});
    const [updateIndex, setUpdateIndex] = useState(null);
    const [manufactureProductivityBelowDay, setManufactureProductivityBelowDay] = useState(0);
    const [manufactureProductivityExceedDay, setManufactureProductivityExceedDay] = useState(0);
    const [transportProductivityBelowDay, setTransportProductivityBelowDay] = useState(0);
    const [transportProductivityExceedDay, setTransportProductivityExceedDay] = useState(0);
    const [quantityOrderReturnWeek, setQuantityOrderReturnWeek] = useState(0);
    const [quantityOrderReturnMonth, setQuantityOrderReturnMonth] = useState(0);
    const [quantityClaimWeek, setQuantityClaimWeek] = useState(0);
    const [quantityClaimMonth, setQuantityClaimMonth] = useState(0);
    const [timeWorkerLeave, setTimeWorkerLeave] = useState(0);
    const [timeMachineMaintenance, setTimeMachineMaintenance] = useState(0);
    const [minutesManufactureOrderBehindSchedule, setMinutesManufactureOrderBehindSchedule] = useState(0);
    const [minutesDeliveryBehindSchedule, setMinutesDeliveryBehindSchedule] = useState(0);
    const [minutesChangeProcess, setMinutesChangeProcess] = useState(0);
    const [inventoryProcessSawCut, setInventoryProcessSawCut] = useState(0);
    const [inventoryProcessCutTrim, setInventoryProcessCutTrim] = useState(0);

    useEffect(() => {
        dispatch(getAllSettingForManufactureManagementAction());
    }, []);
    const handleEdit = (boxIndex, rowIndex) => {
        if (updateIndex !== null && updateIndex !== boxIndex) {
            handleCancel(updateIndex);
        }
        setUpdateIndex(boxIndex);
        setManufactureProductivityBelowDay(listSettingData.manufacture_productivity_below_day);
        setManufactureProductivityExceedDay(listSettingData.manufacture_productivity_exceed_day);
        setTransportProductivityBelowDay(listSettingData.transport_productivity_below_day);
        setTransportProductivityExceedDay(listSettingData.transport_productivity_exceed_day);
        setQuantityOrderReturnWeek(listSettingData.quantity_order_return_week);
        setQuantityOrderReturnMonth(listSettingData.quantity_order_return_month);
        setQuantityClaimWeek(listSettingData.quantity_claim_week);
        setQuantityClaimMonth(listSettingData.quantity_claim_month);
        setTimeWorkerLeave(listSettingData.time_worker_leave);
        setTimeMachineMaintenance(listSettingData.time_machine_maintenance);
        setMinutesManufactureOrderBehindSchedule(listSettingData.minutes_manufacture_order_behind_schedule);
        setMinutesDeliveryBehindSchedule(listSettingData.minutes_delivery_behind_schedule);
        setMinutesChangeProcess(listSettingData.minutes_change_process);
        setInventoryProcessSawCut(listSettingData.inventory_process_saw_cut);
        setInventoryProcessCutTrim(listSettingData.inventory_process_cut_trim);
        setEditIndexes(prevState => ({
            ...prevState,
            [boxIndex]: rowIndex
        }));
    }
    const getEditedValue = (boxIndex, rowIndex) => {
        switch (boxIndex) {
            case 0:
                switch (rowIndex) {
                    case 0:
                        return manufactureProductivityBelowDay;
                    case 1:
                        return manufactureProductivityExceedDay;
                    case 2:
                        return transportProductivityBelowDay;
                    case 3:
                        return transportProductivityExceedDay;
                    default:
                        return '';
                }
            case 1:
                switch (rowIndex) {
                    case 0:
                        return quantityOrderReturnWeek;
                    case 1:
                        return quantityOrderReturnMonth;
                    case 2:
                        return quantityClaimWeek;
                    case 3:
                        return quantityClaimMonth;
                    default:
                        return '';
                }
            case 2:
                switch (rowIndex) {
                    case 0:
                        return timeWorkerLeave;
                    case 1:
                        return timeMachineMaintenance;
                    default:
                        return '';
                }
            case  3:
                switch (rowIndex){
                    case 0:
                        return minutesManufactureOrderBehindSchedule;
                    case 1:
                        return minutesDeliveryBehindSchedule;
                    case 2:
                        return minutesChangeProcess;
                    default:
                        return '';
                }
            case 4:
                break;
            case 5:
                switch (rowIndex){
                    case 0:
                        return inventoryProcessSawCut;
                    case 1:
                        return inventoryProcessCutTrim;
                    default:
                        return '';
                }
            default:
                return '';
        }
    };
    const handleCancel = (boxIndex) => {
        setEditIndexes(prevState => ({
            ...prevState,
            [boxIndex]: null
        }));
    }
    const refreshData = useCallback((params) => {
        dispatch(getAllSettingForManufactureManagementAction(params));
    },[])
    const updateData = useCallback((params)=>{
        dispatch(updateSettingForManufactureManagementAction(params));
    },[])

    const handleSave = (boxIndex, rowIndex) => {
        if (!boxData[boxIndex] || !boxData[boxIndex].rows[rowIndex]) {
            console.error("Invalid box index or row index");
            return;
        }
        const data = {
            manufacture_productivity_below_day:manufactureProductivityBelowDay,
            manufacture_productivity_exceed_day:manufactureProductivityExceedDay,
            transport_productivity_below_day: transportProductivityBelowDay,
            transport_productivity_exceed_day: transportProductivityExceedDay,
            quantity_order_return_week: quantityOrderReturnWeek,
            quantity_order_return_month: quantityOrderReturnMonth,
            quantity_claim_week: quantityClaimWeek,
            quantity_claim_month: quantityClaimMonth,
            time_worker_leave: timeWorkerLeave,
            time_machine_maintenance: timeMachineMaintenance,
            minutes_manufacture_order_behind_schedule: minutesManufactureOrderBehindSchedule,
            minutes_delivery_behind_schedule: minutesDeliveryBehindSchedule,
            minutes_change_process: minutesChangeProcess,
            inventory_process_saw_cut: inventoryProcessSawCut,
            inventory_process_cut_trim: inventoryProcessCutTrim
        }
        updateData(data);
        refreshData(data);
        handleCancel(boxIndex);
        refreshData(data);

    }
    const handleChangeValue = (event, boxIndex, rowIndex) => {
        const newValue = event.target.value;
        switch (boxIndex) {
            case 0:
                switch (rowIndex) {
                    case 0:
                        setManufactureProductivityBelowDay(newValue);
                        break;
                    case 1:
                        setManufactureProductivityExceedDay(newValue);
                        break;
                    case 2:
                        setTransportProductivityBelowDay(newValue);
                        break;
                    case 3:
                        setTransportProductivityExceedDay(newValue);
                        break;
                    default:
                        return '';
                }
                break;
            case 1:
                switch (rowIndex) {
                    case 0:
                        setQuantityOrderReturnWeek(newValue);
                        break;
                    case 1:
                        setQuantityOrderReturnMonth(newValue);
                        break;
                    case 2:
                        setQuantityClaimWeek(newValue);
                        break;
                    case 3:
                        setQuantityClaimMonth(newValue);
                        break;
                    default:
                        return '';
                }
                break;
            case 2:
                switch (rowIndex) {
                    case 0:
                        setTimeWorkerLeave(newValue);
                        break;
                    case 1:
                        setTimeMachineMaintenance(newValue);
                        break;
                    default:
                        return '';
                }
                break;
            case 3:
                switch (rowIndex) {
                    case 0:
                        setMinutesManufactureOrderBehindSchedule(newValue);
                        break;
                    case 1:
                        setMinutesDeliveryBehindSchedule(newValue);
                        break;
                    case 2:
                        setMinutesChangeProcess(newValue);
                        break;
                    default:
                        return '';
                }
                break;
            case 4:
                break;
            case 5:
                switch (rowIndex) {
                    case 0:
                        setInventoryProcessSawCut(newValue);
                        break;
                    case 1:
                        setInventoryProcessCutTrim(newValue);
                        break;
                    default:
                        return '';
                }
                break;
            default:
                return '';
        }
    };

    const renderEditButton = (boxIndex, rowIndex) => {
        if (editIndexes[boxIndex] === rowIndex) {
            return (
                <>
                    <Button className="setting-button-cancel" onClick={() => handleCancel(boxIndex)}>
                        {t("cancel")}
                    </Button>
                    <Button className="setting-button-save" onClick={() => handleSave(boxIndex, rowIndex)}>
                        {t("save")}
                    </Button>
                </>
            );
        } else {
            return (
                <Button className="setting-button" onClick={() => handleEdit(boxIndex, rowIndex)}>
                    {t("editAction")}
                </Button>
            );
        }
    };

    const boxData = [
        {
            icon: <OfflineBoltIcon sx={{color: colors.oceanblueColor, fontSize: 30}}/>,
            title: t("productivityWarning"),
            subTitle: t("sendWarningToStakeholders"),
            rows: [
                {
                    label: t("productionCapacityForTheDayBelow"),
                    data: listSettingData.manufacture_productivity_below_day
                },
                {
                    label: t("productionCapacityForTheDayExceed"),
                    data: listSettingData.manufacture_productivity_exceed_day
                },
                {
                    label: t("transportCapacityForTheDayBelow"),
                    data: listSettingData.transport_productivity_below_day
                },
                {
                    label: t("transportCapacityForTheDayExceed"),
                    data: listSettingData.transport_productivity_exceed_day
                },
            ]
        },
        {
            icon: <VerifiedUserIcon sx={{color: colors.greenColor, fontSize: 30}}/>,
            title: t("qualityWarning"),
            subTitle: t("sendWarningToStakeholders"),
            rows: [
                {
                    label: t("quantityOrderReturnWeek"),
                    data: listSettingData.quantity_order_return_week
                },
                {
                    label: t("quantityOrderReturnMonth"),
                    data: listSettingData.quantity_order_return_month
                },
                {
                    label: t("quantityClaimWeek"),
                    data: listSettingData.quantity_claim_week
                },
                {
                    label: t("quantityClaimMonth"),
                    data: listSettingData.quantity_claim_month
                },
            ]
        },
        {
            icon: <Diversity3Icon sx={{color: colors.royalblueColor, fontSize: 30}}/>,
            title: t("resourceWarning"),
            subTitle: t("sendWarningToStakeholders"),
            rows: [
                {
                    label: t("timeWorkerLeave"),
                    data: listSettingData.time_worker_leave
                },
                {
                    label: t("timeMachineMaintenance"),
                    data: listSettingData.time_machine_maintenance
                },
            ]
        },
        {
            icon: <AccessTimeFilledIcon sx={{color: colors.brightyellowColor, fontSize: 30}}/>,
            title: t("timeWarning"),
            subTitle: t("sendWarningToStakeholders"),
            rows: [
                {
                    label: t("minutesManufactureOrderBehindSchedule"),
                    data: listSettingData.minutes_manufacture_order_behind_schedule
                },
                {
                    label: t("minutesDeliveryBehindSchedule"),
                    data: listSettingData.minutes_delivery_behind_schedule
                },
                {
                    label: t("minutesChangeProcess"),
                    data: listSettingData.minutes_change_process
                },
            ]
        },
        {
            icon: <WarehouseIcon sx={{color: colors.brightorangeColor, fontSize: 30}}/>,
            title: t("materialInventoryWarning"),
            subTitle: t("sendWarningToStakeholders"),
            rows: [

            ]
        },
        {
            icon: <NoteAltIcon sx={{ color: colors.violetblueColor, fontSize: 30 }} />,
            title: t("stageInventoryWarning"),
            subTitle: t("sendWarningWhenProcessInventoryReachesLimit"),
            rows: [
                {
                    label: t("inventoryProcessSawCut"),
                    data: listSettingData.inventory_process_saw_cut ? `> ${listSettingData.inventory_process_saw_cut} ${t("minutes")}` : ''
                },
                {
                    label: t("inventoryProcessCutTrim"),
                    data: listSettingData.inventory_process_cut_trim ? `> ${listSettingData.inventory_process_cut_trim} ${t("minutes")}` : ''
                }
            ]
        }
    ];

    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', p: '0 !important'}}>
                <Box sx={{display: 'flex', marginBottom: 1, alignItems: 'center'}}>
                    <Button
                        sx={{
                            bgcolor: colors.whiteColor,
                            color: colors.blackColor,
                            marginRight: 2,
                            p: "8px 20px"
                        }}
                        onClick={() => navigate(-1)}
                    >
                        {t("back")}
                    </Button>
                    <Typography variant="h6" sx={{fontWeight: 'bold', mr: 2}} className="textConFig">
                        {t("setting")}
                    </Typography>
                </Box>
            </Toolbar>
            <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 8px', alignItems: 'stretch'}}>
                {boxData.map((box, index) => (
                    <Box key={index} sx={{
                        bgcolor: colors.lilywhiteColor,
                        borderRadius: '10px',
                        position: 'relative',
                        marginBottom: '16px',
                        height:'230px'
                    }}>
                        <Box sx={redStyleBox}/>
                        <Box p={2} pt={2}>
                            <Grid container columnSpacing={1}>
                                <Grid item>
                                    {box.icon}
                                </Grid>
                                <Grid item>
                                    <Typography className="command-creation-page-title">
                                        {box.title}
                                    </Typography>
                                    <Typography sx={{
                                        fontSize: '10px',
                                        textDecoration: 'underline',
                                        fontStyle: 'italic',
                                        wordWrap: 'break-word'
                                    }}>
                                        {box.subTitle}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Box p={2} sx={{
                            display: 'grid',
                            gridTemplateColumns: '1.25fr 0.35fr 0.4fr',
                            gap: '12px 8px',
                            alignItems: 'center'
                        }}>
                            {box.rows.map((row, rowIndex) => (
                                <React.Fragment key={rowIndex}>
                                    <Box>
                                        <Typography className="setting-text">
                                            {row.label}:
                                        </Typography>
                                    </Box>
                                    <Box>
                                        {editIndexes[index] === rowIndex ? (
                                            <TextField size='small'
                                                       value={editIndexes[index] === rowIndex ? getEditedValue(index, rowIndex) : row.data}
                                                       inputProps={{
                                                           sx:{
                                                               width:'28px',
                                                               lineHeight:'16.41px',
                                                               height:'16.41px',
                                                               p:'4px',
                                                               fontSize:'14px',
                                                               textAlign:'center',
                                                           }
                                                       }}
                                                       onChange={(event) => handleChangeValue(event, index, rowIndex)}/>
                                        ) : (
                                            <Typography className="setting-text" fontWeight="bold">
                                                {row.data}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Box>{renderEditButton(index, rowIndex)}</Box>
                                </React.Fragment>
                            ))}
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}
