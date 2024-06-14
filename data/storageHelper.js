import AsyncStorage from "@react-native-async-storage/async-storage"
import * as SecureStore from 'expo-secure-store';

// Asynchronously stores a key-value pair in the local storage
export const storeData = async (key, value) => {
    
    // Attempt to save the value to storage under the specified key
    try {
        await AsyncStorage.setItem(key, value);
    }
    catch(error) {
        console.log("Error storing data", error);
    }
};

// Asynchronously retrieves a value for a given key from the local storage
export const getItemFor = async (key) => {

    // Attempt to fetch the value from storage for the specified key
    try {
        const value = await AsyncStorage.getItem(key);
        if(value != null){
            return value;
        }
    }
    catch(error){
        console.log("Error getting data", error);
    }
};

export const saveSecureItem = async (key, value) => {
try {
    await SecureStore.setItemAsync(key, value);
    console.log("Secure item stored successfully");
} catch (e) {
    console.error("Error storing secure item", e);
}
};

export const getSecureItem = async (key) => {
try {
    return await SecureStore.getItemAsync(key);
} catch (e) {
    console.error("Error retrieving secure item", e);
    return null;  // Returning null in case of an error
}
};
