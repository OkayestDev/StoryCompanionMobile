import React from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../store/Actions.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalAlert from '../../components/GlobalAlert.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import PasswordResetUtils from './components/PasswordResetUtils.js';
import STYLE from './components/PasswordResetStyle.js';

class PasswordResetScreen extends PasswordResetUtils {
    static navigationOptions = {
        title: 'Password Reset',
        headerTitle: (
            <View style={StoryCompanion.headerTitle}>
                {StoryCompanion.renderFullWidthNavigationTitle('Password Reset')}
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
    }

    render() {
        return (
            <View style={STYLE.container}>
                <GlobalAlert
                    visible={this.state.globalAlertVisible}
                    message={this.state.globalAlertMessage}
                    type={this.state.globalAlertType}
                    closeAlert={() => this.setState({ globalAlertVisible: false })}
                />
                <KeyboardAwareScrollView
                    style={STYLE.container}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled"
                    scrollEnabled={true}
                >
                    <KeyboardAvoidingView enabled={true} behavior="position">
                        <View style={STYLE.resetPasswordView}>
                            <Text style={STYLE.forgotPassword}>Forgot Your Password, eh?</Text>
                            <View style={STYLE.resetPasswordLabelAndInputContainer}>
                                <Text style={STYLE.resetPasswordInputLabel}>Email</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    style={STYLE.resetPasswordInput}
                                    underlineColorAndroid="rgba(0,0,0,0)"
                                    value={this.state.email}
                                    onChangeText={newText => this.setState({ email: newText })}
                                />
                            </View>
                            <TouchableOpacity
                                style={STYLE.resetPasswordButton}
                                onPress={() => this.passwordReset()}
                            >
                                <Text style={STYLE.resetPasswordButtonText}>Send New Password</Text>
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
