import { 
    postRequestWithFormData,
    getData,
    createQueryString,
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
}