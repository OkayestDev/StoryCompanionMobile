import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../store/Actions.js';
import GlobalAlert from '../../components/GlobalAlert.js';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import EditEntity from '../../components/EditEntity.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import ChapterUtils from './components/ChaptersUtils.js';
import { Icon } from 'react-native-elements';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import ChapterContent from './components/ChapterContent.js';
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
        this.state = {
            name: '',
            number: '',
            description: '',
            content: '',
            chapters: null,
            selectedChapterId: null,
            isWritingChapter: false,

            isConfirmationModalOpen: false,
            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
        props.navigation.setParams({
            title: this.props.stories[this.props.selectedStoryId].name,
            onExport: this.exportChapters,
        });
    }

    handleContentChanged = newContent => {
        this.setState({ content: newContent });
    };

    cancelChapterEdit = () => {
        this.setState(this.resetChapter());
    };

    newChapter = () => {
        this.setNavigationActions(this.cancelChapterEdit, this.createChapter, null);
        this.setState({ selectedChapterId: 'new' });
    };

    selectChapter = id => {
        this.setNavigationActions(this.cancelChapterEdit, this.editChapter, this.openConfirmation);
        this.setState({
            selectedChapterId: id,
            name: this.state.chapters[id].name,
            number: String(this.state.chapters[id].number),
            description: this.state.chapters[id].description,
            content: this.state.chapters[id].content,
        });
    };

    selectChapterToWriteContent = id => {
        this.setNavigationActions(this.cancelChapterEdit, this.writeChapter);
        this.setState({
            selectedChapterId: id,
            name: this.state.chapters[id].name,
            number: String(this.state.chapters[id].number),
            description: this.state.chapters[id].description,
            content: this.state.chapters[id].content,
            isWritingChapter: true,
        });
    };

    renderChapters = () => {
        if (this.state.chapters === null) {
            return null;
        }
        let sortedChapterIds = this.sortEntitiesByNumber(this.state.chapters);
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
                                {this.state.chapters[id].number + '.'}
                            </Text>
                            <Text style={STYLE.chapterName} numberOfLines={1}>
                                {this.state.chapters[id].name}
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
        if (this.state.selectedChapterId === null) {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <ScrollView style={STYLE.container}>{this.renderChapters()}</ScrollView>
                    <FloatingAddButton onPress={this.newChapter} />
                </View>
            );
        } else if (this.state.isWritingChapter) {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <ChapterContent
                        chapterName={this.state.name}
                        chapterNumber={this.state.number}
                        chapterContent={this.state.content}
                        handleContentChanged={this.handleContentChanged}
                    />
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
                        selectedEntityId={this.state.selectedChapterId}
                        isModalOpen={this.state.isConfirmationModalOpen}
                        entityType="Chapter"
                        inputOne={this.state.name}
                        inputOneName="Chapter Name"
                        inputOneOnChange={newValue => this.setState({ name: newValue })}
                        inputTwo={this.state.number}
                        inputTwoName="Chapter Number"
                        inputTwoOnChange={newValue => this.setState({ number: newValue })}
                        inputThree={this.state.description}
                        inputThreeName="Description"
                        inputThreeOnChange={newValue => this.setState({ description: newValue })}
                    />
                    <ConfirmationModal
                        isConfirmationModalOpen={this.state.isConfirmationModalOpen}
                        closeConfirmationModal={() =>
                            this.setState({ isConfirmationModalOpen: false })
                        }
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

export default connect(
    Actions.mapStateToProps,
    Actions.mapDispatchToProps
)(ChaptersScreen);
