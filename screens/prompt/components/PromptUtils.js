import PromptRequests from '../../../utils/PromptRequests.js';
import StoryCompanion from '../../../utils/StoryCompanion.js';

export default class PromptUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.PromptRequests = new PromptRequests();
    }

    componentDidMount() {
        this.props.resetPrompt();
        let now = new Date().getTime();
        let tenMinutesInMs = 1000 * 60 * 10;
        if (!this.props.prompt || this.props.updatedAt + tenMinutesInMs <= now) {
            this.getPrompt();
        }
    }

    resetPrompt = () => {
        this.removeNavigationActions();
        this.props.resetPrompt();
    };

    handleDownVotePressed = () => {
        this.props.openConfirmation({
            title: 'Down Vote Prompt?',
            note: "This prompt won't show up for you anymore",
            onConfirm: this.downVotePrompt,
        });
    };

    handlePromptToStoryPressed = () => {
        this.props.openConfirmation({
            title: 'Create Story?',
            note: 'Creates a story based on this prompt',
            onConfirm: this.promptToStory,
        });
    };

    newPrompt = () => {
        this.setNavigationActions(this.resetPrompt, this.createPrompt, null);
        this.props.newPrompt();
    };

    getPrompt = () => {
        const paramsObject = this.createParamsObject();
        this.PromptRequests.getPrompt(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.setPrompt(res.success);
                }
            })
            .catch(() => this.props.showAlert('Unable to fetch prompt at this time', 'danger'));
    };

    downVotePrompt = () => {
        let paramsObject = this.createParamsObject();
        paramsObject['prompt'] = this.props.prompt.id;
        this.PromptRequests.downVotePrompt(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.closeConfirmation();
                    this.getPrompt();
                }
            })
            .catch(() => this.props.showAlert('Unable to down vote prompt at this time', 'danger'));
    };

    createPrompt = () => {
        const paramsObject = this.createParamsObject();
        this.PromptRequests.createPrompt(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert(res.success, 'success');
                    this.resetPrompt();
                }
            })
            .catch(() => this.props.showAlert('Unable to create prompt at this time', 'danger'));
    };

    promptToStory = () => {
        let paramsObject = this.createParamsObject();
        paramsObject['prompt'] = this.props.prompt.id;
        this.PromptRequests.promptToStory(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempStories = this.props.stories;
                    // @TODO having to set to null here so Stories Screen re-renders - Figure why
                    this.props.setStories(null);
                    tempStories[res.success.id] = res.success;
                    this.props.setStories(tempStories);
                    this.props.showAlert('Successfully created story', 'success');
                    this.props.closeConfirmation();
                }
            })
            .catch(() => this.props.showAlert('Unable to create a story at this time', 'danger'));
    };
}
