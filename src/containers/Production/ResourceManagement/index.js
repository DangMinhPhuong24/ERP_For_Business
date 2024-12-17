import React, {useEffect, useState, useCallback, useRef} from "react"
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import {useTranslation} from "react-i18next";
import TabContext from "@mui/lab/TabContext";
import Button from "@mui/material/Button";
import colors from "../../../constants/colors";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import {useNavigate} from "react-router-dom";
import SearchFormMachines from "../../../components/SearchForm/MachineryInResourceManagement";
import DownloadExcel from "../../../components/Buttons/DownloadExcel";
import PaginationComponent from "../../../components/Paginate";
import MachineryTable from "../../../components/Table/Production/MachineryTable";
import titleTableMachines from "../../../constants/titleTableMachines";
import {useDispatch, useSelector} from "react-redux";
import {
    createMachineAction,
    deleteDataMachineAction,
    exportDataMachinesToExcelAction, exportDataWorkerToExcelAction,
    getDetailMachineAction,
    getListAllMachineTypeAction,
    getListAllWorkerArrangeAction,
    getListMachinesAction,
    getListWorkerAction,
    removeMessageErrorAction,
    updateMachineAction,
    updateStatusDataExportFlagAction
} from "../../../redux/production/production.actions";
import {
    createMachineSuccessFlagState,
    dataMachineExportState, dataWorkerExportState,
    deleteMachineSuccessFlagState, detailMachineState,
    errorsMessageCreateMachineState,
    errorsMessageDeleteMachineState, errorsMessageUpdateMachineState,
    getDataExportFlagState,
    listAllMachineTypeState,
    listAllWorkerArrangeState,
    listMachinesState,
    listMachinesTotalPagesState, listWorkerState, listWorkersTotalPagesState, updateMachineSuccessFlagState
} from "../../../redux/production/production.selectors";
import {setCurrentPageListMachines, setCurrentPageListWorkers} from "../../../redux/production/production.slice";
import headerCsvFileExportMachines from "../../../constants/headerCsvFileExportMachines";
import MachinesModal from "../../../components/Modal/Production/ResourceManagement/Machines";
import SearchFormWorker from "../../../components/SearchForm/WorkerInResourceManagement";
import titleTableWorker from "../../../constants/titleTableWorker";
import WorkerTable from "../../../components/Table/Production/WorkerTable";
import headerCsvFileExportWorkers from "../../../constants/headerCsvFileExportWorkers";
import QRCode from "react-qr-code";
import ReactToPrint from "react-to-print";

export default function ResourceManagementPage () {
    const { t } = useTranslation();
    const [ valueTabs, setValueTabs ] = useState('1');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const listMachines = useSelector(listMachinesState);
    const listMachinesTotalPages = useSelector(listMachinesTotalPagesState);
    const listAllMachineType = useSelector(listAllMachineTypeState);
    const listAllWorkerArrange = useSelector(listAllWorkerArrangeState);
    const [searchMachinesParams, setSearchMachinesParams] = useState(null);
    const dataMachineExport = useSelector(dataMachineExportState);
    const getDataExportFlag = useSelector(getDataExportFlagState);
    const [ fileName , setFileName] = useState("");
    const [isOpenCreateMachineModal, setIsOpenCreateMachineModal] = useState(false);
    const createMachineSuccessFlag = useSelector(createMachineSuccessFlagState);
    const errorsMessageCreateMachine = useSelector(errorsMessageCreateMachineState);
    const deleteMachineSuccessFlag = useSelector(deleteMachineSuccessFlagState);
    const errorsMessageDeleteMachine = useSelector(errorsMessageDeleteMachineState);
    const detailMachine= useSelector(detailMachineState);
    const [isOpenUpdateMachineModal, setIsOpenUpdateMachineModal] = useState(false);
    const updateMachineSuccessFlag = useSelector(updateMachineSuccessFlagState);
    const errorsMessageUpdateMachine = useSelector(errorsMessageUpdateMachineState);
    const [loading, setLoading] = useState(false);
    const listWorker = useSelector(listWorkerState);
    const listWorkersTotalPages = useSelector(listWorkersTotalPagesState);
    const [searchWorkersParams, setSearchWorkersParams] = useState(null);
    const dataWorkerExport = useSelector(dataWorkerExportState);
    const [machinesCurrentPage, setMachinesCurrentPage] = useState(1);
    const [workersCurrentPage, setWorkersCurrentPage] = useState(1);

    useEffect(() => {
        const savedMachinesState = localStorage.getItem('machinesState');
        const savedWorkersState = localStorage.getItem('workersState');
        if (savedMachinesState) {
            setLoading(true);
            const restoredState = JSON.parse(savedMachinesState);
            setValueTabs(restoredState.valueTabs);
            dispatch(getListMachinesAction({ ...restoredState.searchMachinesParams })).then(() => {
                setLoading(false);
            });
            dispatch(getListAllMachineTypeAction());
            dispatch(getListAllWorkerArrangeAction());
        }else if(savedWorkersState) {
            setLoading(true);
            const restoredState = JSON.parse(savedWorkersState);
            setValueTabs(restoredState.valueTabs);
            dispatch(getListWorkerAction({ ...restoredState.searchWorkersParams })).then(() => {
                setLoading(false);
            });
            dispatch(getListAllMachineTypeAction());
            dispatch(getListAllWorkerArrangeAction());
        }else {
            dispatch( getListMachinesAction() );
            dispatch(getListWorkerAction());
            dispatch(getListAllMachineTypeAction());
            dispatch(getListAllWorkerArrangeAction());
        }
    }, []);

    useEffect(() => {
        if (createMachineSuccessFlag) {
            dispatch(getListMachinesAction());
            setIsOpenCreateMachineModal(false);
        }
    }, [createMachineSuccessFlag]);

    useEffect(() => {
        if (updateMachineSuccessFlag) {
            dispatch(getListMachinesAction());
            setIsOpenUpdateMachineModal(false);
        }
    }, [updateMachineSuccessFlag]);

    useEffect(() => {
        if (deleteMachineSuccessFlag) {
            dispatch(getListMachinesAction());
        }
    }, [deleteMachineSuccessFlag]);

    const handleChangeTabs = (event, newValueTabs) => {
        setValueTabs(newValueTabs);
    };

    const handleMachinesPageChange = (event, page) => {
        setMachinesCurrentPage(page);
        setLoading(true);
        dispatch(setCurrentPageListMachines(page));
        if (searchMachinesParams) {
            dispatch(getListMachinesAction({ ...searchMachinesParams , page: page })).then(() => {
                setLoading(false);
            });
        } else {
            dispatch(getListMachinesAction({ page})).then(() => {
                setLoading(false);
            });
        }
    };

    const handleWorkersPageChange = (event, page) => {
        setLoading(true);
        dispatch(setCurrentPageListWorkers(page));
        setWorkersCurrentPage(page);
        if (searchWorkersParams) {
            dispatch(getListWorkerAction({ ...searchWorkersParams , page: page })).then(() => {
                setLoading(false);
            });
        } else {
            dispatch(getListWorkerAction({ page})).then(() => {
                setLoading(false);
            });
        }
    };
    const handleSearchMachines = (params) => {
        setLoading(true);
        setSearchMachinesParams( params );
        dispatch( getListMachinesAction( params )).then(() => {
            setLoading(false);
        });
    };

    const onClearMachines = useCallback( () => {
        setSearchMachinesParams(null);
        dispatch( getListMachinesAction() );
    },[] );

    const handleSearchWorkers = (params) => {
        setLoading(true);
        setSearchWorkersParams( params );
        dispatch( getListWorkerAction( params ) );
    };

    const onClearWorkers = useCallback( () => {
        setSearchWorkersParams(null);
        dispatch( getListWorkerAction()).then(() => {
            setLoading(false);
        });
    },[] );

    const handleExportMachinesExcel = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const currentDay = ('0' + currentDate.getDate()).slice(-2);
        const currentHour = ('0' + currentDate.getHours()).slice(-2);
        const currentMinute = ('0' + currentDate.getMinutes()).slice(-2);
        const dateString = `${currentYear}${currentMonth}${currentDay}${currentHour}${currentMinute}_`;
        const fileName = `${dateString}${t('machineryData')}`;
        const fileNameWithExtension = `${fileName}.xlsx`;
        setFileName(fileNameWithExtension);
        dispatch( exportDataMachinesToExcelAction( searchMachinesParams ) );

    };
    const handleExportWorkersExcel = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const currentDay = ('0' + currentDate.getDate()).slice(-2);
        const currentHour = ('0' + currentDate.getHours()).slice(-2);
        const currentMinute = ('0' + currentDate.getMinutes()).slice(-2);
        const dateString = `${currentYear}${currentMonth}${currentDay}${currentHour}${currentMinute}_`;
        const fileName = `${dateString}${t('workerData')}`;
        const fileNameWithExtension = `${fileName}.xlsx`;
        setFileName(fileNameWithExtension);
        dispatch( exportDataWorkerToExcelAction( searchWorkersParams ) );
    };

    const handleOpenCreateMachine = () =>{
        setIsOpenCreateMachineModal(true);
    }

    const handleCloseCreateMachine = () =>{
        setIsOpenCreateMachineModal(false);
    }

    const handleCreateMachine = useCallback((value) => {
        dispatch(createMachineAction(value));
    }, []);

    const handlerDelete = useCallback((value) => {
        dispatch(deleteDataMachineAction(value));
    }, []);

    const removeMessageError = useCallback(() => {
        dispatch(removeMessageErrorAction());
    }, []);

    const handlerDetailMachine = useCallback((ID) => {
        dispatch(getDetailMachineAction(ID));
        setIsOpenUpdateMachineModal(true);
    }, []);

    const handlerPrint = useCallback((ID) => {
        dispatch(getDetailMachineAction(ID));
    }, []);

    const handleCloseUpdateMachine = () =>{
        setIsOpenUpdateMachineModal(false);
    }

    const updateFlagCallBack = () => {
        dispatch( updateStatusDataExportFlagAction( searchMachinesParams ) );
    };

    const handlerUpdateMechine = useCallback((value) => {
        dispatch(updateMachineAction(value));
    }, []);

    const handleOpenViewMachine = (ID) => {
        localStorage.removeItem('workersState');
        localStorage.setItem('machinesState', JSON.stringify({
            valueTabs,
            searchMachinesParams,
            machinesCurrentPage,
        }));
        navigate(`/production/resource-management/machine-detail?id=${ID}`);
    };

    const handleOpenViewWorker = (ID) => {
        localStorage.removeItem('machinesState');
        localStorage.setItem('workersState', JSON.stringify({
            valueTabs,
            searchWorkersParams,
            workersCurrentPage
        }));
        navigate(`/production/resource-management/worker-detail?id=${ ID }`);
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
                {valueTabs === '1' && (
                    <Box sx={ { display: 'flex', justifyContent: 'flex-end' } }>
                        <Button
                            sx={ {
                                bgcolor: colors.whiteColor,
                                color: colors.blackColor,
                                p:'8px 15px !important',
                                boxShadow: '0px 4px 4px 0px #00000040',
                            } }
                            onClick={handleOpenCreateMachine}
                        >
                            { t('add') }
                        </Button>
                    </Box>
                )}
                <MachinesModal
                    open={isOpenCreateMachineModal}
                    handleClose={handleCloseCreateMachine}
                    nameTitle={t("moreMachines")}
                    listAllMachineType={listAllMachineType}
                    handleMachines={handleCreateMachine}
                    errorsMessage={errorsMessageCreateMachine}
                    closeModalAction={removeMessageError}
                />
            </Toolbar>
            <TabContext value={ valueTabs }>
                <Box
                    sx= {{
                        width: '100%',
                        borderBottom: 1,
                        borderColor: 'divider',

                    }}
                >
                    <TabList
                        onChange={ handleChangeTabs }
                        sx= {{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Tab label={ t('machines') } value="1"/>
                        <Tab label={ t('worker') } value="2"/>
                    </TabList>
                </Box>
                <TabPanel sx= {{ padding: '0' }} value="1">
                    <SearchFormMachines
                        listAllMachineType={listAllMachineType}
                        listAllWorkerArrange={listAllWorkerArrange}
                        onSubmit={ handleSearchMachines }
                        onClear={ onClearMachines }
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Toolbar>
                            <DownloadExcel
                                csvHeader={ headerCsvFileExportMachines }
                                data={ dataMachineExport }
                                actionGetData={ handleExportMachinesExcel }
                                flagGetDetail={ getDataExportFlag }
                                filename={fileName}
                                updateFlagCallBack={ updateFlagCallBack }
                            />
                        </Toolbar>
                        <PaginationComponent
                            totalPages={listMachinesTotalPages}
                            handlePageChange={handleMachinesPageChange}
                            currentPage={machinesCurrentPage}
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
                        <Typography variant="h6" gutterBottom>
                            { t( 'machineryList' ) }
                        </Typography>
                        <div style={ { display: 'flex' }}>
                            <MachineryTable
                                titleTable={titleTableMachines}
                                data={listMachines}
                                handlerDelete={handlerDelete}
                                successMessage={errorsMessageDeleteMachine}
                                handlerDetail={handlerDetailMachine}
                                loading={loading}
                                handlerPrint={handlerPrint}
                                detailMachine={detailMachine}
                                onOpenView={handleOpenViewMachine}
                            />
                            <MachinesModal
                                data={detailMachine}
                                open={isOpenUpdateMachineModal}
                                handleClose={handleCloseUpdateMachine}
                                nameTitle={t("editMachines")}
                                listAllMachineType={listAllMachineType}
                                handleMachines={handlerUpdateMechine}
                                errorsMessage={errorsMessageUpdateMachine}
                                closeModalAction={removeMessageError}
                                mode='edit'
                            />
                        </div>
                    </Box>
                </TabPanel>
                <TabPanel sx= {{ padding: '0' }} value="2">
                    <SearchFormWorker
                        listAllWorkerArrange={listAllWorkerArrange}
                        onSubmit={ handleSearchWorkers }
                        onClear={ onClearWorkers }
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Toolbar>
                            <DownloadExcel
                                csvHeader={ headerCsvFileExportWorkers }
                                data={ dataWorkerExport }
                                actionGetData={ handleExportWorkersExcel }
                                flagGetDetail={ getDataExportFlag }
                                filename={fileName}
                                updateFlagCallBack={ updateFlagCallBack }
                            />
                        </Toolbar>
                        <PaginationComponent
                            totalPages={listWorkersTotalPages}
                            handlePageChange={handleWorkersPageChange}
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
                        <Typography variant="h6" gutterBottom>
                            { t( 'workerList' ) }
                        </Typography>
                        <div style={ { display: 'flex' }}>
                            <WorkerTable
                                titleTable={titleTableWorker}
                                data={listWorker}
                                handlerDelete={handlerDelete}
                                successMessage={errorsMessageDeleteMachine}
                                handlerDetail={handlerDetailMachine}
                                loading={loading}
                                onOpenView={handleOpenViewWorker}
                            />
                        </div>
                    </Box>
                </TabPanel>
            </TabContext>
        </>
    )
}