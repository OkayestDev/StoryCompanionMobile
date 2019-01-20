import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import GlobalAlert from '../../components/GlobalAlert.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CreateAccountUtils from './components/CreateAccountUtils.js';
import { showAlert } from '../../actions/Actions.js';
import STYLE from './components/CreateAccountStyle.js';
import StoryCompanion from '../../utils/StoryCompanion.js';

const invalidInput = {
    borderColor: 'red',
};

class CreateAccountScreen extends CreateAccountUtils {
    static navigationOptions = {
        title: 'Create Account',
        headerTitle: (
            <View style={StoryCompanion.headerTitle}>
                {StoryCompanion.renderFullWidthNavigationTitle('Create Account')}
            </View>
        ),
        headerStyle: { backgroundColor: '#2f95dc' },
        headerTitleStyle: { color: 'white' },
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
        };
    }

    render() {
        return (
            <View style={STYLE.container}>
                <GlobalAlert />
                <KeyboardAwareScrollView
                    style={STYLE.container}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled"
                    scrollEnabled={true}
                >
                    <View style={STYLE.createAccountView}>
                        <Text style={STYLE.welcome}>Welcome!</Text>
                        <View style={STYLE.createAccountLabelAndInputContainer}>
                            <Text style={STYLE.createAccountInputLabel}>Email</Text>
                            <TextInput
                                autoCapitalize="none"
                                keyboardType="email-address"
                                style={[
                                    STYLE.createAccountInput,
                                    this.doEmailsMatch() ? '' : invalidInput,
                                    this.isEmailValid(this.state.email) ? '' : invalidInput,
                                ]}
                                underlineColorAndroid="rgba(0,0,0,0)"
                                value={this.state.email}
                                onChangeText={newText => this.setState({ email: newText })}
                            />
                        </View>
                        <View style={STYLE.createAccountLabelAndInputContainer}>
                            <Text style={STYLE.createAccountInputLabel}>Confirm Email</Text>
                            <TextInput
                                autoCapitalize="none"
                                keyboardType="email-address"
                                style={[
                                    STYLE.createAccountInput,
                                    this.doEmailsMatch() ? '' : invalidInput,
                                    this.isEmailValid(this.state.confirmEmail) ? '' : invalidInput,
                                ]}
                                underlineColorAndroid="rgba(0,0,0,0)"
                                value={this.state.confirmEmail}
                                onChangeText={newText => this.setState({ confirmEmail: newText })}
                            />
                        </View>
                        <View style={STYLE.createAccountLabelAndInputContainer}>
                            <Text style={STYLE.createAccountInputLabel}>Password</Text>
                            <TextInput
                                autoCapitalize="none"
                                secureTextEntry={true}
                                style={[
                                    STYLE.createAccountInput,
                                    this.doPasswordsMatch() ? '' : invalidInput,
                                ]}
                                underlineColorAndroid="rgba(0,0,0,0)"
                                value={this.state.password}
                                onChangeText={newText => this.setState({ password: newText })}
                            />
                        </View>
                        <View style={STYLE.createAccountLabelAndInputContainer}>
                            <Text style={STYLE.createAccountInputLabel}>Confirm Password</Text>
                            <TextInput
                                autoCapitalize="none"
                                secureTextEntry={true}
                                style={[
                                    STYLE.createAccountInput,
                                    this.doPasswordsMatch() ? '' : invalidInput,
                                ]}
                                underlineColorAndroid="rgba(0,0,0,0)"
                                value={this.state.confirmPassword}
                                onChangeText={newText =>
                                    this.setState(
                                        { confirmPassword: newText },
                                        this.ensureEmailsAndPasswordsMatch
                                    )
                                }
                            />
                        </View>
                        <TouchableOpacity
                            style={STYLE.createAccountButton}
                            onPress={() => this.createAccount()}
                        >
                            <Text style={STYLE.createAccountButtonText}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

const mapDispatchToProps = {
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateAccountScreen);
