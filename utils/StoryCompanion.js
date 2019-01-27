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
        if (this.state === null || typeof this.state === 'undefined') {
            this.state = {};
        }

        const paramsObject = {
            plot: 'selectedPlotId' in this.props ? this.props.selectedPlotId : '',
            plotParent: 'plotParent' in this.props ? this.props.plotParent : '',
            draft: 'selectedDraftId' in this.props ? this.props.selectedDraftId : '',
            note: 'selectedNoteId' in this.props ? this.props.selectedNoteId : '',
            character: 'selectedCharacterId' in this.props ? this.props.selectedCharacterId : '',
            chapter: 'selectedChapterId' in this.props ? this.props.selectedChapterId : '',
            number: 'number' in this.props ? this.props.number : '',
            content: 'content' in this.props ? this.props.content : '',
            user: 'userId' in this.props ? this.props.userId : '',
            story: 'selectedStoryId' in this.props ? this.props.selectedStoryId : '',
            genre: 'genre' in this.props ? this.props.genre : '',
            tag: 'selectedTagId' in this.props ? this.props.selectedTagId : '',
            type: 'type' in this.props ? this.props.type : '',
            description: 'description' in this.props ? this.props.description : '',
            attribute: 'attribute' in this.props ? this.props.attribute : '',
            name: 'name' in this.props ? this.props.name : '',
            age: 'age' in this.props ? this.props.age : '',
            storyRole: 'storyRole' in this.props ? this.props.storyRole : '',
            goal: 'goal' in this.props ? this.props.goal : '',
            email:
                'email' in this.props
                    ? this.props.email
                    : 'email' in this.state
                    ? this.state.email
                    : '',
            confirmEmail: 'confirmEmail' in this.state ? this.state.confirmEmail : '',
            password:
                'password' in this.props
                    ? this.props.password
                    : 'password' in this.state
                    ? this.state.password
                    : '',
            confirmPassword:
                'confirmPassword' in this.props
                    ? this.props.confirmPassword
                    : 'confirmPassword' in this.state
                    ? this.state.confirmPassword
                    : '',
            apiKey: 'apiKey' in this.props ? this.props.apiKey : '',
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

    getTags = () => {
        // Instance of array means tags is empty
        if (this.props.tags === null || this.props.tags instanceof Array) {
            let paramsObject = this.createParamsObject();
            this.TagRequests.getTags(paramsObject)
                .then(res => {
                    if ('error' in res) {
                        this.props.showAlert('Unable to fetch tags at this time', 'danger');
                    } else {
                        this.props.setTags(res.success);
                    }
                })
                .catch(() => {
                    this.props.showAlert('Unable to fetch tags at this time', 'danger');
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

    onConfirmationConfirm = () => {
        this.props.closeConfirmation();
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
                    paddingRight: 40,
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
