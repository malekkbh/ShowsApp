import  React, { Component } from 'react'
import {View , Image , Text , StyleSheet , TouchableOpacity , Platform} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import RatingBar from './Rating'

var borderR =  Platform.OS  == 'ios' ? 10 : 3 ;

export default class FlatListCard extends Component {


    goToInfo(){
        this.props.navigation.push('ShowInfo' , {data: this.props.data}) 
    }
 
    render() {
        return (
            <TouchableOpacity elevation={5} style={styles.container} onPress={this.props.onPress}>

                <Image style={styles.image } source={{uri : this.props.data.image.medium }} resizeMode={'stretch'}/>  

                    <Text style={styles.title} >{this.props.data.name.trim()}</Text>
           

                <RatingBar data={this.props.data}/>

                
                
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container:{
    // elevation:10 , 
    // shadowColor: '#000000',
    // shadowOffset: {
    // width: 1,
    // height: 1 , 
    // },
    // shadowRadius: 5,
    // shadowOpacity: 0.9,     
    borderWidth:1 ,
    width:'92%' ,
    justifyContent:'center' , 
    marginTop:10 , 
    borderRadius:30 , 
    alignSelf:'center' ,
    backgroundColor:'white' 
    },
    title:{
        flex:0 , 
         textAlign:'left',
         fontSize:18 ,
         width: '100%' ,
         fontWeight:'bold'  ,
         paddingLeft:'3%' ,
         paddingTop:'1%' , 
        //  left:10 ,
        //  borderWidth:1 
    },
    image:{
        width: '93%', 
        height:300 , 
        borderRadius: borderR , 
        marginTop:'3%', 
        alignSelf:'center'  
    }
})

