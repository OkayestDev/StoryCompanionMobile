import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'react-native-elements';
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
            content: 'content' in this.state ? this.state.content : '',
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

    openConfirmation = () => {
        this.setState({ isConfirmationModalOpen: true });
    };

    onConfirmationConfirm = () => {
        this.setState({ isConfirmationModalOpen: false });
        this.removeNavigationActions();
    };

    /**
     * Sets props of navigation so the cancel, delete, and save button show up in nav bar
     */
    setNavigationActions = (onCancel = null, onSave = null, onDelete = null) => {
        this.props.navigation.setParams({
            actionsAvailable: true,
            onCancel,
            onSave,
            onDelete,
        });
    };

    removeNavigationActions = () => {
        this.props.navigation.setParams({
            actionsAvailable: false,
            onCancel: null,
            onSave: null,
            onDelete: null,
        });
    };

    static renderNavigationTitle = ({ navigation }, title, goBack = null) => {
        const onCancel = navigation.getParam('onCancel');
        const onSave = navigation.getParam('onSave');
        const onDelete = navigation.getParam('onDelete');
        const onExport = navigation.getParam('onExport');

        const actionCount = StoryCompanion.actionCount({
            onCancel,
            onSave,
            onDelete,
            onExport,
        });
        const width = 100 - 15 * actionCount + '%';

        return (
            <View
                style={{
                    width: width,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                {goBack !== null && (
                    <TouchableOpacity style={{ marginRight: 15 }} onPress={goBack}>
                        <Icon color="white" name="chevron-left" type="font-awesome" size={24} />
                    </TouchableOpacity>
                )}
                <Text
                    numberOfLines={1}
                    style={{ fontWeight: 'bold', color: 'white', fontSize: 28 }}
                >
                    {title}
                </Text>
            </View>
        );
    };

    static renderFullWidthNavigationTitle = title => {
        return (
            <View style={{ width: '100%' }}>
                <Text
                    numberOfLines={1}
                    style={{ fontWeight: 'bold', color: 'white', fontSize: 28 }}
                >
                    {title}
                </Text>
            </View>
        );
    };

    static renderNavigationOptions = ({ navigation }) => {
        const onCancel = navigation.getParam('onCancel');
        const onSave = navigation.getParam('onSave');
        const onDelete = navigation.getParam('onDelete');
        const onExport = navigation.getParam('onExport');

        const actionCount = StoryCompanion.actionCount({
            onCancel,
            onSave,
            onDelete,
            onExport,
        });
        const width = 15 * actionCount + '%';

        return (
            <View style={{ width: width }}>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    {onExport && (
                        <TouchableOpacity
                            onPress={onExport}
                            style={{
                                marginRight: 12,
                                marginLeft: 12,
                            }}
                        >
                            <Icon color="white" name="envelope" type="font-awesome" size={28} />
                        </TouchableOpacity>
                    )}
                    {onDelete && (
                        <TouchableOpacity
                            onPress={onDelete}
                            style={{
                                marginRight: 12,
                                marginLeft: 12,
                            }}
                        >
                            <Icon color="white" name="trash" type="font-awesome" size={28} />
                        </TouchableOpacity>
                    )}
                    {onSave && (
                        <TouchableOpacity
                            onPress={onSave}
                            style={{
                                marginRight: 12,
                                marginLeft: 12,
                            }}
                        >
                            <Icon color="white" name="check" type="font-awesome" size={28} />
                        </TouchableOpacity>
                    )}
                    {onCancel && (
                        <TouchableOpacity
                            onPress={onCancel}
                            style={{
                                marginRight: 12,
                                marginLeft: 12,
                            }}
                        >
                            <Icon color="white" name="close" type="font-awesome" size={28} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    static actionCount = actions => {
        let actionCount = 0;
        for (let key in actions) {
            if (actions[key]) {
                actionCount++;
            }
        }
        return actionCount;
    };

    /**;
     * Used for navigation header bar styling
     */
    static headerTitle = {
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#2f95dc',
        paddingLeft: 20,
    };
}
