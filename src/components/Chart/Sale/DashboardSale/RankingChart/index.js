import { useTranslation } from 'react-i18next';
import colors from '../../../../../constants/colors';
import { Box, Grid } from '@mui/material';
import React, { useEffect, useRef, useState } from "react"
import Typography from '@mui/material/Typography';
import { BarChart } from '@mui/x-charts';
import '../../../../../resource/style/ChartStyle.css';
import {useSelector} from "react-redux";
import {selectSidebarWidth} from "../../../../../redux/app/app.selectors";
export default function RankingChart({ data }){
    const { t } = useTranslation();
    const [chartWidth, setChartWidth] = useState(522);
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 1708) {
                setChartWidth(482);
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
    return(
        <Box
            sx={{
                bgcolor: colors.lilywhiteColor,
                p: 2,
                maxWidth: "100%",
                // width:'427px',
                borderRadius: '10px',
                boxShadow:'0 4px 4px 0 rgba(0, 0, 0, 0.25)',
            } }
        >
                <Typography sx={ { fontSize:'12px', lineHeight:'14.06px', fontWeight:'bold' } }>
                    { t('monthlyRankings') + data.current_month }
                </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {data && data.top_salesperson && data.top_salesperson.length > 0 ? (
                    <BarChart
                        dataset={data.top_salesperson}
                        yAxis={[{ scaleType: 'band', dataKey: 'name', categoryGapRatio: 0.5 }]}
                        series={[{ dataKey: 'month_revenue', color: colors.cobaltblueColor }]}
                        layout="horizontal"
                        grid={{ vertical: true, horizontal: true }}
                        width={chartWidth}
                        height={400}
                        margin={{
                            left: 80,
                        }}
                    />
                ) : (
                    <Typography sx={{height:'400px'}}>
                        {t('noData')}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}
