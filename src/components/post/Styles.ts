import { StyleSheet, Dimensions } from "react-native";

const Styles = StyleSheet.create({
    container:{
        width: '100%',
        height: Dimensions.get("window").height -48
        // flex: 1,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        // width: 395,
        // height: 755
      },
      bottomContainer:{
        width: '100%',
        // aspectRatio: 16/5,
        position: 'absolute',
        bottom: 0,
        paddingLeft: 15,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'flex-end'
      },
      sideContainer:{
        width:'20%',
        height: '45%',
        position: 'absolute',
        right: 0,
        top: '40%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      userName:{
        fontSize: 20,
        fontWeight: '600',
        color: '#fff'
      },
      descContainer:{
        width: '60%',
        paddingVertical: 10
      },
      description:{
        fontSize: 16,
        fontWeight: 'normal',
        color: '#fff'
      },
      songNameView:{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      songName:{
        fontSize: 16,
        color: '#fff',
        marginLeft: 5
      },
      songImageView:{
        width: 65,
        height: 65,
        borderRadius: 65/2,
        borderWidth: 15,
        borderColor: '#262626',
        position: 'absolute',
        right: 5,
        bottom: 2
      },
      songImage:{
        width: 36,
        height: 36,
        borderRadius: 36/2,
      },
      profilePictureContainer:{
        width: '100%',
        height: '24%',
        alignItems: 'center',
      },
      profilePicture:{
        width: 60,
        height: 60,
        borderRadius: 60/2,
        borderWidth: 3,
        borderColor: '#fff'
      },
      iconContainer:{
        width: '100%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      count:{
        color: '#fff',
        fontWeight: '700',
        fontSize: 17
      },

});

export default Styles;