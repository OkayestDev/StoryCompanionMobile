import { StyleSheet } from 'react-native';

const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    noTagsContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noTagsText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 36,
        color: '#CCCCCC',
        fontWeight: 'bold',
    },
    tagContainer: {
        width: '100%',
        padding: 10,
        height: 125,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    },
    tagName: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    tagType: {
        fontSize: 18,
    },
    tagDescription: {
        fontSize: 18,
        overflow: 'hidden',
    },
});

export default STYLES;
