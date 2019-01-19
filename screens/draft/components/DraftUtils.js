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
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.setDraft(res.success);
                    if ('id' in res.success) {
                        this.props.navigation.setParams({
                            onSave: this.editDraft,
                            onExport: this.exportDraft,
                        });
                    }
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };

    exportDraft = () => {
        let paramsObject = this.createParamsObject();
        this.DraftRequests.exportDraft(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert(res.success, 'success');
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to export draft at this time', 'danger');
            });
    };

    createDraft = () => {
        let paramsObject = this.createParamsObject();
        this.DraftRequests.createDraft(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.setDraft(res.success);
                    this.props.navigation.setParams({
                        onSave: this.editDraft,
                        onExport: this.exportDraft,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to create draft at this time', 'danger');
            });
    };

    // We only have one draft per story
    editDraft = () => {
        Keyboard.dismiss();
        let paramsObject = this.createParamsObject();
        this.DraftRequests.editDraft(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.setDraft(res.success);
                    this.props.showAlert('Successfully saved draft changes!', 'success');
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to edit draft at this time', 'danger');
            });
    };

    deleteDraft = () => {
        let paramsObject = this.createParamsObject();
        this.DraftRequests.editDraft(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    // As of right now - we only allow one draft. set to an empty array
                    this.props.setDraft([]);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to edit draft at this time', 'danger');
            });
    };
}
