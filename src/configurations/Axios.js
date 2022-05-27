import Axios from 'axios';
import router from '../router';

Axios.defaults.withCredentials = true;
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080';

Axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        // access vue router and redirect to signin page
        if (error.response.status === 401) {
            console.log('401 error: ', error);
        }
        
        return Promise.reject(error);
    }
)

Axios.interceptors.request.use(
    function(config) {
        console.log('request-intercept: ', config);
        return config;
    }
)
