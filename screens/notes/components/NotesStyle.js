import { StyleSheet } from 'react-native';

const STYLE = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    noteContainer: {
        width: '100%',
        padding: 10,
        height: 125,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    },
    noteName: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    noteDescription: {
        fontSize: 18,
    },
    noNotesContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noNotesText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 36,
        color: '#CCCCCC',
        fontWeight: 'bold',
    },
});

export default STYLE;
