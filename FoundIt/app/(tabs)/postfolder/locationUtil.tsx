import * as Location from 'expo-location';

// Define an interface for the location object
export interface LocationData {
  latitude: number;
  longitude: number;
}

// Function to fetch the user's current location
export const getLocation = async (): Promise<LocationData> => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    throw new Error('Permission to access location was denied');
  }

  let { coords } = await Location.getCurrentPositionAsync({});
  return {
    latitude: coords.latitude,
    longitude: coords.longitude,
  };
};
