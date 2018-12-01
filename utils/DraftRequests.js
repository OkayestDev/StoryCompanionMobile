import { 
    postRequestWithFormData,
} from './HelperFunctions.js';

export default class DraftRequests {
    getDrafts = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'draft/view', {}).then(res => res);
    }

    createDraft = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'draft/creation', {}).then(res => res);
    }

    editDraft = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'draft/edit', {}).then(res => res);
    }

    deleteDraft = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'draft/delete', {}).then(res => res);
    }

    exportDraft = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'draft/export', {}).then(res => res);
    }
}