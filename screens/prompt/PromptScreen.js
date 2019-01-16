import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import PromptUtils from './components/PromptUtils.js';
import Actions from '../../store/Actions.js';
import GlobalAlert from '../../components/GlobalAlert.js';
import EditEntity from '../../components/EditEntity.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
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
        this.state = {
            name: '',
            description: '',
            creatingPrompt: null,

            isConfirmationModalOpen: false,
            confirmationTitle: '',
            confirmationNote: '',
            confirmationOnConfirm: null,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
    }

    handleDownVotePressed = () => {
        this.setState({
            isConfirmationModalOpen: true,
            confirmationTitle: 'Down Vote Prompt?',
            confirmationNote: "This prompt won't show up for you anymore",
            confirmationOnConfirm: () => this.downVotePrompt(),
        });
    };

    handlePromptToStoryPressed = () => {
        this.setState({
            isConfirmationModalOpen: true,
            confirmationTitle: 'Create a Story?',
            confirmationNote: 'creates a story based on this prompt',
            confirmationOnConfirm: () => this.promptToStory(),
        });
    };

    cancelPromptEdit = () => {
        this.setState(this.resetPrompt());
    };

    newPrompt = () => {
        this.setNavigationActions(this.cancelPromptEdit, this.createPrompt, null);
        this.setState({ creatingPrompt: 'new' });
    };

    renderPrompt = () => {
        if (!this.props.prompt) {
            return null;
        }

        return (
            <View
                style={[
                    STYLE.container,
                    this.state.isConfirmationModalOpen
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
        if (this.state.creatingPrompt) {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <EditEntity
                        selectedEntityId={this.state.creatingPrompt}
                        inputOne={this.state.name}
                        inputOneName="Prompt Name"
                        inputOneOnChange={newValue => this.setState({ name: newValue })}
                        inputThree={this.state.description}
                        inputThreeName="Summary"
                        inputThreeOnChange={newValue => this.setState({ description: newValue })}
                    />
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
                    <View style={STYLE.container}>{this.renderPrompt()}</View>
                    <ConfirmationModal
                        isConfirmationModalOpen={this.state.isConfirmationModalOpen}
                        closeConfirmationModal={() =>
                            this.setState({ isConfirmationModalOpen: false })
                        }
                        confirmationTitle={this.state.confirmationTitle}
                        note={this.state.confirmationNote}
                        onConfirm={this.state.confirmationOnConfirm}
                    />
                    <FloatingAddButton onPress={this.newPrompt} />
                </View>
            );
        }
    }
}

export default connect(
    Actions.mapStateToProps,
    Actions.mapDispatchToProps
)(PromptScreen);
