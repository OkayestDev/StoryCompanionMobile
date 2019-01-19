import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import GlobalAlert from '../../components/GlobalAlert.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import DraftUtils from './components/DraftUtils.js';
import * as draftActions from '../../actions/DraftActions.js';
import { showAlert } from '../../actions/Actions.js';
import STYLE from './components/DraftStyle.js';

class DraftsScreen extends DraftUtils {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Draft',
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
        props.navigation.setParams({ title: this.props.stories[this.props.selectedStoryId].name });
    }

    render() {
        if (this.props.draft === null) {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert />
                    <View style={STYLE.noDraftContainer} />
                </View>
            );
        } else if ('id' in this.props.draft) {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert />
                    <TextInput
                        placeholder="Start writing your draft"
                        style={STYLE.draftInput}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        multiline={true}
                        value={this.props.description}
                        onChangeText={this.props.handleDescriptionChanged}
                    />
                </View>
            );
        }
        // No draft created
        else {
            return (
                <View style={STYLE.container}>
                    <View style={STYLE.noDraftContainer}>
                        <GlobalAlert />
                        <Text style={STYLE.noDraftText}>
                            Looks like you haven't started a draft for this story yet
                        </Text>
                        <TouchableOpacity style={STYLE.noDraftButton} onPress={this.createDraft}>
                            <Text style={STYLE.noDraftButtonText}>Start A Draft</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.draftStore,
        email: state.email,
        apiKey: state.apiKey,
        userId: state.userId,
        stories: state.storyStore.stories,
        selectedStoryId: state.storyStore.selectedStoryId,
    };
}

const mapDispatchToProps = {
    ...draftActions,
    showAlert,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DraftsScreen);
