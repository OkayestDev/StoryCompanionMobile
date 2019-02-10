import { StyleSheet } from 'react-native';

const STYLE = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    chapterViewChapterContainer: {
        width: '100%',
        padding: 5,
        height: 75,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    chapterNameContainer: {
        width: '90%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    chapterWriteIconButton: {
        width: '10%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chapterNumber: {
        fontSize: 28,
        fontWeight: 'bold',
        marginRight: 10,
    },
    chapterName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    noChaptersContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noChaptersText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 36,
        color: '#CCCCCC',
        fontWeight: 'bold',
    },
});

export default STYLE;
