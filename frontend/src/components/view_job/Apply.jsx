import React, {useState, useEffect, useRef} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Grid, Typography, Box, Button, Divider} from "@mui/material";
import AxiosInstance from "../../utils/AxiosApi";
import EditIcon from '@mui/icons-material/Edit';
import {Serialize} from "../../utils/EditorSerializer";
import TextEditor from "../editor/TextEditor";
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Apply = (props) => {
    const [cv, setCv] = useState({});
    const [job, setJob] = useState({description: '{}'});
    const [letterOfIntent, setLetterOfIntent] = useState([
        {
            type: 'paragraph',
            children: [{text: ''}],
        },
    ]);
    const [file, setFile] = useState("");
    const fileRef = useRef()

    const navigate = useNavigate();
    const location = useLocation();

    const id = location?.state?.id;

    useEffect((() => {
        if (location.state === null) {
            navigate('/login/');
        } else {
            AxiosInstance.get(`api/job/search/${id}/`).then((response) => {
                setJob(response.data);
            });
            AxiosInstance.get('/api/resume/0/').then((response) => {
                setCv(response.data);
            }).catch(() => {
                navigate('/login/');
            });
        }
    }), []);

    const handleSubmit = () => {
        let formData = new FormData();
        formData.append('letter_of_intent', JSON.stringify(letterOfIntent));
        formData.append('job', id);
        formData.append("letter_of_intent_path", file);

        AxiosInstance.post('api/apply/', formData).then((r) => {
            navigate(`/viewjob/${id}/`);
        });
    };

    return (
        <Box m={3}>
            <Grid container>
                <Grid item md={6} xs={12} my={3} px={3}>
                    <Typography variant={'text'}>
                        Adaugă un CV
                    </Typography>
                    <Box sx={{p: 3, my: 4, borderRadius: '16px', borderColor: 'primary', border: 1}}>
                        <Typography variant={"text"}>
                            Cv
                        </Typography>
                        <Divider sx={{my: 2}}/>
                        <Typography variant={"textBold"}>
                            {cv.user?.first_name} {cv.user?.last_name}
                        </Typography>
                        <Typography>
                            {cv.user?.email}
                        </Typography>
                        <Typography>
                            {cv.phone_number}
                        </Typography>
                        <Typography>
                            {cv.location}
                        </Typography>
                        <Button fullWidth variant={"outlined"} startIcon={<EditIcon/>} sx={{mt: 2}} onClick={() => {
                            navigate("/employee/resume/editor/");
                        }}>
                            Editează cv-ul
                        </Button>
                    </Box>
                    <Box sx={{p: 3, my: 4, borderRadius: '16px', borderColor: 'primary', border: 1}}>
                        <Typography variant={"textBold"}>
                            Scrisoare de intenție (optional)
                        </Typography>
                        <Box mt={3}>
                            <TextEditor value={letterOfIntent} onChange={(e) => {
                                setLetterOfIntent(e)
                            }}/>
                        </Box>
                        <Box sx={{p: 3, mt: 3, borderRadius: '16px', border: 1, display: 'flex', cursor: 'pointer'}}
                             onClick={() => {
                                 fileRef.current.click()
                             }}>
                            <input type="file" hidden ref={fileRef}
                                   onChange={(e) => setFile(e.target.files[0])}/>
                            <Box sx={{display: "flex", marginY: "auto"}}>
                                <UploadFileIcon sx={{mr: 3}}/>
                            </Box>
                            <Box>
                                <Typography variant={"textBold"}>
                                    Încărcați un fișier
                                </Typography>
                                <Typography>{file?.name?.split("\\").pop()}</Typography>
                            </Box>
                        </Box>
                        <Box mt={2} mx={1}>
                            <Typography variant={"textSmall"}>
                                Tipuri de fișiere acceptate: pdf, docx, doc
                            </Typography>
                        </Box>
                        <Button fullWidth sx={{mt: 2}} variant={"contained"} onClick={handleSubmit}>
                            Trimite
                        </Button>
                    </Box>
                </Grid>
                <Grid item md={6} xs={12} my={3}>
                    <Box
                        sx={{p: 3, my: 4, borderRadius: '16px', borderColor: 'primary', border: 1}}>
                        <Typography variant={"textBold"}>
                            {job.title}
                        </Typography>
                        <Typography>
                            {job.company?.name} - {job.location?.city}
                        </Typography>
                        <Divider sx={{my: 2}}/>
                        <Box sx={{mx: 3}}>
                            {Serialize(JSON.parse(job.description))}
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Apply;