import React from "react";
import { View, Text, StyleSheet, Dimensions, Linking, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';

// CreditsCard component to display information about team members, optionally including a clickable link
const CreditsCard = props =>{

    // Conditionally renders a touchable card with a link if provided
    if (props.link) {

        // Renders a card as a touchable element if a link is provided, opening the URL on press
        return (
            <TouchableOpacity onPress={() => Linking.openURL(`http://${props.link}`)}>
                <View style={styles.card}>
                    <Image style={styles.cardImage} source={props.pfp}></Image>
                    <View style={styles.textHolder}>
                        <Text style={styles.creditName}>{props.title}</Text>
                        <Text style={styles.creditRole}>{props.role}</Text>
                        {props.link && <Text style={styles.creditLink}>{props.link}</Text>}
                    </View>
                </View>
            </TouchableOpacity>
        )
    } else {
        // Renders a card without touchable functionality when no link is provided
        return (
            <View style={styles.card}>
                <Image style={styles.cardImage} source={props.pfp}></Image>
                <View style={styles.textHolder}>
                    <Text style={styles.creditName}>{props.title}</Text>
                    <Text style={styles.creditRole}>{props.role}</Text>
                </View>
            </View>
        )
    }
}

// Card width used for styling
const card_width  = Dimensions.get('screen').width * 0.9

// Styles for the card
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
        height: 105,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 4
    },
    cardImage: {
        width: 75,
        height: 75,
        resizeMode: 'cover',
        borderRadius: 37.5,
        marginLeft: 15
    },
    textHolder: {
        flex: 1,
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginRight: 15
    },
    cardTitle: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    creditName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#ffd166'
    },
    creditRole: {
        fontSize: 20,
        fontStyle: 'italic',
    },
    creditLink: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#118ab2'
    },
})

export default CreditsCard;
