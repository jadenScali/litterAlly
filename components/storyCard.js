import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

// StoryCard component to display a story summary and handle navigation to full story view
const StoryCard = props =>{

    // Hook to access navigation object for navigating between screens
    const navigation = useNavigation();
    
    // Handler function to navigate to the Story screen with story details as parameters
    const onPressHandler = () => {
        navigation.navigate('Story', {
            imageUri: props.imageUri,
            title: props.title,
            author: props.author,
            date: props.date,
            article: props.article,
        });
    };

    // Card container for story image and text summary
    return (
        <TouchableOpacity onPress={onPressHandler}>
            <View style={styles.card}>
                <Image style={styles.cardImage} source={props.imageUri}></Image>
                <View style={styles.textHolder}>
                    <Text style={styles.cardTitle}>{props.title}</Text>
                    <Text style={styles.cardSubtitle}>Learn More</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

// width of the card used for styling
const card_width  = Dimensions.get('screen').width * 0.9

const styles = StyleSheet.create({
    card: {
        marginBottom: '5%', 
        backgroundColor: '#ef476f', 
        borderRadius: 15,
        shadowColor: 'black', 
        shadowOffset: {
            width: 0, 
            height: 2, 
        }, 
        shadowOpacity: 0.3, 
        shadowRadius: 10,
        elevation: 12, 
        width: card_width, 
        height: card_width,
        alignItems: 'center', 
    }, 
    cardImage: {
        width: '100%',
        height: '60%',
        resizeMode: 'cover',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    textHolder: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    cardTitle: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        fontSize: 20,
        fontWeight: '500',
    }
})

export default StoryCard;
