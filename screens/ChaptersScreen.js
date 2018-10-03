import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    AsyncStorage, 
    ScrollView,
    Dimensions 
} from 'react-native';
import GlobalAlert from '../components/GlobalAlert.js';
import FloatingAddButton from '../components/FloatingAddButton.js'
import ChapterRequests from '../utils/ChapterRequests.js';
import EditEntity from '../components/EditEntity.js';
import { Icon } from 'react-native-elements';

export default class ChaptersScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Chapters',
            headerTitle: <Text numberOfLines={1} style={{fontWeight: 'bold', color: 'white', fontSize: 20}}>Chapters</Text>,
            headerStyle: { backgroundColor: '#2f95dc', },
            headerTitleStyle: { color: 'white', marginHorizontal: 0, },
            headerLeft: (
                <TouchableOpacity 
                    style={{paddingLeft: 8}}
                    onPress={() => navigation.navigate("StoriesTab")}
                >
                    <Icon
                        color="white"
                        name="arrow-left"
                        type="font-awesome"
                        size={20}
                    />
                </TouchableOpacity>
            ),
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            number: '',
            description: '',
            chapters: {},
            selectedChapterId: null,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        }
        this.selectedStoryId = null;
        this.ChapterRequests = new ChapterRequests();
    }

    componentDidMount() {
        this.getChapters();
    }

    sortChaptersByChapterNumber = (chapters) => {
        let sortedChapters = {};
        let chapterIds = Object.keys(chapters);
        for (let i = 0; i < chapterIds.length; i++) {
            let minChapterNumber = chapters[chaptersIds[i]].number;
            let indexOfMinChapterNumber = i;
            for (let j = 0; j < chapterIds.length; j++) {
                if ()
            }
        }
    }

    getChapters = (story = null) => {
        if (story !== null) {
            this.ChapterRequests.getChapters(story).then((res) => {
                if ('error' in res) {

                }
                else {
                    this.setState({chapters: res.success})
                }
            })
        }
        else {
            AsyncStorage.getItem('selectedStoryId').then((res) => {
                this.selectedStoryId = res;
                this.getChapters(res);
            })
        }
    }
    
    cancelChapterEdit = () => {
        this.setState({
            name: '',
            number: '',
            description: '',
            selectedChapterId: null,
        });
    }

    selectChapter = (id) => {
        this.setState({
            selectedChapterId: id,
            name: this.state.chapters[id].name,
            number: String(this.state.chapters[id].number),
            description: this.state.chapters[id].description,
        })
    }

    // @TODO check all inputs are filled out
    createChapter = () => {
        this.ChapterRequests.createChapter(this.state.name, this.state.number, this.state.description, this.selectedStoryId).then((res) => {
            if ('error' in res) {
                this.setState({
                    selectedChapterId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: res.error,
                });
            }
            else {
                this.setState({
                    chapters: res.success,
                    description: '',
                    name: '',
                    number: '',
                    selectedChapterId: null,
                })
            }
        })
        .catch((error) => {
            this.setState({
                selectedChapterId: null,
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: 'Unable to add chapter at this time',
            })
        });
    }

    editChapter = () => {
        this.ChapterRequests.editChapter(this.state.selectedChapterId, this.state.name, this.state.number, this.state.description).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                let tempChapters = this.state.chapters;
                tempChapters[this.state.selectedChapterId] = res.success;
                this.setState({
                    chapters: tempChapters,
                    name: '',
                    nubmer: '',
                    description: '',
                    selectedChapterId: null,
                })
            }
        });
    }

    deleteChapter = () => {
        this.ChapterRequests.deleteChapter(this.state.selectedChapterId).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                let tempChapters = this.state.chapters;
                delete tempChapters[this.state.selectedChapterId];
                this.setState({
                    chapters: tempChapters,
                    name: '',
                    number: '',
                    description: '',
                    selectedChapterId: null,
                })
            }
        });
    }

    renderChapters = () => {
        let ids = Object.keys(this.state.chapters);
        let chapterView = [];
        if (ids.length > 0) {
            ids.forEach((id) => {
                chapterView.push(
                    <TouchableOpacity
                        key={id}
                        style={styles.chapterViewChapterContainer}
                        onPress={() => this.selectChapter(id)}
                    >
                        <View>
                            <Text style={styles.chapterNumber}>
                                {this.state.chapters[id].number}.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.chapterName}>
                                {this.state.chapters[id].name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            });
            return chapterView;
        }
        else {
            return (
                <View style={styles.noChaptersContainer}>
                    <Text style={styles.noChaptersText}>
                        Looks like you haven't created any chapters yet.
                    </Text>
                    <Text style={styles.noChaptersText}>
                        Press on the + to create a chapter!
                    </Text>
                </View>
            )
        }
    } 

    render() {
        if (this.state.selectedChapterId === null) {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <ScrollView style={styles.container}>
                        {this.renderChapters()}
                    </ScrollView>
                    <FloatingAddButton onPress={() => this.setState({selectedChapterId: 'new'})}/>
                </View>
            )
        }
        // will pass new as the selectedChapterId if we are creating a new chapter
        else {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <EditEntity
                        selectedEntityId={this.state.selectedChapterId}
                        entityType="Chapter"

                        inputOne={this.state.name}
                        inputOneName="Chapter Name"
                        inputOneOnChange={(newValue) => this.setState({name: newValue})}

                        inputTwo={this.state.number}
                        inputTwoName="Chapter Number"
                        inputTwoOnChange={(newValue) => this.setState({number: newValue})}

                        inputThree={this.state.description}
                        inputThreeName="Description"
                        inputThreeOnChange={(newValue) => this.setState({description: newValue})}

                        createEntity={() => this.createChapter()}
                        editEntity={() => this.editChapter()}
                        deleteEntity={() => this.deleteChapter()}
                        cancelEntityEdit={() => this.cancelChapterEdit()}
                    />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    chapterViewChapterContainer: {
        width: '100%',
        padding: 10,
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    chapterNumber: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#CCCCCC',
        marginRight: 10,
    },
    chapterName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#CCCCCC',
    },
    chapterEditIcon: {
        flex: 2,
        display: 'flex',
        paddingRight: 20,
        justifyContent: 'flex-end',
    },
    noChaptersContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noChaptersText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 36,
        color: '#CCCCCC',
        fontWeight: 'bold',
    }
});