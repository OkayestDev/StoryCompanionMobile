import { StyleSheet } from 'react-native';

const STYLE = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    storyContainer: {
        width: '100%',
        padding: 10,
        height: 125,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    },
    storyPictureAndName: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 7,
    },
    storyPictureContainer: {
        width: '29%',
        marginRight: '1%',
    },
    storyPicture: {
        width: 100,
        height: 100,
        borderRadius: 4,
    },
    noPicture: {
        width: 100,
        height: 100,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#CCCCCC',
    },
    storyNameAndDescription: {
        width: '67%',
        marginLeft: '3%',
    },
    storyName: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    storyDescription: {
        fontSize: 18,
    },
    selectStoryButtonText: {
        fontSize: 20,
        color: 'white',
    },
    noStoriesContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noStoriesText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 36,
        color: '#CCCCCC',
        fontWeight: 'bold',
    },
    editStoryPropsButton: {
        backgroundColor: '#2f95dc',
        height: 50,
        borderRadius: 4,
        width: '97%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    editStoryPropsButtonText: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default STYLE;
