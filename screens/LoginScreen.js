import React from 'react';
import { 
    View, 
    Text,
    StyleSheet, 
    TouchableOpacity, 
    Dimensions, 
    TextInput, 
    KeyboardAvoidingView, 
} from 'react-native';
import StoryCompanion from '../utils/StoryCompanion.js';
import { connect } from 'react-redux';
import Actions from '../store/Actions.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalAlert from '../components/GlobalAlert.js';
import UserRequests from '../utils/UserRequests.js';

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

class LoginScreen extends StoryCompanion {
    static navigationOptions = {
        title: 'Login',
        headerTitle: (
            <View style={headerTitle}>
                <Text numberOfLines={1} style={{fontWeight: 'bold', color: 'white', fontSize: 28}}>
                    Story Companion
                </Text>
            </View>
        ),
        headerStyle: { backgroundColor: '#2f95dc' },
        headerTitleStyle: { color: 'white' },
    };

    constructor(props) {
        super(props);
        this.state = {
            // @TODO DEV
            email: 'isjustgamedev@gmail.com',
            password: 'encounter1',
            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        }
        this.UserRequests = new UserRequests();
    }

    componentWillMount() {
        this.checkIfUserIsAlreadyLoggedIn();
    }

    checkIfUserIsAlreadyLoggedIn = () => {
        if (this.props.userId !== null && this.props.apiKey !== null) {
            this.props.navigation.navigate("StoriesTab");
        }
    }

    login = () => {
        let paramsObject = this.createParamsObject();
        this.UserRequests.login(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                this.props.login(res.success);
                this.props.navigation.navigate("StoriesTab");
            }
        })
        .catch(() => {
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
                                    keyboardType="email-address"
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

export default connect(Actions.mapStateToProps, Actions.mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    welcomeBack: {
        fontWeight: 'bold',
        fontSize: 36,
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
        width: screenX,
        marginBottom: 20,
    },
    loginInputLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        width: .3 * screenX,
        marginRight: .05 * screenX,
    },
    loginInput: {
        width: .6 * screenX,
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
        width: .8 * screenX,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 24,
    },
});