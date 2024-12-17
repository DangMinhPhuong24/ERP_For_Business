import * as React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';

const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`& .MuiStepConnector-line`]: {
        borderTopStyle: 'dashed',
        borderTopWidth: '1px',
    },
}));

const CustomStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 20,
    height: 20,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.status === 2 && {
        backgroundColor: '#1E88E5',
    }),
    ...(ownerState.status === 3 && {
        backgroundColor: '#4CB050',
    }),
    ...(ownerState.status === 0 && {
        backgroundColor: '#ccc',
        color: '#000',
    }),
}));

function CustomStepIcon({ active, completed, className, status }) {
    return (
        <CustomStepIconRoot ownerState={{ completed, active, status }} className={className}>
        </CustomStepIconRoot>
    );
}

const DashedLine = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '12px',
    borderTopColor: '#BDBDBD',
    borderTopStyle: 'dashed',
    borderTopWidth: '1px',
    width: '35px',
}));

export default function CustomStepper({ steps, activeStep, stepLabels, process }) {
    return (
        <Stepper
            activeStep={activeStep}
            alternativeLabel
            connector={<CustomConnector />}
        >
            {steps.map((label) => (
                <Step key={label} completed={process[label] === 3}>
                    <StepLabel
                        StepIconComponent={(props) =>
                            process[label] === 0 ? <DashedLine /> : <CustomStepIcon {...props} status={process[label]} />
                        }
                    >
                        {process[label] !== 0 && stepLabels[label]}
                    </StepLabel>
                </Step>
            ))}
        </Stepper>
    );
}
