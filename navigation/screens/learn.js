import { Text, View, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import StoryCard from '../../components/storyCard';

// Static data for educational stories including title, image, author, date, and article text
const storyData = [
    {
        title: 'NEVER Recycle This',
        imageUri: require('../../assets/shinnyWrapperStory.jpg'),
        author: 'Joyce Sidky',
        date: 'Jan 8th 2024',
        article: "Shiny wrappers are made of several components, including plastic, metal, and paper. As a result, if they are thrown in the recycling bin, recycling facilities won't be able to separate them and won't be able to turn them into something usable. Additionally, the materials that shiny wrappers are made of can taint the recycling stream. Consequently, contamination reduces the quality of materials being recycled and increases the likelihood that everything recycled along with those materials will be rejected. Lastly, any materials that could potentially be gathered from shiny wrappers are not in demand, thus recycling facilities won’t waste resources to process them. This includes most chip bags, granola bar wrappers and more. So next time you need to throw out a shiny wrapper just remember it goes in the garbage."
    },
    {
        title: 'This Does NOT Mean Recycle',
        imageUri: require('../../assets/plasticSymbolStory.jpg'),
        author: 'Joyce Sidky',
        date: 'Dec 13th 2023',
        article: "The recycling symbol, which is made up of three triangle-shaped arrows, represents both the idea of recycling and the ongoing cycle of materials being recycled. In contrast, the plastic resin identification code consists of a series of numbers and letters enclosed in an arrow triangle and is frequently seen on the underside of plastic containers. A system created by and for the plastics industry that consists of arrows creating a triangle with numbers within, in which every number denotes a distinct class of polymers. The purpose of this method is to inform recycling facilities about the kind of resin that is present in a certain object. However, this does not mean that the product can be recycled. As a result, anything bearing said markings should be thrown out if it’s not recyclable."   
    },
    {
        title: 'How to Dispose of a Pizza Box',
        imageUri: require('../../assets/pizzaBoxStory.jpg'),
        author: 'Joyce Sidky',
        date: 'Dec 11th 2023',
        article: "Pizza boxes, even though they are made from cardboard, are not widely accepted in recycling programs. This is because pizza boxes are contaminated with grease and pizza residue which can obstruct the recycling process and render recycled paper useless. However, the top part of the pizza box can be recycled as it is free from any food residue. Therefore, the correct way to dispose of a pizza box is to rip off the clean top and put it in the recycling bin, while the bottom of the pizza box covered in food residue should be disposed of in the garbage. This is applicable to a wide range of recyclable materials. Materials that are typically recyclable turn into garbage when they are tainted by food as it ruins the recycling process."        
    }
];

// Learn component to display educational content about recycling practices
const Learn = () => {

    // Function to render individual story previews using the StoryCard component
    const renderStoryItem = ({ item }) => (
        <StoryCard
            title={item.title}
            imageUri={item.imageUri}
            author={item.author}
            date={item.date}
            article={item.article}
        />
    );

    const renderHeader = () => (
        <Text style={styles.title}>Learn More</Text>
    );

    const renderFooter = () => (
        <View style={styles.buffer} />
    );

    return (
        <SafeAreaView style={{ backgroundColor: '#ffd166' }}>
            <FlatList
                data={storyData}
                renderItem={renderStoryItem}
                keyExtractor={(item, index) => index.toString()}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                contentContainerStyle={styles.flatListContainer}
            />
        </SafeAreaView>
    )
}

// StyleSheet for customizing the appearance of the Learn screen components
const styles = StyleSheet.create({
    flatListContainer: {
        alignItems: 'center',
        padding: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 50,
        marginBottom: 20
    },
    buffer: {
        padding: 15
    }
});

export default Learn
