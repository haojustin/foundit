import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Text, TouchableWithoutFeedback, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Video } from 'expo-av';

const CameraPage: React.FC = () => {
  const cameraRef = useRef<Camera | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [media, setMedia] = useState<{ uri: string | null; type: 'image' | 'video' | null }>({ uri: null, type: null });
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const lastTapRef = useRef<number>(0);
  let pressTimer: NodeJS.Timeout | null = null;
  const [fullScreenPreviewVisible, setFullScreenPreviewVisible] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const toggleFlashMode = () => {
    setFlashMode(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
    }
    lastTapRef.current = now;
  };

  const takePicture = async () => {
    if (cameraRef.current && !isRecording) {
      const photo = await cameraRef.current.takePictureAsync();
      setMedia({ uri: photo.uri, type: 'image' });
      setFullScreenPreviewVisible(false); // Reset preview visibility
    }
  };

  const startRecording = async () => {
    setIsRecording(true);
    if (cameraRef.current) {
      const video = await cameraRef.current.recordAsync();
      setMedia({ uri: video.uri, type: 'video' });
      setIsRecording(false);
      setFullScreenPreviewVisible(false); // Reset preview visibility
    }
  };

  const handlePressIn = () => {
    pressTimer = setTimeout(async () => {
      await startRecording();
    }, 500);
  };

  const handlePressOut = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      pressTimer = null;
      if (!isRecording) {
        takePicture();
      } else {
        if (cameraRef.current) {
          cameraRef.current.stopRecording();
          setIsRecording(false);
        }
      }
    }
  };

  const toggleFullScreenPreview = () => {
    setFullScreenPreviewVisible(!fullScreenPreviewVisible);
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <Camera style={styles.camera} type={type} flashMode={flashMode} ref={cameraRef}>
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlashMode}>
            <Icon name={flashMode === Camera.Constants.FlashMode.on ? "flash" : "flash-off"} size={24} color="white" />
          </TouchableOpacity>
        </Camera>
      </TouchableWithoutFeedback>
      <View style={styles.controls}>
          <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
                <Icon name="image-multiple" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.captureButton, isRecording && { borderColor: 'red' }]}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <View style={styles.innerRing}>
              <View style={[styles.innerCircle, isRecording && { backgroundColor: 'red' }]} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)}>
            <Icon name="camera-switch" size={30} color="white" />
          </TouchableOpacity>
        </View>
      {media.uri && (
        <TouchableOpacity style={styles.preview} onPress={toggleFullScreenPreview}>
          {media.type === 'image' ? (
            <Image source={{ uri: media.uri }} style={styles.fullScreen} />
          ) : (
            <Video source={{ uri: media.uri }} style={styles.fullScreen} isLooping useNativeControls />
          )}
        </TouchableOpacity>
      )}
      {fullScreenPreviewVisible && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={fullScreenPreviewVisible}
          onRequestClose={toggleFullScreenPreview}
        >
          {media.type === 'image' ? (
            <Image source={{ uri: media.uri }} style={styles.fullScreen} />
          ) : (
            <Video source={{ uri: media.uri }} style={styles.fullScreen} isLooping useNativeControls />
          )}
          <TouchableOpacity style={styles.closeButton} onPress={toggleFullScreenPreview}>
            <Icon name="close" size={30} color="white" />
          </TouchableOpacity>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  fullScreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  flashButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  captureButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    borderRadius: 37.5,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    padding: 2,
  },
  innerRing: {
    width: '100%',
    height: '100%',
    borderRadius: 35.5,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  },
  innerCircle: {
    width: '100%',
    height: '100%',
    borderRadius: 34,
    backgroundColor: 'white',
  },
  preview: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 30,
  }
});

export default CameraPage;