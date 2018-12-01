import React from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    Keyboard
} from 'react-native';
import { connect } from 'react-redux';
import Actions from '../store/Actions.js';
import { Icon } from 'react-native-elements';
import DraftRequests from '../utils/DraftRequests.js'
import GlobalAlert from '../components/GlobalAlert.js';
import StoryCompanion from '../utils/StoryCompanion.js';

const headerTitle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2f95dc',
    paddingLeft: 20,
}

class DraftsScreen extends StoryCompanion {
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
                    <Text numberOfLines={1} style={{width: '60%', fontWeight: 'bold', color: 'white', fontSize: 28}}>
                        {navigation.getParam('title')}
                    </Text>
                    {
                        'params' in navigation.state && 'onDraftExport' in navigation.state.params &&
                        <TouchableOpacity
                            onPress={() => navigation.state.params.onDraftExport()}
                            style={{width: '15%'}}
                        >
                            <Icon
                                color="white"
                                name="envelope"
                                type="font-awesome"
                                size={28}
                            />
                        </TouchableOpacity>
                    }
                    {
                        'params' in navigation.state && 'onDraftSave' in navigation.state.params &&
                        <TouchableOpacity
                            style={{width: '15%'}}
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
        props.navigation.setParams({title: this.props.stories[this.props.selectedStoryId].name});
        this.getDrafts();
    }

    // Only allowing one draft per story at this time
    getDrafts = () => {
        let paramsObject = this.createParamsObject();
        this.DraftRequests.getDrafts(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                this.setState({
                    draft: res.success,
                    description: 'description' in res.success ? res.success.description : '',
                    selectedDraftId: 'id' in res.success ? res.success.id : '',
                });
                if ('id' in res.success) {
                    this.props.navigation.setParams({
                        onDraftSave: () => this.editDraft(),
                        onDraftExport: () => this.exportDraft(),
                    })
                }
            }
        })
        .catch(() => {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: "Unable to get response from server",
            });
        })
    }

    exportDraft = () => {
        let paramsObject = this.createParamsObject();
        this.DraftRequests.exportDraft(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'success',
                    globalAlertMessage: res.success,
                });
            }
        })
        .catch(() => {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: 'Unable to export draft at this time',
            });
        });
    }

    createDraft = () => {
        let paramsObject = this.createParamsObject();
        console.info(paramsObject);
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
                this.props.navigation.setParams({
                    onDraftSave: () => this.editDraft(),
                    onDraftExport: () => this.exportDraft(),
                })
            }
        })
        .catch(() => {
            this.setState({
                globalAlertVisible: false,
                globalAlertType: 'danger',
                globalAlertMessage: 'Unable to create draft at this time',
            });
        })
    }

    // We only have one draft per story
    editDraft = () => {
        Keyboard.dismiss();
        let paramsObject = this.createParamsObject();
        console.info(paramsObject);     
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
            console.info(error);
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: 'Unable to edit draft at this time',
            });
        });
    }

    deleteDraft = () => {
        let paramsObject = this.createParamsObject();
        this.DraftRequests.editDraft(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to edit draft at this time',
                })
            }
            else {
                // As of right now - we only allow one draft. set to an empty array
                this.setState({draft: []});
            }
        })
        .catch(() => {
            this.setState({
                globalAlertVisible: true,
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

export default connect(Actions.mapStateToProps, Actions.mapDispatchToProps)(DraftsScreen);

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