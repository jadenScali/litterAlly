import { Text, View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import RegionCard from '../../components/regionCard';
import { storeData, getItemFor } from '../../data/storageHelper';

// Region component to allow the user to change/select their region
const Region = () => {
    const regions = ['Halton', 'Hamilton', 'Brant', 'Niagara', 'Waterloo', 'Wellington', 'Perth', 'Huron', 'Greater Toronto Area', 'York', 'Durham', 'Bruce', 'Simcoe', 'Kawarthas', 'Northumberland', 'Ottawa', 'Norfolk', 'Muskoka', 'Sault Ste. Marie'];
    
    // State to hold the selected region with "Halton" as the default
    const [selectedRegion, setSelectedRegion] = useState('Halton');

    useEffect(() => {
        // Check AsyncStorage for a saved region when the component mounts
        const checkForRegion = async () => {
            const savedRegion = await getItemFor('USER_REGION');
            if (savedRegion) {
            setSelectedRegion(savedRegion);
            }
        };

        checkForRegion();
    }, []);

    const navigation = useNavigation();

    // Function to update the selectedRegion state when a user selects a region
    const handleSelectRegion = (region) => {
        setSelectedRegion(region);
    };

    // Function to store the selected region in AsyncStorage and navigate back to the previous screen
    const navigateToPreviousScreen = () => {
        storeData('USER_REGION', selectedRegion);
        navigation.goBack();
    };
    
    return (
        <SafeAreaView style={{backgroundColor: '#ffd166'}}>
            <View style={styles.scrollHolder}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                    <Text style={styles.title}>Available Regions</Text>

                    <Text style={styles.desc}>
                        <Text>Please select your region. Currently only regions within Ontario are available.</Text>
                    </Text>

                    {/* Loop through the regions array and render a RegionCard for each region */}
                    {regions.map((region, index) => (
                        <RegionCard
                            key={index}
                            name={region}
                            selected={region === selectedRegion}
                            onSelect={() => handleSelectRegion(region)}
                        />
                    ))}
                    
                    {/* Adds additional space so the button doesn't cover the text */}
                    <View style={{padding: 60}}></View>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.button} onPress={navigateToPreviousScreen}>
                <Text style={[styles.buttonText, {color: "#ef476f"}]}>Done</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

// Get screen width from the device's dimensions to determine margins
const screenWidth = Dimensions.get('window').width;
const marginTop = screenWidth * 0.05; 

const styles = StyleSheet.create({
    scrollHolder: {
        height: '100%',
    },
    scrollViewContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingHorizontal: marginTop,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: 5,
        marginBottom: 0,
        textAlign: 'center'
    },
    desc: {
        fontSize: 22,
        marginTop: 15,
        marginBottom: 30
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

export default Region
