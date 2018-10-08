import React,  { Component } from 'react';
import { StyleSheet, TouchableOpacity, Keyboard, View, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';

export default class FloatingCancelButton extends Component {
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
            <View style={[styles.floatingCancelButtonContainer, this.state.buttonPosition]}>
                <TouchableOpacity
                    style={styles.floatingCancelButton}
                    onPress={() => this.props.onPress()}
                >
                    <Icon
                        name='close'
                        type='font-awesome'
                        color='#2f95dc'
                        reverse={true}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    floatingCancelButtonContainer: {
        height: 60,
        width: Dimensions.get('window').width,
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    floatingCancelButton: {
        width: 60,  
        height: 60,   
        borderRadius: 30,       
    },
});