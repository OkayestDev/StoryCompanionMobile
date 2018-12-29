import StoryCompanion from '../../../utils/StoryCompanion.js';
import UserRequests from '../../../utils/UserRequests.js';
import { PATTERNS } from '../../../config/Patterns.js';

export default class CreateAccountUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.UserRequests = new UserRequests();
    }

    doEmailsMatch = () => {
        if (this.state.email === this.state.confirmEmail) {
            return true;
        }
        return false;
    };

    doPasswordsMatch = () => {
        if (this.state.password === this.state.confirmPassword) {
            return true;
        }
        return false;
    };

    isEmailValid = email => {
        if (PATTERNS.email.test(email)) {
            return true;
        }
        return false;
    };

    isPasswordValid = password => {
        if (password.length > 6) {
            return true;
        } else {
            return false;
        }
    };

    createAccount = () => {
        if (
            this.doEmailsMatch() &&
            this.doPasswordsMatch() &&
            this.isEmailValid(this.state.email) &&
            this.isPasswordValid(this.state.password)
        ) {
            let paramsObject = this.createParamsObject();
            this.UserRequests.createAccount(paramsObject)
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
                            globalAlertMessage: 'Successfully Created Account',
                        });

                        setTimeout(() => {
                            this.resetState();
                            this.props.navigation.navigate('Login');
                        }, 2000);
                    }
                })
                .catch(error => {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: 'Unable to get response from server',
                    });
                });
        } else {
            if (!this.doEmailsMatch()) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: 'Ensure Emails Match',
                });
            } else if (!this.doPasswordsMatch()) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: 'Ensure Passwords Match',
                });
            } else if (!this.isEmailValid()) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: 'Please provide a valid email',
                });
            } else if (!this.isPasswordValid()) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: 'Ensure passwords are at least 6 characters long',
                });
            }
        }
    };
}
