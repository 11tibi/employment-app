import React, {useState, useEffect} from 'react';
import AxiosInstance from '../../../utils/AxiosApi';
import {Typography, Box, TextField, Paper, Grid, Button, IconButton, Divider, Link} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EducationForm from './EducationForm';

const ResumeEdit = () => {
    const [resume, setResume] = useState({});
    const [educationFormOpen, setEducationFormOpen] = useState(false);
    const [education, setEducation] = useState([]);

    const fetchData = () => {
        AxiosInstance.get('/api/resume/0/').then((response) => {
            setResume(response.data);
            setEducation(new Array(response.data.education_set.length).fill(false));
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (e, id, type) => {
        switch (type) {
            case 'education':
                AxiosInstance.delete(`/api/education/${id}/`);
                break;
            case 'work': 
                AxiosInstance.delete(`/api/work-experience/${id}/`);
                break;
            case 'links':
                AxiosInstance.delete(`/api/links/${id}/`);
                break;
            case 'skills':
                AxiosInstance.delete(`/api/skills/${id}/`);
                break;
            default: break;
        }
        fetchData();
    }

    return (
        <>
            <Box component="main" my={5} mx={12}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Paper elevation={12} sx={{my: 5}}>
                        <Box m={4}>
                            <Grid container spacing={1}>
                                <Grid item xs={10} my={3}>
                                    <Typography variant='text'>
                                        {resume.user?.first_name} {resume.user?.last_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2} my={3}>
                                    <IconButton color='primary' sx={{float: 'right'}}>
                                        <EditIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='textSmall'>
                                        {resume?.city}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant='textSmall'>
                                        {resume.user?.email}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} mt={4}>
                                    <Typography variant='textGrey'>
                                        Educație
                                    </Typography>
                                    <IconButton color='primary' sx={{float: 'right'}} 
                                            onClick={() => setEducationFormOpen(!educationFormOpen)}>
                                        <AddIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12} py={0} mb={4}>
                                    <Divider/>
                                </Grid>
                                {educationFormOpen ? 
                                    (<EducationForm handleClose={() => {setEducationFormOpen(false)}}/>) : null}
                                {resume?.education_set?.map((item, index) => {
                                    if (education[index]) {
                                        return (<EducationForm initialData={item} 
                                            handleClose={() => {let newarray = education; newarray[index] = false;
                                                setEducation([...newarray]);}}/>)
                                    } else {
                                        return (
                                            <>
                                                <Grid item xs={12}>
                                                    <Typography variant='textBold'>
                                                        {item.level_of_education} in {item.field_of_study}
                                                    </Typography>
                                                    <IconButton color='primary' sx={{float: 'right'}} onClick={(e) => handleDelete(e, item.id, 'education')}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                    <IconButton color='primary' sx={{float: 'right'}} onClick={
                                                        () => {
                                                            let newarray = education; 
                                                            newarray[index] = true;
                                                            setEducation([...newarray]);
                                                        }}
                                                    >
                                                        <EditIcon/>
                                                    </IconButton>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography>{item.institution_name} - {item.location}</Typography>
                                                    <Typography>{item.period_start} - {item.period_end}</Typography>
                                                </Grid>
                                            </>
                                        )
                                    }
                                })}
                                <Grid item xs={12} mt={4}>
                                    <Typography variant='textGrey'>
                                        Experienţa de muncă
                                    </Typography>
                                    <IconButton color='primary' sx={{float: 'right'}}>
                                        <AddIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12} py={0} mb={4}>
                                    <Divider/>
                                </Grid>
                                {resume?.workexperience_set?.map((item) => {
                                    return (
                                        <>
                                            <Grid item xs={12}>
                                                <Typography variant="textBold">{item.job_title}</Typography>
                                                <IconButton color='primary' sx={{float: 'right'}} onClick={(e) => handleDelete(e, item.id, 'work')}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                                <IconButton color='primary' sx={{float: 'right'}}>
                                                    <EditIcon/>
                                                </IconButton>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography>
                                                    {item.company_name} - {item.location}
                                                </Typography>
                                                <Typography>{item.period_start} - {item.period_end}</Typography>
                                            </Grid>
                                        </>
                                    )
                                })}

                                <Grid item xs={12} mt={4}>
                                    <Typography variant='textGrey'>
                                        Link-uri
                                    </Typography>
                                    <IconButton color='primary' sx={{float: 'right'}}>
                                        <AddIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12} py={0} mb={4}>
                                    <Divider/>
                                </Grid>
                                {resume?.links_set?.map((item) => {
                                    return (
                                        <>
                                            <Grid item xs={12}>
                                                <Link href={item.link} target="_blank">{item.link}</Link>
                                                <IconButton color='primary' sx={{float: 'right'}} onClick={(e) => {handleDelete(e, item.id, 'links')}}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                                <IconButton color='primary' sx={{float: 'right'}}>
                                                    <EditIcon/>
                                                </IconButton>
                                            </Grid>
                                        </>
                                    )
                                })}

                                <Grid item xs={12} mt={4}>
                                    <Typography variant='textGrey'>
                                        Aptitudini
                                    </Typography>
                                    <IconButton color='primary' sx={{float: 'right'}}>
                                        <AddIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12} py={0} mb={4}>
                                    <Divider/>
                                </Grid>
                                {resume?.skills_set?.map((item) => {
                                    return (
                                        <>
                                            <Grid item xs={12}>
                                                <Typography variant="textSmall">{item.skill} - {item.period} ani</Typography>
                                                <IconButton color='primary' sx={{float: 'right'}} onClick={(e) => {handleDelete(e, item.id, 'skills')}}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                                <IconButton color='primary' sx={{float: 'right'}}>
                                                    <EditIcon/>
                                                </IconButton>
                                            </Grid>
                                        </>
                                    )
                                })}
                            </Grid>
                        </Box>
                    </Paper>
                </Box>
            </Box>
        </>
    )
}

export default ResumeEdit;