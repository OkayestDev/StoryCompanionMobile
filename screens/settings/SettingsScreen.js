import React from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../store/Actions.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalAlert from '../../components/GlobalAlert.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import SettingsUtils from './components/SettingsUtils.js';
import STYLE from './components/SettingsStyle.js';

class SettingsScreen extends SettingsUtils {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Stories',
            headerTitle: (
                <View style={StoryCompanion.headerTitle}>
                    {StoryCompanion.renderNavigationTitle('Settings')}
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
            isConfirmationModalOpen: false,
            isSubmittingBug: false,
            isSubmittingFeature: false,
            description: '',
            isChangingPassword: false,

            password: '',
            confirmPassword: '',

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
    }

    submitFeature = () => {
        this.feature();
        this.setState({
            description: '',
            isSubmittingFeature: false,
        });
        this.removeNavigationActions();
    };

    submitBug = () => {
        this.bug();
        this.setState({
            description: '',
            isSubmittingBug: false,
        });
        this.removeNavigationActions();
    };

    submitChangePassword = () => {
        this.changePassword();
        this.setState({
            password: '',
            confirmPassword: '',
            isSubmittingPassword: false,
        });
        this.removeNavigationActions();
    };

    submittingBug = () => {
        this.setNavigationActions(() => {
            this.removeNavigationActions();
            this.setState({ isSubmittingBug: false });
        }, this.submitBug);
        this.setState({ isSubmittingBug: true });
    };

    submittingFeature = () => {
        this.setNavigationActions(() => {
            this.removeNavigationActions();
            this.setState({ isSubmittingFeature: false });
        }, this.submitFeature);
        this.setState({ isSubmittingFeature: true });
    };

    changingPassword = () => {
        this.setNavigationActions(() => {
            this.removeNavigationActions();
            this.setState({ isChangingPassword: false });
        });
        this.setState({ isChangingPassword: true });
    };

    render() {
        if (this.state.isSubmittingBug) {
            return (
                <View style={STYLE.submissionContainer}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <View style={STYLE.submissionLabelContainer}>
                        <Text style={STYLE.submissionLabel}>Submitting a Bug</Text>
                    </View>
                    <View style={STYLE.submissionDescriptionContainer}>
                        <TextInput
                            placeholder="Feature description..."
                            underlineColorAndroid="rgba(0,0,0,0)"
                            style={STYLE.submissionDescription}
                            multiline={true}
                            value={this.state.description}
                            onChangeText={newDescription =>
                                this.setState({ description: newDescription })
                            }
                        />
                    </View>
                </View>
            );
        } else if (this.state.isSubmittingFeature) {
            return (
                <View style={STYLE.submissionContainer}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <View style={STYLE.submissionLabelContainer}>
                        <Text style={STYLE.submissionLabel}>Submitting a Feature Request</Text>
                    </View>
                    <View style={STYLE.submissionDescriptionContainer}>
                        <TextInput
                            placeholder="Feature description..."
                            underlineColorAndroid="rgba(0,0,0,0)"
                            style={STYLE.submissionDescription}
                            multiline={true}
                            value={this.state.description}
                            onChangeText={newDescription =>
                                this.setState({ description: newDescription })
                            }
                        />
                    </View>
                </View>
            );
        } else if (this.state.isChangingPassword) {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
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
                                        value={this.state.password}
                                        onChangeText={newText =>
                                            this.setState({ password: newText })
                                        }
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
                                        value={this.state.confirmPassword}
                                        onChangeText={newText =>
                                            this.setState({ confirmPassword: newText })
                                        }
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
                        this.state.isConfirmationModalOpen
                            ? { backgroundColor: 'rgba(0,0,0,0.1)' }
                            : '',
                    ]}
                >
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <ConfirmationModal
                        isConfirmationModalOpen={this.state.isConfirmationModalOpen}
                        closeConfirmationModal={() =>
                            this.setState({ isConfirmationModalOpen: false })
                        }
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
                            onPress={() => this.setState({ isConfirmationModalOpen: true })}
                        >
                            <Text style={STYLE.buttonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

export default connect(
    Actions.mapStateToProps,
    Actions.mapDispatchToProps
)(SettingsScreen);
