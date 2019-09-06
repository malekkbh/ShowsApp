/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View , FlatList , ActivityIndicator} from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import FlatListCard from './Components/FlatListCard' ;
import ShowInfo from './Screens/ShowInfo' ; 
import AppContainer from './Routes/nav'

type Props = {};

export default class App extends Component<Props> { 

  
  
  render() {
    return(
      <View style={{flex:1}}>
          <AppContainer/>   
          <View style={styles.footer}>
            <Text style={styles.text} >Malek Kabaha <Text style={{fontSize:12 }}>®</Text> </Text> 
          </View> 
      </View>
      
    )
  }
 
}

const styles = StyleSheet.create({
  footer:{
    height:50 , 
    backgroundColor:'#cde7f0'  , 
    zIndex:9 ,
    alignContent:'center' ,
    justifyContent:'center',
  }, 
  text:{
    textAlign:'center' , 
    color:'white' , 
    fontWeight:'bold',
    fontSize:20 ,
    color:'black'

  }
});

