import React from 'react';
import {Button, Grid} from '@mui/material';
import {useNavigate} from "react-router-dom";

const EmployerDashboard = () => {
    const navigate = useNavigate();

    return (
        <>
            <Grid container mt={4} alignItems="center" justifyContent="center"
                  sx={{backgroundColor: 'paper.main', height: 50}}
            >
                <Grid item xs={10}>

                </Grid>
                <Grid item xs={2}>
                    <Button variant='contained' onClick={() => {navigate("/employer/create/")}}>
                        Creaza o postare
                    </Button>
                </Grid>
            </Grid>
            <Grid container mt={4} alignItems="center" justifyContent="center"
                  sx={{backgroundColor: 'paper.main', height: 50}}
            >
                <Grid item xs={12}>

                </Grid>
            </Grid>
        </>
    );
}

export default EmployerDashboard;
