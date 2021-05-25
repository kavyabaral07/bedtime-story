import React from 'react'; 
import { StyleSheet, Text, View } from 'react-native'; 
import { createAppContainer , createSwitchNavigator} from 'react-navigation'; 
import { createBottomTabNavigator } from 'react-navigation-tabs'; 

import ReadStoriesScreens from './Screens/ReadStoriesScreen';
import WriteStoriesScreens from './Screens/WriteStoriesScreen';
import LoginScreen from './Screens/LoginScreen'
export default class App extends React.Component { 
  render(){ 
  return ( 
  
    <AppContainer/>
    
  ); 
  } } 

  const TabNavigator = createBottomTabNavigator({ 
    ReadStories: {screen: ReadStoriesScreens}, 
    WriteStories: {screen:  WriteStoriesScreens }, 
    
    },
    
    
    ); 


    const switchNavigator = createSwitchNavigator({
  LoginScreen:LoginScreen,
  TabNavigator:TabNavigator
})
    const AppContainer = createAppContainer(switchNavigator);
 