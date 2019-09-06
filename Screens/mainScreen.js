import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View , FlatList , ActivityIndicator , TouchableOpacity , Image , SafeAreaView , Modal , Dimensions , BackHandler} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import FlatListCard from '../Components/FlatListCard' ;
import Icon from 'react-native-vector-icons/FontAwesome';

 var self = null ; 
 var heightShow = 0 ;

 var pageWidth = Dimensions.get('screen').width ; 

 const back = (
     <Icon 
     name={'back'}
     size={30}
     />
 )


export default class MainScreen extends Component<Props> { 


    constructor(props){
        super(props) ; 
        
        self = this ;

        this.state = {
          data: [] , 
          FlatListData : [] ,
          loading: true , 
          search:false ,
          query:'',
          result : false ,
        }
      }

      static navigationOptions = ({ navigation, navigationOptions }) => {
        const { params } = navigation.state;

    
        return {
          /* These values are used instead of the shared configuration! */
          headerLeft:(
             
            <TouchableOpacity style={{marginLeft:10}} onPress={ navigation.getParam('headerClick') }>
                <Icon name={'search'} size={30} color={'black'} />
            </TouchableOpacity>       
        ) ,
        headerRight:(
            <TouchableOpacity style={{marginRight:15}} onPress={ navigation.getParam('headerClickRight') }>
            <Icon name={'home'} size={30} color="black"/>
        </TouchableOpacity>      
        )
       
        };
      };

      onAutoCopmlitePress(films , item ){
        this.setState({ 
            query: '' , //item.name ,
            search:false ,
            FlatListData: [item],
            result: true ,
                }) 
            // this.props.navigation.setParams({ headerClick: this.headerClick.bind(this) })
      }
    
      getShosFromApi() {
        return fetch('http://api.tvmaze.com/shows')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              data : responseJson ,
              FlatListData : responseJson ,
              loading: false ,
            })
          })
          .catch((error) => {
            console.error(error);
          });
      }

      refreshHome(){
          this.setState({FlatListData : this.state.data})
      }
    
      findFilm(query) {
        if (query === '') {
          return [];
        }
        const { data } = this.state;
        const regex = new RegExp(`${query.trim()}`, 'i');
        return data.filter( film => film.name.search(regex) >= 0);
      }
    
      componentDidMount(){

        this.getShosFromApi()
        
        this.props.navigation.goBack( () => {
            var x = 0 ; 
        })
        this.props.navigation.setParams({ headerClick: this.headerClick.bind(this) });

        this.props.navigation.setParams({ headerClickRight: this.refreshHome.bind(this) });


        BackHandler.addEventListener('hardwareBackPress' , () => {
            if ( this.state.search){
                this.setState({search:false}) 
                return true ;
             }
             this.setState({ FlatListData: this.state.data})  
             return false ;  
        })
      }

      headerClick(){
        this.setState({search:!this.state.search})
      }
    
      goToInfo(item){
        console.log('in'); 
        this.props.navigation.push('ScreenInfo' , {data: item}) 
      }

      handleSelectItem(item, index) {
        const {onDropdownClose} = this.props;
        this.setState({index:index})
        onDropdownClose();
        console.log(item);
      }
     

      render() {

        const { query } = this.state;
        const films = this.findFilm(query);
        const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
    
        const autocompletes = [...Array(10).keys()];
   
        const {scrollToInput, onDropdownClose, onDropdownShow} = this.props;

        const myStyle = Platform.OS == 'ios' ? styles.autocompleteContainer :{width:'100%'}

        heightShow =  ((20 * films.length) )

          if(this.state.loading)
            return (
              <View style={styles.container}>  
               <ActivityIndicator size="large" color="#0000ff" />
               </View>
               )
      
          return (
            <View style={styles.container}>
           
                <Modal visible={this.state.search} 
                    transparent={true}
                    presentationStyle='overFullScreen'
                    onRequestClose={ this.headerClick.bind(this)}
                >

                 <View style={styles.modal}>
                 <TouchableOpacity style={{  marginLeft:'80%'}} onPress={this.headerClick.bind(this)}>
                    <Icon
                        // style={{marginRight:15}}  
                        name="close"
                        size={pageWidth * 0.2} />
                </TouchableOpacity> 

                    <Autocomplete
                        placeholder="Enter Star Wars film title"
                        containerStyle={myStyle}
                        listContainerStyle={{opacity:1}}
                        listStyle={{opacity:1}}
                        data={films} 
                        defaultValue={this.state.query}
                        onChangeText={text => this.setState({ query: text })}
                        renderItem={({ item , i }) => (
                        <TouchableOpacity onPress={ this.onAutoCopmlitePress.bind(this,films , item)
                                    }>  
                                    
                            <Text>{item.name}</Text>
                            
                        </TouchableOpacity>
                   )} />

                
            </View>
        </Modal>
                
              <FlatList
              data={this.state.FlatListData}
              renderItem={({item}) =>
                <FlatListCard data={item} onPress={this.goToInfo.bind(this , item)}/> }
              />
        </View>     
          );
      }

}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      // alignItems: 'center',
      backgroundColor: '#F5FCFF', //
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
    autocompleteContainer: {
        // flex: 1,
        // left: 0,
        // position: 'absolute',
        // right: 0,
        // top: 0,
        width: pageWidth ,
        // zIndex: 999, 
        // height:40,
        // elevation: (Platform.OS === 'android') ? 50 : 0
        // marginTop:10
        // borderWidth:3, 
        // marginBottom:110 , 
        // backgroundColor:'red'
        // alignSelf:'flex-start',
        

      },
      modal:{
          backgroundColor:'gray',
          height: '100%' ,   //100 + heightShow,
          width:'100%',
        //   justifyContent: 'flex-end',
          alignItems: 'flex-start',
        //   flexDirection:'row'  , 
          opacity:0.95 , 
      }
  });
  
