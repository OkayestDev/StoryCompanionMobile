import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class NotesScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Notes',
            headerTitle: <Text numberOfLines={1} style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>Notes</Text>,
            headerStyle: { backgroundColor: '#2f95dc', },
            headerTitleStyle: { color: 'white', marginHorizontal: 0, },
            headerLeft: (
                <TouchableOpacity 
                    style={{paddingLeft: 8}}
                    onPress={() => navigation.navigate("StoriesTab")}
                >
                    <Icon
                        color="white"
                        name="arrow-left"
                        type="font-awesome"
                        size={20}
                    />
                </TouchableOpacity>
            ),
        }
    };

    render() {
        return (
            <View style={styles.container}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});