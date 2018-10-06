import { 
    postRequestWithFormData,
    getData,
    createQueryString,
} from './HelperFunctions.js';

// Character is referred to as Person in the back-end. Character is a reserved word in mysql
export default class CharacterRequests {
    options = {
        keyPrefix: "",
        bucket: "story-companion",
        region: "us-east-1",
        accessKey: "AKIAJXWONLPYBWQPEAKQ",
        secretKey: "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",
        successActionStatus: 201
    }
    
    getCharacters = (storyId) => {
        let paramsObject = {
            story: storyId
        };
        return postRequestWithFormData(paramsObject, 'person/view', {}).then(res => res);
    }

    createCharacter = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'person/creation', {}).then(res => res);
    }

    editCharacter = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'person/edit', {}).then(res => res);
    }

    deleteCharacter = (character) => {
        let paramsObject = {
            character: character
        };
        return postRequestWithFormData(paramsObject, 'person/delete', {}).then(res => res);
    }
}