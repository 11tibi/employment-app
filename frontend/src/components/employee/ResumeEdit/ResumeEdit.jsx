import React, {useState, useEffect} from 'react';
import AxiosInstance from '../../../utils/AxiosApi';
import {Typography, Box, Paper, Grid, IconButton, Divider, Link, Avatar} from '@mui/material';
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
            console.log(response.data)
            setResume(response.data)
            setEducation(new Array(response.data.education_set.length).fill(false));
            setEducation(new Array(response.data.workexperience_set.length).fill(false));
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

    const handleImageUpload = (event) => {
        if (event.target.value !== '') {
            let data = new FormData();
            data.append('profile_image', event.target.files[0]);
            AxiosInstance.patch('api/profile-picture/-1/', data).then((response) => {
                setResume(
                    {
                        ...resume, user: {
                            ...resume.user,
                            profile_image: response.data.profile_image
                        }
                    });
            });
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
                            <Grid container>
                                <Grid item xs={12} md={3}>
                                    <input
                                        accept="image/*"
                                        className='img-upload'
                                        id="contained-button-file"
                                        type="file"
                                        style={{
                                            display: "none",
                                        }}
                                        onChange={handleImageUpload}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Avatar
                                            variant={"rounded"}
                                            alt="image"
                                            src={resume?.user?.profile_image}
                                            style={{
                                                width: 200,
                                                height: 200,
                                            }}
                                        />
                                    </label>
                                </Grid>
                                <Grid item xs={12} md={9}>
                                    <Grid item xs={12}>
                                        <Typography variant='text' alignItems={'auto'}>
                                            {resume.user?.first_name} {resume.user?.last_name}
                                        </Typography>
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
                                    (
                                        <Grid container spacing={2}>
                                            <EducationForm
                                                fetchData={() => fetchData()}
                                                handleClose={() => {
                                                    setEducationFormOpen(false)
                                                }}
                                                formType="new"
                                            />
                                        </Grid>
                                    ) : null
                                }
                                {resume?.education_set?.map((item, index) => {
                                    if (education[index]) {
                                        return (
                                            <Grid container spacing={2}>
                                                <EducationForm
                                                    fetchData={() => fetchData()}
                                                    initialData={item}
                                                    handleClose={() => {
                                                        let newarray = education;
                                                        newarray[index] = false;
                                                        setEducation([...newarray]);
                                                    }}
                                                    formType="edit"
                                                />
                                            </Grid>)
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
                                {experienceFormOpen ? (
                                    <Grid container spacing={2}>
                                        <ExperienceForm
                                            fetchData={() => fetchData()}
                                            handleClose={() => {
                                                setExperienceFormOpen(false)
                                            }}
                                            formType="new"
                                        />
                                    </Grid>
                                ) : null}
                                {resume?.workexperience_set?.map((item, index) => {
                                    if (experience[index]) {
                                        return (
                                            <Grid container spacing={2}>
                                                <ExperienceForm
                                                    fetchData={() => fetchData()}
                                                    initialData={item}
                                                    handleClose={() => {
                                                        let newarray = experience;
                                                        newarray[index] = false;
                                                        setExperience([...newarray]);
                                                    }}
                                                    formType="edit"
                                                />
                                            </Grid>)
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
                                {linksFormOpen ? (
                                    <Grid container spacing={2}>
                                        <LinksForm
                                            fetchData={() => fetchData()}
                                            handleClose={() => {
                                                setLinksFormOpen(false)
                                            }}
                                            formType="new"
                                        />
                                    </Grid>) : null}
                                {resume?.links_set?.map((item, index) => {
                                    if (links[index]) {
                                        return (
                                            <Grid container spacing={2}>
                                                <LinksForm
                                                    fetchData={() => fetchData()}
                                                    initialData={item}
                                                    handleClose={() => {
                                                        let newarray = links;
                                                        newarray[index] = false;
                                                        setLinks([...newarray]);
                                                    }}
                                                    formType="edit"
                                                />
                                            </Grid>)
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
                                {skillsFormOpen ? (
                                    <Grid container spacing={2}>
                                        <SkillsForm
                                            fetchData={() => fetchData()}
                                            handleClose={() => {
                                                setSkillsFormOpen(false)
                                            }}
                                            formType="new"
                                        />
                                    </Grid>) : null}
                                {resume?.skills_set?.map((item, index) => {
                                    if (skills[index]) {
                                        return (
                                            <Grid container spacing={2}>
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
                                            </Grid>
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
