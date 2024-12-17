import React from 'react';
import { Typography, Box } from '@mui/material';
import {useTranslation} from "react-i18next";
import colors from "../../constants/colors";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


const Error404 = () => {
    const { t } = useTranslation();
    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <SentimentVeryDissatisfiedIcon sx={{ width: '200px', height: '200px',color: colors.greyColor, marginTop:'40px'}}/>
                <Typography sx={{fontSize:'20px',color: colors.redColor}}>404 - PAGE NOT FOUND</Typography>
                <Typography sx={{ fontSize: '20px' }}>{t('ourSiteCannotBeOpenedOnMobileVersion')}</Typography>
            </div>
        </Box>
    );
}

export default Error404;
