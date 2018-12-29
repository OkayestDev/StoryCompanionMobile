import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../store/Actions.js';
import GlobalAlert from '../../components/GlobalAlert.js';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import EditEntity from '../../components/EditEntity.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import ChapterUtils from './components/ChaptersUtils.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import STYLE from './components/ChaptersStyle.js';

class ChaptersScreen extends ChapterUtils {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Chapters',
            headerTitle: (
                <View style={StoryCompanion.headerTitle}>
                    {StoryCompanion.renderNavigationTitle(navigation.getParam('title'), () =>
                        navigation.navigate('StoriesTab')
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
            chapters: null,
            selectedChapterId: null,

            isConfirmationModalOpen: false,
            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
        props.navigation.setParams({ title: this.props.stories[this.props.selectedStoryId].name });
    }

    cancelChapterEdit = () => {
        this.removeNavigationActions();
        this.setState({
            name: '',
            number: '',
            description: '',
            selectedChapterId: null,
        });
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
                        <View>
                            <Text style={STYLE.chapterNumber}>
                                {this.state.chapters[id].number}.
                            </Text>
                        </View>
                        <View>
                            <Text style={STYLE.chapterName}>{this.state.chapters[id].name}</Text>
                        </View>
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
