import React, { Component } from 'react';
import { 
    View, 
    StyleSheet, 
    AsyncStorage, 
    Text, 
    TouchableOpacity, 
    TextInput,
} from 'react-native';
import GlobalAlert from '../components/GlobalAlert.js';
import FloatingButtons from '../components/FloatingButtons.js';
import ConfirmationModal from '../components/ConfirmationModal.js';
import SettingsRequests from '../utils/SettingsRequests.js';

const headerTitle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2f95dc',
    paddingLeft: 20,
}

export default class SettingsScreen extends Component {
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
            bugDescription: '',
            submittingFeature: false,
            featureDescription: '',

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        }
        this.SettingsRequests = new SettingsRequests();
        this.userId = null;
        this.getUserId();
    }

    getUserId = () => {
        AsyncStorage.getItem('id').then((res) => {
            if (!res) {

            }
            if (res !== null) {
                this.userId = res;
            }
        })
    }

    bug = () => {
        let paramsObject = {
            user: this.userId,
            description: this.state.bugDescription,
        }
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
        .catch((error) => {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: 'Unable to submit bug at this time',
            });
        })
    }

    feature = () => {
        let paramsObject = {
            user: this.userId,
            description: this.state.featureDescription,
        }
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
        .catch((error) => {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: 'Unable to submit feature at this time',
            });
        })
    }

    logout = () => {
        AsyncStorage.clear().then((res) => {
            this.props.navigation.navigate("LoginTab");
        });
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
                            value={this.state.bugDescription}
                            onChangeText={(newDescription) => this.setState({bugDescription: newDescription})}
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
                            value={this.state.featureDescription}
                            onChangeText={(newDescription) => this.setState({featureDescription: newDescription})}
                        />
                    </View>
                </View>
            );
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
    }
})