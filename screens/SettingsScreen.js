import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
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
