import StoryCompanion from '../../../utils/StoryCompanion.js';
import StoryRequests from '../../../utils/StoryRequests.js';

export default class StoryUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.StoryRequests = new StoryRequests();
    }

    resetStory = () => {
        this.removeNavigationActions();
        this.props.resetStory();
    };

    newStory = () => {
        this.setNavigationActions(this.resetStory, this.createStory, null);
        this.props.newStory();
    };

    selectStory = id => {
        this.setNavigationActions(this.resetStory, this.editStory, this.props.openConfirmation);
        this.props.selectStory(id);
    };

    selectStoryToEditComponents = id => {
        this.props.selectStory(id);
        this.props.navigation.navigate('StoryTab');
    };

    componentDidMount() {
        this.getStories();
        this.getTags();
    }

    getStories = () => {
        let paramsObject = this.createParamsObject();
        this.StoryRequests.getStories(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.setStories(res.success);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get response from server', 'warning');
            });
    };

    createStory = async () => {
        let image = this.props.image;
        if (image instanceof Object) {
            image = await this.StoryRequests.uploadImageToS3(
                'story',
                this.props.image,
                this.props.userId
            );
        }
        let paramsObject = this.createParamsObject();
        paramsObject['image'] = image;
        this.StoryRequests.createStory(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.resetStory();
                    this.props.setStories(res.success);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to create story at this time', 'warning');
            });
    };

    editStory = async () => {
        let image = this.props.image;
        if (image instanceof Object) {
            image = await this.StoryRequests.uploadImageToS3(
                'story',
                this.props.image,
                this.props.userId
            );
        }
        let paramsObject = this.createParamsObject();
        paramsObject['image'] = image;
        this.StoryRequests.editStory(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempStories = this.props.stories;
                    tempStories[this.props.selectedStoryId] = res.success;
                    this.resetStory();
                    this.props.setStories(tempStories);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to edit story at this time', 'warning');
            });
    };

    deleteStory = () => {
        let paramsObject = this.createParamsObject();
        this.StoryRequests.deleteStory(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempStories = this.props.stories;
                    delete tempStories[this.props.selectedStoryId];
                    this.resetStory();
                    this.props.setStories(tempStories);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to delet story at this time', 'danger');
            });
    };
}
