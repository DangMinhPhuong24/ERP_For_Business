import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";
import colors from "../../../../constants/colors";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import {useNavigate} from "react-router-dom";
import Grid from "@mui/material/Grid";
import ListOfRelatedCommandsTable from "../../../../components/Table/Production/ListOfRelatedCommandsTable";
import titleTableListOfRelatedCommands from "../../../../constants/titleTableListOfRelatedCommands";
import ChooseMaterialsModal from "../../../../components/Modal/Production/ChooseMaterials";
import MaterialsTable from "../../../../components/Table/Production/MaterialsTable";
import titleTableMaterials from "../../../../constants/titleTableMaterials";
import MaterialsAfterProductionTable from "../../../../components/Table/Production/MaterialsAfterProductionTable";
import titleTableRawMaterialsFormedAfterProduction
    from "../../../../constants/titleTableRawMaterialsFormedAfterProduction";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CapabilityChart from "../../../../components/Chart/Production/CreateWorkOrder/CapabilityChart";
import BasicInformation from "../../../../components/BasicInformation";
import selectedCase from "../../../../constants/selectedCase";

const listOfRelatedCommandsData = [
    {commandCode: 'LSX00012', status: 'Đang chờ sản xuất'},
    {commandCode: 'LSX0001422', status: 'Đang sản xuất'},
    {commandCode: 'LSX00012425', status: 'Đã hoàn thành'},
]

const materialsData = [
    {
        format: 'Cuộn', commodityDode: 'ALC46 Cuộn/CDP\n' +
            '800-K080-YG1\n' +
            '(AL-GH) Decal dán\n' +
            'mặt, keo nóng', size: '53,5 x 383 x1 cuộn', warehouse: 'Kho điều chỉnh',
        quantityLongMeter: 356, cost: '3.000.000', consumableCosts: '50.000'
    }
]
const materialsAfterProductionData = [
    {
        format: 'Cuộn', commodityDode: 'ALC46 Cuộn/CDP\n' +
            '800-K080-YG1\n' +
            '(AL-GH) Decal dán\n' +
            'mặt, keo nóng', size: '53,5 x 383 x1 cuộn', warehouse: 'Kho điều chỉnh',
        quantityLongMeter: 644, estimatedFormationTime: '11:30 23/10/2023'
    }
]
const OrderData = [
    {label: 'DH0001'},
    {label: 'DH0002'},
    {label: 'DH0003'},
    {label: 'DH0004'},
]
const finishedManufactureFormData = [
    {label: 'Dạng tờ'},
    {label: 'Dạng cuộn'},
]
const productionFormData = [
    {label: 'Cưa > Xả > Xén'},
    {label: 'Cưa > Xả'},
    {label: 'Xả > Xén'},
    {label: 'Cưa > Xén'},
]
const sawData = [
    {label: 'Máy cưa 1'},
    {label: 'Máy cưa 2'},
    {label: 'Máy cưa 3'},
]
const cutData = [
    {label: 'Máy xả 1'},
    {label: 'Máy xả 2'},
    {label: 'Máy xả 3'},
]
const trimData = [
    {label: 'Máy xén 1'},
    {label: 'Máy xén 2'},
    {label: 'Máy xén 3'},
]

export default function CreateWorkOrder({open}) {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [isOpenChooseMaterialsModal, setIsOpenChooseMaterialsModal] = useState(false);
    const [productionForm, setProductionForm] = useState(null);

    const handleProductionFormChange = (event, newValue) => {
        setProductionForm(newValue ? productionFormData.findIndex(option => option.label === newValue.label) : null);
    };
    const handleOpenChooseMaterialsModal = () => {
        setIsOpenChooseMaterialsModal(true);
    };
    const handleCloseChooseMaterialsModal = () => {
        setIsOpenChooseMaterialsModal(false);
    }
    function renderAutocompleteOptions(selectedIndex) {
        switch (selectedIndex) {
            case selectedCase.sawCutTrim:
                return (
                    <>
                        <Autocomplete
                            options={sawData}
                            sx={{ width: '214px' }}
                            renderInput={(params) => <TextField {...params} placeholder={t('selectSawMachine')} size='small' />}
                        />
                        <Autocomplete
                            options={cutData}
                            sx={{ width: '214px', mt:1 }}
                            renderInput={(params) => <TextField {...params} placeholder={t('selectCutMachine')} size='small' />}
                        />
                        <Autocomplete
                            options={trimData}
                            sx={{ width: '214px', mt:1 }}
                            renderInput={(params) => <TextField {...params} placeholder={t('selectTrimMachine')} size='small' />}
                        />
                    </>
                );
            case selectedCase.sawCut:
                return (
                    <>
                        <Autocomplete
                            options={sawData}
                            sx={{ width: '214px' }}
                            renderInput={(params) => <TextField {...params} placeholder={t('selectSawMachine')} size='small' />}
                        />
                        <Autocomplete
                            options={cutData}
                            sx={{ width: '214px', mt:1 }}
                            renderInput={(params) => <TextField {...params} placeholder={t('selectCutMachine')} size='small' />}
                        />
                    </>
                );
            case selectedCase.cutTrim:
                return (
                    <>
                        <Autocomplete
                            options={cutData}
                            sx={{ width: '214px' }}
                            renderInput={(params) => <TextField {...params} placeholder={t('selectCutMachine')} size='small' />}
                        />
                        <Autocomplete
                            options={trimData}
                            sx={{ width: '214px', mt:1 }}
                            renderInput={(params) => <TextField {...params} placeholder={t('selectTrimMachine')} size='small' />}
                        />
                    </>
                );
            case selectedCase.sawTrim:
                return (
                    <>
                        <Autocomplete
                            options={sawData}
                            sx={{ width: '214px' }}
                            renderInput={(params) => <TextField {...params} placeholder={t('selectSawMachine')} size='small' />}
                        />
                        <Autocomplete
                            options={trimData}
                            sx={{ width: '214px', mt:1 }}
                            renderInput={(params) => <TextField {...params} placeholder={t('selectTrimMachine')} size='small' />}
                        />
                    </>
                );
            default:
                return null;
        }
    }
    return (
        <Box open={open} sx={{display: 'flex', flexDirection: 'column'}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', p: '0 !important'}}>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                    <Button sx={{bgcolor: colors.whiteColor, color: colors.blackColor, marginRight: 2, p: '8px 20px'}}
                            onClick={() => navigate(-1)}>{t('back')}</Button>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                        {t('createWorkOrder')}
                    </Typography>
                </Box>
            </Toolbar>

            <Box sx={{display: 'flex', flex: 1}}>
                <Box sx={{flex: 2.4, marginRight: 1}}>
                    <Box component="form"
                         sx={{
                             bgcolor: colors.lilywhiteColor,
                             borderRadius: '10px',
                             p: 3,
                             boxShadow: '0px 4px 4px 0px #00000040',
                             position: 'relative',
                             width: 'auto'
                         }}>
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '8px',
                            background: colors.redColor,
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px'
                        }}/>
                        <Typography className='command-creation-page-title' align='center'>
                            {t("basicInformation")}
                        </Typography>
                        <Box sx={{display: 'flex', flex: 1}}>
                            <Box className='basic-info-box' sx={{pr: '12px', flex: 1.8}}>
                                <BasicInformation
                                    data={OrderData}
                                />
                            </Box>
                            <Box sx={{flex: 1}}>
                                <CapabilityChart/>
                            </Box>
                        </Box>
                        {/*----------------------------------------Materials------------------------------------------*/}
                        <Box sx={{mt: 2}}>
                            <Typography className='command-creation-page-title' align='center'>
                                {t("materials")}
                            </Typography>
                            <Grid container columnSpacing={2} justifyContent='center' mt={1}>
                                <Grid item>
                                    <Button
                                        sx={{
                                            bgcolor: colors.silverGreyColor,
                                            color: colors.blueceruleanColor,
                                            fontSize: '12px',
                                            lineHeight: '14.06px',
                                            width: '225px',
                                            height: '30px',
                                            textTransform: 'none',
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        {t('additionalMaterialProcurementRequest')}
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={handleOpenChooseMaterialsModal}
                                            sx={{
                                                bgcolor: colors.silverGreyColor,
                                                color: colors.blueceruleanColor,
                                                fontSize: '12px',
                                                lineHeight: '14.06px',
                                                width: '225px',
                                                height: '30px',
                                                textTransform: 'none',
                                            }}
                                    >
                                        {t('buttonChooseMaterials')}
                                    </Button>
                                    <ChooseMaterialsModal
                                        open={isOpenChooseMaterialsModal}
                                        nameTitle={t('titleChooseMaterials')}
                                        handleClose={handleCloseChooseMaterialsModal}
                                    />
                                </Grid>
                            </Grid>
                            <MaterialsTable
                                titleTable={titleTableMaterials}
                                data={materialsData}
                            />
                        </Box>
                        {/*---------------------------Raw materials formed after production---------------------------*/}
                        <Box sx={{mt: 2}}>
                            <Typography className='command-creation-page-title' align='center'>
                                {t("rawMaterialsFormedAfterProduction")}
                            </Typography>
                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                <MaterialsAfterProductionTable
                                    titleTable={titleTableRawMaterialsFormedAfterProduction}
                                    data={materialsAfterProductionData}
                                />
                            </Box>
                        </Box>
                        {/*-------------------------------------Production process------------------------------------*/}
                        <Box sx={{mt: 2}}>
                            <Typography className='command-creation-page-title' align='center'>
                                {t("productionProcess")}
                            </Typography>
                            <Grid container columnSpacing={2} justifyContent='center' mt={2}>
                                <Grid item>
                                    <Typography sx={{fontSize: '12px', lineHeight: '14.06px'}}>
                                        {t("finishedManufactureForm")}
                                    </Typography>
                                    <Autocomplete
                                        options={finishedManufactureFormData}
                                        sx={{width: '214px'}}
                                        renderInput={(params) => <TextField {...params} placeholder={t('select')}
                                                                            size='small'/>}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography sx={{fontSize: '12px', lineHeight: '14.06px'}}>
                                        {t("productionForm")}
                                    </Typography>
                                    <Autocomplete
                                        options={productionFormData}
                                        sx={{width: '214px'}}
                                        onChange={handleProductionFormChange}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => <TextField {...params} placeholder={t('select')}
                                                                            size='small'/>}
                                    />
                                </Grid>
                                {productionForm === null && (
                                    <>
                                        <Grid item>
                                            <Typography sx={{ fontSize: '12px', lineHeight: '14.06px' }}>
                                                {t("manufactureResources")}
                                            </Typography>
                                            <Autocomplete
                                                options={OrderData}
                                                sx={{width: '214px'}}
                                                disabled
                                                renderInput={(params) => <TextField {...params} placeholder={t('chooseTheProductionMethodFirst')}
                                                                                    size='small'/>}
                                            />
                                        </Grid>
                                    </>
                                )}
                                {productionForm !== null && (
                                    <>
                                        <Grid item>
                                            <Typography sx={{ fontSize: '12px', lineHeight: '14.06px' }}>
                                                {t("manufactureResources")}
                                            </Typography>
                                            {renderAutocompleteOptions(productionForm)}
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                            <Grid container columnSpacing={2} justifyContent='center' mt={2}>
                                <Grid item>
                                    <Typography sx={{fontSize: '12px', lineHeight: '14.06px'}}>
                                        {t("packagingForm")}
                                    </Typography>
                                    <Autocomplete
                                        options={OrderData}
                                        sx={{width: '214px'}}
                                        renderInput={(params) => <TextField {...params}
                                                                            placeholder={t('enterAndSelect')}
                                                                            size='small'/>}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography sx={{fontSize: '12px', lineHeight: '14.06px'}}>
                                        {t("deliveryTime")}
                                    </Typography>
                                    <Grid container columnSpacing={1}>
                                        <Grid item>
                                            <Autocomplete
                                                options={OrderData}
                                                sx={{width: '96px'}}
                                                renderInput={(params) => <TextField {...params} placeholder={t('selectShift')}
                                                                                    size='small'/>}
                                            />
                                        </Grid>
                                        <Grid item>
                                            <Autocomplete
                                                options={OrderData}
                                                sx={{width: '114px'}}
                                                renderInput={(params) => <TextField {...params} placeholder={t('selectDate')}
                                                                                    size='small'/>}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography sx={{fontSize: '12px', lineHeight: '14.06px'}}>
                                        {t("transportForm")}
                                    </Typography>
                                    <Autocomplete
                                        options={OrderData}
                                        sx={{width: '214px'}}
                                        renderInput={(params) => <TextField {...params}
                                                                            placeholder={t('enterAndSelect')}
                                                                            size='small'/>}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{flex: 1.1}}>
                    {/*------------------------------Production order parameters---------------------------------*/}
                    <Box component="form" sx={{
                        bgcolor: colors.lilywhiteColor,
                        borderRadius: '10px',
                        boxShadow: '0px 4px 4px 0px #00000040',
                        position: 'relative',
                        width: 'auto',
                        p: 2
                    }}>
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '8px',
                            background: colors.redColor,
                            borderTopLeftRadius: '10px',
                            borderTopRightRadius: '10px'
                        }}/>
                        <Typography className='command-creation-page-title'>
                            {t("productionOrderParameters")}
                        </Typography>
                        <Grid container columnSpacing={2} sx={{fontSize: '12px !important', mt: 1}}>
                            <Grid item>
                                <Grid>{t("estimatedTimeOfCompletion")}</Grid>
                                <Grid>{t("totalEstimatedCost")}</Grid>
                            </Grid>
                            <Grid item>
                                <Grid sx={{fontSize: '12px', lineHeight: '14.06px', fontWeight: 'bold'}}>
                                    09:00 SA 20/10/2022
                                </Grid>
                                <Grid sx={{fontSize: '12px', lineHeight: '14.06px', fontWeight: 'bold'}}>
                                    18.000.000 VND
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container columnSpacing={2} sx={{fontSize: '12px !important', mt: 1, pl: '65px'}}>
                            <Grid item>
                                <Grid>{t("materials")}</Grid>
                                <Grid>{t("workerSalary")}</Grid>
                                <Grid>{t("machines")}</Grid>
                                <Grid>{t("transports")}</Grid>
                                <Grid>{t("consumption")}</Grid>
                            </Grid>
                            <Grid item>
                                <Grid>5.000.000</Grid>
                                <Grid>10.000.000</Grid>
                                <Grid>1.800.000</Grid>
                                <Grid>1.000.000</Grid>
                                <Grid>50.000</Grid>
                            </Grid>
                        </Grid>
                    </Box>
                    {/*---------------------------------List of related commands---------------------------------*/}
                    <Box
                        sx={{
                            bgcolor: colors.lilywhiteColor,
                            borderRadius: '10px',
                            position: 'relative',
                            boxShadow: '0px 4px 4px 0px #00000040',
                            width: 'auto',
                            p: 2,
                            mt: 1,
                        }}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '8px',
                                background: 'red',
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                            }}
                        />
                        <Typography className='command-creation-page-title'>
                            {t("listOfRelatedCommands")}
                        </Typography>
                        <Grid container alignItems="center" sx={{marginTop: '25px'}}>
                            <ListOfRelatedCommandsTable
                                titleTable={titleTableListOfRelatedCommands}
                                data={listOfRelatedCommandsData}
                            />
                        </Grid>
                    </Box>
                    <Box sx={{display: 'flex', flex: 1, mt: 1}}>
                        <Box sx={{flex: 1, marginRight: 2}}>
                            <Button
                                onClick={() => navigate(-1)}
                                sx={{
                                    bgcolor: colors.lilywhiteColor,
                                    color: colors.redColor,
                                    p: '4px 10px !important',
                                    boxShadow: '0px 4px 4px 0px #00000040',
                                    fontSize: '14px',
                                    lineHeight: '16.41px',
                                    width: '100%',
                                    height: '100%',
                                    textTransform: 'none',
                                }}
                            >
                                {t('cancel')}
                            </Button>
                        </Box>
                        <Box sx={{flex: 1}}>
                            <Button
                                onClick={() => navigate(-1)}
                                sx={{
                                    bgcolor: colors.lilywhiteColor,
                                    color: colors.blueceruleanColor,
                                    p: '4px 10px !important',
                                    boxShadow: '0px 4px 4px 0px #00000040',
                                    fontSize: '14px',
                                    lineHeight: '16.41px',
                                    width: '100%',
                                    height: '100%',
                                    textTransform: 'none',
                                    gap: '8px',
                                    fontWeight: 'bold'
                                }}
                            >
                                {t('createCommand')}
                                <ArrowForwardIcon/>
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}