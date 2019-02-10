import { postRequestWithFormData } from './HelperFunctions.js';

export default class UserRequests {
    login = paramsObject => {
        return postRequestWithFormData(paramsObject, 'user/login', {}).then(res => res);
    };

    createAccount = paramsObject => {
        return postRequestWithFormData(paramsObject, 'user/creation', {}).then(res => res);
    };

    passwordReset = paramsObject => {
        return postRequestWithFormData(paramsObject, 'user/password_reset', {}).then(res => res);
    };

    changePassword = paramsObject => {
        return postRequestWithFormData(paramsObject, 'user/change_password', {}).then(res => res);
    };

    changeEmail = paramsObject => {
        return postRequestWithFormData(paramsObject, 'user/change_email', {}).then(res => res);
    };
}
