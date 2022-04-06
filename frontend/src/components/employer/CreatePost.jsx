import React, {useState} from 'react';
import {
    Button, Grid, LinearProgress, Box, Paper, Typography,
    TextField, Autocomplete, InputLabel, Select, MenuItem, FormControl
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import AxiosInstance from "../../utils/AxiosApi";
import TextEditor from '../editor/TextEditor';

const CreatePost = () => {
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState('');
    const [jobType, setJobType] = useState('');
    const [salaryMin, setSalaryMin] = useState(0);
    const [salaryMax, setSalaryMax] = useState(0);
    const [salaryInterval, setSalaryInterval] = useState('');
    // const [editor] = useState(() => withReact(createEditor()))
    const navigate = useNavigate();

    const handleLocationChange = async (e) => {
        setLocation(e.target.value);
        await AxiosInstance.get(`api/city/${e.target.value}/`).then((response) => {
            const l = response.data.map(x => ({label: `${x.city}, ${x.county.county}`, key: x.id}));
            setLocations(l);
        })
    }

    return (
        <>
            <Box mt={2}>
                <LinearProgress variant="determinate" value={25} sx={{height: 20}}/>
            </Box>
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
                                    label="Denumirea companiei dmneavoastra"
                                    fullWidth={true}
                                    onChange={(e) => {
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Numarul de telefon al companiei"
                                    fullWidth={true}
                                    onChange={(e) => {
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    label="Email-ul companiei"
                                    fullWidth={true}
                                    onChange={(e) => {
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Website"
                                    fullWidth={true}
                                    onChange={(e) => {
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    disablePortal
                                    options={locations}
                                    renderOption={(props, locations) => {
                                        return (
                                            <li {...props} key={locations.key}>
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
                                            onChange={handleLocationChange}/>}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="job-type">Tip loc de munca</InputLabel>
                                    <Select
                                        labelId="job-type"
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
                                <TextField required type="number" value={salaryMin} onChange={(e) => {
                                    setSalaryMin(e.target.value)
                                }} label="Salar Min"/>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField required type="number" value={salaryMax} onChange={(e) => {
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
                                <TextEditor />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}

export default CreatePost;
