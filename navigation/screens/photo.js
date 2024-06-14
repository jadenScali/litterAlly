import React, { useState, useRef, useCallback } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Alert, Linking, } from 'react-native';
import { Camera, AutoFocus } from 'expo-camera/legacy';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { storeData, getItemFor } from '../../data/storageHelper';
import Constants from 'expo-constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { formatDate } from '../../helpers/formatDate';

// PhotoScreen is a camera screen that allows users to take photos
const PhotoScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [showCamera, setShowCamera] = useState(null);
  const cameraRef = useRef(null);
  const navigation = useNavigation();

  // Default region set to "Halton"
  const [userRegion, setUserRegion] = useState('Halton');

  // This will re-run every time the screen is focused, updating the region
  useFocusEffect(
    useCallback(() => {
      setShowCamera(true);
      // Async function to fetch region from storage
      const fetchRegion = async () => {
        const savedRegion = await getItemFor("USER_REGION");
        console.log(savedRegion);
        if (!savedRegion) {
          // Navigate to the 'Region' screen if no region is saved
          navigation.navigate('Region');
          // Still set "Halton" as the default in case they don't choose anything
          setUserRegion('Halton');
        } else {
          // Set the saved region if one exists
          setUserRegion(savedRegion);
        }
      };

      // Fetch user region from storage
      fetchRegion();

      // Check and request camera permissions
      checkCameraPermissions();

      // Check and update photo count for the day
      updatePhotoCount();

      // Clean-up function to set camera visibility to false when the screen loses focus
      return () => {
        setShowCamera(false);
      };
    }, [])
  );

  // Function to reset photo count if the day has changed
  const updatePhotoCount = async () => {
    const today = new Date();
    const dateString = formatDate(today);
    
    const lastSavedDate = await getItemFor("LAST_SAVED_DAY") || '0';

    console.log("todays date ", dateString);
    console.log("lastSavedDay date ", lastSavedDate);

    if (dateString !== lastSavedDate) {
        await storeData("PHOTOS_TAKEN_TODAY", '0');
        await storeData("LAST_SAVED_DAY", dateString);

        console.log("PHOTOS_TAKEN_TODAY reset to zero and last day saved reset");
    }
  };

  // Function to check camera permissions and alert the user if not granted
  const checkCameraPermissions = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        "Camera Permission Required",
        "Please enable camera permissions to scan objects and determine how to dispose of them.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Open Settings", onPress: () => Linking.openSettings() }
        ],
        { cancelable: false }
      );
    }
    setHasPermission(status === 'granted');
  };

  // Function to capture a photo and navigate to other screens
  const takePicture = async () => {
    const photosTaken = parseInt(await getItemFor("PHOTOS_TAKEN_TODAY"), 10) || 0;
    console.log("pics taken tdy ", photosTaken)
    if (photosTaken < 20) {
      if (cameraRef.current) {
        let photo = await cameraRef.current.takePictureAsync();
        setShowCamera(false)
        navigation.navigate('AiResponse', { photoUri: photo.uri });
        await storeData("PHOTOS_TAKEN_TODAY", (photosTaken + 1).toString());
      }
    } else {
      navigation.navigate('LimitHit', { displayMsg: "Thank you for using our service! However we limit our users to 20 photos per day. Come back tomorrow to scan more photos."});
    }
  };

  // Conditional rendering based on camera permission status
  if (hasPermission === null) {
    return <View style={{ flex: 1, backgroundColor: '#ffd166' }}/>;
  }
  if (hasPermission === false) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.noCamText}>{"No access to camera. Please enable camera permissions to use this feature."}</Text>
      </View>
    );
  }
  if (showCamera === false) {
    return <View style={{ flex: 1, backgroundColor: '#ffd166' }}/>;
  }

  // Calculate the width based on the screen size
  const screenWidth = Dimensions.get('window').width;
  const containerSize = screenWidth * 0.8;

  // Main camera view
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={Camera.Constants.Type.back} autoFocus={AutoFocus.on} ref={cameraRef}>
        <View style={{ height: Constants.statusBarHeight }}/>

        {/* Region drop down button*/}
        <TouchableOpacity style={styles.regionContainer} onPress={() => navigation.navigate('Region')}>
          <Text style={styles.regionText}>{userRegion}</Text>
          <Ionicons style={styles.downArrow} name={"chevron-down"} size={24} color={"#fff"} />
        </TouchableOpacity>

        {/* Target overlay */}
        <View style={styles.overlay}>
            <View style={{ height: containerSize, width: containerSize,}}>
                <View style={{ position: 'absolute', height: '25%', width: '25%', top: 0, left: 0, borderColor: "rgba(0, 0, 0, 0.5)", borderTopWidth: 6, borderLeftWidth: 6, borderTopLeftRadius: 20 }}></View>
                <View style={{ position: 'absolute', height: '25%', width: '25%', top: 0, right: 0, borderColor: "rgba(0, 0, 0, 0.5)", borderTopWidth: 6, borderRightWidth: 6, borderTopRightRadius: 20 }}></View>
                <View style={{ position: 'absolute', height: '25%', width: '25%', bottom: 0, left: 0, borderColor: "rgba(0, 0, 0, 0.5)", borderBottomWidth: 6, borderLeftWidth: 6, borderBottomLeftRadius: 20 }}></View>
                <View style={{ position: 'absolute', height: '25%', width: '25%', bottom: 0, right: 0, borderColor: "rgba(0, 0, 0, 0.5)", borderBottomWidth: 6, borderRightWidth: 6, borderBottomRightRadius: 20 }}></View>
            </View>
        </View>
        
        {/* Take photo button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}/>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ef476f'
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonContainer: {
    flex: 0.4,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginBottom: 30
  },
  button: {
    width: 85,
    height: 85,
    borderRadius: 85 / 2,
    backgroundColor: "rgba(239, 71, 111, 0.45)",
    borderWidth: 6,
    borderColor: "rgba(239, 71, 111, 0.85)",
  },
  regionContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingVertical: 16,
    backgroundColor: "rgba(239, 71, 111, 0.85)",
    borderRadius: 15
  },
  regionText: {
    fontSize: 22,
    color: "#000",
    opacity: 0.65,
    fontWeight: 'bold',
    marginRight: 8,
  },
  downArrow: {
    color: "#000",
    opacity: 0.65,
  },
  noCamText: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingHorizontal: 15
  }
});

export default PhotoScreen;
