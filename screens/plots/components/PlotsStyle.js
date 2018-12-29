import { StyleSheet } from 'react-native';

const STYLE = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    plotContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
    },
    parentPlots: {
        width: '87.5%',
        marginLeft: '2.5%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
    },
    childOnePlots: {
        width: '82.5%',
        marginLeft: '7.5%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
    },
    childTwoPlots: {
        width: '77.5%',
        marginLeft: '12.5%',
        height: 50,
        display: 'flex',
        justifyContent: 'center',
    },
    plotsText: {
        fontWeight: 'bold',
        fontSize: 28,
    },
    plotIconContainer: {
        display: 'flex',
        width: '10%',
        justifyContent: 'center',
    },
    noPlotsContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noPlotsText: {
        marginTop: 30,
        textAlign: 'center',
        fontSize: 36,
        color: '#CCCCCC',
        fontWeight: 'bold',
    },
});

export default STYLE;
