import PromptRequests from '../../../utils/PromptRequests.js';
import StoryCompanion from '../../../utils/StoryCompanion.js';

export default class PromptUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.PromptRequests = new PromptRequests();
    }

    componentDidMount() {
        let now = new Date().getTime();
        let anHour = 1000 * 60 * 60;
        if (!this.props.prompt || this.props.prompt + anHour <= now) {
            this.getPrompt();
        }
    }

    resetPrompt = () => {
        this.removeNavigationActions();
        return {
            name: '',
            description: '',
            creatingPrompt: null,
        };
    };

    getPrompt = () => {
        const paramsObject = this.createParamsObject();
        this.PromptRequests.getPrompt(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.showAlert(res.error, 'warning');
                } else {
                    this.props.setPrompt(res.success);
                }
            })
            .catch(() => this.showAlert('Unable to fetch prompt at this time', 'danger'));
    };

    downVotePrompt = () => {
        let paramsObject = this.createParamsObject();
        paramsObject['prompt'] = this.props.prompt.id;
        this.PromptRequests.downVotePrompt(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.showAlert(res.error, 'warning');
                } else {
                    this.props.getPrompt();
                }
            })
            .catch(() => this.showAlert('Unable to down vote prompt at this time', 'darning'));
    };

    createPrompt = () => {
        const paramsObject = this.createParamsObject();
        this.PromptRequests.createPrompt(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.showAlert(res.error, 'warning');
                } else {
                    this.showAlert(res.success, 'success');
                    this.setState(this.resetPrompt());
                }
            })
            .catch(() => this.showAlert('Unable to create prompt at this time', 'danger'));
    };

    promptToStory = () => {
        let paramsObject = this.createParamsObject();
        paramsObject['prompt'] = this.props.prompt.id;
        this.PromptRequests.promptToStory(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.showAlert(res.error, 'warning');
                } else {
                    let tempStories = this.props.stories;
                    tempStories[res.success.id] = res.success;
                    this.props.setStories(tempStories);
                    this.showAlert('Successfully created story', 'success');
                    this.setState({
                        creatingPrompt: null,
                        isConfirmationModalOpen: false,
                    });
                }
            })
            .catch(() => this.showAlert('Unable to create a story at this time', 'danger'));
    };
}
