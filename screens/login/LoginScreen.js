import React from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import StoryCompanion from '../../utils/StoryCompanion.js';
import LoginUtils from './components/LoginUtils.js';
import { connect } from 'react-redux';
import Actions from '../../store/Actions.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalAlert from '../../components/GlobalAlert.js';
import STYLE from './components/LoginStyle.js';

class LoginScreen extends LoginUtils {
    static navigationOptions = {
        title: 'Login',
        headerTitle: (
            <View style={StoryCompanion.headerTitle}>
                {StoryCompanion.renderFullWidthNavigationTitle('Story Companion')}
            </View>
        ),
        headerStyle: { backgroundColor: '#2f95dc' },
        headerTitleStyle: { color: 'white' },
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
    }

    // @TODO add App Icon to login screen
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
                        <View style={STYLE.loginView}>
                            <Text style={STYLE.welcomeBack}>Welcome Back!</Text>
                            <View style={STYLE.loginLabelAndInputContainer}>
                                <Text style={STYLE.loginInputLabel}>Email</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                    style={STYLE.loginInput}
                                    underlineColorAndroid="rgba(0,0,0,0)"
                                    value={this.state.email}
                                    onChangeText={newText => this.setState({ email: newText })}
                                />
                            </View>
                            <View style={STYLE.loginLabelAndInputContainer}>
                                <Text style={STYLE.loginInputLabel}>Password</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    style={STYLE.loginInput}
                                    underlineColorAndroid="rgba(0,0,0,0)"
                                    value={this.state.password}
                                    onChangeText={newText => this.setState({ password: newText })}
                                />
                            </View>
                            <TouchableOpacity
                                style={STYLE.loginButton}
                                onPress={() => this.login()}
                            >
                                <Text style={STYLE.loginButtonText}>Login</Text>
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
)(LoginScreen);
