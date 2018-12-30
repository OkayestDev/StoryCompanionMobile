import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../store/Actions.js';
import GlobalAlert from '../../components/GlobalAlert.js';
import EditEntity from '../../components/EditEntity.js';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import NotesUtils from './components/NotesUtils.js';
import STYLE from './components/NotesStyle.js';

class NotesScreen extends NotesUtils {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Notes',
            headerTitle: (
                <View style={StoryCompanion.headerTitle}>
                    {StoryCompanion.renderNavigationTitle(
                        { navigation },
                        navigation.getParam('title'),
                        () => navigation.navigate('StoriesTab')
                    )}
                    {StoryCompanion.renderNavigationOptions({ navigation })}
                </View>
            ),
            headerStyle: { backgroundColor: '#2f95dc' },
            headerTitleStyle: { color: 'white' },
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            notes: null,
            selectedNoteId: null,

            isConfirmationModalOpen: false,
            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
        props.navigation.setParams({
            title: this.props.stories[this.props.selectedStoryId].name,
            onExport: this.exportNotes,
        });
    }

    cancelNoteEdit = () => {
        this.removeNavigationActions();
        this.setState({
            selectedNoteId: null,
            name: '',
            description: '',
        });
    };

    newNote = () => {
        this.setNavigationActions(this.cancelNoteEdit, this.createNote, null);
        this.setState({ selectedNoteId: 'new' });
    };

    selectNote = id => {
        this.setNavigationActions(this.cancelNoteEdit, this.editNote, this.openConfirmation);
        this.setState({
            selectedNoteId: id,
            name: this.state.notes[id].name,
            description: this.state.notes[id].description,
        });
    };

    renderNotes = () => {
        if (this.state.notes === null) {
            return null;
        }

        noteIds = Object.keys(this.state.notes);
        if (noteIds.length > 0) {
            let notesRendered = [];
            noteIds.forEach(id => {
                notesRendered.push(
                    <TouchableOpacity
                        key={id}
                        onPress={() => this.selectNote(id)}
                        style={STYLE.noteContainer}
                    >
                        <View style={STYLE.notePictureAndName}>
                            <View styles={STYLE.notePictureContainer} />
                            <View style={STYLE.noteNameAndDescription}>
                                <Text numberOfLines={1} style={STYLE.noteName}>
                                    {this.state.notes[id].name}
                                </Text>
                                <Text numberOfLines={3} style={STYLE.noteDescription}>
                                    {this.state.notes[id].description}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            });
            return notesRendered;
        } else {
            return (
                <View style={STYLE.noNotesContainer}>
                    <Text style={STYLE.noNotesText}>
                        Looks like you haven't created any notes yet.
                    </Text>
                    <Text style={STYLE.noNotesText}>Press on the + to create a note!</Text>
                </View>
            );
        }
    };

    render() {
        if (this.state.selectedNoteId === null) {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <ScrollView>{this.renderNotes()}</ScrollView>
                    <FloatingAddButton onPress={this.newNote} />
                </View>
            );
        } else {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <EditEntity
                        selectedEntityId={this.state.selectedNoteId}
                        isModalOpen={this.state.isConfirmationModalOpen}
                        entityType="Note"
                        inputOne={this.state.name}
                        inputOneName="Note Name"
                        inputOneOnChange={newValue => this.setState({ name: newValue })}
                        inputThree={this.state.description}
                        inputThreeName="Description"
                        inputThreeOnChange={newValue => this.setState({ description: newValue })}
                    />
                    <ConfirmationModal
                        isConfirmationModalOpen={this.state.isConfirmationModalOpen}
                        closeConfirmationModal={() =>
                            this.setState({ isConfirmationModalOpen: false })
                        }
                        confirmationTitle={'Delete Note?'}
                        entityDescription=""
                        onConfirm={() => {
                            this.deleteNote();
                            this.onConfirmationConfirm();
                        }}
                        note=""
                    />
                </View>
            );
        }
    }
}

export default connect(
    Actions.mapStateToProps,
    Actions.mapDispatchToProps
)(NotesScreen);
