

import React, {Component} from 'react';
import {TouchableOpacity , Image} from 'react-native'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import App from '../App'
import ShowInfo from '../Screens/ShowInfo'
import mainScreen from '../Screens/mainScreen'

const AppNavigator = createStackNavigator({
    Home: {
      screen: mainScreen ,    
      navigationOptions : {
        title: 'HOME', 
        headerStyle: {
            backgroundColor: '#F5FCFF'
          },
      },    
    }
    ,
    ScreenInfo:{
      screen: ShowInfo,
      backgroundColor: '#F5FCFF'

    }   
  },
  {headerLayoutPreset:'center'} ,
   );
  
  const AppContainer = createAppContainer(AppNavigator);
  export default AppContainer ; 
  