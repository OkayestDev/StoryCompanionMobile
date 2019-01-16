import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import GlobalAlert from '../../components/GlobalAlert.js';
import EditEntity from '../../components/EditEntity.js';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import StoriesUtils from './components/StoriesUtils.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
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
        // this.state = {
        //     name: '',
        //     description: '',
        //     image: '',
        //     selectedTagId: null,
        //     selectedStoryId: null,

        //     isConfirmationModalOpen: false,
        //     globalAlertVisible: false,
        //     globalAlertType: '',
        //     globalAlertMessage: '',
        // };
    }

    cancelStoryEdit = () => {
        this.setState(this.resetStory());
    };

    newStory = () => {
        this.setNavigationActions(this.cancelStoryEdit, this.createStory, null);
        this.setState({ selectedStoryId: 'new' });
    };

    selectStory = id => {
        this.setNavigationActions(this.cancelStoryEdit, this.editStory, this.openConfirmation);
        this.setState({
            selectedStoryId: id,
            name: this.props.stories[id].name,
            description: this.props.stories[id].description,
            image: this.props.stories[id].image,
            selectedTagId: this.props.stories[id].tag,
        });
    };

    selectStoryToEditComponents = storyId => {
        this.props.editStoryComponents(storyId);
        this.props.navigation.navigate('StoryTab');
    };

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
        // if (this.state.selectedStoryId === null) {
        return (
            <View style={STYLE.container}>
                {/* <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    /> */}
                <ScrollView style={STYLE.container}>{this.renderStories()}</ScrollView>
                <FloatingAddButton onPress={this.newStory} />
            </View>
        );
        // } else {
        //     return (
        //         <View style={STYLE.container}>
        //             <GlobalAlert
        //                 visible={this.state.globalAlertVisible}
        //                 message={this.state.globalAlertMessage}
        //                 type={this.state.globalAlertType}
        //                 closeAlert={() => this.setState({ globalAlertVisible: false })}
        //             />
        //             <EditEntity
        //                 selectedEntityId={this.state.selectedStoryId}
        //                 isModalOpen={this.state.isConfirmationModalOpen}
        //                 entityType="Story"
        //                 image={this.state.image}
        //                 imagePickerTitle="Add an image to this story"
        //                 imagePickerOnChange={newImage => this.setState({ image: newImage })}
        //                 inputOne={this.state.name}
        //                 inputOneName="Story Name"
        //                 inputOneOnChange={newValue => this.setState({ name: newValue })}
        //                 modalPicker="Tag"
        //                 modalPickerSelectedValue={
        //                     this.state.selectedTagId in this.props.tags
        //                         ? this.props.tags[this.state.selectedTagId].name
        //                         : ''
        //                 }
        //                 modalPickerList={this.filterTagsByType('Story')}
        //                 modalPickerOnChange={newTag => this.setState({ selectedTagId: newTag })}
        //                 inputThree={this.state.description}
        //                 inputThreeName="Summary"
        //                 inputThreeOnChange={newValue => this.setState({ description: newValue })}
        //             />
        //             <ConfirmationModal
        //                 isConfirmationModalOpen={this.state.isConfirmationModalOpen}
        //                 closeConfirmationModal={() =>
        //                     this.setState({ isConfirmationModalOpen: false })
        //                 }
        //                 confirmationTitle={'Delete Story?'}
        //                 entityDescription=""
        //                 onConfirm={() => {
        //                     this.deleteStory();
        //                     this.onConfirmationConfirm();
        //                 }}
        //                 note="All components will be deleted"
        //             />
        //         </View>
        //     );
        // }
    }
}

function mapStateToProps(state) {
    return {
        tags: state.tags,
        stories: { ...state.stories },
        apiKey: state.apiKey,
        email: state.email,
        userId: state.userId,
    };
}

export default connect(
    mapStateToProps,
    Actions.mapDispatchToProps
)(StoriesScreen);
