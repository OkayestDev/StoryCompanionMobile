import UserRequests from '../../../utils/UserRequests.js';
import StoryCompanion from '../../../utils/StoryCompanion.js';
import { PATTERNS } from '../../../config/Patterns.js';

export default class PasswordResetUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.UserRequests = new UserRequests();
    }

    passwordReset = () => {
        if (!PATTERNS.email.test(this.state.email)) {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'warning',
                globalAlertMessage: 'Please enter a valid email',
            });
            return;
        }
        let paramsObject = this.createParamsObject();
        this.UserRequests.passwordReset(paramsObject)
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
                        globalAlertMessage: 'Temporary password sent to ' + this.state.email,
                        email: '',
                    });
                    setTimeout(() => this.props.navigation.navigate('Login'), 3000);
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to get a response from the server',
                });
            });
    };
}
