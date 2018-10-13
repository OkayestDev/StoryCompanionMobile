import { createSwitchNavigator } from 'react-navigation';

import StoriesTabNavigator from './StoriesTabNavigator.js';
import LoginTabNavigator from './LoginTabNavigator.js'
import StoryTabNavigator from './StoryTabNavigator.js';

export default createSwitchNavigator({
    // LoginTab: LoginTabNavigator,
    // StoriesTab: StoriesTabNavigator,
    StoryTab: StoryTabNavigator,
});