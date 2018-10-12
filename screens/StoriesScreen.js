import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    AsyncStorage,
    Image,
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
            image: '',
            stories: null,
            selectedStoryId: null,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        }
        this.StoryRequests = new StoryRequests();
        // @PROD
        // this.userId = null;
        // @DEV
        this.userId = 1;
    }

    resetStory = () => {
        return {
            name: '',
            description: '',
            image: '',
            selectedStoryId: null,
        };
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
            })
            .catch((error) => {
                this.setState({
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: "Unable to get response from server",
                });
            });
        }
        else {
            AsyncStorage.getItem('id').then((res) => {
                // Unable to load story - log user out
                if (!res) {
                    this.props.navigation.navigate("LoginTab");
                }
                if (res !== null) {
                    this.userId = res;
                    this.getStories(res);
                }
            });
        }
    }

    cancelStoryEdit = () => {
        this.setState(this.resetStory());
    }

    selectStory = (id) => {
        this.setState({
            selectedStoryId: id,
            name: this.state.stories[id].name,
            description: this.state.stories[id].description,
            image: this.state.stories[id].image,
        });
    }

    createStory = async () => {
        let image = this.state.image;
        if (image instanceof Object) {
            image = await this.StoryRequests.uploadImageToS3('story', this.state.image, this.userId);
        }
        let paramsObject = {
            name: this.state.name, 
            description: this.state.description, 
            user: this.userId,
            image: image,
        }
        this.StoryRequests.createStory(paramsObject).then(res => {
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
                    image: '',
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

    editStory = async () => {
        let image = this.state.image;
        if (image instanceof Object) {
            image = await this.StoryRequests.uploadImageToS3('story', this.state.image, this.state.selectedStoryId);
        }
        let paramsObject = {
            story: this.state.selectedStoryId,
            description: this.state.description, 
            name: this.state.name,
            user: this.userId,
            image: image,
        }
        this.StoryRequests.editStory(paramsObject).then((res) => {
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
                    image: '',
                    stories: tempStories,
                    selectedStoryId: null,
                });
            }
        })
        .catch((error) => {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: "Unable to get response from server",
            });
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
                    image: '',
                })
            }
        })
        .catch((error) => {
            this.setState({
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: "Unable to get response from server",
            });
        })
    }

    selectStoryToEdit = (storyId) => {
        AsyncStorage.multiSet([['selectedStoryId', String(storyId)],['selectedStoryName', String(this.state.stories[storyId].name)]]).then((res) => {
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
                        onPress={() => this.selectStory(id)}
                        style={styles.storyContainer}
                    >
                        <View>
                            <View style={styles.storyPictureAndName}>
                                <View styles={styles.storyPictureContainer}>
                                {
                                    this.state.stories[id].image !== ''
                                    ?
                                    <Image
                                        source={{uri: this.state.stories[id].image}}
                                        style={styles.storyPicture}
                                    />
                                    :
                                    <View
                                        style={styles.noPicture}
                                    />
                                }
                                </View>
                                <View style={styles.storyNameAndDescription}>
                                    <Text numberOfLines={1} style={styles.storyName}>
                                        {this.state.stories[id].name}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.editStoryPropsButton}
                                        onPress={() => {this.selectStoryToEdit(id)}}
                                    >
                                        <Text style={styles.editStoryPropsButtonText}>
                                            Edit Components
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            
                        </View>
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

                        image={this.state.image}
                        imagePickerTitle="Add an image to this story"
                        imagePickerOnChange={(newImage) => this.setState({image: newImage})}

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
    storyContainer: {
        width: '100%',
        padding: 10,
        height: 125,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    },
    storyPictureAndName: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 7,
    },
    storyPictureContainer: {
        width: '29%',
        marginRight: '1%',
    },
    storyPicture: {
        width: 100,
        height: 100,
        borderRadius: 4,
    },
    noPicture: {
        width: 100,
        height: 100,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#CCCCCC',
    },
    storyNameAndDescription: {
        width: '67%',
        marginLeft: '3%',
    },
    storyName: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    storyDescription: {
        fontSize: 18,
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
    },
    editStoryPropsButton: {
        backgroundColor: '#2f95dc',
        height: 50,
        borderRadius: 4,
        width: '97%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editStoryPropsButtonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    }
});
