import React, {useState} from 'react';
import {Typography, Box, TextField, Paper, Grid, Button} from '@mui/material';
import AxiosInstance from '../../utils/AxiosApi';
import {useNavigate} from "react-router-dom";

const AccountDetails = () => {
    const [name, setName] = useState('');
    const [phone_number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {name, phone_number, email, website};
        AxiosInstance.post('api/user-company/', data).then((response) => {
            navigate('/employer-dash/');
        });
    }

    return (
        <Box component="main" my={5} mx={12}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Typography component="h1" align='center' variant='h4'>
                    Creati un cont de angajator
                </Typography>
                <Typography component='h2' align='left' variant='h6' my={2}>
                    Nu ați mai postat până acum un loc de muncă, așa că va trebui să creați un cont de angajator.
                </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
                <Paper elevation={12} sx={{my: 5}}>
                    <Box component="div" mx={5} pb={5}>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Denumirea companiei dmneavoastra"
                                    fullWidth={true}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Numarul de telefon al companiei"
                                    fullWidth={true}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Email-ul companiei"
                                    fullWidth={true}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Website"
                                    fullWidth={true}
                                    onChange={(e) => setWebsite(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                <Paper elevation={12} my={5}>
                    <Box p={3} mx={4} display="flex" alignItems="right" justifyContent="right">
                        <Button type='submit' variant="contained" size="large">Salvați și continuați</Button>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
}

export default AccountDetails;
