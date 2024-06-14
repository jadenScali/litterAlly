import { TouchableOpacity, StyleSheet, Text, View, Dimensions, Animated, SafeAreaView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

const {width, height} = Dimensions.get('screen');

// SlideItem component for displaying individual slides with content and navigation
const SlideItem = props => {

    // Hook to access the navigation object for navigating between screens
    const navigation = useNavigation();

    const navigateToHome = () => {
        navigation.navigate('HomeStack');
    };

    return (
        <SafeAreaView style={styles.container}>
            {/*Animated image component displaying the slide's image with styling*/}
            <Animated.Image
                source={props.item.img}
                resizeMode="cover"
                style={styles.image}
            />

            {/* Container for the slide's textual content, centered within the slide */}
            <View style={styles.content}>
                <Text style={styles.title}>{props.item.title}</Text>
                <Text style={styles.description}>{props.item.description}</Text>
            </View>

            {/* Conditionally renders home nav button */}
            {props.item.buttonText && (
                <TouchableOpacity style={styles.button} onPress={navigateToHome}>
                    <Text style={styles.buttonText}>{props.item.buttonText}</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

export default SlideItem;

const styles = StyleSheet.create({
    container: {
        width,
        height,
        alignItems: 'center',
        paddingBottom: Platform.OS === 'android' ? 85 : 0,
        paddingTop: Platform.OS === 'android' ? 10 : 0
    },
    image: {
        marginTop: 10,
        height: '55%',
        width: '90%',
        borderRadius: 30
    },
    content: {
        flex: 1,
        marginHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 20,
        marginTop: 10,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 24,
        paddingHorizontal: 30,
        borderRadius: 50,
        marginBottom: 25
    },
    buttonText: {
        color: '#ffd166',
        fontWeight: 'bold',
        fontSize: 22,
    }
});
