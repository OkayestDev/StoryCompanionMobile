import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView, 
    TextInput, 
    AsyncStorage 
} from 'react-native';
import { Icon } from 'react-native-elements';
import DraftRequests from '../utils/DraftRequests.js'
import GlobalAlert from '../components/GlobalAlert.js';

const headerTitle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2f95dc',
    paddingLeft: 20,
}

export default class DraftsScreen extends Component {
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
                    <Text numberOfLines={1} style={{width: '80%', fontWeight: 'bold', color: 'white', fontSize: 28}}>
                        {navigation.getParam('title')}
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
            description: '',
            selectedDraftId: '',
            drafts: null,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        }
        this.DraftRequests = new DraftRequests();
        // @PROD
        this.selectedStoryId = null;
        // @DEV
        // this.selectedStoryId = 1;
        this.getDrafts();
    }

    // Only allowing one draft per story at this time
    getDrafts = (story = null) => {
        if (story !== null) {
            this.DraftRequests.getDrafts(story).then((res) => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                }
                else {
                    this.setState({drafts: res.success});
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
        else {
            AsyncStorage.multiGet(['selectedStoryId', 'selectedStoryName']).then((res) => {
                if (!res) {
                    this.props.navigation.navigate("LoginTab");
                }
                this.selectedStoryId = parseInt(res[0][1]);
                this.props.navigation.setParams({title: res[1][1]});
                this.getDrafts(res[0][1]);
            });
        }
    }

    createDraft = () => {

    }

    editDraft = () => {

    }

    deleteDraft = () => {
        
    }

    render () {
        if (this.state.drafts === null) {
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
        else if (Object.keys(this.state.drafts).length > 0) {
            return (
                <View styles={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <ScrollView styles={styles.draftScrollView}>
                        <TextInput
                            style={styles.draftInput}
                            underlineColorAndroid='rgba(0,0,0,0)'
                            multiline={true}
                            value={this.state.description}
                            onChange={(newDescription) => this.setState({description: newDescription})}
                        />
                    </ScrollView>
                </View>
            );
        }
        // No draft created
        else {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <Text>
                        Looks like you haven't created a draft yet @TODO
                    </Text>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    draftScrollView: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        padding: 10,
    },
    draftInput: {
        width: '100%',
        height: '100%',
        width: '100%',
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 16,
    }
})