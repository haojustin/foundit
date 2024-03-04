import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getLocation } from './locationUtil';
import {addUserData, getUserData , getPosts, addPost, uploadMediaAsync} from '../../../services/firebaseService.js'

export default function Post() {
    const navigation = useNavigation();
    const [uploading, setUploading] = useState(false);
    const route = useRoute();

    const media = route.params?.media;
    const mediaArray = media || [];

    const [tags, setTags] = useState('');


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [reward, setReward] = useState('');
    const [lostFound, setLostFound] = useState('lost');
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    const userId = "0";
    const username = "John Smith";

    useEffect(() => {
        if (route.params?.selectedLocation) {
          setLocation(route.params.selectedLocation);
        }
        console.log("Selected media:", mediaArray);
      }, [route.params, mediaArray]);

    const handleAddLocation = () => {
        navigation.navigate('modal');
      };

      const handleSubmit = async () => {
        setUploading(true);
        try {
            const mediaUrls = await uploadMediaAsync(mediaArray.map(media => media.uri));

            // Ensure tags are trimmed, non-empty, and converted to lowercase
            const tagArray = tags.split(',')
                                 .map(tag => tag.trim().toLowerCase())
                                 .filter(tag => tag.length > 0);

            const postData = {
                title,
                description,
                reward,
                lostFound,
                location,
                media: mediaUrls,
                tags: tagArray, // Tags are now prepared for case-insensitive search
            };

            const postRef = await addPost(userId, username, postData);
            console.log('Post added with ID:', postRef.id);
            // Handle successful post submission
        } catch (error) {
            console.error('Failed to submit post:', error);
            // Handle submission errors
        } finally {
            setUploading(false);
            navigation.goBack();
        }
    };


    return (

        <ScrollView style={styles.container}>
            <TextInput
                style={styles.title}
                onChangeText={setTitle}
                value={title}
                placeholder="Title"
                placeholderTextColor={colors.darkGray}
            />
            {/* Media preview */}
            {mediaArray.map((item: { type: string; uri: any; }, index: React.Key | null | undefined) => (
                item.type === 'image' ? (
                    <Image key={index} source={{ uri: item.uri }} style={styles.mediaPreview} />
                ) : (
                    <Video key={index} source={{ uri: item.uri }} style={styles.mediaPreview} useNativeControls resizeMode="contain" isLooping />
                )
            ))}
            <View style={styles.lostFoundWrapper}>
                <TouchableOpacity
                    style={lostFound === 'lost' ? styles.lostFoundButtonSelected : styles.lostFoundButton}
                    onPress={() => setLostFound('lost')}>
                    <Text style={styles.text}>Lost</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={lostFound === 'found' ? styles.lostFoundButtonSelected : styles.lostFoundButton}
                    onPress={() => setLostFound('found')}>
                    <Text style={styles.text}>Found</Text>
                </TouchableOpacity>
            </View>
            {/* Additional photo upload and location indication */}
            <TouchableOpacity style={styles.additionalButton} onPress={() => {navigation.navigate('postfolder/two');}}>
                <Icon name="camera-plus" size={24} color={colors.lightGray} />
                <Text style={styles.text}>Add Media</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.additionalButton} onPress={handleAddLocation}>
                <Icon name="map-marker" size={24} color={colors.lightGray} />
                <Text style={styles.text}>Add Location</Text>
            </TouchableOpacity>

            {/* Display the selected location */}
            {location && (
                <View style={styles.locationDisplay}>
                    <Text style={styles.locationText}>Latitude: {location.latitude}</Text>
                    <Text style={styles.locationText}>Longitude: {location.longitude}</Text>
                </View>
            )}

            {lostFound === 'found' && (
                <View style={styles.tipContainer}>
                    <Text style={styles.tip}>
                        Tip: Leave out one identifying detail about the item so you can ask a claimant about it to confirm it is really theirs.
                    </Text>
                </View>
            )}

            <View style={styles.descriptionScrollView}>
                <TextInput
                    style={styles.description}
                    onChangeText={setDescription}
                    value={description}
                    placeholder="Description"
                    placeholderTextColor={colors.darkGray}
                    multiline={true}
                />
            </View>
            <View style={styles.tagInputContainer}>
                <TextInput
                    style={styles.tagInput}
                    onChangeText={setTags}
                    value={tags}
                    placeholder="Enter tags (comma-separated)"
                    placeholderTextColor={colors.lightGray}
                />
            </View>

            {lostFound === 'lost' && (
                <View style={styles.rewardWrapper}>
                    <Text style={[styles.text, { alignSelf: 'center' }]}>Reward: $</Text>
                    <TextInput
                        style={styles.reward}
                        onChangeText={setReward}
                        value={reward}
                        placeholder='0'
                        placeholderTextColor={colors.darkGray}
                        keyboardType='numeric'
                    />
                </View>
            )}

            <TouchableOpacity style={styles.post} onPress={handleSubmit}>
                <Text style={styles.text}>Post</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

// Assuming colors are defined within this component, else import from a separate file
const colors = {
    darkGray: '#3b3b3b',
    lightGray: '#cccccc',
    blue: '#0000FF',
};

// Updated styles based on the suggestions
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    mediaPreview: {
        width: '100%',
        height: Dimensions.get('window').width * (3/4),
        resizeMode: 'contain', // or 'cover'
        marginBottom: 20,
    },

    title: {
        fontSize: 22,
        color: '#333',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    additionalButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        marginVertical: 5,
    },
    locationDisplay: {
        marginTop: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
    },
    locationText: {
        fontSize: 14,
        color: colors.darkGray,
    },
    tipContainer: {
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
    },
    tip: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    lostFoundWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    lostFoundButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    lostFoundButtonSelected: {
        backgroundColor: '#8ABED1',
        borderColor: 'transparent',
        flex: 1,
        paddingVertical: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
    },
    text: {
        fontSize: 16,
        color: '#333',
    },
    divider: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginVertical: 20,
    },
    descriptionScrollView: {
        maxHeight: 200,
        marginVertical: 20,
    },
    description: {
        fontSize: 16,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        textAlignVertical: 'top', // Ensure text aligns top for multiline input
    },
    rewardWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    reward: {
        fontSize: 16,
        flex: 1,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginLeft: 10,
    },
    post: {
        paddingVertical: 12,
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    tagInputContainer: {
        marginTop: 10,
      },
    tagInput: {
        fontSize: 16,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        color: '#333',
    },
});
