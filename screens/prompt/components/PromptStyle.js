import { StyleSheet } from 'react-native';

const STYLE = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    nameContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: '12%',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#cccccc',
    },
    name: {
        width: '100%',
        fontSize: 28,
        fontWeight: 'bold',
        paddingRight: 10,
        paddingLeft: 10,
    },
    promptDescriptionContainer: {
        height: '84%',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#cccccc',
    },
    promptDescription: {
        fontSize: 18,
    },
    buttonContainer: {
        height: '14%',
        display: 'flex',
        flexDirection: 'row',
        padding: 5,
        width: '70%',
        alignItems: 'center',
    },
    promptToStoryButton: {
        width: '48.5%',
        marginRight: '1.5%',
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2f95dc',
        borderRadius: 4,
    },
    downVoteButton: {
        width: '48.5%',
        height: 45,
        marginLeft: '1.5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2f95dc',
        borderRadius: 4,
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
});

export default STYLE;
