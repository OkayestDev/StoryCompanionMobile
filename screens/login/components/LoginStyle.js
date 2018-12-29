import { StyleSheet, Dimensions } from 'react-native';

const screenX = Dimensions.get('window').width;

const STYLE = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    welcomeBack: {
        fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 20,
    },
    loginView: {
        height: 0.7 * Dimensions.get('window').height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginLabelAndInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenX,
        marginBottom: 20,
    },
    loginInputLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        width: 0.3 * screenX,
        marginRight: 0.05 * screenX,
    },
    loginInput: {
        width: 0.6 * screenX,
        height: 60,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
        fontSize: 16,
    },
    loginButton: {
        backgroundColor: '#2f95dc',
        display: 'flex',
        height: 50,
        width: 0.8 * screenX,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 24,
    },
});

export default STYLE;
