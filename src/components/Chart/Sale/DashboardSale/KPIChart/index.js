import React, { useState } from 'react';
import colors from '../../../../../constants/colors';
import { Box, Grid, LinearProgress, linearProgressClasses, styled, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Stack from '@mui/material/Stack';
import { formatCurrency, formatCurrencyRevenue, formatPercentage } from "../../../../../common/common"

export default function KPIChart({ data }) {
    const { t } = useTranslation();
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ( {
        height: 40,
        borderRadius: 5,
        [ `&.${ linearProgressClasses.colorPrimary }` ]: {
            backgroundColor: theme.palette.grey[ theme.palette.mode === 'light' ? 200 : 800 ],
        },
        [ `& .${ linearProgressClasses.bar }` ]: {
            backgroundColor: theme.palette.mode === 'light' ? colors.greenColor : colors.darkgreenColor,
        },
    } ));
    const safePercentKPI = Math.min(data.percent_kpi_for_the_month, 100);
    const safePercentKPIPaid = Math.min(data.percent_kpi_for_the_month_paid, 100);
    return (
        <Box
            sx={ {
                bgcolor: colors.purpleColor,
                color: colors.lilywhiteColor,
                p: 2,
                mt: 2,
                maxWidth:'100%',
                borderRadius: '10px',
                height:'260px',
                boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
            } }
        >
            <Box>
                <Typography sx={ { fontSize:'24px', fontWeight: 700, lineHeight: '28.13px' } }>
                    { t('salesKPIOfTheMonth').toUpperCase()}{ data.current_month }/{ data.current_year }
                </Typography>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={ { fontSize:'16px',fontWeight: 700, lineHeight: '20.24px' } } align="center">
                            {t('sales')}
                        </Typography>
                        <Typography sx={{fontSize:'20px', fontWeight:'bold', lineHeight: '35px'}} align="center">
                            { formatCurrencyRevenue(data.month_revenue) } / { formatCurrencyRevenue(data.month_kpi) }
                        </Typography>
                        <Typography sx={ { fontSize:'14px',fontWeight: 700, lineHeight: '16.41px' } } align="center">
                            <span style={{ fontWeight: 400 }}>Còn</span> {data.remaining_days} <span style={{ fontWeight: 400 }}>ngày</span>
                        </Typography>
                    </Box>
                    <Box>
                        <BorderLinearProgress
                            variant="determinate"
                            value={ safePercentKPI}
                        >
                        </BorderLinearProgress>
                        <Typography sx={ {fontSize:'20px', fontWeight: 700 } } align="center">
                            { formatPercentage(data.percent_kpi_for_the_month) }
                        </Typography>

                    </Box>
                </Box>
                <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={ { fontSize:'16px',fontWeight: 700, lineHeight: '20.24px' } } align="center">
                            {t('revenue')}
                        </Typography>
                        <Typography sx={{fontSize:'20px', fontWeight:'bold', lineHeight: '35px'}} align="center">
                            { formatCurrencyRevenue(data.month_revenue_paid) } / { formatCurrencyRevenue(data.month_kpi_paid) }
                        </Typography>
                        <Typography sx={ { fontSize:'14px',fontWeight: 700, lineHeight: '16.41px' } } align="center">
                            <span style={{ fontWeight: 400 }}>Còn</span> {data.remaining_days} <span style={{ fontWeight: 400 }}>ngày</span>
                        </Typography>
                    </Box>
                    <Box>
                        <BorderLinearProgress
                            variant="determinate"
                            value={ safePercentKPIPaid }
                        >
                        </BorderLinearProgress>
                        <Typography sx={ {fontSize:'20px', fontWeight: 700 } } align="center">
                            { formatPercentage(data.percent_kpi_for_the_month_paid) }
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
        ;
}

