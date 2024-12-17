import React, { useState, useEffect } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import colors from '../../../../../constants/colors';
import { useTranslation } from "react-i18next";
import { Grid } from '@mui/material';
import {formatAbbreviatedCurrency} from "../../../../../common/common";

export default function ComprehensiveRevenueChart({ listTopBestSelling }) {
    const { t } = useTranslation();
    const [selectedMenuItem, setSelectedMenuItem] = useState('');
    const [selectedProductData, setSelectedProductData] = useState([]);
    const [selectedDateMonth, setSelectedDateMonth] = useState([]);
    const [chartWidth, setChartWidth] = useState(522);
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 1708) {
                setChartWidth(522);
            }else if(window.innerWidth >= 1708 && window.innerWidth <= 1812){
                setChartWidth(650);
            } else {
                setChartWidth(700);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (listTopBestSelling.length > 0) {
            const firstProductCode = listTopBestSelling[0].code;
            setSelectedMenuItem(firstProductCode);
            handleChange({ target: { value: firstProductCode } });
        }
    }, [listTopBestSelling]);

    const convertMonthYearToDate = (monthYear) => {
        const [month, year] = monthYear.split('/');
        return new Date(parseInt(year), parseInt(month) - 1, 1);
    };

    const sortDatesAsc = (dates) => {
        return dates.sort((a, b) => a - b);
    };

    const createAdjustedDate = (year, month, day) => {
        const adjustedMonth = month - 1;
        return new Date(year, adjustedMonth, day);
    };
    const handleChange = (event) => {
        const selectedProductId = event.target.value;
        setSelectedMenuItem(selectedProductId);

        const selectedProduct = listTopBestSelling.find(product => product.code === selectedProductId);
        if (selectedProduct) {
            const dates = selectedProduct.product_revenue_each_month.map(item => convertMonthYearToDate(item.month_year)).flat();
            const sortedDates = sortDatesAsc(dates);
            const years = sortedDates.map(date => createAdjustedDate(date.getFullYear(), date.getMonth() + 1, 1));
            setSelectedDateMonth(years);

            const productRevenues = selectedProduct.product_revenue_each_month.map(item => item.product_revenue);
            const reversedProductRevenues = productRevenues.reverse();
            setSelectedProductData(reversedProductRevenues);
        }
    };

    return (
        <Box
            sx={{
                bgcolor: colors.lilywhiteColor,
                p: 2,
                borderRadius: '10px',
                boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
            }}
        >
            <Box>
                <Typography sx={{ fontWeight: 700, fontSize: '12px' }} gutterBottom>
                    {t('revenueAndTopItemsWithTrendPrediction')}
                </Typography>
                <Grid container alignItems="center" spacing={2} sx={{mt:1}}>
                    <Grid item>
                        <Typography sx={{ fontWeight: 400, fontSize: '12px' }} gutterBottom>
                            {t('revenueOfTopBestSellingProducts')}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <FormControl sx={{ width: '240px' }} size="small">
                            <Select
                                sx={{ fontWeight: 700 }}
                                value={selectedMenuItem}
                                onChange={handleChange}
                            >
                                {listTopBestSelling.map((product) => (
                                    <MenuItem key={product.id} value={product.code}>{`${product.product_name}`}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <LineChart
                        xAxis={[
                            {
                                id: 'months',
                                data: selectedDateMonth,
                                scaleType: 'time',
                                valueFormatter: (date) => {
                                    const month = (date.getMonth() + 1).toString().padStart(2, '0');
                                    const year = date.getFullYear();
                                    return `${month}/${year}`;
                                },
                                tickLabelOverflow: 'visible'
                            },

                        ]}
                        yAxis={[{valueFormatter: formatAbbreviatedCurrency}]}
                        series={[
                            {
                                data: selectedProductData,
                                stack: 'total',
                                area: true,
                                showMark: true,
                                color: colors.royalblueColor,
                            },
                        ]}
                        width={chartWidth}
                        height={300}
                        margin={{
                            top: 20,
                            left: 120,
                        }}
                    />
                </Box>

            </Box>
        </Box>
    );
}
