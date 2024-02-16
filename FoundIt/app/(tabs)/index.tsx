import { StyleSheet, Button, TextInput} from 'react-native';
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native';    // OPtimizing Runtime and Memory for a list of things
import React, { useEffect, useState } from 'react'

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

import {addUserData, getUserData , getPosts, addPosts} from '../../services/firebaseService.js'


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;



export default function TabOneScreen() {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const searchPerson = (event) => {
    setSearchQuery(event.nativeEvent.text);
  };

  useEffect(() => {
    getPosts(searchQuery)
      .then(querySnapshot => {
        const postsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postsArray);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
      });
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <View style={styles.Body}>
        <Text style={styles.title}>Recent Posts</Text>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search..."
        value={searchQuery}
        onChange={searchPerson}
      />

      <View style={styles.separator}></View>
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
    flexDirection: 'column',
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

  searchBar:{
    height: 40,
    //width: screenWidth *0.9,
    borderColor: 'gray',
    //align: 'center',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 10,
  }

});


