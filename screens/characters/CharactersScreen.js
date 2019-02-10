import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import EditEntity from '../../components/EditEntity.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import CharacterUtils from './components/CharactersUtils.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import * as characterActions from '../../actions/CharacterActions.js';
import { showAlert } from '../../actions/Actions.js';
import { setTags } from '../../actions/TagActions.js';
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
        props.navigation.setParams({
            title: this.props.stories[this.props.selectedStoryId].name,
            onExport: this.exportCharacters,
        });
    }

    oneLineInputs = () => [
        {
            name: 'Character Name',
            value: this.props.name,
            onChange: this.props.handleNameChanged,
            type: 'default',
        },
        {
            name: 'Age',
            value: this.props.age,
            onChange: this.props.handleAgeChanged,
            type: 'default',
        },
        {
            name: 'Story Role',
            value: this.props.storyRole,
            onChange: this.props.handleStoryRoleChanged,
            type: 'default',
        },
    ];

    multiLineInputs = () => [
        {
            name: 'Goal',
            value: this.props.goal,
            onChange: this.props.handleGoalChanged,
        },
        {
            name: 'Description',
            value: this.props.description,
            onChange: this.props.handleDescriptionChanged,
        },
        {
            name: 'Attributes',
            value: this.props.attribute,
            onChange: this.props.handleAttributeChanged,
        },
    ];

    renderCharacters = () => {
        if (this.props.characters === null) {
            return null;
        }

        characterIds = this.sortEntitiesByNumber(this.props.characters);
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
                                    {this.props.characters[id].number}
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
                            <View styles={STYLE.characterPictureContainer}>
                                {this.props.characters[id].image !== '' ? (
                                    <Image
                                        source={{ uri: this.props.characters[id].image }}
                                        style={STYLE.characterPicture}
                                    />
                                ) : (
                                    <View style={STYLE.noPicture} />
                                )}
                            </View>
                            <View style={STYLE.characterNameAndDescription}>
                                <Text numberOfLines={1} style={STYLE.characterName}>
                                    {this.props.characters[id].name}
                                </Text>
                                <Text numberOfLines={2} style={STYLE.characterDescription}>
                                    {this.props.characters[id].description}
                                </Text>
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
        if (this.props.selectedCharacterId === null) {
            return (
                <View style={STYLE.container}>
                    <ScrollView>{this.renderCharacters()}</ScrollView>
                    <FloatingAddButton onPress={this.newCharacter} />
                </View>
            );
        } else {
            return (
                <View style={STYLE.container}>
                    <EditEntity
                        selectedEntityId={this.props.selectedCharacterId}
                        isModalOpen={this.props.isConfirmationModalOpen}
                        entityType="Character"
                        image={this.props.image}
                        imagePickerTitle="Add an image for this character"
                        imagePickerOnChange={this.props.handleImageChanged}
                        modalPicker="Tag"
                        modalPickerSelectedValue={
                            this.props.selectedTagId in this.props.tags
                                ? this.props.tags[this.props.selectedTagId].name
                                : ''
                        }
                        modalPickerList={this.filterTagsByType('Character')}
                        modalPickerOnChange={this.props.handleTagChanged}
                        oneLineInputs={this.oneLineInputs()}
                        multiLineInputs={this.multiLineInputs()}
                    />
                    <ConfirmationModal
                        isConfirmationModalOpen={this.props.isConfirmationModalOpen}
                        closeConfirmationModal={this.props.closeConfirmation}
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

function mapStateToProps(state) {
    return {
        ...state.characterStore,
        stories: state.storyStore.stories,
        tags: state.tagStore.tags,
        selectedStoryId: state.storyStore.selectedStoryId,
        email: state.appStore.email,
        apiKey: state.appStore.apiKey,
        userId: state.appStore.userId,
    };
}

const mapDispatchToProps = {
    ...characterActions,
    showAlert,
    setTags,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CharactersScreen);
