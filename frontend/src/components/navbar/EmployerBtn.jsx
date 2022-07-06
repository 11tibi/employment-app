import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";


const EmployerBtn = () => {
    const user = useSelector((state) => state?.user);
    const navigate = useNavigate();

    const handleClick = () => {
                    navigate('/employer/create/');
    }

    return (
        <Button color="inherit" onClick={handleClick}>Publicați un loc de muncă</Button>
    );
}

export default EmployerBtn;
