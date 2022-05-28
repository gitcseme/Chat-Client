import AccountApi from '../api/AccountApi';

export default {
    login(loginCredentials) {
        return AccountApi.login(loginCredentials);
    },
    getUserInfo() {
        return AccountApi.getUserInfo();
    }
}