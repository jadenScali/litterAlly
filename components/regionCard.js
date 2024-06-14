import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

// This component is designed to be a clickable card for representing different regions.
const RegionCard = props =>{
    return (
        // Button container for the entire card
        <TouchableOpacity style={[styles.card, props.selected ? styles.selectedCard : null]} onPress={props.onSelect}>
            <View style={styles.textHolder}>
                {/* The name of the region */}
                <Text style={[styles.cardName, props.selected ? styles.selectedName : null]}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

// Retrieve the screen width and calculate the card width as 90% of the screen width
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
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 4
    },
    selectedCard: {
        backgroundColor: '#000',
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
    cardName: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        paddingVertical: 10
    },
    selectedName: {
        color: '#ef476f',
    }
})

export default RegionCard;
