import { StyleSheet } from 'react-native';

const STYLE = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    chapterViewChapterContainer: {
        width: '100%',
        padding: 10,
        height: 75,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    chapterNumber: {
        fontSize: 48,
        fontWeight: 'bold',
        marginRight: 10,
    },
    chapterName: {
        fontSize: 24,
    },
    chapterEditIcon: {
        flex: 2,
        display: 'flex',
        paddingRight: 20,
        justifyContent: 'flex-end',
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