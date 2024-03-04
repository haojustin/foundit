import React, { useState, useEffect } from 'react';
import { Image, TouchableOpacity, StyleSheet, TextInput, Dimensions, FlatList, RefreshControl } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ElegantHeader from "react-native-elegant-header";
import { Text, View } from '@/components/Themed';

import { getPosts } from '../../services/firebaseService';

export default function TabOneScreen() {
  const [posts, setPosts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const handleSearch = async () => {
    try {
      const results = await getPosts(searchQuery);
      const postsArray = results.map(result => ({
        id: result.id,
        ...result
      }));
      setPosts(postsArray);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    handleSearch().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <ElegantHeader title="Recent Posts" />
      <View style={styles.searchFunc}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Tags..."
          placeholderTextColor="white"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searhIconBackground}>
          <Icon name="search" size={30} color="black" />
        </TouchableOpacity>
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
      backgroundColor: '#f5f5f5',
    },
    searchFunc: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 10,
      marginBottom: 10,
    },
    searchBar: {
      flex: 1,
      height: 40,
      backgroundColor: "#A3A3A3",
      borderWidth: 2,
      borderColor: 'gray',
      borderRadius: 10,
      paddingLeft: 15,
      marginRight: 10,
      color: "white",
    },
    searhIconBackground: {
      backgroundColor: "cyan",
      borderRadius: 9,
      borderWidth: 2,
      borderColor: 'gray',
      padding: 2,
      justifyContent: 'center',
      alignItems: 'center',
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
  });