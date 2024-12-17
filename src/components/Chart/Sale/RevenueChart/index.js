import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Box, Grid} from '@mui/material';
import colors from '../../../../constants/colors';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';
import { LinePlot, MarkPlot } from '@mui/x-charts/LineChart';
import { BarPlot } from '@mui/x-charts/BarChart';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import {axisClasses} from "@mui/x-charts";
import {formatAbbreviatedCurrency} from "../../../../common/common";

export default function RevenueChart({dataRevenue}) {
    const {t} = useTranslation();
    const chartSetting = {
        yAxis: [
            {
                id:'leftAxisId',
                label: t('revenue'),
                position: 'bottom',
                valueFormatter: formatAbbreviatedCurrency,
            },
            {
                id:'rightAxisId',
                label: t('numberOfSquareMeter'),
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
                transform: 'translateY(56%) translateX(6%) rotate(180deg)',
                fontWeight:700,

            },
        },
    };
    const [month, setMonth] = useState([]);
    const [revenueData, setRevenueData] = useState([]);
    const [numberOfSquareMeterData, setNumberOfSquareMeterData] = useState([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (dataRevenue) {
            const monthArray = [];
            const revenueArray = [];
            const numberOfSquareMeterArray= [];

            for (let i = 0; i < dataRevenue.length; i++) {
                monthArray.push(dataRevenue[i].category);
                revenueArray.push(dataRevenue[i].value);
                numberOfSquareMeterArray.push(dataRevenue[i].square_meter);
            }

            setMonth(monthArray);
            setRevenueData(revenueArray);
            setNumberOfSquareMeterData(numberOfSquareMeterArray);
            setDataLoaded(true);
        }
    }, [dataRevenue]);

    if (!dataLoaded) {
        return null;
    }

    return (
        <Box sx={{width:'100%'}}>
            <ResponsiveChartContainer
                height={400}
                series={[
                    {
                        type:'bar',
                        data: revenueData,
                        yAxisKey: 'leftAxisId',
                        color: colors.royalblueColor,
                    },
                    {
                        type:'line',
                        data: numberOfSquareMeterData,
                        yAxisKey: 'rightAxisId',
                        color: colors.yelowColor,
                    },
                ]}
                xAxis={[
                    {
                        data: month,
                        scaleType: 'band',
                    },
                ]}
                yAxis={[{ id: 'leftAxisId' }, { id: 'rightAxisId' }]}
                rightAxis="rightAxisId"
                // slotProps={{
                //     legend: {
                //         itemMarkWidth: 45,
                //         itemMarkHeight: 15,
                //     },
                // }}
                margin={{
                    left: 120,
                    right: 85,
                }}
                {...chartSetting}
            >
                <BarPlot />
                <LinePlot />
                <MarkPlot />
                <ChartsXAxis />
                <ChartsYAxis axisId="leftAxisId"/>
                <ChartsYAxis axisId="rightAxisId" position="right"/>
                <ChartsTooltip />
            </ResponsiveChartContainer>
        </Box>
    );
}
