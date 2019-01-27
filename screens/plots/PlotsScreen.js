import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import EditEntity from '../../components/EditEntity.js';
import { Icon } from 'react-native-elements';
import StoryCompanion from '../../utils/StoryCompanion.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import PlotsUtils from './components/PlotsUtils.js';
import * as plotActions from '../../actions/PlotActions.js';
import { showAlert } from '../../actions/Actions.js';
import STYLE from './components/PlotsStyle.js';

class PlotsScreen extends PlotsUtils {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Plots',
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

    oneLineInputs = () => [
        {
            name: 'Plot Name',
            value: this.props.name,
            onChange: this.props.handleNameChanged,
            type: 'default',
        },
    ];

    multiLineInputs = () => [
        {
            name: 'Description',
            value: this.props.description,
            onChange: this.props.handleDescriptionChanged,
        },
    ];

    returnPlot = (styleName = 'parentPlots', id, addIcon = true) => {
        let plot = (
            <View key={id} style={STYLE.plotContainer}>
                <TouchableOpacity onPress={() => this.selectPlot(id)} style={STYLE[styleName]}>
                    <Text numberOfLines={1} style={STYLE.plotsText}>
                        {this.props.plots[id].name}
                    </Text>
                </TouchableOpacity>
                {addIcon && (
                    <View style={STYLE.plotIconContainer}>
                        <Icon
                            onPress={() => this.addChildPlot(id)}
                            name="plus"
                            type="font-awesome"
                            color="#2f95dc"
                            size={20}
                        />
                    </View>
                )}
            </View>
        );
        return plot;
    };

    renderPlots = () => {
        if (this.props.plots === null) {
            return null;
        }
        let plots = [];
        let plotIds = Object.keys(this.props.plots);
        if (plotIds.length > 0) {
            plotIds.forEach(id => {
                if (this.props.plots[id].plot !== '') {
                    return;
                } else {
                    plots.push(this.returnPlot('parentPlots', id));
                    let parentOneId = id;
                    // Render childrenOne
                    plotIds.forEach(id => {
                        if (this.props.plots[id].plot == parentOneId) {
                            plots.push(this.returnPlot('childOnePlots', id));
                            // Render childrenTwo
                            let parentTwoId = id;
                            plotIds.forEach(id => {
                                if (this.props.plots[id].plot == parentTwoId) {
                                    plots.push(this.returnPlot('childTwoPlots', id, false));
                                }
                            });
                        } else {
                            return;
                        }
                    });
                }
            });
            return plots;
        } else {
            return (
                <View style={STYLE.noPlotsContainer}>
                    <Text style={STYLE.noPlotsText}>
                        Looks like you haven't created any plots yet.
                    </Text>
                    <Text style={STYLE.noPlotsText}>Press on the + to create a plot!</Text>
                </View>
            );
        }
    };

    render() {
        if (this.props.selectedPlotId === null) {
            return (
                <View style={STYLE.container}>
                    <ScrollView>{this.renderPlots()}</ScrollView>
                    <FloatingAddButton onPress={this.newPlot} />
                </View>
            );
        } else {
            return (
                <View style={STYLE.container}>
                    <EditEntity
                        selectedEntityId={this.props.selectedPlotId}
                        isModalOpen={this.props.isConfirmationModalOpen}
                        entityType="Plot"
                        deleteNote="Note: all children will be deleted"
                        oneLineInputs={this.oneLineInputs()}
                        multiLineInputs={this.multiLineInputs()}
                    />
                    <ConfirmationModal
                        isConfirmationModalOpen={this.props.isConfirmationModalOpen}
                        closeConfirmationModal={this.props.closeConfirmation}
                        confirmationTitle={'Delete Plot?'}
                        entityDescription=""
                        onConfirm={() => {
                            this.deletePlot();
                            this.onConfirmationConfirm();
                        }}
                        note="This will delete all children"
                    />
                </View>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        ...state.plotStore,
        email: state.appStore.email,
        apiKey: state.appStore.apiKey,
        userId: state.appStore.userId,
        stories: state.storyStore.stories,
        selectedStoryId: state.storyStore.selectedStoryId,
    };
}

const mapDispatchToProps = {
    showAlert,
    ...plotActions,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlotsScreen);
