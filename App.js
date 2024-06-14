import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Alert, Linking } from 'react-native';
import { storeData, getItemFor } from './data/storageHelper';
import MainContainer from './navigation/mainContainer'
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';
import { saveSecureItem } from './data/storageHelper';
import { API_KEY } from '@env';
const HAS_LAUNCHED = "HAS_LAUNCHED";

// This is different from the app version it's the number to check on the hosted JSON to see if this app is the current version
const CURRENT_VERSION_TO_CHECK = 2;
const VERSION_URL = "https://661ac490824e4dc0581f8853--strong-panda-0ffb08.netlify.app/version.json";

export default function App() {

  const [hasLaunched, setHasLaunched] = useState(false)
  // Add a loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Function to retrieve launch data and update state accordingly
    const getData = async () => {
      // Save the API key securely only once per app launch
      await saveSecureItem('API_KEY', API_KEY);

      checkVersionAndUpdateAppStatus();

      const hasLaunched = await getItemFor(HAS_LAUNCHED);

      // Check if app has launched before and set state
      if(hasLaunched) {
        setHasLaunched(true);
      } else {
        await storeData(HAS_LAUNCHED, "true");
      }
      setIsLoading(false);
    };

    getData().catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
  }, [])

  const checkVersionAndUpdateAppStatus = async () => {

    try {
      const response = await fetch(VERSION_URL);
      const data = await response.json();
      if (CURRENT_VERSION_TO_CHECK < data.latestVersion) {
        Alert.alert("Update Required", "A new version of this app is available! Please update to continue.", [
          { text: "Ok", onPress: openStore }
        ]);
        setAllowAppLaunch(false); // Prevent app launch
      }
    } catch (error) {
      console.log("Error fetching version, using app normally:", error);
    }
  };

  const openStore = () => {
    const url = Platform.OS === 'ios' 
      ? 'https://apps.apple.com/ca/app/litterally/id6478511443'
      : 'https://play.google.com/store/apps/details?id=com.jadenexpo.litterAllyDone';
    
    Linking.openURL(url).catch(err => {
      console.error("Failed to open URL:", err);
    });
    Alert.alert("Update Required", "A new version of this app is available! Please update to continue.", [
      { text: "Ok", onPress: openStore }
    ]);
  };


  // Renders only when loading finishes
  if (!isLoading) {
    return (
      <View style={styles.AndroidSafeArea}>
        <StatusBar style="auto"/>
        <MainContainer startAtSlider={!hasLaunched}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // Styling for the app, ensuring safe area for Android devices
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? (Constants.statusBarHeight) : 0
  },
});