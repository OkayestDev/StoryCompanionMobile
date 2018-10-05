import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import FloatingAddButton from '../components/FloatingAddButton.js';
import GlobalAlert from '../components/GlobalAlert.js';
import EditEntity from '../components/EditEntity.js';
import { Icon } from 'react-native-elements';
import PlotRequests from '../utils/PlotRequests.js';

const headerTitle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#2f95dc',
    paddingLeft: 20,
}

export default class PlotsScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Plots',
            headerTitle: (
                <View style={headerTitle}>
                    <TouchableOpacity 
                        style={{marginRight: 15}}
                        onPress={() => navigation.navigate("StoriesTab")}
                    >
                        <Icon
                            color="white"
                            name="arrow-left"
                            type="font-awesome"
                            size={28}
                        />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{fontWeight: 'bold', color: 'white', fontSize: 28}}>
                        Plots
                    </Text>
                </View>
            ),
            headerStyle: { backgroundColor: '#2f95dc' },
            headerTitleStyle: { color: 'white' },
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            plot: null,
            plotParent: '',
            selectedPlotId: null,
            plots: null,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        }
        this.PlotRequests = new PlotRequests();
        //@PROD
        // this.selectedStoryId = null;
        // this.getPlots();
        // @DEV
        this.selectedStoryId = 1;
        this.getPlots(1);
    }

    getPlots = (story = null) => {
        if (story !== null) {
            this.PlotRequests.getPlots(story).then((res) => {
                if ('error' in res) {
                    this.setState({
                        selectedPlotId: null,
                        globalAlertVisible: true,
                        globalAlertType: 'danger',
                        globalAlertMessage: res.error,
                    });
                }
                else {
                    this.setState({plots: res.success});
                }
            })
        }
        else {
            AsyncStorage.getItem('selectedStoryId').then((res) => {
                this.selectedStoryId = res;
                this.getPlots(res);
            })
        }
    }

    createPlot = () => {
        this.PlotRequests.createPlot(this.state.name, this.state.description, this.state.plotParent, this.selectedStoryId).then((res) => {
            if ('error' in res) {
                this.setState({
                    selectedPlotId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'danger',
                    globalAlertMessage: res.error,
                });
            }
            else {
                this.setState({
                    plots: res.success,
                    description: '',
                    name: '',
                    plotParent: '',
                    selectedPlotId: null,
                })
            }
        })

    }

    editPlot = () => {
        this.PlotRequests.editPlot(this.state.selectedPlotId, this.state.name, this.state.description, this.state.plotParent).then((res) => {
            if ('error' in res) {

            }
            else {
                let tempPlots = this.state.plots;
                tempPlots[this.state.selectedPlotId] = res.success;
                this.setState({
                    plots: tempPlots,
                    name: '',
                    plotParent: '',
                    description: '',
                    selectedPlotId: null,
                });
            }
        });
    }

    deletePlot = () => {
        this.PlotRequests.deletePlot(this.state.selectedPlotId).then((res) => {
            if ('error' in res) {
                this.setState({
                    selectedPlotId: null,
                    globalAlertVisible: true,
                    globalAlertType: 'warning',
                    globalAlertMessage: res.error,
                });
            }
            else {
                let tempPlots = this.state.plots;
                delete tempPlots[this.state.selectedPlotId];
                this.setState({
                    plots: tempPlots,
                    name: '',
                    description: '',
                    plotParent: '',
                    selectedPlotId: null,
                });
            }
        })
    }

    cancelPlotEdit = () => {
        this.setState({
            name: '',
            number: '',
            description: '',
            plotParent: '',
            selectedPlotId: null,
        });
    }

    renderPlots = () => {
        if (this.state.plots === null) {
            return null;
        }
        let plots = [];
        let plotIds = Object.keys(this.state.plots);
        plotIds.forEach((id) => {
            plots.push(
                <View>
                    <Text>
                        {this.state.plots[id].name}
                    </Text>
                </View>
            );
        });
        return plots;
    }

    render() {
        if (this.state.selectedPlotId === null) {
            return (
                <View style={styles.container}>
                    <GlobalAlert
                        visible={this.state.globalAlertVisible}
                        message={this.state.globalAlertMessage}
                        type={this.state.globalAlertType}
                        closeAlert={() => this.setState({globalAlertVisible: false})}
                    />
                    {this.renderPlots()}
                    <FloatingAddButton onPress={() => this.setState({selectedPlotId: 'new'})}/>
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
                        selectedEntityId={this.state.selectedPlotId}
                        entityType="Plot"

                        inputOne={this.state.name}
                        inputOneName="Plot Name"
                        inputOneOnChange={(newValue) => this.setState({name: newValue})}

                        inputThree={this.state.description}
                        inputThreeName="Description"
                        inputThreeOnChange={(newValue) => this.setState({description: newValue})}

                        createEntity={() => this.createPlot()}
                        editEntity={() => this.editPlot()}
                        deleteEntity={() => this.deletePlot()}
                        cancelEntityEdit={() => this.cancelPlotEdit()}
                    />
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
});