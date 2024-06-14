import { Text, View, StyleSheet, SafeAreaView, ScrollView, Platform } from 'react-native'
import CreditsCard from '../../components/creditsCard';

// Story component displaying the project's introduction and credits
const Story = () => {
    return (
        <SafeAreaView style={{backgroundColor: '#ffd166'}}>
            <View style={styles.scrollHolder}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.textHolder}>
                        <Text style={styles.title}>Hello there,</Text>
                        {/* Introduction text explaining the project's origin and purpose */}
                        <Text style={styles.normalText}>
                            <Text>This project was created by the</Text>
                            <Text style={{fontStyle: 'italic'}}> St.Francis Xavier</Text>
                            <Text> high school</Text>
                            <Text style={{fontWeight: "bold", color: '#ef476f'}}> STEAM</Text>
                            <Text> club and is only intended for use within</Text>
                            <Text style={{fontWeight: "bold"}}> Canada.</Text>
                        </Text>

                        <Text style={[styles.title, {textAlign: 'center', marginBottom: 15}]}>Our Team</Text>

                        {/* Individual credit card for a team member, detailing their role and information */}
                        <CreditsCard title='Jaden Scali' role='Software Developer' link='jadenscali.ca' pfp={require('../../assets/jadenPfp.jpg')}></CreditsCard>
                        <CreditsCard title='Joyce Sidky' role='Lead Researcher' pfp={require('../../assets/joycePfp.jpg')}></CreditsCard>
                        <CreditsCard title='Hamza Imtiaz' role='Marketing Volunteer' pfp={require('../../assets/hamzaPfp.jpg')}></CreditsCard>
                        
                        <View style={{padding: 15}}></View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollHolder: {
        height: '100%',
        marginBottom: 20
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    textHolder: {
        marginHorizontal: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 36,
        marginTop: 15,
        marginBottom: 5,
    },
    normalText: {
        fontSize: 25,
        marginTop: 15,
        marginBottom: Platform.OS === 'android' ? 0 : 5
    }
});

export default Story
