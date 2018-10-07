import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import StoriesScreen from '../screens/StoriesScreen.js';
import LogoutScreen from '../screens/LogoutScreen.js';

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

const LogoutStack = createStackNavigator({
    Logout: LogoutScreen,
});

LogoutStack.navigationOptions = {
    tabBarLabel: 'Logout',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios' 
                    ? `ios-log-out${focused ? '': '-outline'}` 
                    : 'md-log-out'}
        />
    ),
};

export default createBottomTabNavigator({
    StoriesScreenStack,
    LogoutStack,
});
