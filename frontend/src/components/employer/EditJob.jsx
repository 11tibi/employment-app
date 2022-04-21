import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import AxiosInstance from "../../utils/AxiosApi";

const EditJob = () => {
    const [title, setTitle] = useState('');
    const [jobType, setJobType] = useState('');
    const [salaryMin, setSalaryMin] = useState(0);
    const [salaryMax, setSalaryMax] = useState(0);
    const [salaryInterval, setSalaryInterval] = useState('');
    const [numberOfEmployees, setNumberOfEmployees] = useState(0);
    const [expiresAt, setExpiresAt] = useState(null);
    const [description, setDescription] = useState()

    useEffect(() => {

    }, []);

    let {id} = useParams();

    return (
        <>

        </>
    )
}

export default EditJob;
