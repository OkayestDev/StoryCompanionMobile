import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import PromptUtils from './components/PromptUtils.js';
import Actions from '../../store/Actions.js';
import GlobalAlert from '../../components/GlobalAlert.js';
import EditEntity from '../../components/EditEntity.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import { connect } from 'react-redux';
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

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
    }

    cancelPromptEdit = () => {
        this.setState(this.resetPrompt());
    };

    newPrompt = () => {
        this.setNavigationActions(this.cancelPromptEdit, this.createPrompt, null);
        this.setState({ creatingPrompt: 'new' });
    };

    renderPrompt = () => {
        return null;
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
