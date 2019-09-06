import React, { Component } from 'react';
import {Text ,View , Image , StyleSheet , ScrollView , Dimensions} from 'react-native'
import RatingBar from '../Components/Rating'

var pageHeight = Dimensions.get('window').height;

export default class ShowInfo extends Component {


    static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;
    
        return {
          title: params.data.name,
          /* These values are used instead of the shared configuration! */

        };
      };

    componentDidMount() {
        this.props.navigation.goBack( () => {
            var x = 0 ; 
        })
    }
    

    render(){
        let str = '' ; 
        let strDays = '' ;
        let {data} = this.props.navigation.state.params ; 
        const regex = /(<([^>]+)>)/ig;
        const result = data.summary.replace(regex, '');

        return (
            
            <ScrollView style={[ styles.container ,{}]}>  
             <View style={styles.container} >

                <Image style={styles.image} source={{uri: data.image.original}} resizeMode={'stretch'}/>

                    <RatingBar data={data}/>

                <Text style={styles.titleText}>Summary: {" "}
                    <Text style={styles.innerText}>{result}</Text>
                </Text>

                <Text style={styles.titleText}>Genres:{" "}
                {data.genres.forEach(i => {
                    str += i  + ', ' ; 
                })}
                <Text style={styles.innerText}>{str}</Text>
                </Text>

                <Text style={styles.titleText}>Schedule: {" "}
                    { data.schedule.days.forEach(i => {
                        strDays += i + ', ' ;
                    })}
                    <Text style={styles.innerText}>{strDays} {'At: ' + data.schedule.time}</Text> 
                </Text>

                <Text style={styles.titleText}>Network: {' '}
                    <Text style={styles.innerText}>
                    {data.network.name + ", " + data.network.country.code + ', ' + data.network.country.timezone}
                    </Text>
                </Text>

                <Text style={[styles.titleText, {marginBottom:15}]}>Language: {' '}
                    <Text style={[styles.innerText, ]}>{data.language}</Text>
                </Text>  
              </View>   
            </ScrollView>
          
        );  
    }


}

const styles = StyleSheet.create({
    image:{
        height: pageHeight * 0.65 ,   
        width: '100%' ,
        marginBottom: 15 , 
    },
    container:{
       width:'100%' ,
       height:'100%' ,
    //    backgroundColor:'blue'
    },
    titleText:{
        textAlign:'right' ,
        marginRight: 15  ,
        fontWeight:'bold',
        marginTop:10 , 
    }, 
    innerText:{
        fontWeight:'normal'
    }
})

