import { postRequestWithFormData } from './HelperFunctions.js';
import Utilities from './Utilities.js';

// Character is referred to as Person in the back-end. Character is a reserved word in mysql
export default class CharacterRequests extends Utilities {
    getCharacters = paramsObject => {
        return postRequestWithFormData(paramsObject, 'person/view', {}).then(res => res);
    };

    createCharacter = paramsObject => {
        return postRequestWithFormData(paramsObject, 'person/creation', {}).then(res => res);
    };

    editCharacter = paramsObject => {
        return postRequestWithFormData(paramsObject, 'person/edit', {}).then(res => res);
    };

    moveCharacterUp = paramsObject => {
        return postRequestWithFormData(paramsObject, 'person/move_up', {}).then(res => res);
    };

    moveCharacterDown = paramsObject => {
        return postRequestWithFormData(paramsObject, 'person/move_down', {}).then(res => res);
    };

    deleteCharacter = paramsObject => {
        return postRequestWithFormData(paramsObject, 'person/delete', {}).then(res => res);
    };

    exportCharacters = paramsObject => {
        return postRequestWithFormData(paramsObject, 'person/export', {}).then(res => res);
    };
}
