import { 
    postRequestWithFormData,
} from './HelperFunctions.js';

export default class SettingRequests {
    bug = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'settings/bug', {}).then(res => res);
    }

    feature = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'settings/feature', {}).then(res => res);
    }
}