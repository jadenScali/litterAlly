import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Platform, ScrollView } from 'react-native'
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';

// Story screen component displaying detailed article content
const Story = props => {
    // Hook to access the navigation object for navigating between screens
    const navigation = useNavigation();

    // Render the story screen layout with navigation and content
    return (
        <SafeAreaView style={{backgroundColor: '#ef476f'}}>
            <View style={styles.scrollHolder}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backButton}>{'Back'}</Text>
                </TouchableOpacity>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Image style={styles.coverImage} source={props.route.params.imageUri}></Image>
                    <Text style={styles.title}>{props.route.params.title}</Text>
                    <Text style={styles.subText}>{props.route.params.author} | {props.route.params.date}</Text>
                    <Text style={styles.normalText}>{props.route.params.article}</Text>
                    <View style={styles.buffer} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

// StyleSheet for styling the Story component elements
const styles = StyleSheet.create({
    backButton: {
        fontWeight: 'bold',
        marginTop: Platform.OS === 'android' ? 10 : 0,
        marginBottom: 10,
        fontSize: 30,
        marginHorizontal: 10
    },
    scrollHolder: {
        height: '100%',
        marginBottom: 30
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 36,
        marginTop: 15,
        marginBottom: 5,
        marginHorizontal: 10
    },
    subText: {
        fontWeight: 'bold',
        fontSize: 15,
        width: '100%',
        marginBottom: 20,
        marginHorizontal: 10
    },
    normalText: {
        fontWeight: '400',
        fontSize: 20,
        width: '100%',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    coverImage: {
        width: '100%',
        height: 350,
        resizeMode: 'cover'
    },
    buffer: {
        padding: 15
    }
});

export default Story
