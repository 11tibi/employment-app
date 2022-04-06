import AxiosInstance from './AxiosApi';
import { useDispatch, useSelector } from "react-redux";
import {setUser} from "../actions/user";
import store from '../store';

const FetchUser = () => {
    AxiosInstance.get('/api/user/').then((response) => {
        let userState = response.data;
        userState.is_authenticated = true;
        store.dispatch(setUser(userState));
    })
}

export default FetchUser;
