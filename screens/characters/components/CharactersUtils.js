import CharacterRequests from '../../../utils/CharacterRequests.js';
import StoryCompanion from '../../../utils/StoryCompanion.js';

export default class CharactersUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.CharacterRequests = new CharacterRequests();
    }

    resetCharacter = () => {
        this.removeNavigationActions();
        return {
            name: '',
            image: '',
            attribute: '',
            description: '',
            selectedCharacterId: null,
        };
    };

    componentDidMount() {
        this.getCharacters();
        this.getTags();
    }

    moveCharacterDown = id => {
        const paramsObject = {
            character: id,
            apiKey: this.props.apiKey,
        };
        this.CharacterRequests.moveCharacterDown(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempCharacters = this.state.characters;
                    tempCharacters[id] = res.success;
                    this.setState({
                        characters: tempCharacters,
                    });
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to move character up at this time', 'danger');
            });
    };

    moveCharacterUp = id => {
        const paramsObject = {
            character: id,
            apiKey: this.props.apiKey,
        };
        this.CharacterRequests.moveCharacterUp(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: 'Unable to move character up at this time',
                    });
                } else {
                    let tempCharacters = this.state.characters;
                    tempCharacters[id] = res.success;
                    this.setState({
                        characters: tempCharacters,
                    });
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to move character up at this time',
                });
            });
    };

    getCharacters = () => {
        let paramsObject = this.createParamsObject();
        this.CharacterRequests.getCharacters(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        selectedCharacterId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState({
                        ...this.resetCharacter(),
                        characters: res.success,
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

    createCharacter = async () => {
        let image = this.state.image;
        // Check if new image has been uploaded
        if (image instanceof Object) {
            image = await this.CharacterRequests.uploadImageToS3(
                'character',
                this.state.image,
                this.props.selectedStoryId
            );
        }
        let paramsObject = this.createParamsObject();
        paramsObject['image'] = image;
        this.CharacterRequests.createCharacter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState({
                        ...this.resetCharacter(),
                        characters: res.success,
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

    editCharacter = async () => {
        let image = this.state.image;
        if (image instanceof Object) {
            image = await this.CharacterRequests.uploadImageToS3(
                'character',
                this.state.image,
                this.props.selectedStoryId
            );
        }
        let paramsObject = this.createParamsObject();
        paramsObject['image'] = image;
        this.CharacterRequests.editCharacter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    let tempCharacters = this.state.characters;
                    tempCharacters[this.state.selectedCharacterId] = res.success;
                    this.setState({
                        characters: tempCharacters,
                        ...this.resetCharacter(),
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

    deleteCharacter = () => {
        let paramsObject = this.createParamsObject();
        this.CharacterRequests.deleteCharacter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    let tempCharacters = this.state.characters;
                    delete tempCharacters[this.state.selectedCharacterId];
                    this.setState({
                        characters: tempCharacters,
                        ...this.resetCharacter(),
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
}
