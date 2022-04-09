import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import AxiosInstance from '../../utils/AxiosApi';


const EmployerBtn = () => {
    const user = useSelector((state) => state?.user);
    const navigate = useNavigate();

    const handleClick = () => {
        if (user.is_authenticated) {
            AxiosInstance.get(`api/user-company/`).then((response) => {
                if (response.data.length === 0) {
                    navigate('/employer-dash/');
                } else {
                    navigate('/employer-login/');
                }
            });
        } else {
            navigate('/employer-login/')
        }
    }

    return (
        <Button color="inherit" onClick={handleClick}>Publicați un loc de muncă</Button>
    );
}

export default EmployerBtn;
