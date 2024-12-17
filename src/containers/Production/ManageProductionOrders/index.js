import React, {useCallback, useEffect, useState} from "react"
import {Grid, TextField} from "@mui/material"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import {useTranslation} from "react-i18next"
import Button from "@mui/material/Button"
import colors from "../../../constants/colors"
import {useNavigate} from "react-router-dom"
import '../../../resource/style/ProductionStyle.css'
import titleTableProductionOrder from "../../../constants/titleTableProductionOrder"
import SearchFormProductionOrder from "../../../components/SearchForm/ProductionOrder"
import MenuItem from "@mui/material/MenuItem"
import OrderListTable from "../../../components/Table/Production/OrderListTable"
import Toolbar from '@mui/material/Toolbar';
import ProductionOrderListTable from "../../../components/Table/Production/ProductionOrderListTable";
import CreateWorkOrder from "./CreateWorkOrder";
import { useDispatch, useSelector } from 'react-redux';
import {
    exportDataManufactureOrdersToExcelAction,
    getKanBanManufactureOrdersAction,
    getListAllOrderAction,
    getListManufactureOrdersAction,
    getListPlanAction, getListStatusForManufactureAction,
    getStatisticManufactureOrdersAction, updateStatusDataExportFlagAction,
} from "../../../redux/production/production.actions";
import {
    getDataManufactureOrdersExportFlagState,
    listAllOrderState,
    listAllOrderStatusState,
    listAllPlanState,
    listKanbanManufactureOrdersState, listListManufactureOrdersTotalPagesState,
    listManufactureOrdersState,
    listStatisticManufactureOrdersState, listStatusForManufactureState
} from "../../../redux/production/production.selectors";
import PaginationComponent from "../../../components/Paginate";
import {setCurrentPageListOderForProductionManagement} from "../../../redux/production/production.slice";
import BoardManageProductionOrders
    from "../../../components/Kanban/Production/ManageProductionOrders/StandStill/board/board";
import DownloadExcel from "../../../components/Buttons/DownloadExcel";
import csvHeadersManageProductionOrders from "../../../constants/headerCsvFileExportManageProductionOrders";

export default function ManageProductionOrdersPage () {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState('kanban');
    const [displayType, setDisplayType] = useState('kanban');
    const listManufactureOrders = useSelector(listManufactureOrdersState);
    const listStatisticManufactureOrders = useSelector(listStatisticManufactureOrdersState);
    const listKanbanManufactureOrders = useSelector(listKanbanManufactureOrdersState);
    const listManufactureOrdersTotalPages= useSelector(listListManufactureOrdersTotalPagesState);
    const [searchParams, setSearchParams] = useState(null);
    const listAllPlan= useSelector(listAllPlanState);
    const listAllStatus = useSelector(listStatusForManufactureState);
    const listAllOrder = useSelector(listAllOrderState);
    const [ fileName , setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const getDataManufactureOrdersExportFlag = useSelector(getDataManufactureOrdersExportFlagState);

    useEffect( () => {
        dispatch( getListManufactureOrdersAction());
        dispatch(getStatisticManufactureOrdersAction());
        dispatch(getKanBanManufactureOrdersAction());
        dispatch(getListPlanAction());
        dispatch(getListStatusForManufactureAction());
        dispatch(getListAllOrderAction());
    }, [dispatch] );

    const handleOpenCreateWorkOrder = () => {
        navigate(`/production/manage-production-orders/create-work-order`);
    }
    const handleChange = (event) => {
        setSelectedOption(event.target.value);
        setDisplayType(event.target.value);
    };
    const handlePageChange = (event, page) => {
        setLoading(true);
        dispatch(setCurrentPageListOderForProductionManagement(page));
        if (searchParams) {
            dispatch(getListManufactureOrdersAction({ ...searchParams , page: page
            })).then(() => {
                setLoading(false);
            });
        } else {
            dispatch(getListManufactureOrdersAction({ page
            })).then(() => {
                setLoading(false);
            });
        }
    };
    const handleSearch = (params) => {
        setLoading(true);
        setSearchParams( params );
        dispatch( getListManufactureOrdersAction( params )).then(() => {
            setLoading(false);
        });
        dispatch( getStatisticManufactureOrdersAction( params ) );
        dispatch(getKanBanManufactureOrdersAction(params));
    };
    const onClear = useCallback( () => {
        setSearchParams(null);
        dispatch( getListManufactureOrdersAction());
        dispatch(getStatisticManufactureOrdersAction());
        dispatch(getKanBanManufactureOrdersAction());
    },[] );

    const handleExportExcel = () => {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const currentDay = ('0' + currentDate.getDate()).slice(-2);
        const currentHour = ('0' + currentDate.getHours()).slice(-2);
        const currentMinute = ('0' + currentDate.getMinutes()).slice(-2);
        const dateString = `${currentYear}${currentMonth}${currentDay}${currentHour}${currentMinute}_`;
        const fileName = `${dateString}${t('manageProductionOrders')}`;
        const fileNameWithExtension = `${fileName}.xlsx`;
        setFileName(fileNameWithExtension);
        dispatch( exportDataManufactureOrdersToExcelAction( searchParams ) );
    };

    const updateFlagCallBack = () => {
        dispatch( updateStatusDataExportFlagAction( searchParams ) );
    };

    useEffect(() => {
        setDisplayType('kanban');
    }, []);
    return (
        <>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', p: '0 !important'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Button
                        sx={{bgcolor: colors.whiteColor, color: colors.blackColor, marginRight: 2, p: '8px 20px'}}
                        onClick={() => navigate(-1)}>
                        {t('back')}
                    </Button>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        {t('manageProductionOrders')}
                    </Typography>
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button
                        sx={{
                            bgcolor: colors.whiteColor,
                            color: colors.blackColor,
                            p: '8px 15px !important',
                            boxShadow: '0px 4px 4px 0px #00000040',
                        }}
                        onClick={handleOpenCreateWorkOrder}
                    >
                        {t('createWorkOrder')}
                    </Button>
                </Box>
            </Toolbar>
            <SearchFormProductionOrder
                listAllPlan={listAllPlan}
                listAllOrderStatus={listAllStatus}
                listAllOrder={listAllOrder}
                onSubmit={ handleSearch }
                onClear={ onClear }
            />
            <Box className="root-order">
                <Grid container columnSpacing={1} justifyContent="center">
                    <Grid item>
                        <Grid className="box-order-manage-production">
                            <Grid>
                                <Typography
                                    className="title-statistical-production">{t('numberOfOrdersCompletedAccordingToSchedule')}</Typography>
                            </Grid>
                            <Grid>
                                <Typography className="text-order-list">{listStatisticManufactureOrders.quantity_manufacture_orders_on_schedule}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid className="box-order-manage-production">
                            <Grid>
                                <Typography className="title-statistical-production">{t('numberOfOrdersLateDeadline')}</Typography>
                            </Grid>
                            <Grid>
                                <Typography className="text-order-list">{listStatisticManufactureOrders.quantity_manufacture_orders_behind_schedule}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid className="box-order-manage-production">
                            <Grid>
                                <Typography className="title-statistical-production">{t('numberOfCanceledOrders')}</Typography>
                            </Grid>
                            <Grid>
                                <Typography className="text-order-list">{listStatisticManufactureOrders.quantity_manufacture_orders_cancelled}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid className="box-order-manage-production">
                            <Grid>
                                <Typography className="title-statistical-production">{t('urgentOrderNumber')}</Typography>
                            </Grid>
                            <Grid>
                                <Typography className="text-order-list">{listStatisticManufactureOrders.quantity_manufacture_orders_urgent}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid className="box-order-manage-production">
                            <Grid>
                                <Typography className="title-statistical-production">{t('quantityRequiredVaries')}</Typography>
                            </Grid>
                            <Grid>
                                <Typography className="text-order-list">{listStatisticManufactureOrders.quantity_requested_change}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
            <Box>
                <Box sx={{ display: 'flex',justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography sx={{ fontWeight: 700, fontSize: '14px' }}>{t('watchAlong')}</Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <TextField
                            size='small'
                            select
                            value={selectedOption}
                            onChange={handleChange}
                            variant="outlined"
                            style={{ width: '104px', backgroundColor: colors.lilywhiteColor , marginLeft:'20px'}}
                        >
                            <MenuItem value="kanban">Kanban</MenuItem>
                            <MenuItem value="list">List</MenuItem>
                        </TextField>
                    </Box>
                        {displayType === 'list' && (
                            <Box sx={{display: 'flex', alignItems: 'center' }}>
                                <Toolbar>
                                    <DownloadExcel
                                        csvHeader={csvHeadersManageProductionOrders}
                                        data={listManufactureOrders}
                                        actionGetData={handleExportExcel}
                                        flagGetDetail={getDataManufactureOrdersExportFlag}
                                        filename={fileName}
                                        updateFlagCallBack={updateFlagCallBack}
                                    />
                                </Toolbar>
                                <PaginationComponent
                                    totalPages={listManufactureOrdersTotalPages}
                                    handlePageChange={handlePageChange}
                                />
                            </Box>
                        )}
                    </Box>
                {displayType === 'kanban' && (
                    <Box sx={{ display: 'flex', overflowX: 'auto', }}>
                        <Box sx={{ flex: '0 0 auto', maxWidth:"1000px"}}>
                            <BoardManageProductionOrders initial={listKanbanManufactureOrders} withScrollableColumns />
                        </Box>
                    </Box>
                )}
                {displayType === 'list' && (
                    <>
                        <Box
                            component="form"
                            sx={{
                                bgcolor: colors.lilywhiteColor,
                                borderRadius: '10px',
                                padding: '30px',
                                position: 'relative',

                            }}
                        >
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
                            <Typography variant="h6" gutterBottom>
                                {t('productionOrderList')}
                            </Typography>
                            <ProductionOrderListTable
                                titleTable={titleTableProductionOrder}
                                data={listManufactureOrders}
                                loading={loading}
                            />
                        </Box>
                    </>
                )}
            </Box>
        </>
    )
}