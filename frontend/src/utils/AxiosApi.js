import axios from 'axios';

const AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    timeout: 5000,
    headers: {
        // 'Authorization': "Bearer " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

AxiosInstance.interceptors.request.use(
    (config) => {
        if (localStorage.getItem('access_token')) {
            config.headers['Authorization'] = "Bearer " + localStorage.getItem('access_token');
        }
        return config;
    }
)

AxiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        let prevRequest = error.config;
        if (error.response.status === 401 && !prevRequest._retry) {
            prevRequest._retry = true;
            let refresh = localStorage.getItem('refresh_token');
            let newToken = await AxiosInstance.post('api/token/refresh/', {refresh}).then(response => {
                return response.data;
            });

            localStorage.setItem('access_token', newToken.access);
            prevRequest.headers['Authorization'] = `Bearer ${newToken.access}`;

            return AxiosInstance(prevRequest);
        } else if(error.response.status === 401) {

        }
        return Promise.reject(error);
    }
)

export default AxiosInstance;
