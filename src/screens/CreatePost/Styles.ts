import { StyleSheet, Dimensions } from "react-native";

const Styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: 'space-between',
    },
    textInput:{
        backgroundColor:'#fff',
        marginTop: 5
    },
    button:{
        // width: 100,
        height: 50,
        // borderRadius: 20,
        backgroundColor: '#ff4343',
        // alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default Styles;