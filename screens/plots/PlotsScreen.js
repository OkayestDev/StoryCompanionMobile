import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import Actions from '../../store/Actions.js';
import FloatingAddButton from '../../components/FloatingAddButton.js';
import GlobalAlert from '../../components/GlobalAlert.js';
import EditEntity from '../../components/EditEntity.js';
import { Icon } from 'react-native-elements';
import StoryCompanion from '../../utils/StoryCompanion.js';
import ConfirmationModal from '../../components/ConfirmationModal.js';
import PlotsUtils from './components/PlotsUtils.js';
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
        this.state = {
            name: '',
            description: '',
            plotParent: null,
            selectedPlotId: null,
            plots: null,

            isConfirmationModalOpen: false,
            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        };
        props.navigation.setParams({ title: this.props.stories[this.props.selectedStoryId].name });
    }

    cancelPlotEdit = () => {
        this.removeNavigationActions();
        this.setState({
            name: '',
            number: '',
            description: '',
            plotParent: '',
            selectedPlotId: null,
        });
    };

    newPlot = () => {
        this.setNavigationActions(this.cancelPlotEdit, this.createPlot, null);
        this.setState({ selectedPlotId: 'new' });
    };

    selectPlot = id => {
        this.setNavigationActions(this.cancelPlotEdit, this.editPlot, this.openConfirmation);
        this.setState({
            plotParent: this.state.plots[id].plot,
            description: this.state.plots[id].description,
            name: this.state.plots[id].name,
            selectedPlotId: id,
        });
    };

    addChildPlot = parentId => {
        this.setNavigationActions(this.cancelPlotEdit, this.createPlot, null);
        this.setState({
            plotParent: parentId,
            description: '',
            name: '',
            selectedPlotId: 'new',
        });
    };

    returnPlot = (styleName = 'parentPlots', id, addIcon = true) => {
        let plot = (
            <View key={id} style={STYLE.plotContainer}>
                <TouchableOpacity onPress={() => this.selectPlot(id)} style={STYLE[styleName]}>
                    <Text numberOfLines={1} style={STYLE.plotsText}>
                        {this.state.plots[id].name}
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
        if (this.state.plots === null) {
            return null;
        }
        let plots = [];
        let plotIds = Object.keys(this.state.plots);
        if (plotIds.length > 0) {
            plotIds.forEach(id => {
                if (this.state.plots[id].plot !== '') {
                    return;
                } else {
                    plots.push(this.returnPlot('parentPlots', id));
                    let parentOneId = id;
                    // Render childrenOne
                    plotIds.forEach(id => {
                        if (this.state.plots[id].plot == parentOneId) {
                            plots.push(this.returnPlot('childOnePlots', id));
                            // Render childrenTwo
                            let parentTwoId = id;
                            plotIds.forEach(id => {
                                if (this.state.plots[id].plot == parentTwoId) {
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
        if (this.state.selectedPlotId === null) {
            return (
                <View style={STYLE.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({ globalAlertVisible: false })}
                    />
                    <ScrollView>{this.renderPlots()}</ScrollView>
                    <FloatingAddButton onPress={this.newPlot} />
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
                        selectedEntityId={this.state.selectedPlotId}
                        isModalOpen={this.state.isConfirmationModalOpen}
                        entityType="Plot"
                        deleteNote="Note: all children will be deleted"
                        inputOne={this.state.name}
                        inputOneName="Plot Name"
                        inputOneOnChange={newValue => this.setState({ name: newValue })}
                        inputThree={this.state.description}
                        inputThreeName="Description"
                        inputThreeOnChange={newValue => this.setState({ description: newValue })}
                    />
                    <ConfirmationModal
                        isConfirmationModalOpen={this.state.isConfirmationModalOpen}
                        closeConfirmationModal={() =>
                            this.setState({ isConfirmationModalOpen: false })
                        }
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

export default connect(
    Actions.mapStateToProps,
    Actions.mapDispatchToProps
)(PlotsScreen);
