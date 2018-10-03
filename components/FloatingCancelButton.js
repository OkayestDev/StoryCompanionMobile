import React,  { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class FloatingCancelButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.floatingCancelButtonContainer}
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
        bottom: 10,                                                    
        left: 10, 
    },
});