import React, { Component } from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    KeyboardAvoidingView,
} from 'react-native';
import ConfirmationModal from '../components/ConfirmationModal.js';
import ModalPicker from '../components/ModalPicker.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FloatingButtons from '../components/FloatingButtons.js';
import { ImagePicker, Permissions } from 'expo';

export default class EditEntity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConfirmationModalOpen: false,
            isModalPickerOpen: false,
            keyboardOpenPadding: 0,
        }
        Permissions.askAsync(Permissions.CAMERA_ROLL);
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
        this.setState({keyboardOpenPadding: 0});
    }

    keyboardDidShow = () => {
        this.setState({keyboardOpenPadding: 60});
    }

    openImagePicker = () => {
        let imagePickerResult = ImagePicker.launchImageLibraryAsync({
            allowEditing: true,
        });
        imagePickerResult.then((image) => {
            if (!image.cancelled) {
                this.props.imagePickerOnChange(image);
            }
        });
    }

    renderImage = () => {
        if ('image' in this.props) {
            // Display empty area to upload an image
            if (this.props.image === '') {
                return (
                    <View style={styles.imageViewContainer}>
                        <TouchableOpacity 
                            style={styles.noImageSelectedView}
                            onPress={() => this.openImagePicker()}
                        >
                            <Text style={styles.noImageSelectedText}>
                                Add An Image
                            </Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            else {
                // Render currently uploaded but not saved file
                if (this.props.image instanceof Object) {
                    return (
                        <View style={styles.imageViewContainer}>
                            <TouchableOpacity
                                onPress={() => this.openImagePicker()}
                            >
                                <Image
                                    source={{uri: this.props.image.uri}}
                                    style={styles.selectedImage}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }
                // Render image already stored on s3 - image is the url to S3
                else {
                    return (
                        <View style={styles.imageViewContainer}>
                            <TouchableOpacity
                                onPress={() => this.openImagePicker()}
                            >
                                <Image 
                                    source={{uri: this.props.image}}
                                    style={{width: 200, height: 200}}
                                    style={styles.selectedImage}
                                />
                            </TouchableOpacity>
                        </View>
                    )
                }
            }
        }
        return null;
    }

    render() {
        return (
            <View 
                style={[
                    styles.container,
                    this.state.isModalPickerOpen ? {backgroundColor: 'rgba(0,0,0,0.1)'} : '',
                ]}
            >
                {
                    this.props.selectedEntityId !== 'new' &&
                    <ConfirmationModal
                        isConfirmationModalOpen={this.state.isConfirmationModalOpen}
                        closeConfirmationModal={() => this.setState({isConfirmationModalOpen: false})}
                        confirmationTitle={"Delete " + this.props.entityType + "?"}
                        entityDescription={this.props.entityDescription}
                        onConfirm={() => {
                            this.props.deleteEntity();
                            this.setState({isConfirmationModalOpen: false});
                        }}
                        note={'deleteNote' in this.props ? this.props.deleteNote : null}
                    />
                }
                {
                    'modalPickerList' in this.props &&
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
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled"
                    scrollEnabled={true}
                >
                    <KeyboardAvoidingView
                        enabled={true}
                        behavior="padding"
                    >
                        <View style={{paddingTop: this.state.keyboardOpenPadding}}>
                            {this.renderImage()}
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
                                'modalPickerList' in this.props &&
                                <View style={styles.entityInputAndLabel}>
                                    <Text style={styles.entityInputLabel}>
                                        {this.props.modalPicker}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.modalPickerOpenButton}
                                        onPress={() => this.setState({isModalPickerOpen: true})}
                                    >
                                        <Text style={styles.modalPickerButtonText}>
                                            {this.props.modalPickerSelectedValue}
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
                                'inputFour' in this.props &&
                                <View style={styles.entityInputAndLabel}>
                                    <TextInput
                                        placeholder={this.props.inputFourName}
                                        multiline={true}
                                        style={styles.entityDescription}
                                        value={this.props.inputFour}
                                        onChangeText={(newDescription) => this.props.inputFourOnChange(newDescription)}
                                        underlineColorAndroid='rgba(0,0,0,0)'
                                    />
                                </View>
                            }
                        </View>
                    </KeyboardAvoidingView>
                </KeyboardAwareScrollView>
                <FloatingButtons
                    onSave={() => this.props.selectedEntityId === 'new' ? this.props.createEntity() : this.props.editEntity()}
                    onDelete={this.props.selectedEntityId !== 'new' ? () => this.setState({isConfirmationModalOpen: true}) : null}
                    onCancel={() => this.props.cancelEntityEdit()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    imageViewContainer: {
        marginTop: 10,
        marginBottom: 20,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noImageSelectedView: {
        width: 200,
        height: 200,
        borderRadius: 4,
        borderWidth: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noImageSelectedText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    selectedImage: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: '#CCCCCC',
        borderRadius: 4,
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
        width: '49%',
        marginRight: '1%',
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