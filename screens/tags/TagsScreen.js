import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../store/Actions.js';
import EditEntity from '../../components/EditEntity.js';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import GlobalAlert from '../../components/GlobalAlert.js';
import TagsUtils from './components/TagsUtils.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import STYLE from './components/TagsStyle.js';

const tagTypes = ['Story', 'Character'];

class TagsScreen extends TagsUtils {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Stories',
            headerTitle: (
                <View style={StoryCompanion.headerTitle}>
                    {StoryCompanion.renderNavigationTitle('Tags')}
                    {StoryCompanion.renderNavigationOptions({ navigation })}
                </View>
            ),
            headerStyle: { backgroundColor: '#2f95dc' },
            headerTitleStyle: { color: 'white' },
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            type: '',
            selectedTagId: null,

            isConfirmationModalOpen: false,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
    }

    cancelTagEdit = () => {
        this.removeNavigationActions();
        this.setState({
            selectedTagId: null,
            name: '',
            description: '',
            type: '',
        });
    };

    newTag = () => {
        this.setNavigationActions(this.cancelTagEdit, this.createTag, null);
        this.setState({ selectedTagId: 'new' });
    };

    selectTag = id => {
        this.setNavigationActions(this.cancelTagEdit, this.editTag, this.openConfirmation);
        this.setState({
            selectedTagId: id,
            name: this.props.tags[id].name,
            description: this.props.tags[id].description,
            type: this.props.tags[id].type,
        });
    };

    renderTags = () => {
        if (this.props.tags === null) {
            return null;
        }

        let tagIds = Object.keys(this.props.tags);
        let tagView = [];
        if (tagIds.length > 0) {
            tagIds.forEach(id => {
                tagView.push(
                    <TouchableOpacity
                        key={id}
                        onPress={() => this.selectTag(id)}
                        style={STYLE.tagContainer}
                    >
                        <View>
                            <Text style={STYLE.tagName}>{this.props.tags[id].name}</Text>
                            <Text style={STYLE.tagType}>Type: {this.props.tags[id].type}</Text>
                            <Text style={STYLE.tagDescription} numberOfLines={2}>
                                {this.props.tags[id].description}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            });
            return tagView;
        } else {
            return (
                <View style={STYLE.noTagsContainer}>
                    <Text style={STYLE.noTagsText}>
                        Looks like you haven't created any tags yet.
                    </Text>
                    <Text style={STYLE.noTagsText}>Press on the + to create a tag!</Text>
                </View>
            );
        }
    };

    render() {
        if (this.state.selectedTagId === null) {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <ScrollView style={STYLE.container}>{this.renderTags()}</ScrollView>
                    <FloatingAddButton onPress={this.newTag} />
                </View>
            );
        } else {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <EditEntity
                        selectedEntityId={this.state.selectedTagId}
                        isModalOpen={this.state.isConfirmationModalOpen}
                        entityType="Tag"
                        inputOne={this.state.name}
                        inputOneName="Tag Name"
                        inputOneOnChange={newValue => this.setState({ name: newValue })}
                        modalPicker="Tag Type"
                        modalPickerSelectedValue={this.state.type}
                        modalPickerList={tagTypes}
                        modalPickerOnChange={newType => this.setState({ type: newType })}
                        inputThree={this.state.description}
                        inputThreeName="Tag Description"
                        inputThreeOnChange={newValue => this.setState({ description: newValue })}
                    />
                    <ConfirmationModal
                        isConfirmationModalOpen={this.state.isConfirmationModalOpen}
                        closeConfirmationModal={() =>
                            this.setState({ isConfirmationModalOpen: false })
                        }
                        confirmationTitle={'Delete Tag?'}
                        entityDescription=""
                        onConfirm={() => {
                            this.deleteTag();
                            this.onConfirmationConfirm();
                        }}
                        note=""
                    />
                </View>
            );
        }
    }
}

export default connect(
    Actions.mapStateToProps,
    Actions.mapDispatchToProps
)(TagsScreen);
