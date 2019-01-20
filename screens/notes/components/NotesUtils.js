import NoteRequests from '../../../utils/NoteRequests.js';
import StoryCompanion from '../../../utils/StoryCompanion.js';

export default class NotesUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.NoteRequests = new NoteRequests();
    }

    componentDidMount() {
        this.props.resetNote();
        this.getNotes();
    }

    resetNote = () => {
        this.removeNavigationActions();
        this.props.resetNote();
    };

    newNote = () => {
        this.setNavigationActions(this.resetNote, this.createNote, null);
        this.props.newNote();
    };

    selectNote = id => {
        this.setNavigationActions(this.resetNote, this.editNote, this.props.openConfirmation);
        this.props.selectNote(id);
    };

    getNotes = () => {
        let paramsObject = this.createParamsObject();
        this.NoteRequests.getNotes(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.setNotes(res.success);
                    this.resetNote();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };

    createNote = () => {
        let paramsObject = this.createParamsObject();
        this.NoteRequests.createNote(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'danger');
                } else {
                    this.props.setNotes(res.success);
                    this.resetNote();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };

    editNote = () => {
        let paramsObject = this.createParamsObject();
        this.NoteRequests.editNote(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempNotes = this.props.notes;
                    tempNotes[this.props.selectedNoteId] = res.success;
                    this.props.setNotes(tempNotes);
                    this.resetNote();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };

    deleteNote = () => {
        let paramsObject = this.createParamsObject();
        this.NoteRequests.deleteNote(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempNotes = this.props.notes;
                    delete tempNotes[this.props.selectedNoteId];
                    this.props.setNotes(tempNotes);
                    this.resetNote();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };

    exportNotes = () => {
        const paramsObject = this.createParamsObject();
        this.NoteRequests.exportNotes(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'danger');
                } else {
                    this.props.showAlert(`Success emailed notes to ${this.props.email}`, 'success');
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to export notes at this time', 'danger');
            });
    };
}
