import StoryCompanion from '../../../utils/StoryCompanion.js';
import StoryRequests from '../../../utils/StoryRequests.js';

export default class StoryUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.StoryRequests = new StoryRequests();
    }

    resetStory = () => {
        this.removeNavigationActions();
        return {
            name: '',
            description: '',
            image: '',
            selectedTagId: '',
            selectedStoryId: null,
        };
    };

    componentDidMount() {
        // this.getStories();
        // this.getTags();
    }

    getStories = () => {
        let paramsObject = this.createParamsObject();
        this.StoryRequests.getStories(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.props.setStories(res.success);
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to get response from server',
                });
            });
    };

    createStory = async () => {
        let image = this.state.image;
        if (image instanceof Object) {
            image = await this.StoryRequests.uploadImageToS3(
                'story',
                this.state.image,
                this.props.userId
            );
        }
        let paramsObject = this.createParamsObject();
        paramsObject['image'] = image;
        this.StoryRequests.createStory(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState(this.resetStory());
                    this.props.setStories(res.success);
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to create story at this time',
                });
            });
    };

    editStory = async () => {
        let image = this.state.image;
        if (image instanceof Object) {
            image = await this.StoryRequests.uploadImageToS3(
                'story',
                this.state.image,
                this.state.selectedStoryId
            );
        }
        let paramsObject = this.createParamsObject();
        paramsObject['image'] = image;
        this.StoryRequests.editStory(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    let tempStories = this.props.stories;
                    tempStories[this.state.selectedStoryId] = res.success;
                    this.setState(this.resetStory());
                    this.props.setStories(tempStories);
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to get response from server',
                });
            });
    };

    deleteStory = () => {
        let paramsObject = this.createParamsObject();
        this.StoryRequests.deleteStory(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    let tempStories = this.props.stories;
                    delete tempStories[this.state.selectedStoryId];
                    this.setState(this.resetStory());
                    this.props.setStories(tempStories);
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to get response from server',
                });
            });
    };
}
