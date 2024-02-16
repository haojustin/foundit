import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video } from 'expo-av'; // Import Expo AV for video playback
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Ensure you have this library installed

export default function Post() {
    const navigation = useNavigation();
    const route = useRoute();

    const media = route.params?.media;

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [reward, setReward] = useState('');
    const [lostFound, setLostFound] = useState('lost');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                    <Text style={{ color: colors.blue, fontSize: 18 }}>Back</Text>
                </TouchableOpacity>
            ),
            headerLeftContainerStyle: {
                paddingLeft: 10,
            },
        });
    }, [navigation]);

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
            {media?.uri && (
                media.type === 'image' ? (
                    <Image source={{ uri: media.uri }} style={styles.mediaPreview} />
                ) : (
                    <Video
                        source={{ uri: media.uri }}
                        style={styles.mediaPreview}
                        useNativeControls
                        resizeMode="contain"
                        isLooping
                    />
                )
            )}
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
            <TouchableOpacity style={styles.additionalButton}>
                <Icon name="camera-plus" size={24} color={colors.lightGray} />
                <Text style={styles.text}>Add more photos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.additionalButton}>
                <Icon name="map-marker" size={24} color={colors.lightGray} />
                <Text style={styles.text}>{lostFound === 'lost' ? 'Where did you lose it?' : 'Where did you find it?'}</Text>
            </TouchableOpacity>

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

            <TouchableOpacity style={styles.post} onPress={() => {/* Post submission logic here */}}>
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
        height: Dimensions.get('window').width, // Maintain aspect ratio
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
});
