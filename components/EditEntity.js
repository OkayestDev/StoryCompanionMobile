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
import ModalPicker from '../components/ModalPicker.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ImagePicker, Permissions } from 'expo';

export default class EditEntity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalPickerOpen: false,
        };
        Permissions.askAsync(Permissions.CAMERA_ROLL);
    }

    openImagePicker = () => {
        let imagePickerResult = ImagePicker.launchImageLibraryAsync({
            allowEditing: true,
        });
        imagePickerResult.then(image => {
            if (!image.cancelled) {
                this.props.imagePickerOnChange(image);
            }
        });
    };

    renderImage = () => {
        if ('image' in this.props) {
            // Display empty area to upload an image
            if (this.props.image === '' || this.props.image === null) {
                return (
                    <View style={styles.imageViewContainer}>
                        <TouchableOpacity
                            style={styles.noImageSelectedView}
                            onPress={() => this.openImagePicker()}
                        >
                            <Text style={styles.noImageSelectedText}>Add An Image</Text>
                        </TouchableOpacity>
                    </View>
                );
            } else {
                // Render currently uploaded but not saved file
                if (this.props.image instanceof Object) {
                    return (
                        <View style={styles.imageViewContainer}>
                            <TouchableOpacity onPress={() => this.openImagePicker()}>
                                <Image
                                    source={{ uri: this.props.image.uri }}
                                    style={styles.selectedImage}
                                />
                            </TouchableOpacity>
                        </View>
                    );
                }
                // Render image already stored on s3 - image is the url to S3
                else {
                    return (
                        <View style={styles.imageViewContainer}>
                            <TouchableOpacity onPress={() => this.openImagePicker()}>
                                <Image
                                    source={{ uri: this.props.image }}
                                    style={{ width: 200, height: 200 }}
                                    style={styles.selectedImage}
                                />
                            </TouchableOpacity>
                        </View>
                    );
                }
            }
        }
        return null;
    };

    renderOneLineInputs = () => {
        let renderedInputs = [];
        this.props.oneLineInputs.forEach(input => {
            renderedInputs.push(
                <View key={input.name} style={styles.entityInputAndLabel}>
                    <Text style={styles.entityInputLabel}>{input.name}</Text>
                    <TextInput
                        placeholder={'Enter ' + input.name}
                        style={styles.entityInput}
                        keyboardType={input.type}
                        value={input.value}
                        onChangeText={input.onChange}
                        underlineColorAndroid="rgba(0,0,0,0)"
                    />
                </View>
            );
        });
        return renderedInputs;
    };

    renderMultiLineInputs = () => {
        let renderedInputs = [];
        this.props.multiLineInputs.forEach(input => {
            renderedInputs.push(
                <View key={input.name} style={styles.entityInputAndLabel}>
                    <Text style={styles.entityInputLabel}>{input.name}</Text>
                    <TextInput
                        placeholder={'Enter ' + input.name}
                        multiline={true}
                        style={styles.entityDescription}
                        value={input.value}
                        onChangeText={input.onChange}
                        underlineColorAndroid="rgba(0,0,0,0)"
                    />
                </View>
            );
        });
        return renderedInputs;
    };

    render() {
        return (
            <View
                style={[
                    styles.container,
                    this.state.isModalPickerOpen || this.props.isModalOpen
                        ? { backgroundColor: 'rgba(0,0,0,0.1)' }
                        : '',
                ]}
            >
                {'modalPickerList' in this.props && (
                    <ModalPicker
                        isModalPickerOpen={this.state.isModalPickerOpen}
                        closeModalPicker={() => this.setState({ isModalPickerOpen: false })}
                        selectedValue={this.props.modalPickerSelectedValue}
                        list={this.props.modalPickerList}
                        onChange={newValue => this.props.modalPickerOnChange(newValue)}
                        removeIdFromList={
                            'removeSelfFromList' in this.props
                                ? this.props.removeSelfFromList
                                : false
                        }
                    />
                )}
                <KeyboardAwareScrollView
                    enableOnAndroid={true}
                    keyboardShouldPersistTaps="handled"
                    scrollEnabled={true}
                >
                    <KeyboardAvoidingView enabled={true} behavior="padding">
                        <View>
                            {this.renderImage()}
                            {this.renderOneLineInputs()}
                            {'modalPickerList' in this.props && (
                                <View style={styles.entityInputAndLabel}>
                                    <Text style={styles.entityInputLabel}>
                                        {this.props.modalPicker}
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.modalPickerOpenButton}
                                        onPress={() => this.setState({ isModalPickerOpen: true })}
                                    >
                                        {this.props.modalPickerSelectedValue !== null &&
                                        this.props.modalPickerSelectedValue !== '' ? (
                                            <Text style={styles.modalPickerButtonText}>
                                                {this.props.modalPickerSelectedValue}
                                            </Text>
                                        ) : (
                                            <Text style={styles.placeholderText}>
                                                Select a {this.props.modalPicker}
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            )}
                            {this.renderMultiLineInputs()}
                        </View>
                    </KeyboardAvoidingView>
                </KeyboardAwareScrollView>
            </View>
        );
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
        minWidth: 250,
        minHeight: 250,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#CCCCCC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noImageSelectedText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    selectedImage: {
        minWidth: 250,
        minHeight: 250,
        maxWidth: '98%',
        borderWidth: 2,
        borderColor: '#CCCCCC',
        borderRadius: 4,
    },
    entityInputAndLabel: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 10,
        padding: 10,
    },
    entityInputLabel: {
        textAlign: 'left',
        width: '100%',
        fontSize: 24,
        fontWeight: 'bold',
    },
    entityInput: {
        width: '100%',
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
        width: '100%',
        height: 60,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
    },
    modalPickerButtonText: {
        fontSize: 16,
    },
    placeholderText: {
        color: '#cccccc',
        fontSize: 16,
    },
});
