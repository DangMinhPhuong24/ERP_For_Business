import React, {useCallback, useEffect, useState} from "react"
import {Box, TextField, MenuItem, Typography, Grid, ButtonGroup, Select} from '@mui/material';
import Button from '@mui/material/Button';
import {useTranslation} from 'react-i18next';
import colors from '../../../../../constants/colors';
import '../../../../../resource/style/ChartStyle.css';
import '../../../../../resource/style/ResponsiveStyle.css';
import {PieChart} from '@mui/x-charts/PieChart';
import {useDrawingArea} from '@mui/x-charts/hooks';
import {styled} from '@mui/material/styles';
import addDays from 'date-fns/addDays';
import {isSameDay} from 'date-fns';
import Autocomplete from "@mui/material/Autocomplete";
import selectedCase from "../../../../../constants/selectedCase";

const dataProduction = [
    [{value: 7500, color: colors.orangeredColor}, {value: 2500, color: colors.blueceruleanColor}],
    [{value: 1500, color: colors.orangeredColor}, {value: 5500, color: colors.blueceruleanColor}],
    [{value: 7500, color: colors.orangeredColor}, {value: 4500, color: colors.blueceruleanColor}],
    [{value: 15500, color: colors.orangeredColor}, {value: 500, color: colors.blueceruleanColor}]
];
const dataProduction1 = [
    [{value: 2500, color: colors.orangeredColor}, {value: 2200, color: colors.blueceruleanColor}],
    [{value: 1230, color: colors.orangeredColor}, {value: 5050, color: colors.blueceruleanColor}],
    [{value: 12020, color: colors.orangeredColor}, {value: 4350, color: colors.blueceruleanColor}],
    [{value: 8700, color: colors.orangeredColor}, {value: 5400, color: colors.blueceruleanColor}]
];
const dataProduction2 = [
    [{value: 3240, color: colors.orangeredColor}, {value: 2460, color: colors.blueceruleanColor}],
    [{value: 1450, color: colors.orangeredColor}, {value: 5500, color: colors.blueceruleanColor}],
    [{value: 3424, color: colors.orangeredColor}, {value: 6787, color: colors.blueceruleanColor}],
    [{value: 7675, color: colors.orangeredColor}, {value: 3242, color: colors.blueceruleanColor}]
];
const dataTransport = [

    [{value: 500, color: colors.orangeredColor}, {value: 500, color: colors.blueceruleanColor}],
    [{value: 1000, color: colors.orangeredColor}, {value: 7500, color: colors.blueceruleanColor}],
    [{value: 700, color: colors.orangeredColor}, {value: 9500, color: colors.blueceruleanColor}],
    [{value: 12500, color: colors.orangeredColor}, {value: 1246, color: colors.blueceruleanColor}]

];
const dataTransport1 = [

    [{value: 230, color: colors.orangeredColor}, {value: 500, color: colors.blueceruleanColor}],
    [{value: 4300, color: colors.orangeredColor}, {value: 6900, color: colors.blueceruleanColor}],
    [{value: 7430, color: colors.orangeredColor}, {value: 9500, color: colors.blueceruleanColor}],
    [{value: 12340, color: colors.orangeredColor}, {value: 5436, color: colors.blueceruleanColor}]

];
const dataTransport2 = [

    [{value: 5120, color: colors.orangeredColor}, {value: 500, color: colors.blueceruleanColor}],
    [{value: 1234, color: colors.orangeredColor}, {value: 7578, color: colors.blueceruleanColor}],
    [{value: 534, color: colors.orangeredColor}, {value: 9500, color: colors.blueceruleanColor}],
    [{value: 12500, color: colors.orangeredColor}, {value: 456, color: colors.blueceruleanColor}]

];
const size = {
    margin: {right: 5},
    width: 100,
    height: 100,
};

const StyledText = styled('text')(({theme}) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 16,
    fontWeight: 700,
}));

function PieCenterLabel({children}) {
    const {width, height, left, top} = useDrawingArea();
    return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    );
}
const Data = [
    {label: 'Cưa'},
    {label: 'Xả'},
    {label: 'Xén'},
]
export default function CapabilityChart() {
    const {t} = useTranslation();
    const [selectedButtonProduction, setSelectedButtonProduction] = useState(1);
    const [selectedButtonTransport, setSelectedButtonTransport] = useState(1);
    const [pieChartProduction, setPieChartProduction] = useState(dataProduction[0]);
    const [dataProductions, setDataProductions] = useState(dataProduction);
    const [percentageProduction, setPercentageProduction] = useState(0);
    const [pieChartTransport, setPieChartTransport] = useState(dataTransport[0]);
    const [dataTransports, setDataTransports] = useState(dataTransport);
    const [percentageTransport, setPercentageTransport] = useState(0);

    useEffect(() => {
        const totalValue = pieChartProduction.reduce((acc, curr) => acc + curr.value, 0);
        const calculatedPercentage = (pieChartProduction[0].value / totalValue) * 100;
        const roundedPercentage = Math.round(calculatedPercentage);
        setPercentageProduction(roundedPercentage || 0);
    }, [pieChartProduction]);

    useEffect(() => {
        const totalValue = pieChartTransport.reduce((acc, curr) => acc + curr.value, 0);
        const calculatedPercentage = (pieChartTransport[0].value / totalValue) * 100;
        const roundedPercentage = Math.round(calculatedPercentage);
        setPercentageTransport(roundedPercentage || 0);
    }, [pieChartTransport]);

    function handleChange(event, newValue) {
        if (newValue) {
            const range = Data.findIndex(option => option.label === newValue.label);
            let selectedDataProduction = null;
            let selectedDataTransport = null;
            switch (range) {
                case selectedCase.saw:
                    selectedDataProduction = dataProduction;
                    selectedDataTransport = dataTransport;
                    break;
                case selectedCase.cut:
                    selectedDataProduction = dataProduction1;
                    selectedDataTransport = dataTransport1;
                    break;
                case selectedCase.trim:
                    selectedDataProduction = dataProduction2;
                    selectedDataTransport = dataTransport2;
                    break;
                default:
                    selectedDataProduction = null;
                    selectedDataTransport = null;
            }
            setSelectedButtonProduction(1);
            setSelectedButtonTransport(1);
            if (selectedDataProduction) {
                setPieChartProduction(selectedDataProduction[0]);
                setDataProductions(selectedDataProduction);
                setPieChartTransport(selectedDataTransport[0]);
                setDataTransports(selectedDataTransport);
            }
        }
    }

    const handleButtonProduction = (buttonNumber) => {
        setSelectedButtonProduction(buttonNumber);
        setPieChartProduction(dataProductions[buttonNumber - 1]);
    };

    const handleButtonTransport = (buttonNumber) => {
        setSelectedButtonTransport(buttonNumber);
        setPieChartTransport(dataTransports[buttonNumber - 1]);
    };

    return (
        <Box
            sx={{
                bgcolor: colors.lilywhiteColor,
                // p: 2,
                mt: 2,
                borderRadius: '10px',
            }}
        >

            <Box>
                <Typography sx={{fontSize:'12px'}} fontWeight='bold' textAlign='center'>
                    {t('20/10/2023')}
                </Typography>
                <Box>
                    {/*------------------------------Production Capacity---------------------------------*/}
                    <Grid sx={{ alignItems: 'center', justifyContent: 'center'}}>
                        <Grid item sx={{mt:1}}>
                            <Grid container columnSpacing={ 1 } alignItems='center' justifyContent='center'>
                                <Grid item>
                                    <Typography sx={{fontSize:'12px'}} textAlign='center'>
                                        {t('productionCapacity')}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Autocomplete
                                        options={Data}
                                        sx={{width: '120px', background:colors.whiteColor, borderRadius: '5px'}}
                                        onChange={handleChange}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} label={ t('process') } size='small' />}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid sx={{justifyContent:'center'}} container columnSpacing={1}>
                                <Grid item>
                                    <PieChart series={[{data: pieChartProduction, innerRadius: 30}]} className='pie-size' {...size}>
                                        <PieCenterLabel>{percentageProduction}%</PieCenterLabel>
                                    </PieChart>
                                </Grid>
                                <Grid item>
                                    <Grid container sx={{pt: 2}}>
                                        <Grid item>
                                            <Grid container columnSpacing={1} sx={{mb: 1}}>
                                                {[{id: 1, label: 'S1'}, {id: 2, label: 'S2'}].map(item => (
                                                    <Grid item key={item.id}>
                                                        <Button
                                                            className={selectedButtonProduction === item.id ? 'chart-button selected' : 'chart-button'}
                                                            onClick={() => handleButtonProduction(item.id)}>
                                                            {item.label}
                                                        </Button>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                            <Grid container columnSpacing={1}>
                                                {[{id: 3, label: 'C1'}, {id: 4, label: 'C2'}].map(item => (
                                                    <Grid item key={item.id}>
                                                        <Button
                                                            className={selectedButtonProduction === item.id ? 'chart-button selected' : 'chart-button'}
                                                            onClick={() => handleButtonProduction(item.id)}>
                                                            {item.label}
                                                        </Button>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                            <Grid item sx={{mt: 1}}>
                                                <Grid container columnSpacing={2}>
                                                    <Grid item>
                                                        <Grid container
                                                              sx={{fontSize: '12px', alignItems: 'center'}}>
                                                            <Grid item className="redSquare"></Grid>
                                                            <Grid item sx={{pl: 1}}>{t('manufacture')}</Grid>
                                                        </Grid>
                                                        <Grid container
                                                              sx={{fontSize: '12px', alignItems: 'center'}}>
                                                            <Grid item className="blueSquare"></Grid>
                                                            <Grid item sx={{pl: 1}}>{t('empty')}</Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/*---------------------------------Transportation Capacity-------------------------------------*/}
                    <Grid sx={{alignItems: 'center', justifyContent: 'center', mt: 2}}>
                        <Typography sx={{fontSize:'12px'}} textAlign='center'>
                            {t('transportationCapacity')}
                        </Typography>
                        <Grid sx={{justifyContent:'center'}} container columnSpacing={1}>
                            <Grid item>
                                <Grid item sx={{pt: 2}}>
                                    <Grid container columnSpacing={1} sx={{mb: 1}}>
                                        {[{id: 1, label: 'S1'}, {id: 2, label: 'S2'}].map(item => (
                                            <Grid item key={item.id}>
                                                <Button
                                                    className={selectedButtonTransport === item.id ? 'chart-button selected' : 'chart-button'}
                                                    onClick={() => handleButtonTransport(item.id)}>
                                                    {item.label}
                                                </Button>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Grid container columnSpacing={1}>
                                        {[{id: 3, label: 'C1'}, {id: 4, label: 'C2'}].map(item => (
                                            <Grid item key={item.id}>
                                                <Button
                                                    className={selectedButtonTransport === item.id ? 'chart-button selected' : 'chart-button'}
                                                    onClick={() => handleButtonTransport(item.id)}>
                                                    {item.label}
                                                </Button>
                                            </Grid>
                                        ))}
                                    </Grid>
                                    <Grid item sx={{mt: 1}}>
                                        <Grid container columnSpacing={2} justifyContent='flex-end'>
                                            <Grid item>
                                                <Grid container
                                                      sx={{
                                                          fontSize: '12px',
                                                          alignItems: 'center',
                                                          justifyContent: 'flex-end'
                                                      }}>
                                                    <Grid item sx={{pr: 1}}>{t('transport')}</Grid>
                                                    <Grid item className="redSquare"></Grid>
                                                </Grid>
                                                <Grid container
                                                      sx={{
                                                          fontSize: '12px',
                                                          alignItems: 'center',
                                                          justifyContent: 'flex-end'
                                                      }}>
                                                    <Grid item sx={{pr: 1}}>{t('empty')}</Grid>
                                                    <Grid item className="blueSquare"></Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <PieChart series={[{data: pieChartTransport, innerRadius: 30}]}{...size}>
                                    <PieCenterLabel>{percentageTransport}%</PieCenterLabel>
                                </PieChart>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
