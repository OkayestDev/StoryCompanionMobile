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
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.props.login(res.success);
                    this.props.navigation.navigate('StoriesTab');
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
}
