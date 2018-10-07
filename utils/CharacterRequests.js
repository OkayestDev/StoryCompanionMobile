import { 
    postRequestWithFormData,
    getData,
    createQueryString,
} from './HelperFunctions.js';
import { RNS3 } from 'react-native-aws3'; 

const options = {
    keyPrefix: "",
    bucket: "story-companion",
    region: "us-east-1",
    accessKey: "AKIAJXWONLPYBWQPEAKQ",
    secretKey: "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",
    successActionStatus: 201
};

const supportedImageTypes = [
    'image/gif',
    'image/jpeg',
    'image/png',
    // @TODO add more
];

// Character is referred to as Person in the back-end. Character is a reserved word in mysql
export default class CharacterRequests {

    /**
     * Give a file, return the URL the file is uploaded to.
     * this.state.image holds the - we store the URL the file is stored at however.
     * we prepend the image name with the story_id to ensure uniqueness.
     */
    uploadCharacterImageToS3 = async (fileObject, storyId) => {
        let fileName = fileObject.uri.split('.');
        let fileExtension = fileName[fileName.length - 1];
        let now = new Date();
        fileName = storyId + '-' + now.getTime() + '.' + fileExtension;
        let file = {
            uri: fileObject.uri,
            name: fileName,
            type: 'image/' + fileExtension,
        };
        return RNS3.put(file, options).then((res) => {
            let imageUrl = "https://s3.amazonaws.com/story-companion/" + fileName; 
            return imageUrl;
        });
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