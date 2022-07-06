import React from 'react';
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import AxiosInstance from "../../utils/AxiosApi";

const ProtectedRoute = ({children}) => {
    const user = useSelector((state) => state?.user);

    if (!user.is_authenticated) {
        return <Navigate to={"/login/"}/>;
    }
    AxiosInstance.get('/user-company/').then((response) => {
        if (response.data.length === 0) {
            return <Navigate to={'/employer/account-details/'}/>;
        }
    });
    return children;
};

// https://www.robinwieruch.de/react-router-private-routes/

export default ProtectedRoute;
