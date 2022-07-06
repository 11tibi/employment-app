import React, {useState, useEffect} from 'react';
import AxiosInstance from "../../utils/AxiosApi";
import {useLocation, useParams} from "react-router-dom";
import {Grid, Paper, Typography, Box, Button, Chip, Divider} from "@mui/material";
import PaidIcon from "@mui/icons-material/Paid";
import {Serialize} from "../../utils/EditorSerializer";
import {format} from 'date-fns'
import moment from "moment";
import {useNavigate} from "react-router-dom";
import FlagIcon from '@mui/icons-material/Flag';
import {normalizeSalary, normalizeJobType} from "../../utils/utils";
import ReportDialog from "./ReportDialog";
import SnackbarFeedback from "../../feedback/SnackbarFeedback";

const ViewJob = () => {
    const [job, setJob] = useState({description: '{}', created_at: new Date(), updated_at: new Date()});
    const [reportIsOpen, setReportIsOpen] = useState(false);
    let {id} = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (location.state.openSnack) {
            setOpenDialog(true);
        }

        AxiosInstance.get(`api/job/search/${id}/`).then((response) => {
            setJob(response.data);
        });
    }, []);

    return (
        <Box my={6} mx={8}>
            <Paper elevation={12}>
                <Grid container p={5} spacing={1}>
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
                    <Grid item xs={12} md={6}>
                        <Button variant={'contained'} fullWidth onClick={() => {
                            navigate('/apply/', {state: {id: job.id}})
                        }}>
                            Candidați acum
                        </Button>
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
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                </Grid>
                <Box px={5}>
                    <Typography variant={'textBold'}>
                        Descriere
                    </Typography>
                    <Box sx={{mx: 3}}>
                        {Serialize(JSON.parse(job.description))}
                    </Box>
                    <Button sx={{my: 2}} variant={"outlined"} color={"warning"} startIcon={<FlagIcon/>}
                            onClick={() => {
                                setReportIsOpen(true)
                            }}>
                        Raportează locul de muncă
                    </Button>
                    <Divider/>
                    <Typography my={2}>
                        Actualizat acum {moment(new Date()).diff(new Date(job.updated_at), 'days')} de zile
                    </Typography>
                    <Typography my={2}>
                        Publicat la {format(new Date(job.created_at), 'dd/MM/yyyy')}
                    </Typography>
                </Box>
            </Paper>
            <ReportDialog isOpen={reportIsOpen} id={id} handleClose={() => {
                setReportIsOpen(false)
            }}/>
            <SnackbarFeedback
                open={openDialog}
                message={'Candidatura dumneavoastră a fost trimisă'} handleClose={() => {
                setOpenDialog(false)
            }}/>
        </Box>
    );
};

export default ViewJob;
