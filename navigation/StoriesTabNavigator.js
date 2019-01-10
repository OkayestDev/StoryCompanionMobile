import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import StoriesScreen from '../screens/stories/StoriesScreen.js';
import SettingsScreen from '../screens/settings/SettingsScreen.js';
import TagsScreen from '../screens/tags/TagsScreen.js';
import PromptScreen from '../screens/prompt/PromptScreen.js';

const StoriesScreenStack = createStackNavigator({
    Stories: StoriesScreen,
});

StoriesScreenStack.navigationOptions = {
    tabBarLabel: 'Stories',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-book${focused ? '' : '-outline'}` : 'md-book'}
        />
    ),
};

const TagsScreenStack = createStackNavigator({
    Tags: TagsScreen,
});

TagsScreenStack.navigationOptions = {
    tabBarLabel: 'Tags',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios' ? `ios-bookmark${focused ? '' : '-outline'}` : 'md-bookmark'
            }
        />
    ),
};

const PromptScreenStack = createStackNavigator({
    Prompt: PromptScreen,
});

PromptScreenStack.navigationOptions = {
    tabBarLabel: 'Prompt',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-create${focused ? '' : '-outline'}` : 'md-create'}
        />
    ),
};

const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios' ? `ios-settings${focused ? '' : '-outline'}` : 'md-settings'
            }
        />
    ),
};

export default createBottomTabNavigator({
    StoriesScreenStack,
    TagsScreenStack,
    PromptScreenStack,
    SettingsStack,
});
