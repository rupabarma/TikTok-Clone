import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState, useRef } from 'react';
import { RNCamera } from 'react-native-camera';
import Styles from './Styles'
import Feather from 'react-native-vector-icons/Feather'
// import { useNavigation } from '@react-navigation/native';

const CreateScreen = ({navigation}) => {

  const [isRecording,setIsRecording] = useState(false)
  const camera = useRef();
  // const navigation = useNavigation();

  const onRecord= async () => {
    if (isRecording) {
      camera.current.stopRecording();
    } else {
      const data = await camera.current.recordAsync();
      navigation.navigate("CreatePost", {videoUri: data.uri})
    }

  }

  return (
    <View style={Styles.container}>
      
      <RNCamera
      onRecordingStart={() => setIsRecording(true)}
      onRecordingEnd={() => setIsRecording(false)}
      ref={camera}
      style={Styles.preview}
      // type={RNCamera.Constants.Type.back}
      // flashMode={RNCamera.Constants.FlashMode.on}
      // androidCameraPermissionOptions={{
      //   title: 'Permission to use camera',
      //   message: 'We need your permission to use your camera',
      //   buttonPositive: 'Ok',
      //   buttonNegative: 'Cancel',
      // }}
      // androidRecordAudioPermissionOptions={{
      //   title: 'Permission to use audio recording',
      //   message: 'We need your permission to use your audio',
      //   buttonPositive: 'Ok',
      //   buttonNegative: 'Cancel',
      // }}
      />
      <TouchableOpacity
        style={Styles.stackIcon}
        onPress={()=> navigation.goBack()}
        >
        <Feather name="arrow-left" size={25} color="#fff" />
        </TouchableOpacity>

    <TouchableOpacity onPress={onRecord} 
    style={isRecording? Styles.buttonStop: Styles.buttonRecord }>

    </TouchableOpacity>

    </View>
  )
}

export default CreateScreen;