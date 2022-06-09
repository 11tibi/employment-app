import React, {useState, useEffect} from 'react';
import {Button, Grid, Typography, Divider, Link, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate, Link as RouterLink} from "react-router-dom";
import AxiosInstance from '../../utils/AxiosApi';
import {Serialize} from '../../utils/EditorSerializer';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    const handleDelete = (e, id) => {
        AxiosInstance.delete(`/api/job/${id}/`).then((response) => {
            setJobs(jobs.filter((item) => item.id !== id))
        });
    }

    useEffect(() => {
        AxiosInstance.get('/api/job-employer/').then((response) => {
            setJobs(response.data);
        })
    }, []);

    return (
        jobs.map((item) => {
            return (<Grid container p={5} spacing={2}>
                <Grid item xs={7}>
                    <Link variant='h3' component={RouterLink} color='text.main' to={`/employer/job/${item.id}/`}
                          style={{textDecoration: "none"}}>
                        {item.title}
                    </Link>
                </Grid>
                <Grid item xs={5}>
                    <IconButton aria-label="delete" color="error" size="large" sx={{float: 'right'}} onClick={(e) => {
                        handleDelete(e, item.id)
                    }}>
                        <DeleteIcon/>
                    </IconButton>
                    <IconButton aria-label="edit" color="secondary" size="large" sx={{float: 'right'}} onClick={() => {
                        navigate(`/employer/edit-job/${item.id}/`);
                    }}>
                        <EditIcon/>
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Divider fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <Typography valiant='h4' component='h3'>
                        {Serialize(JSON.parse(item.description))}
                    </Typography>
                </Grid>
            </Grid>);
        })
    )
}

const EmployerDashboard = () => {
    const navigate = useNavigate();


    return (
        <>
            <Grid container mt={4} alignItems="center" justifyContent="center"
                  sx={{backgroundColor: 'paper.main', py: 2, px: 1, maxWidth: '90%', mx: 'auto'}}
            >
                <Grid item xs={8}>

                </Grid>
                <Grid item xs={4}>
                    <Button variant='contained' sx={{float: 'right'}} onClick={() => {
                        navigate("/employer/create/")
                    }}>
                        Creaza o postare
                    </Button>
                </Grid>
            </Grid>
            <Grid container mt={4} alignItems="center" justifyContent="center"
                  sx={{backgroundColor: 'paper.main', maxWidth: '90%', mx: 'auto'}}
            >
                <Jobs/>
            </Grid>
        </>
    );
}

export default EmployerDashboard;
