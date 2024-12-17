import React, {useCallback, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import '../../../../resource/style/ChooseMaterialsModalStyle.css';
import {useTranslation} from 'react-i18next';
import {useDispatch} from "react-redux";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import {Grid} from "@mui/material";
import colors from "../../../../constants/colors";
import ChooseMaterialsTable from "../../../Table/Production/ChooseMaterialsTable";
import titleTableChooseMaterials from "../../../../constants/titleTableChooseMaterials";

const data=[
    {id:1, mahang:'ALC46 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'53,5 x 383 x 1 Cuộn', quantity:15430, status: 'Sẵn sàng', provisionalFee: 10, percent: 1, checked:false},
    {id:2, mahang:'BCK849 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'23,5 x 321 x 1 Cuộn', quantity:5211, status: 'Sẵn sàng', provisionalFee: 100, percent: 2, checked:false},
    {id:3, mahang:'UKO039 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'54,5 x 324 x 1 Cuộn', quantity:4324, status: 'Sẵn sàng', provisionalFee: 200, percent: 5, checked:false},
    {id:4, mahang:'DKL383 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'87,5 x 654 x 1 Cuộn', quantity:10094, status: 'Sẵn sàng', provisionalFee: 10, percent: 1, checked:false},
    {id:5, mahang:'ALC46 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'87,5 x 654 x 1 Cuộn', quantity:1000, status: 'Sẵn sàng', provisionalFee: 10, percent: 1, checked:false},
    {id:6, mahang:'BCK849 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'52,5 x 383 x 1 Cuộn', quantity:4441, status: 'Sẵn sàng', provisionalFee: 100, percent: 2, checked:false},
    {id:7, mahang:'UKO039 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'53,5 x 383 x 1 Cuộn', quantity:1384, status: 'Sẵn sàng', provisionalFee: 200, percent: 5, checked:false},
    {id:8, mahang:'DKL383 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'53,5 x 383 x 1 Cuộn', quantity:1094, status: 'Sẵn sàng', provisionalFee: 10, percent: 1, checked:false},
    {id:9, mahang:'ALC46 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'43,5 x 383 x 1 Cuộn', quantity:1500, status: 'Sẵn sàng', provisionalFee: 10, percent: 1, checked:false},
    {id:10, mahang:'BCK849 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'53,5 x 383 x 1 Cuộn', quantity:54278, status: 'Sẵn sàng', provisionalFee: 100, percent: 2, checked:false},
    {id:11, mahang:'UKO039 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'13,5 x 383 x 1 Cuộn', quantity:47854, status: 'Sẵn sàng', provisionalFee: 200, percent: 5, checked:false},
    {id:12, mahang:'DKL383 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'53,5 x 383 x 1 Cuộn', quantity:12444, status: 'Sẵn sàng', provisionalFee: 10, percent: 1, checked:false},
    {id:13, mahang:'ALC46 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'53,5 x 353 x 1 Cuộn', quantity:10500, status: 'Sẵn sàng', provisionalFee: 10, percent: 1, checked:false},
    {id:14, mahang:'BCK849 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'53,5 x 383 x 1 Cuộn', quantity:57841, status: 'Sẵn sàng', provisionalFee: 100, percent: 2, checked:false},
    {id:15, mahang:'UKO039 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'53,5 x 382 x 1 Cuộn', quantity:4572, status: 'Sẵn sàng', provisionalFee: 200, percent: 5, checked:false},
    {id:16, mahang:'DKL383 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'53,5 x 383 x 1 Cuộn', quantity:45724, status: 'Sẵn sàng', provisionalFee: 10, percent: 1, checked:false},
    {id:17, mahang:'ALC46 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'53,5 x 383 x 1 Cuộn', quantity:45721, status: 'Sẵn sàng', provisionalFee: 10, percent: 1, checked:false},
    {id:18, mahang:'BCK849 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'53,5 x 383 x 1 Cuộn', quantity:45752, status: 'Sẵn sàng', provisionalFee: 100, percent: 2, checked:false},
    {id:19, mahang:'UKO039 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'53,5 x 363 x 1 Cuộn', quantity:76733, status: 'Sẵn sàng', provisionalFee: 200, percent: 5, checked:false},
    {id:20, mahang:'DKL383 Cuộn/CDP800-K080-YG1 (AL-GH)\n' +
            'Decal dán mặt, keo nóng', size:'53,5 x 83 x 1 Cuộn', quantity:4345, status: 'Sẵn sàng', provisionalFee: 10, percent: 1, checked:false},

]
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: '900px',
    width: 'max-content',
    maxHeight: '800px',
    bgcolor: 'background.paper',
    borderRadius: '5px',
    p: 2,
    overflow: 'auto',
    padding: '20px',
};

export default function ChooseMaterialsModal({open, handleClose, nameTitle,}) {
    const {t} = useTranslation();
    const [valueTabs, setValueTabs] = useState('1');
    const [searchValue, setSearchValue] = useState('');
    const [arrayDataSearch, setArrayDataSearch] = useState([]);
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        setArrayDataSearch(data);
    }, [open]);
    // useEffect(() => {
    //     sortData(); // Sort data whenever checkedItems changes
    // }, [checkedItems]);
    const handleSearch = useCallback(() => {
        let result = data.filter(item => item.mahang.toLowerCase().includes(searchValue.toLowerCase()));
        if (result.length === 0) {
            result = [];
        }
        setArrayDataSearch(result);
    }, [searchValue]);

    const handleClearSearch = () => {
        setSearchValue('');
        const newCheckedItems = {};
        data.forEach(item => {
            newCheckedItems[item.id] = checkedItems[item.id] || false;
        });
        setCheckedItems(newCheckedItems);
        const checkedIds = Object.entries(checkedItems)
            .filter(([id, isChecked]) => isChecked)
            .map(([id]) => parseInt(id));

        const sortedData = [...data].sort((a, b) => {
            const aChecked = checkedIds.includes(a.id);
            const bChecked = checkedIds.includes(b.id);

            if (aChecked && !bChecked) return -1;
            if (!aChecked && bChecked) return 1;
            return 0;
        });

        setArrayDataSearch(sortedData);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleChangeTabs = (event, newValueTabs) => {
        setValueTabs(newValueTabs);
    }
    const handleCheckboxChange = useCallback((id) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    }, []);
    const handleSubmit = () => {

    }
    const handleCloseModal = () => {
        handleClose();
    }

    return (
        <>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleCloseModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Box sx={style} className="order-container">
                    <Typography variant="h6" component="p" className="order-title" sx={{fontSize:'20px !important'}}>
                        {nameTitle}
                    </Typography>
                    <TabContext value={valueTabs}>
                        <Box className="tab-wrapper">
                            <TabList
                                onChange={handleChangeTabs}
                                className="tab-list"
                            >
                                <Tab className="button-tab-materials" label={
                                    <Grid container columnSpacing={2}>
                                        <Grid item>
                                            <Typography variant="span">
                                                {t('finishedWarehouse')}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="span" sx={{color: colors.redColor}}>
                                                12
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                } value="1"/>
                                <Tab className="button-tab-materials" label={
                                    <Grid container columnSpacing={2}>
                                        <Grid item>
                                            <Typography variant="span">
                                                {t('singleRollWarehouse')}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="span" sx={{color: colors.redColor}}>
                                                2
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }/>
                                <Tab className="button-tab-materials" label={
                                    <Grid container columnSpacing={2}>
                                        <Grid item>
                                            <Typography variant="span">
                                                {t('adjustmentWarehouse')}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="span" sx={{color: colors.redColor}}>
                                                1
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }/>
                                <Tab className="button-tab-materials" label={
                                    <Grid container columnSpacing={2}>
                                        <Grid item>
                                            <Typography variant="span">
                                                {t('rawRollWarehouse')}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="span" sx={{color: colors.redColor}}>
                                                8
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                }/>
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <Box sx={{display:'flex', justifyContent:'center'}}>
                                <TextField
                                    id="outlined-basic" placeholder={t('search')} size="small" fullWidth
                                    style={{width: '272px'}}
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    InputProps={{
                                        endAdornment: (
                                            <React.Fragment>
                                                {searchValue && (
                                                    <IconButton onClick={handleClearSearch}>
                                                        <ClearIcon/>
                                                    </IconButton>
                                                )}
                                                <IconButton onClick={handleSearch}>
                                                    <SearchIcon/>
                                                </IconButton>
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            </Box>
                            <ChooseMaterialsTable
                                titleTable={titleTableChooseMaterials}
                                data={arrayDataSearch}
                                checkedItems={checkedItems}
                                handleCheckboxChange={handleCheckboxChange}
                            />
                            <Box sx= {{ display: 'flex', justifyContent: 'center', mt: 3, alignItems: 'center' }}>
                                <Button variant="outlined" onClick={handleCloseModal} className="cancelButton">
                                    {t("cancel")}
                                </Button>
                                <Button onClick={handleSubmit} variant="contained" className="confirmButton">
                                    {t("confirm")}
                                </Button>
                            </Box>
                        </TabPanel>
                    </TabContext>
                </Box>
            </Modal>
        </>
    );
}
