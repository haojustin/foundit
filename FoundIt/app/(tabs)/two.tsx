import React, { useState, useEffect, useRef } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

/**
 * CameraPage component displays a camera interface allowing the user to take pictures
 * and pick images from the gallery using Camera and ImagePicker.
 */
const CameraPage = () => {
  // Reference to the camera component
  const cameraRef = useRef<Camera | null>(null);

  // State to manage camera permission status
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  // State to manage the camera type (front or back)
  const [type, setType] = useState(Camera.Constants.Type.back);

  // State to store the captured or selected image URI
  const [image, setImage] = useState<string | null>(null);

  // Use useEffect to request camera permissions when the component mounts
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // If camera permission is pending, render an empty view
  if (hasPermission === null) {
    return <View />;
  }

  // If camera permission is denied, display a message
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // Function to take a picture using the camera
  const takePicture = async () => {
    if (!cameraRef.current) return;
    const photo = await cameraRef.current.takePictureAsync();
    setImage(photo.uri);
  };

  // Function to pick an image from the gallery
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      {/* Camera component */}
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        {/* Button container */}
        <View style={styles.buttonContainer}>
          {/* Button to flip between front and back camera */}
          <Button title="Flip Camera" onPress={() => {
            setType(type === Camera.Constants.Type.back
              ? Camera.Constants.Type.front
              : Camera.Constants.Type.back);
          }} />
          {/* Button to take a picture */}
          <Button title="Take Picture" onPress={takePicture} />
          {/* Button to pick an image from the gallery */}
          <Button title="Pick Image from Gallery" onPress={pickImage} />
        </View>
      </Camera>
      {/* Display the captured or selected image */}
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
});

export default CameraPage;
