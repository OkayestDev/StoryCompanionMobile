import { 
    postRequestWithFormData,
    getData,
    createQueryString,
} from './HelperFunctions.js';

export default class PlotRequests {
    getPlots = (storyId) => {
        let paramsObject = {
            story: storyId
        };
        return postRequestWithFormData(paramsObject, 'plot/view', {}).then(res => res);
    }

    createPlot = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'plot/creation', {}).then(res => res);
    }

    editPlot = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'plot/edit', {}).then(res => res);
    }

    deletePlot = (plot) => {
        let paramsObject = {
            plot: plot
        };
        return postRequestWithFormData(paramsObject, 'plot/delete', {}).then(res => res);
    }
}