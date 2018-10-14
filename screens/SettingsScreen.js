import React, { Component } from 'react';
import { 
    View, 
    StyleSheet, 
    AsyncStorage, 
    Text, 
    TouchableOpacity, 
    Dimensions 
} from 'react-native';
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
        }
    }

    bug = () => {

    }

    feature = () => {

    }

    logout = () => {
        logout = () => {
            AsyncStorage.clear().then((res) => {
                this.props.navigation.navigate("LoginTab");
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ConfirmationModal
                    isConfirmationModalOpen={this.state.isConfirmationModalOpen}
                    closeConfirmationModal={() => this.setState({isConfirmationModalOpen: false})}
                    confirmationTitle={"Logout?"}
                    onConfirm={() => this.logout()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})