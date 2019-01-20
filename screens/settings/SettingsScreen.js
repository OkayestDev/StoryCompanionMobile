import React from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import SettingsUtils from './components/SettingsUtils.js';
import { showAlert, logout } from '../../actions/Actions.js';
import * as settingsActions from '../../actions/SettingsActions.js';
import STYLE from './components/SettingsStyle.js';

class SettingsScreen extends SettingsUtils {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Stories',
            headerTitle: (
                <View style={StoryCompanion.headerTitle}>
                    {StoryCompanion.renderNavigationTitle({ navigation }, 'Settings')}
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

    submitFeature = () => {
        this.feature();
        this.props.resetSettings();
        this.removeNavigationActions();
    };

    submitBug = () => {
        this.bug();
        this.props.resetSettings();
        this.removeNavigationActions();
    };

    submitChangePassword = () => {
        this.changePassword();
        this.props.resetSettings();
        this.removeNavigationActions();
    };

    // prettier-ignore
    submittingBug = () => {
        this.setNavigationActions(
            () => {
                this.removeNavigationActions();
                this.props.resetSettings();
            }, 
            this.submitBug
        );
        this.props.submittingBug();
    };

    // prettier-ignore
    submittingFeature = () => {
        this.setNavigationActions(
            () => {
                this.removeNavigationActions();
                this.props.resetSettings();
            },
            this.submitFeature
        );
        this.props.submittingFeature();
    };

    // prettier-ignore
    changingPassword = () => {
        this.setNavigationActions(
            () => {
                this.removeNavigationActions();
                this.props.resetSettings();
            },
        );
        this.props.changingPassword();
    };

    render() {
        if (this.props.isSubmittingBug) {
            return (
                <View style={STYLE.submissionContainer}>
                    <View style={STYLE.submissionLabelContainer}>
                        <Text style={STYLE.submissionLabel}>Submitting a Bug</Text>
                    </View>
                    <View style={STYLE.submissionDescriptionContainer}>
                        <TextInput
                            placeholder="Feature description..."
                            underlineColorAndroid="rgba(0,0,0,0)"
                            style={STYLE.submissionDescription}
                            multiline={true}
                            value={this.props.description}
                            onChangeText={this.props.handleDescriptionChanged}
                        />
                    </View>
                </View>
            );
        } else if (this.props.isSubmittingFeature) {
            return (
                <View style={STYLE.submissionContainer}>
                    <View style={STYLE.submissionLabelContainer}>
                        <Text style={STYLE.submissionLabel}>Submitting a Feature Request</Text>
                    </View>
                    <View style={STYLE.submissionDescriptionContainer}>
                        <TextInput
                            placeholder="Feature description..."
                            underlineColorAndroid="rgba(0,0,0,0)"
                            style={STYLE.submissionDescription}
                            multiline={true}
                            value={this.props.description}
                            onChangeText={this.props.handleDescriptionChanged}
                        />
                    </View>
                </View>
            );
        } else if (this.props.isChangingPassword) {
            return (
                <View style={STYLE.container}>
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        keyboardShouldPersistTaps="handled"
                        scrollEnabled={true}
                    >
                        <KeyboardAvoidingView enabled={true} behavior="position">
                            <View style={STYLE.resetPasswordView}>
                                <Text style={STYLE.forgotPassword}>Change Your Password</Text>
                                <View style={STYLE.resetPasswordLabelAndInputContainer}>
                                    <Text style={STYLE.resetPasswordInputLabel}>New Password</Text>
                                    <TextInput
                                        autoCapitalize="none"
                                        secureTextEntry={true}
                                        style={STYLE.resetPasswordInput}
                                        underlineColorAndroid="rgba(0,0,0,0)"
                                        value={this.props.password}
                                        onChangeText={this.props.handlePasswordChanged}
                                    />
                                </View>
                                <View style={STYLE.resetPasswordLabelAndInputContainer}>
                                    <Text style={STYLE.resetPasswordInputLabel}>
                                        Confirm Password
                                    </Text>
                                    <TextInput
                                        autoCapitalize="none"
                                        secureTextEntry={true}
                                        style={STYLE.resetPasswordInput}
                                        underlineColorAndroid="rgba(0,0,0,0)"
                                        value={this.props.confirmPassword}
                                        onChangeText={this.props.handleConfirmPasswordChanged}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={STYLE.resetPasswordButton}
                                    onPress={() => this.changePassword()}
                                >
                                    <Text style={STYLE.resetPasswordButtonText}>
                                        Change Password
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </KeyboardAwareScrollView>
                </View>
            );
        } else {
            return (
                <View
                    style={[
                        STYLE.container,
                        this.props.isConfirmationModalOpen
                            ? { backgroundColor: 'rgba(0,0,0,0.1)' }
                            : '',
                    ]}
                >
                    <ConfirmationModal
                        isConfirmationModalOpen={this.props.isConfirmationModalOpen}
                        closeConfirmationModal={this.props.closeConfirmation}
                        confirmationTitle={'Logout?'}
                        onConfirm={this.logout}
                    />
                    <View style={STYLE.buttonContainer}>
                        <TouchableOpacity style={STYLE.button} onPress={this.submittingBug}>
                            <Text style={STYLE.buttonText}>Submit a Bug</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={STYLE.button} onPress={this.submittingFeature}>
                            <Text style={STYLE.buttonText}>Submit a Feature Request</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={STYLE.button} onPress={this.changingPassword}>
                            <Text style={STYLE.buttonText}>Change Password</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={STYLE.button}
                            onPress={this.props.openConfirmation}
                        >
                            <Text style={STYLE.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.settingsStore,
        email: state.appStore.email,
        apiKey: state.appStore.apiKey,
        userId: state.appStore.userId,
    };
}

const mapDispatchToProps = {
    showAlert,
    logout,
    ...settingsActions,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsScreen);
