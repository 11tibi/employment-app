import React, {useState} from 'react';
import {Typography, Grid, TextField, Button, Box} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function FindJob(props) {
    const [position, setPosition] = useState('');
    const [where, setWhere] = useState('');

    const handleSubmit = () => {

    }

    return (
        <Box mx={6}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant={'h4'} align={'center'} my={10}>
                        Caută loc un loc de muncă
                    </Typography>
                </Grid>
                <Grid item md={5} xs={12}>
                    <TextField fullWidth label={'Ce'} value={position}
                               onChange={(e) => setPosition(e.target.value)}/>
                </Grid>
                <Grid item md={5} xs={12}>
                    <TextField fullWidth label={'Unde'} value={where}
                               onChange={(e) => setWhere(e.target.value)}/>
                </Grid>
                <Grid item md={2} xs={12} sx={{display: 'flex'}}>
                    <Button fullWidth variant={'contained'} onClick={handleSubmit} endIcon={<SearchIcon />}>
                        Caută
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default FindJob;
