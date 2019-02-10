import { StyleSheet } from 'react-native';

const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    characterContainer: {
        width: '100%',
        padding: 5,
        height: 125,
        borderBottomWidth: 2,
        borderBottomColor: '#CCCCCC',
    },
    characterPictureAndName: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    characterPictureContainer: {
        width: '23%',
        marginRight: '1%',
    },
    characterNameAndDescription: {
        width: '60%',
        marginLeft: '3%',
    },
    characterPicture: {
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
    characterName: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    characterDescription: {
        fontSize: 18,
    },
    moveCharacterContainer: {
        width: '10%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    characterNumber: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
    },
    moveUp: {
        width: '100%',
        zIndex: 10,
    },
    moveDown: {
        width: '100%',
        zIndex: 10,
    },
    noCharactersContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noCharactersText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 36,
        color: '#CCCCCC',
        fontWeight: 'bold',
    },
});

export default STYLES;
