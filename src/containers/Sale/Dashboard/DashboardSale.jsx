import React, {useEffect, useMemo, useState} from "react"
import {useTranslation} from "react-i18next"
import colors from "../../../constants/colors"
import {Box, Grid} from "@mui/material"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Toolbar from "@mui/material/Toolbar"
import RevenueChart from "../../../components/Chart/Sale/DashboardSale/RevenueChart"
import RankingChart from "../../../components/Chart/Sale/DashboardSale/RankingChart"
import KPIChart from "../../../components/Chart/Sale/DashboardSale/KPIChart"
import {useDispatch, useSelector} from "react-redux"
import {
    dashboardDebtListState,
    dashboardSaleForSalesPeopleState,
    dashboardtotalPagesState
} from "../../../redux/dashboard/dashboard.selectors"
import {getAllDashBoardSaleAction, getListDashBoardDebtAction} from "../../../redux/dashboard/dashboard.actions"
import {formatCurrencyRevenue, formatNumber} from "../../../common/common"
import {useNavigate} from "react-router-dom"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CustomerListDoesNotGenerateOrdersTable
    from "../../../components/Table/Dashboard/SaleTable/CustomerListDoesNotGenerateOrders";
import BasicTable from "../../../components/BasicTable";

const style = {
    bgcolor: colors.lilywhiteColor,
    mt: "6px",
    maxWidth: "100%",
    height: "127px",
    borderRadius: "10px",
    boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
    display: "grid",
    alignContent: "center",
    justifyItems: "center",
}

function DashboardSalePage() {
    const {t} = useTranslation()
    const listDebt = useSelector(dashboardDebtListState);
    const dashboardSaleData = useSelector(dashboardSaleForSalesPeopleState);
    const totalPages = useSelector(dashboardtotalPagesState);
    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getListDashBoardDebtAction());
        dispatch(getAllDashBoardSaleAction());
    }, []);
    const handlePageChange = (event, page) => {
        setLoading(true);
        setCurrentPage(page)
        dispatch(getListDashBoardDebtAction({page})).then(() => {
            setLoading(false);
        });
    };
    const headers = useMemo(
        () => [
            {
                key: 'customer',
                label: t('customer'),
                align: 'left',
                fontWeight: 700
            },
            {
                key: 'debtGroup',
                label: t('debtGroup'),
                align: 'left',
                fontWeight: 700
            },
            {
                key: 'totalLiabilities',
                label: t('totalLiabilities'),
                align: 'right',
                fontWeight: 700
            },
            {
                key: 'overdueDebtAmount',
                label: t('overdueDebtAmount'),
                align: 'right',
                fontWeight: 700
            },
            {
                key: 'numberOfDaysOverdue',
                label: t('numberOfDaysOverdue'),
                align: 'right',
                fontWeight: 700
            }
        ],
        [t]
    )

    const rows = useMemo(() => {
        return (listDebt && Array.isArray(listDebt) ? listDebt : []).map((row) => ({
            customer: {
                label: row.customer_name
            },
            debtGroup: {
                label: row.debt_group
            },
            totalLiabilities: {
                label: formatNumber(row.total_debt)
            },
            overdueDebtAmount: {
                label: formatNumber(row.overdue_amount)
            },
            numberOfDaysOverdue: {
                label: formatNumber(row.number_day_overdue)
            },
            id: {
                label: row.id
            }
        }))
    }, [listDebt])

    return (
        <>
            <Box sx={{display: "flex", flexDirection: "column"}}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: '0 !important',
                    border: '1px solid #EFF0F6 !important'
                }}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            p: '8px 16px !important',
                            bgcolor: colors.lightlavendergrayColor,
                            minHeight: '48px !important',
                        }}>
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
                            <Button sx={{
                                bgcolor: colors.whiteColor,
                                color: colors.lightroyalblueColor,
                                mr: 1,
                                minWidth: '30px',
                                borderRadius: '8px'
                            }}
                                    onClick={() => navigate(-1)}
                            >
                                <ArrowBackIosNewIcon sx={{fontSize: 16}}/>
                            </Button>
                            <Typography sx={{fontWeight: 400, fontSize: 16, color: colors.lightroyalblueColor}}>
                                {t('Dashboard')}
                            </Typography>
                        </Box>
                    </Toolbar>
                </Box>
                <Grid container columnSpacing={2} p='0 16px'>
                    <Grid item xs={8.8}>
                        <KPIChart
                            data={dashboardSaleData}
                        />
                    </Grid>
                    <Grid item xs={3.2}>
                        <Box sx={{...style, mt: 2}}>
                            <Typography sx={{fontSize: '12px', lineHeight: '14.06px', fontWeight: 'bold'}}>
                                {t("salesToday")}
                            </Typography>
                            <Typography sx={{
                                fontSize: '32px',
                                lineHeight: '37.5px',
                                color: colors.darkorangeColor,
                                fontWeight: 700
                            }}>
                                {formatCurrencyRevenue(dashboardSaleData.revenue_today)}
                            </Typography>
                        </Box>
                        <Box sx={{...style}}>
                            <Typography sx={{fontSize: '12px', lineHeight: '14.06px', fontWeight: 'bold'}}>
                                {t("todayOrderNumber")}
                            </Typography>
                            <Typography sx={{
                                fontSize: '32px',
                                lineHeight: '37.5px',
                                color: colors.darkgreenColor,
                                fontWeight: 700
                            }}>
                                {dashboardSaleData.orders_today}
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Box
                    sx={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", alignItems: 'spec', p: '0 16px'}}>
                    <Box
                        sx={{
                            bgcolor: colors.lilywhiteColor,
                            p: 2,
                            mt: 2,
                            maxWidth: "100%",
                            borderRadius: "10px",
                            boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <Grid>
                            <Typography
                                sx={{fontSize: '12px', lineHeight: '14.06px', fontWeight: 'bold', marginBottom: '5px'}}>
                                {t("customerListDoesNotGenerateOrders")}
                            </Typography>
                            <CustomerListDoesNotGenerateOrdersTable
                                data={dashboardSaleData.top_customer}
                            />
                        </Grid>
                    </Box>
                    <Box
                        sx={{
                            bgcolor: colors.lilywhiteColor,
                            p: 2,
                            mt: 2,
                            maxWidth: "100%",
                            borderRadius: "10px",
                            boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
                        }}
                    >
                        <Grid>
                            <Typography
                                sx={{fontSize: '12px', lineHeight: '14.06px', fontWeight: 'bold', marginBottom: '5px'}}>
                                {t("accountsPayable")}
                            </Typography>
                            {!loading && (
                                <BasicTable
                                    loading={loading}
                                    headers={headers}
                                    rows={rows}
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    showIndex
                                    handlePageChange={handlePageChange}
                                />
                            )}
                        </Grid>
                    </Box>
                    <Box>
                        <RevenueChart
                            data={dashboardSaleData}
                        />
                    </Box>
                    <Box>
                        <RankingChart
                            data={dashboardSaleData}
                        />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default DashboardSalePage

