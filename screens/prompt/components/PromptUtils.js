import PromptRequests from '../../../utils/PromptRequests.js';
import StoryCompanion from '../../../utils/StoryCompanion.js';

export default class PromptUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.PromptRequests = new PromptRequests();
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
        this.PromptRequests.createPrompt(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.showAlert(res.error, 'warning');
                } else {
                    this.props.setPrompt(res.success);
                }
            })
            .catch(() => this.showAlert('Unable to fetch prompt at this time', 'danger'));
    };

    downVotePrompt = id => {
        let paramsObject = this.createParamsObject();
        paramsObject['prompt'] = id;
        this.PromptRequests.downVotePrompt(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.showAlert(res.error, 'warning');
                } else {
                    this.props.setPrompt(null);
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
                }
            })
            .catch(() => this.showAlert('Unable to create prompt at this time', 'danger'));
    };
}
