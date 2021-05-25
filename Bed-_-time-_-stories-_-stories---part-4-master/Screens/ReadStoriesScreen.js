import React from 'react'; 
import { StyleSheet, Text, View ,TextInput,Image,ScrollView,Button,FlatList,TouchableOpacity
} from 'react-native'; 
import { SearchBar } from 'react-native-elements';
import AppHeader from '../Screens/AppHeader'
import db from '../config'

export default class ReadStoriesScreen extends React.Component{
    constructor(){
        super();
        this.state={
          search:"",
          allStories:[],
          last_updated_story:null
        }
    }
     
   componentDidMount = async()=>{
       const Stories_Refer_Firestore_Docs = await db.collection("All stories")
       .limit(10)
       .get();
       Stories_Refer_Firestore_Docs.docs.map((doc)=>{
            this.setState({
                allStories : [...this.state.allStories, doc.data()], 
                last_updated_story:doc
            })
        });

    }


    search_Filter_Function = async() =>{
         if(this.state.search.toUpperCase() === "B"){

      const search = this.state.search

      const transaction_collection_bookId =  await db.collection("All stories")
      .where('storyTitle','==',search).get()



        transaction_collection_bookId.docs.map((doc)=>{
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction: doc
          })

        })
    }
    
    }
    

    render(){
    
    if(this.state.search===''){
     return(
            <View style={{backgroundColor:"pink",height:700,flex: 1}}>
            <AppHeader/>
            <SearchBar 
            onChangeText={(search)=>{
            this.setState({search:search})
            }}
            value={this.state.search}
            placeHolder = "Search a Book"
           
            />
         
             <FlatList
          data={this.state.allTransactions}
          renderItem={({item})=>(
             <View style={{borderBottomWidth: 2}}>
              <Text>{"Author: " + item.Author}</Text>
              <Text>{"StoryTitle: " + item.storyTitle}</Text>
              </View>
         
          )}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
        /> 
    
            
            </View>
        )
    } else if(this.state.search!==''){
      return(
            <View style={{backgroundColor:"pink",height:700,flex: 1}}>
            <AppHeader/>
            <SearchBar 
            onChangeText={(search)=>{
            this.setState({search:search})
            }}
            value={this.state.search}
            placeHolder = "Search a Book"
           
            />
         
          <TouchableOpacity style={{
            backgroundColor:"lightgreen",
            marginLeft:100,
            marginTop:30,
            borderRadius:22,
            borderWidth:4,
            width:100,
            height:45
                        }} 
          onPress={()=>{
            this.search_Filter_Function()
          }}
          >
          <Text style={{textAlign:"center",marginTop:5}}>Search</Text>
           </TouchableOpacity>

             <FlatList
          data={this.state.allTransactions}
          renderItem={({item})=>(
             <View style={{borderBottomWidth: 2}}>
              <Text>{"Author: " + item.Author}</Text>
              <Text>{"StoryTitle: " + item.storyTitle}</Text>
              </View>
         
          )}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
        /> 
    
            
            </View>
        )
    }

    }
}

const styles = StyleSheet.create({
     textInput:{
      borderWidth:4,
      borderRadius:2,
      width:450,
      height:50,
      marginTop:20,
      marginLeft:450
    },

    text:{
         fontSize:22,
         textAlign:"center",
         marginTop:180,
    },
     
   logo:{
       marginLeft:1100,
       marginTop:-100,
       width:100,
       height:100,
       borderWidth:1,
      borderRadius:100,
   },
   logo1:{
       marginLeft:200,
       marginTop:-470,
       width:100,
       height:100,
       borderWidth:1,
      borderRadius:100,
   },
    item: {
    backgroundColor: '#fcc7ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
})