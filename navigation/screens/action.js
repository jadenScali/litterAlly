import { Text, View, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView, Platform, ScrollView } from 'react-native'
import { Image } from 'expo-image';

// Action screen component to display detailed information
const Action = props => {
    const navigateToHome = () => {
        props.navigation.navigate('Home0');
    };

    // Dynamically renders a description based on passed route parameters
    const renderDescription = () => {
        if (props.route.params.specialIntructions === "noFun") {
            return "";
        } else if (props.route.params.specialIntructions) {
            return props.route.params.specialIntructions;
        } else {
            return selectedDes;
        }
    };

    // Selects a random fun fact about the item
    const randomDesIndex = Math.floor(Math.random() * props.route.params.descs.length);
    const selectedDes = props.route.params.descs[randomDesIndex];
    return (

        // Main view container with dynamic background color from route parameters
        <View style={{ backgroundColor: props.route.params.bgColor, height: '100%', width: '100%'}}>
            <SafeAreaView style={styles.safe}>
                <ScrollView contentContainerStyle={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <Text style={styles.backButton}>{'Back'}</Text>
                    </TouchableOpacity>
                    {/* Displays an image associated with the action, styled as a circle */}
                    <Image style={styles.circle} source={props.route.params.imageUri}></Image>
                    <View style={styles.textHolder}>
                        <Text style={styles.title}>{props.route.params.title}</Text>
                        <Text style={styles.para}>
                            <Text>{props.route.params.actionName}</Text>
                            <Text>{props.route.params.actionIntro}</Text>
                            <Text>{renderDescription()}</Text>
                        </Text>
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={navigateToHome}>
                    <Text style={[styles.buttonText, {color: props.route.params.bgColor}]}>Next Item</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

// The image width used for styling
const circle_width  = Dimensions.get('screen').width * 0.85

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 100, // Space for the button
    },
    backButton: {
        fontWeight: 'bold',
        fontSize: 30,
        width: circle_width,
        marginTop: Platform.OS === 'android' ? 10 : 0,
        marginBottom: 4,
    },
    circle: {
        height: circle_width,
        width: circle_width,
        borderRadius: circle_width/2,
        marginTop: 20
    },
    textHolder: {
        flex: 1,
        width: circle_width,
        justifyContent: 'flex-start'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: 4,
        marginBottom: 10
    },
    para: {
        fontSize: 22,
    },
    button: {
        position: 'absolute', // Position button absolutely
        bottom: 10,          // Fixed position at the bottom
        backgroundColor: '#000',
        paddingVertical: 24,
        paddingHorizontal: 30,
        borderRadius: 50,
        alignSelf: 'center'   // Center the button
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 22,
    }
});

export default Action
