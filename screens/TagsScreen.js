import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    AsyncStorage,
    ScrollView
} from 'react-native';
import EditEntity from '../components/EditEntity.js';
import FloatingAddButton from '../components/FloatingAddButton.js';
import GlobalAlert from '../components/GlobalAlert.js';
import TagRequests from '../utils/TagRequests.js';

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

const tagTypes = [
    'Story',
    'Character',
]

export default class TagsScreen extends Component {
    static navigationOptions = {
        title: 'Stories',
        headerTitle: (
            <View style={headerTitle}>
                <Text style={{fontWeight: 'bold', color: 'white', fontSize: 28}}>
                    Tags
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
            type: '',
            tags: null,
            selectedTagId: null,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        }
        this.selectedStoryId = null;
        this.TagRequests = new TagRequests();
    }

    componentDidMount() {
        this.getTags();
    }

    getTags = (story = null) => {
        if (story !== null) {
            this.TagRequests.getTags(story).then((res) => {
                if ('error' in res) {
                    this.setState({
                        selectedTagId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    })
                }
                else {
                    this.setState({tags: res.success});
                }
            })
            .catch(() => {
                this.setState({
                    selectedTagId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: "Unable to get Tags at this time.",
                })
            })
        }
        else {
            AsyncStorage.multiGet(['selectedStoryId', 'selectedStoryName']).then((res) => {
                if (!res) {
                    this.props.navigation.navigate("LoginTab");
                }
                this.selectedStoryId = parseInt(res[0][1]);
                this.props.navigation.setParams({title: res[1][1]});
                this.getTags(this.selectedStoryId);
            });
        }
    }

    createTag = () => {

    }

    deleteTag = () => {

    }

    editTag = () => {

    }

    cancelTagEdit = () => {
        this.setState({
            selectedTagId: null,
            name: '',
            description: '',
            type: '',
        });
    }

    selectTag = (id) => {
        this.setState({
            selectedTagId: id,
            name: this.state.tags[id].name,
            description: this.state.tags[id].description,
            type: this.state.tags[id].type
        });
    }

    renderTags = () => {
        if (this.state.tags === null) {
            return null;
        }

        let tagIds = Object.keys(this.state.tags);
        let tagView = [];
        if (tagIds.length > 0) {

        }
        else {
            return (
                <View style={styles.noTagsContainer}>
                    <Text style={styles.noTagsText}>
                        Looks like you haven't created any Tags yet.
                    </Text>
                    <Text style={styles.noTagsText}>
                        Press on the + to create a tag!
                    </Text>
                </View>
            )
        }
    }

    render() {
        if (this.state.selectedTagId === null) {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    <ScrollView style={styles.container}>
                        {this.renderTags()}
                    </ScrollView>
                    <FloatingAddButton onPress={() => this.setState({selectedTagId: 'new'})}/>
                </View>
            )
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
                        selectedEntityId={this.state.selectedTagId}
                        entityType="Tag"

                        inputOne={this.state.name}
                        inputOneName="Tag Name"
                        inputOneOnChange={(newValue) => this.setState({name: newValue})}

                        modalPicker="Tag Type"
                        modalPickerSelectedValue={this.state.type}
                        modalPickerList={tagTypes}
                        modalPickerOnChange={(newType) => this.setState({type: newType})}

                        inputThree={this.state.description}
                        inputThreeName="Tag Description"
                        inputThreeOnChange={(newValue) => this.setState({description: newValue})}

                        createEntity={() => this.createTag()}
                        editEntity={() => this.editTag()}
                        deleteEntity={() => this.deleteTag()}
                        cancelEntityEdit={() => this.cancelTagEdit()}
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
    noTagsContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noTagsText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 36,
        color: '#CCCCCC',
        fontWeight: 'bold',
    },
})