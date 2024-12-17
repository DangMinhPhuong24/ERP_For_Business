import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    rectangle: {
        width: '100px',
        height: '29px',
        display: 'flex',
        position: 'relative',
    },
    redPart: {
        backgroundColor: '#F1511B',
    },
    bluePart: {
        backgroundColor: '#4369C5',
    },
    textContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontStyle:'italic',
        fontSize:'12px',
    }
}));

export default function CustomChart({ redPercentage, bluePercentage, label }) {
    const classes = useStyles();

    return (
        <div className={classes.rectangle}>
            <div className={classes.redPart} style={{ width: `${redPercentage}%`, height: '100%' }}></div>
            <div className={classes.bluePart} style={{ width: `${bluePercentage}%`, height: '100%' }}></div>
            <div className={classes.textContainer}>
                <span className={classes.text}>{label}</span>
            </div>
        </div>
    );
}
