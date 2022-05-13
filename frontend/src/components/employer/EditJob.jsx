import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import AxiosInstance from "../../utils/AxiosApi";
import {
    Box, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select,
    TextField, Typography, IconButton,
} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import TextEditor from "../editor/TextEditor";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {useNavigate} from "react-router-dom";

const EditJob = () => {
    const [title, setTitle] = useState('');
    const [jobType, setJobType] = useState('');
    const [salaryMin, setSalaryMin] = useState(0);
    const [salaryMax, setSalaryMax] = useState(0);
    const [salaryInterval, setSalaryInterval] = useState('');
    const [numberOfEmployees, setNumberOfEmployees] = useState(0);
    const [expiresAt, setExpiresAt] = useState(null);
    const [description, setDescription] = useState([
        {
            type: 'paragraph',
            children: [{text: ''}],
        },
    ]);

    const navigate = useNavigate();

    let {id} = useParams();

    useEffect(() => {
        AxiosInstance.get(`/api/job-employer/${id}/`).then((response) => {
            setTitle(response.data.title);
            setJobType(response.data.job_type);
            setSalaryMin(response.data.salary_min);
            setSalaryMax(response.data.salary_max);
            setSalaryInterval(response.data.salary_interval);
            setNumberOfEmployees(response.data.number_of_employees);
            setExpiresAt(response.data.expires_at);

            let text = JSON.parse(response.data.description);
            setDescription(text);

        });
    }, []);

    const handleDelete = (e) => {
        AxiosInstance.delete(`/api/job/${id}/`).then(() => {
            navigate(-1);
        });
    }

    const handleSubmit = (e) => {
        const data = {
            title,
            job_type: jobType,
            number_of_employees: numberOfEmployees,
            salary_min: salaryMin,
            salary_max: salaryMax,
            salary_interval: salaryInterval,
            description: JSON.stringify(description),
            expires_at: expiresAt,
        }
        AxiosInstance.patch(`/api/job-employer/${id}/`, data).then((response) => {
            navigate(-1);
        }).catch(error => {
        })
    }

    return (
        <Box my={5} mx={5}>
            <Box xs={12}>
                <Paper elevation={12}>
                    <Grid container px={2} alignItems={'center'} justify={'center'}>
                        <Grid xs={1}>
                            <IconButton aria-label="back" size="large" onClick={() => navigate(-1)}>
                                <ArrowBackIosNewIcon/>
                            </IconButton>
                        </Grid>
                        <Grid xs={10}>
                            <Typography component="h1" align='left' variant='h4' py={3} mx={5}>
                                Editeaza postarea
                            </Typography>
                        </Grid>
                        <Grid xs={1}>
                            <IconButton aria-label="delete" color="error" size="large" sx={{float: "right"}}
                                        onClick={handleDelete}>
                                <DeleteIcon/>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <Paper elevation={12} sx={{my: 10}}>
                <Box component="div" mx={5} pb={5}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                label="Titlu"
                                fullWidth={true}
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="job-type">Tip loc de munca</InputLabel>
                                <Select
                                    labelId="job-type"
                                    required
                                    value={jobType}
                                    label="Tip loc de munca"
                                    fullWidth={true}
                                    onChange={(e) => {
                                        setJobType(e.target.value)
                                    }}
                                >
                                    <MenuItem value={"FULL_TIME"}>Full Time</MenuItem>
                                    <MenuItem value={"PART_TIME"}>Part Time</MenuItem>
                                    <MenuItem value={"INTERNSHIP"}>Internship/ Voluntariat</MenuItem>
                                    <MenuItem value={"PROJECT"}>Proiect/ Sezonier</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField required fullWidth type="number" value={salaryMin} onChange={(e) => {
                                setSalaryMin(e.target.value)
                            }} label="Salar Min"/>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField required fullWidth type="number" value={salaryMax} onChange={(e) => {
                                setSalaryMax(e.target.value)
                            }} label="Salar Max"/>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel id="salary-interval">Interval salar</InputLabel>
                                <Select
                                    required
                                    labelId="salary-interval"
                                    value={salaryInterval}
                                    label="Interval salar"
                                    fullWidth={true}
                                    onChange={(e) => {
                                        setSalaryInterval(e.target.value)
                                    }}
                                >
                                    <MenuItem value={"HOUR"}>Ora</MenuItem>
                                    <MenuItem value={"MONTH"}>Luna</MenuItem>
                                    <MenuItem value={"YEAR"}>An</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                type="number"
                                label="Cate perosane doriti sa angajati"
                                value={numberOfEmployees}
                                onChange={(e) => setNumberOfEmployees(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Expirea la"
                                    inputFormat="MM/dd/yyyy"
                                    value={expiresAt}
                                    onChange={(expireDate) => {
                                        setExpiresAt(expireDate)
                                    }}
                                    renderInput={(params) => <TextField {...params} fullWidth required/>}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
            <Paper elevation={12} sx={{py: 5, px: 5}}>
                <Typography component='h2' variant='h5' mb={2}>
                    Adaugati o descriere *
                </Typography>
                <TextEditor value={description} onChange={(v) => {
                    setDescription(v)
                }}/>
            </Paper>
            <Paper elevation={12} sx={{py: 3, px: 5, my: 5}}>
                <Box display="flex" justify-content="end">
                    <Button variant="contained" onClick={handleSubmit}>
                        Editeaza
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default EditJob;
