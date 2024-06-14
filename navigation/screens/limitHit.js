import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

// LimitHit component is a screen that displays a message if they go over their daily photo limit
const LimitHit = ({ route }) => {
  const { displayMsg } = route.params;
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffd166'}}>
      <View style={styles.scrollHolder}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Daily Limit Reached</Text>
            <View style={styles.container}>
                <Image source={require('../../assets/pinkMark.jpg')} style={styles.image} />
                <Text style={styles.resultText}>{displayMsg}</Text>
            </View>
          
          {/* Adds additional space so the button doesn't cover the text */}
          <View style={{padding: 60}}></View>
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.button} onPress={navigateBack}>
        <Text style={[styles.buttonText, {color: "#ffd166"}]}>Understood</Text>
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
    marginTop: marginTop
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
  }
});

export default LimitHit;
