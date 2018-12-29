import StoryCompanion from '../../../utils/StoryCompanion.js';
import SettingRequests from '../../../utils/SettingsRequests.js';
import UserRequests from '../../../utils/UserRequests.js';

export default class SettingsUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.SettingsRequests = new SettingRequests();
        this.UserRequests = new UserRequests();
    }

    changePassword = () => {
        if (this.state.password.length < 6) {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'warning',
                globalAlertMessage: 'Ensure passwords are at least 6 characters long',
            });
            return;
        }

        if (this.state.password === '') {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'warning',
                globalAlertMessage: 'Passwords cannot be empty',
            });
            return;
        }

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'warning',
                globalAlertMessage: 'Passwords do not match',
            });
            return;
        }

        let paramsObject = this.createParamsObject();
        this.UserRequests.changePassword(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'success',
                        globalAlertMessage: 'Successfully updated password',
                        changingPassword: false,
                        password: '',
                        confirmPassword: '',
                    });
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

    bug = () => {
        let paramsObject = this.createParamsObject();
        this.SettingsRequests.bug(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'success',
                        globalAlertMessage: 'Successfully submitted bug. Thank you!',
                        submittingBug: false,
                        bugDescription: '',
                    });
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to submit bug at this time',
                });
            });
    };

    feature = () => {
        let paramsObject = this.createParamsObject();
        this.SettingsRequests.feature(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'success',
                        globalAlertMessage: 'Successfully submitted feature. Thank you!',
                        submittingFeature: false,
                        featureDescription: '',
                    });
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to submit feature at this time',
                });
            });
    };

    logout = () => {
        this.props.logout();
        this.props.navigation.navigate('LoginTab');
    };
}
