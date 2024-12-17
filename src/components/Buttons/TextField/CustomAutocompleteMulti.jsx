import React from 'react';
import { Box, InputLabel, TextField, Autocomplete, Checkbox } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const CustomAutocompleteMulti = ({
                                     label,
                                     value,
                                     onChange,
                                     options = [],
                                     placeholder = "",
                                     getOptionLabel,
                                     renderOptionLabel,
                                     inputSize = 'small',
                                     ChipProps = {},
                                     required = false,
                                     labelClassName,
                                     ...rest
                                 }) => {
    return (
        <Box>
            <InputLabel  required={required}  className={labelClassName} >{label}</InputLabel>
            <Autocomplete
                value={value}
                onChange={onChange}
                multiple
                size={inputSize}
                options={options}
                disableCloseOnSelect
                getOptionLabel={getOptionLabel}
                renderOption={(props, option, { selected }) => (
                    <li {...props}>
                        <Checkbox
                            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                            checkedIcon={<CheckBoxIcon fontSize="small" />}
                            style={{ marginRight: 8, fontSize: '12px' }}
                            checked={selected}
                        />
                        {renderOptionLabel(option)}
                    </li>
                )}
                style={{ width: '100%', borderRadius: '10px' }}
                ChipProps={{
                    style: { height: 'auto' },
                    ...ChipProps,
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '10px',
                            },
                        }}
                        placeholder={value.length ? '' : placeholder}
                    />
                )}
                {...rest}
            />
        </Box>
    );
};

export default CustomAutocompleteMulti;
