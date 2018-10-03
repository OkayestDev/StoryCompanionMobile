import React, { Component } from 'react';
import { 
    View, 
    Text,
    StyleSheet, 
    TouchableOpacity, 
    Dimensions, 
    TextInput, 
    KeyboardAvoidingView, 
    AsyncStorage,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalAlert from '../components/GlobalAlert.js';
import UserRequest from '../utils/UserRequests.js';

export default class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
        headerStyle: { backgroundColor: '#2f95dc' },
        headerTitleStyle: { color: 'white' },
    };

    constructor(props) {
        super(props);
        this.state = {
            email: 'isjustgamedev@gmail.com',
            password: 'encounter1',

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        }
        this.UserRequest = new UserRequest();
    }

    componentWillMount() {
        this.checkIfUserIsAlreadyLoggedIn();
    }

    checkIfUserIsAlreadyLoggedIn = () => {
        AsyncStorage.multiGet(['email', 'id']).then((res) => {
            if (res[0][1] !== null && res[1][1] !== null) {
                this.props.navigation.navigate("StoriesTab");
            }
        });
    }

    login = () => {
        this.UserRequest.login(this.state.email, this.state.password).then((res) => {
            console.info(res);
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                AsyncStorage.multiSet([['email', String(res.success.email)], ['id', String(res.success.id)]]).then((res) => {
                    this.props.navigation.navigate("StoriesTab");
                })
                .catch((error) => {
                    console.info(error);
                });
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
    
    // @TODO add App Icon to login screen
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
                    <KeyboardAvoidingView
                        enabled={true}
                        behavior="position"
                    >
                        <View style={styles.loginView}>
                            <Text style={styles.welcomeBack}>
                                Welcome Back!
                            </Text>
                            <View style={styles.loginLabelAndInputContainer}>
                                <Text style={styles.loginInputLabel}>
                                    Email
                                </Text>
                                <TextInput
                                    autoCapitalize="none"
                                    style={styles.loginInput}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    value={this.state.email}
                                    onChangeText={(newText) => this.setState({email: newText})}
                                />
                            </View>
                            <View style={styles.loginLabelAndInputContainer}>
                                <Text style={styles.loginInputLabel}>
                                    Password
                                </Text>
                                <TextInput
                                    autoCapitalize="none"
                                    secureTextEntry={true}
                                    style={styles.loginInput}
                                    underlineColorAndroid='rgba(0,0,0,0)'
                                    value={this.state.password}
                                    onChangeText={(newText) => this.setState({password: newText})}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => this.login()}
                            >
                                <Text
                                    style={styles.loginButtonText}
                                >
                                    Login
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
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
    welcomeBack: {
        fontWeight: 'bold',
        fontSize: 36,
        color: '#CCCCCC',
        marginBottom: 20,
    },
    loginView: {
        height: .7 * Dimensions.get('window').height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginLabelAndInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        marginBottom: 20,
    },
    loginInputLabel: {
        color: '#CCCCCC',
        fontSize: 24,
        fontWeight: 'bold',
        width: .3 * Dimensions.get('window').width,
    },
    loginInput: {
        width: .6 * Dimensions.get('window').width,
        height: 60,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#2f95dc',
        display: 'flex',
        height: 50,
        width: .8 * Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 24,
    }
});