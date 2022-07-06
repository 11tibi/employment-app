import React from 'react';
import {Snackbar} from "@mui/material";

const SnackbarFeedback = (props) => {
    return (
        <Snackbar
            open={props.open}
            autoHideDuration={6000}
            onClose={() => {
                props.handleClose();
            }}
            message={props.message}
        />
    );
};

export default SnackbarFeedback;