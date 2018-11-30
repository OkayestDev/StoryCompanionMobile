import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import Actions from '../store/Actions.js';
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

class TagsScreen extends Component {
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
            selectedTagId: null,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        }
        this.TagRequests = new TagRequests();
    }

    componentDidMount() {
        this.getTags();
    }

    getTags = () => {
        this.TagRequests.getTags(this.props.userId).then((res) => {
            if ('error' in res) {
                this.setState({
                    selectedTagId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: res.error,
                })
            }
            else {
                this.props.setTags(res.success);
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

    createTag = () => {
        let paramsObject = {
            user: this.props.userId,
            name: this.state.name,
            description: this.state.description,
            type: this.state.type,
        };
        this.TagRequests.createTag(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    selectedTagId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                this.setState({
                    description: '',
                    name: '',
                    type: '',
                    selectedTagId: null,
                });
                this.props.setTags(res.success);
            }
        })
        .catch(() => {
            this.setState({
                selectedTagId: null,
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: "Unable to create tag at this time",
            });
        });
    }

    deleteTag = () => {
        this.TagRequests.deleteTag(this.state.selectedTagId).then((res) => {
            if ('error' in res) {
                this.setState({
                    selectedTagId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: res.error,
                });
            }
            else {
                let tempTags = this.props.tags;
                delete tempTags[this.state.selectedTagId];
                this.setState({
                    selectedTagId: null,
                    name: '',
                    description: '',
                    type: '',
                });
                this.props.setTags(tempTags);
            }
        })
        .catch(() => {
            this.setState({
                selectedTagId: null,
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: "Unable to delete tag at this time",
            });
        })
    }

    editTag = () => {
        let paramsObject = {
            tag: this.state.selectedTagId,
            description: this.state.description,
            type: this.state.type,
            name: this.state.name,
        };
        this.TagRequests.editTag(paramsObject).then((res) => {
            if ('error' in res) {
                this.setState({
                    selectedTagId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                })
            }
            else {
                let tempTags = this.props.tags;
                tempTags[this.state.selectedTagId] = res.success;
                this.setState({
                    name: '',
                    description: '',
                    type: '',
                    selectedTagId: null,
                })
                this.props.setTags(tempTags);
            }
        })
        .catch(() => {
            this.setState({
                selectedTagId: null,
                globalAlertVisible: true,
                globalAlertType: 'danger',
                globalAlertMessage: "Unable to edit tag at this time",
            })
        })
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
            name: this.props.tags[id].name,
            description: this.props.tags[id].description,
            type: this.props.tags[id].type
        });
    }

    renderTags = () => {
        if (this.props.tags === null) {
            return null;
        }

        let tagIds = Object.keys(this.props.tags);
        let tagView = [];
        if (tagIds.length > 0) {
            return tagView;
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

export default connect(Actions.mapStateToProps, Actions.mapDispatchToProps)(TagsScreen);

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