import { StyleSheet } from 'react-native';

const STYLE = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    draftScrollView: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
        padding: 10,
    },
    draftInput: {
        height: '98%',
        width: '98%',
        marginTop: '1.5%',
        marginLeft: '1%',
        borderRadius: 4,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        padding: 10,
        textAlignVertical: 'top',
        fontSize: 18,
    },
    noDraftContainer: {
        width: '100%',
        height: '98%',
        width: '98%',
        marginTop: '1.5%',
        marginLeft: '1%',
        borderRadius: 4,
        borderWidth: 3,
        borderStyle: 'solid',
        borderColor: '#CCCCCC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDraftText: {
        textAlign: 'center',
        fontSize: 30,
        color: '#CCCCCC',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    noDraftButton: {
        width: '70%',
        backgroundColor: '#2f95dc',
        height: 50,
        display: 'flex',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    noDraftButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default STYLE;
