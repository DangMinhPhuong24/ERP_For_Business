import React from 'react';
import { Typography, Box } from '@mui/material';
import assets from "../../asset";
import ErrorIcon from '@mui/icons-material/Error';
import {useTranslation} from "react-i18next";
import colors from "../../constants/colors";

const ErrorView = ({errorCode}) => {
    const { t } = useTranslation();
    const errorMessages = {
        429: {
            title: '429 - Too many requests!',
            description: t('wereSorryButYouNotVeSentTooManyRequestsToTheServerInAShortPeriodOfTime'),
        },
        403: {
            title: '403 - Forbidden!',
            description: t('youDoNotHavePermissionToOperateOnThisScreen'),
        }
    };

    const error = errorMessages[errorCode] || {
        title: 'An error occurred',
        description: t('somethingWentWrong'),
    };

    return (
        <Box sx={{
            top: '50%',
            left: '50%',
            textAlign: 'center',
        }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:'125px'}}>
                <img
                    src={assets.images.logo}
                    alt="Logo"
                    style={{
                        width: '200px',
                        height: '200px',
                    }}
                />
            </div>
            <ErrorIcon sx={{ width: '100px', height: '100px',color: colors.redColor, marginTop:'40px'}}/>
            <Typography sx={{fontSize:'50px',color: colors.redColor}}>{error.title}</Typography>
            <Typography sx={{fontSize: '20px', whiteSpace: 'nowrap',marginTop:'40px',marginBottom:'20px'}}>
                {error.description}
            </Typography>
            <hr style={{
                width: '1000px',
                height: '0px',
                border: 'none',
                borderTop: '1px solid #000',
                margin: 'auto',
            }} />
            <Typography sx={{fontSize:'20px',fontStyle: 'italic',marginTop: '20px',}}>{t('pleaseTryAgainLater')}</Typography>
        </Box>
    );
}

export default ErrorView;
