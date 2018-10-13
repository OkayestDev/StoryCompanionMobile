import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ChaptersScreen from '../screens/ChaptersScreen.js';
import PlotsScreen from '../screens/PlotsScreen.js';
import NotesScreen from '../screens/NotesScreen.js';
import CharactersScreen from '../screens/CharactersScreen.js';
import DraftsScreen from '../screens/DraftsScreen.js';

const ChapterScreenStack = createStackNavigator({
    Chapters: ChaptersScreen,
});

ChapterScreenStack.navigationOptions = {
    tabBarLabel: 'Chapters',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-bookmarks${focused ? '' : '-outline'}`
                    : 'md-bookmarks'
            }
        />
    ),
};

const PlotsScreenStack = createStackNavigator({
    Plots: PlotsScreen,
});

PlotsScreenStack.navigationOptions = {
    tabBarLabel: 'Plots',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-pulse${focused ? '' : '-outline'}`
                    : 'md-pulse'
            }
        />
    ),
};

const CharactersScreenStack = createStackNavigator({
    Characters: CharactersScreen,
});

CharactersScreenStack.navigationOptions = {
    tabBarLabel: 'Characters',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-people${focused ? '' : '-outline'}`
                    : 'md-people'
            }
        />
    ),
};

const DraftsScreenStack = createStackNavigator({
    Drafts: DraftsScreen,
});

DraftsScreenStack.navigationOptions = {
    tabBarLabel: 'Draft',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-document${focused ? '' : '-outline'}`
                    : 'md-document'
            }
        />
    ),
}

const NotesScreenStack = createStackNavigator({
    Notes: NotesScreen,
});

NotesScreenStack.navigationOptions = {
    tabBarLabel: 'Notes',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-list-box${focused ? '' : '-outline'}`
                    : 'md-list-box'
            }
        />
    ),
};

export default createBottomTabNavigator({
    // ChapterScreenStack,
    // PlotsScreenStack,
    // CharactersScreenStack,
    DraftsScreenStack,
    NotesScreenStack,
});
