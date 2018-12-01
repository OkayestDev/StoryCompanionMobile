import { 
    postRequestWithFormData,
} from './HelperFunctions.js';

export default class PlotRequests {
    getPlots = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'plot/view', {}).then(res => res);
    }

    createPlot = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'plot/creation', {}).then(res => res);
    }

    editPlot = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'plot/edit', {}).then(res => res);
    }

    deletePlot = (paramsObject) => {
        return postRequestWithFormData(paramsObject, 'plot/delete', {}).then(res => res);
    }
}