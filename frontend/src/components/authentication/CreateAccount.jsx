import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { Link } from "react-router-dom";
import AxiosInstance from '../../utils/AxiosApi';
import { useNavigate } from "react-router-dom";

let CreateAccount = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [first_name, setFname] = useState('');
    const [last_name, setLname] = useState('');
    let navigate = useNavigate();

    let handleSubmit = (e) => {
        e.preventDefault();
        let data = {email, password, first_name, last_name};
        AxiosInstance.post("/api/register/", data).then((response) => {
            navigate("/login/");
        });
    }

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 15,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">
                        Crează un cont
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => {setEmail(e.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e) => {setPassword(e.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="first_name"
                                    label="Nume"
                                    type="first_name"
                                    id="first_name"
                                    autoComplete="name"
                                    onChange={(e) => {setFname(e.target.value)}}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="lsat_name"
                                    label="Prenume"
                                    type="last_name"
                                    id="last_name"
                                    autoComplete="name"
                                    onChange={(e) => {setLname(e.target.value)}}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Crează cont
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to='/login/'>
                                    Already have an account? Login!
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </>
    )
};

export default CreateAccount;
