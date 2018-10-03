import { 
    postRequestWithFormData,
    getData,
} from './HelperFunctions.js';

export default class StoryRequests {
    getStories = (userId) => {
        let paramObject = {
            user: userId
        };
        return postRequestWithFormData(paramObject, 'story/view', {}).then(res => res);
    }

    createStory = (name, description, userId) => {
        let paramObject = {
            name: name,
            description: description,
            user: userId
        };
        return postRequestWithFormData(paramObject, 'story/creation', {}).then(res => res);
    }

    editStory = (storyId, name, description) => {
        let paramObject = {
            story: storyId,
            name: name,
            description: description
        };
        return postRequestWithFormData(paramObject, 'story/edit', {}).then(res => res);
    }

    deleteStory = (storyId) => {
        let paramObject = {
            story: storyId
        };
        return postRequestWithFormData(paramObject, 'story/delete', {}).then(res => res);
    }
}