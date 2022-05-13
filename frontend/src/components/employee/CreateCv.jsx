import Reac from 'react';
import {Typography, Box, TextField, Paper, Grid, Button} from '@mui/material';
import {useForm} from "react-hook-form";
import TextEditor from '../editor/TextEditor';

const CreateCv = () => {
    const {register, handleSubmit, reset, control} = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            phone_number: '',
        }
    });

    const onSubmit = (data) => {
        console.log(data);
        alert(JSON.stringify(data));
    }

    return (
        <Box component="main" my={5} mx={12}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography component='h2' align='left' variant='h6' my={2}>
                    Craza un cv
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Paper elevation={12} sx={{my: 5}}>
                        <Box m={4}>
                            <Grid container spacing={5}>
                                <Grid item xs={12}>
                                    <TextField required label="Nume"
                                               fullWidth={true} {...register("first_name")}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required label="Prenume"
                                               fullWidth={true} {...register("last_name")}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required label="Număr de telefon"
                                               fullWidth={true} {...register("phone_number")}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField required label="Localitate"
                                               fullWidth={true} {...register("city")}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography component='h2' variant='h6'>
                                        Rezumat
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextEditor register={register} name="description"/>
                                </Grid>
                                <Grid item xs={12}>
                                    <Button type="submit" variant="contained"
                                        onClick={handleSubmit(onSubmit)}>Creaza</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </form>
            </Box>
        </Box>
    )
}

export default CreateCv;
