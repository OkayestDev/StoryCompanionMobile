import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import PromptUtils from './components/PromptUtils.js';
import EditEntity from '../../components/EditEntity.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import * as promptActions from '../../actions/PromptActions.js';
import { setStories } from '../../actions/StoryActions.js';
import { showAlert } from '../../actions/Actions.js';
import STYLE from './components/PromptStyle.js';

class PromptScreen extends PromptUtils {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Prompt',
            headerTitle: (
                <View style={StoryCompanion.headerTitle}>
                    {StoryCompanion.renderNavigationTitle({ navigation }, 'Prompt')}
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

    renderPrompt = () => {
        if (!this.props.prompt) {
            return null;
        }

        return (
            <View
                style={[
                    STYLE.container,
                    this.props.isConfirmationModalOpen
                        ? { backgroundColor: 'rgba(0,0,0,0.1)' }
                        : '',
                ]}
            >
                <View style={STYLE.nameAndDownVoteContainer}>
                    <Text numberOfLines={1} style={STYLE.name}>
                        {this.props.prompt.name}
                    </Text>
                    <TouchableOpacity
                        style={STYLE.promptToStory}
                        onPress={this.handlePromptToStoryPressed}
                    >
                        <Icon color="#2f95dc" name="copy" type="font-awesome" size={32} />
                    </TouchableOpacity>
                    <TouchableOpacity style={STYLE.downVote} onPress={this.handleDownVotePressed}>
                        <Icon color="#2f95dc" name="thumbs-down" type="font-awesome" size={32} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={STYLE.promptDescriptionContainer}>
                    <Text style={STYLE.promptDescription}>{this.props.prompt.description}</Text>
                </ScrollView>
            </View>
        );
    };

    render() {
        if (this.props.creatingPrompt) {
            return (
                <View style={STYLE.container}>
                    <EditEntity
                        selectedEntityId={this.props.creatingPrompt}
                        inputOne={this.props.name}
                        inputOneName="Prompt Name"
                        inputOneOnChange={this.props.handleNameChanged}
                        inputThree={this.props.description}
                        inputThreeName="Summary"
                        inputThreeOnChange={this.props.handleDescriptionChanged}
                    />
                </View>
            );
        } else {
            return (
                <View style={STYLE.container}>
                    <View style={STYLE.container}>{this.renderPrompt()}</View>
                    <ConfirmationModal
                        isConfirmationModalOpen={this.props.isConfirmationModalOpen}
                        closeConfirmationModal={this.props.closeConfirmation}
                        confirmationTitle={this.props.confirmationTitle}
                        note={this.props.confirmationNote}
                        onConfirm={this.props.confirmationOnConfirm}
                    />
                    <FloatingAddButton onPress={this.newPrompt} />
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.promptStore,
        stories: state.storyStore.stories,
        apiKey: state.appStore.apiKey,
        email: state.appStore.email,
        userId: state.appStore.userId,
    };
}

const mapDispatchToProp = {
    ...promptActions,
    setStories,
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProp
)(PromptScreen);
