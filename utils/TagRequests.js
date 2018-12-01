import { 
    postRequestWithFormData,
} from './HelperFunctions.js';

export default class TagRequests {
    getTags = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'tag/view', {}).then(res => res);
    }

    createTag = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'tag/creation', {}).then(res => res);
    }

    deleteTag = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'tag/delete', {}).then(res => res);
    }

    editTag = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'tag/edit', {}).then(res => res);
    }
}