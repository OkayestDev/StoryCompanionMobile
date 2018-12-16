import { postRequestWithFormData } from './HelperFunctions.js';

export default class NoteRequests {
    getNotes = paramsObject => {
        return postRequestWithFormData(paramsObject, 'note/view', {}).then(res => res);
    };

    createNote = paramsObject => {
        return postRequestWithFormData(paramsObject, 'note/creation', {}).then(res => res);
    };

    editNote = paramsObject => {
        return postRequestWithFormData(paramsObject, 'note/edit', {}).then(res => res);
    };

    deleteNote = paramsObject => {
        return postRequestWithFormData(paramsObject, 'note/delete', {}).then(res => res);
    };

    exportNotes = paramsObject => {
        return postRequestWithFormData(paramsObject, 'note/export', {}).then(res => res);
    };
}
