import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import AxiosInstance from "../../utils/AxiosApi";
import {Avatar, Box, Divider, Grid, Link, Paper, Typography} from "@mui/material";

const ResumeView = () => {
    const [resume, setResume] = useState([]);

    let {id} = useParams();

    useEffect(() => {
        AxiosInstance.get(`api/employer-resume/${id}/`).then((response) => {
            setResume(response.data);
        });
    }, [])

    return (
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
                                <Avatar
                                    variant={"rounded"}
                                    alt="image"
                                    src={resume?.user?.profile_image}
                                    style={{
                                        width: 200,
                                        height: 200,
                                    }}
                                />
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
                            </Grid>
                            <Grid item xs={12} py={0} mb={4}>
                                <Divider/>
                            </Grid>
                            {resume?.education_set?.map((item) => {
                                return (
                                    <>
                                        <Grid item xs={12}>
                                            <Typography variant='textBold'>
                                                {item.level_of_education} in {item.field_of_study}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} mb={2}>
                                            <Typography>{item.institution_name} - {item.location}</Typography>
                                            <Typography>{item.period_start} - {item.period_end}</Typography>
                                        </Grid>
                                    </>
                                )

                            })}
                            <Grid item xs={12} mt={4}>
                                <Typography variant='textGrey'>
                                    Experienţa de muncă
                                </Typography>
                            </Grid>
                            <Grid item xs={12} py={0} mb={4}>
                                <Divider/>
                            </Grid>
                            {resume?.workexperience_set?.map((item) => {
                                return (
                                    <>
                                        <Grid item xs={12}>
                                            <Typography variant="textBold">{item.job_title}</Typography>
                                        </Grid>
                                        <Grid item xs={12} mb={2}>
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
                            </Grid>
                            <Grid item xs={12} py={0} mb={4}>
                                <Divider/>
                            </Grid>
                            {resume?.links_set?.map((item) => {
                                return (
                                    <>
                                        <Grid item xs={12} mb={2}>
                                            <Link href={item.link} target="_blank">{item.link}</Link>
                                        </Grid>
                                    </>
                                )
                            })}
                            <Grid item xs={12} mt={4}>
                                <Typography variant='textGrey'>
                                    Aptitudini
                                </Typography>
                            </Grid>
                            <Grid item xs={12} py={0} mb={4}>
                                <Divider/>
                            </Grid>
                            {resume?.skills_set?.map((item) => {
                                return (
                                    <Grid item xs={12} mb={2}>
                                        <Typography
                                            variant="textSmall">{item.skill} - {item.period} ani</Typography>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default ResumeView;