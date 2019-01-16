import { StyleSheet } from 'react-native';

const STYLE = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    nameAndDownVoteContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#cccccc',
    },
    name: {
        width: '60%',
        fontSize: 28,
        fontWeight: 'bold',
        paddingRight: 10,
        paddingLeft: 10,
    },
    promptToStory: {
        width: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    downVote: {
        width: '20%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    promptDescriptionContainer: {
        padding: 10,
    },
    promptDescription: {
        fontSize: 18,
    },
});

export default STYLE;
