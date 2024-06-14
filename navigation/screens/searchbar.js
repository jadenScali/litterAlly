import { Text, View, Platform, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { useCallback, useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { storeData, getItemFor } from '../../data/storageHelper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from 'expo-constants';
import { formatDate } from '../../helpers/formatDate';

// Story component displaying the project's introduction and credits
const Searchbar = () => {
    const [itemTyped, onChangeText] = useState('')
    const [userRegion, setUserRegion] = useState('Halton');
    const [blank, setBlank] = useState(false);
    const navigation = useNavigation();
    
    const textChangeHandler = (text) => {
        onChangeText(text);
    };

    const handleGoButtonPress = async () => {
        const searchesToday = parseInt(await getItemFor("SEARCHES_TAKEN_TODAY"), 10) || 0;
        
        if (itemTyped.trim().length === 0) {
            setBlank(true);
            return
        }

        console.log("searches done tdy ", searchesToday)

        if (searchesToday < 20) {
            navigation.navigate('AiResponse', { textDescription: itemTyped });
            await storeData("SEARCHES_TAKEN_TODAY", (searchesToday + 1).toString());
        } else {
            navigation.navigate('LimitHit', { displayMsg: "Thank you for using our service! However we limit our users to 20 searches per day. Come back tomorrow to get more searches."});
        }
    }

    // Function to reset search count if the day has changed
    const updateSearchCount = async () => {
        const today = new Date();
        const dateString = formatDate(today);
        
        const lastSavedDate = await getItemFor("LAST_SAVED_DAY") || '0';

        console.log("todays date ", dateString);
        console.log("lastSavedDay date ", lastSavedDate);

        if (dateString !== lastSavedDate) {
            await storeData("SEARCHES_TAKEN_TODAY", '0');
            await storeData("LAST_SAVED_DAY", dateString);

            console.log("SEARCHES_TAKEN_TODAY reset to zero and last day saved reset");
        }
    };

    // This will re-run every time the screen is focused, updating the region
    useFocusEffect(
        useCallback(() => {
            // Async function to fetch region from storage
            const fetchRegion = async () => {
                const savedRegion = await getItemFor("USER_REGION");
                console.log(savedRegion);
                if (!savedRegion) {
                    // Navigate to the 'Region' screen if no region is saved
                    navigation.navigate('Region');
                    // Still set "Halton" as the default in case they don't choose anything
                    setUserRegion('Halton');
                } else {
                    // Set the saved region if one exists
                    setUserRegion(savedRegion);
                }
            };

            onChangeText('');
            setBlank(false);

            // Fetch user region from storage
            fetchRegion();

            updateSearchCount();
        }, [])
    );
        
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                <View style={{ height: Platform.OS === 'android' ? (Constants.statusBarHeight) : 0 }}/>

                {/* Region drop down button*/}
                <TouchableOpacity style={styles.regionContainer} onPress={() => navigation.navigate('Region')}>
                    <Text style={styles.regionText}>{userRegion}</Text>
                    <Ionicons style={styles.downArrow} name={"chevron-down"} size={24} color={"#fff"} />
                </TouchableOpacity>

                <View style={styles.middleHolder}>
                    <Text style={styles.title}>Search</Text>

                    <View style={styles.searchContainer}>
                        <TextInput
                            style={styles.searchBox}
                            onChangeText={textChangeHandler}
                            placeholder="Mango"
                            placeholderTextColor="#999"
                            value = {itemTyped}
                            returnKeyType="search"
                            maxLength={35}
                            onSubmitEditing={handleGoButtonPress}
                        />
                        <Text style={[styles.charCount, itemTyped.length === 35 && styles.charCountLimit]}>{itemTyped.length}</Text>
                    </View>
                    {blank ? <Text style={styles.errorText}>{"Please type something before searching"}</Text> : null}
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffd166',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 50,
        marginBottom: 10,
        textAlign: 'center',
    },
    errorText: {
        color: '#ef476f',
        fontSize: 15,
        marginTop: 10,
        textAlign: 'center',
    },
    middleHolder: {
        paddingHorizontal: 15,
        width: '100%',
        flex: 0.45,
        justifyContent: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        shadowColor: 'black', 
        shadowOffset: {
            width: 0, 
            height: 2, 
        }, 
        shadowOpacity: 0.2, 
        shadowRadius: 10,
        elevation: 12,
        backgroundColor: '#fff',
        borderRadius: 30,
        paddingHorizontal: 22,
        height: 60,
    },
    searchBox: {
        flex: 1,
        color: '#000',
        fontSize: 20,
        height: 60,
    },
    downArrow: {
        color: "#000",
        opacity: 0.65,
    },
    charCount: {
        color: '#999',
        fontSize: 20,
        textAlign: 'right',
        paddingLeft: 5,
    },
    charCountLimit: {
        color: "#ef476f",
        fontWeight: 'bold'
    },
    regionText: {
        fontSize: 22,
        color: "#000",
        fontWeight: 'bold',
        marginRight: 8,
    },
    regionContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        paddingHorizontal: 22,
        paddingVertical: 16,
        backgroundColor: "#ef476f",
        borderRadius: 15,
    },
});

export default Searchbar
