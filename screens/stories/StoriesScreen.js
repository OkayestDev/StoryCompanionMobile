import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import EditEntity from '../../components/EditEntity.js';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import StoriesUtils from './components/StoriesUtils.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import * as storyActions from '../../actions/StoryActions.js';
import { showAlert } from '../../actions/Actions.js';
import { setTags } from '../../actions/TagActions.js';
import STYLE from './components/StoriesStyle.js';

class StoriesScreen extends StoriesUtils {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Stories',
            headerTitle: (
                <View style={StoryCompanion.headerTitle}>
                    {StoryCompanion.renderNavigationTitle({ navigation }, 'Stories')}
                    {StoryCompanion.renderNavigationOptions({ navigation })}
                </View>
            ),
            headerStyle: { backgroundColor: '#2f95dc' },
            headerTitleStyle: { color: 'white' },
        };
    };

    constructor(props) {
        super(props);
    }

    renderStories = () => {
        if (this.props.stories === null) {
            return null;
        }

        let stories = [];
        let ids = Object.keys(this.props.stories);
        if (ids.length > 0) {
            ids.forEach(id => {
                stories.push(
                    <TouchableOpacity
                        key={id}
                        onPress={() => this.selectStory(id)}
                        style={STYLE.storyContainer}
                    >
                        <View>
                            <View style={STYLE.storyPictureAndName}>
                                <View styles={STYLE.storyPictureContainer}>
                                    {this.props.stories[id].image &&
                                    this.props.stories[id].image !== '' ? (
                                        <Image
                                            source={{ uri: this.props.stories[id].image }}
                                            style={STYLE.storyPicture}
                                        />
                                    ) : (
                                        <View style={STYLE.noPicture} />
                                    )}
                                </View>
                                <View style={STYLE.storyNameAndDescription}>
                                    <Text numberOfLines={1} style={STYLE.storyName}>
                                        {this.props.stories[id].name}
                                    </Text>
                                    <TouchableOpacity
                                        style={STYLE.editStoryPropsButton}
                                        onPress={() => {
                                            this.selectStoryToEditComponents(id);
                                        }}
                                    >
                                        <Text style={STYLE.editStoryPropsButtonText}>
                                            Edit Components
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            });
            return stories;
        } else {
            return (
                <View style={STYLE.noStoriesContainer}>
                    <Text style={STYLE.noStoriesText}>
                        Looks like you haven't created any stories yet.
                    </Text>
                    <Text style={STYLE.noStoriesText}>Press on the + to create a story!</Text>
                </View>
            );
        }
    };

    render() {
        if (this.props.selectedStoryId === null) {
            return (
                <View style={STYLE.container}>
                    <ScrollView style={STYLE.container}>{this.renderStories()}</ScrollView>
                    <FloatingAddButton onPress={this.newStory} />
                </View>
            );
        } else {
            return (
                <View style={STYLE.container}>
                    <EditEntity
                        selectedEntityId={this.props.selectedStoryId}
                        isModalOpen={this.props.isConfirmationModalOpen}
                        entityType="Story"
                        image={this.props.image}
                        imagePickerTitle="Add an image to this story"
                        imagePickerOnChange={this.props.handleImageChanged}
                        inputOne={this.props.name}
                        inputOneName="Story Name"
                        inputOneOnChange={this.props.handleNameChanged}
                        modalPicker="Tag"
                        modalPickerSelectedValue={
                            this.props.tags && this.props.selectedTagId in this.props.tags
                                ? this.props.tags[this.props.selectedTagId].name
                                : ''
                        }
                        modalPickerList={this.filterTagsByType('Story')}
                        modalPickerOnChange={this.props.handleTagChanged}
                        inputThree={this.props.description}
                        inputThreeName="Summary"
                        inputThreeOnChange={this.props.handleDescriptionChanged}
                    />
                    <ConfirmationModal
                        isConfirmationModalOpen={this.props.isConfirmationModalOpen}
                        closeConfirmationModal={this.props.openConfirmation}
                        confirmationTitle={'Delete Story?'}
                        entityDescription=""
                        onConfirm={() => {
                            this.deleteStory();
                            this.onConfirmationConfirm();
                        }}
                        note="All components will be deleted"
                    />
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.storyStore,
        stories: state.storyStore.stories,
        tags: state.tagStore.tags,
        apiKey: state.appStore.apiKey,
        email: state.appStore.email,
        userId: state.appStore.userId,
    };
}

const mapDispatchToProps = {
    ...storyActions,
    showAlert,
    setTags,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StoriesScreen);
