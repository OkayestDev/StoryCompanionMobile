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
            this.props.showAlert('Please enter a valid email', 'warning');
            return;
        }
        let paramsObject = this.createParamsObject();
        this.UserRequests.passwordReset(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert(
                        'Temporary password sent to ' + this.state.email,
                        'success'
                    );
                    this.setState({
                        email: '',
                    });
                    setTimeout(() => this.props.navigation.navigate('Login'), 3000);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };
}
