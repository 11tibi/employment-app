import React, {useState} from 'react';
import {Typography, Box, TextField, Grid, InputLabel, MenuItem, Select, Divider} from '@mui/material';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const EducationForm = (props) => {
    const [periodStart, setPeriodStart] = useState(new Date());
    const [periodEnd, setPeriodEnd] = useState(new Date());

    return (
        <>
            <Grid item xs={12}>
                <TextField required label="Nivel studii"
                           fullWidth={true} {...props.register(`level_of_education${props.key}`)}/>
            </Grid>
            <Grid item xs={12}>
                <TextField required label="Domeniu de studiu"
                           fullWidth={true} {...props.register(`field_of_study`)}/>
            </Grid>
            <Grid item xs={12}>
                <TextField required label="Numele institutiei"
                           fullWidth={true} {...props.register(`institution_name`)}/>
            </Grid>
            <Grid item xs={12}>
                <TextField required label="Locatie"
                           fullWidth {...props.register("location")}/>
            </Grid>
            <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Inceput la"
                        inputFormat="yyyy-MM"
                        views={['year', 'month']}
                        value={periodStart}
                        onChange={(newDate) => {
                            setPeriodStart(newDate)
                        }}
                        renderInput={(params) =>
                            <TextField {...params} fullWidth required {...props.register("period_start")} />
                        }
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="Terminat la"
                        inputFormat="yyyy-MM"
                        views={['year', 'month']}
                        value={periodEnd}
                        onChange={(newDate) => {
                            setPeriodEnd(newDate)
                        }}
                        renderInput={(params) =>
                            <TextField {...params} fullWidth required {...props.register("period_end")} />
                        }
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
                <Divider/>
            </Grid>
        </>
    )
}

const Education = (props) => {
    const [count, setCount] = useState(1);

    return (
        <>
            <Grid item xs={12}>
                <Typography variant='subtitle1'>
                    Experienţa de muncă
                </Typography>
            </Grid>
            {[...Array(count)].map((e, i) => {
                return <EducationForm register={props.register} key={i}/>
            })}
        </>
    )
}

export default Education;
