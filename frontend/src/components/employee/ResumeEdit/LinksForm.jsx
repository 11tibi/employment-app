import React from 'react';
import {TextField, Grid, Button, Divider} from '@mui/material';
import {useForm} from "react-hook-form";
import AxiosInstance from "../../../utils/AxiosApi";

const initialValues = {
    links: '',
}

function LinksForm({initialData = initialValues, ...props}) {
    const {register, handleSubmit, control} = useForm({
        defaultValues: initialData
    });

    const onSubmit = (data) => {
        if (props.formType === 'new') {
            AxiosInstance.post('/api/links/', data).then(() => {
                props.handleClose();
                props.fetchData();
            });
        } else if (props.formType === 'edit') {
            AxiosInstance.patch(`/api/links/${initialData.id}/`, data).then(() => {
                props.handleClose();
                props.fetchData();
            });
        }
    }

    return (
        <>
            <Grid item xs={12}>
                <TextField required label="Link"
                           fullWidth={true} {...register(`link`)}/>
            </Grid>
            <Grid item xs={12}>
                <Button type="submit" variant="contained" onClick={handleSubmit(onSubmit)}>Creaza</Button>
                <Button type="button" variant="contained" onClick={() => props.handleClose()}>Anulare</Button>
            </Grid>
            <Grid item xs={12}>
                <Divider/>
            </Grid>
        </>
    );
}

export default LinksForm;