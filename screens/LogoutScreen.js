import React from 'react';
import { View, StyleSheet, AsyncStorage, Text, TouchableOpacity, Dimensions } from 'react-native';

const headerTitle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2f95dc',
    paddingLeft: 20,
}

export default class LogoutScreen extends React.Component {
    static navigationOptions = {
        title: 'Stories',
        headerTitle: (
            <View style={headerTitle}>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 28}}>
                    Logout
                </Text>
            </View>
        ),
        headerStyle: { backgroundColor: '#2f95dc' },
        headerTitleStyle: { color: 'white' },
    };

    logout = () => {
        AsyncStorage.clear().then((res) => {
            this.props.navigation.navigate("LoginTab");
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.modalText}>
                            Logout?
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => this.props.navigation.navigate("Stories")}
                        >
                            <Text style={styles.buttonText}>
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => this.logout()}
                        >
                            <Text style={styles.buttonText}>
                                Confirm
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalContent: {
        backgroundColor: "white",
        position: 'absolute',
        top: "25%",
        left: "10%",
        height: 175,
        width: .8 * Dimensions.get('window').width,
        padding: 20,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#CCCCCC',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    cancelButton: {
        width: '45%',
        borderRadius: 4,
        height: 50,
        backgroundColor: 'red',
        marginRight: 5,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButton: {
        width: '45%',
        borderRadius: 4,
        height: 50,
        backgroundColor: 'green',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        height: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        fontSize: 24,
        color: '#CCCCCC',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    noteText: {
        fontSize: 16,
        color: '#CCCCCC',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});
