import React, { useEffect, useState } from 'react';
import { Box, TextField, MenuItem, Typography, Grid, ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import colors from '../../../../constants/colors';
import '../../../../resource/style/ChartStyle.css';
import CustomDatePicker from "../../../DateTime/DatePicker";
import format from 'date-fns/format';
import CustomChart from "../Order/CustomChart";
import addDays from 'date-fns/addDays';

export default function ProductionTransitCapacityChart() {
    const { t } = useTranslation();
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const getFormattedNextDay = (date) => {
        const nextDay = addDays(date, 1);
        return format(nextDay, 'dd-MM-yyyy');
    };

    return (
        <Box sx={ { display: 'flex', justifyContent: 'center'} }>
            <Box
                sx={ {
                    bgcolor: colors.lilywhiteColor,
                    p: 2,
                    mt: 2,
                    borderRadius: '10px',
                    position: 'relative'
                    , width:'80%', height:'262px'
                } }
            >
                <Box
                    sx={ {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '8px',
                        background: colors.redColor,
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                    } }
                />
                <Box>
                    <Grid container sx={ { alignItems: 'baseline', justifyContent: 'space-evenly' } }>
                        <Grid item>
                            <Typography variant="h6" gutterBottom>
                                { t('productionCapacity') }
                            </Typography>
                        </Grid>
                        <Grid item >
                            <CustomDatePicker className="custom-calendar" onChange={handleDateChange} />
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" gutterBottom>
                                { t('transportationCapacity') }
                            </Typography>
                        </Grid>
                    </Grid>
                    <Box display="flex" sx={{ mt: 1,justifyContent:'space-evenly' }}>
                        <Box >
                            <Box>
                                <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>
                                    {t('day')}: {format(selectedDate, 'dd-MM-yyyy')}
                                </Typography>
                            </Box>
                            <Box>
                                <Box display="flex" justifyContent="space-between" gap="20px" alignItems="center">
                                    <Box display="flex" marginLeft="auto">
                                        <Typography sx={{ fontSize: '12px', fontStyle: 'italic' }}>
                                            {t('paper')}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" gap="2px">
                                        <CustomChart redPercentage={30} bluePercentage={70} label="S1" />
                                        <CustomChart redPercentage={30} bluePercentage={70} label="S2" />
                                        <CustomChart redPercentage={50} bluePercentage={50} label="S3" />
                                        <CustomChart redPercentage={30} bluePercentage={70} label="S4" />
                                    </Box>
                                </Box>
                                <Box display="flex" justifyContent="space-between" gap="20px" alignItems="center" mt="5px">
                                    <Box display="flex" marginLeft="auto">
                                        <Typography sx={{ fontSize: '12px', fontStyle: 'italic' }}>
                                            {t('roll')}
                                        </Typography>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" gap="2px">
                                        <CustomChart redPercentage={30} bluePercentage={70} label="S1" />
                                        <CustomChart redPercentage={30} bluePercentage={70} label="S2" />
                                        <CustomChart redPercentage={50} bluePercentage={50} label="S3" />
                                        <CustomChart redPercentage={30} bluePercentage={70} label="S4" />
                                    </Box>
                                </Box>
                            </Box>
                            <Box mt="10px">
                                <Box>
                                    <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>
                                        {t('day')}: {getFormattedNextDay(selectedDate)}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box display="flex" justifyContent="space-between" gap="20px" alignItems="center">
                                        <Box display="flex" marginLeft="auto">
                                            <Typography sx={{ fontSize: '12px', fontStyle: 'italic' }}>
                                                {t('paper')}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" gap="2px">
                                            <CustomChart redPercentage={30} bluePercentage={70} label="S1" />
                                            <CustomChart redPercentage={30} bluePercentage={70} label="S2" />
                                            <CustomChart redPercentage={50} bluePercentage={50} label="S3" />
                                            <CustomChart redPercentage={30} bluePercentage={70} label="S4" />
                                        </Box>
                                    </Box>
                                    <Box display="flex" justifyContent="space-between" gap="20px" alignItems="center" mt="5px">
                                        <Box display="flex" marginLeft="auto">
                                            <Typography sx={{ fontSize: '12px', fontStyle: 'italic' }}>
                                                {t('roll')}
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" gap="2px">
                                            <CustomChart redPercentage={30} bluePercentage={70} label="S1" />
                                            <CustomChart redPercentage={30} bluePercentage={70} label="S2" />
                                            <CustomChart redPercentage={50} bluePercentage={50} label="S3" />
                                            <CustomChart redPercentage={30} bluePercentage={70} label="S4" />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box position="relative" width="1px" mx="4px">
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: '10%',
                                    left: '50%',
                                    right:'50%',
                                    width: '1px',
                                    height: '90%',
                                    background: colors.greyColor,
                                    transform: 'translateX(-50%)',
                                }}
                            />
                        </Box>
                        <Box>
                            <Box>
                                <Box>
                                    <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>
                                        {t('day')}: {format(selectedDate, 'dd-MM-yyyy')}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box display="flex" justifyContent="space-between" gap="20px" alignItems="center">
                                        <Box display="flex" marginLeft="auto">
                                            <Typography sx={{ fontSize: '12px', fontStyle: 'italic' }}>
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" gap="2px">
                                            <CustomChart redPercentage={30} bluePercentage={70} label="S1" />
                                            <CustomChart redPercentage={30} bluePercentage={70} label="S2" />
                                            <CustomChart redPercentage={50} bluePercentage={50} label="S3" />
                                            <CustomChart redPercentage={30} bluePercentage={70} label="S4" />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box sx={{height:'35px'}}>
                                </Box>
                            </Box>
                            <Box mt="10px">
                                <Box>
                                    <Typography sx={{ fontSize: '12px', fontWeight: 700 }}>
                                        {t('day')}: {getFormattedNextDay(selectedDate)}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Box display="flex" justifyContent="space-between" gap="20px" alignItems="center">
                                        <Box display="flex" marginLeft="auto">
                                            <Typography sx={{ fontSize: '12px', fontStyle: 'italic' }}>
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="space-between" gap="2px">
                                            <CustomChart redPercentage={30} bluePercentage={70} label="S1" />
                                            <CustomChart redPercentage={30} bluePercentage={70} label="S2" />
                                            <CustomChart redPercentage={50} bluePercentage={50} label="S3" />
                                            <CustomChart redPercentage={30} bluePercentage={70} label="S4" />
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
