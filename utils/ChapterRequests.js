import { 
    postRequestWithFormData,
    getData,
    createQueryString,
} from './HelperFunctions.js';

export default class ChapterRequests {
    options = {
        keyPrefix: "",
        bucket: "story-companion",
        region: "us-east-1",
        accessKey: "AKIAJXWONLPYBWQPEAKQ",
        secretKey: "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",
        successActionStatus: 201
    }

    getChapters = (storyId) => {
        let paramsObject = {
            story: storyId
        };
        return postRequestWithFormData(paramsObject, 'chapter/view', {}).then(res => res);
    }

    createChapter = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'chapter/creation', {}).then(res => res);
    }

    editChapter = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'chapter/edit', {}).then(res => res);
    }

    deleteChapter = (chapterId) => {
        let paramsObject = {
            chapter: chapterId
        };
        return postRequestWithFormData(paramsObject, 'chapter/delete', {}).then(res => res);
    }
}