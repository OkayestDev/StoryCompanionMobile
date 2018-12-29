import StoryCompanion from '../../../utils/StoryCompanion.js';
import DraftRequests from '../../../utils/DraftRequests.js';
import { Keyboard } from 'react-native';

export default class DraftUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.DraftRequests = new DraftRequests();
    }

    componentDidMount() {
        this.getDrafts();
    }

    // Only allowing one draft per story at this time
    getDrafts = () => {
        let paramsObject = this.createParamsObject();
        this.DraftRequests.getDrafts(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState({
                        draft: res.success,
                        description: 'description' in res.success ? res.success.description : '',
                        selectedDraftId: 'id' in res.success ? res.success.id : '',
                    });
                    if ('id' in res.success) {
                        this.props.navigation.setParams({
                            onSave: this.editDraft,
                            onExport: this.exportDraft,
                        });
                    }
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

    exportDraft = () => {
        let paramsObject = this.createParamsObject();
        this.DraftRequests.exportDraft(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.showAlert(res.error, 'warning');
                } else {
                    this.showAlert(res.success, 'success');
                }
            })
            .catch(() => {
                this.showAlert('Unable to export draft at this time', 'danger');
            });
    };

    createDraft = () => {
        let paramsObject = this.createParamsObject();
        this.DraftRequests.createDraft(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: false,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState({
                        draft: res.success,
                        selectedDraftId: 'id' in res.success ? res.success.id : '',
                    });
                    this.props.navigation.setParams({
                        onSave: this.editDraft,
                        onExport: this.exportDraft,
                    });
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: false,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to create draft at this time',
                });
            });
    };

    // We only have one draft per story
    editDraft = () => {
        Keyboard.dismiss();
        let paramsObject = this.createParamsObject();
        this.DraftRequests.editDraft(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: false,
                        globalAlertType: 'danger',
                        globalAlertMessage: 'Unable to edit draft at this time',
                    });
                } else {
                    this.setState({
                        draft: res.success,
                        description: res.success.description,
                        globalAlertVisible: true,
                        globalAlertType: 'success',
                        globalAlertMessage: 'Successfully saved draft changes!',
                    });
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to edit draft at this time',
                });
            });
    };

    deleteDraft = () => {
        let paramsObject = this.createParamsObject();
        this.DraftRequests.editDraft(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: 'Unable to edit draft at this time',
                    });
                } else {
                    // As of right now - we only allow one draft. set to an empty array
                    this.setState({ draft: [] });
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to edit draft at this time',
                });
            });
    };
}
