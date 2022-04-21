import React, {useState, useEffect, useRef} from 'react';
import {
    Button, Grid, Box, Paper, Typography,
    TextField, Autocomplete, InputLabel, Select, MenuItem, FormControl
} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {useNavigate} from "react-router-dom";
import AxiosInstance from "../../utils/AxiosApi";
import TextEditor from '../editor/TextEditor';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState('');
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

    let companies = useRef(null);

    useEffect(() => {
        AxiosInstance.get('/api/user-company/').then((response) => {
            if (response.data.length === 0) {
                navigate('/employer/account-details/');
                return;
            }
            companies.current = response.data.map((item) =>
                <MenuItem value={item.company.id} key={item.company.id}>{item.company.name}</MenuItem>
            );
        });
    }, []);

    const handleLocationChange = (e) => {
        setLocation(e.target.value);
        AxiosInstance.get(`api/city/${e.target.value}/`).then((response) => {
            const l = response.data.map(x => ({label: `${x.city}, ${x.county.county}`, key: x.id}));
            setLocations(l);
        })
    }

    const handleSubmit = (e) => {
        const data = {
            title,
            company,
            location,
            job_type: jobType,
            number_of_employees: numberOfEmployees,
            salary_min: salaryMin,
            salary_max: salaryMax,
            salary_interval: salaryInterval,
            description: JSON.stringify(description),
            expires_at: expiresAt,
        }
        AxiosInstance.post('/api/job/', data).then((response) => {
            navigate('/employer-dash/');
        }).catch(error => {
        })
    }

    return (
        <>
            <Box my={5} mx={5}>
                <Box xs={12}>
                    <Paper elevation={12}>
                        <Typography component="h1" align='left' variant='h4' py={3} mx={5}>
                            Introduceti informatiile de baza
                        </Typography>
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
                                    <InputLabel id="comany">Selectati firma</InputLabel>
                                    <Select
                                        required
                                        labelId="comany"
                                        value={company}
                                        label="Selectati firma"
                                        fullWidth={true}
                                        onChange={(e) => {
                                            setCompany(e.target.value);
                                        }}
                                    >
                                        {companies.current}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    disablePortal
                                    options={locations}
                                    onChange={(e) => setLocation(e.target.value)}
                                    renderOption={(props, locations) => {
                                        return (
                                            <li {...props} key={locations.key} value={locations.key}>
                                                {locations.label}
                                            </li>
                                        );
                                    }}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            label="Locatie"
                                            fullWidth={true}
                                            value={location}
                                            required
                                            onChange={handleLocationChange}/>}
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
                        Adaugati o descriere
                    </Typography>
                    <TextEditor value={description} onChange={(v) => {
                        setDescription(v)
                    }}/>
                </Paper>
                <Paper elevation={12} sx={{py: 3, px: 5, my: 5}}>
                    <Box display="flex" justify-content="end">
                        <Button variant="contained" onClick={handleSubmit}>
                            Creaza
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}

export default CreatePost;
