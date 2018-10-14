import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import StoriesScreen from '../screens/StoriesScreen.js';
import SettingsScreen from '../screens/SettingsScreen.js';

const StoriesScreenStack = createStackNavigator({
    Stories: StoriesScreen,
});

StoriesScreenStack.navigationOptions = {
    tabBarLabel: 'Stories',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-book${focused ? '' : '-outline'}`
                    : 'md-book'
            }
        />
    ),
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios' 
                    ? `ios-settings${focused ? '': '-outline'}` 
                    : 'md-settings'}
        />
    ),
}

export default createBottomTabNavigator({
    StoriesScreenStack,
    SettingsStack,
});
