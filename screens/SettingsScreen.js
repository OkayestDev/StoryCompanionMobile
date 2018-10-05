import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';

const headerTitle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2f95dc',
    paddingLeft: 20,
}

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
        headerTitle: (
            <View style={headerTitle}>
                <Text numberOfLines={1} style={{fontWeight: 'bold', color: 'white', fontSize: 28}}>
                    Settings
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
                <TouchableOpacity
                    onPress={() => this.logout()}
                >
                    <Text>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
