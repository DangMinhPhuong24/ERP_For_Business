import React, {useEffect} from "react"
import {useDispatch} from "react-redux";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import colors from "../../../constants/colors";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import DateRangePicker from "../../../components/DateTime/DateRangePicker";
import PolygonIcon from "../../../asset/icon/Polygon.svg";

const redStyleBox = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '8px',
    background: 'red',
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
}
const dataAllMaterial = [
    {label: 'Tên NVL số 1'},
    {label: 'Tên NVL số 2'},
    {label: 'Tên NVL số 3'},
    {label: 'Tên NVL số 4'},
    {label: 'Tên NVL số 5'},
    {label: 'Tên NVL số 6'},
]
const machineNameData = [
    {label: 'Máy cưa 1'},
    {label: 'Máy cưa 2'},
    {label: 'Máy xả 1'},
    {label: 'Máy xả 2'},
    {label: 'Máy xén 1'},
    {label: 'Máy xén 2'},
]
const processData = [
    {label: 'Cưa'},
    {label: 'Xả'},
    {label: 'Xén'}
]
const shiftData = [
    {label: 'S1'},
    {label: 'S2'},
    {label: 'C1'},
    {label: 'C2'},
]
export default function ManageProductionParametersPage() {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    return (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Box sx={{display: 'flex', marginBottom: 1, alignItems: 'center'}}>
                <Button
                    sx={{
                        bgcolor: colors.whiteColor,
                        color: colors.blackColor,
                        marginRight: 2,
                        p: "8px 20px"
                    }}
                    onClick={() => navigate(-1)}
                >
                    {t("back")}
                </Button>
                <Typography variant="h6" sx={{fontWeight: 'bold', mr: 2}} className="textConFig">
                    {t("manufactureParameters")}
                </Typography>
                <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                    <DateRangePicker/>
                </Typography>
            </Box>
            <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 8px',}}>
                {/*------------------------------------------ROW ONE------------------------------------------*/}
                <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',}}>
                    <Box sx={{bgcolor: colors.lilywhiteColor, borderRadius: '10px', position: 'relative'}}>
                        <Box sx={redStyleBox}/>
                        <Box p={1} pt={2}>
                            <Typography className="command-creation-page-title">
                                {t("Standard Time")}
                            </Typography>
                            <Typography sx={{
                                fontSize: '10px',
                                textDecoration: 'underline',
                                fontStyle: 'italic',
                                wordWrap: 'break-word'
                            }}>
                                {t("averageNumberOfSecondsToProduceMeterLongByStage")}
                            </Typography>
                            <Typography sx={{fontSize: '24px', lineHeight: '28.13px', textAlign: 'center', pt: 5}}>
                                <Typography variant='span' style={{
                                    fontSize: '40px',
                                    fontWeight: 'bold',
                                    lineHeight: '46.88px'
                                }}>{t(3)}</Typography>s
                            </Typography>
                            <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', alignItems:'center', width:'260px'}}>
                                <Box>
                                    <Typography sx={{fontSize: '10px'}}>
                                        {t("materials")}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Autocomplete
                                        popupIcon={<PolygonIcon />}
                                        sx={{width: '159px', borderRadius: '5px'}}
                                        size='small'
                                        options={dataAllMaterial}
                                        // value={dataProvince.find(option => option.id === provinceId) || null}
                                        // onChange={(event, value) => onChangeProvinceSelect(value ? value.id : "")}
                                        renderInput={(params) => <TextField {...params} label={t("Toàn bộ")}
                                                                            variant="outlined"
                                        />}
                                    />
                                </Box>
                                <Box>
                                    <Typography sx={{fontSize: '10px'}}>
                                        {t("machineName")}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Autocomplete
                                        sx={{width: '159px', borderRadius: '5px'}}
                                        size='small'
                                        options={machineNameData}
                                        // value={dataProvince.find(option => option.id === provinceId) || null}
                                        // onChange={(event, value) => onChangeProvinceSelect(value ? value.id : "")}
                                        renderInput={(params) => <TextField {...params} label={t("Toàn bộ")}
                                                                            variant="outlined"/>}
                                    />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{bgcolor: colors.lilywhiteColor, borderRadius: '10px', position: 'relative'}}>
                        <Box sx={redStyleBox}/>
                        <Box p={1} pt={2}>
                            <Typography className="command-creation-page-title">
                                {t("Change-Over Time")}
                            </Typography>
                            <Typography sx={{
                                fontSize: '10px',
                                textDecoration: 'underline',
                                fontStyle: 'italic',
                                wordWrap: 'break-word'
                            }}>
                                {t("averageManufactureWaitingMinutesBetweenStages")}
                            </Typography>
                            <Typography sx={{fontSize: '24px', lineHeight: '28.13px', textAlign: 'center', pt: 5}}>
                                <Typography variant='span' style={{
                                    fontSize: '40px',
                                    fontWeight: 'bold',
                                    lineHeight: '46.88px'
                                }}>3</Typography>p
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',}}>
                    <Box sx={{bgcolor: colors.lilywhiteColor, borderRadius: '10px', position: 'relative'}}>
                        <Box sx={redStyleBox}/>
                        <Box p={1} pt={2}>
                            <Typography className="command-creation-page-title">
                                {t("Interruption Time")}
                            </Typography>
                            <Typography sx={{
                                fontSize: '10px',
                                textDecoration: 'underline',
                                fontStyle: 'italic',
                                wordWrap: 'break-word'
                            }}>
                                {t("averageMinutesOfInterruptionDuringEmergencyOrders")}
                            </Typography>
                            <Typography sx={{fontSize: '24px', lineHeight: '28.13px', textAlign: 'center', pt: 5}}>
                                <Typography variant='span' style={{
                                    fontSize: '40px',
                                    fontWeight: 'bold',
                                    lineHeight: '46.88px'
                                }}>15</Typography>p
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{bgcolor: colors.lilywhiteColor, borderRadius: '10px', position: 'relative'}}>
                        <Box sx={redStyleBox}/>
                        <Box p={1} pt={2}>
                            <Typography className="command-creation-page-title">
                                {t("Waste Time")}
                            </Typography>
                            <Typography sx={{
                                fontSize: '10px',
                                textDecoration: 'underline',
                                fontStyle: 'italic',
                                wordWrap: 'break-word'
                            }}>
                                {t("averageNumberOfMinutesWaitingBetweenTwoWorkOrders")}
                            </Typography>
                            <Typography sx={{fontSize: '24px', lineHeight: '28.13px', textAlign: 'center', pt: 5}}>
                                <Typography variant='span' style={{
                                    fontSize: '40px',
                                    fontWeight: 'bold',
                                    lineHeight: '46.88px'
                                }}>8</Typography>p
                            </Typography>
                        </Box>
                    </Box>
                </Box>
                {/*------------------------------------------ROW TWO------------------------------------------*/}
                <Box sx={{bgcolor: colors.lilywhiteColor, borderRadius: '10px', position: 'relative'}}>
                    <Box sx={redStyleBox}/>
                    <Box p={1} pt={2}>
                        <Typography className="command-creation-page-title">
                            {t("transportationCostsOverOneKm")}
                        </Typography>
                        <Typography sx={{
                            fontSize: '10px',
                            textDecoration: 'underline',
                            fontStyle: 'italic',
                            wordWrap: 'break-word'
                        }}>
                            {t("averageForTransportingOverOneKmOfTravel")}
                        </Typography>
                        <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', pt: 5, gap:'0 64px'}}>
                            <Box>
                                <Typography sx={{fontSize: '24px', lineHeight: '28.13px', textAlign: 'center'}}>
                                    <Typography variant='span' style={{
                                        fontSize: '40px',
                                        fontWeight: 'bold',
                                        lineHeight: '46.88px'
                                    }}>15.000</Typography>VND
                                </Typography>
                                <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', alignItems:'center', width:'260px'}}>
                                    <Box>
                                        <Typography sx={{fontSize: '10px'}}>
                                            {t("route")}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Autocomplete
                                            sx={{width: '159px', borderRadius: '5px'}}
                                            size='small'
                                            options={dataAllMaterial}
                                            // value={dataProvince.find(option => option.id === provinceId) || null}
                                            // onChange={(event, value) => onChangeProvinceSelect(value ? value.id : "")}
                                            renderInput={(params) => <TextField {...params} label={t("Toàn bộ")}
                                                                                variant="outlined"
                                            />}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: '10px'}}>
                                            {t("shippingShift")}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Autocomplete
                                            sx={{width: '159px', borderRadius: '5px'}}
                                            size='small'
                                            options={shiftData}
                                            // value={dataProvince.find(option => option.id === provinceId) || null}
                                            // onChange={(event, value) => onChangeProvinceSelect(value ? value.id : "")}
                                            renderInput={(params) => <TextField {...params} label={t("Toàn bộ")}
                                                                                variant="outlined"/>}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap:'0 16px', alignItems:'center', width:'180px'}}>
                                    <Box pb={1}>
                                        <Typography
                                            sx={{fontSize: '10px', textDecoration: 'underline', fontStyle: 'italic'}}>
                                            {t("detailedCosts")}
                                        </Typography>
                                    </Box>
                                    <Box></Box>
                                    <Box>
                                        <Typography sx={{fontSize: '10px'}}>
                                            {t("gasolinePrices")}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: '10px', fontWeight: 'bold'}}>
                                            5.000
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: '10px'}}>
                                            {t("driverSalary")}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: '10px', fontWeight: 'bold'}}>
                                            10.000
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',}}>
                    <Box sx={{bgcolor: colors.lilywhiteColor, borderRadius: '10px', position: 'relative'}}>
                        <Box sx={redStyleBox}/>
                        <Box p={1} pt={2}>
                            <Typography className="command-creation-page-title">
                                {t("Circle Time")}
                            </Typography>
                            <Typography sx={{
                                fontSize: '10px',
                                textDecoration: 'underline',
                                fontStyle: 'italic',
                                wordWrap: 'break-word'
                            }}>
                                {t("averagePerOrder")}
                            </Typography>
                            <Typography sx={{fontSize: '24px', lineHeight: '28.13px', textAlign: 'center', pt: 5}}>
                                <Typography variant='span' style={{
                                    fontSize: '40px',
                                    fontWeight: 'bold',
                                    lineHeight: '46.88px'
                                }}>48</Typography>p
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{bgcolor: colors.lilywhiteColor, borderRadius: '10px', position: 'relative'}}>
                        <Box sx={redStyleBox}/>
                        <Box p={1} pt={2}>
                            <Typography className="command-creation-page-title">
                                {t("consumptionRate")}
                            </Typography>
                            <Typography sx={{
                                fontSize: '10px',
                                textDecoration: 'underline',
                                fontStyle: 'italic',
                                wordWrap: 'break-word'
                            }}>
                                {t("averageRateOfRawMaterialsConsumedWhenProducingOneMeterLong")}
                            </Typography>
                            <Typography sx={{fontSize: '24px', lineHeight: '28.13px', textAlign: 'center', pt: 5}}>
                                <Typography variant='span' style={{
                                    fontSize: '40px',
                                    fontWeight: 'bold',
                                    lineHeight: '46.88px'
                                }}>2</Typography>%
                            </Typography>
                            <Grid container columnSpacing={2} alignItems='center' mt={2}>
                                <Grid item>
                                    <Typography sx={{fontSize: '10px'}}>
                                        {t("materials")}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Autocomplete
                                        sx={{width: '159px', borderRadius: '5px'}}
                                        size='small'
                                        options={dataAllMaterial}
                                        // value={dataProvince.find(option => option.id === provinceId) || null}
                                        // onChange={(event, value) => onChangeProvinceSelect(value ? value.id : "")}
                                        renderInput={(params) => <TextField {...params} label={t("Toàn bộ")}
                                                                            variant="outlined"/>}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
                {/*------------------------------------------ROW THREE------------------------------------------*/}
                <Box sx={{bgcolor: colors.lilywhiteColor, borderRadius: '10px', position: 'relative'}}>
                    <Box sx={redStyleBox}/>
                    <Box p={1} pt={2}>
                        <Typography className="command-creation-page-title">
                            {t("averageManufactureCosts")}
                        </Typography>
                        <Typography sx={{
                            fontSize: '10px',
                            textDecoration: 'underline',
                            fontStyle: 'italic',
                            wordWrap: 'break-word'
                        }}>
                            {t("toManufactureOneMeterLongRawMaterials")}
                        </Typography>
                        <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', pt: 5, gap:'0 64px'}}>
                            <Box>
                                <Typography sx={{fontSize: '24px', lineHeight: '28.13px', textAlign: 'center'}}>
                                    <Typography variant='span' style={{
                                        fontSize: '40px',
                                        fontWeight: 'bold',
                                        lineHeight: '46.88px'
                                    }}>300.000</Typography>VND
                                </Typography>
                                <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', alignItems:'center', width:'260px'}}>
                                    <Box>
                                        <Typography sx={{fontSize: '10px'}}>
                                            {t("materials")}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Autocomplete
                                            sx={{width: '159px', borderRadius: '5px'}}
                                            size='small'
                                            options={dataAllMaterial}
                                            // value={dataProvince.find(option => option.id === provinceId) || null}
                                            // onChange={(event, value) => onChangeProvinceSelect(value ? value.id : "")}
                                            renderInput={(params) => <TextField {...params} label={t("Toàn bộ")}
                                                                                variant="outlined"
                                            />}
                                        />
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: '10px'}}>
                                            {t("process")}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Autocomplete
                                            sx={{width: '159px', borderRadius: '5px'}}
                                            size='small'
                                            options={dataAllMaterial}
                                            // value={dataProvince.find(option => option.id === provinceId) || null}
                                            // onChange={(event, value) => onChangeProvinceSelect(value ? value.id : "")}
                                            renderInput={(params) => <TextField {...params} label={t("Toàn bộ")}
                                                                                variant="outlined"/>}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr',gap:' 0, 16px', alignItems:'center', width:'180px'}}>
                                    <Box pb={1}>
                                        <Typography
                                            sx={{fontSize: '10px', textDecoration: 'underline', fontStyle: 'italic'}}>
                                            {t("detailedCosts")}
                                        </Typography>
                                    </Box>
                                    <Box></Box>
                                    <Box>
                                        <Typography sx={{fontSize: '10px'}}>
                                            {t("materials")}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: '10px', fontWeight: 'bold'}}>
                                            100.000
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: '10px'}}>
                                            {t("worker")}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: '10px', fontWeight: 'bold'}}>
                                            150.000
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: '10px'}}>
                                            {t("machines")}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography sx={{fontSize: '10px', fontWeight: 'bold'}}>
                                            50.000
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',}}>
                    <Box sx={{bgcolor: colors.lilywhiteColor, borderRadius: '10px', position: 'relative'}}>
                        <Box sx={redStyleBox}/>
                        <Box p={1} pt={2}>
                            <Typography className="command-creation-page-title">
                                {t("temperature")}
                            </Typography>
                            <Typography sx={{fontSize: '10px', textDecoration: 'underline', fontStyle: 'italic'}}>
                                {t("present")}
                            </Typography>
                            <Typography sx={{fontSize: '24px', lineHeight: '28.13px', textAlign: 'center', pt: 5}}>
                                <Typography variant='span' style={{
                                    fontSize: '40px',
                                    fontWeight: 'bold',
                                    lineHeight: '46.88px'
                                }}>29</Typography>°C
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{bgcolor: colors.lilywhiteColor, borderRadius: '10px', position: 'relative'}}>
                        <Box sx={redStyleBox}/>
                        <Box p={1} pt={2}>
                            <Typography className="command-creation-page-title">
                                {t("humidity")}
                            </Typography>
                            <Typography sx={{fontSize: '10px', textDecoration: 'underline', fontStyle: 'italic'}}>
                                {t("present")}
                            </Typography>
                            <Typography sx={{fontSize: '24px', lineHeight: '28.13px', textAlign: 'center', pt: 5}}>
                                <Typography variant='span' style={{
                                    fontSize: '40px',
                                    fontWeight: 'bold',
                                    lineHeight: '46.88px'
                                }}>59</Typography>%
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
