import StoryCompanion from '../../../utils/StoryCompanion.js';
import ChapterRequests from '../../../utils/ChapterRequests.js';

export default class ChapterUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.ChapterRequests = new ChapterRequests();
    }

    resetChapter = () => {
        this.removeNavigationActions();
        return {
            description: '',
            name: '',
            number: '',
            content: '',
            selectedChapterId: null,
            isWritingChapter: false,
        };
    };

    componentDidMount() {
        this.getChapters();
    }

    getChapters = () => {
        let paramsObject = this.createParamsObject();
        this.ChapterRequests.getChapters(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        selectedChapterId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState({ chapters: res.success });
                }
            })
            .catch(() => {
                this.setState({
                    selectedChapterId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to get Chapters at this time.',
                });
            });
    };

    createChapter = () => {
        let paramsObject = this.createParamsObject();
        this.ChapterRequests.createChapter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        selectedChapterId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState({
                        chapters: res.success,
                        ...this.resetChapter(),
                    });
                }
            })
            .catch(() => {
                this.setState({
                    selectedChapterId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to add chapter at this time',
                });
            });
    };

    editChapter = () => {
        let paramsObject = this.createParamsObject();
        this.ChapterRequests.editChapter(paramsObject).then(res => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            } else {
                let tempChapters = this.state.chapters;
                tempChapters[this.state.selectedChapterId] = res.success;
                this.setState({
                    chapters: tempChapters,
                    ...this.resetChapter(),
                });
            }
        });
    };

    deleteChapter = () => {
        let paramsObject = this.createParamsObject();
        this.ChapterRequests.deleteChapter(paramsObject).then(res => {
            if ('error' in res) {
                this.setState({
                    selectedChapterId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            } else {
                let tempChapters = this.state.chapters;
                delete tempChapters[this.state.selectedChapterId];
                this.setState({
                    chapters: tempChapters,
                    ...this.resetChapter(),
                });
            }
        });
    };

    writeChapter = () => {
        const paramsObject = this.createParamsObject();
        this.ChapterRequests.writeChapter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.showAlert(res.error, 'warning');
                } else {
                    let tempChapters = this.state.chapters;
                    tempChapters[this.state.selectedChapterId] = res.success;
                    this.setState({
                        chapters: tempChapters,
                    });
                    this.showAlert('Successfully saved chapter', 'success');
                }
            })
            .catch(() => {
                this.showAlert('Unable write chapter at this time', 'danger');
            });
    };

    exportChapters = () => {
        const paramsObject = this.createParamsObject();
        this.ChapterRequests.exportChapters(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.showAlert(res.error, 'warning');
                } else {
                    this.showAlert(
                        'Successfully emailed chapters to ' + paramsObject.email,
                        'success'
                    );
                }
            })
            .catch(() => {
                this.showAlert('Unable to export chapters at this time', 'danger');
            });
    };
}
