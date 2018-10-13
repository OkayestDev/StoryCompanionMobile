import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    AsyncStorage,
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
                    {
                        'params' in navigation.state && 'onDraftSave' in navigation.state.params &&
                        <TouchableOpacity
                            onPress={() => navigation.state.params.onDraftSave()}
                        >
                            <Icon
                                color="white"
                                name="check"
                                type="font-awesome"
                                size={28}
                            />
                        </TouchableOpacity>
                    }
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
            draft: null,

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
                    this.setState({
                        draft: res.success,
                        description: res.success.description
                    });
                    if ('id' in res.success) {
                        this.props.navigation.setParams({onDraftSave: () => this.editDraft()})
                    }
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
        let paramsObject = {
            story: this.selectedStoryId,
            description: ''
        }
        this.DraftRequests.createDraft(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: false,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                this.setState({draft: res.success});
                this.props.navigation.setParams({onDraftSave: () => this.editDraft()})
            }
        })
        .catch((error) => {
            this.setState({
                globalAlertVisible: false,
                globalAlertType: 'danger',
                globalAlertMessage: 'Unable to create draft at this time',
            });
        })
    }

    // We only have one draft per story
    editDraft = () => {
        let paramsObject = {
            draft: this.state.draft.id,
            description: this.state.description,
        };
        this.DraftRequests.editDraft(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: false,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to edit draft at this time',
                })
            }
            else {
                this.setState({
                    draft: res.success,
                    description: res.success.description,
                    globalAlertVisible: true,
                    globalAlertType: 'success',
                    globalAlertMessage: 'Successfully saved draft changes!'
                });
            }
        })
        .catch((error) => {
            this.setState({
                globalAlertVisible: false,
                globalAlertType: 'danger',
                globalAlertMessage: 'Unable to edit draft at this time',
            });
        });
    }

    deleteDraft = () => {
        this.DraftRequests.editDraft(this.state.draft.id).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: false,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to edit draft at this time',
                })
            }
            else {
                // As of right now - we only allow one draft. set to an empty array
                this.setState({draft: []});
            }
        })
        .catch((error) => {
            this.setState({
                globalAlertVisible: false,
                globalAlertType: 'danger',
                globalAlertMessage: 'Unable to edit draft at this time',
            });
        });
    }

    render () {
        if (this.state.draft === null) {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <View style={styles.noDraftContainer}/>
                </View>
            )
        }
        else if ('id' in this.state.draft) {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <TextInput
                        placeholder="Start writing your draft"
                        style={styles.draftInput}
                        underlineColorAndroid='rgba(0,0,0,0)'
                        multiline={true}
                        value={this.state.description}
                        onChangeText={(newDescription) => this.setState({description: newDescription})}
                    />
                </View>
            );
        }
        // No draft created
        else {
            return (
                <View style={styles.container}>
                    <View style={styles.noDraftContainer}>
                        <GlobalAlert
                            visible={this.state.globalAlertVisible}
                            message={this.state.globalAlertMessage}
                            type={this.state.globalAlertType}
                            closeAlert={() => this.setState({globalAlertVisible: false})}
                        />
                        <Text style={styles.noDraftText}>
                            Looks like you haven't started a draft for this story yet
                        </Text>
                        <TouchableOpacity
                            style={styles.noDraftButton}
                            onPress={() => this.createDraft()}
                        >
                            <Text style={styles.noDraftButtonText}>
                                Start A Draft
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
    },
    draftScrollView: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        padding: 10,
    },
    draftInput: {
        height: '98%',
        width: '98%',
        marginTop: '1.5%',
        marginLeft: '1%',
        borderRadius: 4,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 18,
    },
    noDraftContainer: {
        width: '100%',
        height: '98%',
        width: '98%',
        marginTop: '1.5%',
        marginLeft: '1%',
        borderRadius: 4,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDraftText: {
        textAlign: 'center',
        fontSize: 30,
        color: '#CCCCCC',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    noDraftButton: {
        width: '70%',
        backgroundColor: '#2f95dc',
        height: 50,
        display: 'flex',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDraftButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
})