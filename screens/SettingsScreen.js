import React from 'react';
import { 
    View, 
    StyleSheet,
    Text, 
    TouchableOpacity, 
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import Actions from '../store/Actions.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalAlert from '../components/GlobalAlert.js';
import FloatingButtons from '../components/FloatingButtons.js';
import ConfirmationModal from '../components/ConfirmationModal.js';
import SettingsRequests from '../utils/SettingsRequests.js';
import UserRequests from '../utils/UserRequests.js';
import StoryCompanion from '../utils/StoryCompanion.js';

const screenX = Dimensions.get('window').width;

const headerTitle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2f95dc',
    paddingLeft: 20,
}

class SettingsScreen extends StoryCompanion {
    static navigationOptions = {
        title: 'Stories',
        headerTitle: (
            <View style={headerTitle}>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 28}}>
                    Settings
                </Text>
            </View>
        ),
        headerStyle: { backgroundColor: '#2f95dc' },
        headerTitleStyle: { color: 'white' },
    };

    constructor(props) {
        super(props);
        this.state = {
            isConfirmationModalOpen: false,
            submittingBug: false,
            submittingFeature: false,
            description: '',
            changingPassword: false,

            password: '',
            confirmPassword: '',

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        }
        this.SettingsRequests = new SettingsRequests();
        this.UserRequests = new UserRequests();
    }

    changePassword = () => {
        if (this.state.password.length < 6) {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'warning',
                globalAlertMessage: 'Ensure passwords are at least 6 characters long',
            });
            return;
        }

        if (this.state.password === '') {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'warning',
                globalAlertMessage: "Passwords cannot be empty",
            });
            return;
        }

        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'warning',
                globalAlertMessage: "Passwords do not match",
            });
            return;
        }

        let paramsObject = this.createParamsObject();
        this.UserRequests.changePassword(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'success',
                    globalAlertMessage: "Successfully updated password",
                    changingPassword: false,
                    password: '',
                    confirmPassword: '',
                });
            }
        })
        .catch(() => {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: "Unable to get response from server",
            });
        });
    }

    bug = () => {
        let paramsObject = this.createParamsObject();
        this.SettingsRequests.bug(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: res.error,
                });
            }
            else {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'success',
                    globalAlertMessage: 'Successfully submitted bug. Thank you!',
                    submittingBug: false,
                    bugDescription: '',
                });
            }
        })
        .catch(() => {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: 'Unable to submit bug at this time',
            });
        })
    }

    feature = () => {
        let paramsObject = this.createParamsObject();
        this.SettingsRequests.feature(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: res.error,
                });
            }
            else {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'success',
                    globalAlertMessage: 'Successfully submitted feature. Thank you!',
                    submittingFeature: false,
                    featureDescription: '',
                });
            }
        })
        .catch(() => {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: 'Unable to submit feature at this time',
            });
        })
    }

    logout = () => {
        this.props.logout();
        this.props.navigation.navigate("LoginTab");
    }

    render() {
        if (this.state.submittingBug) {
            return (
                <View style={styles.submissionContainer}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <FloatingButtons
                        onCancel={() => this.setState({submittingBug: false})}
                        onSave={() => this.bug()}
                        onDelete={null}
                    />
                    <View style={styles.submissionLabelContainer}>
                        <Text style={styles.submissionLabel}>
                            Submitting a Bug
                        </Text>
                    </View>
                    <View style={styles.submissionDescriptionContainer}>
                        <TextInput
                            placeholder="Feature description..."
                            underlineColorAndroid='rgba(0,0,0,0)'
                            style={styles.submissionDescription}
                            multiline={true}
                            value={this.state.description}
                            onChangeText={(newDescription) => this.setState({description: newDescription})}
                        />
                    </View>
                </View>
            );
        }
        else if (this.state.submittingFeature) {
            return (
                <View style={styles.submissionContainer}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <FloatingButtons
                        onCancel={() => this.setState({submittingFeature: false})}
                        onSave={() => this.feature()}
                        onDelete={null}
                    />
                    <View style={styles.submissionLabelContainer}>
                        <Text style={styles.submissionLabel}>
                            Submitting a Feature Request
                        </Text>
                    </View>
                    <View style={styles.submissionDescriptionContainer}>
                        <TextInput
                            placeholder="Feature description..."
                            underlineColorAndroid='rgba(0,0,0,0)'
                            style={styles.submissionDescription}
                            multiline={true}
                            value={this.state.description}
                            onChangeText={(newDescription) => this.setState({description: newDescription})}
                        />
                    </View>
                </View>
            );
        }
        else if (this.state.changingPassword) {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <FloatingButtons
                        onCancel={() => this.setState({changingPassword: false})}
                        onSave={null}
                        onDelete={null}
                    />
                    <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        keyboardShouldPersistTaps="handled"
                        scrollEnabled={true}
                    >
                        <KeyboardAvoidingView
                            enabled={true}
                            behavior="position"
                        >
                            <View style={styles.resetPasswordView}>
                                <Text style={styles.forgotPassword}>
                                    Change Your Password
                                </Text>
                                <View style={styles.resetPasswordLabelAndInputContainer}>
                                    <Text style={styles.resetPasswordInputLabel}>
                                        New Password
                                    </Text>
                                    <TextInput
                                        autoCapitalize="none"
                                        secureTextEntry={true}
                                        style={styles.resetPasswordInput}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        value={this.state.password}
                                        onChangeText={(newText) => this.setState({password: newText})}
                                    />
                                </View>
                                <View style={styles.resetPasswordLabelAndInputContainer}>
                                    <Text style={styles.resetPasswordInputLabel}>
                                        Confirm Password
                                    </Text>
                                    <TextInput
                                        autoCapitalize="none"
                                        secureTextEntry={true}
                                        style={styles.resetPasswordInput}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                        value={this.state.confirmPassword}
                                        onChangeText={(newText) => this.setState({confirmPassword: newText})}
                                    />
                                </View>
                                <TouchableOpacity
                                    style={styles.resetPasswordButton}
                                    onPress={() => this.changePassword()}
                                >
                                    <Text
                                        style={styles.resetPasswordButtonText}
                                    >
                                        Change Password
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </KeyboardAwareScrollView>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <ConfirmationModal
                        isConfirmationModalOpen={this.state.isConfirmationModalOpen}
                        closeConfirmationModal={() => this.setState({isConfirmationModalOpen: false})}
                        confirmationTitle={"Logout?"}
                        onConfirm={() => this.logout()}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.setState({submittingBug: true})}
                        >
                            <Text style={styles.buttonText}>
                                Submit a Bug
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.setState({submittingFeature: true})}
                        >
                            <Text style={styles.buttonText}>
                                Submit a Feature Request
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.setState({changingPassword: true})}
                        >
                            <Text style={styles.buttonText}>
                                Change Password
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => this.setState({isConfirmationModalOpen: true})}
                        >
                            <Text style={styles.buttonText}>
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }
}

export default connect(Actions.mapStateToProps, Actions.mapDispatchToProps)(SettingsScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonContainer: {
        width: '100%',
        height: '60%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        width: '80%',
        marginLeft: '10%',
        height: 50,
        backgroundColor: '#2f95dc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    submissionLabelContainer: {
        width: '100%',
        height: '15%',
    },
    submissionLabel: {
        fontSize: 24,
        color: '#2f95dc',
        fontWeight: 'bold',
    },
    submissionContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submissionDescriptionContainer: {
        height: '85%',
        width: '100%',
    },
    submissionDescription: {
        height: '100%',
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 18,
    },
    forgotPassword: {
        fontWeight: 'bold',
        fontSize: 28,
        color: '#CCCCCC',
        marginBottom: 20,
    },
    resetPasswordView: {
        height: .7 * Dimensions.get('window').height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    resetPasswordLabelAndInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenX,
        marginBottom: 20,
    },
    resetPasswordInputLabel: {
        color: '#CCCCCC',
        fontSize: 24,
        fontWeight: 'bold',
        width: .3 * screenX,
        marginRight: .05 * screenX,
    },
    resetPasswordInput: {
        width: .6 * screenX,
        height: 60,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
        fontSize: 16,
    },
    resetPasswordButton: {
        backgroundColor: '#2f95dc',
        display: 'flex',
        height: 50,
        width: .8 * screenX,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    resetPasswordButtonText: {
        color: 'white',
        fontSize: 24,
    },
})