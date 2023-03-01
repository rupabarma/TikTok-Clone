import { StyleSheet, Dimensions } from "react-native";

const Styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#000',
    },
    stackIcon:{
        // paddingLeft: 10,
        // alignItems: 'flex-start',
        // display:'flex',
        // flexDirection:'row',
        // width: 20,
        // height: 20,
        position: 'absolute',
        top: 20,
        left: 10,
        // marginTop: 15,
        // backgroundColor: 'transparent'
        // marginLeft: 10,
        // justifyContent:'flex-start',
    },
    preview:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonRecord:{
        position: 'absolute',
        bottom: 10,
        left: '40%',
        width: 80,
        height: 80,
        borderRadius: 80/2,
        borderWidth: 8,
        borderColor: '#ff404087',
        // alignSelf: 'center',
        // marginVertical: 10,
        backgroundColor: '#ff4343'
    },
    buttonStop:{
        position: 'absolute',
        bottom: 20,
        left: '46%',
        width: 30,
        height: 30,
        // alignSelf: 'center',
        // marginVertical: 20,
        backgroundColor: '#ff4343'
    },
})

export default Styles;