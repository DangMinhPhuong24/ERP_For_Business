import React from 'react';
import { Box, InputLabel, TextField, Autocomplete } from '@mui/material';
import PolygonIcon from '../../../asset/icon/Polygon.svg';

const CustomAutocomplete = ({
                                label,
                                value,
                                onChange,
                                options = [],
                                placeholder = "",
                                getOptionLabel,
                                noOptionsText,
                                inputProps,
                                required = false,
                                inputSize = 'small',
                                labelClassName,
                                ...rest
                            }) => {
    return (
        <Box>
            <InputLabel required={required}  className={labelClassName} >{label}</InputLabel>
            <Autocomplete
                popupIcon={<PolygonIcon />}
                size={inputSize}
                options={options}
                value={options.find(option => option.id === value) || null}
                onChange={(event, value) => onChange(value ? value.id : "")}
                getOptionLabel={getOptionLabel}
                noOptionsText={noOptionsText}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" placeholder={placeholder} {...inputProps} />
                )}
                classes={{ inputRoot: 'custom-input-search' }}
                {...rest}
            />
        </Box>
    );
};

export default CustomAutocomplete;
