import React,  { Component } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, View } from 'react-native';
import { Icon } from 'react-native-elements';

export default class FloatingAddButton extends Component {
    render() {
        return (
            <View style={styles.floatingDeleteButtonContainer}>
                <TouchableOpacity 
                    style={styles.floatingDeleteButton}
                    onPress={() => this.props.onPress()}
                >
                    <Icon
                        name='trash'
                        type='font-awesome'
                        color='red'
                        reverse={true}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    floatingDeleteButtonContainer: {
        height: 60,
        width: Dimensions.get('window').width,
        display: 'flex',
        position: 'absolute',
        bottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    floatingDeleteButton: {
        width: 60,  
        height: 60,   
        borderRadius: 30,            
        position: 'absolute',                                          
    },
});