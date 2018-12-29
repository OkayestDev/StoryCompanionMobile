import StoryCompanion from '../../../utils/StoryCompanion.js';
import PlotRequests from '../../../utils/PlotRequests.js';

export default class PlotsUtils extends StoryCompanion {
    constructor(props) {
        super(props);
        this.PlotRequests = new PlotRequests();
    }

    resetPlot = () => {
        this.removeNavigationActions();
        return {
            description: '',
            name: '',
            plotParent: null,
            selectedPlotId: null,
        };
    };

    componentDidMount() {
        this.getPlots();
    }

    getPlots = () => {
        let paramsObject = this.createParamsObject();
        this.PlotRequests.getPlots(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        selectedPlotId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState({
                        ...this.resetPlot(),
                        plots: res.success,
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

    createPlot = () => {
        let paramsObject = this.createParamsObject();
        this.PlotRequests.createPlot(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                } else {
                    this.setState({
                        plots: res.success,
                        ...this.resetPlot(),
                    });
                }
            })
            .catch(error => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: 'Unable to get response from server',
                });
            });
    };

    editPlot = () => {
        let paramsObject = this.createParamsObject();
        console.info(paramsObject);
        this.PlotRequests.editPlot(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        selectedPlotId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    let tempPlots = this.state.plots;
                    tempPlots[this.state.selectedPlotId] = res.success;
                    this.setState({
                        plots: tempPlots,
                        ...this.resetPlot(),
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

    deletePlot = () => {
        let paramsObject = this.createParamsObject();
        this.PlotRequests.deletePlot(paramsObject)
            .then(res => {
                if ('error' in res) {
                    this.setState({
                        selectedPlotId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    });
                } else {
                    let tempPlots = this.state.plots;
                    delete tempPlots[this.state.selectedPlotId];
                    this.setState({
                        plots: tempPlots,
                        ...this.resetPlot(),
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
}
