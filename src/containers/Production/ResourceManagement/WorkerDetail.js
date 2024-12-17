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
import {formatCurrency, formatCurrencyRevenue} from "../../../common/common";
import {
    getDetailWorkerAction, getListAllMachineAction,
    getListWorkerAssignmentsAction,
    getListWorkerWorkHistoryAction,
} from "../../../redux/production/production.actions";
import {
    detailWorkerState,
    listAllMachineState,
    listWorkerAssignmentsState,
    listWorkerWorkHistoryState,
    listWorkerWorkHistoryTotalPagesState,
} from "../../../redux/production/production.selectors";

import CustomDateRangePicker from "../../../components/DateTime/DateRangePicker";
import PaginationComponent from "../../../components/Paginate";
import format from "date-fns/format";
import {setCurrentPageListHistoryMachineMaintenance,setCurrentPageListHistoryMachineOperation} from "../../../redux/production/production.slice";
import subDays from "date-fns/subDays";
import '../../../resource/style/PrintStyle.css'
import CalendarResourceManagement from "../../../components/DateTime/CalendarResourceManagement";
import ArrangeWorkerModal from "../../../components/Modal/Production/ResourceManagement/Worker/ArrangeWorker";
import titleTableWorkHistory from "../../../constants/titleTableWorkHistory";
import WorkHistoryTable from "../../../components/Table/Production/WorkHistoryTable";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function WorkerDetail () {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const workerId = new URLSearchParams(location.search).get('id');
    const detailWorker= useSelector(detailWorkerState);
    const listAllMachine= useSelector(listAllMachineState);
    const listWorkerAssignments= useSelector(listWorkerAssignmentsState);
    const listWorkerWorkHistory= useSelector(listWorkerWorkHistoryState);
    const listWorkerWorkHistoryTotalPages= useSelector(listWorkerWorkHistoryTotalPagesState);
    const [selectedRangeWorkerWorkHistory, setSelectedRangeWorkerWorkHistory] = useState([format(subDays(new Date(), 6), 'yyyy-MM-dd'), format(new Date(), 'yyyy-MM-dd')]);
    const [isOpenModalArrangeWorker, setIsOpenModalArrangeWorker] = useState(false);
    const [workerPlacementTime, setWorkerPlacementTime] = useState(null);
    const [loadingWorkerWorkHistory, setLoadingWorkerWorkHistory] = useState(false);
    const currentDate = format(new Date(), 'yyyy-MM');

    useEffect(() => {
        dispatch(getDetailWorkerAction(workerId));
        dispatch(getListAllMachineAction());
        dispatch(getListWorkerAssignmentsAction({worker_id:workerId , date:currentDate }))
    }, []);

    useEffect(() => {
        dispatch(getListWorkerWorkHistoryAction( {from_date: selectedRangeWorkerWorkHistory ? selectedRangeWorkerWorkHistory[0] : "",
            to_date: selectedRangeWorkerWorkHistory ? selectedRangeWorkerWorkHistory[1] : "",
            user_id: workerId}));
    }, [selectedRangeWorkerWorkHistory]);

    const handlePageChangeWorkerWorkHistory = (event, page) => {
        setLoadingWorkerWorkHistory(true);
        dispatch(setCurrentPageListHistoryMachineOperation(page));
        dispatch(getListWorkerWorkHistoryAction({ page: page  ,from_date: selectedRangeWorkerWorkHistory ? selectedRangeWorkerWorkHistory[0] : "",
            to_date: selectedRangeWorkerWorkHistory ? selectedRangeWorkerWorkHistory[1] : "",
            user_id: workerId,
        })).then(() => {
            setLoadingWorkerWorkHistory(false);
        });
    }

    const handleDateRangeChangeWorkerWorkHistory = (range) => {
        setSelectedRangeWorkerWorkHistory(range);
    };

    const handleArrangeWorkers = useCallback((params) => {
            setIsOpenModalArrangeWorker(true);
        }, []);

    const handleCloseArrangeWorkers = () =>{
        setIsOpenModalArrangeWorker(false);
    }
    const handleDate = (range) => {
        setWorkerPlacementTime(range);
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
                        { t('workerDetail') }: <Typography variant="h6" component="span" sx= {{
                        display: 'inline-block',
                        marginRight: '5px'
                    }}>{detailWorker?`${detailWorker.code} - ${detailWorker.name}` : ''}</Typography>
                    </Typography>
                </Box>
                <Box className="root-order" p={5}>
                    <Grid container columnSpacing={1} justifyContent="center" alignContent="stretch">
                        <Grid item >
                            <Grid className="box-order-manage-production" sx={{bgcolor:colors.whiteColor, width:'214px'}}>
                                <Grid>
                                    <Typography className="title-statistical-production">{ t('status') }</Typography>
                                </Grid>
                                <Grid>
                                    <Typography className="command-creation-page-title" textAlign='center'>{ detailWorker.worker_status_name}</Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item >
                            <Grid className="box-order-manage-production" sx={{bgcolor:colors.whiteColor, width:'214px'}}>
                                <Grid>
                                    <Typography className="title-statistical-production">{ t('currentMachine') }</Typography>
                                </Grid>
                                <Grid>
                                    <Typography className="command-creation-page-title" textAlign='center'>{ detailWorker.machine_name}</Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item >
                            <Grid className="box-order-manage-production" sx={{bgcolor:colors.whiteColor, width:'214px'}}>
                                <Grid>
                                    <Typography className="title-statistical-production">{ t('numberOfWorkingHoursActualOverPlan') }</Typography>
                                </Grid>
                                <Grid>
                                    <Typography className="command-creation-page-title" textAlign='center'>{ `${detailWorker.operation_time} / ${detailWorker.plan_time}`}</Typography>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item >
                            <Grid className="box-order-manage-production" sx={{bgcolor:colors.whiteColor, width:'214px'}}>
                                <Grid>
                                    <Typography className="title-statistical-production">{ t('costPerHourOfWork') }</Typography>
                                </Grid>
                                <Grid>
                                    <Typography className="command-creation-page-title" textAlign='center'>{ formatCurrencyRevenue(detailWorker.price) } VND</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '10px',}}>
                        <Typography className="text-field-input" >{t('workerCode')}</Typography>
                        <Typography className="text-field-input" >{t('worker')}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '40px' }}>
                        <Typography className="text">{detailWorker.code ? detailWorker.code : '\u00A0'}</Typography>
                        <Typography className="text">{detailWorker.name ? detailWorker.name : '\u00A0'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '120px' }}>
                        <Typography className="text-field-input" >{t('yearsExperience')}</Typography>
                        <Typography className="text-field-input" >{t('joiningDate')}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '40px' }}>
                        <Typography className="text">{detailWorker.years_experience ? detailWorker.years_experience : '\u00A0'}</Typography>
                        <Typography className="text">{detailWorker.start_working_date ? detailWorker.start_working_date : '\u00A0'}</Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{mt:2,display: 'flex', gap: '20px' }}>
                <Box component="form"
                     sx= {{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '30px', position: 'relative', width:"506px",height: '450px', }}>
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
                        <Typography className="command-creation-page-title">{ t('workScheduleAndLeaveWithPermission') }</Typography>
                    </Box>
                    <Box sx={{marginTop:'5px'}}>
                        <CalendarResourceManagement
                            handleArrangeWorkers={handleArrangeWorkers}
                            onChangeDate={handleDate}
                            listWorkerAssignments={listWorkerAssignments}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'row',justifyContent: 'center',marginTop:'10px'}}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '10px',}}>
                                    <Typography className="text-12px" sx={{color: colors.redColor}}>P</Typography>
                                    <Typography className="text-12px" sx={{color: colors.oceanblueColor}}>S1</Typography>
                                    <Typography className="text-12px" sx={{color: colors.greenColor}}>C2</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <Typography className="radio-text">{t('onLeave')}</Typography>
                                    <Typography className="radio-text" sx={{marginTop:'5px'}}>{t('morningShift1')}</Typography>
                                    <Typography className="radio-text" sx={{marginTop:'3px'}}>{t('afternoonShift1')}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', marginLeft:'30px'}}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', marginRight: '10px',}}>
                                    <Typography className="text-12px" style={{ visibility: 'hidden' }}>&nbsp;</Typography>
                                    <Typography className="text-12px" sx={{color: colors.oceanblueColor}}>S2</Typography>
                                    <Typography className="text-12px" sx={{color: colors.greenColor}}>C2</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}>
                                    <Typography className="radio-text" style={{ visibility: 'hidden' }}>&nbsp;</Typography>
                                    <Typography className="radio-text" sx={{marginTop:'5px'}}>{t('morningShift2')}</Typography>
                                    <Typography className="radio-text" sx={{marginTop:'3px'}}>{t('afternoonShift2')}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '20px', flex: 1,}}>
                    <Box component="form"
                         sx={{
                             bgcolor: colors.lilywhiteColor,
                             borderRadius: '10px',
                             padding: '30px',
                             position: 'relative',
                             height:'450px'
                         }}>
                        <Box
                            sx={{
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
                            <Typography className="command-creation-page-title">{ t('workHistory') }</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap:'0 8px', alignItems: 'center', m:'8px 0' }}>
                            <Box sx={{width:'300px'}}>
                                <CustomDateRangePicker onChange={handleDateRangeChangeWorkerWorkHistory}  mode="last7Days" />
                            </Box>
                            <PaginationComponent
                                totalPages={listWorkerWorkHistoryTotalPages}
                                handlePageChange={handlePageChangeWorkerWorkHistory}
                            />
                        </Box>
                        <WorkHistoryTable
                            titleTable={titleTableWorkHistory}
                            data={listWorkerWorkHistory}
                            loading={loadingWorkerWorkHistory}
                        />
                        <ArrangeWorkerModal
                            open={isOpenModalArrangeWorker}
                            handleClose={handleCloseArrangeWorkers}
                            nameTitle={t("arrangeWorkers")}
                            listAllMachine={listAllMachine}
                            workerPlacementTime={workerPlacementTime}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}