import { 
    postRequestWithFormData,
} from './HelperFunctions.js';

export default class TagRequests {
    getTags = (userId) => {
        let paramsObject = {
            user: userId
        };
        return postRequestWithFormData(paramsObject, 'tag/view', {}).then(res => res);
    }

    createTag = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'tag/create', {}).then(res => res);
    }

    deleteTag = (tagId) => {
        let paramsObject = {
            tag: tagId
        };
        return postRequestWithFormData(paramsObject, 'tag/delete', {}).then(res => res);
    }

    editTag = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'tag/edit', {}).then(res => res);
    }
}