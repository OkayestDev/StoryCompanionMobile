import React,  { Component } from 'react';
import { StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { Icon } from 'react-native-elements';

export default class FloatingSaveButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonPosition: {
                bottom: 10,
                right: 10,
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
                right: 10,
            }
        });
    }

    keyboardDidShow = () => {
        this.setState({
            buttonPosition: {
                top: 0,
                right: 10,
            }
        });
    }

    render() {
        return (
            <TouchableOpacity
                style={[styles.floatingSaveButtonContainer, this.state.buttonPosition]}
                onPress={() => this.props.onPress()}
            >
                <Icon
                    name='check'
                    type='font-awesome'
                    color='green'
                    reverse={true}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    floatingSaveButtonContainer: {
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        position: 'absolute',
    }
});