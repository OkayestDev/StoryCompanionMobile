import React, { Component } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    AsyncStorage, 
    ScrollView 
} from 'react-native';
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
            plotParent: null,
            selectedPlotId: null,
            plots: null,

            globalAlertVisible: false,
            globalAlertType: '',
            globalAlertMessage: '',
        }
        this.PlotRequests = new PlotRequests();
        //@PROD
        this.selectedStoryId = null;
        this.getPlots();
        // @DEV
        // this.selectedStoryId = 1;
        // this.getPlots(1);
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
                    plotParent: null,
                    selectedPlotId: null,
                })
            }
        })

    }

    editPlot = () => {
        this.PlotRequests.editPlot(this.state.selectedPlotId, this.state.name, this.state.description, this.state.plotParent).then((res) => {
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
                tempPlots[this.state.selectedPlotId] = res.success;
                this.setState({
                    plots: tempPlots,
                    name: '',
                    plotParent: null,
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
                    plotParent: null,
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

    selectPlot = (id) => {
        this.setState({
            plotParent: this.state.plots[id].plot,
            description: this.state.plots[id].description,
            name: this.state.plots[id].name,
            selectedPlotId: id,
        });
    }

    addChildPlot = (parentId) => {
        this.setState({
            plotParent: parentId,
            description: '',
            name: '',
            selectedPlotId: 'new',
        })
    }

    returnPlot = (styleName = 'parentPlots', id, addIcon = true) => {
        let plot = (
            <View 
                key={id}
                style={styles.plotContainer}
            >
                <TouchableOpacity
                    onPress={() => this.selectPlot(id)}
                    style={styles[styleName]}
                >
                    <Text 
                        numberOfLines={1}
                        style={styles.plotsText}
                    >
                        {this.state.plots[id].name}
                    </Text>
                    
                </TouchableOpacity>
                {
                    addIcon &&
                    <View style={styles.plotIconContainer}>
                        <Icon
                            onPress={() => this.addChildPlot(id)}
                            name="plus"
                            type="font-awesome"
                            color="#2f95dc"
                            size={20}
                        />
                    </View>
                }
            </View>
        );
        return plot;
    }

    renderPlots = () => {
        if (this.state.plots === null) {
            return null;
        }
        let plots = [];
        let plotIds = Object.keys(this.state.plots);
        if (plotIds.length > 0) {
            plotIds.forEach((id) => {
                if (this.state.plots[id].plot !== '') {
                    return;
                }
                else {
                    plots.push(this.returnPlot('parentPlots', id));
                    let parentOneId = id;
                    // Render childrenOne
                    plotIds.forEach((id) => {
                        if (this.state.plots[id].plot == parentOneId) {
                            plots.push(this.returnPlot('childOnePlots', id));
                            // Render childrenTwo
                            let parentTwoId = id;
                            plotIds.forEach((id) => {
                                if (this.state.plots[id].plot == parentTwoId) {
                                    plots.push(this.returnPlot('childTwoPlots', id, false));
                                }
                            })
                        }
                        else {
                            return;
                        }
                    })
                }
            });
            return plots;
        }
        else {
            return (
                <View style={styles.noPlotsContainer}>
                    <Text style={styles.noPlotsText}>
                        Looks like you haven't created any plots yet.
                    </Text>
                    <Text style={styles.noPlotsText}>
                        Press on the + to create a plot!
                    </Text>
                </View>
            )
        }
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
                    <ScrollView>
                        {this.renderPlots()}
                    </ScrollView>
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
                        deleteNote="Note: all children will be deleted"

                        inputOne={this.state.name}
                        inputOneName="Plot Name"
                        inputOneOnChange={(newValue) => this.setState({name: newValue})}

                        inputThree={this.state.description}
                        inputThreeName="Description"
                        inputThreeOnChange={(newValue) => this.setState({description: newValue})}

                        // modalPicker={"Plot Parent"}
                        // modalPickerSelectedValue={this.state.plotParent}
                        // modalPickerDisplayValue={
                        //     this.state.plotParent in this.state.plots
                        //         ? this.state.plots[this.state.plotParent].name
                        //         : "Select a plot parent"
                        // }
                        // modalPickerList={this.state.plots}
                        // removeSelfFromList={this.state.selectedPlotId}
                        // modalPickerOnChange={(newValue) => this.setState({plotParent: newValue})}

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
    },
    plotContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
    },
    parentPlots: {
        width: '87.5%',
        marginLeft: '2.5%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
    },
    childOnePlots: {
        width: '82.5%',
        marginLeft: '7.5%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
    },
    childTwoPlots: {
        width: '77.5%',
        marginLeft: '12.5%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
    },
    plotsText: {
        color: '#CCCCCC',
        fontWeight: 'bold',
        fontSize: 28,
    },
    plotIconContainer: {
        display: 'flex',
        width: '10%',
        justifyContent: 'center',
    },
    noPlotsContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noPlotsText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 36,
        color: '#CCCCCC',
        fontWeight: 'bold',
    }
});