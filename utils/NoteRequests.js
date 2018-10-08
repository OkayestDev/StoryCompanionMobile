import { 
    postRequestWithFormData,
} from './HelperFunctions.js';

export default class NoteRequests {
    getNotes = (storyId) => {
        let paramsObject = {
            story: storyId,
        };
        return postRequestWithFormData(paramsObject, 'note/view', {}).then(res => res);
    }

    createNote = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'note/creation', {}).then(res => res);
    }

    editNote = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'note/edit', {}).then(res => res);
    }

    deleteNote = (noteId) => {
        let paramsObject = {
            note: noteId
        };
        return postRequestWithFormData(paramsObject, 'note/delete', {}).then(res => res);
    }
}