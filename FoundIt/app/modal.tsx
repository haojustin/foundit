import React, { useEffect, useState, useLayoutEffect } from 'react';
import { StyleSheet, Button, View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { getLocation, LocationData } from './(tabs)/postfolder/locationUtil';

export default function ModalScreen() {
  const navigation = useNavigation();
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [pinLocation, setPinLocation] = useState<LocationData | null>(null);
  const [locationLoaded, setLocationLoaded] = useState<boolean>(false);

	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity
					style={{paddingLeft: 10}}
					onPress={() => navigateToPost()}
				>
					<Icon name="keyboard-backspace" size={30} color={CUSTOMCOLORS.darkPurple} />
				</TouchableOpacity>
			),
		});
	}, [navigation]);


  useEffect(() => {
    handleLocationFetch();
  }, []);

  const handleLocationFetch = async () => {
    try {
      const location = await getLocation();
      setCurrentLocation(location);
      setPinLocation(location);
      setLocationLoaded(true);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const handlePress = (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setPinLocation({ latitude, longitude });
  };

  const confirmLocation = () => {
    if (pinLocation) {
      navigation.navigate('postfolder/post', { selectedLocation: pinLocation });
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={locationLoaded && currentLocation ? {
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        } : undefined}
        onPress={handlePress}
        showsUserLocation={true}
      >
        {pinLocation && (
          <Marker
            coordinate={pinLocation}
            draggable
            onDragEnd={(e) => setPinLocation(e.nativeEvent.coordinate)}
            title="Selected Location"
            description="Hold and drag to move pin"
          />
        )}
      </MapView>
      {/* Wrapper view for the button */}
      <View style={styles.buttonContainer}>
        <Button title="Confirm Location" onPress={confirmLocation} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    marginBottom: 70, // Adjust this value to create space for the button
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20, // Adjust the distance from the bottom
    alignSelf: 'center',
  },
});
