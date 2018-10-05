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

    createPlot = (name, description, plotParent, story) => {
        let paramsObject = {
            name: name,
            description: description,
            plotParent: plotParent,
            story: story,
        };
        console.info(paramsObject);
        return postRequestWithFormData(paramsObject, 'plot/creation', {}).then(res => res);
    }

    editPlot = (plot, name, description, plotParent) => {
        let paramsObject = {
            plot: plot,
            name: name,
            description: description,
            plotParent: plotParent,
        };
        return postRequestWithFormData(paramsObject, 'plot/edit', {}).then(res => res);
    }

    deletePlot = (plot) => {
        let paramsObject = {
            plot: plot
        };
        return postRequestWithFormData(paramsObject, 'plot/delete', {}).then(res => res);
    }
}