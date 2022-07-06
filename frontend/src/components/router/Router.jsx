import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import ProtectedRoute from "./ProtectedRoute";
import CreateAccount from '../authentication/CreateAccount';
import Login from '../authentication/Login';
import Navbar from '../navbar/Navbar';
import EmployerDashboard from '../employer/EmployerDashboard';
import AccountDetails from '../employer/AccountDetails';
import CreatePost from '../employer/CreatePost';
import EditJob from '../employer/EditJob';
import ResumeEdit from '../employee/ResumeEdit/ResumeEdit';
import FindJob from "../find_job/FindJob";
import JobSearch from "../find_job/JobSearch";
import ViewJob from "../view_job/ViewJob";
import Apply from "../view_job/Apply";
import EmployerViewJob from "../employer/EmployerViewJob";
import Candidates from "../employer/Candidates";
import ResumeView from "../employer/ResumeView";

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path={'/register/'} element={<CreateAccount/>}/>
                <Route path={'/login/'} element={<Login/>}/>
                <Route path={'/employer-dash/'} element={<EmployerDashboard/>}/>
                <Route path={'/employer/account-details/'} element={<AccountDetails/>}/>
                <Route path={'/employer/create/'} element={
                    <ProtectedRoute>
                        <CreatePost/>
                    </ProtectedRoute>
                }/>
                <Route path={'/employer/job/:id/'} element={<EmployerViewJob/>}/>
                <Route path={'/employer/edit-job/:id/'} element={<EditJob/>}/>
                <Route path={'/employer/candidates/:id/'} element={<Candidates/>}/>
                <Route path={'/employee/resume/editor/'} element={<ResumeEdit/>}/>
                <Route path={'/find-job/'} element={<FindJob/>}/>
                <Route path={'/jobs/'} element={<JobSearch/>}/>
                <Route path={'/viewjob/:id/'} element={<ViewJob/>}/>
                <Route path={'/apply/'} element={<Apply/>}/>
                <Route path={'/resume-view/:id/'} element={<ResumeView/>}/>
                <Route path={'/'} element={<Navigate to={'/find-job/'}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
