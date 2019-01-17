import StoryCompanion from '../../../utils/StoryCompanion.js';
import TagRequests from '../../../utils/TagRequests.js';

export default class TagUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.TagRequests = new TagRequests();
    }

    resetTag = () => {
        this.removeNavigationActions();
        this.props.resetTag();
    };

    newTag = () => {
        this.setNavigationActions(this.resetTag, this.createTag, null);
        this.props.newTag();
    };

    selectTag = id => {
        this.setNavigationActions(this.resetTag, this.editTag, this.props.openConfirmation);
        this.props.selectTag(id);
    };

    componentDidMount() {
        this.getTags();
    }

    getTags = () => {
        let paramsObject = this.createParamsObject();
        this.TagRequests.getTags(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.setTags(res.success);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get Tags at this time', 'danger');
            });
    };

    createTag = () => {
        let paramsObject = this.createParamsObject();
        this.TagRequests.createTag(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.resetState();
                    this.props.setTags(res.success);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to create tag at this time', 'danger');
            });
    };

    deleteTag = () => {
        let paramsObject = this.createParamsObject();
        this.TagRequests.deleteTag(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempTags = this.props.tags;
                    delete tempTags[this.state.selectedTagId];
                    this.resetTag();
                    this.props.setTags(tempTags);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to delete tag at this time', 'danger');
            });
    };

    editTag = () => {
        let paramsObject = this.createParamsObject();
        this.TagRequests.editTag(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempTags = this.props.tags;
                    tempTags[this.state.selectedTagId] = res.success;
                    this.resetTag();
                    this.props.setTags(tempTags);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to edit tag at this time', 'warning');
            });
    };
}
