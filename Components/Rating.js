import React from 'react';
import {View , Text , Platform } from 'react-native' ; 
import Icon from 'react-native-vector-icons/FontAwesome';

function renderRating(props){
    let {average} = props.data.rating
    var arr = [] ; 
    var r = Math.round(average/2)
    for(var i = 0 ; i < r ; i++ ){ 
        arr.push(<Icon name="star" size={30} color="#FFD700" />)
    }

    if(average < 10 ){
        var i = (5 - r) ;
        for(var j = 0 ; j< i ; j++){  
            arr.push(<Icon name="star-o" size={30} color="black" />) 
        } 
    }

   return arr ;  
}

const RatingBar = props => {
    var margin = Platform.OS == 'ios' ? {marginTop: 14 ,} : ''
    return (
        <View style={{ flexDirection:'row' ,justifyContent:'flex-start' , paddingLeft:'3%' , paddingBottom:'1%' 
            }}>
                    {renderRating(props)}   
                    <Text style={[{textAlignVertical:'bottom' ,  } , margin]}>{ "  " +   props.data.rating.average}</Text> 

                </View>
    )
}

export default RatingBar ;