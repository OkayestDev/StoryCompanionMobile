import { StyleSheet, Dimensions } from 'react-native';

const screenX = Dimensions.get('window').width;

const STYLE = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollView: {
        flex: 1,
        backgroundColor: 'white',
    },
    buttonContainer: {
        width: '100%',
        height: '60%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    button: {
        width: '80%',
        marginLeft: '10%',
        height: 50,
        backgroundColor: '#2f95dc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
    },
    submissionLabelContainer: {
        width: '100%',
        height: '10%',
    },
    submissionLabel: {
        fontSize: 24,
        color: '#2f95dc',
        fontWeight: 'bold',
    },
    submissionContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        padding: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submissionDescriptionContainer: {
        height: '85%',
        width: '100%',
    },
    submissionDescription: {
        height: '100%',
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 18,
    },
    forgotPassword: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 20,
    },
    resetPasswordView: {
        height: 0.7 * Dimensions.get('window').height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    resetPasswordLabelAndInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenX,
        marginBottom: 20,
    },
    resetPasswordInputLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        width: 0.3 * screenX,
        marginRight: 0.05 * screenX,
    },
    resetPasswordInput: {
        width: 0.6 * screenX,
        height: 60,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
        fontSize: 16,
    },
    resetPasswordButton: {
        backgroundColor: '#2f95dc',
        display: 'flex',
        height: 50,
        width: 0.8 * screenX,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    resetPasswordButtonText: {
        color: 'white',
        fontSize: 24,
    },
});

export default STYLE;
