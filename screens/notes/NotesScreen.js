import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import EditEntity from '../../components/EditEntity.js';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import NotesUtils from './components/NotesUtils.js';
import * as noteActions from '../../actions/NoteActions.js';
import { showAlert } from '../../actions/Actions.js';
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
        props.navigation.setParams({
            title: this.props.stories[this.props.selectedStoryId].name,
            onExport: this.exportNotes,
        });
    }

    renderNotes = () => {
        if (this.props.notes === null) {
            return null;
        }

        noteIds = Object.keys(this.props.notes);
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
                                    {this.props.notes[id].name}
                                </Text>
                                <Text numberOfLines={3} style={STYLE.noteDescription}>
                                    {this.props.notes[id].description}
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
        if (this.props.selectedNoteId === null) {
            return (
                <View style={STYLE.container}>
                    <ScrollView>{this.renderNotes()}</ScrollView>
                    <FloatingAddButton onPress={this.newNote} />
                </View>
            );
        } else {
            return (
                <View style={STYLE.container}>
                    <EditEntity
                        selectedEntityId={this.props.selectedNoteId}
                        isModalOpen={this.props.isConfirmationModalOpen}
                        entityType="Note"
                        inputOne={this.props.name}
                        inputOneName="Note Name"
                        inputOneOnChange={this.props.handleNameChanged}
                        inputThree={this.props.description}
                        inputThreeName="Description"
                        inputThreeOnChange={this.props.handleDescriptionChanged}
                    />
                    <ConfirmationModal
                        isConfirmationModalOpen={this.props.isConfirmationModalOpen}
                        closeConfirmationModal={this.props.closeConfirmation}
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

function mapStateToProps(state) {
    return {
        ...state.noteStore,
        email: state.appStore.email,
        apiKey: state.appStore.apiKey,
        userId: state.appStore.userId,
        stories: state.storyStore.stories,
        selectedStoryId: state.storyStore.selectedStoryId,
    };
}

const mapDispatchToProps = {
    ...noteActions,
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotesScreen);
