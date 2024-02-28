  import { TouchableOpacity, StyleSheet, Button, TextInput} from 'react-native';
  import { Dimensions } from 'react-native';
  import { FlatList } from 'react-native';    // OPtimizing Runtime and Memory for a list of things
  import React, { useEffect, useState } from 'react'
  import Icon from 'react-native-vector-icons/MaterialIcons';           //React Native Vector Icons
  import ElegantHeader from "react-native-elegant-header";

  
  import EditScreenInfo from '@/components/EditScreenInfo';
  import { Text, View } from '@/components/Themed';

  import {addUserData, getUserData , getPosts, addPosts} from '../../services/firebaseService.js'


  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;



  export default function TabOneScreen() {
    const [posts, setPosts] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = () => {
      getPosts(searchQuery)
          .then(results => {
            const postsArray = results.map(result => ({
                id: result.id,
                ...result
            }));
            setPosts(postsArray);
          })
          .catch(error => {
              console.error("Error fetching posts:", error);
          });
    };

    useEffect(() => {
      handleSearch()
    }, [searchQuery]);

    return (
      <View style={styles.container}>
        <View style={styles.Body}>
          <ElegantHeader
            title = "Recent Posts"
            />
        </View>

        <View style={styles.searchFunc}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search For Something..."
            placeholderTextColor="white"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
          />
          <View style={styles.searhIconBackground}>
            <TouchableOpacity onPress={handleSearch}>
              <Icon name="search" size={30} color="black" />
            </TouchableOpacity>
          </View>
          
        </View>

        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.blocksContainer}>
              <View style={styles.block}>
                <Text style={styles.inblocktitle}>{item.Title}</Text>
                <Text style={styles.inblocktext}>{item.Description}</Text>
                <Text style={styles.inblocktitle}>Date: {item.Date}</Text>
              </View>

            </View>
          )}
          keyExtractor={(item) => item.id.toString()} // Assuming each post has a unique id
        />
        
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    Body: {
      flex: 0,
      flexDirection: 'row',
      alignItems: 'baseline',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Palatino',
      marginLeft: 0,
      marginTop: 0,
      color: '#2551FF',
    },
    separator: {
      marginVertical: 10,
      height: 1,
      width: '80%',
      color: 'yellow'
    },
    blocksContainer: {
      flex:0,
      flexDirection: 'column', // Aligns blocks horizontally
      alignItems: 'center',
      justifyContent: 'space-around', // Adjusts spacing between blocks
      marginVertical: 5,
    },
    block:{
      width: screenWidth *0.9,  // Width of the block
      height: screenHeight /7, // Height of the block
      backgroundColor: 'pink',
      margin: 0,
      borderRadius: 15,
      borderWidth: 1, 
      borderColor: 'black',
      padding: 10,
      
      shadowColor: '#000',        // Color of the shadow
      shadowOffset: { width: 5, height: 5}, // x, y offset of the shadow
      shadowOpacity: 0.25,        // Opacity of the shadow
      shadowRadius: 4,         // Blur radius of the shadow
      elevation: 5, 
    },
    inblocktitle:{
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: 'Times New Roman',
      color: 'black',
      textDecorationLine: 'underline',
    },
    inblocktext:{
      fontSize: 15,
      fontFamily: 'Times New Roman',
      color: 'black',
      padding: 5,
    },
    searchFunc: {
      flexDirection: 'row', // Aligns children (TextInput and Button) in a row
      alignItems: 'center',
      padding:10, // Add some padding if needed
    },
    searchBar:{
      flex: 1,
      height: 40,
      color: "white",

      borderColor: 'gray',    
      backgroundColor: "#A3A3A3",
      borderWidth: 2,
      borderRadius: 10,
      paddingLeft: 15,
      marginRight: 10,
    },
    searhIconBackground:{
      height: 35,
      backgroundColor : "cyan",
      borderRadius: 9,
      borderWidth: 2, 
      borderColor: 'gray',
      padding: 2
    }
  });


