import React, { useEffect, useState } from 'react';
import { Box, TextField, MenuItem, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import colors from '../../../constants/colors';
import Autocomplete from '@mui/material/Autocomplete';
import regex from "../../../constants/regex";
import PolygonIcon from "../../../asset/icon/Polygon.svg";

const SearchFormWorker = ({     listAllWorkerArrange,
                                onSubmit,
                                onClear,
                                flagResetForm
                            }) => {
    const { t } = useTranslation();
    const [workerCode, setWorkerCode] = useState(null);
    const [workerAge, setWorkerAge] = useState(null);
    const [workerName, setWorkerName] = useState("");
    const [yearsExperience, setYearsExperience] = useState("");
    const [workerArrangeId, setWorkerArrangeId] = useState("");
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        const storedState = localStorage.getItem('workersStateSearch');
        if (storedState) {
            const {workerName, workerCode, workerAge, yearsExperience, workerArrangeId } = JSON.parse(storedState);
            setWorkerCode(workerCode);
            setWorkerAge(workerAge);
            setWorkerName(workerName);
            setYearsExperience(yearsExperience);
            setWorkerArrangeId(workerArrangeId);
        }
    }, []);

    useEffect(() => {
        if(workerName || workerCode || workerAge || yearsExperience || workerArrangeId){
            const stateToStore = JSON.stringify({ workerName, workerCode, workerAge, yearsExperience, workerArrangeId });
            localStorage.setItem('workersStateSearch', stateToStore);
        }
    }, [workerName, workerCode, workerAge, yearsExperience, workerArrangeId]);

    const handleSubmit = () => {
        let paramSearch = {
            name: workerName,
            code: workerCode,
            age: workerAge,
            years_experience: yearsExperience,
            worker_arrange_id: workerArrangeId,
        }
        onSubmit(paramSearch)
    };

    const handleClear = () => {
        setWorkerCode("");
        setWorkerAge("");
        setWorkerName("");
        setYearsExperience("");
        setWorkerArrangeId("");
        onClear()
    };

    return (
        <Box component="form" sx={ { bgcolor: '#FFFFFF', p: 2, mt: 2, borderRadius: '10px', position: 'relative' } }>
            <Box
                sx={ {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '8px',
                    background: 'red',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                } }
            />
            <Typography variant="h6" gutterBottom>
                { t('search') }
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
                <TextField value={workerCode} onChange={(e) => setWorkerCode(e.target.value)} label={t("workerCode")} variant="outlined" size='small'/>
                <TextField value={workerName} onChange={(e) => setWorkerName(e.target.value)} label={t("workerName")} variant="outlined" size='small'/>
                <TextField value={workerAge} onChange={(e) => setWorkerAge(e.target.value)} label={t("workerAge")} variant="outlined" size='small'/>
                <TextField
                    value={(clicked ? '>=' : '') + yearsExperience}
                    onFocus={() => setClicked(true)}
                    onBlur={() => setClicked(false)}
                    onChange={(e) => {
                        const newValue = e.target.value.replace(regex.onlyNumber, '');
                        setYearsExperience(newValue);
                    }}
                    onKeyDown={(e) => {
                        if (e.keyCode === 8) {
                            const newValue = yearsExperience.slice(0, -1);
                            setYearsExperience(newValue);
                        }
                    }}
                    label={t("yearsExperience")}
                    variant="outlined"
                    size='small'
                />
                <Autocomplete
                    popupIcon={<PolygonIcon />}
                    size='small'
                    options={listAllWorkerArrange}
                    value={listAllWorkerArrange.find(option => option.id === workerArrangeId) || null}
                    onChange={(event, value) => setWorkerArrangeId(value ? value.id : "")}
                    getOptionLabel={(option) => option.worker_arrange_name}
                    renderInput={(params) => <TextField {...params} label={t("arrange")} variant="outlined" />}
                />

                <Box sx={{ display: 'flex', justifyContent: 'center', gridColumn: 'span 3' }}>
                    <Button onClick={() => {handleSubmit()}} on sx={{ bgcolor: colors.whiteColor, color: colors.blackColor, marginRight: 2, '&:hover': { backgroundColor: colors.blueColor, color: '#FFFFFF' }}} >
                        {t("search")}
                    </Button>
                    <Button onClick={() => {handleClear()}} variant="outlined" sx={{ color: colors.blackColor, borderColor: colors.blackColor}}>
                        {t("delete")}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default SearchFormWorker;
