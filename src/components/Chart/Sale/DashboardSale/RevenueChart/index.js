import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Grid } from '@mui/material';
import colors from '../../../../../constants/colors';
import {axisClasses, BarChart} from "@mui/x-charts"
import Typography from '@mui/material/Typography';
import {formatAbbreviatedCurrency} from "../../../../../common/common";

const chartSetting = {
    yAxis: [
        {
            id:'leftAxisId',
            label: 'Doanh thu',
            position: 'bottom',
            valueFormatter: formatAbbreviatedCurrency,
        },
        {
            id:'rightAxisId',
            label: 'Số đơn',
            position: 'right',
            valueFormatter: formatAbbreviatedCurrency,
        },
    ],
    sx: {
        [`.${axisClasses.left} .${axisClasses.label}`]: {
            writingMode: 'vertical-lr',
            transform: 'translateY(-44%) translateX(-2%) rotate(0deg)',
            fontWeight:700,
        },
        [`.${axisClasses.right} .${axisClasses.label}`]: {
            writingMode: 'vertical-lr',
            transform: 'translateY(56%) translateX(10%) rotate(180deg)',
            fontWeight:700,

        },
    },
};
export default function RevenueChart({data}) {
    const { t } = useTranslation();
    const [chartWidth, setChartWidth] = useState(460);
    const [month, setMonth] = useState([]);
    const [numberOfOrdersData, setNumberOfOrdersData] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (data && data.year_revenue) {
            const monthArray = [];
            const orderDataArray = [];
            const revenueArray = [];

            for (let i = 0; i < data.year_revenue.length; i++) {
                monthArray.push(data.year_revenue[i].month);
                orderDataArray.push(data.year_revenue[i].total_orders_for_each_month);
                revenueArray.push(data.year_revenue[i].total_revenue_for_each_month);
            }

            setMonth(monthArray);
            setNumberOfOrdersData(orderDataArray);
            setRevenueData(revenueArray);
            setDataLoaded(true);
        }
    }, [data]);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 1708) {
                setChartWidth(460);
            }else if(window.innerWidth >= 1708 && window.innerWidth <= 1812){
                setChartWidth(540);
            } else {
                setChartWidth(540);
            }
        }

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!dataLoaded) {
        return null;
    }

    return (
        <Box
            sx={{
                bgcolor: colors.lilywhiteColor,
                p: 2,
                maxWidth: "100%",
                borderRadius: '10px',
                boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
            }}
        >
            <Typography sx={{fontSize: '12px', lineHeight: '14.06px', fontWeight: 'bold'}}>
                {t('revenueChart') + (data && data.current_year)}
            </Typography>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                {data && Array.isArray(data.year_revenue) && data.year_revenue.some(item =>
                    item.total_revenue_for_each_month > 0 || item.total_orders_for_each_month > 0
                ) ? (
                    <BarChart
                        width={chartWidth}
                        height={400}
                        series={[
                            {
                                data: revenueData,
                                label: 'Doanh thu',
                                yAxisKey: 'leftAxisId',
                                color: colors.royalblueColor,
                            },
                            {
                                data: numberOfOrdersData,
                                label: 'Số đơn',
                                yAxisKey: 'rightAxisId',
                                color: colors.grayColor,
                            },
                        ]}
                        xAxis={[{
                            data: month,
                            valueFormatter: (date) => 'Tháng ' + date.toString(),
                            scaleType: 'band'
                        }]}
                        yAxis={[{id: 'leftAxisId'}, {id: 'rightAxisId', tickMinStep: 1}]}
                        rightAxis="rightAxisId"
                        slotProps={{
                            legend: {
                                itemMarkWidth: 45,
                                itemMarkHeight: 15,
                            },
                        }}
                        margin={{
                            left: 80,
                        }}
                        {...chartSetting}
                    />
                ) : (
                    <Typography sx={{height: '400px'}}>
                        {t('noData')}
                    </Typography>
                )}
            </Box>
        </Box>
    );
}