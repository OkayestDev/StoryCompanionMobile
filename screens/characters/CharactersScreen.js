import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../store/Actions.js';
import { Icon } from 'react-native-elements';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import GlobalAlert from '../../components/GlobalAlert.js';
import EditEntity from '../../components/EditEntity.js';
import CharacterRequests from '../../utils/CharacterRequests.js';
import StoryCompanion from '../../utils/StoryCompanion.js';

const headerTitle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2f95dc',
    paddingLeft: 20,
};

class CharactersScreen extends StoryCompanion {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Characters',
            headerTitle: (
                <View style={headerTitle}>
                    <TouchableOpacity
                        style={{ marginRight: 15 }}
                        onPress={() => navigation.navigate('StoriesTab')}
                    >
                        <Icon color="white" name="chevron-left" type="font-awesome" size={24} />
                    </TouchableOpacity>
                    <Text
                        numberOfLines={1}
                        style={{ width: '80%', fontWeight: 'bold', color: 'white', fontSize: 28 }}
                    >
                        {navigation.getParam('title')}
                    </Text>
                </View>
            ),
            headerStyle: { backgroundColor: '#2f95dc' },
            headerTitleStyle: { color: 'white' },
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            attribute: '',
            image: '',
            characters: null,
            number: 0,
            selectedCharacterId: null,
            selectedTagId: null,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
        this.CharacterRequests = new CharacterRequests();
        props.navigation.setParams({ title: this.props.stories[this.props.selectedStoryId].name });
    }

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
                        selectedCharacterId: null,
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
                        characters: res.success,
                        name: '',
                        image: '',
                        attribute: '',
                        description: '',
                        selectedCharacterId: null,
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
                        name: '',
                        attribute: '',
                        description: '',
                        image: '',
                        selectedCharacterId: null,
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
                        name: '',
                        description: '',
                        attribute: '',
                        image: '',
                        selectedCharacterId: null,
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

    selectCharacter = id => {
        this.setState({
            selectedCharacterId: id,
            name: this.state.characters[id].name,
            description: this.state.characters[id].description,
            attribute: this.state.characters[id].attribute,
            image: this.state.characters[id].image,
            selectedTagId: this.state.characters[id].tag,
            number: this.state.characters[id].number,
        });
    };

    cancelCharacterEdit = () => {
        this.setState({
            selectedCharacterId: null,
            name: '',
            description: '',
            attribute: '',
            image: '',
            selectedTagId: '',
            number: 0,
        });
    };

    renderCharacters = () => {
        if (this.state.characters === null) {
            return null;
        }

        characterIds = this.sortEntitiesByNumber(this.state.characters);
        characterIds = characterIds.reverse();
        if (characterIds.length > 0) {
            let charactersRendered = [];
            characterIds.forEach(id => {
                charactersRendered.push(
                    <TouchableOpacity
                        key={id}
                        onPress={() => this.selectCharacter(id)}
                        style={styles.characterContainer}
                    >
                        <View style={styles.characterPictureAndName}>
                            <View styles={styles.characterPictureContainer}>
                                {this.state.characters[id].image !== '' ? (
                                    <Image
                                        source={{ uri: this.state.characters[id].image }}
                                        style={styles.characterPicture}
                                    />
                                ) : (
                                    <View style={styles.noPicture} />
                                )}
                            </View>
                            <View style={styles.characterNameAndDescription}>
                                <Text numberOfLines={1} style={styles.characterName}>
                                    {this.state.characters[id].name}
                                </Text>
                                <Text numberOfLines={2} style={styles.characterDescription}>
                                    {this.state.characters[id].description}
                                </Text>
                            </View>
                            <View style={styles.moveCharacterContainer}>
                                <TouchableOpacity
                                    style={styles.moveUp}
                                    onPress={() => this.moveCharacterUp(id)}
                                >
                                    <Icon
                                        color="#2f95dc"
                                        name="caret-up"
                                        type="font-awesome"
                                        size={32}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.characterNumber}>
                                    {this.state.characters[id].number}
                                </Text>
                                <TouchableOpacity
                                    style={styles.moveDown}
                                    onPress={() => this.moveCharacterDown(id)}
                                >
                                    <Icon
                                        color="#2f95dc"
                                        name="caret-down"
                                        type="font-awesome"
                                        size={32}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            });
            return charactersRendered;
        } else {
            return (
                <View style={styles.noCharactersContainer}>
                    <Text style={styles.noCharactersText}>
                        Looks like you haven't created any characters yet.
                    </Text>
                    <Text style={styles.noCharactersText}>
                        Press on the + to create a character!
                    </Text>
                </View>
            );
        }
    };

    render() {
        if (this.state.selectedCharacterId === null) {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <ScrollView>{this.renderCharacters()}</ScrollView>
                    <FloatingAddButton
                        onPress={() => this.setState({ selectedCharacterId: 'new' })}
                    />
                </View>
            );
        } else {
            return (
                <EditEntity
                    selectedEntityId={this.state.selectedCharacterId}
                    entityType="Character"
                    image={this.state.image}
                    imagePickerTitle="Add an image for this character"
                    imagePickerOnChange={newImage => this.setState({ image: newImage })}
                    inputOne={this.state.name}
                    inputOneName="Character Name"
                    inputOneOnChange={newValue => this.setState({ name: newValue })}
                    modalPicker="Tag"
                    modalPickerSelectedValue={
                        this.state.selectedTagId in this.props.tags
                            ? this.props.tags[this.state.selectedTagId].name
                            : ''
                    }
                    modalPickerList={this.filterTagsByType('Character')}
                    modalPickerOnChange={newTag => this.setState({ selectedTagId: newTag })}
                    inputThree={this.state.description}
                    inputThreeName="Description"
                    inputThreeOnChange={newValue => this.setState({ description: newValue })}
                    inputFour={this.state.attribute}
                    inputFourName="Attributes"
                    inputFourOnChange={newValue => this.setState({ attribute: newValue })}
                    createEntity={() => this.createCharacter()}
                    editEntity={() => this.editCharacter()}
                    deleteEntity={() => this.deleteCharacter()}
                    cancelEntityEdit={() => this.cancelCharacterEdit()}
                />
            );
        }
    }
}

export default connect(
    Actions.mapStateToProps,
    Actions.mapDispatchToProps
)(CharactersScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    characterContainer: {
        width: '100%',
        padding: 10,
        height: 125,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    },
    characterPictureAndName: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    characterPictureContainer: {
        width: '24%',
        marginRight: '1%',
    },
    characterNameAndDescription: {
        width: '62%',
        marginLeft: '3%',
    },
    characterPicture: {
        width: 100,
        height: 100,
        borderRadius: 4,
    },
    noPicture: {
        width: 100,
        height: 100,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#CCCCCC',
    },
    characterName: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    characterDescription: {
        fontSize: 18,
    },
    moveCharacterContainer: {
        width: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    characterNumber: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
    },
    moveUp: {
        width: '100%',
        zIndex: 10,
    },
    moveDown: {
        width: '100%',
        zIndex: 10,
    },
    noCharactersContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noCharactersText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 36,
        color: '#CCCCCC',
        fontWeight: 'bold',
    },
});
