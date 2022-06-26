import React from 'react';
import {TextField, Grid, Button, Divider} from '@mui/material';
import {useForm} from "react-hook-form";
import DatePicker from "../../date_picker/DatePicker";
import AxiosInstance from "../../../utils/AxiosApi";

const initialValues = {
    job_title: '',
    company_name: '',
    location: '',
    period_start: '',
    period_end: '',
}

const ExperienceForm = ({initialData = initialValues, ...props}) => {
    const {register, handleSubmit, control} = useForm({
        defaultValues: initialData
    });

    const onSubmit = (data) => {
        if (props.formType === 'new') {
            AxiosInstance.post('/api/work-experience/', data).then(() => {
                props.handleClose();
                props.fetchData();
            })
        } else if (props.formType === "edit") {
            AxiosInstance.patch(`/api/work-experience/${initialData.id}/`, data).then(() => {
                props.handleClose();
                props.fetchData();
            })
        }
    }

    return (
        <>
            <Grid item xs={12}>
                <TextField required label="Pozitie"
                           fullWidth={true} {...register(`job_title`)}/>
            </Grid>
            <Grid item xs={12}>
                <TextField required label="Numele companiei"
                           fullWidth={true} {...register(`company_name`)}/>
            </Grid>
            <Grid item xs={12}>
                <TextField required label="Localitate"
                           fullWidth={true} {...register(`location`)}/>
            </Grid>
            <Grid item xs={6}>
                <DatePicker name="period_start" control={control}/>
            </Grid>
            <Grid item xs={6}>
                <DatePicker name="period_end" control={control}/>
            </Grid>
            <Grid item xs={6} md={2}>
                <Button type="submit" fullWidth variant="contained" onClick={handleSubmit(onSubmit)}>Creaza</Button>
            </Grid>
            <Grid item xs={6} md={2}>
                <Button type="button" fullWidth variant="contained" onClick={() => props.handleClose()}>Anulare</Button>
            </Grid>
            <Grid item xs={12}>
                <Divider/>
            </Grid>
        </>
    );
};

export default ExperienceForm;
