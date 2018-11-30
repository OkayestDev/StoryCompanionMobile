import React, { Component } from 'react';

export default class StoryCompanion extends Component {
    constructor(props) {
        super(props);
    }

    createParamsObject = () => {
        if (typeof this.state === 'undefined') {
            this.state = {};
        }

        return {
            plot: 'selectedPlotId' in this.state ? this.state.selectedPlotId : '',
            plotParent: 'plotParent' in this.state ? this.state.plotParent : '',
            draft: 'selectedDraftId' in this.state ? this.state.selectedDraftId : '',
            note: 'selectedNoteId' in this.state ? this.state.selectedNoteId : '',
            character: 'selectedCharacterId' in this.state ? this.state.selectedCharacterId : '',
            chapter: 'selectedChapterId' in this.state ? this.state.selectedChapterId : '',
            number: 'number' in this.state ? this.state.number : '',
            user: 'userId' in this.state ? this.state.userId : this.props.userId,
            story: 'selectedStoryId' in this.state ? this.state.selectedStoryId : this.props.selectedStoryId,
            tag: 'selectedTagId' in this.state ? this.state.selectedTagId : '',
            description: 'description' in this.state ? this.state.description : '',
            attribute: 'attribute' in this.state ? this.state.attribute : '',
            name: 'name' in this.state ? this.state : '',
            email: 'email' in this.state ? this.state.email : this.props.email,
            confirmEmail: 'confirmEmail' in this.state ? this.state.confirmEmail : '',
            password: 'password' in this.state ? this.state.password : '',
            confirmPassword: 'confirmPassword' in this.state ? this.state.confirmPassword : '',
            apiKey: this.props.apiKey,
        }
    }

    /**
     * Require function of component
     */
    render() { return null }
}