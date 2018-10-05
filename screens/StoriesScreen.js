import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
} from 'react-native';
import GlobalAlert from '../components/GlobalAlert.js';
import EditEntity from '../components/EditEntity.js';
import FloatingAddButton from '../components/FloatingAddButton.js';
import StoryRequests from '../utils/StoryRequests.js';

const headerTitle = {
    flex: 1,
    position: 'absolute',
    top: 0,
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2f95dc',
    paddingLeft: 20,
}

export default class StoriesScreen extends React.Component {
    static navigationOptions = {
        title: 'Stories',
        headerTitle: (
            <View style={headerTitle}>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 28}}>
                    Stories
                </Text>
            </View>
        ),
        headerStyle: { backgroundColor: '#2f95dc' },
        headerTitleStyle: { color: 'white' },
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            stories: null,
            selectedStoryId: null,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        }
        this.userId = null;
        this.StoryRequests = new StoryRequests();
    }

    componentDidMount() {
        this.getStories();
    }

    getStories = (user = null) => {
        if (user !== null) {
            this.StoryRequests.getStories(user).then((res) => {
                if ('error' in res) {
                    this.setState({
                        globalAlertVisible: true,
                        globalAlertType: 'warning',
                        globalAlertMessage: res.error,
                    })
                }
                else {
                    this.setState({stories: res.success});
                }
            });
        }
        else {
            AsyncStorage.getItem('id').then((res) => {
                if (res !== null) {
                    this.userId = res;
                    this.getStories(res);
                }
            });
        }
    }

    cancelStoryEdit = () => {
        this.setState({
            name: '',
            description: '',
            selectedStoryId: null,
        })
    }

    selectStory = (id) => {
        this.setState({
            selectedStoryId: id,
            name: this.state.stories[id].name,
            description: this.state.stories[id].description,
        });
    }

    createStory = () => {
        this.StoryRequests.createStory(this.state.name, this.state.description, this.userId).then(res => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                this.setState({
                    isCreateStoreModalOpen: false,
                    name: '',
                    stories: res.success,
                    description: '',
                    selectedStoryId: null,
                });
            }
        })
        .catch((error) => {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: "Unable to create story at this time",
            });
        });
    }

    editStory = () => {
        this.StoryRequests.editStory(this.state.selectedStoryId, this.state.name, this.state.description).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                let tempStories = this.state.stories;
                tempStories[this.state.selectedStoryId] = res.success;
                this.setState({
                    name: '',
                    description: '',
                    stories: tempStories,
                    selectedStoryId: null,
                });
            }
        })
    }

    // @TODO some form of confirmation!!
    deleteStory = () => {
        this.StoryRequests.deleteStory(this.state.selectedStoryId).then((res) => {
            if ('error' in res) {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                let tempStories = this.state.stories;
                delete tempStories[this.state.selectedStoryId];
                this.setState({
                    stories: tempStories,
                    name: '',
                    description: '',
                    selectedStoryId: null,
                })
            }
        })
    }

    selectStoryToEdit = (storyId) => {
        AsyncStorage.setItem('selectedStoryId', String(storyId)).then((res) => {
            this.props.navigation.navigate("StoryTab");
        });
    }

    renderStories = () => {
        // @TODO add loading screen
        if (this.state.stories === null) {
            return null;
        }
        let stories = [];
        let ids = Object.keys(this.state.stories);
        if (ids.length > 0) {
            ids.forEach((id) => {
                stories.push(
                    <TouchableOpacity
                        key={id}
                        style={styles.selectStoryButton}
                        onPress={() => this.selectStory(id)}
                    >
                        <Text style={styles.selectStoryButtonText}>
                            {this.state.stories[id].name}
                        </Text>
                    </TouchableOpacity>
                );
            });
            return stories;
        }
        else {
            return (
                <View style={styles.noStoriesContainer}>
                    <Text style={styles.noStoriesText}>
                        Looks like you haven't created any stories yet.
                    </Text>
                    <Text style={styles.noStoriesText}>
                        Press on the + to create a story!
                    </Text>
                </View>
            )
        }
    }

    render() {
        if (this.state.selectedStoryId === null) {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <ScrollView style={styles.container}>
                        {this.renderStories()}
                    </ScrollView>
                    <FloatingAddButton onPress={() => this.setState({selectedStoryId: "new"})}/>
                </View>
            );
        }
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
                        selectedEntityId={this.state.selectedStoryId}
                        entityType="Story"

                        inputOne={this.state.name}
                        inputOneName="Story Name"
                        inputOneOnChange={(newValue) => this.setState({name: newValue})}

                        inputThree={this.state.description}
                        inputThreeName="Summary"
                        inputThreeOnChange={(newValue) => this.setState({description: newValue})}

                        createEntity={() => this.createStory()}
                        editEntity={() => this.editStory()}
                        deleteEntity={() => this.deleteStory()}
                        cancelEntityEdit={() => this.cancelStoryEdit()}

                        selectEntity={() => this.selectStoryToEdit(this.state.selectedStoryId)}
                        selectEntityButtonText="Edit Chapters, Characters, etc"
                    />
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    storyLabelAndInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    storyInputLabel: {
        color: '#CCCCCC',
        fontSize: 24,
        fontWeight: 'bold',
        width: .2 * .8 * Dimensions.get('window').width,
    },
    storyInput: {
        height: 60,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        paddingLeft: 15,
        width: .6 * .8 * Dimensions.get('window').width,
        marginLeft: 10,
    },
    createStoryModal: {
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 4,
        width: .8 * Dimensions.get('window').width,
        height: 200,
        marginTop: .1 * Dimensions.get('window').height,
        marginLeft: .1 * Dimensions.get('window').width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createStoryButton: {
        backgroundColor: '#2f95dc',
        width: .8 * .8 * Dimensions.get('window').width,
        height: .15 * 300,
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        display: 'flex',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    selectStoryButton: {
        width: .9 * Dimensions.get('window').width,
        marginLeft: .05 * Dimensions.get('window').width,
        backgroundColor: '#CCCCCC',
        height: 50,
        marginTop: 10,
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectStoryButtonText: {
        fontSize: 20,
        color: 'white',
    },
    noStoriesContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noStoriesText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 36,
        color: '#CCCCCC',
        fontWeight: 'bold',
    }
});
