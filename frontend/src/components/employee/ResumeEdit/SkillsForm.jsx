import React from 'react';
import {TextField, Grid, Button, Divider} from '@mui/material';
import {useForm} from "react-hook-form";
import AxiosInstance from "../../../utils/AxiosApi";

const initialValues = {
    skill: '',
    period: '',
}

const SkillsForm = ({initialData=initialValues, ...props}) => {
    const {register, handleSubmit, control} = useForm({
        defaultValues: initialData
    });

    const onSubmit = (data) => {
        if (props.formType === 'new') {
            AxiosInstance.post('/api/skills/', data).then(() => {
                props.handleClose();
                props.fetchData();
            });
        } else if (props.formType === 'edit') {
            AxiosInstance.patch(`/api/skills/${initialData.id}/`, data).then(() => {
                props.handleClose();
                props.fetchData();
            });
        }
    }

    return (
        <>
            <Grid item xs={12}>
                <TextField required label="Aptitudine"
                        fullWidth={true} {...register(`skill`)}/>
            </Grid>
            <Grid item xs={12}>
                <TextField required label="Perioada" type={"number"}
                        fullWidth={true} {...register(`period`)}/>
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

export default SkillsForm;