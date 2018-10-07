import React,  { Component } from 'react';
import { StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';

export default class FloatingCancelButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonPosition: {
                bottom: 10,
                left: 10,
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
                left: 10,
            }
        });
    }

    keyboardDidShow = () => {
        this.setState({
            buttonPosition: {
                top: 0,
                left: 10,
            }
        });
    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.floatingCancelButtonContainer, this.state.buttonPosition]}
                onPress={() => this.props.onPress()}
            >
                <Icon
                    name='close'
                    type='font-awesome'
                    color='#2f95dc'
                    reverse={true}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    floatingCancelButtonContainer: {
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        position: 'absolute',                                          
    },
});