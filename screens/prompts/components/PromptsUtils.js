import StoryCompanion from '../../../utils/StoryCompanion.js';
import PromptRequests from '../../../utils/PromptRequests.js';

export default class PromptsUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.PromptRequests = new PromptRequests();
    }

    getPrompt = () => {};

    createPrompt = () => {};

    downVotePrompt = () => {};
}
