import StoryCompanion from '../../../utils/StoryCompanion.js';
import UserRequests from '../../../utils/UserRequests.js';
import { PATTERNS } from '../../../config/Patterns.js';

export default class CreateAccountUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.UserRequests = new UserRequests();
    }

    resetState = () => {
        this.setState({
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
        });
    };

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
                        this.props.showAlert(res.error, 'danger');
                    } else {
                        this.props.showAlert('Successfully Created Account', 'success');
                        setTimeout(() => {
                            this.resetState();
                            this.props.navigation.navigate('Login');
                        }, 2000);
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to get a response from server', 'danger');
                });
        } else {
            if (!this.doEmailsMatch()) {
                this.props.showAlert('Ensure Emails Match', 'warning');
            } else if (!this.doPasswordsMatch()) {
                this.props.showAlert('Ensure Passwords Match', 'warning');
            } else if (!this.isEmailValid()) {
                this.props.showAlert('Please provide a valid email', 'warning');
            } else if (!this.isPasswordValid()) {
                this.props.showAlert('Ensure passwords are at least 6 characters long', 'warning');
            }
        }
    };
}
