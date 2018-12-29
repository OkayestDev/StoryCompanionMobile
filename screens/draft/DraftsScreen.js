import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../store/Actions.js';
import GlobalAlert from '../../components/GlobalAlert.js';
import StoryCompanion from '../../utils/StoryCompanion.js';
import DraftUtils from './components/DraftUtils.js';
import STYLE from './components/DraftStyle.js';

class DraftsScreen extends DraftUtils {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Draft',
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
            description: '',
            selectedDraftId: '',
            draft: null,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
        props.navigation.setParams({ title: this.props.stories[this.props.selectedStoryId].name });
    }

    render() {
        if (this.state.draft === null) {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <View style={STYLE.noDraftContainer} />
                </View>
            );
        } else if ('id' in this.state.draft) {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <TextInput
                        placeholder="Start writing your draft"
                        style={STYLE.draftInput}
                        underlineColorAndroid="rgba(0,0,0,0)"
                        multiline={true}
                        value={this.state.description}
                        onChangeText={newDescription =>
                            this.setState({ description: newDescription })
                        }
                    />
                </View>
            );
        }
        // No draft created
        else {
            return (
                <View style={STYLE.container}>
                    <View style={STYLE.noDraftContainer}>
                        <GlobalAlert
                            visible={this.state.globalAlertVisible}
                            message={this.state.globalAlertMessage}
                            type={this.state.globalAlertType}
                            closeAlert={() => this.setState({ globalAlertVisible: false })}
                        />
                        <Text style={STYLE.noDraftText}>
                            Looks like you haven't started a draft for this story yet
                        </Text>
                        <TouchableOpacity
                            style={STYLE.noDraftButton}
                            onPress={() => this.createDraft()}
                        >
                            <Text style={STYLE.noDraftButtonText}>Start A Draft</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
    }
}

export default connect(
    Actions.mapStateToProps,
    Actions.mapDispatchToProps
)(DraftsScreen);
