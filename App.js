import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { AdMobBanner } from 'expo';
import { Provider } from 'react-redux';
import { AppStore, Persistor } from './store/AppStore.js';
import { PersistGate } from 'redux-persist/integration/react';
import AppNavigator from './navigation/AppNavigator';

/**
 * @TODO add auto rehydrate
 */
export default class App extends React.Component {
    state = {
        isLoadingComplete: false,
    };

    renderLoading = () => {
        return (
            <View style={styles.container}>
                <AppLoading
                    startAsync={this.loadResourcesAsync}
                    onError={this.handleLoadingError}
                    onFinish={this.handleFinishLoading}
                />
            </View>
        );
    };

    render() {
        return (
            <Provider store={AppStore}>
                <PersistGate persistor={Persistor} loading={this.renderLoading()}>
                    <View style={styles.container}>
                        <AppNavigator />
                        <View style={styles.adContainer}>
                            <AdMobBanner
                                bannerSize="smartBannerPortrait"
                                adUnitID={
                                    Platform.OS === 'android'
                                        ? 'ca-app-pub-5830175342552944/7130625883'
                                        : 'ca-app-pub-5830175342552944/4205993347'
                                }
                                testDeviceID="EMULATOR"
                            />
                        </View>
                    </View>
                </PersistGate>
            </Provider>
        );
    }

    loadResourcesAsync = async () => {
        return Promise.all([
            Font.loadAsync({
                ...Icon.Ionicons.font,
                'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
            }),
        ]);
    };

    handleLoadingError = () => {};

    handleFinishLoading = () => {
        this.setState({ isLoadingComplete: true });
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    adContainer: {
        width: '100%',
        height: 'auto',
        margin: 0,
        backgroundColor: 'black',
    },
});
