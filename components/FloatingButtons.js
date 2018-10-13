import React,  { Component } from 'react';
import { StyleSheet, TouchableOpacity, Keyboard, View, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

const screenX = Dimensions.get('window').width;

export default class FloatingButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonPosition: {
                bottom: 10,
            }
        }
    }

    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    keyboardDidHide = () => {
        this.setState({
            buttonPosition: {
                bottom: 10,
            }
        });
    }

    keyboardDidShow = () => {
        this.setState({
            buttonPosition: {
                top: 0,
            }
        });
    }

    render() {
        return (
            <View style={[styles.floatingButtonsContainer, this.state.buttonPosition]}>
                <View style={styles.floatingCancelContainer}>
                {
                    this.props.onCancel !== null &&
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => this.props.onCancel()}
                    >
                        <Icon
                            name='close'
                            type='font-awesome'
                            color='#2f95dc'
                            reverse={true}
                        />
                    </TouchableOpacity>
                }
                </View>
                <View style={styles.floatingDeleteContainer}>
                {
                    this.props.onDelete !== null &&
                    <TouchableOpacity 
                        style={styles.floatingButton}
                        onPress={() => this.props.onDelete()}
                    >
                        <Icon
                            name='trash'
                            type='font-awesome'
                            color='red'
                            reverse={true}
                        />
                    </TouchableOpacity>
                }
                </View>
                <View style={[styles.floatingSaveContainer, styles.oddRightPadding]}>
                {
                    this.props.onSave !== null &&
                    <TouchableOpacity
                        style={styles.floatingButton}
                        onPress={() => this.props.onSave()}
                    >
                        <Icon
                            name='check'
                            type='font-awesome'
                            color='green'
                            reverse={true}
                        />
                    </TouchableOpacity>
                }
                </View>
            </View>
        )
    }
}

    const styles = StyleSheet.create({
        floatingButtonsContainer: {
            height: 60,
            width: screenX,
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
        },
        oddRightPadding: {
            paddingRight: 6,
        },
        floatingCancelContainer: {
            width: .3333 * screenX,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        floatingDeleteContainer: {
            width: .3333 * screenX,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        floatingSaveContainer: {
            width: .3333 * screenX,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
        },
        floatingButton: {
            width: 60,  
            height: 60,   
            borderRadius: 30,  
            zIndex: 10,             
        },
    });