import React, {useState, useEffect} from 'react';
import AxiosInstance from "../../utils/AxiosApi";
import {useNavigate, useParams, Link as RouterLink} from "react-router-dom";
import {Box, Chip, Divider, Grid, IconButton, Link, Paper, Typography} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import {Serialize} from "../../utils/EditorSerializer";
import moment from "moment";
import {format} from "date-fns";
import {normalizeSalary, normalizeJobType} from "../../utils/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const EmployerViewJob = () => {
    const [job, setJob] = useState({description: '{}', created_at: new Date(), updated_at: new Date()});

    const navigate = useNavigate();
    let {id} = useParams();

    useEffect(() => {
        AxiosInstance.get(`api/job/search/${id}/`).then((response) => {
            setJob(response.data);
            console.log(response.data)
        });
    }, []);

    const handleDelete = () => {
        AxiosInstance.delete(`/api/job/${id}/`).then((response) => {
            navigate('/employer-dash/');
        });
    };

    return (
        <Box my={6} mx={8}>
            <Paper elevation={12}>
                <Grid container p={5} spacing={1}>
                    <Grid container xs={12} md={6}>
                        <Grid item xs={12} my={2}>
                            <Typography variant={'text'}>
                                {job.title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                {job.company?.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                {`${job.location?.city}, ${job.location?.county?.county}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {normalizeJobType(job.job_type)}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant={'textBold'}>
                                Detaliile locului de muncă
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                Tip loc de muncă: {normalizeJobType(job.job_type)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Chip icon={<PaidIcon/>} sx={{my: 2, fontSize: 18}}
                                  label={normalizeSalary(job.salary_min, job.salary_max, job.salary_interval)}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Grid item xs={12} my={2}>
                            <Link component={RouterLink} to={`/employer/candidates/${id}/`}>
                                Vezi cine a aplicat la acest loc de muncă
                            </Link>
                        </Grid>
                        <Grid item xs={12} >
                            <IconButton aria-label={'delete'} color={'primary'} sx={{mr: 3}}
                                        onClick={handleDelete}>
                                <DeleteIcon/>
                            </IconButton>
                            <IconButton aria-label={'edit'} color={'primary'}
                                        onClick={() => navigate(`/employer/edit-job/${id}/`)}>
                                <EditIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Box px={5}>
                    <Divider/>
                    <Typography variant={'textBold'}>
                        Descriere
                    </Typography>
                    <Box sx={{mx: 3}}>
                        {Serialize(JSON.parse(job.description))}
                    </Box>
                    <Divider/>
                    <Typography my={2}>
                        Actualizat acum {moment(new Date()).diff(new Date(job.updated_at), 'days')} de zile
                    </Typography>
                    <Typography my={2}>
                        Publicat la {format(new Date(job.created_at), 'dd/MM/yyyy')}
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
};

export default EmployerViewJob;
