import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, StyleSheet, TextInput, Dimensions, FlatList, RefreshControl, Appearance, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text, View } from '@/components/Themed';
import {CUSTOMCOLORS} from '../../constants/CustomColors';

import { getPosts } from '../../services/firebaseService';

export default function TabOneScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = async () => {
    try {
      const results = await getPosts(searchQuery);
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
    <View style={[styles.container, styles.testBorder]}>
      <Text style={[styles.recentPostsHeader, styles.testBorder]}>Recent Posts</Text>
      <View style={[styles.searchFunc, styles.testBorder]}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search tags"
          placeholderTextColor={CUSTOMCOLORS.lightGray}
          value={searchQuery}
          onChangeText={setSearchQuery}
		      cursorColor={CUSTOMCOLORS.lightPurple}
		      selectionColor={CUSTOMCOLORS.lightPurple}
        />
		{/*
        <TouchableOpacity onPress={handleSearch} style={styles.searhIconBackground}>
          <Icon name="search" size={30} color={CUSTOMCOLORS.darkPurple} />
        </TouchableOpacity>
		*/}
      </View>

	  <View style={styles.divider}></View>

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
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: CUSTOMCOLORS.offWhite,
	  padding: 10,
    },
	testBorder: {
		borderWidth: 0,
		borderColor: 'red',
	},
	divider: {
		borderBottomWidth: 1,
		borderColor: CUSTOMCOLORS.lightPurple,
		marginVertical: 10,
	},

	recentPostsHeader: {
		alignSelf: 'center',
		fontWeight: 'bold',
		color: CUSTOMCOLORS.darkGray,
		fontSize: 20,
		margin: 10,
	},

    searchFunc: {
      flexDirection: 'row',
      alignItems: 'center',
		margin: 10,
		height: 40,
		backgroundColor: 'transparent',
		alignSelf: 'center',
	  width: '80%',
    },
    searchBar: {
      flex: 1,
      height: 30,
      borderBottomWidth: 1,
      borderColor: CUSTOMCOLORS.darkPurple,
	  paddingHorizontal: 5,
	  fontSize: 15,
    },
    searhIconBackground: {
      backgroundColor: CUSTOMCOLORS.lightPurple,
	  height: 40,
	  width: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },

	flatList: {
		margin: 10,
	},
    block: {
      backgroundColor: CUSTOMCOLORS.veryLightPurple,
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
	  //borderWidth: 1,
	  /*
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
	  */
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
	/*
	rewardText: {
      fontSize: 16,
      color: '#FFA500',
      fontWeight: 'bold',
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
	*/
	lostItemBorder: {
		borderColor: CUSTOMCOLORS.lostRed,
	},
	foundItemBorder: {
		borderColor: CUSTOMCOLORS.foundYellow,
	},
	returnedItemBorder: {
		borderColor: CUSTOMCOLORS.returnedGreen,
	},
    postContent: {
      flex: 1,
    },
    
    locationText: {
      fontSize: 14,
      color: '#777',
      marginBottom: 5,
    },
    
  });
