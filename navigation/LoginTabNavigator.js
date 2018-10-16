import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import LoginScreen from '../screens/LoginScreen.js';
import PasswordResetScreen from '../screens/PasswordResetScreen.js';
import CreateAccountScreen from '../screens/CreateAccountScreen.js';

const LoginStack = createStackNavigator({
    Login: LoginScreen,
});

LoginStack.navigationOptions = {
    tabBarLabel: 'Login',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
            Platform.OS === 'ios'
                ? `ios-person${focused ? '' : '-outline'}`
                : 'md-person'
            }
        />
    ),
};

const CreateAccountStack = createStackNavigator({
    CreateAccount: CreateAccountScreen,
});

CreateAccountStack.navigationOptions = {
    tabBarLabel: 'Create Account',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={Platform.OS === 'ios' ? `ios-add-circle${focused ? '' : '-outline'}` : 'md-add-circle'}
        />
    ),
};

const PasswordResetStack = createStackNavigator({
    PasswordReset: PasswordResetScreen
});

PasswordResetStack.navigationOptions = {
    tabBarLabel: 'Password Reset',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios' 
                    ? `ios-help${focused ? '' : '-outline'}`
                    : 'md-help'
            }
        />
    ),
}

export default createBottomTabNavigator({
    LoginStack,
    CreateAccountStack,
    PasswordResetStack,
});
