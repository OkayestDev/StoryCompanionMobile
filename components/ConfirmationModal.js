import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

export default class ConfirmationModal extends Component {
    render() {
        return (
            <Modal
                style={styles.confirmationModal}
                isVisible={this.props.isConfirmationModalOpen}
                animationIn="fadeIn"
                animationOut="fadeOut"
                animationInTiming={10}
                animationOutTiming={10}
                onRequestClose={() => this.props.closeConfirmationModal()}
                onBackButtonPress={() => this.props.closeConfirmationModal()}
                onBackdropPress={() => this.props.closeConfirmationModal()}
                children={
                    <View style={styles.modalContent}>
                        <View style={styles.textContainer}>
                            <Text style={styles.modalText}>
                                Delete {this.props.entityType}?
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={() => this.props.closeConfirmationModal()}
                            >
                                <Text style={styles.buttonText}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={() => this.props.onConfirm()}
                            >
                                <Text style={styles.buttonText}>
                                    Confirm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />
        )
    }
}

const styles = StyleSheet.create({
    confirmationModal: {
        flex: 1
    },
    modalContent: {
        width: '80%',
        height: 175,
        marginLeft: '10%',
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 4,
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
        color: '#CCCCCC',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
})