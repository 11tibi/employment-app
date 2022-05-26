import React, {useState, useEffect} from 'react';
import AxiosInstance from '../../../utils/AxiosApi';
import {Typography, Box, Paper, Grid, IconButton, Divider, Link} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EducationForm from './EducationForm';
import ExperienceForm from "./ExperienceForm";
import LinksForm from "./LinksForm";
import SkillsForm from "./SkillsForm";

const ResumeEdit = () => {
    const [resume, setResume] = useState({});
    const [educationFormOpen, setEducationFormOpen] = useState(false);
    const [education, setEducation] = useState([]);
    const [experienceFormOpen, setExperienceFormOpen] = useState(false);
    const [experience, setExperience] = useState([]);
    const [linksFormOpen, setLinksFormOpen] = useState(false);
    const [links, setLinks] = useState([]);
    const [skillsFormOpen, setSkillsFormOpen] = useState(false);
    const [skills, setSkills] = useState([]);

    const fetchData = () => {
        AxiosInstance.get('/api/resume/0/').then((response) => {
            setResume(response.data);
            setEducation(new Array(response.data.education_set.length).fill(false));
            setEducation(new Array(response.data.workexperience_set.length).fill(false));
            console.log(resume)
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (e, id, type) => {
        switch (type) {
            case 'education':
                AxiosInstance.delete(`/api/education/${id}/`).then(() => fetchData());
                break;
            case 'work':
                AxiosInstance.delete(`/api/work-experience/${id}/`).then(() => fetchData());
                break;
            case 'links':
                AxiosInstance.delete(`/api/links/${id}/`).then(() => fetchData());
                break;
            case 'skills':
                AxiosInstance.delete(`/api/skills/${id}/`).then(() => fetchData());
                break;
            default:
                break;
        }
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
                                    (<EducationForm
                                        fetchData={() => fetchData()}
                                        handleClose={() => {
                                            setEducationFormOpen(false)
                                        }}
                                        formType="new"
                                    />) : null
                                }
                                {resume?.education_set?.map((item, index) => {
                                    if (education[index]) {
                                        return (<EducationForm
                                            fetchData={() => fetchData()}
                                            initialData={item}
                                            handleClose={() => {
                                                let newarray = education;
                                                newarray[index] = false;
                                                setEducation([...newarray]);
                                            }}
                                            formType="edit"
                                        />)
                                    } else {
                                        return (
                                            <>
                                                <Grid item xs={12}>
                                                    <Typography variant='textBold'>
                                                        {item.level_of_education} in {item.field_of_study}
                                                    </Typography>
                                                    <IconButton color='primary' sx={{float: 'right'}}
                                                                onClick={(e) => handleDelete(e, item.id, 'education')}>
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
                                    <IconButton color='primary' sx={{float: 'right'}}
                                                onClick={() => setExperienceFormOpen(!experienceFormOpen)}>
                                        <AddIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12} py={0} mb={4}>
                                    <Divider/>
                                </Grid>
                                {experienceFormOpen ? (<ExperienceForm
                                    fetchData={() => fetchData()}
                                    handleClose={() => {
                                        setExperienceFormOpen(false)
                                    }}
                                    formType="new"
                                />) : null}
                                {resume?.workexperience_set?.map((item, index) => {
                                    if (experience[index]) {
                                        return (<ExperienceForm
                                            fetchData={() => fetchData()}
                                            initialData={item}
                                            handleClose={() => {
                                                let newarray = experience;
                                                newarray[index] = false;
                                                setExperience([...newarray]);
                                            }}
                                            formType="edit"
                                        />)
                                    } else {
                                        return (
                                            <>
                                                <Grid item xs={12}>
                                                    <Typography variant="textBold">{item.job_title}</Typography>
                                                    <IconButton color='primary' sx={{float: 'right'}}
                                                                onClick={(e) => handleDelete(e, item.id, 'work')}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                    <IconButton color='primary' sx={{float: 'right'}}
                                                                onClick={() => {
                                                                    let newarray = experience;
                                                                    newarray[index] = true;
                                                                    setExperience([...newarray]);
                                                                }}
                                                    >
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
                                    }
                                })}

                                <Grid item xs={12} mt={4}>
                                    <Typography variant='textGrey'>
                                        Link-uri
                                    </Typography>
                                    <IconButton color='primary' sx={{float: 'right'}}
                                                onClick={() => setLinksFormOpen(!linksFormOpen)}>
                                        <AddIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12} py={0} mb={4}>
                                    <Divider/>
                                </Grid>
                                {linksFormOpen ? (<LinksForm
                                    fetchData={() => fetchData()}
                                    handleClose={() => {
                                        setLinksFormOpen(false)
                                    }}
                                    formType="new"
                                />) : null}
                                {resume?.links_set?.map((item, index) => {
                                    if (links[index]) {
                                        return (
                                            <LinksForm
                                                fetchData={() => fetchData()}
                                                initialData={item}
                                                handleClose={() => {
                                                    let newarray = links;
                                                    newarray[index] = false;
                                                    setLinks([...newarray]);
                                                }}
                                                formType="edit"
                                            />)
                                    } else {
                                        return (
                                            <>
                                                <Grid item xs={12}>
                                                    <Link href={item.link} target="_blank">{item.link}</Link>
                                                    <IconButton color='primary' sx={{float: 'right'}} onClick={(e) => {
                                                        handleDelete(e, item.id, 'links')
                                                    }}>
                                                        <DeleteIcon/>
                                                    </IconButton>
                                                    <IconButton color='primary' sx={{float: 'right'}} onClick={() => {
                                                        let newarray = links;
                                                        newarray[index] = true;
                                                        setLinks([...newarray]);
                                                    }}>
                                                        <EditIcon/>
                                                    </IconButton>
                                                </Grid>
                                            </>
                                        )
                                    }
                                })}

                                <Grid item xs={12} mt={4}>
                                    <Typography variant='textGrey'>
                                        Aptitudini
                                    </Typography>
                                    <IconButton color='primary' sx={{float: 'right'}}
                                                onClick={() => setSkillsFormOpen(!skillsFormOpen)}>
                                        <AddIcon/>
                                    </IconButton>
                                </Grid>
                                <Grid item xs={12} py={0} mb={4}>
                                    <Divider/>
                                </Grid>
                                {skillsFormOpen ? (<SkillsForm
                                    fetchData={() => fetchData()}
                                    handleClose={() => {
                                        setSkillsFormOpen(false)
                                    }}
                                    formType="new"
                                />) : null}
                                {resume?.skills_set?.map((item, index) => {
                                    if (skills[index]) {
                                        return (
                                            <SkillsForm
                                                fetchData={() => fetchData()}
                                                initialData={item}
                                                handleClose={() => {
                                                    let newarray = skills;
                                                    newarray[index] = false;
                                                    setSkills([...newarray]);
                                                }}
                                                formType="edit"
                                            />
                                        )
                                    }
                                    return (
                                        <>
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="textSmall">{item.skill} - {item.period} ani</Typography>
                                                <IconButton color='primary' sx={{float: 'right'}} onClick={(e) => {
                                                    handleDelete(e, item.id, 'skills')
                                                }}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                                <IconButton color='primary' sx={{float: 'right'}} onClick={() => {
                                                    let newarray = skills;
                                                    newarray[index] = true;
                                                    setSkills([...newarray]);
                                                }}>
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
