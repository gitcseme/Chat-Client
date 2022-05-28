import Axios from 'axios';
import store from '../store';
import router from '../router';
import AccountService from '../services/AccountService';

Axios.defaults.withCredentials = true;
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080';

const auth = store.getters.isAuthenticated;
if (!auth) {
    AccountService.getUserInfo().then(response => {
        store.dispatch('setAuthStatus', true);
        store.dispatch('setUser', response);
        console.log('axios: settings store');
        router.push({ name: 'dashboard' })
    })
    .catch(error => {
        //router.push('/login');
        console.log('axios: ', error);
    })
}

Axios.interceptors.response.use(
    function(response) {
        return response;
    },
    function(error) {
        console.log('eeeerrrrrrr: ', error);
        if (error.response.status === 401) {
            console.log('401 error: ', error);
            router.push({ name: 'login' });
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
