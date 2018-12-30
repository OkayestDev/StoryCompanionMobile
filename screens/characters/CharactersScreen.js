import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../store/Actions.js';
import { Icon } from 'react-native-elements';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import GlobalAlert from '../../components/GlobalAlert.js';
import EditEntity from '../../components/EditEntity.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import CharacterUtils from './components/CharactersUtils.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import STYLE from './components/CharactersStyle.js';

class CharactersScreen extends CharacterUtils {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Characters',
            headerTitle: (
                <View style={StoryCompanion.headerTitle}>
                    {StoryCompanion.renderNavigationTitle(
                        { navigation },
                        navigation.getParam('title'),
                        () => navigation.navigate('StoriesTab')
                    )}
                    {StoryCompanion.renderNavigationOptions({ navigation })}
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

            isConfirmationModalOpen: false,
            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
        props.navigation.setParams({ title: this.props.stories[this.props.selectedStoryId].name });
    }

    cancelCharacterEdit = () => {
        this.removeNavigationActions();
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

    newCharacter = () => {
        this.setNavigationActions(this.cancelCharacterEdit, this.createCharacter, null);
        this.setState({ selectedCharacterId: 'new' });
    };

    selectCharacter = id => {
        this.setNavigationActions(
            this.cancelCharacterEdit,
            this.editCharacter,
            this.openConfirmation
        );
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
                        style={STYLE.characterContainer}
                    >
                        <View style={STYLE.characterPictureAndName}>
                            <View styles={STYLE.characterPictureContainer}>
                                {this.state.characters[id].image !== '' ? (
                                    <Image
                                        source={{ uri: this.state.characters[id].image }}
                                        style={STYLE.characterPicture}
                                    />
                                ) : (
                                    <View style={STYLE.noPicture} />
                                )}
                            </View>
                            <View style={STYLE.characterNameAndDescription}>
                                <Text numberOfLines={1} style={STYLE.characterName}>
                                    {this.state.characters[id].name}
                                </Text>
                                <Text numberOfLines={2} style={STYLE.characterDescription}>
                                    {this.state.characters[id].description}
                                </Text>
                            </View>
                            <View style={STYLE.moveCharacterContainer}>
                                <TouchableOpacity
                                    style={STYLE.moveUp}
                                    onPress={() => this.moveCharacterUp(id)}
                                >
                                    <Icon
                                        color="#2f95dc"
                                        name="caret-up"
                                        type="font-awesome"
                                        size={32}
                                    />
                                </TouchableOpacity>
                                <Text style={STYLE.characterNumber}>
                                    {this.state.characters[id].number}
                                </Text>
                                <TouchableOpacity
                                    style={STYLE.moveDown}
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
                <View style={STYLE.noCharactersContainer}>
                    <Text style={STYLE.noCharactersText}>
                        Looks like you haven't created any characters yet.
                    </Text>
                    <Text style={STYLE.noCharactersText}>
                        Press on the + to create a character!
                    </Text>
                </View>
            );
        }
    };

    render() {
        if (this.state.selectedCharacterId === null) {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <ScrollView>{this.renderCharacters()}</ScrollView>
                    <FloatingAddButton onPress={this.newCharacter} />
                </View>
            );
        } else {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <EditEntity
                        selectedEntityId={this.state.selectedCharacterId}
                        isModalOpen={this.state.isConfirmationModalOpen}
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
                    />
                    <ConfirmationModal
                        isConfirmationModalOpen={this.state.isConfirmationModalOpen}
                        closeConfirmationModal={() =>
                            this.setState({ isConfirmationModalOpen: false })
                        }
                        confirmationTitle={'Delete Character?'}
                        entityDescription=""
                        onConfirm={() => {
                            this.deleteCharacter();
                            this.onConfirmationConfirm();
                        }}
                        note=""
                    />
                </View>
            );
        }
    }
}

export default connect(
    Actions.mapStateToProps,
    Actions.mapDispatchToProps
)(CharactersScreen);
