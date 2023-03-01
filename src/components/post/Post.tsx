import { 
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity,
 } from 'react-native';
import React,{useEffect, useState} from 'react';
import Video from 'react-native-video';
import { Storage } from 'aws-amplify';
// import Video1 from './Video1.mp4';
import Styles from './Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { 
  API,
  Auth,
  graphqlOperation,
} from 'aws-amplify';

import {createLike, deleteLike} from '../../graphql/mutations'

const Post = (props: { post: any; }) => {
  const [post,setPost] = useState(props.post);
  const [paused,setPaused] = useState(false);
  const [isLiked,setIsLiked] = useState(false);
  const [user, setUser] = useState(null);
  const [myLike,setMyLike] = useState(null);
  const [likesCount,setLikesCount] = useState(post.likes.items.length);
  
console.log(post)
  const [videoUri,setVideoUri] = useState('');
 
  const onPlayPausePress= () => {
    setPaused(!paused)
  };

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await Auth.currentAuthenticatedUser();
      setUser(currentUser);

      const searchedLike = post.likes.items.find((like) => like.userID === currentUser.attributes.sub);
      setMyLike(searchedLike); 
    }
    fetchUser();
  },[])

  const submitLike = async () => {
    const like = {
      userID: user.attributes.sub,
      postID: post.id,
    }
    const res =  await API.graphql(
      graphqlOperation(
        createLike, {input: like}
      )
    )
    try{
      setMyLike(res.data.createLike);
      setLikesCount(likesCount + 1);
    }catch (e) {
      console.log(e)
    }
  }

  const removeLike = async () => {
    try{
      await API.graphql(
        graphqlOperation(
          deleteLike, {input: {id: myLike.id}}
        )
      )
      setLikesCount(likesCount -1);
      setMyLike(null)
    }catch (e) {
      console.log(e)
    }
  }

  const onLikePress= async () => {
    // const likesToAdd = isLiked? -1 : 1;
    // setPost({
    //   ...post,
    //   likes: post.likes + likesToAdd
    // });
    // setIsLiked(!isLiked);
    if (!user) {
      return;
    }

    if (!myLike) {
      await submitLike();
    }else{
      await removeLike();
    }
    
  }

  const getVideoUri = async () => {
    if (post.videoUri.startsWith('http')) {
      setVideoUri(post.videoUri);
      return;
    }

    setVideoUri( await Storage.get(post.videoUri));
  }

  useEffect(() => {
    getVideoUri();
  },[])

  return (
    <View style={Styles.container}>
      <TouchableWithoutFeedback
      onPress={onPlayPausePress}
      >
      <Video
      source={{uri: videoUri}}
      style={Styles.backgroundVideo}
      resizeMode={'cover'}
      repeat= {true}
      paused={paused}
      />
      </TouchableWithoutFeedback>



      <View style={Styles.sideContainer}>
        <View style={Styles.profilePictureContainer}>
          <Image
          source={{uri: post.user.profilePicture}}
          style={Styles.profilePicture}
          />
        </View>

        <TouchableOpacity style={Styles.iconContainer} onPress={onLikePress}>
        <AntDesign
        name='heart'
        size={45}
        color={myLike? '#ff3333' : '#fff'}
        />
        <Text style={Styles.count}>{likesCount}</Text>
        </TouchableOpacity>

        <View style={Styles.iconContainer}>
        <FontAwesome
        name='commenting'
        size={40}
        color='#fff'
        />
        <Text style={Styles.count}>{post.comments}</Text>
        </View>

        <View style={Styles.iconContainer}>
        <Fontisto
        name='share-a'
        size={30}
        color='#fff'
        />
        <Text style={Styles.count}>{post.shares}</Text>
        </View>
      </View>

      {/* Bottom Container */}

      <View style={Styles.bottomContainer}>

      <View>
        <Text style={Styles.userName}>@{post.user.userName}</Text>
        </View>

        <View style={Styles.descContainer}>
        <Text style={Styles.description}>{post.description}</Text>
        </View>

        <View style={Styles.songNameView}>
          <Ionicons
          name='md-musical-notes'
          size={22}
          color='#fff'
          />

        <Text style={Styles.songName}>{post.song.name}</Text>

        <View style={Styles.songImageView}>
        <Image
          source={{uri: post.song.imageUri}}
          style={Styles.songImage}
          />
        </View>
        </View>

      </View>
      
    </View>
  )
};

export default Post;