import React, {useEffect, useState} from 'react';
import {Serialize} from "../../utils/EditorSerializer";
import {Box, Grid, IconButton, Link, Paper, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import DeleteIcon from "@mui/icons-material/Delete";
import AxiosInstance from "../../utils/AxiosApi";
import {saveAs} from 'file-saver';

const Candidate = () => {
    const [candidates, setCandidates] = useState([]);
    let {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        AxiosInstance.get(`/api/candidate/${id}/`).then((response) => {
            setCandidates(response.data);
        });
    }, []);

    const handleLetterDownload = (id) => {
        AxiosInstance.get(`/api/download-letter/${id}/`,
            {responseType: "blob",}).then((response) => {
            const url = new Blob([response.data], {type: response.headers['content-type']})
            saveAs(url)
        });
    }

    return (<>
        {
            candidates.map((item) => {
                return (
                    <Paper elevation={12}>
                        <Box p={4} my={4}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography variant={'text'} sx={{cursor: 'pointer'}}
                                                onClick={() => {
                                                    navigate(`/resume-view/${item?.employee?.id}/`)
                                                }}>
                                        {item?.employee?.user?.first_name} {item?.employee?.user?.last_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant={'textSmall'}>
                                        Email: {item?.employee?.user?.email} - Număr de
                                        telefon: {item?.employee?.phone_number}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {Serialize(JSON.parse(item.letter_of_intent))}
                                </Grid>
                                {item.letter_of_intent_path != null ?
                                    <Grid item xs={12}>
                                        <Link onClick={() => {
                                            handleLetterDownload(item.id)
                                        }}>
                                            Descaracă scrisoarea de intnție
                                        </Link>
                                    </Grid>
                                    : null}
                            </Grid>

                        </Box>
                    </Paper>
                )
            })
        }
    </>)
};

const Candidates = () => {
    let navigate = useNavigate();

    return (
        <Box my={6} mx={8}>
            <Paper elevation={12}>
                <Grid container px={2} alignItems={'center'} justify={'center'}>
                    <Grid item xs={1}>
                        <IconButton aria-label="back" size="large" onClick={() => navigate(-1)}>
                            <ArrowBackIosNewIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography component="h1" align='left' variant='h4' py={3} mx={5}>
                            Editeaza postarea
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Candidate/>
        </Box>
    );
};

export default Candidates;
