import UserRequests from '../../../utils/UserRequests.js';
import StoryCompanion from '../../../utils/StoryCompanion.js';

export default class LoginUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.UserRequests = new UserRequests();
    }

    componentWillMount() {
        this.checkIfUserIsAlreadyLoggedIn();
    }

    checkIfUserIsAlreadyLoggedIn = () => {
        if (this.props.userId !== null && this.props.apiKey !== null) {
            this.props.navigation.navigate('StoriesTab');
        }
    };

    login = () => {
        let paramsObject = this.createParamsObject();
        this.UserRequests.login(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.login(res.success);
                    this.props.navigation.navigate('StoriesTab');
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };
}
