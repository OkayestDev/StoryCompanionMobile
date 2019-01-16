import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import GlobalAlert from '../../components/GlobalAlert.js';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import EditEntity from '../../components/EditEntity.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import ChapterUtils from './components/ChaptersUtils.js';
import { Icon } from 'react-native-elements';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import ChapterContent from './components/ChapterContent.js';
import * as ChapterActions from '../../actions/ChapterActions.js';
import { showAlert } from '../../actions/Actions.js';

import STYLE from './components/ChaptersStyle.js';

class ChaptersScreen extends ChapterUtils {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chapters',
            headerTitle: (
                <View style={StoryCompanion.headerTitle}>
                    {StoryCompanion.renderNavigationTitle(
                        { navigation },
                        navigation.getParam('title'),
                        () => navigation.navigate('StoriesTab')
                    )}
                    {StoryCompanion.renderNavigationOptions({ navigation })}
                </View>
            ),
            headerStyle: { backgroundColor: '#2f95dc' },
            headerTitleStyle: { color: 'white' },
        };
    };

    constructor(props) {
        super(props);
        props.navigation.setParams({
            title: this.props.stories[this.props.selectedStoryId].name,
            onExport: this.exportChapters,
        });
    }

    renderChapters = () => {
        if (this.props.chapters === null) {
            return null;
        }
        let sortedChapterIds = this.sortEntitiesByNumber(this.props.chapters);
        let chapterView = [];
        if (sortedChapterIds.length > 0) {
            sortedChapterIds.forEach(id => {
                chapterView.push(
                    <TouchableOpacity
                        key={id}
                        style={STYLE.chapterViewChapterContainer}
                        onPress={() => this.selectChapter(id)}
                    >
                        <View style={STYLE.chapterNameContainer}>
                            <Text style={STYLE.chapterNumber}>
                                {this.props.chapters[id].number + '.'}
                            </Text>
                            <Text style={STYLE.chapterName} numberOfLines={1}>
                                {this.props.chapters[id].name}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={STYLE.chapterWriteIconButton}
                            onPress={() => this.selectChapterToWriteContent(id)}
                        >
                            <Icon color="#2f95dc" type="font-awesome" name="pencil" size={28} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                );
            });
            return chapterView;
        } else {
            return (
                <View style={STYLE.noChaptersContainer}>
                    <Text style={STYLE.noChaptersText}>
                        Looks like you haven't created any chapters yet.
                    </Text>
                    <Text style={STYLE.noChaptersText}>Press on the + to create a chapter!</Text>
                </View>
            );
        }
    };

    render() {
        if (this.props.selectedChapterId === null) {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert />
                    <ScrollView style={STYLE.container}>{this.renderChapters()}</ScrollView>
                    <FloatingAddButton onPress={this.newChapter} />
                </View>
            );
        } else if (this.props.isWritingChapter) {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert />
                    <ChapterContent
                        chapterName={this.props.name}
                        chapterNumber={this.props.number}
                        chapterContent={this.props.content}
                        handleContentChanged={this.props.handleContentChanged}
                    />
                </View>
            );
        } else {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert />
                    <EditEntity
                        selectedEntityId={this.props.selectedChapterId}
                        isModalOpen={this.props.isConfirmationModalOpen}
                        entityType="Chapter"
                        inputOne={this.props.name}
                        inputOneName="Chapter Name"
                        inputOneOnChange={this.props.handleNameChanged}
                        inputTwo={this.props.number}
                        inputTwoName="Chapter Number"
                        inputTwoOnChange={this.props.handleNumberChanged}
                        inputThree={this.props.description}
                        inputThreeName="Description"
                        inputThreeOnChange={this.props.handleDescriptionChanged}
                    />
                    <ConfirmationModal
                        isConfirmationModalOpen={this.props.isConfirmationModalOpen}
                        closeConfirmationModal={this.props.closeConfirmationModal}
                        confirmationTitle={'Delete Chapter?'}
                        entityDescription=""
                        onConfirm={() => {
                            this.deleteChapter();
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
    console.info(state);
    return {
        ...state.chapterStore,
        email: state.email,
        apiKey: state.apiKey,
        userId: state.userId,
        stories: state.storyStore.stories,
    };
}

const mapDispatchToProps = {
    ...ChapterActions,
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ChaptersScreen);
