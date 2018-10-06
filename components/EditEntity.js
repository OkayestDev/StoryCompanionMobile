import React,  { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import FloatingCancelButton from '../components/FloatingCancelButton.js';
import FloatingSaveButton from '../components/FloatingSaveButton.js';
import FloatingDeleteButton from '../components/FloatingDeleteButton.js';
import ConfirmationModal from '../components/ConfirmationModal.js';
import ModalPicker from '../components/ModalPicker.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class EditEntity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConfirmationModalOpen: false,
            isModalPickerOpen: false,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.selectedEntityId !== 'new' &&
                    <ConfirmationModal
                        isConfirmationModalOpen={this.state.isConfirmationModalOpen}
                        closeConfirmationModal={() => this.setState({isConfirmationModalOpen: false})}
                        entityType={this.props.entityType}
                        entityDescription={this.props.entityDescription}
                        onConfirm={() => {
                            this.props.deleteEntity();
                            this.setState({isConfirmationModalOpen: false});
                        }}
                        note={'deleteNote' in this.props ? this.props.deleteNote : null}
                    />
                }
                {
                    'modalPicker' in this.props &&
                    <ModalPicker
                        isModalPickerOpen={this.state.isModalPickerOpen}
                        closeModalPicker={() => this.setState({isModalPickerOpen: false})}
                        selectedValue={this.props.modalPickerSelectedValue}
                        list={this.props.modalPickerList}
                        onChange={(newValue) => this.props.modalPickerOnChange(newValue)}
                        removeIdFromList={'removeSelfFromList' in this.props ? this.props.removeSelfFromList : false}
                    />
                }
                <KeyboardAwareScrollView
                    style={styles.container}
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled"
                    scrollEnabled={true}
                >
                    {
                        'inputOne' in this.props &&
                        <View style={styles.entityInputAndLabel}>
                            <Text style={styles.entityInputLabel}>
                                {this.props.inputOneName}
                            </Text>
                            <TextInput
                                style={styles.entityInput}
                                value={this.props.inputOne}
                                onChangeText={(newName) => this.props.inputOneOnChange(newName)}
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                        </View>
                    }
                    {
                        'inputTwo' in this.props &&
                        <View style={styles.entityInputAndLabel}>
                            <Text style={styles.entityInputLabel}>
                                {this.props.inputTwoName}
                            </Text>
                            <TextInput
                                keyboardType="numeric"
                                style={styles.entityInput}
                                value={this.props.inputTwo}
                                onChangeText={(newNumber) => this.props.inputTwoOnChange(newNumber)}
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                        </View>
                    }
                    {
                        'modalPicker' in this.props &&
                        <View style={styles.entityInputAndLabel}>
                            <Text style={styles.entityInputLabel}>
                                {this.props.modalPicker}
                            </Text>
                            <TouchableOpacity
                                style={styles.modalPickerOpenButton}
                                onPress={() => this.setState({isModalPickerOpen: true})}
                            >
                                <Text style={styles.modalPickerButtonText}>
                                    {this.props.modalPickerDisplayValue}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    }
                    {
                        'inputThree' in this.props &&
                        <View style={styles.entityInputAndLabel}>
                            <TextInput
                                placeholder={this.props.inputThreeName}
                                multiline={true}
                                style={styles.entityDescription}
                                value={this.props.inputThree}
                                onChangeText={(newDescription) => this.props.inputThreeOnChange(newDescription)}
                                underlineColorAndroid='rgba(0,0,0,0)'
                            />
                        </View>
                    }
                    {
                        'selectEntity' in this.props && this.props.selectedEntityId !== 'new' &&
                        <TouchableOpacity
                            style={styles.selectEntityButton}
                            onPress={() => this.props.selectEntity()}
                        >
                            <Text style={styles.selectEntityButtonText}>
                                {this.props.selectEntityButtonText}
                            </Text>
                        </TouchableOpacity>
                    }
                </KeyboardAwareScrollView>
                <FloatingSaveButton onPress={() => this.props.selectedEntityId === 'new' ? this.props.createEntity() : this.props.editEntity()}/>
                {
                    this.props.selectedEntityId !== 'new' &&
                    <FloatingDeleteButton onPress={() => this.setState({isConfirmationModalOpen: true})}/>
                }
                <FloatingCancelButton onPress={() => this.props.cancelEntityEdit()}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    entityInputAndLabel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        padding: 10,
    },
    entityInputLabel: {
        textAlign: 'left',
        width: '50%',
        color: '#CCCCCC',
        fontSize: 24,
        fontWeight: 'bold',
    },
    entityInput: {
        width: '50%',
        height: 60,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
        fontSize: 16,
    },
    entityDescription: {
        width: '100%',
        height: 200,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 16,
    },
    selectEntityButton: {
        height: 60,
        width: '80%',
        marginLeft: '10%',
        borderRadius: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2f95dc',
    },
    selectEntityButtonText: {
        color: 'white',
        fontSize: 20,
    },
    modalPickerOpenButton: {
        display: 'flex',
        justifyContent: 'center',
        width: '50%',
        height: 60,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
    },
    modalPickerButtonText: {
        fontSize: 16,
    }
});