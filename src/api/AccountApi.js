import router from '@/router';
import Axios from 'axios';
import store from '../store';

const base_url = 'https://localhost:7067';
const account_api = base_url + '/api/account';

export default {
    login(loginCredentials) {
        return new Promise((resolve, reject) => {
            Axios.post(account_api + '/login', loginCredentials)
            .then(response => {
                store.dispatch('setAuthStatus', true);
                store.dispatch('setUser', response.data);
                resolve(response.data)
            })
            .catch(error => reject(error));
        });
    },
    logout() { 
        return new Promise((resolve, reject) => {
            Axios.post(account_api + '/logout')
            .then(() => {
                store.dispatch('setAuthStatus', false);
                store.dispatch('setUser', null);
                resolve()
            })
            .catch(error => reject(error));
        });
    },
    getUserInfo() {
        return new Promise((resolve, reject) => {
            Axios.get(account_api + '/user-info')
            .then(response => {
                resolve(response.data)
            })
            .catch(error => reject(error));
        });
    }
}