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
import SettingRequests from '../utils/SettingRequests.js';

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
        this.SettingRequests = new SettingRequests();
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
        this.SettingRequests.bug(paramsObject).then((res) => {
            if ('error' in res) {

            }
            else {

            }
        })
        .catch((error) => {
            this.setState({

            });
        })
    }

    feature = () => {

    }

    logout = () => {
        AsyncStorage.clear().then((res) => {
            this.props.navigation.navigate("LoginTab");
        });
    }

    render() {
        if (this.state.submittingBug) {
            return (
                <View style={styles.container}>
                    <FloatingButtons
                        onCancel={() => this.setState({submittingBug: false})}
                        onSave={null}
                        onDelete={null}
                    />
                </View>
            );
        }
        else if (this.state.submittingFeature) {
            return (
                <View style={styles.container}>
                    <FloatingButtons
                        onCancel={() => this.setState({submittingFeature: false})}
                        onSave={null}
                        onDelete={null}
                    />
                    <View style={styles.submissionContainer}>
                        <Text style={styles.submissionLabel}>
                            Submitting a Feature Request
                        </Text>
                        <TextInput
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
                            onPress={() => this.logout()}
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
    submissionLabel: {
        fontSize: 24,
        color: '#2f95dc',
        fontWeight: 'bold',
        height: '10%',
    },
    submissionContainer: {
        width: '100%',
        height: '100%',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submissionDescription: {
        height: '10%',
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 18,
    }
})