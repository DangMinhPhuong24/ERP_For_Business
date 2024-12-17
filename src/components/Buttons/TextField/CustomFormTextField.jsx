import React from 'react';
import { Box, InputLabel, TextField } from '@mui/material';

const CustomTextField = ({
                             label,
                             value,
                             onChange,
                             placeholder = "",
                             inputProps,
                             inputSize = 'small',
                             required = false,
                             labelClassName,
                             rows,
                             ...rest
                         }) => {
    return (
        <Box>
            <InputLabel
                required={required}
                className={labelClassName}
            >
                {label}
            </InputLabel>
            <TextField
                fullWidth
                InputProps={{
                    sx: {
                        fontSize: '12px',
                        lineHeight: '15.18px',
                    },
                    classes: {
                        root: 'custom-input-search',
                    },
                    ...inputProps,
                }}
                value={value}
                onChange={onChange}
                variant="outlined"
                size={inputSize}
                placeholder={placeholder}
                multiline={Boolean(rows)}
                rows={rows}
                {...rest}
            />
        </Box>
    );
};

export default CustomTextField;
