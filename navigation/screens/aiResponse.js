import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import { resizeAndCompressImage, convertToBase64, analyzeImageWithOpenAI, analyzeTextWithOpenAI } from '../../helpers/utils';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

// AiResponse component will show the user the analysis of the photo they took
const AiResponse = ({ route }) => {
  const { photoUri, textDescription } = route.params;
  const [analysisResult, setAnalysisResult] = useState('');
  const [compressedPhotoUri, setCompressedPhotoUri] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [category, setCategory] = useState(null);

  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  const categoryPairs = [
    { title: "Recycle", bgColor: '#118ab2', imgUri: require('../../assets/recyclingIcon.jpg') },
    { title: "Compost", bgColor: '#06d6a0', imgUri: require('../../assets/compostIcon.jpg')},
    { title: "Garbage", bgColor: '#646E68', imgUri: require('../../assets/garbageIcon.jpg')},
    { title: "Hazardous Waste", bgColor: '#ef476f', imgUri: require('../../assets/hazardousWaste.jpg')},
    { title: "Electronic Waste", bgColor: '#ffd166', imgUri: require('../../assets/eWaste.jpg')},
    { title: "Invalid", bgColor: '#ffd166', imgUri: require('../../assets/pinkMark.jpg')},
    { title: "Nonsense", bgColor: '#ffd166', imgUri: require('../../assets/pinkMark.jpg')},
    { title: "Human", bgColor: '#ef476f', imgUri: require('../../assets/pinkMark.jpg')},
  ];

  useEffect(() => {
    // Asynchronous function to handle photo analysis
    const analyzePhoto = async () => {
      try {
        console.log(textDescription)
        
        if (photoUri) {
          // Compresses the photo they took
          const compressedPhotoUri = await resizeAndCompressImage(photoUri);

          // Sets CompressedPhotoUri to display this photo on screen
          setCompressedPhotoUri(compressedPhotoUri);

          // Converts their photo to base 64
          const imageBase64 = await convertToBase64(compressedPhotoUri);

          // Sends a request to AI to analyze the photo
          const result = await analyzeImageWithOpenAI(imageBase64);

          const categoryPair = categoryPairs.find(pair => pair.title === result.category);

          if (categoryPair) {
            if (categoryPair.title === 'Human') {
              setCategory(categoryPair);
              setAnalysisResult("Hey, remember, no human is garbage. Humans are our friends!");
            } else {
              setCategory(categoryPair);
              setAnalysisResult(result.disposal_instructions);
            }
          } else {
            setHasError(true);
            setAnalysisResult('An error occurred. Unable to find the appropriate category.');
          }
        } else if (textDescription) {
          // Sends a request to AI to analyze the text description
          const result = await analyzeTextWithOpenAI(textDescription);
          const categoryPair = categoryPairs.find(pair => pair.title === result.category);

          if (categoryPair) {
            setCategory(categoryPair);
            setAnalysisResult(result.disposal_instructions);
          } else {
            setHasError(true);
            setAnalysisResult('An error occurred. Unable to find the appropriate category.');
          }
        }
      } catch (error) {
        console.log('Error analyzing photo:', error);

        // Sets text for the error screen if the request fails
        setAnalysisResult('An error occurred. Ensure your wifi network does not block openai.com. If this is not the case our server may be temporarily down. We apologize for the inconvenience.');
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    analyzePhoto();
  }, [photoUri, textDescription]);

  // Displays loading screen
  if (isLoading) {
    return (
      <SafeAreaView style={{backgroundColor: '#ffd166'}}>
        <View style={styles.scrollHolder}>
          <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
            <LottieView
              source={require("../../data/lottie/loadingLottie.json")}
              style={styles.lottie}
              autoPlay
              loop
            />
            <Text style={styles.title}>Loading</Text>
            <Text style={styles.resultText}>
              <Text style={{ fontStyle: 'italic' }}>
                This feature uses AI technologies to determine how to dispose of waste. AI can make mistakes. This information is not guaranteed to be true but may be a quick and helpful tool for identifying how to dispose of most items. If this is taking an exceptionally long time ensure your wifi network doesn't block openai.com.
              </Text>
            </Text>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  // Displays the analysis result or error message
  return (
    <SafeAreaView style={{ backgroundColor: category ? category.bgColor : '#ffd166' }}>
      <View style={styles.scrollHolder}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
          {/* Changes the image based on if there's an error */}
          {hasError ? (
            <>
              <Text style={styles.title}>Error</Text>
              <View style={styles.container}>
                <Image source={require('../../assets/pinkMark.jpg')} style={styles.image} />
                <Text style={styles.resultText}>{analysisResult}</Text>
              </View>
            </>
          ) : (
            <View>
              <Text style={styles.disclaimer}>
                <Text style={{fontWeight: "bold"}}>Disclaimer: </Text>
                <Text>AI can make mistakes. Always check important info.</Text>
              </Text>
              <View style={styles.container}>
                {textDescription ? (
                  <Image source={category.imgUri} style={styles.image} />
                ) : (
                  <Image source={{ uri: compressedPhotoUri }} style={styles.image} />
                )}
                <Text style={styles.resultText}>{analysisResult}</Text>
              </View>
            </View>
          )}

          {/* Adds additional space so the button doesn't cover the text */}
          <View style={{padding: 60}}></View>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateBack}>
        <Text style={[styles.buttonText, {color: category ? category.bgColor : '#ffd166' }]}>Next Item</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Get screen width from the device's dimensions to determine margins
const screenWidth = Dimensions.get('window').width;
const imageWidth = screenWidth * 0.9;
const marginTop = screenWidth * 0.05;

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: marginTop,
  },
  scrollHolder: {
    height: '100%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    marginTop: 5,
    marginBottom: 10
  },
  container: {
    marginTop: marginTop,
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: 20,
  },
  resultText: {
    fontSize: 22,
    marginTop: marginTop,
    textAlign: 'left',
  },
  disclaimer: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: 'left',
    marginTop: marginTop,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffd166',
    paddingHorizontal: marginTop
  },
  lottie: {
    width: "100%",
    height: imageWidth,
  },
  button: {
    position: 'absolute',
    bottom: 10,
    backgroundColor: '#000',
    paddingVertical: 24,
    paddingHorizontal: 30,
    borderRadius: 50,
    alignSelf: 'center'
  },
  buttonText: {
      fontWeight: 'bold',
      fontSize: 22,
  },
  circleHolder: {
    alignItems: 'center',
  },
});

export default AiResponse;
