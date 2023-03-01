import { 
    View, 
    Text,
} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeBottomTabNavigator from './homeBottomTabNavigator';

//Screens
import HomeScreen from '../screens/Home/HomeScreen';
import CreatePost from '../screens/CreatePost/CreatePost';
import CreateScreen from '../screens/Create/CreateScreen';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
      <Stack.Screen name="Home" component={HomeBottomTabNavigator} />
      <Stack.Screen 
      options={{
        headerShown: true,
        title: 'Post'
      }}
      name="CreatePost" component={CreatePost} />
      {/* <Stack.Screen 
      // options={{
      //   headerShown: true,
      //   title: 'Post'
      // }}
      name="CreateScreen" component={CreateScreen} /> */}

      </Stack.Navigator>
    </NavigationContainer>  
  )
}

export default RootNavigation;