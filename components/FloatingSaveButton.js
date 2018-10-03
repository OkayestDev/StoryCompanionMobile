import React,  { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class FloatingSaveButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={styles.floatingSaveButtonContainer}
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
        bottom: 10,                                                    
        right: 10, 
    }
});