import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

// CategoryCard component displays a category with an image and title, and navigates based on interaction
const CategoryCard = props =>{

    // Hook to enable navigation to different screens within the app
    const navigation = useNavigation();

    // Descriptive arrays containing intro sentences and descriptions for actions related to recycling, composting, and garbage disposal
    const actionIntros = [
        " in the recycling.",
        " in the compost.",
        " in the garbage."
    ]
    
    const recyclingDesc = [
        " Ontario invented the Blue Box recycling program in 1981, which was the first curbside recycling programs in the world.",
        " Ontario diverts about 25% of its waste from landfills through its various recycling programs.",
        " Recycling has played a crucial role in conserving natural resources and reducing greenhouse gas emissions.",
        " The Blue Box program creates jobs for people in Ontario.",
        " Keep recycling. It's good for the planet.",
    ];

    const compostDesc = [
        " Composting significantly reduces the amount of waste sent to landfills. Every year in Toronto alone, the green bin program diverts over 130,000 tonnes of organic waste from landfills.",
        " Composting creates nutrient-rich soil in Ontario.",
        " Composting returns nutrients to our soil.",
        " Ontario's Composting Program creates jobs.",
        " Keep on composting. It's great for the planet.",
    ];

    const garbageDesc = [
        " Putting items in the garbage is far better than littering.",
        " Landfills are sometimes studied to understand human consumption trends over time.",
        " Landfills keep our streets and forests clean but aren't entirely sustainable.",
        " It's always better to properly dispose of waste rather than trying to recycle items which cannot be recycled or aren't accepted in Ontario.",
        " Keep on throwing out waste. It's much better than littering.",
    ];

    // Configuration for different action screens including titles, background colors, image URIs, descriptions, and any special instructions
    const actionScreens = [
        { title: "Recycle", bgColor: '#118ab2', imgUri: require('../assets/recyclingIcon.jpg'), descs: recyclingDesc, actionName: props.actionName, actionIntro: actionIntros[0], specialIntructions: props.specialIntructions },
        { title: "Compost", bgColor: '#06d6a0', imgUri: require('../assets/compostIcon.jpg'), descs: compostDesc, actionName: props.actionName, actionIntro: actionIntros[1], specialIntructions: props.specialIntructions },
        { title: "Garbage", bgColor: '#646E68', imgUri: require('../assets/garbageIcon.jpg'), descs: garbageDesc, actionName: props.actionName, actionIntro: actionIntros[2], specialIntructions: props.specialIntructions },
        { title: "Hazardous Waste", bgColor: '#ef476f', imgUri: require('../assets/hazardousWaste.jpg'), descs: garbageDesc, actionName: props.actionName, actionIntro: "", specialIntructions: "noFun" },
        { title: "Electronic Waste", bgColor: '#ffd166', imgUri: require('../assets/eWaste.jpg'), descs: garbageDesc, actionName: props.actionName, actionIntro: "", specialIntructions: "noFun" },
    ];

    // Determines the index for the next action screen based on the 'nextIndex' prop
    const actionIndex = Math.abs(props.nextIndex) -1

    // Handler function that navigates to the appropriate screen when the card is pressed
    const onPressCard = () => {

        // Checks if the 'nextIndex' indicates navigation to an 'Action' screen or another 'Home' screen
        if (props.nextIndex < 0) {
            navigation.navigate('Action', {
                actionName: actionScreens[actionIndex].actionName,
                actionIntro: actionScreens[actionIndex].actionIntro,
                specialIntructions: actionScreens[actionIndex].specialIntructions,
                bgColor: actionScreens[actionIndex].bgColor,
                title: actionScreens[actionIndex].title,
                descs: actionScreens[actionIndex].descs,
                imageUri: actionScreens[actionIndex].imgUri
            });
        } else {
            navigation.navigate('Home' + props.nextIndex);
        }
    };

    // Card with information on the type of item to be disposed
    return (
        <TouchableOpacity onPress={onPressCard} style={styles.card}>
            <Image style={styles.cardImage} source={props.imageUri}></Image>
            <View style={styles.textHolder}>
                <Text
                style={styles.cardTitle}
                numberOfLines={2}
                adjustsFontSizeToFit={true}
                minimumFontSize={12}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity> 
    )
}

const styles = StyleSheet.create({
    card: {
        marginBottom: '4%', 
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
        width: '48%',
        height: 240,
        alignItems: 'center', 
    }, 
    cardImage: {
        width: '100%',
        height: '65%',
        resizeMode: 'cover',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    textHolder: {
        flex: 1,
        justifyContent: 'center'
    },
    cardTitle: {
        textAlign: 'center',
        fontSize: 24,
        marginHorizontal: 6,
    }
})

export default CategoryCard;
