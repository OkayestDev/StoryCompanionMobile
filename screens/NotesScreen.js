import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import Actions from '../store/Actions.js';
import GlobalAlert from '../components/GlobalAlert.js';
import EditEntity from '../components/EditEntity.js';
import FloatingAddButton from '../components/FloatingAddButton.js';
import NoteRequests from '../utils/NoteRequests.js';
import { Icon } from 'react-native-elements';
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

class NotesScreen extends StoryCompanion {
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
        props.navigation.setParams({title: this.props.stories[this.props.selectedStoryId].name});        
        this.getNotes();
    }

    getNotes = () => {
        let paramsObject = this.createParamsObject();
        this.NoteRequests.getNotes(paramsObject).then((res) => {
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
        .catch(() => {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: "Unable to get response from server",
            });
        })
    }

    createNote = () => {
        let paramsObject = this.createParamsObject();
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
        .catch(() => {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: "Unable to get response from server",
            });
        })
    }

    editNote = () => {
        let paramsObject = this.createParamsObject();        
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
        .catch(() => {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: "Unable to get response from server",
            });
        })
    }

    deleteNote = () => {
        let paramsObject = this.createParamsObject();
        this.NoteRequests.deleteNote(paramsObject).then((res) => {
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
        .catch(() => {
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

export default connect(Actions.mapStateToProps, Actions.mapDispatchToProps)(NotesScreen);

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