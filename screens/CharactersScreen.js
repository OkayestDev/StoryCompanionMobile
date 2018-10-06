import React, { Component } from 'react';
import { View, 
    Text,
    StyleSheet, 
    TouchableOpacity, 
    AsyncStorage, 
    ScrollView 
} from 'react-native';
import { Icon } from 'react-native-elements';
import FloatingAddButton from '../components/FloatingAddButton.js';
import GlobalAlert from '../components/GlobalAlert.js';
import EditEntity from '../components/EditEntity.js';
import CharacterRequests from '../utils/CharacterRequests.js';

const headerTitle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2f95dc',
    paddingLeft: 20,
}

export default class CharactersScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Characters',
            headerTitle: (
                <View style={headerTitle}>
                    <TouchableOpacity 
                        style={{marginRight: 15}}
                        onPress={() => navigation.navigate("StoriesTab")}
                    >
                        <Icon
                            color="white"
                            name="arrow-left"
                            type="font-awesome"
                            size={28}
                        />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{fontWeight: 'bold', color: 'white', fontSize: 28}}>
                        Characters
                    </Text>
                </View>
            ),
            headerStyle: { backgroundColor: '#2f95dc' },
            headerTitleStyle: { color: 'white' },
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            attribute: '',
            image: '',
            characters: null,
            selectedCharacterId: null,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
        this.CharacterRequests = new CharacterRequests();
        //@PROD
        // this.selectedStoryId = null;
        // this.getCharacters();
        // @DEV
        this.selectedStoryId = 1;
        this.getCharacters(1);
    }

    getCharacters = (story = null) => {
        if (story !== null) {
            this.CharacterRequests.getCharacters(story).then((res) => {
                if ('error' in res) {
                    this.setState({
                        selectedPlotId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                }
                else {
                    this.setState({
                        selectedCharacterId: null,
                        characters: res.success
                    });
                }
            })
        }
        else {
            AsyncStorage.getItem('selectedStoryId').then((res) => {
                this.selectedStoryId = res;
                this.getCharacters(res);
            })
        }
    }

    createCharacter = () => {
        let imageURL = '';
        if (this.state.image !== '') {
            imageURL = this.CharacterRequests.uploadCharacterImageToS3(this.state.image, this.selectedStoryId); //@TODO add await
        }
        let paramsObject = {
            story: this.selectedStoryId,
            name: this.state.name,
            image: imageURL,
            description: this.state.description,
            attribute: this.state.attribute,
        };
        this.CharacterRequests.createCharacter(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: res.error,
                });
            }
            else {
                this.setState({
                    characters: res.success,
                    name: '',
                    image: '',
                    attribute: '',
                    description: '',
                });
            }
        })
    }

    editCharacter = () => {
        let imageURL = '';
        if (this.state.image !== '') {
            imageURL = this.CharacterRequests.uploadCharacterImageToS3(this.state.image, this.selectedStoryId); // @TODO add await
        }

        let paramsObject = {
            character: this.state.selectedCharacterId,
            name: this.state.name,
            description: this.state.description,
            attribute: this.state.attribute,
            image: imageURL,
        };
        this.CharacterRequests.editCharacter(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    selectCharacterId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                let tempCharacters = this.state.characters;
                tempCharacters[this.state.selectedCharacterId] = res.success;
                this.setState({
                    characters: tempCharacters,
                    name: '',
                    attribute: '',
                    description: '',
                    image: '',
                });
            }
        })
    }

    deleteCharacter = () => {
        this.CharacterRequests.deleteCharacter(this.state.selectedCharacterId).then((res) => {
            if ('error' in res) {
                this.setState({
                    selectedCharacterId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                let tempCharacters = this.state.characters;
                delete tempCharacters[this.state.selectedCharacterId];
                this.setState({
                    characters: tempCharacters,
                    name: '',
                    description: '',
                    attribute: '',
                    image: '',
                });
            }
        })
    } 

    renderCharacters = () => {
        if (this.state.characters === null) {
            return null;
        }

        characterIds = Object.keys(this.state.characters);
        if (characterIds.length > 0) {
            let charactersRendered = [];
            characterIds.forEach((id) => {
                charactersRendered.push(
                    <View 
                        key={id}
                    >
                        <Text>{this.state.characters[id].name}</Text>
                    </View>
                )
            })
            return charactersRendered;
        }
        else {
            return (
                <View style={styles.noCharactersContainer}>
                    <Text style={styles.noCharactersText}>
                        Looks like you haven't created any characters yet.
                    </Text>
                    <Text style={styles.noCharactersText}>
                        Press on the + to create a character!
                    </Text>
                </View>
            )
        }
    }

    selectCharacter = (id) => {
        this.setState({
            selectCharacterId: id,
            name: this.state.characters[id].name,
            description: this.state.characters[id].description,
            attribute: this.state.characters[id].attribute,
            image: this.state.characters[id].image,
        })
    }

    cancelCharacterEdit = () => {
        this.setState({
            selectedCharacterId: null,
            name: '',
            description: '',
            attribute: '',
            image: '',
        });
    }

    createCharacter = () => {
        let paramsObject = {
            story: this.selectedStoryId,
            name: this.state.name,
            description: this.state.description,
            image: this.state.image,
            attribute: this.state.attribute,
        }
        this.CharacterRequests.createCharacter(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    selectedPlotId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: res.error,
                });
            }
            else {
                this.setState({
                    selectedCharacterId: null,
                    characters: res.success,
                });
            }
        });
    }

    render() {
        if (this.state.selectedCharacterId === null) {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <ScrollView>
                        {this.renderCharacters()}
                    </ScrollView>
                    <FloatingAddButton onPress={() => this.setState({selectedCharacterId: 'new'})}/>
                </View>
            )
        }
        else {
            return (
                <EditEntity
                        selectedEntityId={this.state.selectedCharacterId}
                        entityType="Character"

                        image={this.state.image}
                        imagePickerTitle="Add an image for this character"
                        imagePickerOnChange={(newImage) => this.setState({image: newImage})}

                        inputOne={this.state.name}
                        inputOneName="Character Name"
                        inputOneOnChange={(newValue) => this.setState({name: newValue})}

                        inputThree={this.state.description}
                        inputThreeName="Description"
                        inputThreeOnChange={(newValue) => this.setState({description: newValue})}

                        inputFour={this.state.attribute}
                        inputFourName="Attributes"
                        inputFourOnChange={(newValue) => this.setState({attribute: newValue})}

                        createEntity={() => this.createCharacter()}
                        editEntity={() => this.editCharacter()}
                        deleteEntity={() => this.deleteCharacter()}
                        cancelEntityEdit={() => this.cancelCharacterEdit()}
                />
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    }
});