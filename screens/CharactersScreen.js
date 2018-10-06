import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import GlobalAlert from '../components/GlobalAlert.js';
import EditEntity from '../components/EditEntity.js';
import CharacterRequests from '../utils/CharacterRequests.js';

const headerTitle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2f95dc',
    paddingLeft: 20,
}

export default class CharactersScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Characters',
            headerTitle: (
                <View style={headerTitle}>
                    <TouchableOpacity 
                        style={{marginRight: 15}}
                        onPress={() => navigation.navigate("StoriesTab")}
                    >
                        <Icon
                            color="white"
                            name="arrow-left"
                            type="font-awesome"
                            size={28}
                        />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{fontWeight: 'bold', color: 'white', fontSize: 28}}>
                        Characters
                    </Text>
                </View>
            ),
            headerStyle: { backgroundColor: '#2f95dc' },
            headerTitleStyle: { color: 'white' },
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            attribute: '',
            image: '',
            characters: null,
            selectedCharacterId: null,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
        this.CharacterRequests = new CharacterRequests();
        //@PROD
        // this.selectedStoryId = null;
        // this.getCharacters();
        // @DEV
        this.selectedStoryId = 1;
        this.getCharacters(1);
    }

    getCharacters = (story = null) => {
        if (story !== null) {
            this.CharacterRequests.getCharacters(story).then((res) => {
                if ('error' in res) {
                    this.setState({
                        selectedPlotId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                }
                else {
                    this.setState({characters: res.success});
                }
            })
        }
        else {
            AsyncStorage.getItem('selectedStoryId').then((res) => {
                this.selectedStoryId = res;
                this.getCharacters(res);
            })
        }
    }

    renderChapters = () => {

    }

    render() {
        if (this.state.selectedCharacterId === null) {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                </View>
            )
        }
        else {
            return (
                <EditEntity

                />
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});