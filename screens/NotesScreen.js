import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
} from 'react-native';
import GlobalAlert from '../components/GlobalAlert.js';
import EditEntity from '../components/EditEntity.js';
import FloatingAddButton from '../components/FloatingAddButton.js';
import NoteRequests from '../utils/NoteRequests.js';
import { Icon } from 'react-native-elements';

const headerTitle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2f95dc',
    paddingLeft: 20,
}

export default class NotesScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Notes',
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
            name: '',
            description: '',
            notes: null,
            selectedNoteId: null,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        }
        this.NoteRequests = new NoteRequests();
        // @PROD
        this.selectedStoryId = null;
        this.getNotes();
        // @DEV
        // this.selectedStoryId = 3;
        // this.getNotes(3);
    }

    getNotes = (story = null) => {
        if (story !== null) {
            this.NoteRequests.getNotes(story).then((res) => {
                if ('error' in res) {
                    this.setState({
                        selectedNoteId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    })
                }
                else {
                    this.setState({
                        selectedNoteId: null,
                        notes: res.success,
                    })
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
                this.selectedStoryId = res[0][1];
                this.props.navigation.setParams({title: res[1][1]});
                this.getNotes(res[0][1]);
            });
        }
    }

    createNote = () => {
        let paramsObject = {
            story: this.selectedStoryId,
            name: this.state.name,
            description: this.state.description,
        };
        this.NoteRequests.createNote(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: res.error,
                });
            }
            else {
                this.setState({
                    name: '',
                    description: '',
                    notes: res.success,
                    selectedNoteId: null,
                })
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

    editNote = () => {
        let paramsObject = {
            note: this.state.selectedNoteId,
            name: this.state.name,
            description: this.state.description,
        };
        this.NoteRequest.editNote(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                let tempNotes = this.state.notes;
                tempNotes[this.state.selectedNoteId] = res.success;
                this.setState({
                    selectedNoteId: null,
                    name: '',
                    description: '',
                    notes: tempNotes,
                });
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

    deleteNote = () => {
        this.NoteRequests.deleteNote(this.state.selectedNoteId).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                let tempNotes = this.state.notes;
                delete tempNotes[this.state.selectedNoteId];
                this.setState({
                    notes: tempNotes,
                    name: '',
                    description: '',
                    selectedNoteId: null,
                });
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

    selectNote = (id) => {
        this.setState({
            selectedNoteId: id,
            name: this.state.notes[id].name,
            description: this.state.notes[id].description,
        });
    }

    cancelNoteEdit = () => {
        this.setState({
            selectedNoteId: null,
            name: '',
            description: '',
        })
    }

    renderNotes = () => {
        if (this.state.notes === null) {
            return null;
        }

        noteIds = Object.keys(this.state.notes);
        if (noteIds.length > 0) {
            let notesRendered = [];
            noteIds.forEach((id) => {
                notesRendered.push(
                    <TouchableOpacity
                            key={id}
                            onPress={() => this.selectNote(id)}
                            style={styles.noteContainer}
                        >
                            <View style={styles.notePictureAndName}>
                                <View styles={styles.notePictureContainer}>
                                </View>
                                <View style={styles.noteNameAndDescription}>
                                    <Text numberOfLines={1} style={styles.noteName}>
                                        {this.state.notes[id].name}
                                    </Text>
                                    <Text numberOfLines={3} style={styles.noteDescription}>
                                        {this.state.notes[id].description}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                )
            });
            return notesRendered;
        }
        else {
            return (
                <View style={styles.noNotesContainer}>
                    <Text style={styles.noNotesText}>
                        Looks like you haven't created any notes yet.
                    </Text>
                    <Text style={styles.noNotesText}>
                        Press on the + to create a note!
                    </Text>
                </View>
            )
        }
    }

    render() {
        if (this.state.selectedNoteId === null) {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <ScrollView>
                        {this.renderNotes()}
                    </ScrollView>
                    <FloatingAddButton onPress={() => this.setState({selectedNoteId: 'new'})}/>
                </View>
            )
        }
        else {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <EditEntity
                        selectedEntityId={this.state.selectedNoteId}
                        entityType="Note"

                        inputOne={this.state.name}
                        inputOneName="Note Name"
                        inputOneOnChange={(newValue) => this.setState({name: newValue})}

                        inputThree={this.state.description}
                        inputThreeName="Description"
                        inputThreeOnChange={(newValue) => this.setState({description: newValue})}

                        createEntity={() => this.createNote()}
                        editEntity={() => this.editNote()}
                        deleteEntity={() => this.deleteNote()}
                        cancelEntityEdit={() => this.cancelNoteEdit()}
                    />
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
    noteContainer: {
        width: '100%',
        padding: 10,
        height: 125,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    },
    noteName: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    noteDescription: {
        fontSize: 18,
    },
    noNotesContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noNotesText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 36,
        color: '#CCCCCC',
        fontWeight: 'bold',
    }
});