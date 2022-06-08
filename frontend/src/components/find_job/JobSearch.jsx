import React, {useState, useEffect, useCallback} from 'react';
import {
    Button, Grid, TextField, Box, FormControl, InputLabel, Select, Link,
    OutlinedInput, MenuItem, Checkbox, ListItemText, Paper, Typography, Chip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PaidIcon from '@mui/icons-material/Paid';
import AxiosInstance from "../../utils/AxiosApi";
import {Serialize} from "../../utils/EditorSerializer";
import {useNavigate, Link as RouterLink} from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const jobTypes = [{key: 'FULL_TIME', value: 'Full Time'}, {key: 'PART_TIME', value: 'Part Time'},
    {key: 'INTERNSHIP', value: 'Internship/ Voluntariat'}, {key: 'PROJECT', value: 'Proiect/ Sezonie'}]

function JobSearch(props) {
    const [position, setPosition] = useState('');
    const [where, setWhere] = useState('');
    const [jobType, setJobType] = useState([]);
    const [date, setDate] = useState('');
    const [job, setJob] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();
    let [page, setPage] = useState(1);

    useEffect(() => {
        fetchJobs();
    }, [])

    const fetchJobs = useCallback(() => {

        const url = `/api/job/search/?title=${position}&location=${where}&job_type=${jobType.join(',')}&date=${date}&page=${page}`;
        AxiosInstance.get(url).then((response) => {
            const newValue = job.concat(response.data);
            setJob(newValue);
            const newPage = page + 1;
            setPage(newPage);
        }).catch(() => {
            setHasMore(false);
        });
    }, [job, position, page])

    const handleSubmit = () => {
        setPage(1);
        setJob([])
        setHasMore(true);

        fetchJobs();
    }

    const formatSalary = (min, max, interval) => {
        let str = `${min} - ${max} lei pe `;
        switch (interval) {
            case 'HOUR':
                str += 'ora';
                break;
            case 'YEAR':
                str += 'an';
                break;
            case 'MONTH':
                str += 'lună';
                break;
        }
        return str

    }
    const normalizeJobType = (str) => {
        switch (str) {
            case 'FULL_TIME':
                return 'Full Time';
            case 'PART_TIME':
                return 'Part Time';
            case 'INTERNSHIP':
                return 'Internship/ Voluntariat';
            case 'PROJECT':
                return 'Proiect/ Sezonie';
        }
    }

    const handleJobTypeChange = (e) => {
        setJobType(e.target.value);
    }

    return (
        <Box mx={6} my={5}>
            <Grid container spacing={2}>
                <Grid item md={5} xs={12}>
                    <TextField fullWidth label={'Ce'} value={position}
                               onChange={(e) => setPosition(e.target.value)}/>
                </Grid>
                <Grid item md={5} xs={12}>
                    <TextField fullWidth label={'Unde'} value={where}
                               onChange={(e) => setWhere(e.target.value)}/>
                </Grid>
                <Grid item md={2} xs={12} sx={{display: 'flex'}}>
                    <Button fullWidth variant={'contained'} onClick={handleSubmit} endIcon={<SearchIcon/>}>
                        Caută
                    </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Tip loc de muncă</InputLabel>
                        <Select
                            labelId="job_type"
                            id="job_type_label"
                            multiple
                            value={jobType}
                            input={<OutlinedInput label="Tag"/>}
                            onChange={handleJobTypeChange}
                            renderValue={(selected) => {
                                const res = [];
                                jobTypes.map((item) => {
                                    if (selected.includes(item.key)) {
                                        res.push(item.value);
                                    }
                                });
                                return res.join(', ');
                            }}
                        >
                            {jobTypes.map((item) => (
                                <MenuItem key={item.key} value={item.key}>
                                    <Checkbox checked={jobType.indexOf(item.key) > -1}/>
                                    <ListItemText primary={item.value}/>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Data postării</InputLabel>
                        <Select
                            value={date}
                            input={<OutlinedInput label="Tag"/>}
                            onChange={(e) => {
                                setDate(e.target.value)
                            }}
                            renderValue={(select) => {
                                return select === "asc" ? 'Cele mai noi' : 'Mai vechi'
                            }}
                        >
                            <MenuItem key={"asc"} value={"asc"}>
                                <Checkbox checked={date === "asc"}/>
                                <ListItemText primary={"Cele mai noi"}/>
                            </MenuItem>
                            <MenuItem key={"desc"} value={"desc"}>
                                <Checkbox checked={date === "desc"}/>
                                <ListItemText primary={"Mai vechi"}/>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <InfiniteScroll
                        dataLength={job.length}
                        next={fetchJobs}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                    >
                        {job.map((item) => {
                            return (
                                <Paper elevation={12} sx={{py: 3, px: 4, my: 4, ":hover": {cursor: 'pointer'}}}
                                       onClick={() => {
                                           navigate(`/viewjob/${item.id}/`)
                                       }}>
                                    <Link component={RouterLink} color='text.main' variant={'text'}
                                          to={`/viewjob/${item.id}/`} sx={{textDecoration: "none"}}>
                                        {item.title}
                                    </Link>
                                    <Typography>
                                        {item.company.name}
                                    </Typography>
                                    <Typography>
                                        {`${item.location?.city}, ${item.location?.county?.county}`}
                                    </Typography>
                                    <Typography>
                                        {normalizeJobType(item.job_type)}
                                    </Typography>
                                    <Chip icon={<PaidIcon/>} sx={{my: 2, fontSize: 18}}
                                          label={formatSalary(item.salary_min, item.salary_max, item.salary_interval)}/>
                                    <Box sx={{height: '10em', lineHeight: '1em', overflow: 'hidden'}}>
                                        {Serialize(JSON.parse(item.description))}
                                    </Box>
                                </Paper>
                            )
                        })}
                    </InfiniteScroll>
                </Grid>
            </Grid>
        </Box>
    );
}

export default JobSearch;
