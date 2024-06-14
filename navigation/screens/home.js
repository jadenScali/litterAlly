import { View, FlatList, Platform, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import CategoryCard from '../../components/categoryCard'

// Home screen component showcasing category cards with navigation options
const Home = props => {

  const navigateToSlider = () => {
    props.navigation.navigate('Slider');
  };

  // Conditionally renders the appropriate header based on screen index
  const renderHeader = () => {
    if (props.route.params.currentListIndex === 0) {
      return (
        <View>
          <View style={styles.header}>
            <TouchableOpacity onPress={navigateToSlider}>
              <Image style={styles.logo} source={require('../../assets/litterallyIcon.jpg')}></Image>
            </TouchableOpacity>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Litter</Text>
              <Text style={styles.title2}>Ally</Text>
            </View>
            <View style={styles.ghostLogo} />
          </View>
          <Text style={styles.normalText}>
            <Text style={{fontWeight: "bold"}}>Note:</Text>
            <Text>This browse section provides general information and may vary by location. For location-specific details, please use our </Text>
            <Text style={{fontStyle: 'italic'}}>Text Search </Text>
            <Text>or </Text>
            <Text style={{fontStyle: 'italic'}}>Photo Scan</Text>
            <Text>.</Text>
          </Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text style={styles.backButton}>{'Back'}</Text>
        </TouchableOpacity>
      );
    }
  };

  const renderItem = ({ item, index }) => (
    <CategoryCard
      key={item.id || index} // Preferably use a unique ID if available
      title={item.title}
      imageUri={item.imgUri}
      nextIndex={item.nextListIndex}
      actionName={item.actionName}
      specialIntructions={item.specialIntructions}
      cds={props.route.params.cds}
    />
  );

  // Renders a buffer view for additional spacing at the end of the list
  const renderBuffer = () => {
    return <View style={styles.buffer} />;
  };

  return (
    <SafeAreaView style={{backgroundColor: '#ffd166'}}>
      <View style={styles.scrollHolder}>
        <FlatList
          ListHeaderComponent={renderHeader}
          data={props.route.params.cds[props.route.params.currentListIndex]}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id || index.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
          columnWrapperStyle={{ justifyContent: 'space-between' }} // This ensures spacing between columns
          ListFooterComponent={renderBuffer} // Add buffer space at the end of the FlatList
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Platform.OS === 'android' ? 15 : 5,
  },
  backButton: {
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: Platform.OS === 'android' ? 20 : 5,
    marginBottom: 20,
    marginHorizontal: '3.3333%'
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  ghostLogo: {
    width: 60,
    height: 60,
  },
  titleWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  normalText: {
    fontSize: 25,
    marginTop: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  title2: {
    fontSize: 50,
    fontWeight: '300',
    textAlign: 'left',
  },
  flatListContainer: {
    paddingHorizontal: '4%',
  },
  scrollHolder: {
    height: '100%',
    marginBottom: 20
  },
  buffer: {
    padding: 15
  }
});

export default Home