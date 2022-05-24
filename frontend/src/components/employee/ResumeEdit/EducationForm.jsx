import React from 'react';
import {TextField, Grid, Button, Divider} from '@mui/material';
import {useForm} from "react-hook-form";
import DatePicker from "../../date_picker/DatePicker";
import AxiosInstance from '../../../utils/AxiosApi';

const initialValues = {
    level_of_education: '',
    field_of_study: '',
    institution_name: '',
    location: '',
    period_start: '',
    period_end: '',
}

const EducationForm = ({initialData=initialValues, ...props}) => {
    const {register, handleSubmit, control} = useForm({
        defaultValues: initialData
    });

    const onSubmit = (data) => {
        if (props.formType === "new") {
            AxiosInstance.post('/api/education/', data).then(() => {
                props.handleClose();
                props.fetchData();
            });
        } else if (props.formType === "edit") {
            AxiosInstance.patch(`/api/education/${initialData.id}/`, data).then(() => {
                props.handleClose();
                props.fetchData();
            })
        }
    }

    return (
        <>
            <Grid item xs={12}>
                <TextField required label="Nivel studii"
                        fullWidth={true} {...register(`level_of_education`)}/>
            </Grid>
            <Grid item xs={12}>
                <TextField required label="Domeniu de studiu"
                        fullWidth={true} {...register(`field_of_study`)}/>
            </Grid>
            <Grid item xs={12}>
                <TextField required label="Numele institutiei"
                        fullWidth={true} {...register(`institution_name`)}/>
            </Grid>
            <Grid item xs={12}>
                <TextField required label="Locatie"
                        fullWidth {...register("location")}/>
            </Grid>
            <Grid item xs={6}>
                <DatePicker name="period_start" control={control}/>
            </Grid>
            <Grid item xs={6}>
                <DatePicker name="period_end" control={control}/>
            </Grid>
            <Grid item xs={12}>
                <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>Creaza</Button>
                <Button type="button" variant="contained" onClick={() => props.handleClose()}>Anulare</Button>
            </Grid>
            <Grid item xs={12}>
                <Divider/>
            </Grid>
        </>
    )
}

export default EducationForm;
