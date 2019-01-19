import StoryCompanion from '../../../utils/StoryCompanion.js';
import PlotRequests from '../../../utils/PlotRequests.js';

export default class PlotsUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.PlotRequests = new PlotRequests();
    }

    componentDidMount() {
        this.getPlots();
    }

    resetPlot = () => {
        this.removeNavigationActions();
        this.props.resetPlot();
    };

    newPlot = () => {
        this.setNavigationActions(this.resetPlot, this.createPlot, null);
        this.props.newPlot();
    };

    selectPlot = id => {
        this.setNavigationActions(this.resetPlot, this.editPlot, this.props.openConfirmation);
        this.props.selectPlot(id);
    };

    addChildPlot = parentId => {
        this.setNavigationActions(this.cancelPlotEdit, this.createPlot, null);
        this.props.addChildPlot(parentId);
    };

    getPlots = () => {
        let paramsObject = this.createParamsObject();
        this.PlotRequests.getPlots(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'danger');
                } else {
                    this.props.setPlot(res.success);
                    this.resetPlot();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from server', 'danger');
            });
    };

    createPlot = () => {
        let paramsObject = this.createParamsObject();
        this.PlotRequests.createPlot(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'danger');
                } else {
                    this.props.setPlots(res.success);
                    this.resetPlot();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get a response from the server', 'danger');
            });
    };

    editPlot = () => {
        let paramsObject = this.createParamsObject();
        this.PlotRequests.editPlot(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempPlots = this.props.plots;
                    tempPlots[this.props.selectedPlotId] = res.success;
                    this.props.setPlots(tempPlots);
                    this.resetPlot();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get response from server', 'danger');
            });
    };

    deletePlot = () => {
        let paramsObject = this.createParamsObject();
        this.PlotRequests.deletePlot(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.props.showAlert(res.error, 'warning');
                } else {
                    let tempPlots = this.props.plots;
                    delete tempPlots[this.props.selectedPlotId];
                    this.props.setPlots(tempPlots);
                    this.resetPlot();
                }
            })
            .catch(() => {
                this.props.showAlert('Unable to get response from server', 'danger');
            });
    };
}
