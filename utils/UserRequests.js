import { 
    postRequestWithFormData,
} from './HelperFunctions.js';

export default class UserRequests {
    login = (email, password) => {
        let paramsObject = {
            email: email,
            password: password
        };
        return postRequestWithFormData(paramsObject, 'user/login', {}).then(res => res);
    }

    createAccount = (email, password) => {
        let paramsObject = {
            email: email,
            password: password
        };
        return postRequestWithFormData(paramsObject, 'user/creation', {}).then(res => res);
    }

    passwordReset = (email) => {
        let paramsObject = {
            email: email
        };
        return postRequestWithFormData(paramsObject, 'user/password_reset', {}).then(res => res);
    }

    changePassword = (password, confirmPassword) => {
        let paramsObject = {
            password: password,
            confirmPassword: confirmPassword
        };
        return postRequestWithFormData(paramsObject, 'user/change_password', {}).then(res => res);
    }
}