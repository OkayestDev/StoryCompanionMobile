import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import EditEntity from '../../components/EditEntity.js';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import TagsUtils from './components/TagsUtils.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import * as tagActions from '../../actions/TagActions.js';
import { showAlert } from '../../actions/Actions.js';
import STYLE from './components/TagsStyle.js';

const tagTypes = ['Story', 'Character'];

class TagsScreen extends TagsUtils {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Stories',
            headerTitle: (
                <View style={StoryCompanion.headerTitle}>
                    {StoryCompanion.renderNavigationTitle({ navigation }, 'Tags')}
                    {StoryCompanion.renderNavigationOptions({ navigation })}
                </View>
            ),
            headerStyle: { backgroundColor: '#2f95dc' },
            headerTitleStyle: { color: 'white' },
        };
    };

    constructor(props) {
        super(props);
    }

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
        if (this.props.selectedTagId === null) {
            return (
                <View style={STYLE.container}>
                    <ScrollView style={STYLE.container}>{this.renderTags()}</ScrollView>
                    <FloatingAddButton onPress={this.newTag} />
                </View>
            );
        } else {
            return (
                <View style={STYLE.container}>
                    <EditEntity
                        selectedEntityId={this.props.selectedTagId}
                        isModalOpen={this.props.isConfirmationModalOpen}
                        entityType="Tag"
                        inputOne={this.props.name}
                        inputOneName="Tag Name"
                        inputOneOnChange={this.props.handleNameChanged}
                        modalPicker="Tag Type"
                        modalPickerSelectedValue={this.props.type}
                        modalPickerList={tagTypes}
                        modalPickerOnChange={this.props.handleTypeChanged}
                        inputThree={this.props.description}
                        inputThreeName="Tag Description"
                        inputThreeOnChange={this.props.handleDescriptionChanged}
                    />
                    <ConfirmationModal
                        isConfirmationModalOpen={this.props.isConfirmationModalOpen}
                        closeConfirmationModal={this.props.closeConfirmation}
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

function mapStateToProps(state) {
    return {
        ...state.tagStore,
        apiKey: state.appStore.apiKey,
        email: state.appStore.email,
        userId: state.appStore.userId,
    };
}

const mapDispatchToProps = {
    ...tagActions,
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagsScreen);
