import React, {useState} from 'react';
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, FormControl, FormControlLabel, Radio, RadioGroup, Typography
} from "@mui/material";
import AxiosInstance from "../../utils/AxiosApi";

const ReportDialog = (props) => {
    const [reason, setReason] = useState('');

    const handleSubmit = () => {
        const data = {
            reason,
            job_id: props.id,
        };
        AxiosInstance.post('api/report-job/', data).then();
        props.handleClose();
    }

    return (
        <Dialog
            open={props.isOpen}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Raportați acest loc de muncă
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <FormControl sx={{my: 2}}>
                        <Typography variant={'textBold'}>Motiv</Typography>
                        <RadioGroup
                            value={reason}
                            onChange={(event) => {setReason(event.target.value)}}
                        >
                            <FormControlLabel value="Spam" control={<Radio/>} label="Spam"/>
                            <FormControlLabel value="Inappropriate" control={<Radio/>} label="Inadecvat"/>
                            <FormControlLabel value="Incorrect" control={<Radio/>} label="Este incorect"/>
                            <FormControlLabel value="Other" control={<Radio/>} label="Altele"/>
                        </RadioGroup>
                    </FormControl>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Anulează</Button>
                <Button onClick={handleSubmit} autoFocus>
                    Trimite
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReportDialog;
