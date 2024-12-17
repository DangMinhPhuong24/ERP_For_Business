import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import MessageIcon from '@mui/icons-material/Message';
import ErrorIcon from '@mui/icons-material/Error';
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import '../../resource/style/TooltipStyle.css';
import { styled } from '@mui/material';
import colors from '../../constants/colors';
import {useTranslation} from "react-i18next";

export default function PositionedTooltips ({data}) {
    const { t } = useTranslation();
    const LightTooltip = styled( ({ className, ...props }) => (
        <Tooltip {...props} classes= {{ popper: className }}/>
    ) )( ({ theme }) => ({
        [ `& .${ tooltipClasses.tooltip }` ]: {
            backgroundColor: theme.palette.common.white,
            color: colors.semitransparentblackColor,
            boxShadow: theme.shadows[ 4 ],
            fontSize: 12,
            borderRadius: 5,
        },
    }) );

    if (data <= 0) {
        return null;
    }

    return (
        <LightTooltip
            TransitionProps= {{ timeout: 0 }}
            title={
                <Box>
                    <Box sx= {{ display: 'block', alignItems: 'center', color: colors.blackColor }}>
                        <ErrorIcon sx= {{ marginRight: 1, color: colors.redColor, fontSize: '20px' }}/>
                        <span>{data} {t('newComplaint')}</span>
                    </Box>
                </Box>
            }
        >
            <CircleNotificationsIcon sx= {{ color: colors.brightyellowColor, fontSize: '20px', mr:'4px' }}/>
        </LightTooltip>

    );
}
