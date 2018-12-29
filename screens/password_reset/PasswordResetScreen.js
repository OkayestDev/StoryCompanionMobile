import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Dimensions,
} from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../store/Actions.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalAlert from '../../components/GlobalAlert.js';
import UserRequests from '../../utils/UserRequests.js';
import { PATTERNS } from '../../config/Patterns.js';
import StoryCompanion from '../../utils/StoryCompanion.js';

const screenX = Dimensions.get('window').width;

const headerTitle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2f95dc',
    paddingLeft: 20,
};

class PasswordResetScreen extends StoryCompanion {
    static navigationOptions = {
        title: 'Password Reset',
        headerTitle: (
            <View style={headerTitle}>
                <Text
                    numberOfLines={1}
                    style={{ fontWeight: 'bold', color: 'white', fontSize: 28 }}
                >
                    Password Reset
                </Text>
            </View>
        ),
        headerStyle: { backgroundColor: '#2f95dc' },
        headerTitleStyle: { color: 'white' },
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
        this.UserRequests = new UserRequests();
    }

    passwordReset = () => {
        if (!PATTERNS.email.test(this.state.email)) {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'warning',
                globalAlertMessage: 'Please enter a valid email',
            });
            return;
        }
        let paramsObject = this.createParamsObject();
        this.UserRequests.passwordReset(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'success',
                        globalAlertMessage: 'Temporary password sent to ' + this.state.email,
                        email: '',
                    });
                    setTimeout(() => this.props.navigation.navigate('Login'), 3000);
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to get a response from the server',
                });
            });
    };

    render() {
        return (
            <View style={styles.container}>
                <GlobalAlert
                    visible={this.state.globalAlertVisible}
                    message={this.state.globalAlertMessage}
                    type={this.state.globalAlertType}
                    closeAlert={() => this.setState({ globalAlertVisible: false })}
                />
                <KeyboardAwareScrollView
                    style={styles.container}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled"
                    scrollEnabled={true}
                >
                    <KeyboardAvoidingView enabled={true} behavior="position">
                        <View style={styles.resetPasswordView}>
                            <Text style={styles.forgotPassword}>Forgot Your Password, eh?</Text>
                            <View style={styles.resetPasswordLabelAndInputContainer}>
                                <Text style={styles.resetPasswordInputLabel}>Email</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    style={styles.resetPasswordInput}
                                    underlineColorAndroid="rgba(0,0,0,0)"
                                    value={this.state.email}
                                    onChangeText={newText => this.setState({ email: newText })}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.resetPasswordButton}
                                onPress={() => this.passwordReset()}
                            >
                                <Text style={styles.resetPasswordButtonText}>
                                    Send New Password
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

export default connect(
    Actions.mapStateToProps,
    Actions.mapDispatchToProps
)(PasswordResetScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    forgotPassword: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 20,
    },
    resetPasswordView: {
        height: 0.7 * Dimensions.get('window').height,
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
        fontSize: 24,
        fontWeight: 'bold',
        width: 0.3 * screenX,
        marginRight: 0.05 * screenX,
    },
    resetPasswordInput: {
        width: 0.6 * screenX,
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
        width: 0.8 * screenX,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    resetPasswordButtonText: {
        color: 'white',
        fontSize: 24,
    },
});
