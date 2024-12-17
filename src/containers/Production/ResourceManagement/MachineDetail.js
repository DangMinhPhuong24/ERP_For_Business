import React, {useEffect, useState, useCallback,useRef} from "react"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import colors from "../../../constants/colors";
import Typography from "@mui/material/Typography";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import {Grid} from "@mui/material";
import {formatCurrency} from "../../../common/common";
import ActivityHistoryTable from "../../../components/Table/Production/ActivityHistoryTable/index";
import MaintenanceHistoryTable from "../../../components/Table/Production/MaintenanceHistory/index";
import titleTableActivityHistory from "../../../constants/titleTableActivityHistory";
import titleTableMaintenanceHistory from "../../../constants/titleTableMaintenanceHistory";
import {
    getDetailMachineAction,
    getListHistoryMachineMaintenanceAction, getListHistoryMachineOperationAction
} from "../../../redux/production/production.actions";
import {
    detailMachineState,
    listHistoryMachineMaintenanceState,
    listHistoryMachineMaintenanceTotalPagesState,
    listHistoryMachineOperationState,
    listHistoryMachineOperationTotalPagesState
} from "../../../redux/production/production.selectors";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";
import CustomDateRangePicker from "../../../components/DateTime/DateRangePicker";
import PaginationComponent from "../../../components/Paginate";
import format from "date-fns/format";
import {setCurrentPageListHistoryMachineMaintenance,setCurrentPageListHistoryMachineOperation} from "../../../redux/production/production.slice";
import subDays from "date-fns/subDays";
import '../../../resource/style/PrintStyle.css'

export default function MachineDetail () {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const machineId = new URLSearchParams(location.search).get('id');
    const detailMachine= useSelector(detailMachineState);
    const listHistoryMachineMaintenance= useSelector(listHistoryMachineMaintenanceState);
    const listHistoryMachineMaintenanceTotalPages= useSelector(listHistoryMachineMaintenanceTotalPagesState);
    const listHistoryMachineOperation= useSelector(listHistoryMachineOperationState);
    const listHistoryMachineOperationTotalPages= useSelector(listHistoryMachineOperationTotalPagesState);
    const [selectedRangeHistoryMachineOperation, setSelectedRangeHistoryMachineOperation] = useState([format(subDays(new Date(), 6), 'yyyy-MM-dd'), format(new Date(), 'yyyy-MM-dd')]);
    const [selectedRangeHistoryMachineMaintenance, setSelectedRangeHistoryMachineMaintenance] = useState([format(subDays(new Date(), 29), 'yyyy-MM-dd'), format(new Date(), 'yyyy-MM-dd')]);
    let componentRef = useRef();
    const [loadingHistoryMachineOperation, setLoadingHistoryMachineOperation] = useState(false);
    const [loadingHistoryMachineMaintenance, setLoadingHistoryMachineMaintenance] = useState(false);

    useEffect(() => {
        dispatch(getDetailMachineAction(machineId));
    }, []);

    useEffect(() => {
        dispatch(getListHistoryMachineOperationAction( {from_date: selectedRangeHistoryMachineOperation ? selectedRangeHistoryMachineOperation[0] : "",
            to_date: selectedRangeHistoryMachineOperation ? selectedRangeHistoryMachineOperation[1] : "",
            machine_id: machineId}));
    }, [selectedRangeHistoryMachineOperation]);

    useEffect(() => {
        dispatch(getListHistoryMachineMaintenanceAction({ from_date: selectedRangeHistoryMachineMaintenance ? selectedRangeHistoryMachineMaintenance[0] : "",
            to_date: selectedRangeHistoryMachineMaintenance ? selectedRangeHistoryMachineMaintenance[1] : "",
            machine_id: machineId}))
    }, [selectedRangeHistoryMachineMaintenance]);

    const handlePageChangeHistoryMachineMaintenance = (event, page) => {
        setLoadingHistoryMachineMaintenance(true);
        dispatch(setCurrentPageListHistoryMachineMaintenance(page));
        dispatch(getListHistoryMachineMaintenanceAction({ page: page  , from_date: selectedRangeHistoryMachineMaintenance ? selectedRangeHistoryMachineMaintenance[0] : "",
            to_date: selectedRangeHistoryMachineMaintenance ? selectedRangeHistoryMachineMaintenance[1] : "",
            machine_id: machineId
        })).then(() => {
            setLoadingHistoryMachineMaintenance(false);
        });
    }
    const handlePageChangeHistoryMachineOperation = (event, page) => {
        setLoadingHistoryMachineOperation(true);
        dispatch(setCurrentPageListHistoryMachineOperation(page));
        dispatch(getListHistoryMachineOperationAction({ page: page  ,from_date: selectedRangeHistoryMachineOperation ? selectedRangeHistoryMachineOperation[0] : "",
            to_date: selectedRangeHistoryMachineOperation ? selectedRangeHistoryMachineOperation[1] : "",
            machine_id: machineId,
        })).then(() => {
            setLoadingHistoryMachineOperation(false);
        });
    }

    const handleDateRangeChangeHistoryMachineOperation = (range) => {
        setSelectedRangeHistoryMachineOperation(range);
    };

    const handleDateRangeChangeHistoryMachineMaintenance = (range) => {
        setSelectedRangeHistoryMachineMaintenance(range);
    };

    return (
        <>
            <Toolbar sx={ { display: 'flex', justifyContent: 'space-between', p: '0 !important' } }>
                <Box sx={ { display: 'flex', alignItems:'center'} }>
                    <Button
                        sx={ { bgcolor: colors.whiteColor, color: colors.blackColor, marginRight: 2, p: '8px 20px' } }
                        onClick={ () => navigate(-1) }>
                        { t('back') }
                    </Button>
                    <Typography variant="h6" sx={{fontWeight:'bold'}}>
                        { t('resourceManagement') }
                    </Typography>
                </Box>
                <Box sx={ { display: 'flex', justifyContent: 'flex-end' } }>
                    <Button
                        sx={ {
                            bgcolor: colors.whiteColor,
                            color: colors.blackColor,
                            p:'8px 15px !important',
                            boxShadow: '0px 4px 4px 0px #00000040',
                        } }
                        // onClick={handleOpenCreateMachine}
                    >
                        { t('adjustCostsHoursOfOperation') }
                    </Button>
                </Box>
            </Toolbar>
            <Box component="form"
                 sx= {{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '30px', position: 'relative' }}>
                <Box
                    sx= {{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '8px',
                        background: colors.redColor,
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                    }}
                />
                <Box sx= {{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Typography variant="h6" gutterBottom className="customer-detail-title">
                        { t('machineDetails') }: <Typography variant="h6" component="span" sx= {{
                        display: 'inline-block',
                        marginRight: '5px'
                    }}>{detailMachine?.machine_name}</Typography>
                    </Typography>
                </Box>
                <Box className="root">
                    <Grid container>
                        <Box className="box">
                            <Typography className="title">{ t('status') }</Typography>
                            <Box className="value-wrapper">
                                <Typography className="text">{ detailMachine.machine_status?.machine_status_name}</Typography>
                            </Box>
                        </Box>
                        <Box className="box">
                            <Typography className="title">{ t('currentPerformance') }</Typography>
                            <Box className="value-wrapper">
                                <Typography className="text">{ detailMachine?.performance}</Typography>
                            </Box>
                        </Box>
                        <Box className="box">
                            <Typography className="title">{ t('workers') }</Typography>
                            <Box className="value-wrapper">
                                <Typography className="text">{ detailMachine.worker_arrange?.worker_arrange_name }</Typography>
                            </Box>
                        </Box>
                        <Box className="box">
                            <Typography className="title">{ t('actualOperatingHours') }</Typography>
                            <Box className="value-wrapper">
                                <Typography className="text">{ detailMachine.operation_time }</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop:'80px' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '10px',}}>
                        <Typography className="text-field-input" >{t('currentCommand')}</Typography>
                        <Typography className="text-field-input" >{t('workers')}</Typography>
                        <Typography className="text-field-input" >{t('subsequentMaintenance')}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '40px' }}>
                        <Typography className="text">{detailMachine.manufacture_order?.code ? detailMachine.manufacture_order.code : '\u00A0'}</Typography>
                        <Typography className="text">{detailMachine.user?.code ? detailMachine.user.code : '\u00A0'} - {detailMachine.user?.name ? detailMachine.user.name : '\u00A0'}</Typography>
                        <Typography className="text">{detailMachine?.next_maintenance_date? detailMachine.next_maintenance_date : '\u00A0'}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{mt:2,display: 'flex', gap: '20px' }}>
                <Box component="form"
                     sx= {{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '30px', position: 'relative', width:"506px",height: 'fit-content', }}>
                    <Box
                        sx= {{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '8px',
                            background: colors.redColor,
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px',
                        }}
                    />
                    <Box sx= {{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Typography className="text">{ t('machineInformation') }</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginTop:'30px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '10px',}}>
                            <Typography className="text-field-input" >{t('machineName')}</Typography>
                            <Typography className="text-field-input" >{t('nSX')}</Typography>
                            <Typography className="text-field-input" >{t('buyDate')}</Typography>
                            <Typography className="text-field-input" >{t('latestWarranty')}</Typography>
                            <Typography className="text-field-input" >{t('machineType')}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '40px' }}>
                            <Typography className="text">{detailMachine?.machine_name ? detailMachine.machine_name : '\u00A0'}</Typography>
                            <Typography className="text">{detailMachine?.manufacturer ? detailMachine.manufacturer : '\u00A0'}</Typography>
                            <Typography className="text">{detailMachine?.buy_date ? detailMachine.buy_date : '\u00A0'}</Typography>
                            <Typography className="text">{detailMachine?.maintenance_date ? detailMachine.maintenance_date : '\u00A0'}</Typography>
                            <Typography className="text">{detailMachine.machine_type?.machine_type_name ? detailMachine.machine_type.machine_type_name : '\u00A0'}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '40px' }}>
                            <Box ref={(el) => (componentRef = el)}>
                                <QRCode
                                    className="qr-code"
                                    style={{ height: "128px", maxWidth: "100%", width: "128px" }}
                                    value={detailMachine?.qr || ''}
                                />
                                <Box className="qr-scan-text qr-scan-text-print" >{ t('scanMe') }</Box>
                            </Box>
                            <ReactToPrint
                                trigger={() => <Button>{t("printQR")}</Button>}
                                content={() => componentRef}
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px',flex: 1, }}>
                    <Box component="form"
                         sx= {{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '30px', position: 'relative'}}>
                        <Box
                            sx= {{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '8px',
                                background: colors.redColor,
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                            }}
                        />
                        <Box sx= {{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Typography className="text">{ t('activityHistory') }</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:'10px', marginTop:'20px' }}>
                            <CustomDateRangePicker onChange={handleDateRangeChangeHistoryMachineOperation}  mode="last7Days" />
                            <PaginationComponent
                                totalPages={listHistoryMachineOperationTotalPages}
                                handlePageChange={handlePageChangeHistoryMachineOperation}
                            />
                        </Box>
                        <ActivityHistoryTable
                            titleTable={titleTableActivityHistory}
                            data={listHistoryMachineOperation}
                            loading={loadingHistoryMachineOperation}
                        />
                    </Box>
                    <Box component="form"
                         sx= {{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '30px', position: 'relative' }}>
                        <Box
                            sx= {{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '8px',
                                background: colors.redColor,
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                            }}
                        />
                        <Box sx= {{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <Typography className="text">{ t('maintenanceRepairHistory') }</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom:'10px', marginTop:'20px' }}>
                            <CustomDateRangePicker onChange={handleDateRangeChangeHistoryMachineMaintenance}  mode="last30Days" />
                            <PaginationComponent
                                totalPages={listHistoryMachineMaintenanceTotalPages}
                                handlePageChange={handlePageChangeHistoryMachineMaintenance}
                            />
                        </Box>
                        <MaintenanceHistoryTable
                            titleTable={titleTableMaintenanceHistory}
                            data={listHistoryMachineMaintenance}
                            loading={loadingHistoryMachineMaintenance}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}