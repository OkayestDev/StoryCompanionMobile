import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';

export default class ConfirmationModal extends Component {
    render() {
        return (
            <Modal
                visible={this.props.isConfirmationModalOpen}
                onRequestClose={this.props.closeConfirmationModal}
                transparent={true}
            >
                <View style={styles.modalContent}>
                    <View style={styles.textContainer}>
                        <Text style={styles.modalText}>{this.props.confirmationTitle}</Text>
                        {'note' in this.props && this.props.note !== null && (
                            <Text style={styles.noteText}>{this.props.note}</Text>
                        )}
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={this.props.closeConfirmationModal}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={this.props.onConfirm}
                        >
                            <Text style={styles.buttonText}>Confirm</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        position: 'absolute',
        top: '25%',
        left: '10%',
        height: 175,
        width: 0.8 * Dimensions.get('window').width,
        padding: 20,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: '#CCCCCC',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
    },
    cancelButton: {
        width: '45%',
        borderRadius: 4,
        height: 50,
        backgroundColor: 'red',
        marginRight: 5,
        marginLeft: '2.5%',
        marginRight: '2.5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    confirmButton: {
        width: '45%',
        borderRadius: 4,
        height: 50,
        backgroundColor: 'green',
        marginLeft: '2.5%',
        marginRight: '2.5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        height: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    noteText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});
