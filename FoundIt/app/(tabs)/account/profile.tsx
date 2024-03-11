import { StyleSheet, Image, Button, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl} from 'react-native';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import React, {useEffect, useState} from 'react';
import {getUserByDocId} from '../../../services/firebaseService.js';
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import {addUserData, getUserData , getPosts, addPost} from '../../../services/firebaseService.js'
import { FlatList } from 'react-native';
import { useUser } from '../../../constants/UserContext';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export default function TabOneScreen({}) {
  const { user: currentUser } = useUser();
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = async () => {
    try {
      const results = await getPosts('john smith');
      const postsArray = results.map(result => ({
        id: result.id,
        ...result
      }));
      setPosts(postsArray);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleSearch().then(() => setRefreshing(false));
    console.log(currentUser)
  }, []);

    useEffect(() => {
      handleSearch()
    }, [searchQuery]);

  const [johnSmithsId, setJohnSmithsId] = React.useState('2j9pC69JqbZ0MqUyYCV6');
	const [user, setUser] = React.useState({});

	const getUser = async () => {
    const docSnap = await getUserByDocId(johnSmithsId);
		setUser(docSnap.data());
		console.log(user);
	};
	
  useFocusEffect(
		React.useCallback(() => {
			getUser();
		}, [])
	);


  return (
    <View style={styles.profile}>
            <View>
        <TouchableOpacity>
          <Image style={styles.profileImage}
            source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png' }}/>
        </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>
          {currentUser?.displayName || 'Guest User'}
        </Text>
      <View style={styles.divider}>
      <View style={styles.hrLine} />
      <Text style={styles.dividerText}>My Post</Text>
      <View style={styles.hrLine} />
    </View>
    <FlatList
        data={posts}
        renderItem={({ item }) => (
          <View style={[styles.block, item.lostFound === 'lost' ? styles.lostItemBackground : styles.foundItemBackground]}>
            <Text style={styles.inblocktitle}>{item.title}</Text>
            {item.media && item.media.length > 0 && (
              <Image source={{ uri: item.media[0] }} style={styles.postImage} resizeMode="cover" />
            )}
            <Text style={[styles.inblocktext, item.lostFound === 'lost' ? styles.lostTextBackground : styles.foundTextBackground]}>{item.description}</Text>
            {item.lostFound === 'lost' && item.reward && <Text style={styles.rewardText}>Reward: ${item.reward}</Text>}
            {item.location && <Text style={styles.locationText}>Location: Lat {item.location.latitude}, Long {item.location.longitude}</Text>}
            <Text style={styles.inblocktext}>Date: {new Date(item.postTime?.seconds * 1000).toLocaleDateString("en-US")}</Text>
            <Text style={styles.inblockstatus}>{item.lostFound === 'lost' ? 'Lost' : 'Found'}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  profile: {
    paddingTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
   
  },
  profileName: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },
  profileBio:{
    marginTop: 8,
    fontSize: 17,
    color: "#989898",
    textAlign: 'center',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 9999,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  hrLine: {
    width: screenWidth / 3,
    backgroundColor: 'black',
    height: 1,
  },
  dividerText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 21,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  postImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  inblocktitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inblocktext: {
    fontSize: 16,
    marginBottom: 5,
  },
  lostItemBackground: {
    backgroundColor: '#FFEEEE',
  },
  foundItemBackground: {
    backgroundColor: '#EEEEFF',
  },
  lostTextBackground: {
    backgroundColor: '#FFEEEE',
    padding: 5,
    borderRadius: 5,
  },
  foundTextBackground: {
    backgroundColor: '#EEEEFF',
    padding: 5,
    borderRadius: 5,
  },
  postContent: {
    flex: 1,
  },
  inblockstatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4D96FF',
    alignSelf: 'flex-end',
  },
  locationText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  rewardText: {
    fontSize: 16,
    color: '#FFA500',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  block: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});
