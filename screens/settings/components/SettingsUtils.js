import StoryCompanion from '../../../utils/StoryCompanion.js';
import SettingRequests from '../../../utils/SettingsRequests.js';
import UserRequests from '../../../utils/UserRequests.js';

export default class SettingsUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.SettingsRequests = new SettingRequests();
        this.UserRequests = new UserRequests();
        this.props.resetSettings();
    }

    resetSettings = () => {
        this.removeNavigationActions();
        this.props.resetSettings();
    };

    changeEmail = () => {
        if (this.props.newEmail !== this.props.confirmEmail) {
            this.props.showAlert('Ensure emails match', 'warning');
            return;
        }

        if (!this.isEmailValid(this.props.newEmail)) {
            this.props.showAlert('Please provide a valid email', 'warning');
        }

        let paramsObject = this.createParamsObject();
        paramsObject['email'] = this.props.confirmEmail;
        this.UserRequests.changeEmail(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert(
                        'Successfully updated email to ' + this.props.confirmEmail,
                        'success'
                    );
                    this.resetSettings();
                }
            })
            .catch(() => this.props.showAlert('Unable to update email at this time', 'danger'));
    };

    changePassword = () => {
        if (this.props.password.length < 6) {
            this.props.showAlert('Ensure passwords are at least 6 characters long', 'warning');
            return;
        }

        if (this.props.password === '') {
            this.props.showAlert('Passwords cannot be empty', 'warning');
            return;
        }

        if (this.props.password !== this.props.confirmPassword) {
            this.props.showAlert('Passwords do not match', 'warning');
            return;
        }

        let paramsObject = this.createParamsObject();
        this.UserRequests.changePassword(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert('Successfully updated password!', 'success');
                    this.resetSettings();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };

    bug = () => {
        let paramsObject = this.createParamsObject();
        this.SettingsRequests.bug(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.resetSettings();
                    this.props.showAlert('Successfully submitted bug. Thank you!', 'success');
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to submit bug at this time', 'danger');
            });
    };

    feature = () => {
        let paramsObject = this.createParamsObject();
        this.SettingsRequests.feature(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.resetSettings();
                    this.props.showAlert('Successfully submitted feature. Thank you!', 'success');
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to submit feature at this time', 'danger');
            });
    };

    logout = () => {
        this.props.logout();
        this.resetSettings();
        this.props.closeConfirmation();
        this.props.navigation.navigate('LoginTab');
    };
}
