import { Component } from 'react';
import TagRequests from '../utils/TagRequests.js';

export default class StoryCompanion extends Component {
    constructor(props) {
        super(props);
        this.TagRequests = new TagRequests();
    }

    createParamsObject = () => {
        if (typeof this.state === 'undefined') {
            this.state = {};
        }

        const paramsObject = {
            plot: 'selectedPlotId' in this.state ? this.state.selectedPlotId : '',
            plotParent: 'plotParent' in this.state ? this.state.plotParent : '',
            draft: 'selectedDraftId' in this.state ? this.state.selectedDraftId : '',
            note: 'selectedNoteId' in this.state ? this.state.selectedNoteId : '',
            character: 'selectedCharacterId' in this.state ? this.state.selectedCharacterId : '',
            chapter: 'selectedChapterId' in this.state ? this.state.selectedChapterId : '',
            number: 'number' in this.state ? this.state.number : '',
            user: 'userId' in this.state ? this.state.userId : this.props.userId,
            story:
                'selectedStoryId' in this.state
                    ? this.state.selectedStoryId
                    : this.props.selectedStoryId,
            tag: 'selectedTagId' in this.state ? this.state.selectedTagId : '',
            type: 'type' in this.state ? this.state.type : '',
            description: 'description' in this.state ? this.state.description : '',
            attribute: 'attribute' in this.state ? this.state.attribute : '',
            name: 'name' in this.state ? this.state.name : '',
            email: 'email' in this.state ? this.state.email : this.props.email,
            confirmEmail: 'confirmEmail' in this.state ? this.state.confirmEmail : '',
            password: 'password' in this.state ? this.state.password : '',
            confirmPassword: 'confirmPassword' in this.state ? this.state.confirmPassword : '',
            apiKey: this.props.apiKey,
        };
        return paramsObject;
    };

    sortEntitiesByNumber = entities => {
        if (typeof entities === 'undefined') {
            return [];
        }
        let entityIds = Object.keys(entities);
        entityIds.sort(function(a, b) {
            return entities[a].number - entities[b].number;
        });
        return entityIds;
    };

    showAlert(message, type) {
        this.setState({
            globalAlertVisible: true,
            globalAlertType: type,
            globalAlertMessage: message,
        });
    }

    getTags = () => {
        // Instance of array means tags is empty
        if (this.props.tags === null || this.props.tags instanceof Array) {
            let paramsObject = this.createParamsObject();
            this.TagRequests.getTags(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.showAlert('Unable to fetch tags at this time', 'danger');
                    } else {
                        this.props.setTags(res.success);
                    }
                })
                .catch(() => {
                    this.showAlert('Unable to fetch tags at this time', 'danger');
                });
        }
    };

    filterTagsByType = type => {
        let tagIds = Object.keys(this.props.tags);
        let tagByType = {};
        tagIds.forEach(id => {
            if (this.props.tags[id].type === type) {
                tagByType[id] = this.props.tags[id];
            }
        });
        return tagByType;
    };

    /**
     * Require function of component
     */
    render() {
        return null;
    }
}
