import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet, 
    TouchableOpacity, 
    Dimensions, 
    TextInput, 
} from 'react-native';
import GlobalAlert from '../components/GlobalAlert.js';
import { PATTERNS } from '../config/Patterns.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import UserRequests from '../utils/UserRequests.js';

const invalidInput = {
    borderColor: 'red',
}

// @TODO check if email is of correct pattern
export default class CreateAccountScreen extends Component {
    static navigationOptions = {
        title: 'Create Account',
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

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
        this.UserRequests = new UserRequests();
    }

    resetState = () => {
        this.setState({
            email: '',
            confirmEmail: '',
            password: '',
            confirmPassword: '',
            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        });
    }

    doEmailsMatch = () => {
        if (this.state.email === this.state.confirmEmail) {
            return true;
        }
        return false;   
    }

    doPasswordsMatch = () => {
        if (this.state.password === this.state.confirmPassword) {
            return true;
        }
        return false;  
    }

    isEmailValid = (email) => {
        if (PATTERNS.email.test(email)) {
            return true;
        }
        return false;
    }

    isPasswordValid = (password) => {
        if (password.length > 6) {
            return true;
        }
        else {
            return false;
        }
    }

    createAccount = () => {
        if (this.doEmailsMatch() && this.doPasswordsMatch() && this.isEmailValid(this.state.email) && this.isPasswordValid(this.state.password)) {
            this.UserRequests.createAccount(this.state.email, this.state.password).then(res => {
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
                        globalAlertMessage: "Successfully Created Account",
                    });

                    setTimeout(() => {
                        this.resetState();
                        this.props.navigation.navigate('Login')
                    }, 2000)
                }
            })
            .catch((error) => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: "Unable to get response from server",
                });
            }) 
        }
        else {
            if (!this.doEmailsMatch()) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: 'Ensure Emails Match',
                });
            }
            else if (!this.doPasswordsMatch()) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: 'Ensure Passwords Match',
                });
            }
            else if (!this.isEmailValid()) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: 'Please provide a valid email',
                });
            }
            else if (!this.isPasswordValid()) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: 'Ensure passwords are at least 6 characters long',
                });
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <GlobalAlert
                    visible={this.state.globalAlertVisible}
                    message={this.state.globalAlertMessage}
                    type={this.state.globalAlertType}
                    closeAlert={() => this.setState({globalAlertVisible: false})}
                />
                <KeyboardAwareScrollView
                    style={styles.container}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled"
                    scrollEnabled={true}
                > 
                    <View style={styles.createAccountView}>
                        <Text style={styles.welcome}>
                            Welcome!
                        </Text>
                        <View style={styles.createAccountLabelAndInputContainer}>
                            <Text style={styles.createAccountInputLabel}>
                                Email
                            </Text>
                            <TextInput
                                autoCapitalize="none"
                                style={[styles.createAccountInput, (this.doEmailsMatch() ? "" : invalidInput), (this.isEmailValid(this.state.email) ? "" : invalidInput)]}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                value={this.state.email}
                                onChangeText={(newText) => this.setState({email: newText})}
                            />
                        </View>
                        <View style={styles.createAccountLabelAndInputContainer}>
                            <Text style={styles.createAccountInputLabel}>
                                Confirm Email
                            </Text>
                            <TextInput
                                autoCapitalize="none"
                                style={[styles.createAccountInput, (this.doEmailsMatch() ? "" : invalidInput), (this.isEmailValid(this.state.confirmEmail) ? "" : invalidInput)]}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                value={this.state.confirmEmail}
                                onChangeText={(newText) => this.setState({confirmEmail: newText})}
                            />
                        </View>
                        <View style={styles.createAccountLabelAndInputContainer}>
                            <Text style={styles.createAccountInputLabel}>
                                Password
                            </Text>
                            <TextInput
                                autoCapitalize="none"
                                secureTextEntry={true}
                                style={[styles.createAccountInput, (this.doPasswordsMatch() ? "" : invalidInput)]}
                                underlineColorAndroid='rgba(0,0,0,0)'
                                value={this.state.password}
                                onChangeText={(newText) => this.setState({password: newText})}
                            />
                        </View>
                        <View style={styles.createAccountLabelAndInputContainer}>
                            <Text style={styles.createAccountInputLabel}>
                                Confirm Password
                            </Text>
                            <TextInput
                                autoCapitalize="none"
                                secureTextEntry={true}
                                style={[styles.createAccountInput, (this.doPasswordsMatch() ? "" : invalidInput)]}                            
                                underlineColorAndroid='rgba(0,0,0,0)'
                                value={this.state.confirmPassword}
                                onChangeText={(newText) => this.setState({confirmPassword: newText}, this.ensureEmailsAndPasswordsMatch)}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.createAccountButton}
                            onPress={() => this.createAccount()}
                        >
                            <Text
                                style={styles.createAccountButtonText}
                            >
                                Create Account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    welcome: {
        fontWeight: 'bold',
        fontSize: 36,
        color: '#CCCCCC',
        marginBottom: 20,
    },
    createAccountView: {
        height: .7 * Dimensions.get('window').height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    createAccountLabelAndInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        marginBottom: 20,
    },
    createAccountInputLabel: {
        color: '#CCCCCC',
        fontSize: 24,
        fontWeight: 'bold',
        width: .3 * Dimensions.get('window').width,
    },
    createAccountInput: {
        width: .6 * Dimensions.get('window').width,
        height: 60,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
        fontSize: 16,
    },
    createAccountButton: {
        backgroundColor: '#2f95dc',
        display: 'flex',
        height: 50,
        width: .8 * Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    createAccountButtonText: {
        color: 'white',
        fontSize: 24,
    }
});