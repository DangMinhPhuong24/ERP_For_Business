import React, { useEffect } from "react"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import colors from "../../../constants/colors";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import ManageProductionOrdersTable from "../../../components/Table/Production/ManageProductionOrdersTable/index";
import titleTableManageProductionOrders from "../../../constants/titleTableManageProductionOrders";
import SearchManageProductionPlans from "../../../components/SearchForm/ ManageProductionPlans/index";
import DownloadExcel from "../../../components/Buttons/DownloadExcel";
import PaginationComponent from "../../../components/Paginate";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { format } from 'date-fns';
import CalendarManageProductionPlan from "../../../components/DateTime/CalendarManageProductionPlan";
import ManageProductionPlansBarChart, {UserData} from "../../../components/Chart/Production/ManageProductionPlans";
import Grid from "@mui/material/Grid";

export default function ManageProductionPlansPage () {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const getBackgroundColor = (value) => {
        if (value === 100) {
            return colors.greenColor;
        } else if (value >= 50 && value < 100) {
            return colors.cobaltblueColor;
        } else if (value >= 25 && value < 50) {
            return colors.terraCottaColor;
        } else if (value < 25) {
            return colors.yelowColor;
        }
    };
    const chartData = {
        labels: UserData.map((data) => data.plan),
        datasets: [
            {
                data: UserData.map((data) => data.userGain),
                backgroundColor: UserData.map((data) => getBackgroundColor(data.userGain)),
                labelColor: '#1E88E5'
            },
        ],
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
                        { t('manageProductionPlans') }
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
                    >
                        { t('createProductionPlans') }
                    </Button>
                </Box>
            </Toolbar>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Box component="form"
                         sx={{
                             bgcolor: colors.lilywhiteColor,
                             borderRadius: '4px',
                             padding: '10px',
                             position: 'relative',
                             display: 'flex',
                             flexDirection: 'column',
                             alignItems: 'center',
                             width:'100%',
                             height:'100%',
                             boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
                         }}>
                        <CalendarManageProductionPlan />
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box component="form"
                         sx={{
                             bgcolor: colors.lilywhiteColor,
                             borderRadius: '4px',
                             padding: '10px',
                             position: 'relative',
                             display: 'flex',
                             flexDirection: 'column',
                             alignItems: 'center',
                             width:'100%',
                             height:'100%',
                             boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
                         }}>
                        <Typography sx={{ alignItems: 'center',fontWeight:700, fontSize:'12px' }}>
                            {t('dailyProductionPlan')} {format(new Date(), 'dd/MM/yyyy')}
                        </Typography>
                        <ManageProductionPlansBarChart chartData={chartData} />
                    </Box>
                </Grid>
            </Grid>
            <SearchManageProductionPlans/>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Toolbar>
                    <DownloadExcel
                        // csvHeader={ headerCsvFileExportCustomer }
                        // data={ dataCustomerExport }
                        // actionGetData={ handleExportExcel }
                        // flagGetDetail={ getDataExportFlag }
                        // filename={fileName}
                    />
                </Toolbar>
                <PaginationComponent
                    totalPages = {1}
                    handlePageChange = {2}
                />
            </Box>
            <Box component="form"
                 sx= {{ bgcolor: colors.lilywhiteColor, borderRadius: '10px', padding: '30px', position: 'relative', mt:2 }}>
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
                    { t( 'productionOrderList' ) }
                </Typography>
                <ManageProductionOrdersTable
                    titleTable={titleTableManageProductionOrders}
                />
            </Box>
        </>
    )
}
