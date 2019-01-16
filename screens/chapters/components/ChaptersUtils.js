import StoryCompanion from '../../../utils/StoryCompanion.js';
import ChapterRequests from '../../../utils/ChapterRequests.js';

export default class ChapterUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.ChapterRequests = new ChapterRequests();
    }

    componentDidMount() {
        this.getChapters();
    }

    resetChapter = () => {
        this.removeNavigationActions();
        this.props.resetChapter();
    };

    newChapter = () => {
        this.setNavigationActions(this.resetChapter, this.createChapter, null);
        this.props.newChapter();
    };

    selectChapter = id => {
        this.setNavigationActions(this.resetChapter, this.editChapter, this.props.openConfirmation);
        this.props.selectChapter(id);
    };

    selectChapterToWriteContent = id => {
        this.setNavigationActions(this.resetChapter, this.writeChapter);
        this.props.selectChapterToWriteContent(id);
    };

    getChapters = () => {
        let paramsObject = this.createParamsObject();
        this.ChapterRequests.getChapters(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.setChapters(res.success);
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get Chapters at this time.', 'danger');
            });
    };

    createChapter = () => {
        let paramsObject = this.createParamsObject();
        this.ChapterRequests.createChapter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.setChapters(res.success);
                    this.resetChapter();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to add chapter at this time', 'danger');
            });
    };

    editChapter = () => {
        let paramsObject = this.createParamsObject();
        this.ChapterRequests.editChapter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempChapters = this.props.chapters;
                    tempChapters[this.props.selectedChapterId] = res.success;
                    this.props.setChapters(tempChapters);
                    this.resetChapter();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to edit chapter at this time', 'danger');
            });
    };

    deleteChapter = () => {
        let paramsObject = this.createParamsObject();
        this.ChapterRequests.deleteChapter(paramsObject).then(res => {
            if ('error' in res) {
                this.props.showAlert(res.error, 'warning');
            } else {
                let tempChapters = this.props.chapters;
                delete tempChapters[this.props.selectedChapterId];
                this.props.setChapters(tempChapters);
                this.resetChapter();
            }
        });
    };

    writeChapter = () => {
        const paramsObject = this.createParamsObject();
        this.ChapterRequests.writeChapter(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempChapters = this.props.chapters;
                    tempChapters[this.props.selectedChapterId] = res.success;
                    this.props.setChapters(tempChapters);
                    this.props.showAlert('Successfully saved chapter', 'success');
                }
            })
            .catch(() => {
                this.props.showAlert('Unable write chapter at this time', 'danger');
            });
    };

    exportChapters = () => {
        const paramsObject = this.createParamsObject();
        this.ChapterRequests.exportChapters(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    this.props.showAlert(
                        'Successfully emailed chapters to ' + paramsObject.email,
                        'success'
                    );
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to export chapters at this time', 'danger');
            });
    };
}
