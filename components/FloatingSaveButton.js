import React,  { Component } from 'react';
import { StyleSheet, TouchableOpacity, Keyboard, Dimensions, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class FloatingSaveButton extends Component {
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
            <View style={[styles.floatingSaveButtonContainer, this.state.buttonPosition]}>
                <TouchableOpacity
                    style={styles.floatingSaveButton}
                    onPress={() => this.props.onPress()}
                >
                    <Icon
                        name='check'
                        type='font-awesome'
                        color='green'
                        reverse={true}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    floatingSaveButtonContainer: {
        height: 60,
        width: Dimensions.get('window').width,
        display: 'flex',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    floatingSaveButton: {
        width: 60,  
        height: 60,   
        borderRadius: 30,  
        marginRight: 4,          
    }
});