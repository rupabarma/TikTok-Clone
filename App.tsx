/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar
} from 'react-native';
import HomeScreen from './src/screens/Home/HomeScreen';
import 'react-native-gesture-handler';
import RootNavigation from './src/navigation/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';

import {withAuthenticator} from 'aws-amplify-react-native';
import {Auth, API, graphqlOperation} from 'aws-amplify'; 
import {createUser} from './src/graphql/mutations';
import {getUser} from './src/graphql/queries';

const randomImages = [
  'https://canyonechoes.org/wp-content/uploads/2019/01/bird.png',
  'https://i.pinimg.com/originals/a3/ac/60/a3ac600306b878f0beabd9011d04103b.png',
  'https://peach.blender.org/wp-content/uploads/bird1.jpg',
  'https://i1.sndcdn.com/artworks-000005011531-qcsrj2-t240x240.jpg',
];

const getRandomImage = () => {
  return randomImages[Math.floor(Math.random() * randomImages.length)]
};

const App = () => {
  
  useEffect(() => {
    const fetchUser = async () => {
      //get currently authenticated user
      const userInfo = await Auth.currentAuthenticatedUser({bypassCache: true});
      // console.log(userInfo.attributes.sub)
      
      if (!userInfo) {
        return;
      }

      //check if the user exist in database
      const getUserResponse = await API.graphql(graphqlOperation(getUser,{id: userInfo.attributes.sub}));
      

      if (getUserResponse.data.getUser) {
        console.log('user already exixst in database');
        return;
      }

      //if it doesn't (it's newly registered user)
      //then, create a user in database
      const newUser = {
        id: userInfo.attributes.sub,
        userName: userInfo.username,
        email: userInfo.attributes.email,
        profilePicture: getRandomImage(),
      };
      // console.log(newUser)
      await API.graphql(graphqlOperation(createUser, {input: newUser}));

    };
    fetchUser();
  }, [])

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor= {'#000'}
      />
      <RootNavigation/>
    </SafeAreaView>
  );
};


export default withAuthenticator(App);
