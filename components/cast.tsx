import { image185 } from '@/api/moviedb';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import tw from 'twrnc'; // Import NativeWind utility function

interface CastProps {
    cast: any[]; // Define the type of the cast prop
    navigation: any; // Add navigation prop to CastProps
}

const Cast: React.FC<CastProps> = ({ cast, navigation }) => {
    let personName = "John week";
    let charactorName = "Best actor so far";
    console.log(cast, "check cast");
    
    return (
        <View >
            <Text style={tw`text-white text-lg ml-4 mb-5`}>Cast</Text>
            <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 20 }}
                showsHorizontalScrollIndicator={false}
            >
                {cast?.map((person, index) => { // Change 'actor' to 'person'
                    return (
                        <TouchableOpacity 
                            key={index} 
                            style={tw`mr-4 items-center`}
                            // onPress={() => navigation.navigate('Person', { person })} // Pass person as navigation parameter
                        >
                            <Image style={tw`rounded-full h-20 w-20`} source={{uri:image185(person?.profile_path)}} />
                            <Text style={tw`text-white text-xs mt-1`}>{personName.slice(0, 10) + '...'} </Text>
                            <Text style={tw`text-gray-600 text-xs mt-1`}>{charactorName.slice(0, 14) + '...'} </Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    );
};

export default Cast;
