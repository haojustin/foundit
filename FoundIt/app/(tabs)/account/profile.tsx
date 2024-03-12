import { StyleSheet, Image, Button, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl} from 'react-native';
import { Text, View } from '@/components/Themed';
import React, {useEffect, useState} from 'react';
import { Dimensions } from 'react-native';
import {addUserData, getUserData , getPosts, addPost} from '../../../services/firebaseService.js'
import { useUser } from '../../../constants/UserContext';
import { FlatList,  Appearance, StatusBar  } from 'react-native';
import {CUSTOMCOLORS} from '../../../constants/CustomColors';


const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export default function TabOneScreen({}) {
  const { user: currentUser } = useUser();
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = async () => {
    try {
      const results = await getPosts('john smith');
      const postsArray = await Promise.all(results.map(async (result) => {
        const { latitude, longitude } = result.location;
        const address = await fetchAddress(latitude, longitude);
        return {
          id: result.id,
          address,
          ...result
        };
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

	useEffect(() => {
		Appearance.setColorScheme('light');
		StatusBar.setBarStyle('dark-content');
	}, []);

  // Function to fetch address from Google Geocoding API
  const fetchAddress = async (latitude, longitude) => {
    console.log("fetchAddress");
    try {
      console.log("latitude", latitude);
      console.log("longitude", longitude);
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBCs6VRQAtgywJkLYMSQR2B5We3kAIwUUo`);
      const data = await response.json();
      console.log("waiting on response");
      if (data.results && data.results.length > 0) {
        console.log("success fetchAddress");
        return data.results[0].formatted_address;
      }
    } catch (error) {
      console.log("error");
      console.error('Error fetching address:', error);
    }
    console.log("return null");
    return null;
  };


  return (
    <View style={styles.profile}>
            <View>
        <TouchableOpacity style={styles.imageBackground}>
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
      <View style={[styles.container, styles.testBorder]}>
      <FlatList
        data={posts}
		style={[styles.flatList, styles.testBorder]}
		showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          //<View style={[styles.block, item.lostFound === 'lost' ? styles.lostItemBackground : styles.foundItemBackground, styles.testBorder]}>
          <View style={[styles.testBorder, styles.block, item.lostFound === 'returned' ? styles.returnedItemBackground : styles.block, item.lostFound === 'lost' ? styles.lostItemBorder : styles.foundItemBorder]}>
			<View style={[styles.testBorder, styles.titleWrapper]}>
				<Text style={[styles.testBorder, styles.inblocktitle]}>{item.title}</Text>
				<Text style={[styles.testBorder, styles.inblockstatus, 
					item.lostFound === 'returned' ? 
						styles.statusReturnedBackground : (item.lostFound === 'lost' ? 
							styles.statusLostBackground : styles.statusFoundBackground
						)]}>
							{item.lostFound === 'returned' ? 'Returned' : (item.lostFound === 'lost' ? 'Lost' : 'Found')}
				</Text>
			</View>
            {item.media && item.media.length > 0 && (
              <Image source={{ uri: item.media[0] }} style={[styles.testBorder, styles.postImage]} resizeMode="cover" />
            )}
            {/*<Text style={[styles.inblocktext, item.lostFound === 'lost' ? styles.lostTextBackground : styles.foundTextBackground]}>{item.description}</Text>*/}
            <Text style={[styles.testBorder, styles.inblocktext]}>{item.description.trim()}</Text>

			<View style={styles.divider}></View>

            {item.lostFound === 'lost' && item.reward && <Text style={styles.inblocktext}>Reward: ${item.reward}</Text>}
            {item.address && <Text style={styles.inblocktext}>Location: {item.address}</Text>}
            <Text style={styles.inblocktext}>Date: {new Date(item.postTime?.seconds * 1000).toLocaleDateString("en-US")}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CUSTOMCOLORS.offWhite,
  padding: 10,
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
    backgroundColor: CUSTOMCOLORS.offWhite,
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
    borderWidth: 1,
    borderRadius: 130/2,
    overlayColor: CUSTOMCOLORS.offWhite,
  },
  imageBackground : {
    backgroundColor: CUSTOMCOLORS.offWhite,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: CUSTOMCOLORS.offWhite,
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
  lostItemBorder: {
		borderColor: CUSTOMCOLORS.lostRed,
	},
	foundItemBorder: {
		borderColor: CUSTOMCOLORS.foundYellow,
	},
	returnedItemBorder: {
		borderColor: CUSTOMCOLORS.returnedGreen,
	},
  titleWrapper: {
    //flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    marginBottom: 5,
  },
  inblocktitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 5,
    color: CUSTOMCOLORS.darkGray,
    flexShrink: 1,
  },
  inblockstatus: {
    fontSize: 15,
    fontWeight: 'bold',
    color: CUSTOMCOLORS.darkGray,
    margin: 5,
    borderRadius: 20,
    paddingVertical: 1,
    paddingHorizontal: 10,
  },
    statusLostBackground: {
    backgroundColor: CUSTOMCOLORS.lostRed,
  },
    statusFoundBackground: {
    backgroundColor: CUSTOMCOLORS.foundYellow,
  },
    statusReturnedBackground: {
    backgroundColor: CUSTOMCOLORS.returnedGreen,
  },
  postImage: {
    width: 'auto',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 10,
  },
  inblocktext: {
    fontSize: 15,
    margin: 5,
    color: CUSTOMCOLORS.darkGray,
  },
  flatList: {
    margin: 10,
  },
  block: {
    backgroundColor: CUSTOMCOLORS.veryLightPurple,
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  testBorder: {
    borderWidth: 0,
    borderColor: 'red',
  },
});
