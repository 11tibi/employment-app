import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import CreateAccount from '../authentication/CreateAccount';
import Login from '../authentication/Login';
import Navbar from '../navbar/Navbar';
import EmployerLogin from '../authentication/EmployerLogin';
import EmployerDashboard from '../employer/EmployerDashboard';
import AccountDetails from '../employer/AccountDetails';
import CreatePost from '../employer/CreatePost';
import EditJob from '../employer/EditJob';
import ResumeEdit from '../employee/ResumeEdit/ResumeEdit';

const Router = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/register/' element={<CreateAccount />} />
                <Route path='/login/' element={<Login />} />
                <Route path='/employer-login/' element={<EmployerLogin />} />
                <Route path='/employer-dash/' element={<EmployerDashboard />} />
                <Route path='/employer/account-details/' element={<AccountDetails />} />
                <Route path='/employer/create/' element={<CreatePost />} />
                <Route path='/employer/edit-job/:id/' element={<EditJob />} />
                <Route path='/employee/resume/editor/' element={<ResumeEdit />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
