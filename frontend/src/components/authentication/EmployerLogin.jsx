import React, { useState } from 'react';
import {Box, Button, Container, CssBaseline, Grid, TextField, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import AxiosInstance from "../../utils/AxiosApi";
import FetchUser from "../../utils/FetchUser";

const EmployerLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector((state) => state?.user);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        AxiosInstance.post('/api/token/', {email, password}).then((response) => {
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            FetchUser();
            navigate('/dashboard/');
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 15,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Login pentru a publica un loc de munca nou
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
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
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
                                autoComplete="current-password"
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Login
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to='/register/'>
                                Creaza un cont!
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    )
}

export default EmployerLogin;
