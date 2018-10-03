import React,  { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

export default class FloatingAddButton extends Component {
    render() {
        return (
            <TouchableOpacity 
                style={styles.floatingAddButtonContainer}
                onPress={() => this.props.onPress()}
            >
                <Icon
                    name='plus'
                    type='font-awesome'
                    color='#2f95dc'
                    reverse={true}
                />
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    floatingAddButtonContainer: {
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        position: 'absolute',                                          
        bottom: 10,                                                    
        right: 10, 
    },
});