import { 
    View,
    Text,
    FlatList,
    Dimensions,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Post from '../../components/post/Post'
// import posts from '../../../data/posts';
import {API, graphqlOperation} from 'aws-amplify';
import { listPosts } from '../../graphql/queries';

const HomeScreen = () => {

  const [posts,setPosts] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      //fetch all posts
      try{
        const response = await API.graphql(graphqlOperation(listPosts));
        // console.log(response)
        setPosts(response.data.listPosts.items);
      } catch(e) {
        console.error(e);
      }
    };
    fetchPost();
  }, [])
  return (
    <View>
      <FlatList
      data={posts}
      renderItem={({item}) => <Post post={item}/>}
      showsVerticalScrollIndicator={false}
      snapToInterval={Dimensions.get("window").height -48}
      snapToAlignment={'start'}
      decelerationRate={'fast'}
      />
      
    </View>
  )
}

export default HomeScreen;