import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'; 
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import Feather from 'react-native-vector-icons/Feather'; 
import Octicons from 'react-native-vector-icons/Octicons';
import PlusIcon from './PlusIcon.png'; 

//Screens
import HomeScreen from '../screens/Home/HomeScreen';
import CreateScreen from '../screens/Create/CreateScreen';

const Tab = createBottomTabNavigator();

const HomeBottomTabNavigator = ({navigation}) => {
  return (
    <Tab.Navigator
    screenOptions={{
        headerShown: false,
        tabBarStyle: {
            backgroundColor: '#000',
            borderTopColor:'#000'
        },
        tabBarActiveTintColor: '#fff'
    }}
    >
      <Tab.Screen
      name='Home'
      component={HomeScreen}
      options={{
        tabBarIcon: () => (
            <SimpleLineIcons
            name='home'
            size={25}
            color='#fff'
            />
        )
      }}
      />
      <Tab.Screen
      name='Discover'
      component={HomeScreen}
      options={{
        tabBarIcon: () => (
            <Feather
            name='search'
            size={25}
            color='#fff'
            />
        )
      }}
      />
      <Tab.Screen
      name='Create'
      component={CreateScreen}
      options={{
        tabBarStyle: {display: 'none'},
        tabBarIcon: () => (
            <Image
            source={PlusIcon}
            style={{resizeMode: 'contain'}}
            />
        ),
        tabBarLabel:() => null
        
      }}
      />
      <Tab.Screen
      name='Inbox'
      component={HomeScreen}
      options={{
        tabBarIcon: () => (
            <MaterialCommunityIcons
            name='tooltip-minus-outline'
            size={25}
            color='#fff'
            />
        )
      }}
      />
      <Tab.Screen
      name='Me'
      component={HomeScreen}
      options={{
        tabBarIcon: () => (
            <Octicons
            name='person'
            size={25}
            color='#fff'
            />
        )
      }} 
      />
    </Tab.Navigator>
  )
}

export default HomeBottomTabNavigator