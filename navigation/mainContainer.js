import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// Different possible screens
import HomeScreen from './screens/home';
import ActionScreen from './screens/action';
import PhotoScreen from './screens/photo';
import RegionScreen from './screens/region';
import AiResponseScreen from './screens/aiResponse';
import SearchbarScreen from './screens/searchbar';
import LearnScreen from './screens/learn';
import CreditsScreen from './screens/credits';
import StoryScreen from './screens/story';
import SliderScreen from './screens/slider';
import LimitHitScreen from './screens/limitHit';

// Defining names for screen stacks and individual screens to ensure consistent navigation
const homeStackName = 'HomeStack'
const learnStackName = 'LearnStack';
const aiStackName = 'AIStack'
const searchStackName = 'SearchStack'

const actionName = "Action"
const sliderName = "Slider"
const creditsName = "Credits";
const photoName = "Photo";
const regionName = "Region";
const searchBarName = "Action"
const aiResponseName = "AiResponse";
const limitHitName = "LimitHit";
const learnName = "Learn";
const storyName = "Story";

// Initialize the bottom tab and stack navigators
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for the ai photo sorting
function AiStack() {
    return (
      <Stack.Navigator initialRouteName={aiStackName}>
        <Stack.Screen name={photoName} component={PhotoScreen} options={{ headerShown: false }} />
        <Stack.Screen name={regionName} component={RegionScreen} options={{ headerShown: false }} />
        <Stack.Screen name={aiResponseName} component={AiResponseScreen} options={{ headerShown: false }} />
        <Stack.Screen name={limitHitName} component={LimitHitScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
}

// Stack navigator for the ai text sorting
function SearchStack() {
    return (
      <Stack.Navigator initialRouteName={searchBarName}>
        <Stack.Screen name={searchBarName} component={SearchbarScreen} options={{ headerShown: false }} />
        <Stack.Screen name={regionName} component={RegionScreen} options={{ headerShown: false }} />
        <Stack.Screen name={aiResponseName} component={AiResponseScreen} options={{ headerShown: false }} />
        <Stack.Screen name={limitHitName} component={LimitHitScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
}

// Stack navigator for the Learn section, including Learn and Story screens
function LearnStack() {
    return (
        <Stack.Navigator initialRouteName={learnName}>
            <Stack.Screen name={learnName} component={LearnScreen} options={{ headerShown: false }}/>
            <Stack.Screen name={storyName} component={StoryScreen} options={{ headerShown: false }}/>
        </Stack.Navigator>
    );
}

// Stack navigator for the Home section, dynamically generating Home screens based on card details
function HomeStack() {
    // Data structure containing information about different recycling categories and actions
    const CardDetails = [
        [
            { title: "Papers", imgUri: require('../assets/papers.jpg'), nextListIndex: 2 },
            { title: "Plastics", imgUri: require('../assets/plastics.jpg'), nextListIndex: 3 },
            { title: "Metals", imgUri: require('../assets/metals.jpg'), nextListIndex: 4 },
            { title: "Office Supplies", imgUri: require('../assets/officeSupplies.jpg'), nextListIndex: 1 },
            { title: "Batteries", imgUri: require('../assets/batteries.jpg'), nextListIndex: -5, actionName: 'Drop off batteries to your local Best Buy, Home Hardware, Waste Management Site, Canadian Tire or Staples free of charge.' },
            { title: "Electronics", imgUri: require('../assets/electronics.jpg'), nextListIndex: -5, actionName: 'Drop off electronics to your local Best Buy, Staples or a Waste Management Site free of charge.' },
            { title: "Styrofoam", imgUri: require('../assets/styrofoam.jpg'), nextListIndex: -3, actionName: 'Styrofoam goes', specialIntructions: ' Any styrofoam plates, cups, egg cartons, takeout containers, meat/fish trays, foam packaging peanuts or anything else made from this material must go in the garbage.' },
            { title: "Food Waste", imgUri: require('../assets/foodWaste.jpg'), nextListIndex: -2, actionName: 'Food waste goes' },
            { title: "Pet Waste", imgUri: require('../assets/petWaste.jpg'), nextListIndex: -2, actionName: 'Pet waste including the plastic bag goes', specialIntructions: ' On site the containment bags are sent to landfills whether or not they were biodegradable and the animal waste is composted.' },
            { title: "Pesticides", imgUri: require('../assets/pesticides.jpg'), nextListIndex: -4, actionName: 'Please take pesticides to a Household Hazardous Waste Depot to protect local drinking water.', },
            { title: "Diapers", imgUri: require('../assets/diapers.jpg'), nextListIndex: -2, actionName: 'Diapers go' },
            { title: "Feminine Products", imgUri: require('../assets/feminineHygieneProducts.jpg'), nextListIndex: -2, actionName: 'Feminine hygiene products go', specialIntructions: ' Any plastic wrappers and applicators must go in the garbage.' },
            { title: "Fluorescent Light Bulbs", imgUri: require('../assets/fluorescentLightBulbs.jpg'), nextListIndex: -4, actionName: 'Please take fluorescent light bulbs to a Household Hazardous Waste Depot to protect local drinking water.', },
        ],
        [
            { title: "Elastic Bands", imgUri: require('../assets/elasticBands.jpg'), nextListIndex: -3, actionName: 'Elastic bands go' },
            { title: "Tape", imgUri: require('../assets/tape.jpg'), nextListIndex: -3, actionName: 'Tape goes' },
            { title: "Glue Sticks", imgUri: require('../assets/glueSticks.jpg'), nextListIndex: -3, actionName: 'Glue sticks go' },
            { title: "Binders", imgUri: require('../assets/binders.jpg'), nextListIndex: -3, actionName: 'Binders go' },
            { title: "Pencils / Pens", imgUri: require('../assets/pencils.jpg'), nextListIndex: -3, actionName: 'Pencils/pens go' },
            { title: "Erasers", imgUri: require('../assets/erasers.jpg'), nextListIndex: -3, actionName: 'Erasers go' },
        ],
        [
            { title: "Napkins / Paper Towels", imgUri: require('../assets/paperTowels.jpg'), nextListIndex: -3, actionName: 'Napkins/paper towels go', specialIntructions: ' If soiled with food or organic materials, it should be composted.' },
            { title: "Tissues", imgUri: require('../assets/tissues.jpg'), nextListIndex: -2, actionName: 'Used tissues go', specialIntructions: ' If unused they go in the garbage.' },
            { title: "Pizza Boxes", imgUri: require('../assets/pizzaBoxes.jpg'), nextListIndex: -2, actionName: 'Used pizza boxes go' },
            { title: "Newspapers / Flyers", imgUri: require('../assets/newspapers.jpg'), nextListIndex: -1, actionName: 'Newspapers/flyers go' },
            { title: "Printing papers", imgUri: require('../assets/printingPapers.jpg'), nextListIndex: -1, actionName: 'Printing papers go' },
            { title: "Envelopes", imgUri: require('../assets/envelopes.jpg'), nextListIndex: -1, actionName: 'Envelopes go' },
            { title: "Cards", imgUri: require('../assets/cards.jpg'), nextListIndex: -1, actionName: 'Cards go', specialIntructions: ' If it has any bows, ribbons or foil wrap it must go in the garbage.'},
            { title: "Muffin Cups", imgUri: require('../assets/muffinCups.jpg'), nextListIndex: -1, actionName: 'Muffin cups go', specialIntructions: ' If it\'s waxed or has parchment it must go in the garbage.'},
            { title: "Books", imgUri: require('../assets/books.jpg'), nextListIndex: -1, actionName: 'Soft or hard cover books go' },
            { title: "Cardboard", imgUri: require('../assets/cardboard.jpg'), nextListIndex: -1, actionName: 'Cardboard goes' },
            { title: "Coffee Filters", imgUri: require('../assets/coffeeFilters.jpg'), nextListIndex: -2, actionName: 'Coffee Filters go', specialIntructions: ' The coffee grounds can be composted with the filter.' },
            { title: "Paper Bags", imgUri: require('../assets/paperBags.jpg'), nextListIndex: -1, actionName: 'Paper bags go', specialIntructions: ' If it is a flour or sugar bag which has been soiled it must go in the compost.' },
        ],
        [
            { title: "Coffee Pods", imgUri: require('../assets/coffeePods.jpg'), nextListIndex: -3, actionName: 'Coffee pods go', specialIntructions: ' They may have a recycling symbol however they are not accepted in Ontario, as coffee grounds are often left within them, which can ruin other items in the bin.' },
            { title: "Plastic Cups", imgUri: require('../assets/plasticCups.jpg'), nextListIndex: -1, actionName: 'Plastic cups go' },
            { title: "Saran Wrap", imgUri: require('../assets/saranWrap.jpg'), nextListIndex: -3, actionName: 'Saran wrap goes', },
            { title: "Plastic Cutlery", imgUri: require('../assets/plasticCutlery.jpg'), nextListIndex: -3, actionName: 'Plastic cutlery goes', },
            { title: "Lamination Plastic", imgUri: require('../assets/laminationPlastic.jpg'), nextListIndex: -3, actionName: 'Lamination plastic goes' },
            { title: "Straws", imgUri: require('../assets/straws.jpg'), nextListIndex: -3, actionName: 'Straws go' },
            { title: "Juice Pouches", imgUri: require('../assets/juicePouches.jpg'), nextListIndex: -3, actionName: 'Juice pouches go' },
            { title: "Bottle Caps", imgUri: require('../assets/bottleCaps.jpg'), nextListIndex: -3, actionName: 'Bottle caps go' },
            { title: "Toothpaste Tubes", imgUri: require('../assets/toothpasteTubes.jpg'), nextListIndex: -3, actionName: 'Toothpaste tubes go' },
            { title: "Bread Bags", imgUri: require('../assets/breadBags.jpg'), nextListIndex: -1, actionName: 'Bread bags go' },
            { title: "Shopping Bags", imgUri: require('../assets/shoppingBags.jpg'), nextListIndex: -1, actionName: 'Shopping bags go' },
            { title: "Milk Bags", imgUri: require('../assets/milkBags.jpg'), nextListIndex: -3, actionName: 'Milk bags go', specialIntructions: ' The outer bag can be recycled, the inner pouches can only be recycled if rinsed out.' },
            { title: "Sandwich Bags", imgUri: require('../assets/sandwichBags.jpg'), nextListIndex: -1, actionName: 'Sandwich bags go' },
            { title: "Road Salt Bags", imgUri: require('../assets/roadSaltBags.jpg'), nextListIndex: -1, actionName: 'Road salt bags go' },
            { title: "Shampoo Bottles", imgUri: require('../assets/shampooBottles.jpg'), nextListIndex: -1, actionName: 'Shampoo bottles go' },
            { title: "Soap Bottles", imgUri: require('../assets/soapBottles.jpg'), nextListIndex: -1, actionName: 'Soap bottles go' },
            { title: "Clear Food Containers", imgUri: require('../assets/clearFoodContainers.jpg'), nextListIndex: -1, actionName: 'Clear food containers go' },
        ],
        [
            { title: "Pots / Pans", imgUri: require('../assets/potsPans.jpg'), nextListIndex: -3, actionName: 'Pots/pans go', specialIntructions: ' However, if they are not non-stick pots/pans they may be recycled.' },
            { title: "Paint Cans", imgUri: require('../assets/paintCans.jpg'), nextListIndex: -4, actionName: 'Please take paint cans to a Household Hazardous Waste Depot to protect local drinking water. However, if they are completely emptied they may be recycled.', },
            { title: "Aluminum / Steel", imgUri: require('../assets/aluminum.jpg'), nextListIndex: -1, actionName: 'Aluminum/steel go', specialIntructions: ' This includes aluminum or steel trays.' },
            { title: "Pop Cans", imgUri: require('../assets/popCans.jpg'), nextListIndex: -1, actionName: 'Pop cans go' },
            { title: "Propane Tanks", imgUri: require('../assets/propaneTanks.jpg'), nextListIndex: -4, actionName: 'Please take propane tanks to a Household Hazardous Waste Depot to protect local drinking water.', },
        ],
    ];

    // Configuring Home screens and action screen within the Home stack with navigation options
    return (
        <Stack.Navigator initialRouteName={'Home0'}>
            <Stack.Screen name={actionName} component={ActionScreen} options={{ headerShown: false }}/>
            <Stack.Screen name={'Home0'} component={HomeScreen} options={{ headerShown: false }} initialParams={{ cds: CardDetails, currentListIndex: 0}}/>
            <Stack.Screen name={'Home1'} component={HomeScreen} options={{ headerShown: false }} initialParams={{ cds: CardDetails, currentListIndex: 1}}/>
            <Stack.Screen name={'Home2'} component={HomeScreen} options={{ headerShown: false }} initialParams={{ cds: CardDetails, currentListIndex: 2}}/>
            <Stack.Screen name={'Home3'} component={HomeScreen} options={{ headerShown: false }} initialParams={{ cds: CardDetails, currentListIndex: 3}}/>
            <Stack.Screen name={'Home4'} component={HomeScreen} options={{ headerShown: false }} initialParams={{ cds: CardDetails, currentListIndex: 4}}/>
        </Stack.Navigator>
    );
}

// Main navigation container managing the application's navigation state
function MainContainer(props) {

    // Handling initial navigation based on whether the slider should be displayed
    const startAtSlider = props.startAtSlider || false;

    // Determine the initial route based on whether the slider should be displayed
    const initialRoute = startAtSlider ? sliderName : aiStackName;

    return (

        // Setting up the bottom tab navigator with custom icons and styling
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={initialRoute}

                // Configuring tab bar options, including icon settings and appearance
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let rn = route.name;

                        if (rn === homeStackName) {
                            iconName = focused ? 'book' : 'book-outline';
                        } else if (rn === learnStackName) {
                            iconName = focused ? 'newspaper' : 'newspaper-outline';
                        } else if (rn === creditsName) {
                            iconName = focused ? 'egg' : 'egg-outline';
                        } else if (route.name === aiStackName) {
                            iconName = focused ? 'scan' : 'scan-outline';
                        } else if (route.name === searchStackName) {
                            iconName = focused ? 'search' : 'search-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    indicatorStyle: {
                        width: 0, height: 0, elevation: 0,      
                    },
                    tabBarActiveTintColor: '#ef476f',
                    tabBarInactiveTintColor: '#000',
                    tabBarShowLabel: false,
                    tabBarStyle: [
                        {
                            borderTopColor: '#ffd166',
                            backgroundColor: '#ffd166',
                            elevation: 0,   // for Android
                            shadowOffset: {
                                width: 0, height: 0 // for iOS
                            },
                        },
                        null
                    ],
                })}>
                <Tab.Screen
                    name={aiStackName}
                    component={AiStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name={searchStackName}
                    component={SearchStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name={homeStackName}
                    component={HomeStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name={learnStackName}
                    component={LearnStack}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name={creditsName}
                    component={CreditsScreen}
                    options={{ headerShown: false }}
                />
                <Tab.Screen
                    name={sliderName}
                    component={SliderScreen}
                    options={{
                        headerShown: false,
                        tabBarButton: () => null,
                        tabBarStyle: {display: 'none'}
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default MainContainer;
