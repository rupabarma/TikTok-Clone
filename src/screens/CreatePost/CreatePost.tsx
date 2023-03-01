import { 
    View, 
    Text, 
    TouchableOpacity,
    TextInput, 
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import Styles from './Styles'
import { Storage,API,graphqlOperation, Auth } from 'aws-amplify';
import { createPost } from '../../graphql/mutations'; 
import { v4 as uuidv4 } from 'uuid';
// import { useRoute } from '@react-navigation/native';

const CreatePost = ({navigation,route}) => {

    const [description,setDescription] = useState("")

    const [videoKey, setVideoKey] = useState(null)

    const uploadToStorage = async (imagePath) => {
      try {
        const response = await fetch(imagePath);


        const blob = await response.blob();

        const filename = `${uuidv4()}.mp4`
        const s3Response = await Storage.put(filename, blob)

        setVideoKey(s3Response.key)

      } catch(e) {
          console.error(e);
      }
    }

    useEffect(() => {
      uploadToStorage(route.params.videoUri);
    },[])

    const onPublish = async () => {
      //create post in the database(API)
      if (!videoKey) {
        console.warn('video is not yet uploaded')
        return;
      }
      
      try {
        const userInfo = await Auth.currentAuthenticatedUser();

        const newPost = {
          videoUri: videoKey,
          description: description,
          userID: userInfo.attributes.sub,
          songID: '6cfb3436-7b9a-42f9-8d63-617bb0282726',
        }

        const response = await API.graphql(
          graphqlOperation(createPost,{input: newPost})
          );
          navigation.navigate("Home", {screen: "Home"})
      } catch(e) {
        console.error(e);
      }

    }

  return (
    <View style={Styles.container}>
      <TextInput
      value={description}
      onChangeText={setDescription}
      numberOfLines= {3}
      placeholder={"Description"}
      style={Styles.textInput}
      />
     <View style={Styles.button}>   
      <TouchableOpacity onPress={onPublish}>
        <Text style={Styles.buttonText}>Publish</Text>
      </TouchableOpacity>
      </View>

    </View>
  )
}

export default CreatePost;