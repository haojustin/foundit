import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native'; //Scrolling up and down
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native';    // OPtimizing Runtime and Memory for a list of things

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.Body}>
        <Text style={styles.title}>Recent Posts</Text>
      </View>
      <View style={styles.separator}></View>

      <FlatList
        data={postsData}
        renderItem={({ item }) => (
          <View style={styles.blocksContainer}>

            <View style={styles.block}>
              <Text style={styles.inblocktitle}>{item.title}</Text>
              <Text style={styles.inblocktext}>{item.content}</Text>
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

});


const postsData = [
  { id: 1, title: 'Post 1', content: 'This is the content of post 1' },
  { id: 2, title: 'Post 2', content: 'This is the content of post 2' },
  { id: 3, title: 'Post 3', content: 'This is the content of post 3' },
  // ... more posts
];