import NoteRequests from '../../../utils/NoteRequests.js';
import StoryCompanion from '../../../utils/StoryCompanion.js';

export default class NotesUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.NoteRequests = new NoteRequests();
    }

    resetNote = () => {
        this.removeNavigationActions();
        return {
            description: '',
            name: '',
            selectedNoteId: null,
        };
    };

    componentDidMount() {
        this.getNotes();
    }

    getNotes = () => {
        let paramsObject = this.createParamsObject();
        this.NoteRequests.getNotes(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        selectedNoteId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState({
                        ...this.resetNote(),
                        notes: res.success,
                    });
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to get response from server',
                });
            });
    };

    createNote = () => {
        let paramsObject = this.createParamsObject();
        this.NoteRequests.createNote(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState({
                        ...this.resetNote(),
                        notes: res.success,
                    });
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to get response from server',
                });
            });
    };

    editNote = () => {
        let paramsObject = this.createParamsObject();
        this.NoteRequests.editNote(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    let tempNotes = this.state.notes;
                    tempNotes[this.state.selectedNoteId] = res.success;
                    this.setState({
                        ...this.resetNote(),
                        notes: tempNotes,
                    });
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to get response from server',
                });
            });
    };

    deleteNote = () => {
        let paramsObject = this.createParamsObject();
        this.NoteRequests.deleteNote(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    let tempNotes = this.state.notes;
                    delete tempNotes[this.state.selectedNoteId];
                    this.setState({
                        notes: tempNotes,
                        ...this.resetNote(),
                    });
                }
            })
            .catch(() => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to get response from server',
                });
            });
    };

    exportNotes = () => {
        const paramsObject = this.createParamsObject();
        this.NoteRequests.exportNotes(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.showAlert(res.error, 'danger');
                } else {
                    this.showAlert(`Success emailed notes to ${this.props.email}`, 'success');
                }
            })
            .catch(() => {
                this.showAlert('Unable to export notes at this time', 'danger');
            });
    };
}
