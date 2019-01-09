import StoryCompanion from '../../../utils/StoryCompanion.js';
import TagRequests from '../../../utils/TagRequests.js';

export default class TagUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.TagRequests = new TagRequests();
    }

    resetTag = () => {
        this.removeNavigationActions();
        return {
            selectedTagId: null,
            name: '',
            description: '',
            type: '',
        };
    };

    componentDidMount() {
        this.getTags();
    }

    getTags = () => {
        let paramsObject = this.createParamsObject();
        this.TagRequests.getTags(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        selectedTagId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.props.setTags(res.success);
                }
            })
            .catch(() => {
                this.setState({
                    selectedTagId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to get Tags at this time.',
                });
            });
    };

    createTag = () => {
        let paramsObject = this.createParamsObject();
        this.TagRequests.createTag(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        selectedTagId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState(this.resetTag());
                    this.props.setTags(res.success);
                }
            })
            .catch(error => {
                console.info(error);
                this.setState({
                    selectedTagId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to create tag at this time',
                });
            });
    };

    deleteTag = () => {
        let paramsObject = this.createParamsObject();
        this.TagRequests.deleteTag(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        selectedTagId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                } else {
                    let tempTags = this.props.tags;
                    delete tempTags[this.state.selectedTagId];
                    this.setState(this.resetTag());
                    this.props.setTags(tempTags);
                }
            })
            .catch(() => {
                this.setState({
                    selectedTagId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to delete tag at this time',
                });
            });
    };

    editTag = () => {
        let paramsObject = this.createParamsObject();
        this.TagRequests.editTag(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        selectedTagId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    let tempTags = this.props.tags;
                    tempTags[this.state.selectedTagId] = res.success;
                    this.setState(this.resetTag());
                    this.props.setTags(tempTags);
                }
            })
            .catch(() => {
                this.setState({
                    selectedTagId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to edit tag at this time',
                });
            });
    };
}
