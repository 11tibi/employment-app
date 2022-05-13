import React from 'react';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DatePicker as BaseDatePicker } from "@mui/lab";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { useController } from "react-hook-form";
import {TextField} from '@mui/material';

const DatePicker = ({ name, control, ...props }) => {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { error }
    } = useController({ name, control });

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <BaseDatePicker
                ref={ref}
                value={value}
                onChange={onChange}
                inputFormat="yyyy-MM-dd"
                views={["year", "month"]}
                renderInput={params => (
                    <TextField
                        {...params}
                        name={name}
                        onBlur={onBlur}
                        error={Boolean(error)}
                        fullWidth
                        helperText={error?.message}
                    />
                )}
                {...props}
            />
        </LocalizationProvider>
    );
};

export default DatePicker;
