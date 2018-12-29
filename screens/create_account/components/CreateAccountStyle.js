import { StyleSheet, Dimensions } from 'react-native';

const screenX = Dimensions.get('window').width;

const STYLE = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    welcome: {
        fontWeight: 'bold',
        fontSize: 36,
        marginBottom: 20,
    },
    createAccountView: {
        height: 0.7 * Dimensions.get('window').height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    createAccountLabelAndInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: screenX,
        marginBottom: 20,
    },
    createAccountInputLabel: {
        fontSize: 24,
        fontWeight: 'bold',
        width: 0.3 * screenX,
        marginRight: 0.05 * screenX,
    },
    createAccountInput: {
        width: 0.6 * screenX,
        height: 60,
        borderRadius: 4,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
        fontSize: 16,
    },
    createAccountButton: {
        backgroundColor: '#2f95dc',
        display: 'flex',
        height: 50,
        width: 0.8 * screenX,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    createAccountButtonText: {
        color: 'white',
        fontSize: 24,
    },
});

export default STYLE;
